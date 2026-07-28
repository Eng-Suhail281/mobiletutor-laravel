<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    public function index(Request $request)
    {
        $query = User::where('role', 'teacher')
            ->whereHas('teacherProfile', fn ($q) => $q->where('specialty_type', 'academic'))
            ->with('teacherProfile');

        if ($request->filled('q')) {
            $query->where('name', 'like', '%'.$request->string('q').'%');
        }

        $teachers = $query->paginate(9)->withQueryString();

        return view('public.teachers', compact('teachers'));
    }

    public function show(User $teacher)
    {
        abort_unless($teacher->role === 'teacher', 404);

        $teacher->load('teacherProfile', 'coursesTaught', 'reviewsReceived.student');

        return view('public.public-teacher-profile', compact('teacher'));
    }
}
