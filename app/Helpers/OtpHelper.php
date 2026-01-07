<?php

namespace App\Helpers;

class OtpHelper
{
    public static function generate(): string
    {
        return strtoupper(substr(str_shuffle('ABCDEFGHJKLMNPQRSTUVWXYZ23456789'), 0, 6));
    }
}