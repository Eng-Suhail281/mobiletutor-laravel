<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Assignment;
use App\Models\AssignmentSubmission;
use App\Models\Course;
use Illuminate\Http\Request;

class AssignmentController extends Controller
{
    public function index()
    {
        $courseIds = auth()->user()->coursesTaught()->pluck('id');
        $assignments = Assignment::whereIn('course_id', $courseIds)->with(['course', 'submissions.student'])
            ->withCount('submissions')->orderByDesc('created_at')->paginate(10);

        return view('teacher.assignments', compact('assignments'));
    }

    public function store(Request $request, Course $course)
    {
        abort_unless($course->teacher_id === auth()->id(), 403);

        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'due_date' => ['nullable', 'date'],
            'max_grade' => ['required', 'integer', 'min:1'],
        ]);

        $course->assignments()->create($data);

        return back()->with('success', 'تم إنشاء الواجب.');
    }

    public function grade(Request $request, AssignmentSubmission $submission)
    {
        abort_unless($submission->assignment->course->teacher_id === auth()->id(), 403);

        $data = $request->validate([
            'grade' => ['required', 'integer', 'min:0'],
            'feedback' => ['nullable', 'string', 'max:1000'],
        ]);

        $submission->update(array_merge($data, ['status' => 'graded']));

        return back()->with('success', 'تم تقييم الواجب.');
    }
}
