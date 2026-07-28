@extends('layouts.student')

@section('title', $course->title.' - Mobile Tutor')

@section('content')
  <div class="sd-section-head sd-section-head--courses">
    <h2>{{ $course->title }}</h2>
    <span class="text-muted">{{ $course->teacher->name }}</span>
  </div>

  <div class="sd-courses-grid" style="grid-template-columns: 1fr;">
    <div class="accordion" id="lessonsAccordion">
      @forelse($course->lessons as $i => $lesson)
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#lesson{{ $lesson->id }}">
              {{ $i + 1 }}. {{ $lesson->title }} <span class="text-muted ms-2">({{ $lesson->duration_minutes }} د)</span>
            </button>
          </h2>
          <div id="lesson{{ $lesson->id }}" class="accordion-collapse collapse" data-bs-parent="#lessonsAccordion">
            <div class="accordion-body">
              <a href="{{ route('student.courses.lesson', [$course, $lesson]) }}" class="sd-btn-primary">مشاهدة الدرس</a>
            </div>
          </div>
        </div>
      @empty
        <p class="text-muted">لا توجد دروس مضافة بعد.</p>
      @endforelse
    </div>
  </div>
@endsection
