<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InvitationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/users', [AuthController::class, 'index']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/invitations', [InvitationController::class, 'invite']);
});
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user()->load('roles');
});

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin', function (Request $request) {
        return 'ok admin';
    });
});

Route::get('/admin', function (Request $request) {
    return 'ok admin';
});

Route::get('/invitations/{token}', [InvitationController::class, 'accept'])->name('invitation.accept');
Route::get('/invitations/{token}/details', [InvitationController::class, 'getInvitationDetails']);
