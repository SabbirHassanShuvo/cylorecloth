<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
            Schema::create('users', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('email')->unique();

                // Email OTP
                $table->string('email_otp')->nullable();
                $table->timestamp('email_otp_expires_at')->nullable();
                $table->timestamp('email_verified_at')->nullable();

                // Phone OTP
                $table->string('phone')->nullable()->unique();
                $table->string('phone_otp')->nullable();
                $table->timestamp('phone_otp_expires_at')->nullable();
                $table->timestamp('phone_verified_at')->nullable();

                $table->string('password');
                $table->tinyInteger('status')->default(1);
                $table->enum('role', ['admin', 'manager', 'customer'])->default('customer');

                $table->rememberToken();
                $table->timestamps();
                $table->softDeletes(); // soft delete
            });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
