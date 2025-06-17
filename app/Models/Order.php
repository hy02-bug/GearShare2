<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
protected $fillable = [
    'customer_id',
    'owner_id',
    'equipment_id',
    'status',
    'total_price',
    'security_deposit',
    'session_id',
    'payment_intent_id',
    'approval_token',
    'start_date',
    'end_date',
    'approved_at',
    'paid_at',
    'customer_notes',
    'owner_notes',
    'pickup_location', // Added from your migration
    'return_location', // Added from your migration
    'rental_days',    // You're using this in your code
    'daily_rate'      // You're using this in your code
];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'customer_notes' => 'array',
        'owner_notes' => 'array',
        'approved_at' => 'datetime',
        'paid_at' => 'datetime',
    ];

    /**
     * Get the customer who placed the order
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    /**
     * Get the owner of the equipment
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    /**
     * Get the equipment being rented
     */
    public function equipment(): BelongsTo
    {
        return $this->belongsTo(Equipment::class, 'equipment_id');
    }

    /**
     * Scope for approved orders
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope for paid orders
     */
    public function scopePaid($query)
    {
        return $query->where('status', 'paid');
    }

    /**
     * Check if order is pending approval
     */
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }
}
