<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropertyEquipment extends Model
{
    protected $fillable = [
        'property_id',
        'bathtub',
        'shower',
        'guest_toilet',
        'alarm_system',
        'smart_lock',
        'air_conditioning',
        'floor_heating',
        'elevator',
        'barrier_free',
        'furnished',
        'balcony',
        'terrace',
        'garden',
        'parking',
        'garage',
    ];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
