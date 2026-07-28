@extends('layouts.student')

@section('title', 'الشهادات - Mobile Tutor')

@section('content')
  <div class="sd-section-head sd-section-head--courses">
    <h2>شهاداتي</h2>
  </div>

  <div class="sd-courses-grid">
    @forelse($certificates as $cert)
      <article class="sd-course-card">
        <div class="sd-course-body text-center">
          <i class="bi bi-award" style="font-size: 2.5rem; color: var(--primary);"></i>
          <h3>{{ $cert->course->title }}</h3>
          <p class="text-muted">رقم الشهادة: {{ $cert->certificate_number }}</p>
          <p class="text-muted">تاريخ الإصدار: {{ $cert->issued_at->format('Y-m-d') }}</p>
          @if($cert->file_path)
            <a href="{{ asset('storage/'.$cert->file_path) }}" class="sd-btn-primary sd-btn-course" target="_blank">تحميل الشهادة</a>
          @endif
        </div>
      </article>
    @empty
      <p class="text-muted">لا توجد شهادات بعد. أكمل موادك للحصول على شهادات.</p>
    @endforelse
  </div>
@endsection
