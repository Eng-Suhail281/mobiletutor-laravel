@extends('layouts.public')

@section('title', $teacher->name.' - Mobile Tutor')

@section('content')
<section class="course-detail-hero">
  <div class="container">
    <div class="row align-items-center g-4">
      <div class="col-lg-8">
        <h1 class="course-detail-title">{{ $teacher->name }}</h1>
        <p class="course-detail-desc">{{ $teacher->teacherProfile?->specialization }} — {{ $teacher->teacherProfile?->qualification }}</p>
        <div class="course-detail-stats">
          <div class="stat-item"><div class="stat-item-value"><i class="bi bi-star-fill"></i> {{ number_format($teacher->teacherProfile?->rating_avg ?? 0, 1) }}</div></div>
          <div class="stat-item"><div class="stat-item-value"><i class="bi bi-briefcase"></i> {{ $teacher->teacherProfile?->experience_years ?? 0 }} سنوات خبرة</div></div>
          <div class="stat-item"><div class="stat-item-value"><i class="bi bi-people"></i> {{ $teacher->teacherProfile?->students_count ?? 0 }} طالب</div></div>
        </div>
        <a href="{{ route('session-booking.show', $teacher) }}" class="btn btn-primary course-detail-cta">احجز جلسة</a>
      </div>
    </div>
  </div>
</section>

<section class="course-detail-page py-5">
  <div class="container">
    <div class="row g-4">
      <div class="col-lg-8">
        <h5 class="course-section-title">نبذة</h5>
        <p>{{ $teacher->bio }}</p>

        <h5 class="course-section-title mt-4">الكورسات</h5>
        <div class="row g-3">
          @forelse($teacher->coursesTaught as $course)
            <div class="col-md-6">
              <div class="course-card">
                <div class="course-body">
                  <h6>{{ $course->title }}</h6>
                  <a href="{{ route('courses.show', $course) }}" class="btn btn-outline-primary btn-sm w-100 mt-2">عرض الكورس</a>
                </div>
              </div>
            </div>
          @empty
            <p class="text-muted">لا توجد كورسات منشورة بعد.</p>
          @endforelse
        </div>

        <h5 class="course-section-title mt-4">التقييمات ({{ $teacher->reviewsReceived->count() }})</h5>
        @forelse($teacher->reviewsReceived as $review)
          <div class="testimonial-card mb-2">
            <strong>{{ $review->student->name }}</strong> — {{ str_repeat('⭐', $review->rating) }}
            <p class="mb-0">{{ $review->comment }}</p>
          </div>
        @empty
          <p class="text-muted">لا توجد تقييمات بعد.</p>
        @endforelse
      </div>
    </div>
  </div>
</section>
@endsection
