@extends('layouts.student')

@section('title', 'حجز جلسة دعم - Mobile Tutor')

@section('content')
  <div class="sd-section-head sd-section-head--courses">
    <h2>حجز جلسة مع {{ $specialist->name }}</h2>
  </div>

  <div class="sd-course-card">
    <div class="sd-course-body">
      <p>{{ $specialist->teacherProfile?->specialization ?? 'أخصائي دعم نفسي' }}</p>
      <a href="{{ route('session-booking.show', $specialist) }}" class="sd-btn-primary">المتابعة لحجز الجلسة</a>
    </div>
  </div>
@endsection
