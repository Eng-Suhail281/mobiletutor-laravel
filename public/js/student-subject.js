(function () {
  var STATUS = {
    done: { label: 'مكتملة', className: 'is-done' },
    progress: { label: 'قيد الدراسة', className: 'is-progress' },
    locked: { label: 'مقفلة', className: 'is-locked' }
  };

  function getSubjectId() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id') || 'math';
    return window.SD_SUBJECTS && window.SD_SUBJECTS[id] ? id : 'math';
  }

  function renderUnits(units) {
    var list = document.getElementById('unitsList');
    if (!list) return;

    var totalLessons = 0;
    list.innerHTML = units.map(function (unit) {
      totalLessons += unit.lessons;
      var status = STATUS[unit.status] || STATUS.progress;
      var lockedClass = unit.status === 'locked' ? ' is-locked' : '';
      var disabled = unit.status === 'locked' ? ' disabled' : '';

      var lessonsLabel = unit.status === 'done'
        ? unit.lessons + ' درس مكتمل'
        : unit.lessons + ' درس';

      return (
        '<article class="sd-unit-card' + lockedClass + '">' +
          '<div class="sd-unit-num">' + unit.num + '</div>' +
          '<div class="sd-unit-info">' +
            '<h3>' + unit.title + '</h3>' +
            '<div class="sd-unit-meta">' +
              '<span><i class="bi bi-journal-text"></i> ' + lessonsLabel + '</span>' +
              '<span><i class="bi bi-clock"></i> ' + unit.hours + ' ساعات</span>' +
            '</div>' +
          '</div>' +
          '<span class="sd-unit-badge ' + status.className + '">' + status.label + '</span>' +
          '<button type="button" class="sd-unit-toggle" aria-label="عرض الدروس"' + disabled + '>' +
            '<i class="bi bi-chevron-down"></i>' +
          '</button>' +
        '</article>'
      );
    }).join('');

    var meta = document.getElementById('unitsMeta');
    if (meta) {
      meta.textContent = units.length + ' وحدات • ' + totalLessons + ' درساً';
    }
  }

  function renderFiles(files) {
    var grid = document.getElementById('filesGrid');
    if (!grid) return;

    grid.innerHTML = files.map(function (file) {
      return (
        '<article class="sd-file-card">' +
          '<div class="sd-file-icon"><i class="bi ' + file.icon + '"></i></div>' +
          '<h4>' + file.title + '</h4>' +
          '<p>' + file.meta + '</p>' +
          '<div class="sd-file-actions">' +
            '<a href="#" class="sd-btn-outline sd-btn-file-outline">عرض</a>' +
            '<a href="#" class="sd-btn-primary sd-btn-file">تحميل</a>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  function renderAttention(items) {
    var grid = document.getElementById('attentionGrid');
    if (!grid) return;

    grid.innerHTML = items.map(function (item, idx) {
      var href = '#';
      if (item.btn === 'ابدأ المراجعة') href = 'student-exams.html';
      else if (item.btn === 'فتح الواجب') href = 'student-assignment.html?id=' + (getSubjectId());
      else if (item.btn === 'احجز مكانك') href = 'student-schedule.html';
      return (
        '<article class="sd-attention-card">' +
          '<div class="sd-attention-top">' +
            '<div class="sd-attention-icon-wrap" aria-hidden="true">' +
              '<i class="bi ' + item.icon + '"></i>' +
            '</div>' +
            '<div class="sd-attention-content">' +
              '<h4>' + item.title + '</h4>' +
              '<p>' + item.text + '</p>' +
            '</div>' +
          '</div>' +
          '<a href="' + href + '" class="sd-btn-primary">' + item.btn + '</a>' +
        '</article>'
      );
    }).join('');
  }

  function loadSubject() {
    var id = getSubjectId();
    var subject = window.SD_SUBJECTS[id];
    if (!subject) return;

    document.title = subject.title + ' — Mobile Tutor';

    var heroBg = document.querySelector('.sd-subject-hero-bg');
    if (heroBg) {
      heroBg.style.backgroundImage = "url('" + subject.image + "')";
    }

    var titleEl = document.getElementById('subjectTitle');
    if (titleEl) titleEl.textContent = subject.title;

    var teacherImg = document.getElementById('subjectTeacherImg');
    var teacherName = document.getElementById('subjectTeacherName');
    if (teacherImg) {
      teacherImg.src = subject.teacher.avatar;
      teacherImg.alt = subject.teacher.name;
    }
    if (teacherName) teacherName.textContent = subject.teacher.name;

    var pct = subject.progress + '%';
    var statLessons = document.getElementById('statLessons');
    var statExam = document.getElementById('statExam');
    var statProgress = document.getElementById('statProgress');
    var subjectProgressPct = document.getElementById('subjectProgressPct');
    var subjectProgressBar = document.getElementById('subjectProgressBar');

    if (statLessons) statLessons.textContent = subject.completedLessons;
    if (statExam) statExam.textContent = subject.examIn;
    if (statProgress) statProgress.textContent = pct;
    if (subjectProgressPct) subjectProgressPct.textContent = pct;
    if (subjectProgressBar) subjectProgressBar.style.width = pct;

    var c = subject.continue;
    var continueThumb = document.getElementById('continueThumb');
    if (continueThumb) {
      continueThumb.src = c.thumb;
      continueThumb.alt = c.title;
    }

    var continueLabel = document.getElementById('continueLabel');
    var continueTitle = document.getElementById('continueTitle');
    var continueLesson = document.getElementById('continueLesson');
    var continueActivity = document.getElementById('continueActivity');
    var continueDuration = document.getElementById('continueDuration');
    var continueProgressPct = document.getElementById('continueProgressPct');
    var continueProgressBar = document.getElementById('continueProgressBar');

    if (continueLabel) continueLabel.textContent = c.label;
    if (continueTitle) continueTitle.textContent = c.title;
    if (continueLesson) continueLesson.textContent = 'درس ' + c.lesson;
    if (continueActivity) continueActivity.textContent = c.activity;
    if (continueDuration) continueDuration.textContent = c.duration;
    if (continueProgressPct) continueProgressPct.textContent = pct;
    if (continueProgressBar) continueProgressBar.style.width = pct;

    renderUnits(subject.units);
    renderFiles(subject.files);
    renderAttention(subject.attention);

    var lessonUrl = 'student-lesson.html?id=' + id;
    var continueBtn = document.querySelector('.sd-btn-continue');
    var subjectBtn = document.querySelector('.sd-btn-subject');
    if (continueBtn) continueBtn.href = lessonUrl;
    if (subjectBtn) subjectBtn.href = lessonUrl;

    var planBtn = document.querySelector('.sd-btn-subject-outline');
    if (planBtn) planBtn.href = 'student-subject.html?id=' + id + '#unitsList';

    document.querySelectorAll('.sd-section-head a[href="#"]').forEach(function (link) {
      link.href = 'student-subject.html?id=' + id;
    });
  }

  function initTabs() {
    var tabs = document.querySelectorAll('.sd-subject-tab');
    var id = getSubjectId();
    var tabLinks = {
      lessons: null,
      assignments: 'student-assignments.html',
      exams: 'student-exams.html',
      files: null,
      discussions: 'student-messages.html'
    };
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var key = tab.getAttribute('data-tab');
        if (tabLinks[key]) {
          window.location.href = tabLinks[key];
          return;
        }
        tabs.forEach(function (t) { t.classList.remove('is-active'); });
        tab.classList.add('is-active');
        if (key === 'files') {
          var files = document.getElementById('filesGrid');
          if (files) files.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function initUnitToggles() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.sd-unit-toggle:not([disabled])');
      if (!btn) return;
      var card = btn.closest('.sd-unit-card');
      if (card) card.classList.toggle('is-open');
    });
  }

  loadSubject();
  initTabs();
  initUnitToggles();
})();
