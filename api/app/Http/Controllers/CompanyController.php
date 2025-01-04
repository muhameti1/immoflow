<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CompanyController extends Controller
{

    public function show(Request $request)
    {
        try {
            $company = $request->user()->company;

            if (!$company) {
                return response()->json([
                    'message' => 'Company not found'
                ], 404);
            }

            return response()->json($company);
        } catch (\Exception $e) {
            Log::error('Failed to fetch company', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'message' => 'Failed to fetch company data'
            ], 500);
        }
    }
    public function update(Request $request)
    {
        try {
            $company = $request->user()->company;

            if (!$company) {
                return response()->json([
                    'message' => 'Company not found'
                ], 404);
            }

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email',
                'bio' => 'nullable|string',
                'location' => 'nullable|string|max:255',
                'social_links' => 'nullable|array',
                'social_links.*' => 'string',
                'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'color_brand_company' => 'nullable|string|max:255'
            ]);

            $data = $request->only(['name', 'email', 'bio', 'location', 'social_links', 'color_brand_company']);

            if ($request->hasFile('logo')) {
                if ($company->logo) {
                    Storage::disk('public')->delete($company->logo);
                }
                $logoPath = $request->file('logo')->store('company-logos', 'public');
                $data['logo'] = $logoPath;
            }

            $company->update($data);

            return response()->json([
                'message' => 'Company profile updated successfully',
                'company' => $company->fresh()
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to update company', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'message' => 'Failed to update company profile',
                'errors' => method_exists($e, 'errors') ? $e->errors() : null
            ], 422);
        }
    }
}
