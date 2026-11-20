<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageUploadController extends Controller
{
    /**
     * Handle incoming image upload requests for programs.
     */
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120', // Max 5MB
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            
            // Store the file in storage/app/public/programs
            $path = $file->storeAs('programs', $filename, 'public');

            // Return the public URL for the file to the frontend
            return response()->json([
                'url' => Storage::url($path),
                'message' => 'Image uploaded successfully.',
            ], 200);
        }

        return response()->json(['message' => 'No image provided.'], 400);
    }
}
