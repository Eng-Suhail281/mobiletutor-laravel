(function () {
  var data = window.SD_EXAMS;
  if (!data) return;

  var STATUS = {
    new: { className: 'is-new' },
    tomorrow: { className: 'is-tomorrow' },
    today: { className: 'is-today' },
    done: { className: 'is-done' }
  };

  var activeFilter = 'all';
  var activeExamId = null;

  function filterItems() {
    var items = data.items;
    if (activeFilter === 'all') return items;
    if (activeFilter === 'done') return items.filter(function (i) { return i.status === 'done'; });
    if (activeFilter === 'soon') return items.filter(function (i) { return i.status === 'today' || i.status === 'tomorrow' || i.status === 'new'; });
    if (activeFilter === 'review') return items.filter(function (i) { return i.status !== 'done'; });
    return items;
  }

  function renderExams(items) {
    var grid = document.getElementById('examsGrid');
    if (!grid) return;

    grid.innerHTML = items.map(function (item) {
      var status = STATUS[item.status] || STATUS.new;
      var btnText = item.action === 'result' ? 'عرض النتيجة' : 'دخول الاختبار';
      var btnClass = item.action === 'result' ? 'sd-exam-btn is-result' : 'sd-exam-btn is-enter';

      return (
        '<article class="sd-exam-card" data-status="' + item.status + '" data-id="' + item.id + '">' +
          '<span class="sd-exam-badge ' + status.className + '">' + item.statusLabel + '</span>' +
          '<div class="sd-exam-card-head">' +
            '<h3>' + item.subject + '</h3>' +
            '<p class="sd-exam-grade">' + item.grade + '</p>' +
          '</div>' +
          '<p class="sd-exam-teacher">' + item.teacher + '</p>' +
          '<p class="sd-exam-datetime">' + item.datetime + '</p>' +
          (item.score ? '<p class="sd-exam-score">النتيجة: ' + item.score + '</p>' : '') +
          '<button type="button" class="sd-btn-primary ' + btnClass + '" data-exam-id="' + item.id + '">' + btnText + '</button>' +
        '</article>'
      );
    }).join('');
  }

  function openModal(examId) {
    var exam = null;
    for (var i = 0; i < data.items.length; i++) {
      if (data.items[i].id === examId) exam = data.items[i];
    }
    if (!exam || !exam.modal) return;

    activeExamId = examId;
    var modal = document.getElementById('examModal');
    var details = document.getElementById('examModalDetails');
    var m = exam.modal;

    if (details) {
      details.innerHTML =
        '<div><dt>نوع الاختبار</dt><dd>' + m.type + '</dd></div>' +
        '<div><dt>عدد الأسئلة</dt><dd>' + m.questions + ' سؤال</dd></div>' +
        '<div><dt>الزمن المحدد</dt><dd>' + m.duration + '</dd></div>' +
        '<div><dt>عدد المحاولات</dt><dd>' + m.attempts + '</dd></div>' +
        '<div><dt>النتيجة</dt><dd>' + m.result + '</dd></div>' +
        '<div><dt>ملاحظة</dt><dd>' + m.note + '</dd></div>';
    }

    if (modal) modal.hidden = false;
  }

  function closeModal() {
    var modal = document.getElementById('examModal');
    if (modal) modal.hidden = true;
    activeExamId = null;
  }

  function initFilters() {
    var pills = document.querySelectorAll('#examFilters .sd-filter-pill');
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) { p.classList.remove('is-active'); });
        pill.classList.add('is-active');
        activeFilter = pill.getAttribute('data-filter');
        renderExams(filterItems());
      });
    });
  }

  function initModal() {
    var startBtn = document.getElementById('examModalStart');
    if (startBtn) {
      startBtn.addEventListener('click', function () {
        if (activeExamId) {
          window.location.href = 'student-exam.html?id=' + activeExamId;
        }
      });
    }

    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-close-modal]')) closeModal();
      var btn = e.target.closest('.sd-exam-btn.is-enter');
      if (btn) {
        openModal(btn.getAttribute('data-exam-id'));
        return;
      }
      var resultBtn = e.target.closest('.sd-exam-btn.is-result');
      if (resultBtn) {
        var examId = resultBtn.getAttribute('data-exam-id');
        for (var j = 0; j < data.items.length; j++) {
          if (data.items[j].id === examId && data.items[j].score && window.SDUI) {
            SDUI.examResult(data.items[j]);
            break;
          }
        }
      }
    });
  }

  function initSearchSort() {
    var search = document.querySelector('.sd-exams-filter input[type="search"]');
    var sort = document.querySelector('.sd-exams-filter .sd-sort-select');

    function apply() {
      var cards = Array.from(document.querySelectorAll('#examsGrid .sd-exam-card'));
      var q = search ? search.value.trim().toLowerCase() : '';
      cards.forEach(function (card) {
        card.style.display = !q || card.textContent.toLowerCase().indexOf(q) !== -1 ? '' : 'none';
      });
      if (sort && cards.length) {
        var grid = document.getElementById('examsGrid');
        var sorted = cards.slice().sort(function (a, b) {
          var sa = a.querySelector('h3').textContent;
          var sb = b.querySelector('h3').textContent;
          if (sort.selectedIndex === 2) return sa.localeCompare(sb, 'ar');
          return 0;
        });
        sorted.forEach(function (el) { grid.appendChild(el); });
      }
    }

    if (search) search.addEventListener('input', apply);
    if (sort) sort.addEventListener('change', apply);
  }

  function initDeepLink() {
    var params = new URLSearchParams(window.location.search);
    var examId = params.get('id');
    if (!examId || params.get('view') !== 'result') return;

    var exam = null;
    for (var i = 0; i < data.items.length; i++) {
      if (data.items[i].id === examId) exam = data.items[i];
    }
    if (!exam || !exam.score) return;

    var card = document.querySelector('.sd-exam-card[data-id="' + examId + '"]');
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });

    if (window.SDUI && SDUI.examResult) {
      SDUI.examResult(exam);
    }
  }

  renderExams(data.items);
  initFilters();
  initModal();
  initSearchSort();
  initDeepLink();
})();
