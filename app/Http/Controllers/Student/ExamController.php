<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Exam;
use App\Models\ExamSubmission;
use Illuminate\Http\Request;

class ExamController extends Controller
{
    public function index()
    {
        $student = auth()->user();
        $courseIds = $student->enrolledCourses()->pluck('courses.id');

        $exams = Exam::whereIn('course_id', $courseIds)->with('course')->orderBy('starts_at')->paginate(10);
        $mySubmissions = ExamSubmission::where('student_id', $student->id)->pluck('status', 'exam_id');

        return view('student.exams', compact('exams', 'mySubmissions'));
    }

    public function start(Exam $exam)
    {
        $submission = ExamSubmission::firstOrCreate(
            ['exam_id' => $exam->id, 'student_id' => auth()->id()],
            ['status' => 'in_progress', 'started_at' => now()]
        );

        $exam->load('questions');

        return view('student.exam', compact('exam', 'submission'));
    }

    public function submit(Request $request, Exam $exam)
    {
        $submission = ExamSubmission::where('exam_id', $exam->id)
            ->where('student_id', auth()->id())
            ->firstOrFail();

        $answers = $request->input('answers', []);

        $score = 0;
        foreach ($exam->questions as $question) {
            $given = $answers[$question->id] ?? null;
            if ($question->type !== 'essay' && $given !== null && (string) $given === (string) $question->correct_answer) {
                $score += $question->marks;
            }
        }

        $submission->update([
            'answers' => $answers,
            'score' => $score,
            'status' => 'submitted',
            'submitted_at' => now(),
        ]);

        return redirect()->route('student.exams.index')->with('success', 'تم تسليم الاختبار، النتيجة: '.$score);
    }
}
