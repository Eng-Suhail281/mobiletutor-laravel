@extends('layouts.public')

@section('title', 'الكورسات التدريبية - Mobile Tutor')

@section('content')
  <!-- Hero -->
  <section class="courses-hero">
    <div class="container text-center">
      <h1 class="courses-hero-title">اكتشف الكورسات المناسبة لمستقبلك</h1>
      <p class="courses-hero-subtitle">تعلّم من خبراء في مجالات متنوعة، وابدأ بتطوير مهاراتك.</p>
      <form action="{{ route('courses.index') }}" method="GET" class="courses-search mx-auto">
        <i class="bi bi-search"></i>
        <input type="search" name="q" value="{{ request('q') }}" placeholder="ابحث عن كورس أو مهارة...">
      </form>
    </div>
  </section>

  <!-- Main -->
  <section class="courses-page py-4">
    <div class="container">

      <div class="row g-4 courses-layout">
        <!-- Sidebar -->
        <div class="col-lg-3">
          <aside class="filter-sidebar">
            <div class="filter-header">
              <h5>تصفية النتائج</h5>
              <a href="{{ route('courses.index') }}" class="btn-reset">إعادة ضبط</a>
            </div>

            <form method="GET" action="{{ route('courses.index') }}">
              <div class="filter-group">
                <button class="filter-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#filterCategory">
                  التصنيف <i class="bi bi-chevron-down"></i>
                </button>
                <div class="collapse show" id="filterCategory">
                  <div class="filter-options">
                    <label><input type="radio" name="category" value="" {{ request('category') ? '' : 'checked' }} onchange="this.form.submit()"> الكل</label>
                    @foreach($categories as $cat)
                      <label>
                        <input type="radio" name="category" value="{{ $cat->id }}" {{ request('category') == $cat->id ? 'checked' : '' }} onchange="this.form.submit()">
                        {{ $cat->name }}
                      </label>
                    @endforeach
                  </div>
                </div>
              </div>

              <div class="filter-group">
                <button class="filter-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#filterLevel">
                  المستوى <i class="bi bi-chevron-down"></i>
                </button>
                <div class="collapse show" id="filterLevel">
                  <div class="filter-options">
                    @foreach(['beginner' => 'مبتدئ', 'intermediate' => 'متوسط', 'advanced' => 'متقدم'] as $val => $label)
                      <label>
                        <input type="radio" name="level" value="{{ $val }}" {{ request('level') === $val ? 'checked' : '' }} onchange="this.form.submit()">
                        {{ $label }}
                      </label>
                    @endforeach
                  </div>
                </div>
              </div>

              <button type="submit" class="btn btn-primary w-100 mt-3">عرض النتائج</button>
            </form>
          </aside>
        </div>

        <!-- Course Grid -->
        <div class="col-lg-9">
          <div class="row g-4" id="coursesGrid">
            @forelse($courses as $course)
              <div class="col-md-6 col-xl-4 course-item">
                <div class="course-card">
                  <div class="course-img-wrapper">
                    <img src="{{ $course->cover_image ? asset('storage/'.$course->cover_image) : asset('images/courses/course-default.jpg') }}" alt="{{ $course->title }}" class="course-img">
                    @if($course->rating_avg >= 4.5)
                      <span class="badge bg-success course-badge">الأكثر تقييماً</span>
                    @endif
                    <button class="btn-fav"><i class="bi bi-heart"></i></button>
                  </div>
                  <div class="course-body">
                    <div class="course-title-row">
                      <h5>{{ $course->title }}</h5>
                      <span class="course-tag">{{ $course->category?->name }}</span>
                    </div>
                    <div class="course-info-row">
                      <div class="instructor-info">
                        <span>{{ $course->teacher->name }}</span>
                      </div>
                      <span class="course-price">{{ $course->price > 0 ? $course->price.'$' : 'مجاني' }}</span>
                    </div>
                    <div class="course-stats">
                      <span><i class="bi bi-clock"></i> {{ $course->duration_hours ?? '-' }} ساعات</span>
                      <span><i class="bi bi-journal-text"></i> {{ $course->lessons_count ?? $course->lessons()->count() }} درس</span>
                      <span><i class="bi bi-briefcase"></i> {{ $course->level ?? '-' }}</span>
                    </div>
                    <a href="{{ route('courses.show', $course) }}" class="btn btn-primary w-100 mt-3">عرض التفاصيل</a>
                  </div>
                </div>
              </div>
            @empty
              <div class="col-12 text-center text-muted py-5">لا توجد كورسات مطابقة حالياً.</div>
            @endforelse
          </div>

          <div class="mt-4">
            {{ $courses->links() }}
          </div>
        </div>
      </div>
    </div>
  </section>
@endsection
