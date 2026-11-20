<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $fillable = [
        'name',
        'points',
    ];

    protected function casts(): array
    {
        return [
            'name' => 'array',
            'points' => 'array',
        ];
    }
}
