<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                // Property fields
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'status' => 'nullable|string|in:active,inactive,draft,archive',
                'category' => 'nullable|string',
                'object_type' => 'nullable|string',
                'warnings' => 'nullable|string',
                'features' => 'nullable|string',
                'order_number' => 'nullable|string',
                'unit_number' => 'nullable|string',
                'internal_note' => 'nullable|string',

                // Price fields
                'price.amount' => 'required|numeric',
                'price.price_per_meter' => 'nullable|numeric',
                'price.currency' => 'required|string',
                'price.type' => 'required|string|in:sale,rent',
                'price.price_on_request' => 'nullable|boolean',
                'price.warm_rent' => 'nullable|numeric',
                'price.cold_rent' => 'nullable|numeric',
                'price.heating_costs' => 'nullable|numeric',
                'price.additional_costs' => 'nullable|numeric',
                'price.non_transferable_costs' => 'nullable|numeric',
                'price.parking_price' => 'nullable|numeric',
                'price.monthly_rental_income' => 'nullable|numeric',
                'price.heating_in_additional_costs' => 'nullable|boolean',

                // Area fields
                'area.total_area' => 'nullable|numeric',
                'area.living_area' => 'nullable|numeric',
                'area.usable_area' => 'nullable|numeric',
                'area.land_area' => 'nullable|numeric',
                'area.storage_area' => 'nullable|numeric',
                'area.terrace_area' => 'nullable|numeric',
                'area.balcony_area' => 'nullable|numeric',
                'area.garden_area' => 'nullable|numeric',
                'area.basement_area' => 'nullable|numeric',
                'area.garage_area' => 'nullable|numeric',
                'area.parking_area' => 'nullable|numeric',

                // Additional Information validation
                'additional.year_built' => 'nullable|integer',
                'additional.last_renovation_year' => 'nullable|integer',
                'additional.number_of_floors' => 'nullable|integer',
                'additional.floor_number' => 'nullable|string',
                'additional.number_of_rooms' => 'nullable|integer',
                'additional.number_of_bathrooms' => 'nullable|integer',
                'additional.parking_spaces' => 'nullable|integer',
                'additional.energy_rating' => 'nullable|string',
                'additional.heating_type' => 'nullable|string',
                'additional.construction_type' => 'nullable|string',
                'additional.building_condition' => 'nullable|string',
                'additional.last_modernization' => 'nullable|string',
                'additional.interior_quality' => 'nullable|string',
                // Equipment validation
                'equipment.bathtub' => 'nullable|boolean',
                'equipment.shower' => 'nullable|boolean',
                'equipment.guest_toilet' => 'nullable|boolean',
                'equipment.alarm_system' => 'nullable|boolean',
                'equipment.smart_lock' => 'nullable|boolean',
                'equipment.air_conditioning' => 'nullable|boolean',
                'equipment.floor_heating' => 'nullable|boolean',
                'equipment.elevator' => 'nullable|boolean',
                'equipment.barrier_free' => 'nullable|boolean',
                'equipment.furnished' => 'nullable|boolean',
                'equipment.balcony' => 'nullable|boolean',
                'equipment.terrace' => 'nullable|boolean',
                'equipment.garden' => 'nullable|boolean',
                'equipment.parking' => 'nullable|boolean',
                'equipment.garage' => 'nullable|boolean',

                // Address validation
                'address.street' => 'nullable|string',
                'address.street_number' => 'nullable|string',
                'address.zip_code' => 'nullable|string|max:20',
                'address.city' => 'nullable|string',
                'address.state' => 'nullable|string',
                'address.country' => 'nullable|string',
                'address.region' => 'nullable|string',
                'address.latitude' => 'nullable|numeric|between:-90,90',
                'address.longitude' => 'nullable|numeric|between:-180,180',
                'address.hide_exact_location' => 'nullable|boolean',
                'address.directions' => 'nullable|string'
            ]);

            $property = Property::create([
                ...$request->except(['price', 'area', 'additional', 'equipment', 'address']),
                'company_id' => auth()->user()->company_id
            ]);

            // Create relationships
            if ($request->has('price')) {
                $property->prices()->create($request->input('price'));
            }

            if ($request->has('area')) {
                $property->areas()->create($request->input('area'));
            }

            if ($request->has('additional')) {
                $property->additionalInformation()->create($request->input('additional'));
            }

            if ($request->has('equipment')) {
                $property->equipment()->create($request->input('equipment'));
            }

            if ($request->has('address')) {
                $property->address()->create($request->input('address'));
            }

            DB::commit();

            return response()->json([
                'message' => 'Property created successfully',
                'property' => $property->load(['prices', 'areas', 'additionalInformation', 'equipment'])
            ], 201);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to create property',
                'error' => $e->getMessage()
            ], 422);
        }
    }

    public function show($id)
    {
        $property = Property::findOrFail($id);

        return response()->json($property);
    }

    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $property = Property::findOrFail($id);

            $validated = $request->validate([
                'title' => 'sometimes|required|string|max:255',
                'description' => 'nullable|string',
                'status' => 'nullable|string|in:active,inactive,draft,archive',
                'category' => 'nullable|string',
                'object_type' => 'nullable|string',
                'warnings' => 'nullable|string',
                'features' => 'nullable|string',
                'order_number' => 'nullable|string',
                'unit_number' => 'nullable|string',
                'internal_note' => 'nullable|string',

                // Price validation
                'price.amount' => 'sometimes|required|numeric',
                'price.price_per_meter' => 'nullable|numeric',
                'price.currency' => 'sometimes|required|string',
                'price.type' => 'sometimes|required|string|in:sale,rent',
                'price.price_on_request' => 'nullable|boolean',
                'price.warm_rent' => 'nullable|numeric',
                'price.cold_rent' => 'nullable|numeric',
                'price.heating_costs' => 'nullable|numeric',
                'price.additional_costs' => 'nullable|numeric',
                'price.non_transferable_costs' => 'nullable|numeric',
                'price.parking_price' => 'nullable|numeric',
                'price.monthly_rental_income' => 'nullable|numeric',
                'price.heating_in_additional_costs' => 'nullable|boolean',

                // Area validation
                'area.total_area' => 'nullable|numeric',
                'area.living_area' => 'nullable|numeric',
                'area.usable_area' => 'nullable|numeric',
                'area.land_area' => 'nullable|numeric',
                'area.storage_area' => 'nullable|numeric',
                'area.terrace_area' => 'nullable|numeric',
                'area.balcony_area' => 'nullable|numeric',
                'area.garden_area' => 'nullable|numeric',
                'area.basement_area' => 'nullable|numeric',
                'area.garage_area' => 'nullable|numeric',
                'area.parking_area' => 'nullable|numeric',

                // Additional Information validation
                'additional.year_built' => 'nullable|integer',
                'additional.last_renovation_year' => 'nullable|integer',
                'additional.number_of_floors' => 'nullable|integer',
                'additional.floor_number' => 'nullable|string',
                'additional.number_of_rooms' => 'nullable|integer',
                'additional.number_of_bathrooms' => 'nullable|integer',
                'additional.parking_spaces' => 'nullable|integer',
                'additional.energy_rating' => 'nullable|string',
                'additional.heating_type' => 'nullable|string',
                'additional.construction_type' => 'nullable|string',
                'additional.building_condition' => 'nullable|string',
                'additional.last_modernization' => 'nullable|string',
                'additional.interior_quality' => 'nullable|string',
                // Equipment validation
                'equipment.bathtub' => 'nullable|boolean',
                'equipment.shower' => 'nullable|boolean',
                'equipment.guest_toilet' => 'nullable|boolean',
                'equipment.alarm_system' => 'nullable|boolean',
                'equipment.smart_lock' => 'nullable|boolean',
                'equipment.air_conditioning' => 'nullable|boolean',
                'equipment.floor_heating' => 'nullable|boolean',
                'equipment.elevator' => 'nullable|boolean',
                'equipment.barrier_free' => 'nullable|boolean',
                'equipment.furnished' => 'nullable|boolean',
                'equipment.balcony' => 'nullable|boolean',
                'equipment.terrace' => 'nullable|boolean',
                'equipment.garden' => 'nullable|boolean',
                'equipment.parking' => 'nullable|boolean',
                'equipment.garage' => 'nullable|boolean',

                // Address validation
                'address.street' => 'nullable|string',
                'address.street_number' => 'nullable|string',
                'address.zip_code' => 'nullable|string|max:20',
                'address.city' => 'nullable|string',
                'address.state' => 'nullable|string',
                'address.country' => 'nullable|string',
                'address.region' => 'nullable|string',
                'address.latitude' => 'nullable|numeric|between:-90,90',
                'address.longitude' => 'nullable|numeric|between:-180,180',
                'address.hide_exact_location' => 'nullable|boolean',
                'address.directions' => 'nullable|string'
            ]);

            $property->update($request->except(['price', 'area', 'additional', 'equipment', 'address']));

            if ($request->has('price')) {
                if ($property->prices()->exists()) {
                    $property->prices()->first()->update($request->input('price'));
                } else {
                    $property->prices()->create($request->input('price'));
                }
            }

            if ($request->has('area')) {
                if ($property->areas()->exists()) {
                    $property->areas()->first()->update($request->input('area'));
                } else {
                    $property->areas()->create($request->input('area'));
                }
            }

            if ($request->has('additional')) {
                if ($property->additionalInformation()->exists()) {
                    $property->additionalInformation()->first()->update($request->input('additional'));
                } else {
                    $property->additionalInformation()->create($request->input('additional'));
                }
            }

            if ($request->has('equipment')) {
                if ($property->equipment()->exists()) {
                    $property->equipment()->first()->update($request->input('equipment'));
                } else {
                    $property->equipment()->create($request->input('equipment'));
                }
            }

            if ($request->has('address')) {
                if ($property->address()->exists()) {
                    $property->address()->first()->update($request->input('address'));
                } else {
                    $property->address()->create($request->input('address'));
                }
            }

            DB::commit();

            return response()->json([
                'message' => 'Property updated successfully',
                'property' => $property->load(['prices', 'areas'])
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Failed to update property', [
                'error' => $e->getMessage(),
                'property_id' => $id
            ]);

            return response()->json([
                'message' => 'Failed to update property',
                'errors' => method_exists($e, 'errors') ? $e->errors() : null
            ], 422);
        }
    }

    public function destroy($id)
    {
        $property = Property::findOrFail($id);

        $property->delete();

        return response()->json(['message', 'Property deleted successfully'], 201);
    }
}
