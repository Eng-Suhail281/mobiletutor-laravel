<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Exam;
use Illuminate\Http\Request;

class ExamController extends Controller
{
    public function index()
    {
        $courseIds = auth()->user()->coursesTaught()->pluck('id');
        $exams = Exam::whereIn('course_id', $courseIds)->with('course')
            ->withCount('submissions')->orderByDesc('starts_at')->paginate(10);

        return view('teacher.exams', compact('exams'));
    }

    public function store(Request $request, Course $course)
    {
        abort_unless($course->teacher_id === auth()->id(), 403);

        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'duration_minutes' => ['required', 'integer', 'min:5'],
            'total_marks' => ['required', 'integer', 'min:1'],
            'starts_at' => ['nullable', 'date'],
            'ends_at' => ['nullable', 'date', 'after:starts_at'],
        ]);

        $exam = $course->exams()->create($data);

        foreach ($request->input('questions', []) as $i => $q) {
            $exam->questions()->create([
                'question' => $q['question'],
                'type' => $q['type'] ?? 'mcq',
                'options' => $q['options'] ?? null,
                'correct_answer' => $q['correct_answer'] ?? null,
                'marks' => $q['marks'] ?? 1,
                'order' => $i,
            ]);
        }

        return back()->with('success', 'تم إنشاء الاختبار.');
    }
}
