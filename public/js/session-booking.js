document.addEventListener('DOMContentLoaded', function () {
  var EMPTY = 'لم يتم الاختيار بعد';

  var state = {
    step: 1,
    session: 'individual',
    sessionLabel: '',
    price: 20,
    dateLabel: EMPTY,
    timeLabel: EMPTY,
    duration: 60,
    durationLabel: '60 دقيقة'
  };

  var steps = document.querySelectorAll('.sb-step');
  var stepLabels = document.querySelectorAll('.sb-stepper-labels small');
  var stepperRail = document.querySelector('.sb-stepper-rail');
  var panels = document.querySelectorAll('.sb-step-panel');
  var sessionCards = document.querySelectorAll('.sb-session-card');
  var durationBtns = document.querySelectorAll('.sb-duration-btn');
  var timeSlots = document.querySelectorAll('.sb-time-slot');
  var calDays = document.getElementById('calDays');
  var calMonth = document.getElementById('calMonth');
  var calYear = document.getElementById('calYear');
  var timesLabel = document.getElementById('timesLabel');
  var successModal = document.getElementById('successModal');
  var selectedDay = 15;

  function setSummaryValue(id, value, isEmpty) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = value;
    el.classList.toggle('is-empty', !!isEmpty);
  }

  function updateSummary() {
    var typeEmpty = !state.sessionLabel || state.sessionLabel === EMPTY;
    var dateEmpty = state.dateLabel === EMPTY;
    var timeEmpty = state.timeLabel === EMPTY;

    setSummaryValue('summaryType', typeEmpty ? EMPTY : state.sessionLabel, typeEmpty);
    setSummaryValue('summaryDate', state.dateLabel, dateEmpty);
    setSummaryValue('summaryTime', state.timeLabel, timeEmpty);
    setSummaryValue('summaryDuration', state.durationLabel, false);
    setSummaryValue('summaryPrice', state.price + ' $', false);

    setText('confirmType', typeEmpty ? EMPTY : state.sessionLabel);
    setText('confirmDate', state.dateLabel);
    setText('confirmTime', state.timeLabel);
    setText('confirmDuration', state.durationLabel);
    setText('confirmPrice', state.price + ' $');

    setText('modalType', typeEmpty ? EMPTY : state.sessionLabel);
    setText('modalDate', dateEmpty ? EMPTY : state.dateLabel);
    setText('modalTime', timeEmpty ? EMPTY : state.timeLabel);
    setText('modalDuration', state.durationLabel);
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function goToStep(step) {
    state.step = step;

    steps.forEach(function (stepEl) {
      var num = parseInt(stepEl.getAttribute('data-step'), 10);
      stepEl.classList.remove('is-active', 'is-done');
      if (num < step) stepEl.classList.add('is-done');
      if (num === step) stepEl.classList.add('is-active');
    });

    stepLabels.forEach(function (label, index) {
      label.classList.toggle('is-active', index + 1 === step);
    });

    if (stepperRail) {
      stepperRail.className = 'sb-stepper-rail is-progress-' + step;
      var progress = step <= 1 ? 0 : ((step - 1) / 3) * 100;
      stepperRail.style.setProperty('--sb-progress', progress + '%');
    }

    panels.forEach(function (panel) {
      panel.classList.toggle('active', parseInt(panel.getAttribute('data-panel'), 10) === step);
    });
  }

  sessionCards.forEach(function (card) {
    card.addEventListener('click', function () {
      sessionCards.forEach(function (c) { c.classList.remove('active'); });
      card.classList.add('active');
      state.session = card.getAttribute('data-session');
      state.price = parseInt(card.getAttribute('data-price'), 10);
      state.sessionLabel = state.session === 'individual' ? 'جلسة فردية' : 'جلسة جماعية';
      updateSummary();
    });
  });

  durationBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      durationBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      state.duration = parseInt(btn.getAttribute('data-duration'), 10);
      state.durationLabel = state.duration + ' دقيقة';
      updateSummary();
    });
  });

  timeSlots.forEach(function (slot) {
    slot.addEventListener('click', function () {
      timeSlots.forEach(function (s) { s.classList.remove('active'); });
      slot.classList.add('active');
      state.timeLabel = slot.textContent.trim();
      updateSummary();
    });
  });

  document.querySelectorAll('.sb-next-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var nextStep = parseInt(btn.getAttribute('data-next'), 10);
      if (state.step === 1 && !state.sessionLabel) {
        var activeCard = document.querySelector('.sb-session-card.active');
        if (activeCard) {
          state.session = activeCard.getAttribute('data-session');
          state.price = parseInt(activeCard.getAttribute('data-price'), 10);
          state.sessionLabel = state.session === 'individual' ? 'جلسة فردية' : 'جلسة جماعية';
          updateSummary();
        }
      }
      goToStep(nextStep);
    });
  });

  document.querySelectorAll('.sb-back-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      goToStep(parseInt(btn.getAttribute('data-back'), 10));
    });
  });

  var confirmBtn = document.getElementById('confirmBookingBtn');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', function () {
      updateSummary();
      if (successModal) {
        successModal.classList.add('is-open');
        successModal.setAttribute('aria-hidden', 'false');
      }
    });
  }

  var closeModalBtn = document.getElementById('closeSuccessModal');
  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', function () {
      successModal.classList.remove('is-open');
      successModal.setAttribute('aria-hidden', 'true');
    });

    successModal.querySelector('.sb-modal-backdrop').addEventListener('click', function () {
      successModal.classList.remove('is-open');
      successModal.setAttribute('aria-hidden', 'true');
    });
  }

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
      empty.className = 'sb-cal-day is-muted';
      empty.setAttribute('aria-hidden', 'true');
      calDays.appendChild(empty);
    }

    for (var day = 1; day <= daysInMonth; day++) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sb-cal-day';
      btn.textContent = day;

      if (day === selectedDay) {
        btn.classList.add('is-selected');
      } else if (day % 3 !== 0) {
        btn.classList.add('is-available');
      } else {
        btn.disabled = true;
        btn.classList.add('is-muted');
      }

      btn.addEventListener('click', function (d, mLabel, y) {
        return function () {
          selectedDay = d;
          state.dateLabel = d + ' ' + mLabel + ' ' + y;
          updateSummary();
          renderCalendar();
        };
      }(day, monthLabel, year));

      calDays.appendChild(btn);
    }

    if (timesLabel) {
      timesLabel.textContent = 'الأوقات المتاحة في ' + selectedDay + ' ' + monthLabel;
    }
  }

  if (calMonth) {
    calMonth.addEventListener('change', function () {
      selectedDay = 1;
      state.dateLabel = EMPTY;
      renderCalendar();
      updateSummary();
    });
  }

  var activeSlot = document.querySelector('.sb-time-slot.active');
  if (activeSlot) {
    activeSlot.classList.remove('active');
  }

  updateSummary();
  renderCalendar();
  goToStep(1);
});
