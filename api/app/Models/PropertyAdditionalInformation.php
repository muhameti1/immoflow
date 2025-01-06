<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropertyAdditionalInformation extends Model
{
    protected $fillable = [
        'property_id',
        'year_built',
        'last_renovation_year',
        'number_of_floors',
        'floor_number',
        'number_of_rooms',
        'number_of_bathrooms',
        'parking_spaces',
        'energy_rating',
        'heating_type',
        'construction_type',
        'building_condition',
        'last_modernization',
        'interior_quality',
    ];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
