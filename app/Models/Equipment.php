<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


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

    public function owner()
{
    return $this->belongsTo(User::class, 'user_id');
}
}
