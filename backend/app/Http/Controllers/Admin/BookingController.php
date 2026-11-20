<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/AdminBookings', [
            'bookings' => Booking::with(['user', 'program'])->latest()->get()
        ]);
    }

    public function updateStatus(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled'
        ]);
        
        $booking->update(['status' => $validated['status']]);
        
        return back()->with('success', 'Booking status updated successfully.');
    }
}
