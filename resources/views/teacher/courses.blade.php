@extends('layouts.teacher')

@section('title', 'موادي التعليمية - Mobile Tutor')

@section('content')
  <div class="sd-section-head sd-section-head--courses">
    <h2>موادي التعليمية</h2>
    <a href="{{ route('teacher.courses.create') }}" class="sd-btn-primary sd-btn-hero">+ مادة جديدة</a>
  </div>

  @if(session('success'))
    <div class="alert alert-success">{{ session('success') }}</div>
  @endif

  <div class="sd-courses-grid">
    @forelse($courses as $course)
      <article class="sd-course-card">
        <div class="sd-course-media">
          <img src="{{ $course->cover_image ? asset('storage/'.$course->cover_image) : asset('images/courses/course-default.jpg') }}" alt="{{ $course->title }}">
        </div>
        <div class="sd-course-body">
          <h3>{{ $course->title }}</h3>
          <p class="text-muted mb-1">{{ $course->students_count }} طالب — {{ $course->status === 'published' ? 'منشورة' : ($course->status === 'draft' ? 'مسودة' : 'مؤرشفة') }}</p>
          <div class="d-flex gap-2">
            <a href="{{ route('teacher.courses.show', $course) }}" class="sd-btn-primary sd-btn-course">إدارة</a>
            <a href="{{ route('teacher.courses.edit', $course) }}" class="btn btn-outline-primary btn-sm">تعديل</a>
          </div>
        </div>
      </article>
    @empty
      <p class="text-muted">لم تنشئ أي مادة بعد.</p>
    @endforelse
  </div>

  <div class="mt-4">{{ $courses->links() }}</div>
@endsection
