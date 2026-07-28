<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function index()
    {
        $teacher = auth()->user();

        $courses = $teacher->coursesTaught()->withCount('students')->get();
        $studentsCount = \App\Models\Enrollment::whereIn('course_id', $courses->pluck('id'))->distinct('student_id')->count('student_id');
        $pendingSubmissions = \App\Models\AssignmentSubmission::whereIn(
            'assignment_id',
            \App\Models\Assignment::whereIn('course_id', $courses->pluck('id'))->pluck('id')
        )->where('status', 'submitted')->count();
        $upcomingSessions = $teacher->sessionBookingsAsTeacher()->where('scheduled_at', '>=', now())
            ->orderBy('scheduled_at')->take(5)->get();

        return view('teacher.dashboard', compact('courses', 'studentsCount', 'pendingSubmissions', 'upcomingSessions'));
    }
}
