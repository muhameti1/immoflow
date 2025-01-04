<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'location',
        'bio',
        'social_links',
        'color_brand_company',
        'logo',
    ];

    public function agents()
    {
        return $this->hasMany(Agent::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
