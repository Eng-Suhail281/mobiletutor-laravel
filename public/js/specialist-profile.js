document.addEventListener('DOMContentLoaded', function () {
  var tabs = document.querySelectorAll('#profileTabs .nav-link');
  var panels = document.querySelectorAll('.sp-tab-panel');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.getAttribute('data-tab');
      tabs.forEach(function (t) { t.classList.remove('active'); });
      panels.forEach(function (p) { p.classList.remove('active'); });
      tab.classList.add('active');
      var panel = document.getElementById('panel-' + target);
      if (panel) panel.classList.add('active');
    });
  });

  document.querySelectorAll('.sp-session-option').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.sp-session-option').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
    });
  });

  document.querySelectorAll('.sp-duration-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.sp-duration-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
    });
  });

  document.querySelectorAll('.sp-time-slot').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.sp-time-slot').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
    });
  });

  var calDays = document.getElementById('calDays');
  var calMonth = document.getElementById('calMonth');
  var calYear = document.getElementById('calYear');
  var timesLabel = document.getElementById('timesLabel');
  var selectedDay = 15;

  function renderCalendar() {
    if (!calDays || !calMonth) return;

    var month = parseInt(calMonth.value, 10);
    var year = parseInt(calYear.value, 10);
    var firstDay = new Date(year, month - 1, 1).getDay();
    var daysInMonth = new Date(year, month, 0).getDate();
    var monthLabel = calMonth.options[calMonth.selectedIndex].text;

    calDays.innerHTML = '';

    for (var i = 0; i < firstDay; i++) {
      var empty = document.createElement('span');
      empty.className = 'sp-cal-day is-muted';
      empty.setAttribute('aria-hidden', 'true');
      calDays.appendChild(empty);
    }

    for (var day = 1; day <= daysInMonth; day++) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sp-cal-day';
      btn.textContent = day;

      if (day === selectedDay) {
        btn.classList.add('is-selected');
      } else if (day % 3 !== 0) {
        btn.classList.add('is-available');
      } else {
        btn.disabled = true;
        btn.classList.add('is-muted');
      }

      btn.addEventListener('click', function (d) {
        return function () {
          selectedDay = d;
          renderCalendar();
        };
      }(day));

      calDays.appendChild(btn);
    }

    if (timesLabel) {
      timesLabel.textContent = 'الأوقات المتاحة في ' + selectedDay + ' ' + monthLabel;
    }
  }

  if (calMonth) {
    calMonth.addEventListener('change', function () {
      selectedDay = 1;
      renderCalendar();
    });
  }

  renderCalendar();
});
