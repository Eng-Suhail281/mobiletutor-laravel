<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\SessionBooking;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class SessionBookingController extends Controller
{
    public function show(User $teacher)
    {
        return view('public.session-booking', compact('teacher'));
    }

    public function store(Request $request, User $teacher): RedirectResponse
    {
        $data = $request->validate([
            'scheduled_at' => ['required', 'date', 'after:now'],
            'duration_minutes' => ['nullable', 'integer', 'min:15', 'max:180'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $booking = SessionBooking::create([
            'student_id' => auth()->id(),
            'teacher_id' => $teacher->id,
            'type' => $teacher->teacherProfile?->specialty_type ?? 'academic',
            'scheduled_at' => $data['scheduled_at'],
            'duration_minutes' => $data['duration_minutes'] ?? 60,
            'price' => $teacher->teacherProfile?->hourly_rate ?? 0,
            'notes' => $data['notes'] ?? null,
            'status' => 'pending',
        ]);

        return redirect()
            ->route('student.schedule')
            ->with('success', 'تم إرسال طلب الحجز، بانتظار تأكيد المعلم.');
    }
}
