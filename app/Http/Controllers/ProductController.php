<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function list()
{
    $products = Product::with('category')->orderBy('name')->get();

    return Inertia::render('Products/List', [
        'products' => $products,
    ]);
}


    public function create()
{
    $categories = Category::orderBy('order')->get();

    return Inertia::render('Products/AddEdit', [
        'categories' => $categories,
    ]);
}

public function update(Product $product)
{
    $categories = Category::orderBy('order')->get();

    return Inertia::render('Products/AddEdit', [
        'product' => $product,
        'categories' => $categories,
    ]);
}

public function store(ProductRequest $request, ?Product $product = null)
    {
        $request->updateOrCreate($product);

        return redirect()->route('products.list')->with(['success' => 'Product saved.']);
    }


    public function delete(Product $product)
    {
        $product->delete();

        return redirect()->route('products.list')->with(['success' => 'Product deleted.']);
    }

    public function view(Product $product)
    {
        $product->load('category');

        return Inertia::render('Products/View', [
            'product' => $product->load('images'),
        ]);
    }

}