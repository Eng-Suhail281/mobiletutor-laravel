@extends('layouts.public')

@section('title', 'الدعم النفسي - Mobile Tutor')

@section('content')
<!-- Hero -->
  <section class="ps-hero">
    <div class="container">
      <div class="row align-items-center g-4 ps-hero-row">
        <div class="col-lg-6 order-1 order-lg-1">
          <h1 class="ps-hero-title">
            <span class="ps-hero-title-line">
              <span class="text-primary">دعمك النفسي</span> خطوتك
            </span>
            <span class="ps-hero-title-line">نحو حياة أفضل</span>
          </h1>
          <p class="ps-hero-desc">
            نحن هنا لنقدم لك الدعم والمساعدة من مختصين لمساعدتك على<br>
            تجاوز التحديات وتحقيق التوازن النفسي.
          </p>
          <div class="d-flex flex-wrap gap-3 ps-hero-actions">
            <a href="{{ route('specialists.index') }}" class="btn btn-outline-primary px-4">تحدث مع مختص الآن</a>
            <a href="session-booking.html" class="btn btn-primary px-4">احجز جلسة الآن</a>
          </div>
        </div>
        <div class="col-lg-6 order-2 order-lg-2">
          <img src="images/support/hero.jpg" alt="جلسة دعم نفسي" class="ps-hero-img img-fluid">
        </div>
      </div>
    </div>
  </section>

  <!-- Services -->
  <section class="ps-services">
    <div class="container">
      <div class="ps-section-header text-center">
        <h2 class="ps-section-title">خدمات الدعم النفسي</h2>
        <div class="ps-title-underline mx-auto"></div>
      </div>

      <div class="row g-3 support-cards-row">
        <div class="col-sm-6 col-lg-3">
          <div class="support-card ps-service-card">
            <div class="support-icon mx-auto">
              <i class="bi bi-journal-richtext"></i>
            </div>
            <h5>احجز جلسة الآن</h5>
            <p>مقالات ونصائح وأدوات عملية لمساعدتك على تحسين صحتك النفسية.</p>
            <a href="session-booking.html" class="support-link">
              <span>تصفح المحتوى</span>
              <i class="bi bi-arrow-left"></i>
            </a>
          </div>
        </div>
        <div class="col-sm-6 col-lg-3">
          <div class="support-card ps-service-card">
            <div class="support-icon mx-auto">
              <i class="bi bi-chat-dots"></i>
            </div>
            <h5>تحدث الآن</h5>
            <p>تحتاج إلى دعم فوري؟ تحدث الآن مع مختص متاح.</p>
            <a href="{{ route('specialists.index') }}" class="support-link">
              <span>ابدأ المحادثة</span>
              <i class="bi bi-arrow-left"></i>
            </a>
          </div>
        </div>
        <div class="col-sm-6 col-lg-3">
          <div class="support-card ps-service-card">
            <div class="support-icon mx-auto">
              <i class="bi bi-people"></i>
            </div>
            <h5>ورش عمل جماعية</h5>
            <p>ورش تفاعلية لمساعدتك على تطوير مهاراتك والتعلم من تجارب الآخرين.</p>
            <a href="courses.html?filter=workshop" class="support-link">
              <span>استعراض الورش</span>
              <i class="bi bi-arrow-left"></i>
            </a>
          </div>
        </div>
        <div class="col-sm-6 col-lg-3">
          <div class="support-card ps-service-card">
            <div class="support-icon mx-auto">
              <i class="bi bi-person-check"></i>
            </div>
            <h5>جلسات فردية</h5>
            <p>جلسات خاصة مع مختص لمساعدتك في التعامل مع تحدياتك الشخصية.</p>
            <a href="session-booking.html" class="support-link">
              <span>احجز الجلسة</span>
              <i class="bi bi-arrow-left"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Specialists -->
  <section class="ps-specialists">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center ps-specialists-head">
        <h2 class="ps-specialists-title">مختصون معتمدون</h2>
        <a href="{{ route('specialists.index') }}" class="ps-view-all">عرض الكل</a>
      </div>

      <div class="row g-4">
        <div class="col-sm-6 col-lg-3">
          <div class="ps-specialist-card">
            <img src="images/support/specialists/ahmed.jpg" alt="أ. أحمد المتولي" class="ps-specialist-img">
            <h5>أ. أحمد المتولي</h5>
            <span class="ps-specialist-role">أخصائي دعم نفسي</span>
            <div class="ps-specialist-meta">
              <span><i class="bi bi-star-fill"></i> <strong>4.8</strong></span>
              <span><strong>8</strong> سنوات خبرة</span>
              <span class="ps-specialist-price">
                <span class="ps-price-value">20$</span>
                <span class="ps-price-label">دولار / للجلسة</span>
              </span>
            </div>
            <a href="specialist-profile.html" class="btn btn-outline-primary w-100">عرض الملف</a>
          </div>
        </div>
        <div class="col-sm-6 col-lg-3">
          <div class="ps-specialist-card">
            <img src="images/support/specialists/nour.jpg" alt="أ. نور الهدى" class="ps-specialist-img">
            <h5>أ. نور الهدى</h5>
            <span class="ps-specialist-role">أخصائية علاج نفسي معتمدة</span>
            <div class="ps-specialist-meta">
              <span><i class="bi bi-star-fill"></i> <strong>4.9</strong></span>
              <span><strong>10</strong> سنوات خبرة</span>
              <span class="ps-specialist-price">
                <span class="ps-price-value">25$</span>
                <span class="ps-price-label">دولار / للجلسة</span>
              </span>
            </div>
            <a href="specialist-profile.html" class="btn btn-outline-primary w-100">عرض الملف</a>
          </div>
        </div>
        <div class="col-sm-6 col-lg-3">
          <div class="ps-specialist-card">
            <img src="images/support/specialists/mohammad.jpg" alt="أ. محمد خالد" class="ps-specialist-img">
            <h5>أ. محمد خالد</h5>
            <span class="ps-specialist-role">أخصائي علاج سلوكي</span>
            <div class="ps-specialist-meta">
              <span><i class="bi bi-star-fill"></i> <strong>4.7</strong></span>
              <span><strong>7</strong> سنوات خبرة</span>
              <span class="ps-specialist-price">
                <span class="ps-price-value">18$</span>
                <span class="ps-price-label">دولار / للجلسة</span>
              </span>
            </div>
            <a href="specialist-profile.html" class="btn btn-outline-primary w-100">عرض الملف</a>
          </div>
        </div>
        <div class="col-sm-6 col-lg-3">
          <div class="ps-specialist-card">
            <img src="images/support/specialists/sara.jpg" alt="أ. سارة أحمد" class="ps-specialist-img">
            <h5>أ. سارة أحمد</h5>
            <span class="ps-specialist-role">أخصائية دعم نفسي</span>
            <div class="ps-specialist-meta">
              <span><i class="bi bi-star-fill"></i> <strong>4.9</strong></span>
              <span><strong>9</strong> سنوات خبرة</span>
              <span class="ps-specialist-price">
                <span class="ps-price-value">22$</span>
                <span class="ps-price-label">دولار / للجلسة</span>
              </span>
            </div>
            <a href="specialist-profile.html" class="btn btn-outline-primary w-100">عرض الملف</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Steps -->
  <section class="ps-steps-section">
    <div class="container">
      <div class="ps-section-header text-center">
        <h2 class="ps-section-title">كيف نساعدك؟</h2>
        <div class="ps-title-underline mx-auto"></div>
      </div>

      <div class="ps-steps">
        <div class="ps-step">
          <span class="ps-step-icon"><i class="bi bi-person"></i></span>
          <h4>احجز الخدمة</h4>
          <p>اختر نوع الدعم الذي يناسب احتياجاتك</p>
        </div>
        <div class="ps-step">
          <span class="ps-step-icon"><i class="bi bi-calendar-check"></i></span>
          <h4>احجز موعدك</h4>
          <p>اختر الوقت المناسب واحجز جلستك بسهولة</p>
        </div>
        <div class="ps-step">
          <span class="ps-step-icon"><i class="bi bi-chat-dots"></i></span>
          <h4>تحدث مع مختص</h4>
          <p>تحدث مع مختصنا في بيئة آمنة وسرية</p>
        </div>
        <div class="ps-step">
          <span class="ps-step-icon"><i class="bi bi-bullseye"></i></span>
          <h4>ابدأ رحلتك</h4>
          <p>اتخذ خطوة نحو تحسين حياتك النفسية</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="ps-cta">
    <div class="container">
      <div class="row align-items-center ps-cta-row">
        <div class="col-lg-6 order-2 order-lg-2">
          <div class="ps-cta-img-wrap">
            <img src="images/support/cta.jpg" alt="جلسة جماعية" class="ps-cta-img img-fluid">
          </div>
        </div>
        <div class="col-lg-6 order-1 order-lg-1">
          <div class="ps-cta-content">
            <h2 class="ps-cta-title">مستعد لبدء رحلتك؟</h2>
            <p class="ps-cta-desc">
              احجز جلستك الأولى الآن وابدأ في الاستثمار في صحتك النفسية.
              مستقبل أفضل يبدأ بخطوة واحدة.
            </p>
            <a href="session-booking.html" class="btn btn-primary px-4">احجز جلسة الآن</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="ps-testimonials">
    <div class="container">
      <div class="ps-section-header text-center">
        <h2 class="ps-section-title">تجارب حقيقية من مستخدمينا</h2>
        <div class="ps-title-underline mx-auto"></div>
      </div>

      <div class="row g-4">
        <div class="col-md-4">
          <div class="ps-testimonial-card">
            <p class="ps-testimonial-quote">
              «ساعدتني الجلسات على فهم نفسي بشكل أفضل والتعامل مع ضغوط الدراسة بثقة أكبر.»
            </p>
            <div class="ps-testimonial-user">
              <img src="images/support/testimonial-ahmed.jpg" alt="أحمد محمد" class="ps-testimonial-avatar">
              <div>
                <strong>أحمد محمد</strong>
                <span>طالب جامعي</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="ps-testimonial-card">
            <p class="ps-testimonial-quote">
              «تجربة رائعة مع المختصين. وجدت مساحة آمنة للتحدث عن ضغوط العمل دون أي حكم.»
            </p>
            <div class="ps-testimonial-user">
              <img src="images/support/testimonial-sara.jpg" alt="سارة أحمد" class="ps-testimonial-avatar">
              <div>
                <strong>سارة أحمد</strong>
                <span>موظفة</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="ps-testimonial-card">
            <p class="ps-testimonial-quote">
              «الورش الجماعية غيّرت نظرتي للتعامل مع الطلاب. أنصح كل معلم يجرب هذه الخدمة.»
            </p>
            <div class="ps-testimonial-user">
              <img src="images/shared/avatars/mohammad.jpg" alt="محمد ربيع" class="ps-testimonial-avatar">
              <div>
                <strong>محمد ربيع</strong>
                <span>معلم</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
@endsection
