<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Equipment extends Model
{
    /** @use HasFactory<\Database\Factories\EquipmentFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'sports',
        'size',
        'condition',
        'location',
        'description',
        'rentalPrice',
        'dateAvailability'
    ];

    protected $casts = [
        'rentalPrice' => 'float',
        'dateAvailability' => 'date',
    ];

    /**
     * Get the owner of the equipment
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get all orders for this equipment
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Get all bookings for this equipment
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Get all media for the equipment
     */
    public function media(): HasMany
    {
        return $this->hasMany(Media::class)->orderBy('sort_order');
    }

    /**
     * Get the primary image for the equipment
     */
    public function primaryImage(): HasOne
    {
        return $this->hasOne(Media::class)->where('is_primary', true);
    }

    /**
     * Get all images (excluding videos/docs if added later)
     */
    public function images(): HasMany
    {
        return $this->hasMany(Media::class)
            ->where('file_type', 'image')
            ->orderBy('sort_order');
    }

    /**
     * Get the primary image URL or return placeholder
     */
    public function getPrimaryImageUrlAttribute(): string
    {
        return $this->primaryImage?->url ?? '/images/equipment-placeholder.jpg';
    }

    /**
     * Get all image URLs as array
     */
    public function getImageUrlsAttribute(): array
    {
        return $this->images->pluck('url')->toArray();
    }

    /**
     * Check if equipment has images
     */
    public function hasImages(): bool
    {
        return $this->images()->exists();
    }

    /**
     * Boot method to handle model events
     */
    protected static function boot()
    {
        parent::boot();

        // When equipment is deleted, delete associated media files
        static::deleting(function ($equipment) {
            $equipment->media->each(function ($media) {
                Storage::delete($media->file_path);
                $media->delete();
            });
        });
    }
}
