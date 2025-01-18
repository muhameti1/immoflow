<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        "property_id",
        "title",
        "document_path",
        "category",
        "expiration_date",

    ];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
