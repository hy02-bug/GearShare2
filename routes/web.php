<?php

use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StripeController;
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


Route::get('/Home', [HomeController::class, 'index'])->middleware('auth');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/UserProfile', [ProfileController::class, 'show'])
    ->middleware('auth')
    ->name('ProfileController.show');

Route::fallback (function() {
    return response()->view('404',[],404);
});

// Route::get('/equipment/create', [EquipmentController::class, 'create'])
//     ->middleware('auth')
//     ->name('EquipmentController.create');

Route::resource('equipment', EquipmentController::class)->middleware('auth');
Route::resource('order', OrderController::class)->middleware('auth');

// Route::get('/equipmentdetails', function () {
//     return Inertia::render('Equipment_details');
// })->middleware(['auth']);

// Route::middleware('auth')->group(function () {
//     // Main resource route for all CRUD operations
//     Route::resource('orders', OrderController::class);

//     // Custom routes outside the resource
//     Route::get('/equipment/{equipment}/summary', [OrderController::class, 'summary'])
//         ->name('orders.summary');
//     Route::post('/orders/{order}/checkout', [OrderController::class, 'checkout_order'])
//         ->name('orders.checkout');

//     Route::get('/OrderSummary', function () {
//     return Inertia::render('OrderSummary');
// })->middleware(['auth', 'verified'])->name('OrderSummary');
// });

//Route::resource('stripe',StripeController::class);

Route::get('/stripe', [StripeController::class, 'index']);
Route::post('/checkout', [StripeController::class, 'checkout'])->name('checkout');
Route::get('/success', [StripeController::class, 'success'])->name('checkout.success');
//Route::get('/cancel', [ProductController::class, 'cancel'])->name('checkout.cancel');
Route::post('/webhook', [StripeController::class, 'webhook'])->name('checkout.webhook');

require __DIR__.'/auth.php';
