<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\PropertyImage;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class PropertyImageController extends Controller
{
    public function store(Request $request, $propertyId)
    {
        try {
            $property = Property::findOrFail($propertyId);

            $request->validate([
                'images' => 'required',
                'images.*' => 'required|image|mimes:jpeg,png,jpg|max:2048',
                'is_private' => 'nullable|boolean',
                'show_in_portals' => 'nullable|boolean'
            ]);

            $uploadedImages = [];
            $files = !is_array($request->file('images')) ? [$request->file('images')] : $request->file('images');

            foreach ($files as $image) {
                $filename = time() . '_' . $image->getClientOriginalName();
                $path = $image->storeAs('property-images', $filename, 'public');

                $propertyImage = $property->images()->create([
                    'file_path' => $path,
                    'image_title' => $image->getClientOriginalName(),
                    'is_private' => $request->input('is_private', false),
                    'show_in_portals' => $request->input('show_in_portals', true),
                    'is_thumbnail' => !$property->images()->exists()
                ]);

                $uploadedImages[] = [
                    'id' => $propertyImage->id,
                    'file_path' => Storage::url($path),
                    'image_title' => $propertyImage->image_title,
                    'is_thumbnail' => $propertyImage->is_thumbnail
                ];
            }

            return response()->json([
                'message' => 'Images uploaded successfully',
                'images' => $uploadedImages
            ], 201);
        } catch (\Exception $e) {
            Log::error('Failed to upload images', [
                'error' => $e->getMessage(),
                'property_id' => $propertyId
            ]);
            return response()->json([
                'message' => 'Failed to upload images',
                'error' => $e->getMessage()
            ], 422);
        }
    }


    public function destroy($propertyId, $imageId)
    {
        try {
            $image = PropertyImage::where('property_id', $propertyId)
                ->where('id', $imageId)
                ->firstOrFail();

            Storage::disk('public')->delete($image->file_path);
            $image->delete();

            return response()->json([
                'message' => 'Image deleted successfully'
            ]);
        } catch (Exception $e) {
            Log::error('Failed to delete image', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Failed to delete image'
            ], 422);
        }
    }

    public function setThumbnail($propertyId, $imageId)
    {
        try {
            $property = Property::findOrFail($propertyId);

            $property->images()->update(['is_thumbnail' => false]);

            $image = $property->images()->findOrFail($imageId);
            $image->update(['is_thumbnail' => true]);

            return response()->json([
                'message' => 'Thumbnail set successfully'
            ]);
        } catch (Exception $e) {
            Log::error('Failed to set thumbnail', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Failed to set thumbnail'
            ], 422);
        }
    }
}
