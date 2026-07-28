@extends('layouts.student')

@section('title', 'الدعم النفسي - Mobile Tutor')

@section('content')
  <div class="sd-section-head sd-section-head--courses">
    <h2>الدعم النفسي</h2>
  </div>

  <h5>المختصون المتاحون</h5>
  <div class="sd-courses-grid">
    @forelse($specialists as $specialist)
      <article class="sd-course-card">
        <div class="sd-course-body">
          <h3>{{ $specialist->name }}</h3>
          <p class="text-muted">{{ $specialist->teacherProfile?->specialization ?? 'أخصائي دعم نفسي' }}</p>
          <a href="{{ route('session-booking.show', $specialist) }}" class="sd-btn-primary sd-btn-course">احجز جلسة</a>
        </div>
      </article>
    @empty
      <p class="text-muted">لا يوجد مختصون متاحون حالياً.</p>
    @endforelse
  </div>

  <h5 class="mt-4">جلساتي السابقة</h5>
  <div class="sd-courses-grid" style="grid-template-columns: 1fr;">
    @forelse($mySessions as $session)
      <div class="sd-course-card">
        <div class="sd-course-body d-flex justify-content-between align-items-center">
          <div>
            <h3>{{ $session->teacher->name }}</h3>
            <p class="text-muted mb-0">{{ $session->scheduled_at->format('Y-m-d H:i') }}</p>
          </div>
          <span class="badge bg-secondary">{{ $session->status }}</span>
        </div>
      </div>
    @empty
      <p class="text-muted">لم تحجز أي جلسات دعم بعد.</p>
    @endforelse
  </div>
@endsection
