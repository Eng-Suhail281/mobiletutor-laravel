<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\User;

class SpecialistController extends Controller
{
    public function index()
    {
        $specialists = User::where('role', 'teacher')
            ->whereHas('teacherProfile', fn ($q) => $q->where('specialty_type', 'support'))
            ->with('teacherProfile')
            ->paginate(9);

        return view('public.specialists', compact('specialists'));
    }

    public function show(User $specialist)
    {
        abort_unless($specialist->teacherProfile?->specialty_type === 'support', 404);

        $specialist->load('teacherProfile', 'reviewsReceived.student');

        return view('public.specialist-profile', compact('specialist'));
    }
}
