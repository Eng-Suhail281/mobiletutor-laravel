<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Assignment;
use App\Models\AssignmentSubmission;
use Illuminate\Http\Request;

class AssignmentController extends Controller
{
    public function index()
    {
        $student = auth()->user();
        $courseIds = $student->enrolledCourses()->pluck('courses.id');

        $assignments = Assignment::whereIn('course_id', $courseIds)
            ->with('course')
            ->withCount('submissions')
            ->orderByDesc('due_date')
            ->paginate(10);

        $mySubmissions = AssignmentSubmission::where('student_id', $student->id)
            ->pluck('status', 'assignment_id');

        return view('student.assignments', compact('assignments', 'mySubmissions'));
    }

    public function submit(Request $request, Assignment $assignment)
    {
        $data = $request->validate([
            'answer_text' => ['nullable', 'string'],
            'attachment' => ['nullable', 'file', 'max:10240'],
        ]);

        $path = null;
        if ($request->hasFile('attachment')) {
            $path = $request->file('attachment')->store('assignment_submissions', 'public');
        }

        AssignmentSubmission::updateOrCreate(
            ['assignment_id' => $assignment->id, 'student_id' => auth()->id()],
            [
                'answer_text' => $data['answer_text'] ?? null,
                'attachment' => $path,
                'status' => now()->gt($assignment->due_date ?? now()->addYear()) ? 'late' : 'submitted',
                'submitted_at' => now(),
            ]
        );

        return back()->with('success', 'تم تسليم الواجب بنجاح.');
    }
}
