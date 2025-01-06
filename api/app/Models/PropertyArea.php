<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropertyArea extends Model
{
    protected $fillable = [
        'property_id',
        'total_area',
        'living_area',
        'usable_area',
        'land_area',
        'storage_area',
        'terrace_area',
        'balcony_area',
        'garden_area',
        'basement_area',
        'garage_area',
        'parking_area',

    ];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
