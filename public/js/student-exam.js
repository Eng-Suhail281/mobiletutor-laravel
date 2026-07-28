(function () {
  var params = new URLSearchParams(window.location.search);
  var examId = params.get('id') || 'math';
  var session = window.SD_EXAM_SESSION && window.SD_EXAM_SESSION[examId];

  if (!session) {
    session = window.SD_EXAM_SESSION.math;
  }

  var current = session.current || 1;
  var total = session.total;
  var answered = (session.answered && session.answered.slice()) || [];
  var answers = {};

  Object.keys(session.questions).forEach(function (key) {
    var q = session.questions[key];
    if (q.selected !== undefined && q.selected !== null) {
      answers[key] = q.selected;
    }
  });

  function getQuestion(num) {
    if (session.questions[num]) return session.questions[num];
    return {
      text: 'سؤال رقم ' + num + ' — محتوى تجريبي للمعاينة.',
      options: ['الخيار الأول', 'الخيار الثاني', 'الخيار الثالث', 'الخيار الرابع'],
      selected: answers[num] !== undefined ? answers[num] : null
    };
  }

  function updateLegend() {
    var answeredCount = answered.length;
    var pending = total - answeredCount;
    var elAnswered = document.getElementById('legendAnswered');
    var elCurrent = document.getElementById('legendCurrent');
    var elPending = document.getElementById('legendPending');
    if (elAnswered) elAnswered.textContent = answeredCount;
    if (elCurrent) elCurrent.textContent = current;
    if (elPending) elPending.textContent = pending;
  }

  function renderNav() {
    var grid = document.getElementById('examNavGrid');
    if (!grid) return;

    var html = '';
    for (var i = 1; i <= total; i++) {
      var cls = 'sd-exam-nav-btn';
      if (i === current) cls += ' is-current';
      else if (answered.indexOf(i) !== -1) cls += ' is-answered';
      else cls += ' is-pending';
      html += '<button type="button" class="' + cls + '" data-q="' + i + '">' + i + '</button>';
    }
    grid.innerHTML = html;
    updateLegend();
  }

  function updateNavButtons() {
    var prevBtn = document.getElementById('examPrev');
    var nextBtn = document.getElementById('examNext');
    if (prevBtn) prevBtn.disabled = current <= 1;
    if (nextBtn) nextBtn.disabled = current >= total;
  }

  function renderQuestion() {
    var q = getQuestion(current);
    var countEl = document.getElementById('examQuestionCount');
    var textEl = document.getElementById('examQuestionText');
    var optionsEl = document.getElementById('examOptions');

    if (countEl) countEl.textContent = 'السؤال ' + current + ' من ' + total;
    if (textEl) textEl.textContent = q.text;

    if (optionsEl) {
      var selected = answers[current] !== undefined ? answers[current] : q.selected;
      optionsEl.innerHTML = q.options.map(function (opt, idx) {
        var checked = selected === idx ? ' checked' : '';
        var active = selected === idx ? ' is-selected' : '';
        return (
          '<label class="sd-exam-option' + active + '">' +
            '<input type="radio" name="examAnswer" value="' + idx + '"' + checked + '>' +
            '<span class="sd-exam-option-text">' + opt + '</span>' +
          '</label>'
        );
      }).join('');
    }

    renderNav();
    updateNavButtons();
  }

  function saveAnswer() {
    var selected = document.querySelector('input[name="examAnswer"]:checked');
    if (!selected) return;

    var value = parseInt(selected.value, 10);
    answers[current] = value;
    if (answered.indexOf(current) === -1) {
      answered.push(current);
      answered.sort(function (a, b) { return a - b; });
    }
    renderNav();
  }

  function goTo(num) {
    if (num < 1 || num > total) return;
    current = num;
    renderQuestion();
  }

  function init() {
    var titleEl = document.getElementById('examTitle');
    if (titleEl) titleEl.textContent = session.title;

    renderQuestion();

    document.getElementById('examPrev').addEventListener('click', function () {
      goTo(current - 1);
    });

    document.getElementById('examNext').addEventListener('click', function () {
      goTo(current + 1);
    });

    document.getElementById('examSave').addEventListener('click', function () {
      saveAnswer();
      if (window.SDUI) SDUI.toast('تم حفظ إجابتك', 'success');
    });

    document.getElementById('examOptions').addEventListener('change', function (e) {
      if (e.target.name === 'examAnswer') {
        document.querySelectorAll('.sd-exam-option').forEach(function (el) {
          el.classList.remove('is-selected');
        });
        var label = e.target.closest('.sd-exam-option');
        if (label) label.classList.add('is-selected');
      }
    });

    document.getElementById('examNavGrid').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-q]');
      if (btn) goTo(parseInt(btn.getAttribute('data-q'), 10));
    });

    var finishBtn = document.getElementById('examFinish');
    if (finishBtn) {
      finishBtn.addEventListener('click', function () {
        if (window.SDUI) {
          SDUI.confirm({
            title: 'إنهاء الاختبار',
            message: 'هل أنت متأكد من تسليم إجاباتك؟ لن تتمكن من تعديلها بعد الإرسال.',
            confirmText: 'تسليم الآن',
            onConfirm: function () {
              SDUI.modal({
                title: 'تم تسليم الاختبار',
                body:
                  '<div class="sd-ui-result-score"><strong>88%</strong><span>نتيجتك الأولية</span></div>' +
                  '<p class="sd-ui-modal-text">أحسنت! ستظهر النتيجة النهائية في صفحة الاختبارات.</p>',
                actions: [
                  { label: 'العودة للاختبارات', primary: true, onClick: function () { window.location.href = 'student-exams.html'; }, close: false }
                ]
              });
            }
          });
        }
      });
    }
  }

  init();
})();
