(function () {
  function toast(msg, type) {
    if (window.SDUI && SDUI.notice) SDUI.notice(msg, type || 'info');
  }

  function openModal(opts) {
    if (window.SDUI && SDUI.modal) {
      SDUI.modal(opts);
      return;
    }
    toast(opts.title || '', 'info');
  }

  function navigate(href) {
    if (href && href !== '#') window.location.href = href;
  }

  function getClassTitle(el) {
    var row = el.closest('.td-class-row');
    if (!row) return 'الحصة';
    var title = row.querySelector('.td-class-info h4');
    return title ? title.textContent.trim() : 'الحصة';
  }

  function closeClassMenus(except) {
    document.querySelectorAll('.td-class-menu-popover').forEach(function (menu) {
      if (menu !== except) menu.remove();
    });
  }

  function openClassMenu(btn) {
    closeClassMenus();
    var wrap = btn.closest('.td-class-end');
    if (!wrap) return;

    var menu = document.createElement('div');
    menu.className = 'td-class-menu-popover';
    menu.setAttribute('role', 'menu');
    menu.innerHTML =
      '<button type="button" role="menuitem" data-td-class-action="edit">تعديل الحصة</button>' +
      '<button type="button" role="menuitem" data-td-class-action="materials">تجهيز المواد</button>' +
      '<button type="button" role="menuitem" data-td-class-action="cancel">إلغاء الحصة</button>';
    wrap.appendChild(menu);

    menu.addEventListener('click', function (e) {
      var action = e.target.closest('[data-td-class-action]');
      if (!action) return;
      e.stopPropagation();
      var title = getClassTitle(btn);
      if (action.getAttribute('data-td-class-action') === 'edit') {
        navigate('teacher-schedule.html');
        return;
      }
      if (action.getAttribute('data-td-class-action') === 'materials') {
        navigate('teacher-course.html?tab=content');
        return;
      }
      if (window.SDUI && SDUI.confirm) {
        SDUI.confirm({
          title: 'إلغاء الحصة',
          message: 'هل تريد إلغاء «' + title + '»؟',
          confirmText: 'إلغاء الحصة',
          onConfirm: function () {
            toast('تم إلغاء الحصة', 'success');
          }
        });
      } else {
        toast('تم إلغاء الحصة', 'success');
      }
      menu.remove();
    });
  }

  function initChartFilter() {
    var filter = document.querySelector('.td-chart-filter');
    if (!filter || filter.dataset.tdBound) return;
    filter.dataset.tdBound = '1';
    var options = ['آخر 7 أيام', 'آخر 30 يوم', 'هذا الفصل'];
    var index = 0;

    filter.addEventListener('click', function (e) {
      e.preventDefault();
      index = (index + 1) % options.length;
      var label = options[index];
      filter.innerHTML = label + ' <i class="bi bi-chevron-down" aria-hidden="true"></i>';
      filter.setAttribute('aria-expanded', 'false');
      toast('تم عرض بيانات «' + label + '»', 'info');
    });
  }

  function initChartBars() {
    document.querySelectorAll('.td-chart-bar-col').forEach(function (col) {
      if (col.dataset.tdBound) return;
      col.dataset.tdBound = '1';
      var day = col.querySelector('span');
      var bar = col.querySelector('.td-chart-bar');
      var height = bar ? bar.style.height : '';
      col.setAttribute('role', 'button');
      col.setAttribute('tabindex', '0');
      col.setAttribute('aria-label', 'تفاعل يوم ' + (day ? day.textContent.trim() : ''));

      function showDayStat() {
        var label = day ? day.textContent.trim() : 'اليوم';
        toast('تفاعل يوم «' + label + '»: ' + (height || '—'), 'info');
      }

      col.addEventListener('click', showDayStat);
      col.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          showDayStat();
        }
      });
    });
  }

  function initProfileMenu() {
    var dropdown = document.getElementById('sdProfileDropdown');
    if (!dropdown || dropdown.dataset.tdProfileReady) return;

    var logoutLink = dropdown.querySelector('[href="login.html"]');
    if (!dropdown.querySelector('[href="teacher-profile.html"]')) {
      var profileLink = document.createElement('a');
      profileLink.href = 'teacher-profile.html';
      profileLink.className = 'sd-profile-dropdown-item';
      profileLink.setAttribute('role', 'menuitem');
      profileLink.innerHTML = '<i class="bi bi-person" aria-hidden="true"></i> الملف الشخصي';
      if (logoutLink) dropdown.insertBefore(profileLink, logoutLink);
      else dropdown.appendChild(profileLink);
    }

    var settingsLink = dropdown.querySelector('[href="teacher-settings.html"]');
    if (settingsLink) settingsLink.remove();

    dropdown.dataset.tdProfileReady = '1';
  }

  function syncStudentPanelMessage(textarea) {
    var dialog = document.querySelector('.td-student-panel-dialog');
    if (!dialog) return;

    if (!textarea) {
      textarea = document.querySelector('#tdStudentDrawerBody .td-drawer-message textarea');
    }

    var minH = 84;
    var maxTextH = 200;

    if (textarea) {
      textarea.style.height = 'auto';
      var nextH = Math.min(Math.max(textarea.scrollHeight, minH), maxTextH);
      textarea.style.height = nextH + 'px';
      textarea.style.overflowY = textarea.scrollHeight > maxTextH ? 'auto' : 'hidden';
    }

    dialog.classList.remove('is-scrollable');
    dialog.style.maxHeight = '';

    var cap = Math.max(window.innerHeight - 12, 320);
    if (dialog.offsetHeight > cap) {
      dialog.classList.add('is-scrollable');
      dialog.style.maxHeight = cap + 'px';
    }
  }

  window.TDUI = window.TDUI || {};
  window.TDUI.syncStudentPanelMessage = syncStudentPanelMessage;

  document.addEventListener('input', function (e) {
    if (e.target.matches('#tdStudentDrawerBody .td-drawer-message textarea')) {
      syncStudentPanelMessage(e.target);
    }
  });

  window.addEventListener('resize', function () {
    if (document.querySelector('.td-student-panel:not([hidden])')) {
      syncStudentPanelMessage();
    }
  });

  function initClickableTargets() {
    document.querySelectorAll('[data-td-href]').forEach(function (el) {
      if (el.dataset.tdBound) return;
      el.dataset.tdBound = '1';
      if (!el.hasAttribute('tabindex') && el.tagName !== 'A') {
        el.setAttribute('tabindex', '0');
      }
      if (!el.hasAttribute('role') && el.tagName !== 'A') {
        el.setAttribute('role', 'link');
      }
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(el.getAttribute('data-td-href'));
        }
      });
    });
  }

  var promoModals = {
    'تمارين تنفس': {
      title: 'تمارين تنفس',
      body: '<p class="sd-ui-modal-text">خذ نفساً عميقاً لمدة 4 ثوانٍ، احبسه لثانيتين، ثم ازفير ببطء لمدة 6 ثوانٍ. كرّر 3 مرات قبل بدء الحصة.</p>'
    },
    'نصائح اليوم الجيد': {
      title: 'نصائح اليوم الجيد',
      body: '<p class="sd-ui-modal-text">خصّص 10 دقائق لمراجعة أهداف الحصة، ووزّع الوقت بين الشرح والأسئلة التفاعلية خلال موسم الاختبارات.</p>'
    },
    'موسيقى للتركيز': {
      title: 'موسيقى للتركيز',
      body: '<p class="sd-ui-modal-text">تشغيل قائمة «تركيز هادئ» يساعدك على تجهيز المواد دون تشتيت. يمكنك تشغيلها أثناء تحضير الشرائح.</p>',
      action: function () { toast('جاري تشغيل قائمة التركيز…', 'success'); }
    }
  };

  function openPromoMini(mini) {
    var label = mini.querySelector('strong');
    var key = label ? label.textContent.trim() : '';
    var preset = promoModals[key];
    if (!preset) {
      toast('قريباً: ' + (key || 'الميزة'), 'info');
      return;
    }
    openModal({
      title: preset.title,
      body: preset.body,
      actions: [
        {
          label: preset.action ? 'تشغيل' : 'حسناً',
          primary: true,
          onClick: preset.action || function () {}
        },
        { label: 'إغلاق' }
      ]
    });
  }

  function showDaySummary() {
    openModal({
      title: 'ملخص اليوم',
      body:
        '<p class="sd-ui-modal-text"><strong>جاهزية الدروس:</strong> 92%</p>' +
        '<p class="sd-ui-modal-meta">4 حصص مجدولة — 3 دروس جاهزة للتقديم</p>' +
        '<p class="sd-ui-modal-text">أنت متفوق بـ 3 دروس عن الجدول المخطط لهذا الأسبوع.</p>',
      actions: [
        { label: 'عرض الجدول', primary: true, onClick: function () { navigate('teacher-schedule.html'); } },
        { label: 'إغلاق' }
      ]
    });
  }

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.td-class-menu-btn') && !e.target.closest('.td-class-menu-popover')) {
      closeClassMenus();
    }

    var hrefTarget = e.target.closest('[data-td-href]');
    if (hrefTarget && !e.target.closest('a, button')) {
      var href = hrefTarget.getAttribute('data-td-href');
      if (href) {
        e.preventDefault();
        navigate(href);
        return;
      }
    }

    var summaryIcon = e.target.closest('[data-td-action="summary"]');
    if (summaryIcon) {
      e.preventDefault();
      showDaySummary();
      return;
    }

    var welcomeSummary = e.target.closest('.td-welcome-summary');
    if (welcomeSummary && !e.target.closest('[data-td-action]')) {
      showDaySummary();
      return;
    }

    var classInfo = e.target.closest('.td-class-info');
    if (classInfo && !e.target.closest('a, button')) {
      navigate('teacher-schedule.html');
      return;
    }

    var hashAction = e.target.closest('a[href="#"][data-td-action]');
    if (hashAction) {
      e.preventDefault();
      var action = hashAction.getAttribute('data-td-action');
      if (action === 'add-lesson') {
        navigate('teacher-course.html?tab=content');
        return;
      }
      toast('تم تنفيذ الإجراء', 'success');
      return;
    }

    var enter = e.target.closest('.td-btn-enter');
    if (enter) {
      e.preventDefault();
      if (window.SDUI && SDUI.joinSession) {
        SDUI.joinSession(getClassTitle(enter));
      } else {
        toast('جاري فتح قاعة «' + getClassTitle(enter) + '»…', 'success');
      }
      return;
    }

    var prepare = e.target.closest('.td-btn-prepare');
    if (prepare) {
      e.preventDefault();
      navigate('teacher-course.html?tab=content');
      return;
    }

    var live = e.target.closest('.td-btn-live');
    if (live) {
      e.preventDefault();
      openModal({
        title: 'بدء حصة مباشرة',
        body: '<p class="sd-ui-modal-text">سيتم تجهيز قاعة البث المباشر. تأكد من جاهزية الكاميرا والميكروفون.</p>',
        actions: [
          { label: 'بدء الآن', primary: true, onClick: function () { toast('جاري فتح الحصة المباشرة…', 'success'); } },
          { label: 'إلغاء' }
        ]
      });
      return;
    }

    var menuBtn = e.target.closest('.td-class-menu-btn');
    if (menuBtn) {
      e.preventDefault();
      e.stopPropagation();
      var open = menuBtn.parentElement.querySelector('.td-class-menu-popover');
      if (open) {
        open.remove();
      } else {
        openClassMenu(menuBtn);
      }
      return;
    }

    var ignore = e.target.closest('.td-request-card .sd-btn-outline');
    if (ignore && ignore.textContent.trim() === 'تجاهل') {
      e.preventDefault();
      var card = ignore.closest('.td-request-card');
      if (!card) return;
      var dismiss = function () {
        card.remove();
        toast('تم تجاهل الطلب', 'success');
      };
      if (window.SDUI && SDUI.confirm) {
        SDUI.confirm({
          title: 'تجاهل الطلب',
          message: 'هل تريد تجاهل هذا الطلب؟',
          confirmText: 'تجاهل',
          onConfirm: dismiss
        });
      } else {
        dismiss();
      }
      return;
    }

    var refresh = e.target.closest('.td-panel-refresh');
    if (refresh) {
      e.preventDefault();
      refresh.classList.add('is-spinning');
      window.setTimeout(function () {
        refresh.classList.remove('is-spinning');
        toast('تم تحديث القائمة', 'success');
      }, 700);
      return;
    }

    var activityFilter = e.target.closest('.td-activity-filter');
    if (activityFilter) {
      if (document.querySelector('.td-page-course-detail')) return;
      e.preventDefault();
      toast('تم تطبيق فلتر النشاطات', 'info');
      return;
    }

    var mini = e.target.closest('.td-page .sd-promo-mini');
    if (mini) {
      e.preventDefault();
      openPromoMini(mini);
      return;
    }

    var welcomeBadge = e.target.closest('.td-welcome-badge');
    if (welcomeBadge) {
      toast('المسار الأكاديمي — المرحلة الثانوية', 'info');
      return;
    }
  });

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function parseExamCard(card) {
    var titleEl = card ? card.querySelector('h4') : null;
    var metaEl = card ? card.querySelector('p') : null;
    var tagEl = card ? card.querySelector('.td-upcoming-exam-tag') : null;
    var title = titleEl ? titleEl.textContent.trim() : 'الاختبار';
    var meta = metaEl ? metaEl.textContent.trim() : '';
    var tag = tagEl ? tagEl.textContent.trim() : '';
    var durationMatch = meta.match(/(\d+)\s*دقيق/);
    var questionsMatch = meta.match(/(\d+)\s*سؤال/);
    return {
      card: card,
      titleEl: titleEl,
      metaEl: metaEl,
      tagEl: tagEl,
      title: title,
      meta: meta,
      tag: tag,
      duration: durationMatch ? durationMatch[1] : '45',
      questions: questionsMatch ? questionsMatch[1] : '20'
    };
  }

  function buildExamEditForm(data) {
    return (
      '<div class="td-exam-edit-form">' +
        '<div class="td-form-group">' +
          '<label for="examEditTitle">عنوان الاختبار</label>' +
          '<input type="text" id="examEditTitle" value="' + escapeHtml(data.title) + '" autocomplete="off">' +
        '</div>' +
        '<div class="td-form-row td-form-row--exam-edit">' +
          '<div class="td-form-group">' +
            '<label for="examEditDuration">مدة الاختبار (دقيقة)</label>' +
            '<input type="number" id="examEditDuration" min="5" max="300" value="' + escapeHtml(data.duration) + '">' +
          '</div>' +
          '<div class="td-form-group">' +
            '<label for="examEditQuestions">عدد الأسئلة</label>' +
            '<input type="number" id="examEditQuestions" min="1" max="200" value="' + escapeHtml(data.questions) + '">' +
          '</div>' +
        '</div>' +
        '<div class="td-form-group">' +
          '<label for="examEditSchedule">موعد الاختبار</label>' +
          '<input type="text" id="examEditSchedule" value="' + escapeHtml(data.tag) + '" placeholder="مثلاً: بعد 3 أيام" autocomplete="off">' +
        '</div>' +
      '</div>'
    );
  }

  function buildExamSettingsForm(data) {
    return (
      '<div class="td-exam-edit-form">' +
        '<p class="sd-ui-modal-text td-exam-edit-form-lead"><strong>' + escapeHtml(data.title) + '</strong></p>' +
        '<div class="td-form-row td-form-row--exam-edit">' +
          '<div class="td-form-group">' +
            '<label for="examSettingsAttempts">عدد المحاولات</label>' +
            '<input type="number" id="examSettingsAttempts" min="1" max="10" value="1">' +
          '</div>' +
          '<div class="td-form-group">' +
            '<label for="examSettingsPass">درجة النجاح (%)</label>' +
            '<input type="number" id="examSettingsPass" min="0" max="100" value="50">' +
          '</div>' +
        '</div>' +
        '<div class="td-form-group">' +
          '<label for="examSettingsWindow">وقت الإتاحة</label>' +
          '<select id="examSettingsWindow">' +
            '<option value="always">متاح دائماً</option>' +
            '<option value="scheduled" selected>حسب الموعد المحدد</option>' +
            '<option value="limited">لفترة محدودة</option>' +
          '</select>' +
        '</div>' +
        '<div class="td-form-group">' +
          '<label for="examSettingsNotes">ملاحظات إضافية</label>' +
          '<textarea id="examSettingsNotes" rows="2" placeholder="اكتب ملاحظاتك هنا..."></textarea>' +
        '</div>' +
      '</div>'
    );
  }

  function openExamEdit(btn) {
    var data = parseExamCard(btn.closest('.td-upcoming-card'));
    openModal({
      title: 'تعديل الاختبار',
      body: buildExamEditForm(data),
      actions: [
        {
          label: 'حفظ التعديلات',
          primary: true,
          onClick: function () {
            var titleInput = document.getElementById('examEditTitle');
            var durationInput = document.getElementById('examEditDuration');
            var questionsInput = document.getElementById('examEditQuestions');
            var scheduleInput = document.getElementById('examEditSchedule');
            var title = titleInput ? titleInput.value.trim() : '';
            var duration = durationInput ? durationInput.value.trim() : '';
            var questions = questionsInput ? questionsInput.value.trim() : '';
            var schedule = scheduleInput ? scheduleInput.value.trim() : '';

            if (!title) {
              toast('أدخل عنوان الاختبار', 'info');
              return false;
            }
            if (!duration || Number(duration) < 5) {
              toast('أدخل مدة صحيحة للاختبار', 'info');
              return false;
            }
            if (!questions || Number(questions) < 1) {
              toast('أدخل عدد أسئلة صحيح', 'info');
              return false;
            }

            if (data.titleEl) data.titleEl.textContent = title;
            if (data.tagEl && schedule) data.tagEl.textContent = schedule;
            if (data.metaEl) {
              var prefix = '';
              var metaParts = data.meta.split('·');
              if (metaParts.length > 1) {
                prefix = metaParts[0].trim() + ' · ';
              }
              var questionLabel = Number(questions) >= 3 && Number(questions) <= 10 ? 'أسئلة' : 'سؤال';
              data.metaEl.textContent = prefix + 'مدة الاختبار: ' + duration + ' دقيقة | ' + questions + ' ' + questionLabel;
            }
            toast('تم تحديث الاختبار بنجاح', 'success');
          }
        },
        { label: 'إلغاء' }
      ]
    });
  }

  function openExamSettings(btn) {
    var data = parseExamCard(btn.closest('.td-upcoming-card'));
    openModal({
      title: 'إعدادات الاختبار',
      body: buildExamSettingsForm(data),
      actions: [
        {
          label: 'حفظ',
          primary: true,
          onClick: function () {
            var attempts = document.getElementById('examSettingsAttempts');
            var passMark = document.getElementById('examSettingsPass');
            if (attempts && (!attempts.value || Number(attempts.value) < 1)) {
              toast('أدخل عدد محاولات صحيح', 'info');
              return false;
            }
            if (passMark && (passMark.value === '' || Number(passMark.value) < 0 || Number(passMark.value) > 100)) {
              toast('أدخل درجة نجاح بين 0 و 100', 'info');
              return false;
            }
            toast('تم حفظ إعدادات الاختبار', 'success');
          }
        },
        { label: 'إلغاء' }
      ]
    });
  }

  function openExamAction(btn) {
    if (!btn) return;
    var action = btn.getAttribute('data-exam-action') || 'edit';
    if (action === 'settings') openExamSettings(btn);
    else openExamEdit(btn);
  }

  window.TDUI = window.TDUI || {};
  window.TDUI.openExamEdit = openExamEdit;
  window.TDUI.openExamSettings = openExamSettings;
  window.TDUI.openExamAction = openExamAction;

  document.addEventListener('DOMContentLoaded', function () {
    initChartFilter();
    initChartBars();
    initProfileMenu();
    initClickableTargets();
  });
})();
