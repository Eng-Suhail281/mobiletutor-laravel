(function () {
  'use strict';

  var AUTH_VISUAL_HERO_HTML =
    '<div class="auth-visual-side">' +
      '<img src="images/auth/login-hero.png" alt="" class="auth-visual-img">' +
      '<div class="auth-visual-content">' +
        '<div class="auth-visual-top">' +
          '<a href="index.html" class="auth-brand">Mobile Tutor</a>' +
        '</div>' +
        '<div class="auth-visual-bottom">' +
          '<div class="auth-visual-intro">' +
            '<h2>مرحبا بك في <span>Mobile Tutor</span></h2>' +
            '<p>منصة تعليمية متكاملة تجمع بين التعليم الأكاديمي<br>والجامعي والمهني والدعم النفسي</p>' +
          '</div>' +
          '<div class="auth-features">' +
            '<div class="auth-feature">' +
              '<span class="auth-feature-icon bi bi-book" aria-hidden="true"></span>' +
              '<strong>تعليم أكاديمي</strong>' +
              '<span class="auth-feature-desc">يمكنك الوصول الى الدروس<br>والمواد التعليمية بسهولة</span>' +
            '</div>' +
            '<div class="auth-feature">' +
              '<span class="auth-feature-icon bi bi-briefcase" aria-hidden="true"></span>' +
              '<strong>تدريب مهني</strong>' +
              '<span class="auth-feature-desc">تابع تقدمك وحقق أهدافك<br>خطوة بخطوة</span>' +
            '</div>' +
            '<div class="auth-feature">' +
              '<span class="auth-feature-icon bi bi-heart" aria-hidden="true"></span>' +
              '<strong>دعم نفسي</strong>' +
              '<span class="auth-feature-desc">جلسات دعم نفسي مع مختصين<br>لمساعدتك</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  document.querySelectorAll('[data-auth-visual-hero]').forEach(function (node) {
    node.outerHTML = AUTH_VISUAL_HERO_HTML;
  });
})();
