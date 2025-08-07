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
$equipment = Equipment::with(['media', 'owner'])->get()->map(function ($item) {
        // Transform each equipment item to include media URLs
        $itemArray = $item->toArray();
        $itemArray['media'] = $item->media->map(function ($media) {
            return [
                ...$media->toArray(),
                'url' => $media->url // This will call your getUrlAttribute()
            ];
        });
        return $itemArray;
    });

    return Inertia::render('Home', [
        'equipment' => $equipment
    ]);
}
}
