(function () {
  function getSubjectId() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id') || 'math';
    return window.SD_SUBJECTS && window.SD_SUBJECTS[id] ? id : 'math';
  }

  function renderPoints(points) {
    var container = document.getElementById('lessonPoints');
    if (!container) return;

    container.innerHTML = points.map(function (point) {
      return (
        '<article class="sd-lesson-point">' +
          '<span class="sd-lesson-point-num">' + point.num + '</span>' +
          '<div class="sd-lesson-point-body">' +
            '<h4>' + point.title + '</h4>' +
            '<p>' + point.text + '</p>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  function renderFiles(files) {
    var list = document.getElementById('lessonFilesList');
    if (!list) return;

    list.innerHTML = files.map(function (file) {
      return (
        '<article class="sd-lesson-file-row">' +
          '<div class="sd-lesson-file-info">' +
            '<div class="sd-lesson-file-icon"><i class="bi ' + file.icon + '"></i></div>' +
            '<div class="sd-lesson-file-text">' +
              '<h4>' + file.title + '</h4>' +
              '<p>' + file.meta + '</p>' +
            '</div>' +
          '</div>' +
          '<div class="sd-lesson-file-actions">' +
            '<a href="#" class="sd-lesson-file-btn sd-lesson-file-btn-outline">عرض</a>' +
            '<a href="#" class="sd-lesson-file-btn sd-lesson-file-btn-download">تحميل</a>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  function renderQuiz(quiz) {
    var badge = document.getElementById('quizBadge');
    var question = document.getElementById('quizQuestion');
    var options = document.getElementById('quizOptions');

    if (badge) badge.textContent = 'سؤال ' + quiz.current + '/' + quiz.total;
    if (question) question.textContent = quiz.question;
    if (!options) return;

    options.innerHTML = quiz.options.map(function (opt, i) {
      return (
        '<label class="sd-lesson-quiz-option">' +
          '<input type="radio" name="lessonQuiz" value="' + i + '">' +
          '<span class="sd-lesson-quiz-radio" aria-hidden="true"></span>' +
          '<span class="sd-lesson-quiz-label">' + opt + '</span>' +
        '</label>'
      );
    }).join('');
  }

  function unitIcon(status) {
    if (status === 'done') return '<i class="bi bi-check-circle-fill sd-lesson-unit-icon is-done"></i>';
    if (status === 'locked') return '<i class="bi bi-lock-fill sd-lesson-unit-icon is-locked"></i>';
    return '<i class="bi bi-chevron-down sd-lesson-unit-icon is-active"></i>';
  }

  function renderUnits(units) {
    var container = document.getElementById('lessonUnits');
    if (!container) return;

    container.innerHTML = units.map(function (unit) {
      var expandedClass = unit.expanded ? ' is-expanded' : '';
      var statusClass = unit.status ? ' is-' + unit.status : '';
      var lessonsHtml = '';

      if (unit.lessons && unit.lessons.length) {
        lessonsHtml = '<ul class="sd-lesson-lessons">' + unit.lessons.map(function (lesson) {
          var lessonClass = lesson.status === 'active' ? ' is-active' : '';
          var check = lesson.status === 'done' ? '<i class="bi bi-check2"></i>' : '';
          return (
            '<li class="sd-lesson-lesson' + lessonClass + '">' +
              check +
              '<span>الدرس ' + lesson.num + ' — ' + lesson.title + '</span>' +
            '</li>'
          );
        }).join('') + '</ul>';
      }

      return (
        '<div class="sd-lesson-unit' + statusClass + expandedClass + '">' +
          '<button type="button" class="sd-lesson-unit-toggle"' + (unit.status === 'locked' ? ' disabled' : '') + '>' +
            unitIcon(unit.status) +
            '<span>' + unit.title + '</span>' +
          '</button>' +
          lessonsHtml +
        '</div>'
      );
    }).join('');
  }

  var quizCorrect = 1;

  function loadLesson() {
    var id = getSubjectId();
    var subject = window.SD_SUBJECTS[id];
    var lesson = window.SD_LESSONS[id];
    if (!subject || !lesson) return;

    document.title = lesson.title + ' — ' + subject.title + ' — Mobile Tutor';

    var heroBg = document.querySelector('.sd-lesson-hero-bg');
    if (heroBg) heroBg.style.backgroundImage = "url('" + subject.image + "')";

    var mediaImg = document.getElementById('lessonMediaImg');
    if (mediaImg) {
      mediaImg.src = subject.image;
      mediaImg.alt = lesson.title;
    }

    var badge = document.getElementById('lessonSubjectBadge');
    if (badge) badge.textContent = subject.title;

    var titleEl = document.getElementById('lessonTitle');
    if (titleEl) titleEl.textContent = lesson.title;

    var subtitle = document.getElementById('lessonSubtitle');
    if (subtitle) subtitle.textContent = lesson.subtitle;

    var desc = document.getElementById('lessonDesc');
    if (desc) desc.textContent = lesson.desc;

    var progress = document.getElementById('lessonProgress');
    if (progress) progress.textContent = 'درس ' + lesson.lessonProgress;

    var activity = document.getElementById('lessonActivity');
    if (activity) activity.textContent = lesson.activity;

    var duration = document.getElementById('lessonDuration');
    if (duration) duration.textContent = lesson.duration;

    var pct = subject.progress + '%';
    var progressPct = document.getElementById('lessonProgressPct');
    var progressBar = document.getElementById('lessonProgressBar');
    var sidebarPct = document.getElementById('sidebarProgressPct');
    var sidebarBar = document.getElementById('sidebarProgressBar');

    if (progressPct) progressPct.textContent = pct;
    if (progressBar) progressBar.style.width = pct;
    if (sidebarPct) sidebarPct.textContent = pct;
    if (sidebarBar) sidebarBar.style.width = pct;

    var planBtn = document.getElementById('lessonPlanBtn');
    if (planBtn) planBtn.href = 'student-subject.html?id=' + id;

    var primaryBtn = document.querySelector('.sd-btn-lesson-primary');
    if (primaryBtn) {
      primaryBtn.href = '#lessonMediaImg';
      primaryBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var media = document.getElementById('lessonMediaImg');
        if (media) media.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (window.SDUI) SDUI.toast('تابع مشاهدة الدرس من هنا', 'info');
      });
    }

    renderPoints(lesson.points);
    renderFiles(lesson.files);
    renderQuiz(lesson.quiz);
    quizCorrect = lesson.quiz.correct !== undefined ? lesson.quiz.correct : 1;
    renderUnits(lesson.units);
  }

  function initTabs() {
    var tabs = document.querySelectorAll('.sd-lesson-tab');
    var panels = document.querySelectorAll('.sd-lesson-tab-panel');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-tab');

        tabs.forEach(function (t) { t.classList.remove('is-active'); });
        tab.classList.add('is-active');

        panels.forEach(function (panel) {
          var isTarget = panel.id === 'panel-' + target;
          panel.classList.toggle('is-active', isTarget);
          panel.hidden = !isTarget;
        });
      });
    });
  }

  function initUnitToggles() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.sd-lesson-unit-toggle:not([disabled])');
      if (!btn) return;
      var unit = btn.closest('.sd-lesson-unit');
      if (unit) unit.classList.toggle('is-expanded');
    });
  }

  function initNotesSave() {
    var btn = document.querySelector('.sd-lesson-notes-save');
    var textarea = document.getElementById('lessonNotes');
    if (!btn || !textarea) return;

    var id = getSubjectId();
    var key = 'sd-notes-' + id;
    var saved = localStorage.getItem(key);
    if (saved) textarea.value = saved;

    btn.addEventListener('click', function () {
      localStorage.setItem(key, textarea.value);
      if (window.SDUI) SDUI.toast('تم حفظ ملاحظاتك', 'success');
      btn.textContent = 'تم الحفظ ✓';
      setTimeout(function () { btn.textContent = 'حفظ الملاحظات'; }, 2000);
    });
  }

  function initQuiz() {
    var btn = document.querySelector('.sd-lesson-quiz-submit');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var selected = document.querySelector('input[name="lessonQuiz"]:checked');
      if (!selected) {
        if (window.SDUI) SDUI.toast('اختر إجابة أولاً', 'info');
        return;
      }
      var ok = selected.value === String(quizCorrect);
      if (window.SDUI) {
        SDUI.modal({
          title: ok ? 'إجابة صحيحة!' : 'حاول مرة أخرى',
          body: '<p class="sd-ui-modal-text">' + (ok ? 'أحسنت! إجابتك صحيحة.' : 'راجع خطوات الحل في شرح الدرس ثم أعد المحاولة.') + '</p>',
          actions: [{ label: 'متابعة', primary: true }]
        });
      }
    });
  }

  function initCurriculumNav() {
    document.addEventListener('click', function (e) {
      var lesson = e.target.closest('.sd-lesson-lesson:not(.is-locked)');
      if (!lesson || lesson.classList.contains('is-active')) return;
      if (window.SDUI) SDUI.toast('انتقلت إلى: ' + lesson.textContent.trim(), 'info');
      document.querySelectorAll('.sd-lesson-lesson').forEach(function (el) { el.classList.remove('is-active'); });
      lesson.classList.add('is-active');
    });
  }

  loadLesson();
  initTabs();
  initUnitToggles();
  initNotesSave();
  initQuiz();
  initCurriculumNav();
})();
