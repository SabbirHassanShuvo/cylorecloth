<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    protected $fillable = [
        'user_id',
        'category_id',
        'sub_category_id',
        'title',
        'slug',
        'regular_price',
        'discount_price',
        'discount_percent',
        'color',
        'fabric',
        'description',
        'brand',
        'stock',
        'status',
        'is_hot_deal',
        'is_featured',
    ];


    protected $casts = [
        'is_featured' => 'boolean',
        'is_hot_deal' => 'boolean',
        'stock' => 'integer'
    ];

    public function sizes()
    {
        return $this->hasMany(ProductSize::class);
    }
    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
