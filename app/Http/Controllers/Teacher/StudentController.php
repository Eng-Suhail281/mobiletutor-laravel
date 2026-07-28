<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;

class StudentController extends Controller
{
    public function index()
    {
        $courseIds = auth()->user()->coursesTaught()->pluck('id');

        $students = Enrollment::whereIn('course_id', $courseIds)
            ->with('student', 'course')
            ->orderByDesc('enrolled_at')
            ->paginate(15);

        return view('teacher.students', compact('students'));
    }
}
