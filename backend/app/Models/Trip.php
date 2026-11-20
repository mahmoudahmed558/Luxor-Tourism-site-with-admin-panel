<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    protected $fillable = [
        'from_city',
        'to_city',
        'from_points',
        'to_points',
        'car_model',
        'time',
        'available',
        'duration',
        'price',
        'amenities',
        'rating',
    ];

    protected function casts(): array
    {
        return [
            'from_city' => 'array',
            'to_city' => 'array',
            'from_points' => 'array',
            'to_points' => 'array',
            'car_model' => 'array',
            'time' => 'array',
            'available' => 'boolean',
            'duration' => 'array',
            'amenities' => 'array',
            'price' => 'decimal:2',
            'rating' => 'decimal:1',
        ];
    }
}
