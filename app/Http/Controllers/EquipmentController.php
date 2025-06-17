<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Http\Requests\StoreEquipmentRequest;
use App\Http\Requests\UpdateEquipmentRequest;
use App\Models\Media;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
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
     */    public function store(Request $request)
    {
        // Validate form data including pictures
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sports' => 'required|string|max:255',
            'size' => 'required|string|max:100',
            'condition' => 'required|string|max:100',
            'location' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'rentalPrice' => 'required|numeric|min:0',
            'dateAvailability' => 'required|date|after_or_equal:today',
            'pictures' => 'required|array|min:1|max:10',
            'pictures.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB max per image
        ]);

        try {
            // Use database transaction to ensure data consistency
            DB::beginTransaction();

            // Create equipment
            $equipment = Equipment::create([
                'user_id' => auth()->id(),
                'name' => $validated['name'],
                'sports' => $validated['sports'],
                'size' => $validated['size'],
                'condition' => $validated['condition'],
                'location' => $validated['location'],
                'description' => $validated['description'],
                'rentalPrice' => $validated['rentalPrice'],
                'dateAvailability' => $validated['dateAvailability'],
            ]);

            // Handle image uploads
            if ($request->hasFile('pictures')) {
                $this->uploadEquipmentImages($equipment, $request->file('pictures'));
            }

            DB::commit();

            return redirect('/Home')->with('success', 'Equipment listed successfully with ' . count($request->file('pictures')) . ' images!');

        } catch (\Exception $e) {
            DB::rollback();

            // Log error for debugging
            \Log::error('Equipment creation failed: ' . $e->getMessage());

            return back()
                ->withInput()
                ->withErrors(['error' => 'Failed to create equipment. Please try again.']);
        }
    }

    /**
     * Handle multiple image uploads for equipment
     */
    private function uploadEquipmentImages(Equipment $equipment, array $images): void
    {
        foreach ($images as $index => $image) {
            try {
                // Generate unique filename
                $filename = Str::uuid() . '.' . $image->getClientOriginalExtension();

                // Store in equipment subfolder organized by equipment ID
                $path = $image->storeAs('equipment/' . $equipment->id, $filename, 'public');

                // Create media record
                Media::create([
                    'equipment_id' => $equipment->id,
                    'file_name' => $image->getClientOriginalName(),
                    'file_path' => $path,
                    'file_type' => 'image',
                    'file_size' => $image->getSize(),
                    'mime_type' => $image->getMimeType(),
                    'is_primary' => $index === 0, // First image is primary
                    'sort_order' => $index,
                ]);

            } catch (\Exception $e) {
                \Log::error('Image upload failed for equipment ' . $equipment->id . ': ' . $e->getMessage());
                // Continue with other images even if one fails
            }
        }
    }

    /**
     * Update equipment images
     */
    public function updateImages(Request $request, Equipment $equipment)
    {
        // Check if user owns this equipment
        if ($equipment->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        $request->validate([
            'pictures' => 'required|array|min:1|max:10',
            'pictures.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        try {
            DB::beginTransaction();

            // Delete existing images
            $equipment->media->each(function ($media) {
                Storage::delete($media->file_path);
                $media->delete();
            });

            // Upload new images
            if ($request->hasFile('pictures')) {
                $this->uploadEquipmentImages($equipment, $request->file('pictures'));
            }

            DB::commit();

            return back()->with('success', 'Images updated successfully!');

        } catch (\Exception $e) {
            DB::rollback();
            \Log::error('Image update failed: ' . $e->getMessage());

            return back()->withErrors(['error' => 'Failed to update images. Please try again.']);
        }
    }

    /**
     * Delete a specific image
     */
    public function deleteImage(Media $media)
    {
        // Check if user owns the equipment
        if ($media->equipment->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        // Don't allow deleting the last image
        if ($media->equipment->media()->count() <= 1) {
            return back()->withErrors(['error' => 'Cannot delete the last image. Equipment must have at least one image.']);
        }

        try {
            // Delete file from storage
            Storage::delete($media->file_path);

            // If this was the primary image, set another image as primary
            if ($media->is_primary && $media->equipment->media()->count() > 1) {
                $nextImage = $media->equipment->media()
                    ->where('id', '!=', $media->id)
                    ->orderBy('sort_order')
                    ->first();

                if ($nextImage) {
                    $nextImage->update(['is_primary' => true]);
                }
            }

            // Delete media record
            $media->delete();

            return back()->with('success', 'Image deleted successfully!');

        } catch (\Exception $e) {
            \Log::error('Image deletion failed: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Failed to delete image. Please try again.']);
        }
    }
    /**
     * Display the specified resource.
     */
public function show($id)
{
    $equipment = Equipment::with([
        'media', // Ensure media relationship is loaded
        'owner:id,name,email'
    ])->findOrFail($id);

    // Get the first media item's URL (or null if no media)
    $equipment->image_url = $equipment->media->first()?->getUrl();

    $existingRequest = auth()->user()
        ->customerBookings()
        ->where('equipment_id', $equipment->id)
        ->first();

    return Inertia::render('dummy', [
        'user' => Auth::user(),
        'equipment' => $equipment,
        'existingRequest' => $existingRequest !== null,
    ]);
}

        /**
     * Show equipment with media
     */
    // public function show(Equipment $equipment)
    // {
    //     $equipment->load(['media', 'owner']);

    //     return inertia('Equipment/Show', [
    //         'equipment' => $equipment,
    //     ]);
    // }

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
