<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    public function index()
    {
        $properties  = Property::where('company_id', auth()->user()->company_id)
            ->latest()
            ->paginate(10);

        return response()->json($properties);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'status' => 'nullable|string|in:active,inactive,draft,archive',
            'category' => 'nullable|string',
            'object_type' => 'nullable|string',
            'warnings' => 'nullable|string',
            'features' => 'nullable|string',
            'order_number' => 'nullable|string',
            'unit_number' => 'nullable|string',
            'internal_note' => 'nullable|string',
        ]);

        $property = Property::create(
            [
                ...$validated,
                'company_id' => $request->user()->company_id
            ]
        );

        return response()->json(['message', 'Property created successfully', 'property' => $property], 201);
    }

    public function show($id)
    {
        $property = Property::findOrFail($id);

        return response()->json($property);
    }

    public function update(Request $request, $id)
    {
        $property = Property::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string|max:255',
            'status' => 'sometimes|required|string|in:active,inactive,draft,archive',
            'category' => 'nullable|string',
            'object_type' => 'nullable|string',
            'warnings' => 'nullable|string',
            'features' => 'nullable|string',
            'order_number' => 'nullable|string',
            'unit_number' => 'nullable|string',
            'internal_note' => 'nullable|string',
        ]);

        $property->update($validated);

        return response()->json(['message', 'Property updated successfully', 'property' => $property], 201);
    }

    public function destroy($id)
    {
        $property = Property::findOrFail($id);

        $property->delete();

        return response()->json(['message', 'Property deleted successfully'], 201);
    }
}
