(function () {
  if (!document.querySelector('.sd-continue-section')) return;

  var ui = window.SDUI || {};

  document.querySelectorAll('.sd-btn-hero, .sd-btn-continue').forEach(function (el) {
    el.href = 'student-lesson.html?id=math';
  });

  var courseLinks = [
    { sel: '.sd-courses-section .sd-courses-grid .sd-course-card:nth-child(1) .sd-btn-course', id: 'physics' },
    { sel: '.sd-courses-section .sd-courses-grid .sd-course-card:nth-child(2) .sd-btn-course', id: 'math' },
    { sel: '.sd-courses-section .sd-courses-grid .sd-course-card:nth-child(3) .sd-btn-course', id: 'arabic' },
    { sel: '.sd-suggested-section .sd-course-card:nth-child(1) .sd-btn-course', id: 'english' },
    { sel: '.sd-suggested-section .sd-course-card:nth-child(2) .sd-btn-course', id: 'chemistry' },
    { sel: '.sd-suggested-section .sd-course-card:nth-child(3) .sd-btn-course', id: 'islamic' }
  ];

  courseLinks.forEach(function (item) {
    var btn = document.querySelector(item.sel);
    if (btn) btn.href = 'student-lesson.html?id=' + item.id;
  });

  document.querySelectorAll('.sd-courses-section .sd-course-card, .sd-suggested-section .sd-course-card').forEach(function (card) {
    var btn = card.querySelector('.sd-btn-course');
    if (!btn) return;
    card.addEventListener('click', function (e) {
      if (e.target.closest('.sd-btn-course')) return;
      var href = btn.getAttribute('href');
      if (href && href !== '#') window.location.href = href;
    });
  });

  var searchInput = document.querySelector('.sd-courses-search input');
  var cards = Array.from(document.querySelectorAll('.sd-courses-section .sd-courses-grid .sd-course-card'));
  if (searchInput && cards.length) {
    searchInput.addEventListener('input', function () {
      var q = searchInput.value.trim().toLowerCase();
      cards.forEach(function (card) {
        card.style.display = !q || card.textContent.toLowerCase().indexOf(q) !== -1 ? '' : 'none';
      });
    });
  }

  document.querySelectorAll('.sd-schedule-row').forEach(function (row, index) {
    var btn = row.querySelector('.sd-status-pill');
    var title = row.querySelector('h4');
    if (!btn || !title) return;
    btn.addEventListener('click', function () {
      if (index === 0 && ui.joinSession) ui.joinSession(title.textContent);
      else if (index === 1 && ui.bookSlot) ui.bookSlot(title.textContent);
      else if (index === 2) window.location.href = 'student-session-booking.html';
      else if (ui.setReminder) ui.setReminder(title.textContent);
    });
  });

  document.querySelectorAll('.sd-promo-mini').forEach(function (el, i) {
    var tips = [
      { title: 'تمارين التنفس', text: 'خذ نفساً عميقاً لمدة 4 ثوانٍ، احبس 4، ثم ازفر لمدة 6. كرّر 5 مرات.' },
      { title: 'نصائح اليوم', text: 'قسّم مذاكرتك إلى جلسات 25 دقيقة مع استراحة 5 دقائق. راجع ملخصاتك قبل النوم.' },
      { title: 'موسيقى للتركيز', text: 'جرب الموسيقى الهادئة بدون كلمات أثناء حل الواجبات لتحسين التركيز.' }
    ];
    var tip = tips[i];
    if (!tip) return;
    el.style.cursor = 'pointer';
    el.addEventListener('click', function () {
      if (!ui.modal) return;
      ui.modal({
        title: tip.title,
        body: '<p class="sd-ui-modal-text">' + tip.text + '</p>',
        actions: [
          { label: 'اذهب للدعم النفسي', primary: true, onClick: function () { window.location.href = 'student-support.html'; } },
          { label: 'إغلاق' }
        ]
      });
    });
  });
})();
