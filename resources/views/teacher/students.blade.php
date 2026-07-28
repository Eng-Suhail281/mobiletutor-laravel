@extends('layouts.teacher')

@section('title', 'الطلاب - Mobile Tutor')

@section('content')
  <div class="sd-section-head sd-section-head--courses">
    <h2>الطلاب</h2>
  </div>

  <div class="sd-courses-grid" style="grid-template-columns: 1fr;">
    @forelse($students as $enrollment)
      <div class="sd-course-card">
        <div class="sd-course-body d-flex justify-content-between align-items-center">
          <div>
            <h3>{{ $enrollment->student->name }}</h3>
            <p class="text-muted mb-0">{{ $enrollment->course->title }}</p>
          </div>
          <span class="badge bg-secondary">{{ $enrollment->progress_percent }}%</span>
        </div>
      </div>
    @empty
      <p class="text-muted">لا يوجد طلاب مسجّلون بعد.</p>
    @endforelse
  </div>

  <div class="mt-4">{{ $students->links() }}</div>
@endsection
