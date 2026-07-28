<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Course;
use App\Models\User;

class HomeController extends Controller
{
    public function index()
    {
        $featuredCourses = Course::with('teacher', 'category')
            ->where('status', 'published')
            ->orderByDesc('students_count')
            ->take(6)
            ->get();

        $topTeachers = User::where('role', 'teacher')
            ->whereHas('teacherProfile', fn ($q) => $q->where('specialty_type', 'academic'))
            ->with('teacherProfile')
            ->orderByDesc(
                \App\Models\TeacherProfile::select('rating_avg')
                    ->whereColumn('teacher_profiles.user_id', 'users.id')
            )
            ->take(4)
            ->get();

        $categories = Category::withCount('courses')->take(6)->get();

        return view('public.index', compact('featuredCourses', 'topTeachers', 'categories'));
    }

    public function about()
    {
        return view('public.about');
    }
}
