<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function update(Request $request, $id)
    {
        Log::info('Update request received', [
            'request_all' => $request->all(),
            'files' => $request->files->all()
        ]);

        $user = User::findOrFail($id);

        try {
            $rules = [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
                'phone_number' => 'nullable|string|max:20',
                'address' => 'nullable|string|max:255',
                'position' => 'nullable|string|max:255',
                'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'current_password' => 'required_with:new_password',
                'new_password' => 'nullable|min:8|confirmed',
            ];

            $validated = $request->validate($rules);

            $data = $request->only(['name', 'email', 'phone_number', 'address', 'position']);

            // Handle password update
            if ($request->filled('new_password')) {
                if (!Hash::check($request->current_password, $user->password)) {
                    return response()->json([
                        'message' => 'Current password is incorrect',
                        'errors' => ['current_password' => ['The provided password does not match our records.']]
                    ], 422);
                }
                $data['password'] = Hash::make($request->new_password);
            }

            // Handle avatar upload
            if ($request->hasFile('avatar')) {
                if ($user->avatar) {
                    Storage::disk('public')->delete($user->avatar);
                }
                $avatarPath = $request->file('avatar')->store('avatars', 'public');
                $data['avatar'] = $avatarPath;
                Log::info('Avatar uploaded', ['path' => $avatarPath]);
            }

            $user->update($data);
            Log::info('User updated', ['user' => $user->toArray()]);

            return response()->json([
                'message' => 'Profile updated successfully',
                'user' => $user->fresh()
            ]);
        } catch (\Exception $e) {
            Log::error('Update failed', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Update failed',
                'errors' => method_exists($e, 'errors') ? $e->errors() : null
            ], 422);
        }
    }
    public function updatePassword(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ]);

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'Current password is incorrect',
                'errors' => ['current_password' => ['The provided password does not match our records.']]
            ], 422);
        }

        $user->update([
            'password' => Hash::make($request->new_password)
        ]);

        return response()->json([
            'message' => 'Password updated successfully'
        ]);
    }
}
