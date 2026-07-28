@extends('layouts.student')

@section('title', 'الإشعارات - Mobile Tutor')

@section('content')
  <div class="sd-section-head sd-section-head--courses">
    <h2>الإشعارات</h2>
  </div>

  <div class="sd-courses-grid" style="grid-template-columns: 1fr;">
    @forelse($notifications as $notification)
      <div class="sd-course-card">
        <div class="sd-course-body">
          <p class="mb-1">{{ $notification->data['message'] ?? 'إشعار جديد' }}</p>
          <small class="text-muted">{{ $notification->created_at->diffForHumans() }}</small>
        </div>
      </div>
    @empty
      <p class="text-muted">لا توجد إشعارات.</p>
    @endforelse
  </div>

  <div class="mt-4">{{ $notifications->links() }}</div>
@endsection
