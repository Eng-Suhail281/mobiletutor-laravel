<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function index()
    {
        $sessions = auth()->user()->sessionBookingsAsTeacher()->with('student')->orderBy('scheduled_at')->get();

        return view('teacher.schedule', compact('sessions'));
    }

    public function updateStatus(Request $request, \App\Models\SessionBooking $booking)
    {
        abort_unless($booking->teacher_id === auth()->id(), 403);

        $data = $request->validate(['status' => ['required', 'in:confirmed,completed,cancelled']]);
        $booking->update($data);

        return back()->with('success', 'تم تحديث حالة الجلسة.');
    }
}
