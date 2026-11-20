<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ContactController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ImageUploadController;
use App\Http\Controllers\Admin\MessageController;

// ─── Public Routes ───────────────────────────────────────────

// Home page — points to the main landing page (UserTravels) which requires 'programs' prop
Route::get('/', function () {
    $programs = \App\Models\Program::all();
    return Inertia::render('UserTravels', ['programs' => $programs]);
})->name('home');

Route::get('/about', function () {
    return Inertia::render('AboutUs');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('ContactUs');
})->name('contact');

Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// Programs
Route::get('/programs', [ProgramController::class, 'index'])->name('programs.index');
Route::get('/programs/{program}', [ProgramController::class, 'show'])->name('programs.show');

// Confirmation page (standalone)
Route::get('/confirmation', function () {
    return Inertia::render('Confirmation');
})->name('confirmation');


// ─── Auth Routes (logged-in users) ──────────────────────────

Route::middleware('auth')->group(function () {
    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // User dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('UserTravels');
    })->middleware(['verified'])->name('dashboard');

    // Tourist Booking Routes
    Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');
    Route::get('/my-bookings', [BookingController::class, 'userBookings'])->name('my_bookings');
});


// ─── Admin Routes ────────────────────────────────────────────

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Bookings Management
    Route::get('/bookings', [\App\Http\Controllers\Admin\BookingController::class, 'index'])->name('bookings.index');
    Route::post('/bookings/{booking}/status', [\App\Http\Controllers\Admin\BookingController::class, 'updateStatus'])->name('bookings.update_status');

    // Programs Management
    Route::get('/programs', [\App\Http\Controllers\Admin\ProgramController::class, 'index'])->name('programs.index');
    Route::post('/programs', [\App\Http\Controllers\Admin\ProgramController::class, 'store'])->name('programs.store');
    Route::put('/programs/{program}', [\App\Http\Controllers\Admin\ProgramController::class, 'update'])->name('programs.update');
    Route::delete('/programs/{program}', [\App\Http\Controllers\Admin\ProgramController::class, 'destroy'])->name('programs.destroy');

    // Users Management
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::post('/users/{user}/role', [UserController::class, 'updateRole'])->name('users.update_role');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

    // Image Uploads
    Route::post('/upload-image', [ImageUploadController::class, 'upload'])->name('upload.image');

    // Messages Management
    Route::get('/messages', [MessageController::class, 'index'])->name('messages.index');
    Route::delete('/messages/{message}', [MessageController::class, 'destroy'])->name('messages.destroy');
});

require __DIR__.'/auth.php';
