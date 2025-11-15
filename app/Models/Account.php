<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    protected $fillable = [
        'user_id',
        'district',
        'city',
        'phone',
        'address',
        'image',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
