@extends('layouts.teacher')

@section('title', 'الواجبات - Mobile Tutor')

@section('content')
  <div class="sd-section-head sd-section-head--courses">
    <h2>الواجبات</h2>
  </div>

  @if(session('success'))
    <div class="alert alert-success">{{ session('success') }}</div>
  @endif

  <div class="sd-courses-grid" style="grid-template-columns: 1fr;">
    @forelse($assignments as $assignment)
      <div class="sd-course-card">
        <div class="sd-course-body">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h3>{{ $assignment->title }}</h3>
              <p class="text-muted mb-0">{{ $assignment->course->title }} — {{ $assignment->submissions_count }} تسليم</p>
            </div>
          </div>

          @foreach($assignment->submissions as $submission)
            <div class="border-top mt-2 pt-2 d-flex justify-content-between align-items-center">
              <span>{{ $submission->student->name }} — {{ $submission->status }}</span>
              @if($submission->status === 'submitted')
                <form method="POST" action="{{ route('teacher.assignments.grade', $submission) }}" class="d-flex gap-1">
                  @csrf
                  <input type="number" name="grade" class="form-control form-control-sm" style="width: 80px;" min="0" max="{{ $assignment->max_grade }}" required>
                  <button type="submit" class="btn btn-primary btn-sm">تقييم</button>
                </form>
              @else
                <span class="text-muted">{{ $submission->grade ?? '-' }} / {{ $assignment->max_grade }}</span>
              @endif
            </div>
          @endforeach
        </div>
      </div>
    @empty
      <p class="text-muted">لا توجد واجبات بعد.</p>
    @endforelse
  </div>

  <div class="mt-4">{{ $assignments->links() }}</div>
@endsection
