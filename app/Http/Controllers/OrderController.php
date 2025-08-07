<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use App\Models\Equipment;
use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
public function create($equipmentId)
    {
        $equipment = Equipment::findOrFail($equipmentId);

        return Inertia::render('Equipment_details', [
            'equipment' => $equipment,
            'stripeKey' => env('STRIPE_KEY')
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
 public function store(Request $request)
    {
        $validated = $request->validate([
            'equipment_id' => 'required|exists:equipment,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'payment_method_id' => 'required' // For Stripe
        ]);

        // Calculate total price
        $days = now()->parse($validated['end_date'])
            ->diffInDays($validated['start_date']);
        $total = $days * Equipment::find($validated['equipment_id'])->rentalPrice;

        // Create order
        $order = Order::create([
            'user_id' => auth()->id(),
            'equipment_id' => $validated['equipment_id'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'total_amount' => $total,
            'status' => 'pending'
        ]);
                // Process payment (Stripe example)
        try {
            auth()->user()->charge(
                $total * 100, // Convert to cents
                $validated['payment_method_id']
            );

            $order->update(['status' => 'paid']);

            return redirect()->route('orders.show', $order->id)
                ->with('success', 'Payment successful!');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }


        public function checkout()
    {
        return Inertia::render('Checkout'
        );
    }


public function handleBookingRequest(Request $request, $equipmentId)
{
    $validated = $request->validate([
        'pickupLocation' => 'required|string|max:255',
        'returnLocation' => 'required|string|max:255',
        'pickupDate' => 'required|date',
        'returnDate' => 'required|date',
        'totalPrice' => 'required|numeric',
    ]);

    $equipment = Equipment::findOrFail($equipmentId);

    $booking = Booking::create([
        'customer_id'   => auth()->id(), // or however you're getting the user
        'equipment_id'  => $equipmentId,
        'owner_id'      => $equipment->user_id,
        'pickup_loc'    => $validated['pickupLocation'],
        'return_loc'    => $validated['returnLocation'],
        'start_date'    => Carbon::parse($validated['pickupDate'])->format('Y-m-d'),
        'end_date'      => Carbon::parse($validated['returnDate'])->format('Y-m-d'),
        'total_price'   => $validated['totalPrice'],
    ]);

    return back()->with('success', 'Booking created!');
}


/**
 * Show order summary page
 */
public function summary(Booking $booking, Equipment $equipment)
{
    try {
        Log::info('Accessing booking summary', [
            'booking_id' => $booking->id,
            'equipment_id' => $equipment->id,
            'user_id' => auth()->id()
        ]);

        // Ensure the authenticated user owns this booking
        if ($booking->customer_id !== auth()->id()) {
            Log::warning('Unauthorized booking access attempt', [
                'booking_id' => $booking->id,
                'user_id' => auth()->id()
            ]);
            return redirect()->back()->withErrors(['error' => 'Unauthorized access to booking.']);
        }

        return Inertia::render('BookingSummary', [
            'bookings' => $booking->load(['equipment', 'owner']),
            'equipment' => $equipment,
            'user' => auth()->user(),
        ]);
    } catch (\Exception $e) {
        Log::error('Booking summary page error: ' . $e->getMessage(), [
            'booking_id' => $booking->id ?? null,
            'equipment_id' => $equipment->id ?? null,
            'user_id' => auth()->id(),
            'error' => $e->getTraceAsString()
        ]);

        return redirect()->back()->withErrors(['error' => 'Unable to load booking summary.']);
    }
}

public function fetchOwnerOrders()
{
    // Get only orders for the authenticated owner's equipment
    $bookings = Booking::with(['customer', 'equipment'])
        ->where('owner_id', auth()->id())
         // Only show pending requests
        ->latest()
        ->get()
        ->map(function ($booking) {
            return [
                'id' => $booking->id,
                'start_date' => $booking->start_date,
                'end_date' => $booking->end_date,
                'pickup_location' => $booking->pickup_loc,
                'return_location' => $booking->return_loc,
                'status' => $booking->status,
                'total_price' => $booking->total_price,
                //'security_deposit' => $booking->security_deposit,
                'customer' => $booking->customer ? [
                    'name' => $booking->customer->name,
                    //'email' => $booking->customer->email,
                    // include other customer fields you need
                ] : null,
                'equipment' => $booking->equipment ? [
                    'id' => $booking->equipment->id,
                    'name' => $booking->equipment->name,
                    // include other equipment fields you need
                ] : null,
                'created_at' => $booking->created_at,
            ];
        });

    return Inertia::render('UserProfile/Bookings', [
        'bookings' => $bookings,
        'user' => auth()->user(),
        'statusLabels' => [
            'pending' => 'Pending Approval',
            'approved' => 'Approved',
            'paid' => 'Paid',
            'cancelled' => 'Cancelled'
        ]
    ]);
}

    /**
     * Accept a booking request
     */
     
    public function accept($id)
    {
        try {
            $booking = Booking::findOrFail($id);

            // Check if user is authorized to accept this booking
            // Add your authorization logic here
            // e.g., if ($booking->equipment->user_id !== auth()->id()) { abort(403); }

            // Check if booking is in pending status
            if ($booking->status !== 'pending') {
                return back()->withErrors(['message' => 'Booking cannot be accepted in its current status.']);
            }

            // Update booking status to accepted
            $booking->update([
                'status' => 'accepted'
            ]);

            // Optional: Send notification to customer
            // $this->notifyCustomer($booking, 'accepted');

            return back()->with('success', 'Booking has been accepted successfully.');

        } catch (\Exception $e) {
            \Log::error('Error accepting booking: ' . $e->getMessage());
            return back()->withErrors(['message' => 'An error occurred while accepting the booking.']);
        }
    }

    /**
     * Deny a booking request
     */
    public function deny($id)
    {
        try {
            $booking = Booking::findOrFail($id);

            // Check if user is authorized to deny this booking
            // Add your authorization logic here

            // Check if booking is in pending status
            if ($booking->status !== 'pending') {
                return back()->withErrors(['message' => 'Booking cannot be denied in its current status.']);
            }

            // Update booking status to denied
            $booking->update([
                'status' => 'denied'
            ]);

            // Optional: Send notification to customer
            // $this->notifyCustomer($booking, 'denied');

            return back()->with('success', 'Booking has been denied.');

        } catch (\Exception $e) {
            \Log::error('Error denying booking: ' . $e->getMessage());
            return back()->withErrors(['message' => 'An error occurred while denying the booking.']);
        }
    }
}
