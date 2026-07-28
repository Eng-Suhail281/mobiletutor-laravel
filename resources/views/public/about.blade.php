@extends('layouts.public')

@section('title', 'من نحن - Mobile Tutor')

@section('content')
<!-- Hero -->
  <section class="about-hero">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <h1 class="about-hero-title">
            <span class="about-hero-title-light">نبني تجربة تعليمية تجمع بين</span><br>
            <span class="about-hero-title-dark">التعليم والتدريب والدعم النفسي</span>
          </h1>
          <p class="about-hero-desc">
            نؤمن بأن التعليم الناجح لا يقتصر على المناهج فقط، بل يشمل الدعم الأكاديمي والنفسي معاً.
            منصتنا تهدف إلى تمكين الطلاب من تحقيق أهدافهم الدراسية والمهنية في بيئة متكاملة.
          </p>
          <a href="{{ route('courses.index') }}" class="btn btn-primary about-hero-btn">استكشف الكورسات</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Vision & Mission -->
  <section class="about-section">
    <div class="container">
      <div class="about-section-header text-center">
        <h2 class="about-section-title">رؤيتنا ورسالتنا</h2>
        <div class="about-title-underline mx-auto"></div>
      </div>

      <div class="row g-4">
        <div class="col-md-6">
          <div class="about-vm-card">
            <h3>رؤيتنا</h3>
            <div class="about-vm-body">
              <span class="about-vm-icon"><i class="bi bi-eye"></i></span>
              <p>أن نكون المنصة الرائدة التي تساعد الطلاب على التفوق أكاديمياً مع الحفاظ على صحتهم النفسية وتوازنهم.</p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="about-vm-card">
            <h3>رسالتنا</h3>
            <div class="about-vm-body">
              <span class="about-vm-icon"><i class="bi bi-bullseye"></i></span>
              <p>تقديم تجربة تعليمية متكاملة تجمع بين التعلم الأكاديمي، التدريب العملي، والدعم النفسي لكل طالب.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Why Mobile Tutor -->
  <section class="about-section about-why-section">
    <div class="container">
      <div class="about-section-header text-center">
        <h2 class="about-section-title">لماذا Mobile Tutor؟</h2>
        <div class="about-title-underline mx-auto"></div>
      </div>

      <div class="row g-4">
        <div class="col-md-6 col-lg-3">
          <div class="about-why-card">
            <span class="about-why-icon"><i class="bi bi-journal-bookmark"></i></span>
            <h4>محتوى تعليمي حديث</h4>
            <p>كورسات ودروس منظمة تساعد الطالب على التعلم بسهولة.</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="about-why-card">
            <span class="about-why-icon"><i class="bi bi-heart-pulse"></i></span>
            <h4>دعم نفسي متكامل</h4>
            <p>جلسات وإرشادات تساعد الطالب على تقليل الضغط الدراسي.</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="about-why-card">
            <span class="about-why-icon"><i class="bi bi-people"></i></span>
            <h4>مدرسون متخصصون</h4>
            <p>تعلم مع خبراء وأكاديميين متخصصين.</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="about-why-card">
            <span class="about-why-icon"><i class="bi bi-shield-check"></i></span>
            <h4>شهادات وإنجازات</h4>
            <p>احصل على شهادات بعد إنهاء البرامج التدريبية.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Stats -->
  <section class="about-stats-section">
    <div class="container">
      <div class="about-stats-box">
        <div class="row g-4 text-center">
          <div class="col-6 col-md-3">
            <strong class="about-stat-value">+2000</strong>
            <span class="about-stat-label">طالب نشط</span>
          </div>
          <div class="col-6 col-md-3">
            <strong class="about-stat-value">+150</strong>
            <span class="about-stat-label">كورس تدريبي</span>
          </div>
          <div class="col-6 col-md-3">
            <strong class="about-stat-value">+40</strong>
            <span class="about-stat-label">مدرس متخصص</span>
          </div>
          <div class="col-6 col-md-3">
            <strong class="about-stat-value">92%</strong>
            <span class="about-stat-label">رضا الطلاب</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="about-section about-team-section">
    <div class="container">
      <div class="about-section-header text-center">
        <h2 class="about-section-title">فريق العمل</h2>
        <div class="about-title-underline mx-auto"></div>
      </div>

      <div class="row g-4">
        <div class="col-md-6 col-lg-3">
          <div class="about-team-card">
            <img src="images/about/team-sara.jpg" alt="سارة خالد" class="about-team-img">
            <h5>سارة خالد</h5>
            <span class="about-team-role">أخصائية دعم نفسي</span>
            <p>تساعد الطلاب في التعامل مع الضغط الدراسي.</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="about-team-card">
            <img src="images/about/team-ahmed.jpg" alt="أحمد محمد" class="about-team-img">
            <h5>أحمد محمد</h5>
            <span class="about-team-role">خبير تعلم إلكتروني</span>
            <p>مختص في تطوير تجربة التعلم.</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="about-team-card">
            <img src="images/about/team-noor.jpg" alt="نور جبر" class="about-team-img">
            <h5>نور جبر</h5>
            <span class="about-team-role">خبيرة المحتوى</span>
            <p>متخصصة في تطوير المحتوى الأكاديمي.</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="about-team-card">
            <img src="images/about/team-khaled.jpg" alt="خالد سامر" class="about-team-img">
            <h5>خالد سامر</h5>
            <span class="about-team-role">مستشار تقني وتعليمي</span>
            <p>مختص في تقنيات التعليم والمنصات الرقمية.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="about-cta">
    <div class="container">
      <div class="row align-items-center about-cta-row">
        <div class="col-lg-6 order-2 order-lg-2">
          <div class="about-cta-img-wrap">
            <img src="images/shared/graduates.jpg" alt="خريجون يحتفلون بتخرجهم" class="about-cta-img img-fluid">
          </div>
        </div>
        <div class="col-lg-6 order-1 order-lg-1">
          <div class="about-cta-content">
            <h2 class="about-cta-title">جاهز لبدء رحلتك التعليمية؟</h2>
            <p class="about-cta-desc">انضم إلى آلاف الطلاب وابدأ التعلم اليوم.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
@endsection
