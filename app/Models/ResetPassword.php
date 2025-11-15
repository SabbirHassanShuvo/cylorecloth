<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class ResetPassword extends Model
{
    use HasFactory;
    protected $primaryKey = 'email';
    const UPDATED_AT = null;
    protected $table = 'password_reset_tokens';
    protected $fillable = [
        'email',
        'token',
    ]; //
}
