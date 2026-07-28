@extends('layouts.student')

@section('title', 'جدولي الدراسي - Mobile Tutor')

@section('content')
  <div class="sd-section-head sd-section-head--courses">
    <h2>جدولي الدراسي</h2>
  </div>

  <h5 class="mt-2">الجلسات المحجوزة</h5>
  <div class="sd-courses-grid" style="grid-template-columns: 1fr;">
    @forelse($sessions as $session)
      <div class="sd-course-card">
        <div class="sd-course-body d-flex justify-content-between align-items-center">
          <div>
            <h3>{{ $session->teacher->name }}</h3>
            <p class="text-muted mb-0">{{ $session->scheduled_at->format('Y-m-d H:i') }} — {{ $session->duration_minutes }} دقيقة</p>
          </div>
          <span class="badge {{ $session->status === 'confirmed' ? 'bg-success' : ($session->status === 'cancelled' ? 'bg-danger' : 'bg-secondary') }}">
            @switch($session->status)
              @case('confirmed') مؤكدة @break
              @case('completed') منتهية @break
              @case('cancelled') ملغاة @break
              @default بانتظار التأكيد
            @endswitch
          </span>
        </div>
      </div>
    @empty
      <p class="text-muted">لا توجد جلسات محجوزة.</p>
    @endforelse
  </div>

  <h5 class="mt-4">الاختبارات القادمة</h5>
  <div class="sd-courses-grid" style="grid-template-columns: 1fr;">
    @forelse($exams as $exam)
      <div class="sd-course-card">
        <div class="sd-course-body">
          <h3>{{ $exam->title }}</h3>
          <p class="text-muted mb-0">{{ $exam->starts_at?->format('Y-m-d H:i') }}</p>
        </div>
      </div>
    @empty
      <p class="text-muted">لا توجد اختبارات مجدولة.</p>
    @endforelse
  </div>
@endsection
