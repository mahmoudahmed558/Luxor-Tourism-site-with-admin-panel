<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/AdminUsers', [
            'users' => User::latest()->get()
        ]);
    }
    
    public function updateRole(Request $request, User $user)
    {
        $validated = $request->validate([
            'role' => 'required|in:admin,tourist'
        ]);
        
        if (auth()->id() === $user->id) {
            return back()->with('error', 'You cannot change your own role.');
        }
        
        $user->update(['role' => $validated['role']]);
        
        return back()->with('success', 'User role updated successfully.');
    }
    
    public function destroy(User $user)
    {
        if (auth()->id() === $user->id) {
            return back()->with('error', 'You cannot delete yourself.');
        }
        
        $user->delete();
        return back()->with('success', 'User deleted successfully.');
    }
}
