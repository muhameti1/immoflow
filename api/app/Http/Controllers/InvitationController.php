<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Models\User;
use App\Mail\InvitationMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class InvitationController extends Controller
{
    public function invite(Request $request)
    {
        Log::debug('Invitation invite method called', ['request' => $request->all()]);

        $validated = $request->validate([
            'email' => 'required|email|unique:users,email',
        ]);
        Log::debug('Validated invitation data', ['validated' => $validated]);

        $user = auth()->user();
        if (!$user) {
            Log::error('User is not authenticated');
            return response()->json(['error' => 'User not authenticated'], 401); // Or handle it as per your app's requirements
        }

        $invitation = Invitation::create([
            'company_id' => $user->company_id,
            'email' => $validated['email'],
            'token' => Str::random(32),
        ]);
        Log::debug('Invitation created', [
            'invitation_id' => $invitation->id,
            'email' => $invitation->email,
            'company_id' => $invitation->company_id,
            'token' => $invitation->token
        ]);

        // Send invitation email
        try {
            Mail::to($validated['email'])->send(new InvitationMail($invitation));
            Log::debug('Invitation email sent', ['email' => $validated['email']]);
        } catch (\Exception $e) {
            Log::error('Failed to send invitation email', ['error' => $e->getMessage()]);
            return redirect()->back()->with('error', 'Failed to send invitation email.');
        }

        return redirect()->back()->with('success', 'Invitation sent successfully.');
    }

    public function accept($token)
    {
        Log::debug('Invitation accept method called', ['token' => $token]);

        $invitation = Invitation::where('token', $token)->firstOrFail();
        Log::debug('Invitation found', [
            'invitation_id' => $invitation->id,
            'email' => $invitation->email,
            'company_id' => $invitation->company_id
        ]);

        if (auth()->check()) {
            $user = auth()->user();
            Log::debug('User is authenticated', ['user_id' => $user->id, 'email' => $user->email]);

            $user->update(['company_id' => $invitation->company_id]);
            Log::debug('User company updated', ['new_company_id' => $invitation->company_id]);

            $invitation->delete();
            Log::debug('Invitation deleted');

            return redirect()->route('dashboard')->with('success', 'You have joined the company.');
        }

        // Redirect to frontend registration page with token
        $frontendUrl = config('app.frontend_url'); // Add this to your config/app.php
        return redirect()->away($frontendUrl . '/accept-invite?token=' . $token);
    }

    // Add a new method to fetch invitation details
    public function getInvitationDetails($token)
    {
        $invitation = Invitation::where('token', $token)
            ->with('company:id,name')
            ->firstOrFail();

        return response()->json([
            'email' => $invitation->email,
            'company' => $invitation->company->name,
            'company_id' => $invitation->company_id
        ]);
    }
}
