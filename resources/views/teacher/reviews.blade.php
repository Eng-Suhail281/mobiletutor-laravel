@extends('layouts.teacher')

@section('title', 'التقييمات - Mobile Tutor')

@section('content')
  <div class="sd-section-head sd-section-head--courses">
    <h2>التقييمات</h2>
  </div>

  <div class="sd-courses-grid" style="grid-template-columns: 1fr;">
    @forelse($reviews as $review)
      <div class="sd-course-card">
        <div class="sd-course-body">
          <div class="d-flex justify-content-between">
            <strong>{{ $review->student->name }}</strong>
            <span>{{ str_repeat('⭐', $review->rating) }}</span>
          </div>
          <p class="mb-0 text-muted">{{ $review->course?->title }}</p>
          <p class="mb-0">{{ $review->comment }}</p>
        </div>
      </div>
    @empty
      <p class="text-muted">لا توجد تقييمات بعد.</p>
    @endforelse
  </div>

  <div class="mt-4">{{ $reviews->links() }}</div>
@endsection
