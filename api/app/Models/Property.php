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
}
