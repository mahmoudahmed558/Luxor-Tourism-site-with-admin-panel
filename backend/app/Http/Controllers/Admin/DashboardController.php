<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Program;
use App\Models\Booking;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalRevenue = Booking::where('status', 'confirmed')->sum('total_price');
        $pendingBookings = Booking::where('status', 'pending')->count();

        return Inertia::render('admin/Dashboard', [
            'programs' => Program::all(),
            'bookings' => Booking::with(['user', 'program'])->latest()->get(),
            'users' => User::all(),
            'stats' => [
                'total_programs' => Program::count(),
                'total_bookings' => Booking::count(),
                'total_users' => User::count(),
                'total_revenue' => $totalRevenue,
                'pending_bookings' => $pendingBookings,
                'confirmed_bookings' => Booking::where('status', 'confirmed')->count(),
                'cancelled_bookings' => Booking::where('status', 'cancelled')->count(),
            ],
        ]);
    }
}
