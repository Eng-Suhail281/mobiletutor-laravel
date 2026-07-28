<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Lesson;

class CourseController extends Controller
{
    public function index()
    {
        $courses = auth()->user()->enrolledCourses()->with('teacher')->paginate(9);

        return view('student.courses', compact('courses'));
    }

    public function show(Course $course)
    {
        $this->authorizeEnrollment($course);

        $course->load('lessons', 'teacher');

        return view('student.subject', compact('course'));
    }

    public function lesson(Course $course, Lesson $lesson)
    {
        $this->authorizeEnrollment($course);

        abort_unless($lesson->course_id === $course->id, 404);

        return view('student.lesson', compact('course', 'lesson'));
    }

    protected function authorizeEnrollment(Course $course): void
    {
        abort_unless(
            auth()->user()->enrolledCourses()->where('courses.id', $course->id)->exists(),
            403,
            'يجب الاشتراك في هذا الكورس أولاً.'
        );
    }
}
