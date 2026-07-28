@extends('layouts.public')

@section('title', $course->title.' - Mobile Tutor')

@section('content')
  <section class="course-detail-hero">
    <div class="container">
      <div class="row align-items-center course-detail-hero-row g-4">
        <div class="col-lg-7 order-1 order-lg-1">
          <div class="course-detail-content">
            <h1 class="course-detail-title">{{ $course->title }}</h1>
            <p class="course-detail-desc">{{ $course->description }}</p>

            <div class="course-detail-stats">
              <div class="stat-item"><div class="stat-item-value"><i class="bi bi-clock"></i> {{ $course->duration_hours ?? '-' }} ساعات</div></div>
              <div class="stat-item"><div class="stat-item-value"><i class="bi bi-journal-text"></i> {{ $course->lessons->count() }} درس</div></div>
              <div class="stat-item"><div class="stat-item-value"><i class="bi bi-briefcase"></i> {{ $course->level ?? '-' }}</div></div>
              <div class="stat-item"><div class="stat-item-value"><i class="bi bi-people"></i> {{ $course->students_count }} طالب</div></div>
            </div>

            @auth
              @if($isEnrolled)
                <a href="{{ route('student.courses.show', $course) }}" class="btn btn-primary course-detail-cta">الذهاب إلى الكورس</a>
              @else
                <a href="{{ route('checkout.show', $course) }}" class="btn btn-primary course-detail-cta">
                  {{ $course->price > 0 ? 'اشترك الآن - '.$course->price.'$' : 'ابدأ التعليم الآن (مجاني)' }}
                </a>
              @endif
            @else
              <a href="{{ route('login') }}" class="btn btn-primary course-detail-cta">سجّل دخولك للاشتراك</a>
            @endauth
          </div>
        </div>
        <div class="col-lg-5 order-2 order-lg-2">
          <img src="{{ $course->cover_image ? asset('storage/'.$course->cover_image) : asset('images/courses/course-default.jpg') }}" alt="{{ $course->title }}" class="course-detail-img img-fluid">
        </div>
      </div>
    </div>
  </section>

  <section class="course-detail-page py-5">
    <div class="container">
      <ul class="nav nav-tabs course-tabs" id="courseTabs" role="tablist">
        <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#panel-about" type="button">نبذة عن الكورس</button></li>
        <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#panel-content" type="button">محتوى الكورس</button></li>
        <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#panel-instructor" type="button">المدرب</button></li>
        <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#panel-reviews" type="button">التقييمات ({{ $course->reviews->count() }})</button></li>
      </ul>

      <div class="row g-4 course-detail-page-row mt-2">
        <div class="col-lg-8">
          <div class="tab-content course-tab-panels">
            <div class="tab-pane fade show active" id="panel-about">
              <p class="course-about-text">{{ $course->description }}</p>
            </div>

            <div class="tab-pane fade" id="panel-content">
              <div class="course-content-summary">
                <div class="course-content-summary-item"><i class="bi bi-play-circle"></i><strong>{{ $course->lessons->count() }}</strong><span>درس</span></div>
                <div class="course-content-summary-item"><i class="bi bi-clock"></i><strong>{{ $course->duration_hours }} ساعات</strong><span>مدة</span></div>
              </div>
              <div class="accordion course-accordion" id="courseAccordion">
                @foreach($course->lessons as $i => $lesson)
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#lesson{{ $lesson->id }}">
                        <span class="accordion-title">{{ $i + 1 }}- {{ $lesson->title }}</span>
                        <span class="accordion-meta">{{ $lesson->duration_minutes }} دقيقة</span>
                      </button>
                    </h2>
                    <div id="lesson{{ $lesson->id }}" class="accordion-collapse collapse" data-bs-parent="#courseAccordion">
                      <div class="accordion-body">
                        {{ $lesson->is_free_preview ? 'درس مجاني للمعاينة' : 'متاح بعد الاشتراك في الكورس' }}
                      </div>
                    </div>
                  </div>
                @endforeach
              </div>
            </div>

            <div class="tab-pane fade" id="panel-instructor">
              <div class="d-flex align-items-center gap-3 mb-3">
                <div>
                  <h5 class="mb-0">{{ $course->teacher->name }}</h5>
                  <small class="text-muted">{{ $course->teacher->teacherProfile?->specialization }}</small>
                </div>
              </div>
              <p>{{ $course->teacher->bio }}</p>
              <a href="{{ route('teachers.show', $course->teacher) }}" class="btn btn-outline-primary btn-sm">عرض الملف الكامل</a>
            </div>

            <div class="tab-pane fade" id="panel-reviews">
              @forelse($course->reviews as $review)
                <div class="testimonial-card mb-3">
                  <div class="d-flex justify-content-between">
                    <strong>{{ $review->student->name }}</strong>
                    <span>{{ str_repeat('⭐', $review->rating) }}</span>
                  </div>
                  <p class="mb-0">{{ $review->comment }}</p>
                </div>
              @empty
                <p class="text-muted">لا توجد تقييمات بعد.</p>
              @endforelse
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="course-detail-sidebar-card p-4 border rounded-4">
            <h4 class="mb-3">{{ $course->price > 0 ? $course->price.'$' : 'مجاني' }}</h4>
            @auth
              @if($isEnrolled)
                <a href="{{ route('student.courses.show', $course) }}" class="btn btn-primary w-100">الذهاب إلى الكورس</a>
              @else
                <a href="{{ route('checkout.show', $course) }}" class="btn btn-primary w-100">اشترك الآن</a>
              @endif
            @else
              <a href="{{ route('login') }}" class="btn btn-primary w-100">سجّل دخولك للاشتراك</a>
            @endauth
          </div>
        </div>
      </div>
    </div>
  </section>
@endsection
