<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Stripe\Webhook;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class StripeController extends Controller
{
    /**
     * Initiates a Stripe checkout session and creates an unpaid order.
     * Returns a JSON response containing the Stripe checkout URL.
     */
    public function checkout(Request $request)
    {
        Stripe::setApiKey(config('stripe.sk'));

        // Validate request data
        $request->validate([
        'booking_id' => 'required|exists:bookings,id'
        ]);

        $booking = Booking::findOrFail($request->booking_id);

try {
        $session = \Stripe\Checkout\Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'myr',
                        'product_data' => [
                            'name' => $booking->equipment->name,
                        ],
                        'unit_amount' => $booking->total_price * 100,
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => route('checkout.success').'?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('checkout.cancel').'?booking_id='.$booking->id,
            ]);
        Order::create([
                'status' => 'unpaid',
                'total_price' => $booking->total_price,
                'session_id' => $session->id, // Link to Stripe
                'booking_id' => $booking->id,
                'customer_id' => auth()->id(),
                'owner_id' => $booking->owner_id,
                'equipment_id' => $booking->equipment_id,
                'start_date' => $booking->start_date,
                'end_date' => $booking->end_date,
                'metadata' => [
                    'equipment' => $booking->equipment->name,
                    'stripe_session' => $session->id
                ]
            ]);


            return response()->json(['checkout_url' => $session->url]);

        } catch (\Exception $e) {
            Log::error('Checkout error: ' . $e->getMessage());
            return response()->json(['error' => 'Payment processing failed'], 500);
        }
    }

    /**
     * Displays the checkout success page after a successful Stripe payment.
     * Verifies the session ID and checks if the order exists.
     */
    public function success(Request $request)
    {
        try {
            $sessionId = $request->get('session_id');

            if (!$sessionId) {
                throw new NotFoundHttpException;
            }

            Stripe::setApiKey(config('stripe.sk'));
            $session = Session::retrieve($sessionId);
            $order = Order::where('session_id', $session->id)->first();

            if (!$session || !$order) {
                throw new NotFoundHttpException;
            }

            return Inertia::render('CheckoutSuccess', [
                'order' => $order,
                'payment_status' => $order->status
            ]);

        } catch (\Exception $e) {
            Log::error('Success page error: ' . $e->getMessage());
            throw new NotFoundHttpException;
        }
    }

    /**
     * Handles canceled payments.
     */
    public function cancel(Request $request)
    {
        $sessionId = $request->get('session_id');

        return Inertia::render('CheckoutCancel', [
            'session_id' => $sessionId,
            'message' => 'Payment was canceled'
        ]);
    }

    /**
     * Stripe webhook listener to handle payment events.
     */
public function webhook()
{
    Stripe::setApiKey(config('stripe.sk'));
    $endpoint_secret = config('stripe.whk');
    $payload = @file_get_contents('php://input');
    $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'] ?? '';
    $event = null;

    // Log the incoming webhook for debugging
    Log::info('Stripe webhook received', [
        'headers' => getallheaders(),
        'payload_length' => strlen($payload),
        'signature_present' => !empty($sig_header)
    ]);

    try {
        if ($endpoint_secret) {
            $event = Webhook::constructEvent($payload, $sig_header, $endpoint_secret);
            Log::info('Webhook signature verified successfully');
        } else {
            $event = \Stripe\Event::constructFrom(json_decode($payload, true));
            Log::warning('Webhook processed without signature verification');
        }

        // Log the event type and ID for debugging
        Log::info('Processing Stripe event', [
            'event_type' => $event->type,
            'event_id' => $event->id,
            'livemode' => $event->livemode ?? 'unknown'
        ]);

        switch ($event->type) {
            case 'checkout.session.completed':
                Log::info('Handling checkout.session.completed event');
                $this->handleCompletedSession($event->data->object);
                break;

            case 'checkout.session.async_payment_succeeded':
                Log::info('Handling checkout.session.async_payment_succeeded event');
                $this->handleCompletedSession($event->data->object);
                break;

            case 'checkout.session.async_payment_failed':
                Log::info('Handling checkout.session.async_payment_failed event');
                $this->handleFailedPayment($event->data->object);
                break;

            default:
                Log::info('Unhandled Stripe event: ' . $event->type);
        }

        Log::info('Webhook processed successfully');
        return response('Webhook Received', 200);

    } catch (\UnexpectedValueException $e) {
        Log::error('Webhook payload error: ' . $e->getMessage(), [
            'payload' => $payload,
            'exception' => $e
        ]);
        return response('Invalid payload', 400);
    } catch (\Stripe\Exception\SignatureVerificationException $e) {
        Log::error('Webhook signature verification failed: ' . $e->getMessage(), [
            'signature' => $sig_header,
            'exception' => $e
        ]);
        return response('Invalid signature', 400);
    } catch (\Exception $e) {
        Log::error('Webhook processing error: ' . $e->getMessage(), [
            'exception' => $e,
            'trace' => $e->getTraceAsString()
        ]);
        return response('Internal server error', 500);
    }
}

protected function handleCompletedSession($session)
{
    Log::info('handleCompletedSession called', [
        'session_id' => $session->id,
        'payment_status' => $session->payment_status ?? 'unknown',
        'customer_email' => $session->customer_email ?? 'not provided'
    ]);

    // Check if this is actually a paid session
    if (isset($session->payment_status) && $session->payment_status !== 'paid') {
        Log::warning('Session completed but payment status not paid', [
            'session_id' => $session->id,
            'payment_status' => $session->payment_status
        ]);
        return;
    }

    $order = Order::where('session_id', $session->id)->first();

    if (!$order) {
        Log::error('Order not found for session_id', [
            'session_id' => $session->id,
            'available_orders' => Order::select('id', 'session_id', 'status')->get()->toArray()
        ]);
        return;
    }

    Log::info('Order found', [
        'order_id' => $order->id,
        'current_status' => $order->status,
        'session_id' => $order->session_id
    ]);

    if ($order->status === 'unpaid') {
        try {
            $order->update([
                'status' => 'paid',
                'paid_at' => now(), // Add timestamp if you have this column
            ]);

            Log::info('Order status updated to paid', [
                'order_id' => $order->id,
                'session_id' => $session->id
            ]);

            // Additional processing
            $this->processSuccessfulPayment($order, $session);

        } catch (\Exception $e) {
            Log::error('Failed to update order status', [
                'order_id' => $order->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
    } else {
        Log::info('Order already processed', [
            'order_id' => $order->id,
            'current_status' => $order->status
        ]);
    }
}

protected function handleFailedPayment($session)
{
    Log::info('handleFailedPayment called', [
        'session_id' => $session->id,
        'payment_status' => $session->payment_status ?? 'unknown'
    ]);

    $order = Order::where('session_id', $session->id)->first();

    if ($order) {
        $order->update([
            'status' => 'failed',
            'failed_at' => now(),
        ]);

        Log::info('Order marked as failed', [
            'order_id' => $order->id,
            'session_id' => $session->id
        ]);
    }
}

protected function processSuccessfulPayment($order, $session)
{
    try {
        // 1. Send confirmation email
        // Mail::to($order->user->email)->send(new PaymentConfirmationMail($order));

        // 2. Update inventory if needed
        // $this->updateInventory($order);

        // 3. Trigger fulfillment processes
        // $this->triggerFulfillment($order);

        Log::info('Post-payment processing completed', [
            'order_id' => $order->id
        ]);

    } catch (\Exception $e) {
        Log::error('Post-payment processing failed', [
            'order_id' => $order->id,
            'error' => $e->getMessage()
        ]);
    }
}
}
