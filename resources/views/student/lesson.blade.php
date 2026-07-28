@extends('layouts.student')

@section('title', $lesson->title.' - '.$course->title)

@section('content')
  <div class="sd-section-head sd-section-head--courses">
    <h2>{{ $lesson->title }}</h2>
    <a href="{{ route('student.courses.show', $course) }}" class="sd-link sd-link--muted">العودة للمادة</a>
  </div>

  @if($lesson->video_url)
    <div class="ratio ratio-16x9 mb-4">
      <iframe src="{{ $lesson->video_url }}" allowfullscreen></iframe>
    </div>
  @endif

  <div class="sd-course-card">
    <div class="sd-course-body">
      {!! nl2br(e($lesson->content)) !!}
    </div>
  </div>
@endsection
