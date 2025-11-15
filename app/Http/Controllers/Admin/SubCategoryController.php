<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubCategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Subcategory::with('category');

        if ($request->has('search') && !empty($request->search)) {
            $search = trim(strtolower($request->search));

            $query->where(function ($q) use ($search) {
                $q->whereRaw('LOWER(name) LIKE ?', ["%{$search}%"])
                    ->orWhereHas('category', function ($subQuery) use ($search) {
                        $subQuery->whereRaw('LOWER(name) LIKE ?', ["%{$search}%"]);
                    });

                if ($search === 'active') {
                    $q->orWhere('status', 1);
                } elseif ($search === 'deactivate') {
                    $q->orWhere('status', 0);
                }
            });
        }

        $subcategories = $query->orderBy('id', 'DESC')->paginate(10);

        return Inertia::render('backend/subcategory/SubCategory', [
            'subcategories' => $subcategories,
            'filters' => $request->only('search')
        ]);
    }
    public function create()
    {
        $categories = Category::select('id', 'name')
            ->where('status', 1)  // Filter only Active categories
            ->get();

        return Inertia::render('backend/subcategory/Create', [
            'categories' => $categories
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'sub_categories' => 'required|array|min:1',
            'sub_categories.*.name' => 'required|string|distinct',
            'sub_categories.*.status' => 'required|in:0,1',
        ]);

        foreach ($request->sub_categories as $subCategory) {
            SubCategory::create([
                'name' => $subCategory['name'],
                'status' => $subCategory['status'],
                'category_id' => $request->category_id,
            ]);
        }
        // Laravel Controller
        return redirect()->route('subcategory')->with('success', 'SubCategories added successfully');
    }

    public function edit($id)
    {
        $subcategory = Subcategory::find($id);

        $categories = Category::select('id', 'name')
            ->where('status', 1)
            ->get();

        return Inertia::render('backend/subcategory/Edit', [
            'subcategory' => $subcategory,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:0,1',
        ]);

        $subcategory = Subcategory::find($id);

        $subcategory->update([
            'name' => $request->name,
            'category_id' => $request->category_id,
            'status' => $request->status,
        ]);

        return redirect()->route('subcategory.edit', $subcategory->id)
            ->with('success', 'Subcategory updated successfully.');
    }

    public function destroy($id)
    {
        $subcategory = Subcategory::findOrFail($id);
        $subcategory->delete();

        return redirect()->back()->with('success', 'Subcategory deleted successfully.');
    }
}
