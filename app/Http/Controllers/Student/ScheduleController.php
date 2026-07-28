<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;

class ScheduleController extends Controller
{
    public function index()
    {
        $student = auth()->user();

        $sessions = $student->sessionBookingsAsStudent()->with('teacher')->orderBy('scheduled_at')->get();
        $exams = \App\Models\Exam::whereIn('course_id', $student->enrolledCourses()->pluck('courses.id'))
            ->orderBy('starts_at')->get();

        return view('student.schedule', compact('sessions', 'exams'));
    }
}
