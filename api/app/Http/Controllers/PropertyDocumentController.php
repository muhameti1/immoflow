<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class PropertyDocumentController extends Controller
{
    public function store(Request $request, Property $property)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'document' => 'nullable|file|mimes:pdf,doc,docx,txt|max:10240',
                'category' => 'required|string',
                'expiration_date' => 'nullable|date',
            ]);

            if ($request->hasFile('document')) {
                $path = $request->file('document')->store('property_documents', 'public');
                $documentUrl = Storage::url($path);

                $documentData = [
                    'title' => $validatedData['title'],
                    'document_path' => $documentUrl,
                    'category' => $validatedData['category'],
                ];

                if (isset($validatedData['expiration_date'])) {
                    $documentData['expiration_date'] = $validatedData['expiration_date'];
                }

                $property->documents()->create($documentData);

                return response()->json([
                    'message' => 'Document added successfully',
                ], 201);
            }

            return response()->json([
                'message' => 'No document uploaded.',
            ], 422);
        } catch (\Exception $e) {
            // Log the exception for debugging
            Log::error('Failed to add doc', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'An unexpected error occurred.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function destroy(Property $property, Document $document)
    {
        // Check if the document belongs to the property
        if ($document->property_id !== $property->id) {
            return redirect()->back()->withErrors(['error' => 'Unauthorized action']);
        }

        // Get the file path from the document_url
        $filePath = str_replace('/storage/', '', $document->document_url);

        // Delete the file from storage
        if (Storage::disk('public')->exists($filePath)) {
            Storage::disk('public')->delete($filePath);
        }

        // Delete the document record from the database
        $document->delete();

        return response()->json([
            'message' => 'Document deleted successfully'
        ]);
    }
}
