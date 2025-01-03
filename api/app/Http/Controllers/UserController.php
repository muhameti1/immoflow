<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function update(Request $request, $id)
    {
        Log::info('Update request received', [
            'request_all' => $request->all(),
            'request_post' => $request->post(),
            'files' => $request->files->all(),
            'headers' => $request->headers->all()
        ]);

        $user = User::findOrFail($id);

        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
                'phone_number' => 'nullable|string|max:20',
                'address' => 'nullable|string|max:255',
                'position' => 'nullable|string|max:255',
                'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            $data = $request->only(['name', 'email', 'phone_number', 'address', 'position']);

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
                'message' => 'Validation failed',
                'errors' => method_exists($e, 'errors') ? $e->errors() : null
            ], 422);
        }
    }
}
