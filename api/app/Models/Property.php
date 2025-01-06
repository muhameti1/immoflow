<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Property extends Model
{
    use SoftDeletes;

    public $incrementing = false;
    protected $keyType = 'string';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id = Str::random(8);
        });
    }

    protected $fillable = [
        'company_id',
        'title',
        'description',
        'status',
        'category',
        'object_type',
        'warnings',
        'features',
        'order_number',
        'unit_number',
        'internal_note',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function prices()
    {
        return $this->hasMany(PropertyPrice::class);
    }

    public function areas()
    {
        return $this->hasOne(PropertyArea::class);
    }

    public function additionalInformation()
    {
        return $this->hasOne(PropertyAdditionalInformation::class);
    }

    public function equipment()
    {
        return $this->hasOne(PropertyEquipment::class);
    }

    public function address()
    {
        return $this->hasOne(PropertyAddress::class);
    }
}
