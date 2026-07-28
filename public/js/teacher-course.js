(function () {
  var tabs = document.querySelectorAll('.td-course-tab');
  var panels = document.querySelectorAll('.td-tab-panel');
  var params = new URLSearchParams(window.location.search);
  var initialTab = params.get('tab') || 'overview';

  function activateTab(id) {
    tabs.forEach(function (tab) {
      tab.classList.toggle('is-active', tab.getAttribute('data-tab') === id);
    });
    panels.forEach(function (panel) {
      panel.classList.toggle('is-active', panel.id === 'tab-' + id);
    });
    if (window.history && window.history.replaceState) {
      var url = new URL(window.location.href);
      if (id === 'overview') {
        url.searchParams.delete('tab');
      } else {
        url.searchParams.set('tab', id);
      }
      window.history.replaceState({}, '', url);
    }
  }

  function setBodyScrollLock(locked) {
    document.body.style.overflow = locked ? 'hidden' : '';
  }

  function isOverlayOpen() {
    var panelOpen = studentPanel && !studentPanel.hidden;
    var modalOpen = modal && !modal.hidden;
    return panelOpen || modalOpen;
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activateTab(tab.getAttribute('data-tab'));
    });
  });

  activateTab(initialTab);

  var modal = document.getElementById('tdAssignModal');
  var openBtn = document.getElementById('tdOpenAssignModal');
  var closeBtns = document.querySelectorAll('[data-td-close-modal]');

  if (openBtn && modal) {
    openBtn.addEventListener('click', function () {
      modal.hidden = false;
      setBodyScrollLock(true);
    });
  }

  closeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (modal) modal.hidden = true;
      if (!isOverlayOpen()) setBodyScrollLock(false);
    });
  });

  document.querySelectorAll('.td-unit-collapse').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var unit = btn.closest('.td-unit');
      if (!unit) return;
      var body = unit.querySelector('.td-unit-body');
      if (!body) return;
      var isOpen = !body.hidden;
      body.hidden = isOpen;
      unit.classList.toggle('is-open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
      btn.setAttribute('aria-label', isOpen ? 'فتح الوحدة' : 'طي الوحدة');
      var icon = btn.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'bi bi-chevron-down' : 'bi bi-chevron-up';
      }
    });
  });

  document.querySelectorAll('.td-unit-drag').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      uiToast('اسحب الوحدة لإعادة ترتيبها', 'info');
    });
  });

  document.querySelectorAll('.td-upload-dropzone').forEach(function (zone) {
    zone.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      var fileInput = document.getElementById('saUploadFileInput');
      if (fileInput) fileInput.click();
    });
  });

  function focusContentUpload() {
    var upload = document.querySelector('#tab-content .td-content-upload');
    if (!upload) return;
    activateTab('content');
    upload.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    upload.classList.add('is-highlight');
    window.setTimeout(function () {
      upload.classList.remove('is-highlight');
    }, 1400);
  }

  var studentRows = document.querySelectorAll('#tdStudentsList .td-student-row');
  var studentDrawerBody = document.getElementById('tdStudentDrawerBody');
  var studentPanel = document.getElementById('tdStudentPanel');

  function closeStudentPanel() {
    if (studentPanel) studentPanel.hidden = true;
    studentRows.forEach(function (row) {
      row.classList.remove('is-selected');
    });
    if (!isOverlayOpen()) setBodyScrollLock(false);
  }

  document.querySelectorAll('[data-td-close-student-panel]').forEach(function (btn) {
    btn.addEventListener('click', closeStudentPanel);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    if (studentPanel && !studentPanel.hidden) closeStudentPanel();
    if (modal && !modal.hidden) {
      modal.hidden = true;
    }
    if (!isOverlayOpen()) setBodyScrollLock(false);
  });

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
    studentRows.forEach(function (row) {
      row.classList.toggle('is-selected', row.getAttribute('data-student') === id);
    });
    renderStudentDrawer(id);
    if (studentPanel) {
      studentPanel.hidden = false;
      setBodyScrollLock(true);
    }
  }

  studentRows.forEach(function (row) {
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
    studentRows.forEach(function (row) {
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

  var studentsSearch = document.getElementById('tdStudentsSearch');
  if (studentsSearch) {
    studentsSearch.addEventListener('input', applyStudentFilters);
  }

  if (initialTab === 'students' && params.get('student')) {
    openStudentDrawer(params.get('student'));
  }

  document.querySelectorAll('.td-privacy-options--course .td-privacy-option').forEach(function (option) {
    option.addEventListener('click', function () {
      document.querySelectorAll('.td-privacy-options--course .td-privacy-option').forEach(function (item) {
        item.classList.remove('is-selected');
      });
      option.classList.add('is-selected');
      var radio = option.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  function uiToast(msg, type) {
    if (window.SDUI && SDUI.toast) SDUI.toast(msg, type || 'info');
  }

  function uiConfirm(opts) {
    if (window.SDUI && SDUI.confirm) {
      SDUI.confirm(opts);
      return;
    }
    if (window.confirm(opts.message || opts.title)) {
      if (opts.onConfirm) opts.onConfirm();
    }
  }

  function uiModal(opts) {
    if (window.SDUI && SDUI.modal) SDUI.modal(opts);
    else uiToast(opts.title || '');
  }

  document.addEventListener('click', function (e) {
    if (!document.querySelector('.td-page-course-detail')) return;

    var addLesson = e.target.closest('.td-link-action, .td-unit-tool[aria-label="إضافة درس"]');
    if (addLesson) {
      e.preventDefault();
      focusContentUpload();
      uiToast('اختر نوع المحتوى لإضافة درس جديد', 'info');
      return;
    }

    var lecturesToggle = e.target.closest('#lecturesViewAll, .td-lectures-toggle');
    if (lecturesToggle) {
      e.preventDefault();
      var panel = lecturesToggle.closest('.td-panel--lectures') || document.getElementById('upcomingLecturesPanel');
      var extras = panel ? panel.querySelectorAll('.td-lecture-item--extra') : [];
      var expanded = lecturesToggle.getAttribute('aria-expanded') === 'true';
      extras.forEach(function (item) {
        item.hidden = expanded;
      });
      lecturesToggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      lecturesToggle.textContent = expanded ? 'عرض الكل' : 'عرض أقل';
      if (panel) panel.classList.toggle('is-expanded', !expanded);
      return;
    }

    var examsToggle = e.target.closest('#examsViewAll, .td-exams-view-all');
    if (examsToggle) {
      e.preventDefault();
      var examsGrid = document.getElementById('upcomingExamsGrid') || examsToggle.closest('#tab-exams');
      var examExtras = examsGrid ? examsGrid.querySelectorAll('.td-upcoming-card--extra') : [];
      var examsExpanded = examsToggle.getAttribute('aria-expanded') === 'true';
      examExtras.forEach(function (item) {
        item.hidden = examsExpanded;
      });
      examsToggle.setAttribute('aria-expanded', examsExpanded ? 'false' : 'true');
      examsToggle.textContent = examsExpanded ? 'عرض الكل' : 'عرض أقل';
      return;
    }

    var viewAll = e.target.closest('.sd-link.sd-link--muted[href="#"]');
    if (viewAll) {
      e.preventDefault();
      uiToast('عرض القائمة الكاملة', 'info');
      return;
    }

    var gradeLink = e.target.closest('.td-assign-grade-link[href="#"]');
    if (gradeLink) {
      e.preventDefault();
      window.location.href = 'teacher-assignments.html';
      return;
    }

    var reviewBtn = e.target.closest('.td-assign-next-btn');
    if (reviewBtn) {
      e.preventDefault();
      window.location.href = 'teacher-assignments.html';
      return;
    }

    var assignTool = e.target.closest('.td-assign-item-tools button[aria-label]');
    if (assignTool) {
      e.preventDefault();
      var toolAction = assignTool.getAttribute('aria-label');
      if (toolAction === 'الإحصائيات') {
        uiModal({
          title: 'إحصائيات الواجب',
          body: '<p class="sd-ui-modal-text">معدل التسليم: 78% — متوسط الدرجات: 8.2/10</p>',
          actions: [{ label: 'حسناً', primary: true }]
        });
      } else {
        uiToast('فتح محرر الواجب', 'info');
      }
      return;
    }

    var publishBtn = e.target.closest('.td-assign-publish');
    if (publishBtn) {
      e.preventDefault();
      uiToast('تم نشر الواجب بنجاح', 'success');
      if (modal) modal.hidden = true;
      if (!isOverlayOpen()) setBodyScrollLock(false);
      return;
    }

    var upcomingAction = e.target.closest('.td-upcoming-card-action');
    if (upcomingAction) {
      e.preventDefault();
      if (window.TDUI && TDUI.openExamAction) TDUI.openExamAction(upcomingAction);
      return;
    }

    var examAnalysis = e.target.closest('.td-exams-table-btn');
    if (examAnalysis) {
      e.preventDefault();
      uiModal({
        title: 'تحليل الاختبار',
        body:
          '<p class="sd-ui-modal-text"><strong>متوسط الدرجات:</strong> 76%</p>' +
          '<p class="sd-ui-modal-text"><strong>نسبة النجاح:</strong> 84%</p>' +
          '<p class="sd-ui-modal-meta">أعلى درجة: 98% — أدنى درجة: 42%</p>',
        actions: [{ label: 'حسناً', primary: true }]
      });
      return;
    }

    var coverBtn = e.target.closest('.td-cover-change-btn');
    if (coverBtn) {
      e.preventDefault();
      var coverInput = document.getElementById('saCoverFileInput');
      if (coverInput) coverInput.click();
      return;
    }

    var archiveBtn = e.target.closest('.td-btn-archive');
    if (archiveBtn) {
      e.preventDefault();
      uiConfirm({
        title: 'أرشفة المادة',
        message: 'سيتم إخفاء المادة عن الطلاب مع الاحتفاظ ببياناتها. هل تريد المتابعة؟',
        confirmText: 'أرشفة',
        onConfirm: function () {
          uiToast('تمت أرشفة المادة', 'success');
          window.setTimeout(function () { window.location.href = 'teacher-courses.html'; }, 900);
        }
      });
      return;
    }

    var deleteBtn = e.target.closest('.td-btn-delete-course');
    if (deleteBtn) {
      e.preventDefault();
      uiConfirm({
        title: 'حذف المادة نهائياً',
        message: 'هذا الإجراء لا يمكن التراجع عنه. سيتم حذف جميع محتوى المادة.',
        confirmText: 'حذف نهائي',
        onConfirm: function () {
          uiToast('تم حذف المادة', 'success');
          window.setTimeout(function () { window.location.href = 'teacher-courses.html'; }, 900);
        }
      });
      return;
    }

    var unitMenu = e.target.closest('.td-unit-tool[aria-label="خيارات الوحدة"]');
    if (unitMenu) {
      e.preventDefault();
      uiModal({
        title: 'خيارات الوحدة',
        body: '<p class="sd-ui-modal-text">إدارة الوحدة: إعادة تسمية، نسخ، أو حذف الوحدة بالكامل.</p>',
        actions: [
          { label: 'نسخ الوحدة', primary: true, onClick: function () { uiToast('تم نسخ الوحدة', 'success'); } },
          { label: 'إغلاق' }
        ]
      });
      return;
    }

    var lessonTool = e.target.closest('.td-lesson-tools button[aria-label]');
    if (lessonTool) {
      e.preventDefault();
      var lessonCard = lessonTool.closest('.td-lesson-card');
      var lessonAction = lessonTool.getAttribute('aria-label');
      if (lessonAction === 'حذف') {
        uiConfirm({
          title: 'حذف الدرس',
          message: 'هل تريد حذف هذا الدرس؟',
          confirmText: 'حذف',
          onConfirm: function () {
            if (lessonCard) lessonCard.remove();
            uiToast('تم حذف الدرس', 'success');
          }
        });
      } else if (lessonAction === 'نسخ') {
        if (lessonCard && lessonCard.parentNode) {
          var clone = lessonCard.cloneNode(true);
          lessonCard.parentNode.insertBefore(clone, lessonCard.nextSibling);
        }
        uiToast('تم نسخ الدرس', 'success');
      } else {
        window.location.href = 'teacher-course-edit.html';
      }
      return;
    }

    var uploadType = e.target.closest('.td-upload-type');
    if (uploadType) {
      e.preventDefault();
      document.querySelectorAll('.td-upload-type').forEach(function (btn) {
        btn.classList.remove('is-active');
      });
      uploadType.classList.add('is-active');
      var uploadInput = document.getElementById('saUploadFileInput');
      if (uploadInput) {
        uploadInput.accept = uploadType.textContent.indexOf('PDF') !== -1 ? '.pdf' : 'video/*';
        uploadInput.click();
      }
      return;
    }

    var dropzone = e.target.closest('.td-upload-dropzone');
    if (dropzone) {
      e.preventDefault();
      var fileInput = document.getElementById('saUploadFileInput');
      if (fileInput) fileInput.click();
      return;
    }
  });

  if (studentDrawerBody) {
    studentDrawerBody.addEventListener('click', function (e) {
      var editBtn = e.target.closest('.td-drawer-edit-btn');
      if (editBtn) {
        e.preventDefault();
        uiToast('فتح نموذج تعديل بيانات الطالب', 'info');
        return;
      }
      var phoneBtn = e.target.closest('.td-drawer-icon-btn[aria-label="اتصال"]');
      if (phoneBtn) {
        e.preventDefault();
        uiToast('جاري الاتصال بالطالب…', 'info');
        return;
      }
      var mailBtn = e.target.closest('.td-drawer-icon-btn[aria-label="بريد"]');
      if (mailBtn) {
        e.preventDefault();
        window.location.href = 'teacher-messages.html';
        return;
      }
      var sendBtn = e.target.closest('.td-drawer-send-btn');
      if (sendBtn) {
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

  function toggleUpcomingExams() {
    var examsToggle = document.getElementById('examsViewAll');
    var examsGrid = document.getElementById('upcomingExamsGrid');
    if (!examsToggle || !examsGrid) return;
    var examExtras = examsGrid.querySelectorAll('.td-upcoming-card--extra');
    var examsExpanded = examsToggle.getAttribute('aria-expanded') === 'true';
    examExtras.forEach(function (item) {
      item.hidden = examsExpanded;
    });
    examsToggle.setAttribute('aria-expanded', examsExpanded ? 'false' : 'true');
    examsToggle.textContent = examsExpanded ? 'عرض الكل' : 'عرض أقل';
  }

  var examsViewAllBtn = document.getElementById('examsViewAll');
  if (examsViewAllBtn) {
    examsViewAllBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleUpcomingExams();
    });
  }

  document.querySelectorAll('#tab-exams .td-upcoming-card-action').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (window.TDUI && TDUI.openExamAction) {
        TDUI.openExamAction(btn);
      } else {
        uiToast(btn.getAttribute('aria-label') || 'فتح الاختبار', 'info');
      }
    });
  });

  var activityFilterBtn = document.querySelector('.td-page-course-detail .td-activity-filter');
  var activityItems = document.querySelectorAll('.td-page-course-detail .td-activity-item');
  var activityFilter = 'all';

  function closeActivityMenu() {
    var open = document.querySelector('.td-activity-filter-menu');
    if (open) open.remove();
  }

  function applyActivityFilter() {
    activityItems.forEach(function (item) {
      if (activityFilter === 'all') {
        item.hidden = false;
        return;
      }
      if (activityFilter === 'alerts') {
        item.hidden = !item.classList.contains('is-alert');
        return;
      }
      var icon = item.querySelector('.td-activity-icon i');
      var cls = icon ? icon.className : '';
      if (activityFilter === 'submissions') item.hidden = cls.indexOf('clipboard') === -1;
      else if (activityFilter === 'joins') item.hidden = cls.indexOf('person-plus') === -1;
      else if (activityFilter === 'messages') item.hidden = cls.indexOf('chat') === -1;
      else if (activityFilter === 'reviews') item.hidden = cls.indexOf('star') === -1;
      else item.hidden = false;
    });
  }

  if (activityFilterBtn && activityItems.length) {
    activityFilterBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var existing = document.querySelector('.td-activity-filter-menu');
      if (existing) {
        existing.remove();
        return;
      }
      var menu = document.createElement('div');
      menu.className = 'td-activity-filter-menu';
      menu.setAttribute('role', 'menu');
      menu.innerHTML =
        '<button type="button" data-filter="all">الكل</button>' +
        '<button type="button" data-filter="submissions">التسليمات</button>' +
        '<button type="button" data-filter="joins">انضمامات</button>' +
        '<button type="button" data-filter="messages">أسئلة</button>' +
        '<button type="button" data-filter="reviews">تقييمات</button>' +
        '<button type="button" data-filter="alerts">تنبيهات</button>';
      activityFilterBtn.parentElement.appendChild(menu);
      menu.querySelectorAll('[data-filter]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activityFilter = btn.getAttribute('data-filter');
          applyActivityFilter();
          closeActivityMenu();
          uiToast('تم تطبيق الفلتر', 'info');
        });
      });
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.td-activity-filter, .td-activity-filter-menu')) {
        closeActivityMenu();
      }
    });
  }
})();
