<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'owner_id',        // ✅ Make sure this is also in your fillable
        'equipment_id',
        'pickup_loc',
        'return_loc',
        'start_date',
        'end_date',
        'total_price',
        'status',
    ];

    /**
     * Customer who made the booking
     */
    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    /**
     * Owner of the equipment being booked
     */
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    /**
     * Equipment being booked
     */
    public function equipment()
    {
        return $this->belongsTo(Equipment::class);
    }
}
