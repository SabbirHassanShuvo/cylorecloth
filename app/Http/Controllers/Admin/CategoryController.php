<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $search = trim(strtolower($request->search));

        $query = Category::with(['subcategories' => function ($q) {
            $q->where('status', 1); // ✅ Only Active Subcategories
        }]);

        if ($request->has('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                    ->orWhereHas('subcategories', function ($subQuery) use ($search) {
                        $subQuery->where('name', 'like', "%$search%");
                    });

                if ($search === 'active') {
                    $q->orWhere('status', 1);
                } elseif ($search === 'deactivate') {
                    $q->orWhere('status', 0);
                }
            });
        }

        $categories = $query->orderBy('id', 'DESC')->paginate(10);

        return Inertia::render('backend/category/Category', [
            'categories' => $categories,
            'filters' => $request->only('search')
        ]);
    }


    public function create()
    {
        return Inertia::render('backend/category/Create');
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'status' => 'required',
        ]);

        $user = new Category();
        $user->name = $request->name;
        $user->status = $request->status;
        $user->save();

        return redirect()->route('category')->with('message', 'Category created successfully.');
    }

    public function edit($id)
    {
        $category = Category::find($id);
        return Inertia::render('backend/category/Edit', [
            'category' => $category,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'status' => 'required',
        ]);

        $category = Category::find($id);
        $category->name = $request->name;
        $category->status = $request->status;
        $category->save();

        return redirect()->route('category')->with('message', 'Category updated successfully.');
    }

    public function destroy($id)
    {
        $category = Category::find($id);
        $category->delete();

        return redirect()->route('category')->with('message', 'Category deleted successfully.');
    }
}
