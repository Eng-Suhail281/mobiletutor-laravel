<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\User;

class SupportController extends Controller
{
    public function index()
    {
        $specialists = User::where('role', 'teacher')
            ->whereHas('teacherProfile', fn ($q) => $q->where('specialty_type', 'support'))
            ->with('teacherProfile')->get();

        $mySessions = auth()->user()->sessionBookingsAsStudent()->where('type', 'support')
            ->with('teacher')->orderByDesc('scheduled_at')->get();

        return view('student.support', compact('specialists', 'mySessions'));
    }

    public function session(User $specialist)
    {
        return view('student.support-session', compact('specialist'));
    }
}
