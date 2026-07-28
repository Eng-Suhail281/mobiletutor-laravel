@extends('layouts.public')

@section('title', 'حجز جلسة مع '.$teacher->name.' - Mobile Tutor')

@section('content')
<section class="sb-page py-5" style="margin-top: 90px;">
  <div class="container">
    <div class="row g-4">
      <div class="col-lg-8">
        <div class="sb-flow-card">
          <h3 class="sb-panel-title">احجز جلستك</h3>
          <p class="sb-panel-subtitle">حدّد الموعد والمدة المناسبة لك</p>

          @if ($errors->any())
            <div class="alert alert-danger">
              <ul class="mb-0">@foreach ($errors->all() as $error)<li>{{ $error }}</li>@endforeach</ul>
            </div>
          @endif

          <form method="POST" action="{{ route('session-booking.store', $teacher) }}">
            @csrf

            <h5 class="sb-field-label">التاريخ والوقت</h5>
            <input type="datetime-local" name="scheduled_at" class="form-control mb-3" required min="{{ now()->addHour()->format('Y-m-d\TH:i') }}">

            <h5 class="sb-field-label">مدة الجلسة</h5>
            <div class="sb-duration-btns mb-3">
              <label class="sb-duration-btn"><input type="radio" name="duration_minutes" value="30" class="d-none"> 30 دقيقة</label>
              <label class="sb-duration-btn active"><input type="radio" name="duration_minutes" value="60" checked class="d-none"> 60 دقيقة</label>
              <label class="sb-duration-btn"><input type="radio" name="duration_minutes" value="45" class="d-none"> 45 دقيقة</label>
            </div>

            <h5 class="sb-field-label">ملاحظات (اختياري)</h5>
            <textarea name="notes" class="form-control mb-4" rows="3" placeholder="أي تفاصيل تود مشاركتها قبل الجلسة"></textarea>

            <button type="submit" class="btn btn-primary w-100">تأكيد الحجز</button>
          </form>
        </div>
      </div>

      <!-- Summary Sidebar -->
      <div class="col-lg-4">
        <aside class="sb-summary">
          <div class="sb-summary-card">
            <h2 class="sb-summary-title">ملخص الحجز</h2>
            <div class="sb-summary-box sb-summary-profile-box">
              <div class="sb-summary-profile">
                <div class="sb-summary-profile-info">
                  <strong class="sb-summary-name">{{ $teacher->name }}</strong>
                  <span class="sb-summary-role">{{ $teacher->teacherProfile?->specialization ?? ($teacher->teacherProfile?->specialty_type === 'support' ? 'أخصائي دعم نفسي' : 'مدرس') }}</span>
                  <div class="sb-summary-rating">
                    <i class="bi bi-star-fill"></i>
                    <strong dir="ltr">{{ number_format($teacher->teacherProfile?->rating_avg ?? 0, 1) }}</strong>
                  </div>
                </div>
              </div>
            </div>
            <div class="sb-summary-box">
              <div class="sb-summary-row">
                <span>السعر بالساعة</span>
                <strong dir="ltr">{{ $teacher->teacherProfile?->hourly_rate ?? 0 }} $</strong>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</section>
@endsection
