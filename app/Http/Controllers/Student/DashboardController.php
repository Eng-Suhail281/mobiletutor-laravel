<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function index()
    {
        $student = auth()->user();

        $courses = $student->enrolledCourses()->with('teacher')->take(5)->get();
        $pendingAssignments = \App\Models\AssignmentSubmission::where('student_id', $student->id)
            ->where('status', 'pending')->count();
        $upcomingExams = \App\Models\Exam::whereIn('course_id', $student->enrolledCourses()->pluck('courses.id'))
            ->where('starts_at', '>=', now())->orderBy('starts_at')->take(3)->get();
        $upcomingSessions = $student->sessionBookingsAsStudent()
            ->where('scheduled_at', '>=', now())->orderBy('scheduled_at')->take(3)->get();

        return view('student.dashboard', compact('courses', 'pendingAssignments', 'upcomingExams', 'upcomingSessions'));
    }
}
