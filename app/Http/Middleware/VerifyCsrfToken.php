<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * যেসব রুট CSRF থেকে বাদ দেওয়া হবে
     * @var array<int, string>
     */
    protected $except = [
        '/login',
        '/logout',
    ];
}
