<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropertyPrice extends Model
{
    protected $fillable = [
        'property_id',
        'amount',
        'price_per_meter',
        'currency',
        'type',
        'price_on_request',
        'warm_rent',
        'cold_rent',
        'heating_costs',
        'additional_costs',
        'non_transferable_costs',
        'parking_price',
        'monthly_rental_income',
        'heating_in_additional_costs',

    ];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
