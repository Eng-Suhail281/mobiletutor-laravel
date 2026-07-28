@extends('layouts.public')

@section('title', $specialist->name.' - Mobile Tutor')

@section('content')
<section class="course-detail-hero">
  <div class="container">
    <div class="row align-items-center g-4">
      <div class="col-lg-8">
        <h1 class="course-detail-title">{{ $specialist->name }}</h1>
        <p class="course-detail-desc">{{ $specialist->teacherProfile?->specialization }} — {{ $specialist->teacherProfile?->qualification }}</p>
        <div class="course-detail-stats">
          <div class="stat-item"><div class="stat-item-value"><i class="bi bi-star-fill"></i> {{ number_format($specialist->teacherProfile?->rating_avg ?? 0, 1) }}</div></div>
          <div class="stat-item"><div class="stat-item-value"><i class="bi bi-briefcase"></i> {{ $specialist->teacherProfile?->experience_years ?? 0 }} سنوات خبرة</div></div>
          <div class="stat-item"><div class="stat-item-value"><i class="bi bi-people"></i> {{ $specialist->teacherProfile?->students_count ?? 0 }} طالب</div></div>
        </div>
        <a href="{{ route('session-booking.show', $specialist) }}" class="btn btn-primary course-detail-cta">احجز جلسة</a>
      </div>
    </div>
  </div>
</section>

<section class="course-detail-page py-5">
  <div class="container">
    <div class="row g-4">
      <div class="col-lg-8">
        <h5 class="course-section-title">نبذة</h5>
        <p>{{ $specialist->bio }}</p>

        <h5 class="course-section-title mt-4">جلسات الدعم</h5>
        <p>يمكنك حجز جلسة دعم نفسي فردية مع {{ $specialist->name }} عبر زر "احجز جلسة" أعلاه.</p>

        <h5 class="course-section-title mt-4">التقييمات ({{ $specialist->reviewsReceived->count() }})</h5>
        @forelse($specialist->reviewsReceived as $review)
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
