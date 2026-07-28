(function () {
  var rows = document.querySelectorAll('#tdStudentsList .td-student-row');
  var studentDrawerBody = document.getElementById('tdStudentDrawerBody');
  var studentPanel = document.getElementById('tdStudentPanel');
  var studentsSearch = document.getElementById('tdStudentsPageSearch');

  if (!rows.length) return;

  var courseStudents = {
    ahmed: {
      name: 'أحمد الخالدي',
      role: 'طالب في المستوى المتقدم',
      img: 'images/shared/avatars/ahmed.jpg',
      test: '95%',
      assignments: '12 / 15',
      items: [
        { title: 'تحليل نص شعري', time: 'منذ يومين', score: '8/10' },
        { title: 'قواعد النحو العربي', time: 'منذ 5 أيام', score: '10/10' }
      ]
    },
    sara: {
      name: 'سارة العتيبي',
      role: 'طالب في المستوى المتقدم',
      img: 'images/shared/avatars/sara.jpg',
      test: '88%',
      assignments: '11 / 15',
      items: [
        { title: 'إنشاء وصفي', time: 'منذ يوم', score: '7/10' },
        { title: 'تحليل نص أدبي', time: 'منذ 4 أيام', score: '9/10' }
      ]
    },
    yusuf: {
      name: 'يوسف حداد',
      role: 'طالب في المستوى المتقدم',
      img: 'images/shared/avatars/mohammad.jpg',
      test: '62%',
      assignments: '6 / 15',
      items: [
        { title: 'واجب البلاغة', time: 'منذ 3 أيام', score: '5/10' }
      ]
    },
    noura: {
      name: 'نورة محمد',
      role: 'طالب في المستوى المتقدم',
      img: 'images/shared/avatars/sara.jpg',
      test: '100%',
      assignments: '15 / 15',
      items: [
        { title: 'الامتحان النهائي', time: 'منذ أسبوع', score: '10/10' },
        { title: 'مشروع النقد الأدبي', time: 'منذ أسبوعين', score: '10/10' }
      ]
    }
  };

  function uiToast(msg, type) {
    if (window.SDUI && SDUI.toast) SDUI.toast(msg, type || 'info');
  }

  function setBodyScrollLock(locked) {
    document.body.style.overflow = locked ? 'hidden' : '';
  }

  function closeStudentPanel() {
    if (studentPanel) studentPanel.hidden = true;
    rows.forEach(function (row) {
      row.classList.remove('is-selected');
    });
    setBodyScrollLock(false);
  }

  document.querySelectorAll('[data-td-close-student-panel]').forEach(function (btn) {
    btn.addEventListener('click', closeStudentPanel);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    if (studentPanel && !studentPanel.hidden) closeStudentPanel();
  });

  function renderStudentDrawer(id) {
    var student = courseStudents[id];
    if (!studentDrawerBody || !student) return;

    var assignmentsHtml = student.items.map(function (item) {
      return (
        '<div class="td-drawer-assign">' +
          '<span class="td-drawer-assign-icon" aria-hidden="true"><i class="bi bi-file-earmark-text"></i></span>' +
          '<div class="td-drawer-assign-text"><strong>' + item.title + '</strong><span>' + item.time + '</span></div>' +
          '<em class="td-drawer-assign-score">' + item.score + '</em>' +
        '</div>'
      );
    }).join('');

    if (!assignmentsHtml) {
      assignmentsHtml = '<p class="td-drawer-empty">لا توجد واجبات حديثة</p>';
    }

    studentDrawerBody.innerHTML =
      '<div class="td-student-drawer-profile">' +
        '<span class="td-student-drawer-avatar"><img src="' + student.img + '" alt=""></span>' +
        '<strong>' + student.name + '</strong>' +
        '<span>' + student.role + '</span>' +
      '</div>' +
      '<div class="td-student-drawer-actions">' +
        '<button type="button" class="sd-btn-primary td-drawer-edit-btn">تعديل البيانات</button>' +
        '<button type="button" class="td-drawer-icon-btn" aria-label="اتصال"><i class="bi bi-telephone"></i></button>' +
        '<button type="button" class="td-drawer-icon-btn" aria-label="بريد"><i class="bi bi-envelope"></i></button>' +
      '</div>' +
      '<div class="td-drawer-stats">' +
        '<div class="td-drawer-stat"><label>درجة الاختبار الأخير</label><strong>' + student.test + '</strong></div>' +
        '<div class="td-drawer-stat"><label>الواجبات المكتملة</label><strong>' + student.assignments + '</strong></div>' +
      '</div>' +
      '<h4 class="td-drawer-section-title">الواجبات الأخيرة</h4>' +
      '<div class="td-drawer-assign-list">' + assignmentsHtml + '</div>' +
      '<div class="td-drawer-message">' +
        '<label class="td-drawer-section-title">إرسال رسالة سريعة</label>' +
        '<div class="td-drawer-message-field">' +
          '<textarea placeholder="اكتب رسالتك للطالب هنا..." aria-label="رسالة للطالب"></textarea>' +
          '<button type="button" class="td-drawer-send-btn" aria-label="إرسال"><i class="bi bi-send-fill"></i></button>' +
        '</div>' +
      '</div>';
    if (window.TDUI && TDUI.syncStudentPanelMessage) {
      TDUI.syncStudentPanelMessage();
    }
  }

  function openStudentDrawer(id) {
    rows.forEach(function (row) {
      row.classList.toggle('is-selected', row.getAttribute('data-student') === id);
    });
    renderStudentDrawer(id);
    if (studentPanel) {
      studentPanel.hidden = false;
      setBodyScrollLock(true);
    }
  }

  rows.forEach(function (row) {
    row.addEventListener('click', function () {
      openStudentDrawer(row.getAttribute('data-student'));
    });
    row.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openStudentDrawer(row.getAttribute('data-student'));
      }
    });
  });

  function applyStudentFilters() {
    var filterBtn = document.querySelector('[data-student-filter].is-active');
    var filter = filterBtn ? filterBtn.getAttribute('data-student-filter') : 'all';
    var query = studentsSearch ? studentsSearch.value.trim().toLowerCase() : '';
    rows.forEach(function (row) {
      var status = row.getAttribute('data-status');
      var matchesFilter = filter === 'all' || status === filter;
      var matchesSearch = !query || row.textContent.toLowerCase().indexOf(query) !== -1;
      row.hidden = !(matchesFilter && matchesSearch);
    });
  }

  document.querySelectorAll('[data-student-filter]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('[data-student-filter]').forEach(function (pill) {
        pill.classList.remove('is-active');
      });
      btn.classList.add('is-active');
      applyStudentFilters();
    });
  });

  if (studentsSearch) {
    studentsSearch.addEventListener('input', applyStudentFilters);
  }

  if (studentDrawerBody) {
    studentDrawerBody.addEventListener('click', function (e) {
      if (e.target.closest('.td-drawer-edit-btn')) {
        e.preventDefault();
        uiToast('فتح نموذج تعديل بيانات الطالب', 'info');
        return;
      }
      if (e.target.closest('.td-drawer-icon-btn[aria-label="اتصال"]')) {
        e.preventDefault();
        uiToast('جاري الاتصال بالطالب…', 'info');
        return;
      }
      if (e.target.closest('.td-drawer-icon-btn[aria-label="بريد"]')) {
        e.preventDefault();
        window.location.href = 'teacher-messages.html';
        return;
      }
      if (e.target.closest('.td-drawer-send-btn')) {
        e.preventDefault();
        var textarea = studentDrawerBody.querySelector('.td-drawer-message textarea');
        if (textarea && !textarea.value.trim()) {
          uiToast('اكتب رسالة قبل الإرسال', 'info');
          return;
        }
        if (textarea) {
          textarea.value = '';
          if (window.TDUI && TDUI.syncStudentPanelMessage) {
            TDUI.syncStudentPanelMessage(textarea);
          }
        }
        uiToast('تم إرسال الرسالة للطالب', 'success');
      }
    });
  }
})();
