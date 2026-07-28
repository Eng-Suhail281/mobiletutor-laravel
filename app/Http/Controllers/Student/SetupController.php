<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SetupController extends Controller
{
    public function index()
    {
        return view('student.setup');
    }

    public function university()
    {
        return view('student.setup-university');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'university' => ['nullable', 'string', 'max:255'],
            'major' => ['nullable', 'string', 'max:255'],
            'academic_year' => ['nullable', 'string', 'max:255'],
        ]);

        auth()->user()->studentProfile()->updateOrCreate([], $data);
        auth()->user()->update(['profile_completed' => true]);

        return redirect()->route('student.dashboard');
    }
}
