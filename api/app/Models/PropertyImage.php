<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropertyImage extends Model
{
    protected $fillable = [
        'property_id',
        'file_path',
        'image_title',
        'is_thumbnail',
        'is_private',
        'show_in_portals'
    ];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
