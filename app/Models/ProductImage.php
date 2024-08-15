<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductImage extends Model
{
    use HasTimestamps;

    protected $fillable = ['product_id', 'path'];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
