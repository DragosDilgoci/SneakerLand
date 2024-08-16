<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
// use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasTimestamps;

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($product) {
            $product->images()->delete();
        });
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
