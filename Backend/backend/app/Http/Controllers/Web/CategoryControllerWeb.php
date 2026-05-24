<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryControllerWeb extends Controller
{
    public function index()
    {
        $categories = Category::all();

        return view(
            'categories.index',
            compact('categories')
        );
    }

    public function create()
    {
        return view('categories.create');
    }

    public function store(Request $request)
    {
        Category::create($request->all());

        return redirect()
            ->route('web.categories.index');
    }

    public function edit(string $id)
    {
        $category = Category::findOrFail($id);

        return view(
            'categories.edit',
            compact('category')
        );
    }

    public function update(Request $request, string $id)
    {
        $category = Category::findOrFail($id);

        $category->update($request->all());

        return redirect()
            ->route('web.categories.index');
    }

    public function destroy(string $id)
    {
        $category = Category::findOrFail($id);

        $category->delete();

        return redirect()
            ->route('web.categories.index');
    }
}