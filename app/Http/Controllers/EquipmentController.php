<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Http\Requests\StoreEquipmentRequest;
use App\Http\Requests\UpdateEquipmentRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use function Termwind\render;
class EquipmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $equipment = Equipment::with('owner:id,name')->get(); // Eager load owner name
        return Inertia::render('Equipment_index', [
        'equipment' => $equipment
    ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
            return Inertia::render('Equipment_add', [
            'user' => auth()->user()->only('id', 'name', 'email')
    ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //sleep(2);
        //dd($request->all());
        // Validate form data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sports' => 'required|string',
            'size' => 'required|string',
            'condition' => 'required|string',
            'location' => 'required|string',
            'description' => 'nullable|string',
            'rentalPrice' => 'required|numeric|min:0',
            'dateAvailability' => 'required|date',
            //'pictures' => 'nullable|array',
            //'pictures.*' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Create equipment record
        //Equipment::create($equipment);
        //Create
        $equipment = Equipment::create([
        'user_id' => auth()->id(), // Gets ID of logged-in user
        ...$validated
        ]);

        return redirect('/Home');
        // return redirect()->back()->with('success', 'Equipment listed successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //$equipment = Equipment::with('owner:id,name')->get(); // Eager load owner name
        //return Inertia::render('Equipment_details');
            $equipment = Equipment::findOrFail($id);

            return Inertia::render('Equipment_details', [
            'equipment' => $equipment
    ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Equipment $equipment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEquipmentRequest $request, Equipment $equipment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Equipment $equipment)
    {
        //
    }
}
