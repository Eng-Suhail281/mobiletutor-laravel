<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $query = Course::with('teacher', 'category')->where('status', 'published');

        if ($request->filled('category')) {
            $query->where('category_id', $request->integer('category'));
        }

        if ($request->filled('level')) {
            $query->where('level', $request->string('level'));
        }

        if ($request->filled('q')) {
            $query->where('title', 'like', '%'.$request->string('q').'%');
        }

        $courses = $query->orderByDesc('created_at')->paginate(9)->withQueryString();
        $categories = Category::all();

        return view('public.courses', compact('courses', 'categories'));
    }

    public function show(Course $course)
    {
        $course->load(['teacher.teacherProfile', 'lessons', 'reviews.student']);

        $isEnrolled = auth()->check()
            && auth()->user()->enrolledCourses()->where('courses.id', $course->id)->exists();

        return view('public.course-details', compact('course', 'isEnrolled'));
    }
}
