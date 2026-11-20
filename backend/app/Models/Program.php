<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    protected $fillable = [
        'title',
        'description',
        'price',
        'city',
        'duration',
        'image_path',
        'is_active',
        'discount',
        'locations',
        'images',
        'rating',
        'featured',
    ];

    protected function casts(): array
    {
        return [
            'title' => 'array',
            'description' => 'array',
            'locations' => 'array',
            'images' => 'array',
            'is_active' => 'boolean',
            'featured' => 'boolean',
            'price' => 'decimal:2',
            'discount' => 'decimal:2',
            'rating' => 'decimal:1',
        ];
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
