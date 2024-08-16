<?php

namespace App\Http\Requests;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;

class ProductRequest extends FormRequest
{
    public function rules(): array
{
    return [
        'name' => ['required', 'string', 'max:255'],
        'category_id' => ['required', 'exists:categories,id'],
        'price' => ['required', 'numeric'],
        'description' => ['nullable', 'string'],
        'images.*' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:8192'],
    ];
}


public function updateOrCreate(?Product $product = null): Product
{
    if (!$product) {
        $product = new Product();
    }
    
    $product->name = $this->input('name');
    $product->category_id = $this->input('category_id');
    $product->price = $this->input('price');
    $product->description = $this->input('description');
    
    $product->save();

    if ($this->hasFile('images')) {
        $product->images()->delete();

        foreach ($this->file('images') as $image) {
            $path = $image->store('product_images', 'public');

            ProductImage::create([
                'product_id' => $product->id,
                'path' => $path,
            ]);
        }
    }

    return $product;
}

}
