@extends('layouts.student')

@section('title', 'الاختبارات - Mobile Tutor')

@section('content')
  <div class="sd-section-head sd-section-head--courses">
    <h2>الاختبارات</h2>
  </div>

  @if(session('success'))
    <div class="alert alert-success">{{ session('success') }}</div>
  @endif

  <div class="sd-courses-grid" style="grid-template-columns: 1fr;">
    @forelse($exams as $exam)
      @php($status = $mySubmissions[$exam->id] ?? null)
      <div class="sd-course-card">
        <div class="sd-course-body d-flex justify-content-between align-items-center">
          <div>
            <h3>{{ $exam->title }}</h3>
            <p class="text-muted mb-1">{{ $exam->course->title }} — {{ $exam->duration_minutes }} دقيقة — {{ $exam->total_marks }} علامة</p>
            @if($exam->starts_at)
              <span class="text-muted">يبدأ: {{ $exam->starts_at->format('Y-m-d H:i') }}</span>
            @endif
          </div>
          @if($status === 'submitted' || $status === 'graded')
            <span class="badge bg-success">تم التسليم</span>
          @else
            <a href="{{ route('student.exams.start', $exam) }}" class="sd-btn-primary">بدء الاختبار</a>
          @endif
        </div>
      </div>
    @empty
      <p class="text-muted">لا توجد اختبارات حالياً.</p>
    @endforelse
  </div>

  <div class="mt-4">{{ $exams->links() }}</div>
@endsection
