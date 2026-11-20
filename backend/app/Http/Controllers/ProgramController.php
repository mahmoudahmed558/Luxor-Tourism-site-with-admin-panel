<?php

namespace App\Http\Controllers;

use App\Models\Program;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgramController extends Controller
{
    public function index()
    {
        $programs = Program::where('is_active', true)->latest()->get();
        return Inertia::render('Programs', [
            'programs' => $programs
        ]);
    }

    public function show(Program $program)
    {
        return Inertia::render('Programs', [
            'programs' => Program::where('is_active', true)->get(),
            'selected_program' => $program
        ]);
    }
}
