<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Booking;
use App\Models\Equipment;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function show()
    {
        $user = Auth::user();

        return Inertia::render('UserProfile/Index', [
            'user' => $user,
        ]);
    }
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

public function listings(){
    // Get all equipment owned by the authenticated user
    $equipment = Equipment::with(['owner:id,name,email'])
        ->where('user_id', auth()->id())
        ->get();

    // For debugging - remove in production
    //dd($equipment);

    return Inertia::render('UserProfile/Listings', [
        'user' => Auth::user(),
        'equipment' => $equipment,
    ]);
}


    public function customersBookings(){
        $bookings = Booking::with(['equipment', 'owner']) // adjust as needed
        ->where('customer_id', auth()->id())
        ->latest()
        ->get();

    return Inertia::render('UserProfile/Customer_bookings', [
        'user' => Auth::user(),
        'bookings' => $bookings,
    ]);
    }
}
