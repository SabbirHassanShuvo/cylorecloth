<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductSize;
use App\Models\ProductImage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['user', 'category', 'images'])->latest();

        // Search filter
        if ($request->has('search') && $request->search != '') {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $lowerSearch = strtolower($search);

                $q->where('title', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($q2) use ($search) {
                        $q2->where('name', 'like', "%{$search}%");
                    })
                    ->orWhereHas('category', function ($q3) use ($search) {
                        $q3->where('name', 'like', "%{$search}%");
                    })

                    // Status filter: active / deactivate
                    ->orWhere(function ($q4) use ($lowerSearch) {
                        if (in_array($lowerSearch, ['active', 'inactive'])) {
                            $q4->whereRaw('LOWER(status) = ?', [$lowerSearch]);
                        }
                    })

                    // Hot deal filter: running = true, off = false
                    ->orWhere(function ($q5) use ($lowerSearch) {
                        if ($lowerSearch === 'running') {
                            $q5->where('is_hot_deal', true);
                        } elseif ($lowerSearch === 'off') {
                            $q5->where('is_hot_deal', false);
                        }
                    })

                    // Stock filter
                    ->orWhere(function ($q7) use ($search) {
                        if ($search === 'in stock') {
                            $q7->where('is_in_stock', true);
                        } elseif ($search === 'out of stock') {
                            $q7->where('is_in_stock', false);
                        }
                    });
            });
        }

        // Paginate the results
        $products = $query->paginate(10)->through(function ($product) {
            return [
                'id' => $product->id,
                'title' => $product->title,
                'user' => $product->user ? $product->user->name : 'Unknown',
                'category' => $product->category ? $product->category->name : 'No Category',
                'image' => $product->images->first() ? asset($product->images->first()->image_path) : null,
                'thumbnail' => $product->thumbnail ? asset($product->thumbnail) : null,
                'is_hot_deal' => $product->is_hot_deal ? 'Yes' : 'No',
                'is_featured' => $product->is_featured ? 'Yes' : 'No',
                'stock' => $product->stock ?? 0,
                'status' => ucfirst($product->status),
                'view_count' => $product->view_count ?? 0,
            ];
        });

        $previewProduct = null;
        if ($request->has('preview_id')) {
            $previewProduct = Product::with(['images', 'category', 'subCategory', 'user', 'sizes'])
                ->find($request->preview_id);
        }

        return Inertia::render('backend/product/Product', [
            'products' => $products,
            'filters' => $request->only('search'),
            'previewProduct' => $previewProduct,
        ]);
    }

    public function create()
    {
        $categories = Category::with('subcategories')->get();

        return Inertia::render('backend/product/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        // Validate Request
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'regular_price' => 'required|numeric',
            'discount_price' => 'nullable|numeric',
            'discount_percent' => 'nullable|numeric',
            'color' => 'nullable|string|max:100',
            'fabric' => 'nullable|string|max:100',
            'description' => 'required|string',
            'brand' => 'nullable|string|max:100',
            'stock' => 'nullable|integer|min:0',
            'is_hot_deal' => 'boolean',
            'is_featured' => 'boolean',
            'status' => 'required|in:active,inactive',
            'category_id' => 'required|exists:categories,id',
            'subcategory_id' => 'nullable|exists:subcategories,id',
            'sizes' => 'nullable|array',
            'sizes.*' => 'string|max:10',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return redirect()->route('product.create')
                ->withInput()
                ->withErrors($validator);
        }

        // Create Product
        $product = new Product();
        $product->user_id = $user->id;
        $product->title = $request->title;
        $product->slug = Str::slug($request->title);
        $product->regular_price = $request->regular_price;
        $product->discount_price = $request->discount_price;
        $product->discount_percent = $request->discount_percent;
        $product->color = $request->color;
        $product->fabric = $request->fabric;
        $product->description = $request->description;
        $product->brand = $request->brand;
        $product->stock = $request->stock ?? 1;
        $product->is_hot_deal = $request->is_hot_deal ?? false;
        $product->is_featured = $request->is_featured ?? false;
        $product->status = $request->status;
        $product->category_id = $request->category_id;
        $product->sub_category_id = $request->subcategory_id;
        $product->save();

        // Save Sizes
        if ($request->has('sizes')) {
            foreach ($request->sizes as $size) {
                $productSize = new ProductSize();
                $productSize->product_id = $product->id;
                $productSize->size = $size;
                $productSize->save();
            }
        }

        // Save Images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('uploads/products'), $imageName);

                $productImage = new ProductImage();
                $productImage->product_id = $product->id;
                $productImage->image_path = 'uploads/products/' . $imageName;
                $productImage->save();
            }
        }
        

        // ✅ Save Thumbnail
        if ($request->hasFile('thumbnail')) {
            $thumb = $request->file('thumbnail');
            $thumbName = 'thumb_' . time() . '_' . uniqid() . '.' . $thumb->getClientOriginalExtension();

            // ✅ Resize thumbnail using Intervention
            $image = Image::make($thumb);
            $image->resize(400, 400, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });

            // ✅ Save to public/uploads/products/
            $image->save(public_path('uploads/products/thumb/' . $thumbName));

            // ✅ Save path to product model
            $product->thumbnail = 'uploads/products/thumb/' . $thumbName;
            $product->save();
        }


        // Redirect with success message
        return redirect()->route('product.create')->with('success', 'Product Created Successfully!');
    }

    public function edit($id)
    {
        $product = Product::with(['user', 'category', 'subCategory', 'images', 'sizes'])->find($id);

        // Get all categories and their subcategories
        $categories = Category::with('subcategories')->get(); // Changed to lowercase

        return Inertia::render('backend/product/Edit', [
            'product' => [
                'id' => $product->id,
                'title' => $product->title,
                'regular_price' => $product->regular_price,
                'discount_price' => $product->discount_price,
                'discount_percent' => $product->discount_percent,
                'color' => $product->color,
                'fabric' => $product->fabric,
                'description' => $product->description,
                'brand' => $product->brand,
                'stock' => $product->stock,
                'is_hot_deal' => $product->is_hot_deal,
                'is_featured' => $product->is_featured,
                'status' => $product->status,
                'category_id' => $product->category_id,
                'subcategory_id' => $product->sub_category_id,
                'sizes' => $product->sizes->pluck('size')->toArray(),
                'category' => $product->category ? $product->category->name : null,
                'sub_category' => $product->sub_category ? $product->sub_category->name : null,
                'category' => $product->category ? $product->category->name : null,
                'sub_category' => $product->sub_category ? $product->sub_category->name : null,
                'images' => $product->images->map(function ($img) {
                    return asset($img->image_path);
                }),
            ],
            'categories' => $categories->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'subcategories' => $category->subcategories->map(function ($sub) { // lowercase
                        return [
                            'id' => $sub->id,
                            'name' => $sub->name
                        ];
                    })
                ];
            }),
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'regular_price' => 'required|numeric',
            'discount_price' => 'nullable|numeric',
            'discount_percent' => 'nullable|numeric',
            'color' => 'required|string|max:100',
            'fabric' => 'required|string|max:100',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'subcategory_id' => 'nullable|exists:subcategories,id',
            'brand' => 'nullable|string|max:100',
            'stock' => 'required|numeric|min:0',
            'is_featured' => 'boolean',
            'is_hot_deal' => 'boolean',
            'status' => 'required|in:active,inactive',
            'sizes' => 'nullable|array',
            'sizes.*' => 'string',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
            'existing_images' => 'nullable|array',
            'existing_images.*' => 'string',
        ]);

        $product = Product::findOrFail($id);

        // Update slug if title changed
        $slug = Str::slug($request->title);

        $product->update([
            'title' => $request->title,
            'slug' => $slug,
            'regular_price' => $request->regular_price,
            'discount_price' => $request->discount_price,
            'discount_percent' => $request->discount_percent,
            'color' => $request->color,
            'fabric' => $request->fabric,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'sub_category_id' => $request->subcategory_id, // Note: matches DB column
            'brand' => $request->brand,
            'stock' => $request->stock,
            'is_featured' => $request->boolean('is_featured'),
            'is_hot_deal' => $request->boolean('is_hot_deal'),
            'status' => $request->status,
        ]);

        // Handle sizes
        $product->sizes()->delete(); // delete old sizes

        if ($request->filled('sizes')) {
            foreach ($request->sizes as $size) {
                $product->sizes()->create([
                    'size' => $size
                ]);
            }
        }


        // Handle image updates
        $existingImages = $request->input('existing_images', []);

        // Get current images from database
        $currentImages = $product->images;

        // Delete images that are not in existingImages
        foreach ($currentImages as $image) {
            if (!in_array($image->image_path, $existingImages)) {
                // Delete from storage
                $oldPath = public_path($image->image_path);
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
                // Delete from database
                $image->delete();
            }
        }

        // Add any existing images that might not be in the database yet
        foreach ($existingImages as $imagePath) {
            // Check if the image already exists in database
            if (!$product->images()->where('image_path', $imagePath)->exists()) {
                // Add to database
                $product->images()->create([
                    'image_path' => $imagePath,
                ]);
            }

            // Check if the file exists in public folder
            $fullPath = public_path($imagePath);
            if (!file_exists($fullPath)) {
                // If the image doesn't exist physically, try to copy from a fallback location or throw an error
                // Example fallback: assume frontend sends full URL, extract file name and copy from temp
                $filename = basename($imagePath);
                $sourcePath = public_path('temp/' . $filename); // adjust this path according to where frontend uploads temporarily
                if (file_exists($sourcePath)) {
                    copy($sourcePath, public_path('uploads/products/' . $filename));
                }
                // Optionally you can log or notify if image still missing
            }
        }


        // Save new uploaded images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $destinationPath = public_path('uploads/products');
                $image->move($destinationPath, $filename);

                $product->images()->create([
                    'image_path' => 'uploads/products/' . $filename,
                ]);
            }
        }
        return redirect()->back()->with('success', 'Product updated successfully!');
    }

    public function destroy($id)
    {
        $product = Product::with('images')->findOrFail($id);

        // Delete each image file from public/uploads/product/
        foreach ($product->images as $image) {
            $imagePath = public_path($image->image_path);
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
            $image->delete(); // delete image record from DB
        }

        $product->delete(); // delete product record from DB

        return redirect()->back()->with('success', 'Product and its images deleted successfully!');
    }
}
