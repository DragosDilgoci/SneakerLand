<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Storage;

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

    public function edit(Product $product)
    {
        $categories = Category::orderBy('order')->get();

        return Inertia::render('Products/AddEdit', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    public function store(ProductRequest $request)
    {
        $request->updateOrCreate();

        return redirect()->route('products.list')->with(['success' => 'Product saved.']);
    }

    public function update(ProductRequest $request, Product $product)
    {
        $request->updateOrCreate($product);

        return redirect()->route('products.list')->with(['success' => 'Product updated.']);
    }

    public function delete(Product $product)
    {
        $product->delete();

        return redirect()->route('products.list')->with(['success' => 'Product deleted.']);
    }

    public function view(Product $product)
    {
        $product->load('category', 'images');

        $product->images->each(function ($image) {
            $image->url = Storage::url($image->path);
        });

        return Inertia::render('Products/View', [
            'product' => $product,
        ]);
    }
}
