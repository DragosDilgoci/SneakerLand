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
            'description' => ['required', 'string'],
            'images.*' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
        ];
    }

    public function updateOrCreate(?Product $product = null): void
{
    if (!$product) {
        $product = new Product();
    }
    
    $product->name = $this->get('name');
    $product->category_id = $this->get('category_id');
    $product->price = $this->get('price');
    $product->description = $this->get('description');
    
    $product->save();

    // Handle images
    if ($this->hasFile('images')) {
        // Optionally, delete existing images
        $product->images()->delete();

        foreach ($this->file('images') as $image) {
            $path = $image->store('product_images', 'public');
            
            // Create a new ProductImage record
            ProductImage::create([
                'product_id' => $product->id,
                'path' => $path,
            ]);
        }
    }
}   
}
