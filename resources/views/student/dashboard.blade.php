@extends('layouts.student')

@section('title', 'لوحة التحكم - Mobile Tutor')

@section('content')
  <!-- Hero -->
  <section class="sd-hero">
    <div class="sd-hero-bg" aria-hidden="true"></div>
    <div class="sd-hero-scrim" aria-hidden="true"></div>
    <div class="sd-hero-inner">
      <div class="sd-hero-text">
        <span class="sd-hero-badge"><i class="bi bi-mortarboard"></i> {{ auth()->user()->studentProfile?->major ?? 'المسار الأكاديمي' }}</span>
        <h1>أكمل رحلتك التعليمية</h1>
        <p>أنت قريب من تحقيق أهدافك — تابع دروسك اليوم.</p>
        <a href="{{ route('student.courses.index') }}" class="sd-btn-primary sd-btn-hero">تابع التعلم</a>
      </div>
      <div class="sd-hero-stats">
        <div class="sd-stat-card">
          <strong>{{ $courses->count() }}</strong>
          <span>مادة مسجّلة</span>
        </div>
        <div class="sd-stat-card">
          <strong>{{ $pendingAssignments }}</strong>
          <span>واجب بانتظار التسليم</span>
        </div>
        <div class="sd-stat-card">
          <strong>{{ $upcomingExams->count() }}</strong>
          <span>اختبار قادم</span>
        </div>
        <div class="sd-stat-card">
          <strong>{{ auth()->user()->certificates()->count() }}</strong>
          <span>شهادات محققة</span>
        </div>
      </div>
    </div>
  </section>

  <!-- My Courses -->
  <section class="sd-courses-section">
    <div class="sd-section-head sd-section-head--courses">
      <h2>موادي الدراسية</h2>
      <a href="{{ route('student.courses.index') }}" class="sd-link sd-link--muted">عرض جميع المواد</a>
    </div>
    <div class="sd-courses-grid">
      @forelse($courses as $course)
        <article class="sd-course-card">
          <div class="sd-course-media">
            <img src="{{ $course->cover_image ? asset('storage/'.$course->cover_image) : asset('images/courses/course-default.jpg') }}" alt="{{ $course->title }}">
          </div>
          <div class="sd-course-body">
            <h3>{{ $course->title }}</h3>
            <div class="sd-course-teacher"><span>{{ $course->teacher->name }}</span></div>
            <div class="sd-course-progress">
              <div class="sd-course-progress-row">
                <div class="sd-progress-bar sd-progress-bar--course"><span style="width: {{ $course->pivot->progress_percent }}%"></span></div>
                <span class="sd-course-pct">{{ $course->pivot->progress_percent }}%</span>
              </div>
            </div>
            <a href="{{ route('student.courses.show', $course) }}" class="sd-btn-primary sd-btn-course">متابعة</a>
          </div>
        </article>
      @empty
        <p class="text-muted">لم تشترك في أي مادة بعد. <a href="{{ route('courses.index') }}">تصفح الكورسات</a></p>
      @endforelse
    </div>
  </section>

  <!-- Upcoming exams & sessions -->
  <section class="sd-courses-section">
    <div class="sd-section-head sd-section-head--courses">
      <h2>اختبارات قادمة</h2>
      <a href="{{ route('student.exams.index') }}" class="sd-link sd-link--muted">عرض الكل</a>
    </div>
    <div class="sd-courses-grid">
      @forelse($upcomingExams as $exam)
        <article class="sd-course-card">
          <div class="sd-course-body">
            <h3>{{ $exam->title }}</h3>
            <p class="text-muted">{{ $exam->course->title }} — {{ $exam->starts_at?->format('Y-m-d H:i') }}</p>
            <a href="{{ route('student.exams.index') }}" class="sd-btn-primary sd-btn-course">التفاصيل</a>
          </div>
        </article>
      @empty
        <p class="text-muted">لا توجد اختبارات قادمة.</p>
      @endforelse
    </div>
  </section>
@endsection
