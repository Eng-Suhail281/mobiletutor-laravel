@extends('layouts.public')

@section('title', 'Mobile Tutor - منصة التعليم والتدريب')

@section('content')
  <!-- Hero -->
  <section id="home" class="hero-section">
    <div class="container">
      <div class="row align-items-center g-4">
        <div class="col-lg-6 order-lg-1">
          <h1 class="hero-title">
            <span class="hero-title-line">ابنِ <span class="text-primary">مستقبلك</span> من</span>
            <span class="hero-title-line">مكان واحد</span>
          </h1>
          <p class="hero-subtitle">
            تعلّم من خريجين حقيقيين، واستكشف مسارات دراسية ومهنية واضحة مع دعم متكامل.
          </p>
          <div class="d-flex flex-wrap gap-3 hero-cta-buttons">
            <a href="{{ route('register.teacher') }}" class="btn btn-outline-primary hero-cta-btn px-4">سجل كمدرس</a>
            <a href="{{ route('register.student') }}" class="btn btn-primary hero-cta-btn px-4">سجل كطالب</a>
          </div>
        </div>
        <div class="col-lg-6 order-lg-2">
          <img src="{{ asset('images/home/hero-student.png') }}" alt="طالب يدرس" class="img-fluid hero-img rounded-4">
        </div>
      </div>
    </div>
  </section>

  <!-- Features -->
  <section class="features-section py-5">
    <div class="container">
      <div class="section-header text-center mb-5">
        <h2 class="section-title">مسارك يبدأ من هنا</h2>
        <div class="title-underline mx-auto"></div>
      </div>
      <div class="row g-3 features-row">
        <div class="col-md-6 col-lg-3">
          <div class="feature-card"><div class="feature-card-inner">
            <div class="feature-icon"><i class="bi bi-book"></i></div>
            <h5>التعليم الأكاديمي</h5>
            <p>أساس قوي للمواد والمهارات الدراسية.</p>
          </div></div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="feature-card"><div class="feature-card-inner">
            <div class="feature-icon"><i class="bi bi-mortarboard"></i></div>
            <h5>التعليم الجامعي</h5>
            <p>تخصصات أكاديمية ومسارات مستقبلية.</p>
          </div></div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="feature-card"><div class="feature-card-inner">
            <div class="feature-icon"><i class="bi bi-briefcase"></i></div>
            <h5>التدريب المهني</h5>
            <p>مهارات عملية تؤهلك لسوق العمل.</p>
          </div></div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="feature-card"><div class="feature-card-inner">
            <div class="feature-icon"><i class="bi bi-heart-pulse"></i></div>
            <h5>الدعم النفسي</h5>
            <p>بيئة داعمة تساعدك على الاستمرار والتوازن.</p>
          </div></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Courses -->
  <section id="courses" class="courses-section py-5">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="section-title mb-0">الكورسات التدريبية</h2>
        <a href="{{ route('courses.index') }}" class="text-muted text-decoration-none">عرض الكل</a>
      </div>

      <div class="row g-4">
        @forelse($featuredCourses as $course)
          <div class="col-md-6 col-lg-4">
            <div class="course-card">
              <div class="course-img-wrapper">
                <img src="{{ $course->cover_image ? asset('storage/'.$course->cover_image) : asset('images/courses/course-default.jpg') }}" alt="{{ $course->title }}" class="course-img">
                @if($course->rating_avg >= 4.5)
                  <span class="badge bg-success course-badge">أكثر تقييماً</span>
                @endif
                <button class="btn-fav"><i class="bi bi-heart"></i></button>
              </div>
              <div class="course-body">
                <div class="course-title-row">
                  <h5>{{ $course->title }}</h5>
                  <span class="course-tag">{{ $course->category?->name }}</span>
                </div>
                <div class="course-info-row">
                  <div class="instructor-info"><span>{{ $course->teacher->name }}</span></div>
                  <span class="course-price">{{ $course->price > 0 ? $course->price.'$' : 'مجاني' }}</span>
                </div>
                <div class="course-stats">
                  <span><i class="bi bi-clock"></i> {{ $course->duration_hours ?? '-' }} ساعات</span>
                  <span><i class="bi bi-journal-text"></i> {{ $course->lessons()->count() }} درس</span>
                  <span><i class="bi bi-briefcase"></i> {{ $course->level ?? '-' }}</span>
                </div>
                <a href="{{ route('courses.show', $course) }}" class="btn btn-primary w-100 mt-3">عرض التفاصيل</a>
              </div>
            </div>
          </div>
        @empty
          <p class="text-muted text-center">لا توجد كورسات منشورة بعد.</p>
        @endforelse
      </div>
    </div>
  </section>

  <!-- Top Teachers -->
  <section class="teachers-section py-5">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="section-title mb-0">مدرسون مميزون</h2>
        <a href="{{ route('teachers.index') }}" class="text-muted text-decoration-none">عرض الكل</a>
      </div>
      <div class="row g-4">
        @forelse($topTeachers as $teacher)
          <div class="col-md-6 col-lg-3">
            <div class="ps-specialist-card">
              <h5>{{ $teacher->name }}</h5>
              <span class="ps-specialist-role">{{ $teacher->teacherProfile?->specialization }}</span>
              <div class="ps-specialist-meta">
                <span><i class="bi bi-star-fill"></i> <strong>{{ number_format($teacher->teacherProfile?->rating_avg ?? 0, 1) }}</strong></span>
              </div>
              <a href="{{ route('teachers.show', $teacher) }}" class="btn btn-outline-primary w-100">عرض الملف</a>
            </div>
          </div>
        @empty
          <p class="text-muted text-center">لا يوجد مدرسون بعد.</p>
        @endforelse
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="testimonials-section py-5">
    <div class="container">
      <div class="section-header text-center mb-4">
        <h2 class="section-title">تعلم من خبرات حقيقية</h2>
        <div class="title-underline mx-auto"></div>
      </div>
      <div class="row g-3">
        <div class="col-md-4">
          <div class="testimonial-card">
            <p>المنصة ساعدتني أحدد مساري الجامعي بوضوح. الدعم من الخريجين كان نقطة تحول حقيقية في حياتي الدراسية.</p>
            <div class="testimonial-author"><div><strong>أحمد ناصر</strong><small>طالب هندسة</small></div></div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="testimonial-card">
            <p>جلسات الدعم النفسي غيّرت نظرتي للدراسة، صرت أقدر أدير وقتي وضغوطي بشكل أفضل بكثير.</p>
            <div class="testimonial-author"><div><strong>سارة أبو غزالة</strong><small>طالبة ثانوية</small></div></div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="testimonial-card">
            <p>كمدرّس، المنصة سهّلت عليّ الوصول لعدد أكبر من الطلاب وإدارة موادي وواجباتي باحترافية.</p>
            <div class="testimonial-author"><div><strong>محمد ربيع</strong><small>مدرّس إدارة مشاريع</small></div></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="home-cta-section py-5">
    <div class="container text-center">
      <h2 class="section-title mb-3">جاهز تبدأ رحلتك التعليمية؟</h2>
      <a href="{{ route('account-select') }}" class="btn btn-primary hero-cta-btn px-4">إنشاء حساب مجاني</a>
    </div>
  </section>
@endsection
