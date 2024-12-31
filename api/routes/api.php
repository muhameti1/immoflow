<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/users', [AuthController::class, 'index']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Route::middleware('role:admin')->group(function () {
    //     Route::get('/admin', [AdminController::class, 'index']);
    // });

    // Route::middleware('permission:view-dashboard')->group(function () {
    //     Route::get('/dashboard', [DashboardController::class, 'index']);
    // });
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
