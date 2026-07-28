  <footer class="footer">
    <div class="container footer-main">
      <div class="row footer-columns g-4">
        <div class="col-lg-3 col-md-6 footer-col-brand">
          <h4 class="footer-brand">Mobile Tutor</h4>
          <p class="footer-desc">
            منصة تعليمية متكاملة تجمع بين التعلم الأكاديمي والدعم النفسي لتطوير مهاراتك وبناء مستقبلك.
          </p>
        </div>
        <div class="col-lg-2 col-md-6">
          <h6 class="footer-heading">روابط سريعة</h6>
          <ul class="footer-links">
            <li><a href="{{ route('home') }}">الرئيسية</a></li>
            <li><a href="{{ route('courses.index') }}">الكورسات</a></li>
            <li><a href="{{ route('teachers.index') }}">المدرسين</a></li>
            <li><a href="{{ route('support.index') }}">الدعم النفسي</a></li>
            <li><a href="#contact">تواصل معنا</a></li>
          </ul>
        </div>
        <div class="col-lg-2 col-md-6">
          <h6 class="footer-heading">أقسام المنصة</h6>
          <ul class="footer-links">
            <li><a href="#">التعليم المدرسي</a></li>
            <li><a href="#">التعليم الجامعي</a></li>
            <li><a href="#">التدريب المهني</a></li>
            <li><a href="#">الجلسات النفسية</a></li>
          </ul>
        </div>
        <div class="col-lg-2 col-md-6">
          <h6 class="footer-heading">الشركاء</h6>
          <ul class="footer-links">
            <li><a href="#">مؤسسات تعليمية</a></li>
            <li><a href="#">مدربين وخبراء</a></li>
            <li><a href="#">جهات توظيف</a></li>
            <li><a href="#">مراكز إرشاد نفسي</a></li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-6" id="contact">
          <h6 class="footer-heading">تواصل معنا</h6>
          <ul class="footer-contact">
            <li><i class="bi bi-geo-alt"></i><span>فلسطين _ قطاع غزة</span></li>
            <li><i class="bi bi-envelope"></i><span>support@yourplatform.com</span></li>
            <li><i class="bi bi-telephone"></i><span>+970 000 000 000</span></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <div class="footer-bottom-inner">
          <p class="footer-copy">© {{ date('Y') }} جميع الحقوق محفوظة لمنصة المسارات التعليمية</p>
          <div class="footer-bottom-links">
            <a href="#" class="footer-bottom-link">الخصوصية</a>
            <a href="#" class="footer-bottom-link">الشروط</a>
            <a href="#" class="footer-bottom-link">اتصل بنا</a>
          </div>
          <div class="footer-social">
            <a href="#" class="social-icon" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
            <a href="#" class="social-icon" aria-label="X"><i class="bi bi-twitter-x"></i></a>
            <a href="#" class="social-icon" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
            <a href="#" class="social-icon" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
            <a href="#" class="social-icon" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
          </div>
        </div>
      </div>
    </div>
  </footer>
