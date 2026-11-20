<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Program;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    /**
     * Store a new booking (tourist).
     * Matches the frontend Programs.jsx booking form data.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'program_id' => 'required|exists:programs,id',
            'program_title' => 'nullable|string|max:500',
            'participants' => 'required|integer|min:1',
            'total_price' => 'required|numeric|min:0',
            'passenger_name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:50',
        ]);

        $validated['user_id'] = Auth::id();
        $validated['status'] = 'pending';

        $booking = Booking::create($validated);

        return redirect()->route('my_bookings')->with('success', 'Booking created successfully!');
    }

    /**
     * Show the current user's bookings.
     */
    public function userBookings()
    {
        $bookings = Booking::where('user_id', Auth::id())
            ->with('program')
            ->latest()
            ->get();

        return Inertia::render('MyBookings', [
            'bookings' => $bookings
        ]);
    }
}
