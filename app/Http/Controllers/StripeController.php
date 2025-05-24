<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class StripeController extends Controller
{
    public function index()
    {
        // $products = Equipment::all();

        // return view('product.index', compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     */
public function checkout()
{
        \Stripe\Stripe::setApiKey(config('stripe.sk'));

        $lineItems = [[
            'price_data' => [
                'currency' => 'usd',
                'product_data' => [
                    'name' => 'Futsal Shin Pad - Brand Mizuno',
                ],
                'unit_amount' => 2000,
            ],
            'quantity' => 1,
        ]];

        $session = \Stripe\Checkout\Session::create([
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => route('checkout.success', [], true) . '?session_id={CHECKOUT_SESSION_ID}',
        ]);

        $order = new \App\Models\Order();
        $order->status = 'unpaid';
        $order->total_price = 20.00;
        $order->session_id = $session->id;
        $order->save();

        return response()->json(['checkout_url' => $session->url]);
    }

        /**
         * Store a newly created resource in storage.
         */
        public function success(Request $request)
        {
            \Stripe\Stripe::setApiKey(config('stripe.sk'));
            $sessionId = $request->get('session_id');

                try {
                    $session = \Stripe\Checkout\Session::retrieve($sessionId);
                    if (!$session) {
                        throw new NotFoundHttpException;
                    }
                    $customer = \Stripe\Customer::retrieve($session->customer);

                    $order = Order::where('session_id', $session->id)->first();
                    if (!$order) {
                        throw new NotFoundHttpException();
                    }
                    if ($order->status === 'unpaid') {
                        $order->status = 'paid';
                        $order->save();
                    }

                    return view('product.checkout-success', compact('customer'));
                } catch (\Exception $e) {
                    throw new NotFoundHttpException();
                }


        }

        public function cancel(Request $request)
        {
            //void
        }

            public function webhook()
        {


                \Stripe\Stripe::setApiKey(config('stripe.sk'));
                // Replace this endpoint secret with your endpoint's unique secret
                // If you are testing with the CLI, find the secret by running 'stripe listen'
                // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
                // at https://dashboard.stripe.com/webhooks
                $endpoint_secret = config('stripe.whk');

                $payload = @file_get_contents('php://input');
                $event = null;

                try {
                $event = \Stripe\Event::constructFrom(
                    json_decode($payload, true)
                );
                } catch(\UnexpectedValueException $e) {
                // Invalid payload
                echo '⚠️  Webhook error while parsing basic request.';
                    return response('', 400);
                }
                if ($endpoint_secret) {
                // Only verify the event if there is an endpoint secret defined
                // Otherwise use the basic decoded event
                $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
                try {
                    $event = \Stripe\Webhook::constructEvent(
                    $payload, $sig_header, $endpoint_secret
                    );
                } catch(\Stripe\Exception\SignatureVerificationException $e) {
                    // Invalid signature
                    echo '⚠️  Webhook error while validating signature.';
                    return response('', 400);
                }
                }

                // Handle the event
                switch ($event->type) {
                    case 'checkout.session.completed':
                                    $session = $event->data->object;

                                    $order = Order::where('session_id', $session->id)->first();
                                    if ($order && $order->status === 'unpaid') {
                                        $order->status = 'paid';
                                        $order->save();
                                        // Send email to customer
                                    }

                                // ... handle other event types
                                default:
                                    echo 'Received unknown event type ' . $event->type;
                }

                return response('');
                }

}

