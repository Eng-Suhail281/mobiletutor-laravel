@extends('layouts.public')

@section('title', 'إتمام الاشتراك - Mobile Tutor')

@section('content')
<section class="checkout-page py-5" style="margin-top: 90px;">
  <div class="container">

    <div class="row g-4 checkout-cards-row">
      <!-- Course Summary -->
      <div class="col-lg-6">
        <div class="checkout-card">
          <h2 class="checkout-card-title">ملخص الكورس</h2>
          <img src="{{ $course->cover_image ? asset('storage/'.$course->cover_image) : asset('images/courses/course-default.jpg') }}" alt="{{ $course->title }}" class="checkout-course-img">
          <h3 class="checkout-course-title">{{ $course->title }}</h3>
          <div class="checkout-instructor">
            <span>{{ $course->teacher->name }}</span>
          </div>
          <div class="checkout-tags">
            <span class="checkout-tag">{{ $course->lessons()->count() }} درساً</span>
            <span class="checkout-tag">{{ $course->duration_hours }} ساعات دراسية</span>
            <span class="checkout-tag">شهادة إتمام</span>
          </div>
          <a href="{{ route('courses.show', $course) }}" class="btn btn-outline-primary w-100 checkout-details-btn">عرض تفاصيل الكورس</a>
        </div>
      </div>

      <!-- Payment -->
      <div class="col-lg-6">
        <div class="checkout-card checkout-payment-card">
          <h2 class="checkout-card-title">تفاصيل الدفع</h2>

          @if(!empty($paid))
            <div class="checkout-confirmation">
              <div class="checkout-confirmation-icon" aria-hidden="true"><i class="bi bi-check-circle-fill"></i></div>
              <h3>تم تأكيد الاشتراك بنجاح</h3>
              <p>تمت إضافة الكورس إلى حسابك. يمكنك البدء بالتعلم الآن أو العودة لاحقاً من صفحة كورساتي.</p>
              <a href="{{ route('student.courses.show', $course) }}" class="btn btn-primary w-100">ابدأ التعلم الآن</a>
              <a href="{{ route('student.courses.index') }}" class="btn btn-outline-primary w-100 checkout-back-btn">الذهاب إلى كورساتي</a>
            </div>
          @else
            <div class="checkout-price-box">
              <div class="checkout-price-row checkout-total-row">
                <span>الإجمالي</span>
                <strong>{{ $course->price > 0 ? $course->price.'$' : 'مجاني' }}</strong>
              </div>
            </div>

            <p class="checkout-secure-note"><i class="bi bi-lock"></i> دفع آمن ومشفر بالكامل عبر Stripe</p>

            @if($course->price > 0)
              <form method="POST" action="{{ route('checkout.pay', $course) }}">
                @csrf
                <button type="submit" class="btn btn-primary w-100 checkout-complete-btn">الدفع عبر Stripe</button>
              </form>
            @else
              <form method="POST" action="{{ route('checkout.success', $course) }}">
                @csrf
                <button type="submit" class="btn btn-primary w-100 checkout-complete-btn">التسجيل في الكورس المجاني</button>
              </form>
            @endif

            <a href="{{ route('courses.show', $course) }}" class="btn btn-outline-primary w-100 checkout-back-btn">العودة الى الكورس</a>
          @endif
        </div>
      </div>
    </div>

    <div class="row g-3 checkout-benefits mt-2">
      <div class="col-md-4">
        <div class="checkout-benefit-card">
          <span class="checkout-benefit-icon"><i class="bi bi-lock"></i></span>
          <div class="checkout-benefit-text"><strong>وصول مدى الحياة</strong><span>بدون انتهاء صلاحية</span></div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="checkout-benefit-card">
          <span class="checkout-benefit-icon"><i class="bi bi-award"></i></span>
          <div class="checkout-benefit-text"><strong>شهادة إتمام</strong><span>معترف بها مهنياً</span></div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="checkout-benefit-card">
          <span class="checkout-benefit-icon"><i class="bi bi-headset"></i></span>
          <div class="checkout-benefit-text"><strong>دعم من المدرب</strong><span>متاح طوال فترة الكورس</span></div>
        </div>
      </div>
    </div>
  </div>
</section>
@endsection
