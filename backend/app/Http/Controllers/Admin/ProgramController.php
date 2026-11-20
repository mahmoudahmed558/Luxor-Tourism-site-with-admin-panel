<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgramController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/AdminPrograms', [
            'programs' => Program::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|array',
            'title.ar' => 'nullable|string',
            'title.en' => 'nullable|string',
            'description' => 'required|array',
            'description.ar' => 'nullable|string',
            'description.en' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'duration' => 'required|integer|min:1',
            'discount' => 'nullable|numeric|min:0|max:100',
            'locations' => 'nullable|array',
            'images' => 'nullable|array',
            'rating' => 'nullable|numeric|min:0|max:5',
            'featured' => 'nullable|boolean',
            'is_active' => 'nullable|boolean',
        ]);

        Program::create([
            'title' => $data['title'],
            'description' => $data['description'],
            'price' => $data['price'],
            'city' => $this->extractCity($data['locations'] ?? []),
            'duration' => $data['duration'],
            'image_path' => $data['images'][0] ?? null,
            'discount' => $data['discount'] ?? 0,
            'locations' => $data['locations'] ?? [],
            'images' => $data['images'] ?? [],
            'rating' => $data['rating'] ?? 0,
            'featured' => $data['featured'] ?? false,
            'is_active' => $data['is_active'] ?? true,
        ]);

        return back()->with('success', 'Program created successfully.');
    }

    public function update(Request $request, Program $program)
    {
        $data = $request->validate([
            'title' => 'required|array',
            'title.ar' => 'nullable|string',
            'title.en' => 'nullable|string',
            'description' => 'required|array',
            'description.ar' => 'nullable|string',
            'description.en' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'duration' => 'required|integer|min:1',
            'discount' => 'nullable|numeric|min:0|max:100',
            'locations' => 'nullable|array',
            'images' => 'nullable|array',
            'rating' => 'nullable|numeric|min:0|max:5',
            'featured' => 'nullable|boolean',
            'is_active' => 'nullable|boolean',
        ]);

        $program->update([
            'title' => $data['title'],
            'description' => $data['description'],
            'price' => $data['price'],
            'city' => $this->extractCity($data['locations'] ?? [], $program->city),
            'duration' => $data['duration'],
            'image_path' => $data['images'][0] ?? $program->image_path,
            'discount' => $data['discount'] ?? $program->discount,
            'locations' => $data['locations'] ?? $program->locations,
            'images' => $data['images'] ?? $program->images,
            'rating' => $data['rating'] ?? $program->rating,
            'featured' => $data['featured'] ?? $program->featured,
            'is_active' => $data['is_active'] ?? $program->is_active,
        ]);

        return back()->with('success', 'Program updated successfully.');
    }

    public function destroy(Program $program)
    {
        $program->delete();
        return back()->with('success', 'Program deleted successfully.');
    }

    /**
     * Extract a city name string from the locations array.
     */
    private function extractCity(array $locations, string $default = 'Unknown'): string
    {
        if (empty($locations)) return $default;

        $first = $locations[0];
        if (is_array($first)) {
            return $first['en'] ?? $first['ar'] ?? $default;
        }
        return is_string($first) ? $first : $default;
    }
}
