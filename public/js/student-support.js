(function () {
  var data = window.SD_SUPPORT;
  if (!data) return;

  var moodTips = {
    good: { title: 'رائع!', text: 'استمر على هذا النحو. جرّب مراجعة خفيفة اليوم للحفاظ على زخمك.' },
    ok: { title: 'يوم عادي', text: 'خذ استراحة قصيرة 10 دقائق، اشرب ماء، وعد بانتعاش.' },
    tired: { title: 'نفهم تعبك', text: 'ننصح بنوم مبكر الليلة وجلسة دعم قصيرة مع مختص إن استمر التعب.' },
    stressed: { title: 'نحن معك', text: 'جرّب تمرين التنفس 4-4-6 أو احجز جلسة دعم — أنت لست وحدك.' }
  };

  function renderUpcoming() {
    var session = data.upcomingSession;
    var card = document.querySelector('.sd-support-upcoming-card');
    if (!card || !session) return;

    card.innerHTML =
      '<div class="sd-support-upcoming-icon"><i class="bi bi-calendar-check"></i></div>' +
      '<div>' +
        '<span class="sd-support-upcoming-label">جلستك القادمة</span>' +
        '<h3>' + session.title + '</h3>' +
        '<p>' + session.date + ' — ' + session.time + ' · ' + session.type + ' · ' + session.duration + '</p>' +
      '</div>' +
      '<a href="student-support-session.html" class="sd-btn-outline">تفاصيل الجلسة</a>';
  }

  function renderSpecialists() {
    var grid = document.getElementById('supportSpecialists');
    if (!grid) return;

    grid.innerHTML = data.specialists.map(function (s) {
      return (
        '<article class="sd-support-spec-card">' +
          '<img src="' + s.avatar + '" alt="' + s.name + '" class="sd-support-spec-avatar">' +
          '<div class="sd-support-spec-body">' +
            '<span class="sd-support-spec-status' + (s.available ? ' is-online' : '') + '">' +
              (s.available ? 'متاح الآن' : 'غير متاح') +
            '</span>' +
            '<h3>' + s.name + '</h3>' +
            '<p class="sd-support-spec-title">' + s.title + '</p>' +
            '<p class="sd-support-spec-specialty">' + s.specialty + '</p>' +
            '<div class="sd-support-spec-meta">' +
              '<span><i class="bi bi-star-fill"></i> ' + s.rating + '</span>' +
              '<span><i class="bi bi-camera-video"></i> ' + s.sessions + ' جلسة</span>' +
            '</div>' +
            '<a href="student-session-booking.html" class="sd-btn-primary sd-support-spec-btn">' +
              (s.available ? 'احجز جلسة' : 'عرض المواعيد') +
            '</a>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  function renderTips() {
    var grid = document.getElementById('supportTips');
    if (!grid) return;

    grid.innerHTML = data.tips.map(function (t, i) {
      return (
        '<article class="sd-support-tip-card" data-tip="' + i + '">' +
          '<span class="sd-support-tip-icon"><i class="bi bi-' + t.icon + '"></i></span>' +
          '<h4>' + t.title + '</h4>' +
          '<p>' + t.desc + '</p>' +
        '</article>'
      );
    }).join('');
  }

  function initMood() {
    var moodGroup = document.getElementById('supportMood');
    if (!moodGroup) return;

    moodGroup.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-mood]');
      if (!btn) return;
      moodGroup.querySelectorAll('.sd-support-mood-btn').forEach(function (el) {
        el.classList.remove('is-active');
      });
      btn.classList.add('is-active');
      var tip = moodTips[btn.getAttribute('data-mood')];
      if (tip && window.SDUI) {
        SDUI.modal({
          title: tip.title,
          body: '<p class="sd-ui-modal-text">' + tip.text + '</p>',
          actions: [
            { label: 'احجز جلسة دعم', primary: true, onClick: function () { window.location.href = 'student-session-booking.html'; } },
            { label: 'حسناً' }
          ]
        });
      }
    });
  }

  function initTips() {
    document.addEventListener('click', function (e) {
      var card = e.target.closest('.sd-support-tip-card');
      if (!card || !window.SDUI) return;
      var idx = parseInt(card.getAttribute('data-tip'), 10);
      var tip = data.tips[idx];
      if (!tip) return;
      SDUI.modal({
        title: tip.title,
        body: '<p class="sd-ui-modal-text">' + tip.desc + '</p><p class="sd-ui-modal-meta">نصيحة من فريق الدعم النفسي في Mobile Tutor</p>',
        actions: [{ label: 'شكراً', primary: true }]
      });
    });
  }

  renderUpcoming();
  renderSpecialists();
  renderTips();
  initMood();
  initTips();
})();
