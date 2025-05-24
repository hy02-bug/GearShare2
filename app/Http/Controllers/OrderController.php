<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use Illuminate\Support\Facades\Request;
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

    public function summary($equipmentId)
    {
        $equipment = Equipment::findOrFail($equipmentId);

        return Inertia::render('OrderSummary', [
            'equipment' => $equipment,
            'user' => auth()->user(), // For prefilling user details
        ]);
        
    }

        public function checkout()
    {
        return Inertia::render('Checkout'
        );
    }
}
