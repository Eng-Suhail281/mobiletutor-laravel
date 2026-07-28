<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CourseController extends Controller
{
    public function index()
    {
        $courses = auth()->user()->coursesTaught()->withCount('students')->paginate(9);

        return view('teacher.courses', compact('courses'));
    }

    public function show(Course $course)
    {
        $this->authorizeOwner($course);
        $course->load('lessons', 'assignments', 'exams', 'students');

        return view('teacher.course', compact('course'));
    }

    public function create()
    {
        $categories = Category::all();

        return view('teacher.course-create', compact('categories'));
    }

    public function store(Request $request)
    {
        $data = $this->validateData($request);

        $data['teacher_id'] = auth()->id();
        $data['slug'] = Str::slug($data['title']).'-'.Str::random(5);

        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = $request->file('cover_image')->store('courses', 'public');
        }

        $course = Course::create($data);

        return redirect()->route('teacher.courses.show', $course)->with('success', 'تم إنشاء الكورس.');
    }

    public function edit(Course $course)
    {
        $this->authorizeOwner($course);
        $categories = Category::all();

        return view('teacher.course-edit', compact('course', 'categories'));
    }

    public function update(Request $request, Course $course)
    {
        $this->authorizeOwner($course);
        $data = $this->validateData($request, $course->id);

        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = $request->file('cover_image')->store('courses', 'public');
        }

        $course->update($data);

        return redirect()->route('teacher.courses.show', $course)->with('success', 'تم تحديث الكورس.');
    }

    public function destroy(Course $course)
    {
        $this->authorizeOwner($course);
        $course->delete();

        return redirect()->route('teacher.courses.index')->with('success', 'تم حذف الكورس.');
    }

    protected function validateData(Request $request, ?int $ignoreId = null): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'level' => ['nullable', 'string'],
            'duration_hours' => ['nullable', 'integer', 'min:0'],
            'status' => ['required', 'in:draft,published,archived'],
            'cover_image' => ['nullable', 'image', 'max:2048'],
        ]);
    }

    protected function authorizeOwner(Course $course): void
    {
        abort_unless($course->teacher_id === auth()->id(), 403);
    }
}
