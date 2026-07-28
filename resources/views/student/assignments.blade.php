@extends('layouts.student')

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
      @php($status = $mySubmissions[$assignment->id] ?? 'pending')
      <div class="sd-course-card">
        <div class="sd-course-body">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <h3>{{ $assignment->title }}</h3>
              <p class="text-muted mb-1">{{ $assignment->course->title }}</p>
              <p>{{ $assignment->description }}</p>
              @if($assignment->due_date)
                <span class="text-muted">آخر موعد للتسليم: {{ $assignment->due_date->format('Y-m-d H:i') }}</span>
              @endif
            </div>
            <span class="badge {{ $status === 'graded' ? 'bg-success' : ($status === 'pending' ? 'bg-secondary' : 'bg-primary') }}">
              @switch($status)
                @case('graded') تم التقييم @break
                @case('submitted') تم التسليم @break
                @case('late') تسليم متأخر @break
                @default بانتظار التسليم
              @endswitch
            </span>
          </div>

          @if($status === 'pending')
            <form method="POST" action="{{ route('student.assignments.submit', $assignment) }}" enctype="multipart/form-data" class="mt-3">
              @csrf
              <textarea name="answer_text" class="form-control mb-2" rows="3" placeholder="إجابتك..."></textarea>
              <input type="file" name="attachment" class="form-control mb-2">
              <button type="submit" class="sd-btn-primary">تسليم الواجب</button>
            </form>
          @endif
        </div>
      </div>
    @empty
      <p class="text-muted">لا توجد واجبات حالياً.</p>
    @endforelse
  </div>

  <div class="mt-4">{{ $assignments->links() }}</div>
@endsection
