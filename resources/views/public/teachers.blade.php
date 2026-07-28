@extends('layouts.public')

@section('title', 'المدرسين - Mobile Tutor')

@section('content')
  <section class="courses-hero">
    <div class="container text-center">
      <h1 class="courses-hero-title">تعرف على نخبة من المدرسين</h1>
      <form action="{{ route('teachers.index') }}" method="GET" class="courses-search mx-auto">
        <i class="bi bi-search"></i>
        <input type="search" name="q" value="{{ request('q') }}" placeholder="ابحث باسم المدرس...">
      </form>
    </div>
  </section>

  <section class="courses-page py-4">
    <div class="container">
      <div class="row g-4" id="teachersGrid">
        @forelse($teachers as $teacher)
          <div class="col-md-6 col-xl-4 spec-item">
            <div class="ps-specialist-card">
              <h5>{{ $teacher->name }}</h5>
              <span class="ps-specialist-role">{{ $teacher->teacherProfile?->specialization ?? 'مدرس' }}</span>
              <div class="ps-specialist-meta">
                <span><i class="bi bi-star-fill"></i> <strong>{{ number_format($teacher->teacherProfile?->rating_avg ?? 0, 1) }}</strong></span>
                <span><strong>{{ $teacher->teacherProfile?->experience_years ?? 0 }}</strong> سنوات خبرة</span>
                <span class="ps-specialist-price">
                  <span class="ps-price-value">{{ $teacher->teacherProfile?->hourly_rate ?? 0 }}$</span>
                  <span class="ps-price-label">دولار / للساعة</span>
                </span>
              </div>
              <a href="{{ route('teachers.show', $teacher) }}" class="btn btn-outline-primary w-100">عرض الملف</a>
            </div>
          </div>
        @empty
          <div class="col-12 text-center text-muted py-5">لا يوجد مدرسون حالياً.</div>
        @endforelse
      </div>

      <div class="mt-4">{{ $teachers->links() }}</div>
    </div>
  </section>
@endsection
