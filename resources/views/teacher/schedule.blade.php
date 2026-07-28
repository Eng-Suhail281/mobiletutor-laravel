@extends('layouts.teacher')

@section('title', 'جدولي الدراسي - Mobile Tutor')

@section('content')
  <div class="sd-section-head sd-section-head--courses">
    <h2>جدولي الدراسي</h2>
  </div>

  @if(session('success'))
    <div class="alert alert-success">{{ session('success') }}</div>
  @endif

  <div class="sd-courses-grid" style="grid-template-columns: 1fr;">
    @forelse($sessions as $session)
      <div class="sd-course-card">
        <div class="sd-course-body d-flex justify-content-between align-items-center">
          <div>
            <h3>{{ $session->student->name }}</h3>
            <p class="text-muted mb-0">{{ $session->scheduled_at->format('Y-m-d H:i') }} — {{ $session->duration_minutes }} دقيقة</p>
          </div>
          <div class="d-flex gap-2 align-items-center">
            <span class="badge {{ $session->status === 'confirmed' ? 'bg-success' : ($session->status === 'cancelled' ? 'bg-danger' : 'bg-secondary') }}">{{ $session->status }}</span>
            @if($session->status === 'pending')
              <form method="POST" action="{{ route('teacher.schedule.status', $session) }}">
                @csrf
                <input type="hidden" name="status" value="confirmed">
                <button type="submit" class="btn btn-sm btn-primary">تأكيد</button>
              </form>
              <form method="POST" action="{{ route('teacher.schedule.status', $session) }}">
                @csrf
                <input type="hidden" name="status" value="cancelled">
                <button type="submit" class="btn btn-sm btn-outline-danger">رفض</button>
              </form>
            @endif
          </div>
        </div>
      </div>
    @empty
      <p class="text-muted">لا توجد جلسات مجدولة.</p>
    @endforelse
  </div>
@endsection
