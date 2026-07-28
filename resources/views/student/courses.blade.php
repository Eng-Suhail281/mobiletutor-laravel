@extends('layouts.student')

@section('title', 'موادي الدراسية - Mobile Tutor')

@section('content')
  <div class="sd-section-head sd-section-head--courses">
    <h2>موادي الدراسية</h2>
  </div>

  <div class="sd-courses-grid">
    @forelse($courses as $course)
      <article class="sd-course-card">
        <div class="sd-course-media">
          <img src="{{ $course->cover_image ? asset('storage/'.$course->cover_image) : asset('images/courses/course-default.jpg') }}" alt="{{ $course->title }}">
        </div>
        <div class="sd-course-body">
          <h3>{{ $course->title }}</h3>
          <div class="sd-course-teacher"><span>{{ $course->teacher->name }}</span></div>
          <div class="sd-course-progress">
            <div class="sd-course-progress-row">
              <div class="sd-progress-bar sd-progress-bar--course"><span style="width: {{ $course->pivot->progress_percent }}%"></span></div>
              <span class="sd-course-pct">{{ $course->pivot->progress_percent }}%</span>
            </div>
          </div>
          <a href="{{ route('student.courses.show', $course) }}" class="sd-btn-primary sd-btn-course">متابعة</a>
        </div>
      </article>
    @empty
      <p class="text-muted">لم تشترك في أي مادة بعد. <a href="{{ route('courses.index') }}">تصفح الكورسات</a></p>
    @endforelse
  </div>

  <div class="mt-4">{{ $courses->links() }}</div>
@endsection
