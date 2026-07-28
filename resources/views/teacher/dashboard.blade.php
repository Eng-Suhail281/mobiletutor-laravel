@extends('layouts.teacher')

@section('title', 'لوحة التحكم - Mobile Tutor')

@section('content')
  <section class="sd-hero">
    <div class="sd-hero-bg" aria-hidden="true"></div>
    <div class="sd-hero-scrim" aria-hidden="true"></div>
    <div class="sd-hero-inner">
      <div class="sd-hero-text">
        <span class="sd-hero-badge"><i class="bi bi-mortarboard"></i> {{ auth()->user()->teacherProfile?->specialization ?? 'لوحة المعلم' }}</span>
        <h1>أهلاً بك، {{ auth()->user()->name }}</h1>
        <p>تابع موادك وطلابك وأنشئ محتوى جديد بسهولة.</p>
        <a href="{{ route('teacher.courses.create') }}" class="sd-btn-primary sd-btn-hero">إنشاء مادة جديدة</a>
      </div>
      <div class="sd-hero-stats">
        <div class="sd-stat-card"><strong>{{ $courses->count() }}</strong><span>مادة</span></div>
        <div class="sd-stat-card"><strong>{{ $studentsCount }}</strong><span>طالب</span></div>
        <div class="sd-stat-card"><strong>{{ $pendingSubmissions }}</strong><span>واجب بانتظار التصحيح</span></div>
        <div class="sd-stat-card"><strong>{{ $upcomingSessions->count() }}</strong><span>جلسة قادمة</span></div>
      </div>
    </div>
  </section>

  <section class="sd-courses-section">
    <div class="sd-section-head sd-section-head--courses">
      <h2>موادي التعليمية</h2>
      <a href="{{ route('teacher.courses.index') }}" class="sd-link sd-link--muted">عرض جميع المواد</a>
    </div>
    <div class="sd-courses-grid">
      @forelse($courses as $course)
        <article class="sd-course-card">
          <div class="sd-course-media">
            <img src="{{ $course->cover_image ? asset('storage/'.$course->cover_image) : asset('images/courses/course-default.jpg') }}" alt="{{ $course->title }}">
          </div>
          <div class="sd-course-body">
            <h3>{{ $course->title }}</h3>
            <p class="text-muted mb-1">{{ $course->students_count }} طالب مسجّل</p>
            <a href="{{ route('teacher.courses.show', $course) }}" class="sd-btn-primary sd-btn-course">إدارة المادة</a>
          </div>
        </article>
      @empty
        <p class="text-muted">لم تنشئ أي مادة بعد. <a href="{{ route('teacher.courses.create') }}">أنشئ مادتك الأولى</a></p>
      @endforelse
    </div>
  </section>

  <section class="sd-courses-section">
    <div class="sd-section-head sd-section-head--courses">
      <h2>الجلسات القادمة</h2>
      <a href="{{ route('teacher.schedule') }}" class="sd-link sd-link--muted">عرض الجدول</a>
    </div>
    <div class="sd-courses-grid" style="grid-template-columns: 1fr;">
      @forelse($upcomingSessions as $session)
        <div class="sd-course-card">
          <div class="sd-course-body d-flex justify-content-between align-items-center">
            <div>
              <h3>{{ $session->student->name }}</h3>
              <p class="text-muted mb-0">{{ $session->scheduled_at->format('Y-m-d H:i') }}</p>
            </div>
            <span class="badge bg-secondary">{{ $session->status }}</span>
          </div>
        </div>
      @empty
        <p class="text-muted">لا توجد جلسات قادمة.</p>
      @endforelse
    </div>
  </section>
@endsection
