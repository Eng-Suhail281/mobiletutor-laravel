<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SetupController extends Controller
{
    public function step1()
    {
        return view('teacher.setup');
    }

    public function step2()
    {
        return view('teacher.setup-step2');
    }

    public function step3()
    {
        return view('teacher.setup-step3');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'specialty_type' => ['nullable', 'in:academic,support'],
            'specialization' => ['nullable', 'string', 'max:255'],
            'qualification' => ['nullable', 'string', 'max:255'],
            'experience_years' => ['nullable', 'integer', 'min:0'],
            'hourly_rate' => ['nullable', 'numeric', 'min:0'],
        ]);

        auth()->user()->teacherProfile()->updateOrCreate([], $data);
        auth()->user()->update(['profile_completed' => true]);

        return redirect()->route('teacher.setup.step3');
    }
}
