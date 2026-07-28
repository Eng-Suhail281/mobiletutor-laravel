@extends('layouts.teacher')

@section('title', 'الاختبارات - Mobile Tutor')

@section('content')
  <div class="sd-section-head sd-section-head--courses">
    <h2>الاختبارات</h2>
  </div>

  <div class="sd-courses-grid" style="grid-template-columns: 1fr;">
    @forelse($exams as $exam)
      <div class="sd-course-card">
        <div class="sd-course-body d-flex justify-content-between align-items-center">
          <div>
            <h3>{{ $exam->title }}</h3>
            <p class="text-muted mb-0">{{ $exam->course->title }} — {{ $exam->submissions_count }} تسليم</p>
          </div>
          <span class="text-muted">{{ $exam->starts_at?->format('Y-m-d H:i') }}</span>
        </div>
      </div>
    @empty
      <p class="text-muted">لا توجد اختبارات بعد. أضفها من صفحة إدارة المادة.</p>
    @endforelse
  </div>

  <div class="mt-4">{{ $exams->links() }}</div>
@endsection
