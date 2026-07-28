@extends('layouts.public')

@section('title', 'الدعم النفسي - Mobile Tutor')

@section('content')
  <section class="courses-hero">
    <div class="container text-center">
      <h1 class="courses-hero-title">متخصصون بالدعم النفسي لمساعدتك</h1>
      <form action="{{ route('specialists.index') }}" method="GET" class="courses-search mx-auto">
        <i class="bi bi-search"></i>
        <input type="search" name="q" value="{{ request('q') }}" placeholder="ابحث باسم المدرس...">
      </form>
    </div>
  </section>

  <section class="courses-page py-4">
    <div class="container">
      <div class="row g-4" id="teachersGrid">
        @forelse($specialists as $specialist)
          <div class="col-md-6 col-xl-4 spec-item">
            <div class="ps-specialist-card">
              <h5>{{ $specialist->name }}</h5>
              <span class="ps-specialist-role">{{ $specialist->teacherProfile?->specialization ?? 'مدرس' }}</span>
              <div class="ps-specialist-meta">
                <span><i class="bi bi-star-fill"></i> <strong>{{ number_format($specialist->teacherProfile?->rating_avg ?? 0, 1) }}</strong></span>
                <span><strong>{{ $specialist->teacherProfile?->experience_years ?? 0 }}</strong> سنوات خبرة</span>
                <span class="ps-specialist-price">
                  <span class="ps-price-value">{{ $specialist->teacherProfile?->hourly_rate ?? 0 }}$</span>
                  <span class="ps-price-label">دولار / للساعة</span>
                </span>
              </div>
              <a href="{{ route('specialists.show', $specialist) }}" class="btn btn-outline-primary w-100">عرض الملف</a>
            </div>
          </div>
        @empty
          <div class="col-12 text-center text-muted py-5">لا يوجد مدرسون حالياً.</div>
        @endforelse
      </div>

      <div class="mt-4">{{ $specialists->links() }}</div>
    </div>
  </section>
@endsection
