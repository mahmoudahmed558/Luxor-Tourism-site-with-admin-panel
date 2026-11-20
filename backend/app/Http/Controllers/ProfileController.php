<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();
        $bookings = \App\Models\Booking::where('user_id', $user->id)
                        ->with('program')
                        ->orderBy('created_at', 'desc')
                        ->get()
                        ->map(function ($booking) {
                            $title = is_array($booking->program->title) 
                                ? json_encode($booking->program->title) 
                                : $booking->program->title;
                                
                            $decTitle = json_decode($title, true);
                            $finalTitle = is_array($decTitle) ? ($decTitle['en'] ?? $decTitle['ar'] ?? 'Unknown') : $title;

                            return [
                                'id' => $booking->id,
                                'programTitle' => $finalTitle,
                                'participants' => $booking->participants,
                                'totalPrice' => $booking->total_price,
                                'status' => $booking->status,
                                'created_at' => $booking->created_at->toIso8601String(),
                            ];
                        });

        return Inertia::render('Profile', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
            'bookings' => $bookings,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
