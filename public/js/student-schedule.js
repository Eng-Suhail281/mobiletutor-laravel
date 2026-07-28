(function () {
  var data = window.SD_SCHEDULE;
  if (!data) return;

  var activeDay = data.defaultDay || 'mon';

  function renderDayPills() {
    var nav = document.getElementById('dayPills');
    if (!nav) return;

    nav.innerHTML = data.days.map(function (day) {
      var active = day.id === activeDay ? ' is-active' : '';
      return '<button type="button" class="sd-day-pill' + active + '" data-day="' + day.id + '">' + day.label + '</button>';
    }).join('');
  }

  function renderClasses() {
    var list = document.getElementById('classList');
    var titleEl = document.getElementById('scheduleDayTitle');
    var countEl = document.getElementById('scheduleClassCount');
    var nextEl = document.getElementById('scheduleNextClass');
    var dayMeta = data.days.find(function (d) { return d.id === activeDay; });
    var classes = data.classes[activeDay] || [];

    if (titleEl && dayMeta) titleEl.textContent = dayMeta.title;
    if (countEl) countEl.textContent = classes.length;
    if (nextEl) nextEl.textContent = dayMeta && dayMeta.next ? dayMeta.next : (classes.length ? classes[0].subject : '—');
    if (!list) return;

    if (!classes.length) {
      list.innerHTML = '<p class="sd-class-empty">لا توجد حصص في هذا اليوم.</p>';
      return;
    }

    list.innerHTML = classes.map(function (item) {
      return (
        '<article class="sd-class-row">' +
          '<div class="sd-class-info">' +
            '<div class="sd-class-subject">' +
              '<h4>' + item.subject + '</h4>' +
              '<p>' + item.teacher + '</p>' +
            '</div>' +
            '<div class="sd-class-divider" aria-hidden="true"></div>' +
            '<div class="sd-class-time">' +
              '<strong>' + item.time + ' ' + item.period + '</strong>' +
              '<span>مدة الحصة ' + item.duration + ' دقيقة</span>' +
            '</div>' +
          '</div>' +
          '<a href="#" class="sd-btn-primary sd-btn-join" data-subject="' + item.subject + '">' + item.btn + '</a>' +
        '</article>'
      );
    }).join('');
  }

  function initDayPills() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.sd-day-pill');
      if (!btn) return;
      activeDay = btn.getAttribute('data-day');
      document.querySelectorAll('.sd-day-pill').forEach(function (pill) {
        pill.classList.toggle('is-active', pill === btn);
      });
      renderClasses();
    });
  }

  renderDayPills();
  renderClasses();
  initDayPills();
})();
