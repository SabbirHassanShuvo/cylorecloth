<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'phone' => '01700000001',
                'password' => Hash::make('12345678'),
                'role' => 'admin',
                'status' => 1,
                'email_verified_at' => now(),
                'phone_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'manager@example.com'],
            [
                'name' => 'Manager User',
                'phone' => '01700000002',
                'password' => Hash::make('12345678'),
                'role' => 'manager',
                'status' => 1,
                'email_verified_at' => now(),
                'phone_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'Customer User',
                'phone' => '01700000003',
                'password' => Hash::make('12345678'),
                'role' => 'customer',
                'status' => 1,
                'email_verified_at' => now(),
                'phone_verified_at' => now(),
            ]
        );
    }
}
