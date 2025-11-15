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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->foreignId('sub_category_id')
                ->nullable()
                ->constrained('subcategories')
                ->onDelete('cascade');

            $table->string('title');
            $table->string('slug');
            $table->decimal('regular_price', 10, 2);
            $table->decimal('discount_price', 10, 2)->nullable();
            $table->integer('discount_percent')->nullable();
            $table->string('color')->nullable();
            $table->string('fabric')->nullable();
            $table->text('description')->nullable();

            $table->string('brand')->nullable(); // Brand name (optional)
            $table->integer('stock')->default(1); // Product stock quantity
            $table->unsignedBigInteger('view_count')->default(0); // Number of views
            $table->boolean('is_featured')->default(false); // Featured product flag
            $table->boolean('is_hot_deal')->default(false); // Hot deal flag

            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->string('thumbnail')->nullable(); // Product thumbnail image
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
