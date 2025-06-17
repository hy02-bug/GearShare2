<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use App\Http\Controllers\EquipmentController;

class HomeController extends Controller
{
public function index()
{
    $equipment = Equipment::with(['owner:id,name'])->get(); // Add eager loading

    return Inertia::render('Home', [
        'user' => Auth::user(),
        'equipment' => $equipment,
    ]);
}
}
