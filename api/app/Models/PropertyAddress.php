<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropertyAddress extends Model
{
    protected $fillable = [
        'property_id',
        'street',
        'street_number',
        'zip_code',
        'city',
        'state',
        'country',
        'region',
        'latitude',
        'longitude',
        'hide_exact_location',
        'directions'
    ];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
