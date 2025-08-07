<?php

use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StripeController;
use App\Models\Booking;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/Home', [HomeController::class, 'index'])->middleware('auth')->name('Home');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/equipment/{equipment}/book', [OrderController::class, 'handleBookingRequest'])
    ->name('equipment.book');
    //Show orders summary
    Route::get('/orders/{booking}/equipment/{equipment}/summary', [OrderController::class, 'summary'])
    ->name('bookings.summary');
    //Show booking request to owners
    Route::get('/UserProfile/bookings', [OrderController::class, 'fetchOwnerOrders'])
    ->name('owner.orders.index');
     // Accept booking
    Route::post('/bookings/{id}/accept', [OrderController::class, 'accept'])->name('bookings.accept');
    // Deny booking
    Route::post('/bookings/{id}/deny', [OrderController::class, 'deny'])->name('bookings.deny');
    //Show listings
    Route::get('/UserProfile/listings',[ProfileController::class,'listings'])->name('profile.listings');
    //Show booking request
    Route::get('/UserProfile/Customer_bookings',[ProfileController::class,'customersBookings'])->name('profile.bookings');
    Route::put('/equipment/{equipment}/images', [EquipmentController::class, 'updateImages'])->name('equipment.images.update');
    Route::delete('/media/{media}', [EquipmentController::class, 'deleteImage'])->name('media.delete');
});

Route::get('/UserProfile', [ProfileController::class, 'show'])
    ->middleware('auth')
    ->name('ProfileController.show');

Route::fallback(function() {
    return response()->view('404',[],404);
});

Route::resource('equipment', EquipmentController::class)->middleware('auth');


Route::get('/stripe', [StripeController::class, 'summary'])->name('stripe.summary');
Route::post('/checkout', [StripeController::class, 'checkout'])->name('stripe.checkout');
Route::get('/success', [StripeController::class, 'success'])->name('checkout.success');
Route::get('/checkout/cancel', [StripeController::class, 'cancel'])->name('checkout.cancel');
Route::post('/webhook', [StripeController::class, 'webhook']);

Route::get('/debug-stripe-keys', function() {
    return [
        'STRIPE_SECRET_KEY' => env('STRIPE_SECRET_KEY'),
        'stripe.whk (resolved)' => config('stripe.whk'),
        'webhook_secret_matches' => env('STRIPE_WEBHOOK_KEY') === config('stripe.whk')
    ];
});

require __DIR__.'/auth.php';
