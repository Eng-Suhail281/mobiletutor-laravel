(function () {
  'use strict';

  var root = document.querySelector('.td-page-assignments');
  if (!root) return;

  var contentRoot = root.querySelector('.sd-content');
  var layout = root.querySelector('.td-assign-page-layout');
  var grid = root.querySelector('.td-assign-page-grid');
  var reviewPanel = root.querySelector('.td-review-panel');
  var reviewList = root.querySelector('.td-review-panel-list');
  var reviewAllBtn = root.querySelector('.td-review-panel-all');
  var assignModal = document.getElementById('tdAssignModal');
  var openAssignBtn = document.getElementById('tdOpenAssignModal');

  var EXTRA_SUBMISSIONS = [
    { name: 'سارة محمود', time: 'منذ 6 ساعات', status: 'graded', grade: '8.5', file: 'واجب_سارة.pdf', size: '1.8 ميجابايت', icon: 'bi-file-earmark-pdf' },
    { name: 'يوسف علي', time: 'منذ 7 ساعات', status: 'pending', grade: '', file: 'حل_يوسف.docx', size: '1.3 ميجابايت', icon: 'bi-file-earmark-word' },
    { name: 'نور حسين', time: 'منذ 8 ساعات', status: 'graded', grade: '10', file: 'واجب_نور.pdf', size: '2.0 ميجابايت', icon: 'bi-file-earmark-pdf' },
    { name: 'كريم سالم', time: 'منذ 9 ساعات', status: 'pending', grade: '', file: 'تسليم_كريم.docx', size: '1.6 ميجابايت', icon: 'bi-file-earmark-word' },
    { name: 'مريم خالد', time: 'منذ 10 ساعات', status: 'graded', grade: '7', file: 'واجب_مريم.pdf', size: '1.2 ميجابايت', icon: 'bi-file-earmark-pdf' },
    { name: 'طارق ناصر', time: 'منذ 11 ساعة', status: 'missing' },
    { name: 'هند عادل', time: 'منذ 12 ساعة', status: 'graded', grade: '9.5', file: 'واجب_هند.pdf', size: '1.9 ميجابايت', icon: 'bi-file-earmark-pdf' },
    { name: 'زياد فهد', time: 'منذ 13 ساعة', status: 'pending', grade: '', file: 'حل_زياد.docx', size: '1.0 ميجابايت', icon: 'bi-file-earmark-word' },
    { name: 'رانيا سعد', time: 'منذ 14 ساعة', status: 'graded', grade: '8', file: 'واجب_رانيا.pdf', size: '2.2 ميجابايت', icon: 'bi-file-earmark-pdf' },
    { name: 'بلال عمرو', time: 'منذ 15 ساعة', status: 'missing' },
    { name: 'دينا وليد', time: 'منذ 16 ساعة', status: 'graded', grade: '9', file: 'واجب_دينا.pdf', size: '1.5 ميجابايت', icon: 'bi-file-earmark-pdf' },
    { name: 'فادي رامي', time: 'منذ 17 ساعة', status: 'pending', grade: '', file: 'حل_فادي.docx', size: '1.4 ميجابايت', icon: 'bi-file-earmark-word' },
    { name: 'لينا جمال', time: 'منذ 18 ساعة', status: 'graded', grade: '8.5', file: 'واجب_لينا.pdf', size: '1.7 ميجابايت', icon: 'bi-file-earmark-pdf' },
    { name: 'عبدالله نور', time: 'منذ 19 ساعة', status: 'graded', grade: '7.5', file: 'واجب_عبدالله.pdf', size: '2.3 ميجابايت', icon: 'bi-file-earmark-pdf' },
    { name: 'سلمى حازم', time: 'منذ يوم', status: 'pending', grade: '', file: 'حل_سلمى.docx', size: '1.1 ميجابايت', icon: 'bi-file-earmark-word' },
    { name: 'إياد كمال', time: 'منذ يوم', status: 'missing' },
    { name: 'جمانة طلال', time: 'منذ يوم', status: 'graded', grade: '9', file: 'واجب_جمانة.pdf', size: '1.6 ميجابايت', icon: 'bi-file-earmark-pdf' },
    { name: 'مازن سهيل', time: 'منذ يوم', status: 'graded', grade: '10', file: 'واجب_مازن.pdf', size: '2.1 ميجابايت', icon: 'bi-file-earmark-pdf' },
    { name: 'ريم أسامة', time: 'منذ يومين', status: 'pending', grade: '', file: 'حل_ريم.docx', size: '1.3 ميجابايت', icon: 'bi-file-earmark-word' },
    { name: 'حسام باسل', time: 'منذ يومين', status: 'graded', grade: '8', file: 'واجب_حسام.pdf', size: '1.8 ميجابايت', icon: 'bi-file-earmark-pdf' },
    { name: 'تالا مراد', time: 'منذ يومين', status: 'missing' },
    { name: 'وائل شادي', time: 'منذ يومين', status: 'graded', grade: '9.5', file: 'واجب_وائل.pdf', size: '2.0 ميجابايت', icon: 'bi-file-earmark-pdf' },
    { name: 'غادة فارس', time: 'منذ 3 أيام', status: 'pending', grade: '', file: 'حل_غادة.docx', size: '1.2 ميجابايت', icon: 'bi-file-earmark-word' },
    { name: 'رامي جاد', time: 'منذ 3 أيام', status: 'graded', grade: '7', file: 'واجب_رامي.pdf', size: '1.4 ميجابايت', icon: 'bi-file-earmark-pdf' },
    { name: 'ندى عمر', time: 'منذ 3 أيام', status: 'graded', grade: '8.5', file: 'واجب_ندى.pdf', size: '1.9 ميجابايت', icon: 'bi-file-earmark-pdf' },
    { name: 'سامي هشام', time: 'منذ 3 أيام', status: 'missing' },
    { name: 'لجين إياد', time: 'منذ 4 أيام', status: 'graded', grade: '9', file: 'واجب_لجين.pdf', size: '2.2 ميجابايت', icon: 'bi-file-earmark-pdf' },
    { name: 'باسم خليل', time: 'منذ 4 أيام', status: 'pending', grade: '', file: 'حل_باسم.docx', size: '1.0 ميجابايت', icon: 'bi-file-earmark-word' },
    { name: 'شهد مروان', time: 'منذ 4 أيام', status: 'graded', grade: '8', file: 'واجب_شهد.pdf', size: '1.5 ميجابايت', icon: 'bi-file-earmark-pdf' },
    { name: 'أنس ربيع', time: 'منذ 4 أيام', status: 'graded', grade: '9.5', file: 'واجب_أنس.pdf', size: '1.7 ميجابايت', icon: 'bi-file-earmark-pdf' },
    { name: 'يارا نبيل', time: 'منذ 5 أيام', status: 'pending', grade: '', file: 'حل_يارا.docx', size: '1.3 ميجابايت', icon: 'bi-file-earmark-word' },
    { name: 'معتز سامي', time: 'منذ 5 أيام', status: 'missing' },
    { name: 'روان طارق', time: 'منذ 5 أيام', status: 'graded', grade: '10', file: 'واجب_روان.pdf', size: '2.4 ميجابايت', icon: 'bi-file-earmark-pdf' },
    { name: 'علي حمزة', time: 'منذ 5 أيام', status: 'graded', grade: '7.5', file: 'واجب_علي.pdf', size: '1.6 ميجابايت', icon: 'bi-file-earmark-pdf' },
    { name: 'مها زيد', time: 'منذ 6 أيام', status: 'pending', grade: '', file: 'حل_مها.docx', size: '1.1 ميجابايت', icon: 'bi-file-earmark-word' },
    { name: 'جهاد كريم', time: 'منذ 6 أيام', status: 'graded', grade: '8.5', file: 'واجب_جهاد.pdf', size: '1.8 ميجابايت', icon: 'bi-file-earmark-pdf' },
    { name: 'آية ولاء', time: 'منذ 6 أيام', status: 'graded', grade: '9', file: 'واجب_آية.pdf', size: '2.0 ميجابايت', icon: 'bi-file-earmark-pdf' },
    { name: 'عادل منير', time: 'منذ أسبوع', status: 'missing' },
    { name: 'هالة سمير', time: 'منذ أسبوع', status: 'graded', grade: '8', file: 'واجب_هالة.pdf', size: '1.4 ميجابايت', icon: 'bi-file-earmark-pdf' }
  ];

  function ui() {
    return window.SDUI;
  }

  function toast(msg, type) {
    var shell = ui();
    if (shell && shell.toast) shell.toast(msg, type || 'info');
  }

  function confirm(opts) {
    var shell = ui();
    if (shell && shell.confirm) {
      shell.confirm(opts);
      return;
    }
    if (window.confirm(opts.message || opts.title || 'تأكيد') && opts.onConfirm) opts.onConfirm();
  }

  function modal(opts) {
    var shell = ui();
    if (shell && shell.modal) shell.modal(opts);
    else toast(opts.title || '');
  }

  function download(name, silent) {
    if (silent) return;
    var shell = ui();
    if (shell && shell.download) shell.download(name);
    else toast('جاري تحميل «' + name + '»…', 'success');
  }

  function formatDateAr(iso) {
    if (!iso) return '';
    var parts = iso.split('-');
    if (parts.length !== 3) return iso;
    var months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    var m = parseInt(parts[1], 10) - 1;
    return parts[2] + ' ' + (months[m] || parts[1]) + ' ' + parts[0];
  }

  function setBodyScrollLock(lock) {
    document.body.style.overflow = lock ? 'hidden' : '';
  }

  function resetCreateForm() {
    var titleEl = document.getElementById('assignTitle');
    var dateEl = document.getElementById('assignDate');
    var gradeEl = document.getElementById('assignGrade');
    var notesEl = document.getElementById('assignNotes');
    if (titleEl) titleEl.value = '';
    if (dateEl) dateEl.value = '';
    if (gradeEl) gradeEl.value = '100';
    if (notesEl) notesEl.value = '';
  }

  function openCreateModal() {
    if (!assignModal) return;
    resetCreateForm();
    assignModal.hidden = false;
    setBodyScrollLock(true);
    var titleEl = document.getElementById('assignTitle');
    if (titleEl) window.setTimeout(function () { titleEl.focus(); }, 60);
  }

  function closeCreateModal() {
    if (!assignModal) return;
    assignModal.hidden = true;
    setBodyScrollLock(false);
  }

  function parseDueDateInput(value) {
    if (!value) return '';
    var trimmed = value.trim();
    var isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (isoMatch) return formatDateAr(trimmed);
    var slashMatch = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (slashMatch) {
      var mm = slashMatch[1].padStart(2, '0');
      var dd = slashMatch[2].padStart(2, '0');
      return formatDateAr(slashMatch[3] + '-' + mm + '-' + dd);
    }
    return trimmed;
  }

  function publishNewAssignment() {
    if (!grid) return;
    var titleEl = document.getElementById('assignTitle');
    var dateEl = document.getElementById('assignDate');
    var gradeEl = document.getElementById('assignGrade');
    var title = titleEl ? titleEl.value.trim() : '';
    if (!title) {
      toast('يرجى إدخال عنوان الواجب', 'info');
      if (titleEl) titleEl.focus();
      return;
    }
    var dueText = dateEl ? parseDueDateInput(dateEl.value) : '';
    var maxGrade = gradeEl && gradeEl.value ? gradeEl.value : '100';
    var card = document.createElement('article');
    card.className = 'td-assign-page-card';
    card.innerHTML =
      '<div class="td-assign-page-card-top">' +
        '<span class="td-assign-card-badge is-active">نشط</span>' +
        '<button type="button" class="td-assign-page-card-menu" aria-label="خيارات"><i class="bi bi-three-dots"></i></button>' +
      '</div>' +
      '<h4></h4>' +
      '<p class="td-assign-page-card-sub">الصف الثاني عشر — أدبي</p>' +
      '<div class="td-assign-page-card-metrics">' +
        '<div class="td-assign-page-card-stats">' +
          '<span><i class="bi bi-people"></i> 0 / 50</span>' +
          '<span><i class="bi bi-star"></i> متوسط: —/' + maxGrade + '</span>' +
        '</div>' +
        '<div class="td-health-bar td-assign-page-card-bar"><span style="width:0%"></span></div>' +
      '</div>' +
      (dueText
        ? '<p class="td-assign-page-card-date"><i class="bi bi-calendar3"></i> الموعد النهائي: ' + dueText + '</p>'
        : '') +
      '<div class="td-assign-page-card-bottom">' +
        '<div class="td-assign-page-card-divider" aria-hidden="true"></div>' +
        '<div class="td-assign-page-card-foot">' +
          '<button type="button" class="td-assign-page-card-trash" aria-label="حذف"><i class="bi bi-trash3"></i></button>' +
          '<button type="button" class="sd-btn-primary td-assign-page-card-btn">مراجعة التسليمات</button>' +
        '</div>' +
      '</div>';
    card.querySelector('h4').textContent = title;
    grid.insertBefore(card, grid.firstChild);
    closeCreateModal();
    toast('تم نشر الواجب بنجاح', 'success');
  }

  if (openAssignBtn) {
    openAssignBtn.addEventListener('click', function (e) {
      e.preventDefault();
      openCreateModal();
    });
  }

  if (assignModal) {
    assignModal.querySelectorAll('[data-td-close-modal]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        closeCreateModal();
      });
    });
  }

  function previewFile(opts) {
    var shell = ui();
    if (shell && shell.previewFile) {
      shell.previewFile(opts);
      return;
    }
    modal({
      title: opts.title || 'معاينة الملف',
      body: '<p class="sd-ui-modal-text">' + (opts.meta || 'معاينة تجريبية للملف.') + '</p>',
      actions: [{ label: 'إغلاق', primary: true }]
    });
  }

  function cardTitle(card) {
    var title = card && card.querySelector('h4');
    return title ? title.textContent.trim() : 'الواجب';
  }

  function closeMenus(except) {
    root.querySelectorAll('.td-class-menu-popover').forEach(function (menu) {
      if (menu !== except) menu.remove();
    });
  }

  function showReviewPanel(card) {
    if (!layout || !reviewPanel) return;
    layout.classList.remove('is-panel-hidden');
    reviewPanel.hidden = false;
    var subtitle = reviewPanel.querySelector('.td-review-panel-head p');
    if (subtitle && card) subtitle.textContent = cardTitle(card);
    if (window.innerWidth <= 991) {
      reviewPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function hideReviewPanel() {
    if (layout) layout.classList.add('is-panel-hidden');
    if (reviewPanel) reviewPanel.hidden = true;
  }

  function setViewMode(btn) {
    var toggle = btn.closest('.td-assign-view-toggle');
    if (!toggle || !grid) return;
    toggle.querySelectorAll('button').forEach(function (b) {
      b.classList.remove('is-active');
    });
    btn.classList.add('is-active');
    var isList = !!btn.querySelector('.bi-list-ul');
    grid.classList.toggle('is-list', isList);
  }

  function openCardMenu(btn) {
    closeMenus();
    var card = btn.closest('.td-assign-page-card');
    if (!card) return;

    var isDraft = card.classList.contains('td-assign-page-card--draft');
    var wrap = btn.closest('.td-assign-page-card-top');
    if (!wrap) return;

    var menu = document.createElement('div');
    menu.className = 'td-class-menu-popover td-assign-card-menu-popover';
    menu.setAttribute('role', 'menu');
    menu.innerHTML =
      (isDraft
        ? '<button type="button" role="menuitem" data-td-assign-action="edit">تعديل المسودة</button>' +
          '<button type="button" role="menuitem" data-td-assign-action="publish">نشر الواجب</button>'
        : '<button type="button" role="menuitem" data-td-assign-action="review">مراجعة التسليمات</button>' +
          '<button type="button" role="menuitem" data-td-assign-action="duplicate">نسخ الواجب</button>') +
      '<button type="button" role="menuitem" data-td-assign-action="archive">أرشفة</button>' +
      '<button type="button" role="menuitem" data-td-assign-action="delete">حذف الواجب</button>';

    wrap.style.position = 'relative';
    wrap.appendChild(menu);
  }

  function handleMenuAction(actionType, card) {
    if (!card) return;

    if (actionType === 'review') {
      showReviewPanel(card);
      return;
    }
    if (actionType === 'edit') {
      openEditModal(card);
      return;
    }
    if (actionType === 'publish') {
      publishDraft(card);
      return;
    }
    if (actionType === 'duplicate') {
      duplicateCard(card);
      return;
    }
    if (actionType === 'archive') {
      archiveCard(card);
      return;
    }
    if (actionType === 'delete') {
      deleteCard(card);
    }
  }

  function duplicateCard(card) {
    if (!grid) return;
    var clone = card.cloneNode(true);
    clone.querySelectorAll('.td-class-menu-popover').forEach(function (menu) {
      menu.remove();
    });
    clone.style.opacity = '';
    clone.style.transform = '';
    clone.classList.remove('is-archived');
    var title = clone.querySelector('h4');
    if (title) title.textContent = cardTitle(card) + ' (نسخة)';
    var badge = clone.querySelector('.td-assign-card-badge');
    if (badge && badge.classList.contains('is-done')) {
      badge.className = 'td-assign-card-badge is-active';
      badge.textContent = 'نشط';
    }
    grid.appendChild(clone);
    toast('تم نسخ «' + cardTitle(card) + '»', 'success');
  }

  function archiveCard(card) {
    confirm({
      title: 'أرشفة الواجب',
      message: 'هل تريد أرشفة «' + cardTitle(card) + '»؟ سيُخفى من الواجبات النشطة.',
      confirmText: 'أرشفة',
      onConfirm: function () {
        card.classList.add('is-archived');
        var badge = card.querySelector('.td-assign-card-badge');
        if (badge) {
          badge.className = 'td-assign-card-badge is-done';
          badge.textContent = 'مؤرشف';
        }
        var primaryBtn = card.querySelector('.td-assign-page-card-btn');
        if (primaryBtn && primaryBtn.textContent.indexOf('مراجعة') !== -1) {
          primaryBtn.textContent = 'عرض النتائج';
        }
        card.style.opacity = '0.72';
        toast('تم أرشفة «' + cardTitle(card) + '»', 'success');
      }
    });
  }

  function deleteCard(card) {
    confirm({
      title: 'حذف الواجب',
      message: 'هل تريد حذف «' + cardTitle(card) + '»؟ لا يمكن التراجع عن هذا الإجراء.',
      confirmText: 'حذف',
      onConfirm: function () {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.98)';
        window.setTimeout(function () {
          card.remove();
          toast('تم حذف الواجب', 'success');
        }, 180);
      }
    });
  }

  function openEditModal(card) {
    modal({
      title: 'تعديل الواجب',
      body:
        '<p class="sd-ui-modal-text">تعديل «<strong>' + cardTitle(card) + '</strong>»</p>' +
        '<label class="sd-ui-modal-text" style="display:block;margin-top:12px">عنوان الواجب</label>' +
        '<input type="text" id="tdAssignEditTitle" class="td-modal-input" value="' + cardTitle(card) + '" style="width:100%;border:1px solid #e8ecf4;border-radius:8px;padding:10px;font-family:Cairo,sans-serif">' +
        '<label class="sd-ui-modal-text" style="display:block;margin-top:12px">الموعد النهائي</label>' +
        '<input type="date" id="tdAssignEditDate" class="td-modal-input" value="2024-05-24" style="width:100%;border:1px solid #e8ecf4;border-radius:8px;padding:10px;font-family:Cairo,sans-serif">',
      actions: [
        {
          label: 'حفظ التعديلات',
          primary: true,
          onClick: function () {
            var titleInput = document.getElementById('tdAssignEditTitle');
            var dateInput = document.getElementById('tdAssignEditDate');
            if (titleInput) {
              var h4 = card.querySelector('h4');
              if (h4 && titleInput.value.trim()) h4.textContent = titleInput.value.trim();
            }
            if (dateInput && dateInput.value) {
              var dateEl = card.querySelector('.td-assign-page-card-date');
              var formatted = formatDateAr(dateInput.value);
              if (dateEl) {
                dateEl.innerHTML = '<i class="bi bi-calendar3"></i> الموعد النهائي: ' + formatted;
              } else {
                var newDate = document.createElement('p');
                newDate.className = 'td-assign-page-card-date';
                newDate.innerHTML = '<i class="bi bi-calendar3"></i> الموعد النهائي: ' + formatted;
                var bottom = card.querySelector('.td-assign-page-card-bottom');
                if (bottom) bottom.before(newDate);
              }
            }
            toast('تم حفظ تعديلات الواجب', 'success');
          }
        },
        { label: 'إلغاء' }
      ]
    });
  }

  function publishDraft(card) {
    confirm({
      title: 'نشر الواجب',
      message: 'هل تريد نشر «' + cardTitle(card) + '» للطلاب الآن؟',
      confirmText: 'نشر الآن',
      onConfirm: function () {
        card.classList.remove('td-assign-page-card--draft');
        var badge = card.querySelector('.td-assign-card-badge');
        if (badge) {
          badge.className = 'td-assign-card-badge is-active';
          badge.textContent = 'نشط';
        }
        var empty = card.querySelector('.td-assign-page-card-empty');
        if (empty) {
          var metrics = document.createElement('div');
          metrics.className = 'td-assign-page-card-metrics';
          metrics.innerHTML =
            '<div class="td-assign-page-card-stats">' +
              '<span><i class="bi bi-people"></i> 0 / 50</span>' +
              '<span><i class="bi bi-star"></i> متوسط: —</span>' +
            '</div>' +
            '<div class="td-health-bar td-assign-page-card-bar"><span style="width:0%"></span></div>';
          empty.replaceWith(metrics);
          var date = document.createElement('p');
          date.className = 'td-assign-page-card-date';
          date.innerHTML = '<i class="bi bi-calendar3"></i> الموعد النهائي: 24 مايو 2024';
          card.querySelector('.td-assign-page-card-bottom').before(date);
        }
        var publishBtn = card.querySelector('.td-assign-page-card-btn');
        if (publishBtn) publishBtn.textContent = 'مراجعة التسليمات';
        var editBtn = card.querySelector('.td-assign-page-card-edit');
        if (editBtn) {
          var trash = document.createElement('button');
          trash.type = 'button';
          trash.className = 'td-assign-page-card-trash';
          trash.setAttribute('aria-label', 'حذف');
          trash.innerHTML = '<i class="bi bi-trash3"></i>';
          editBtn.replaceWith(trash);
        }
        toast('تم نشر الواجب بنجاح', 'success');
      }
    });
  }

  function showResultsModal(card) {
    modal({
      title: 'نتائج «' + cardTitle(card) + '»',
      body:
        '<ul class="sd-ui-result-list">' +
          '<li><span>عدد التسليمات</span><strong>48 / 48</strong></li>' +
          '<li><span>متوسط الدرجات</span><strong>9.2 / 10</strong></li>' +
          '<li><span>أعلى درجة</span><strong>10 / 10</strong></li>' +
          '<li><span>أدنى درجة</span><strong>7.5 / 10</strong></li>' +
        '</ul>' +
        '<p class="sd-ui-modal-text">تم تصحيح جميع التسليمات ويمكنك تحميل التقرير الكامل.</p>',
      actions: [
        {
          label: 'تحميل التقرير',
          primary: true,
          onClick: function () {
            download('تقرير_' + cardTitle(card) + '.pdf', true);
          }
        },
        { label: 'إغلاق' }
      ]
    });
  }

  function submissionBadge(status) {
    if (status === 'graded') return '<span class="td-submission-badge is-graded">تم التصحيح</span>';
    if (status === 'pending') return '<span class="td-submission-badge is-pending">بانتظار المراجعة</span>';
    return '<span class="td-submission-badge is-missing">لم يسلم بعد</span>';
  }

  function submissionGradeRow(data) {
    if (data.status === 'missing') {
      return '<button type="button" class="td-submission-alert">إرسال تنبيه للطالب</button>';
    }
    var value = data.grade ? ' value="' + data.grade + '"' : '';
    var placeholder = data.grade ? '' : ' placeholder="أدخل الدرجة"';
    var btnClass = data.status === 'graded' ? 'td-submission-save' : 'td-submission-grade-btn';
    var btnLabel = data.status === 'graded' ? 'حفظ' : 'تصحيح';
    return (
      '<div class="td-submission-grade">' +
        '<div class="td-submission-grade-field">' +
          '<input type="text"' + value + placeholder + ' aria-label="الدرجة">' +
          '<span>/ 10</span>' +
        '</div>' +
        '<button type="button" class="sd-btn-primary ' + btnClass + '">' + btnLabel + '</button>' +
      '</div>'
    );
  }

  function submissionFileRow(data) {
    if (data.status === 'missing') return '';
    var actionLabel = data.status === 'pending' ? 'عرض' : 'تحميل';
    var actionIcon = data.status === 'pending' ? 'bi-eye' : 'bi-download';
    return (
      '<div class="td-submission-file-box">' +
        '<i class="bi ' + data.icon + '"></i>' +
        '<div><strong>' + data.file + '</strong><span>' + data.size + '</span></div>' +
        '<button type="button" aria-label="' + actionLabel + '"><i class="bi ' + actionIcon + '"></i></button>' +
      '</div>'
    );
  }

  function buildSubmissionItem(data, extra) {
    var itemClass = 'td-submission-item';
    if (data.status === 'graded') itemClass += ' is-graded';
    if (data.status === 'missing') itemClass += ' is-missing';
    if (extra) itemClass += ' td-submission-item--extra';
    var timeHtml = data.time ? '<time>' + data.time + '</time>' : '';
    return (
      '<div class="' + itemClass + '"' + (extra ? ' hidden' : '') + '>' +
        '<div class="td-submission-head">' +
          '<div class="td-submission-user">' +
            '<img src="images/shared/avatars/ahmed.jpg" alt="">' +
            '<div><strong>' + data.name + '</strong>' + timeHtml + '</div>' +
          '</div>' +
          submissionBadge(data.status) +
        '</div>' +
        submissionFileRow(data) +
        submissionGradeRow(data) +
      '</div>'
    );
  }

  function loadExtraSubmissions() {
    if (!reviewList || reviewList.dataset.extrasLoaded) return;
    var html = EXTRA_SUBMISSIONS.map(function (item) {
      return buildSubmissionItem(item, true);
    }).join('');
    reviewList.insertAdjacentHTML('beforeend', html);
    reviewList.dataset.extrasLoaded = '1';
  }

  function toggleAllSubmissions() {
    if (!reviewPanel || !reviewList || !reviewAllBtn) return;
    loadExtraSubmissions();
    var expanded = reviewPanel.classList.toggle('is-expanded');
    reviewAllBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    reviewList.querySelectorAll('.td-submission-item--extra').forEach(function (item) {
      item.hidden = !expanded;
    });
    if (expanded) {
      reviewAllBtn.textContent = 'عرض أقل';
      reviewList.scrollTop = 0;
    } else {
      reviewAllBtn.textContent = 'عرض جميع التسليمات (42)';
      reviewList.scrollTop = 0;
    }
  }

  function saveGrade(btn) {
    var row = btn.closest('.td-submission-grade');
    if (!row) return;
    var input = row.querySelector('.td-submission-grade-field input') || row.querySelector('input');
    if (!input || !input.value.trim()) {
      toast('يرجى إدخال الدرجة', 'info');
      input && input.focus();
      return;
    }
    var value = parseFloat(input.value.replace(',', '.'));
    if (isNaN(value) || value < 0 || value > 10) {
      toast('الدرجة يجب أن تكون بين 0 و 10', 'info');
      return;
    }
    input.value = String(value);
    var item = btn.closest('.td-submission-item');
    if (item) {
      item.classList.add('is-graded');
      var badge = item.querySelector('.td-submission-badge');
      if (badge) {
        badge.className = 'td-submission-badge is-graded';
        badge.textContent = 'تم التصحيح';
      }
    }
    if (btn.classList.contains('td-submission-grade-btn')) {
      btn.className = 'sd-btn-primary td-submission-save';
      btn.textContent = 'حفظ';
    }
    toast('تم حفظ الدرجة', 'success');
  }

  function handleFileAction(btn) {
    var box = btn.closest('.td-submission-file-box');
    if (!box) return;
    var nameEl = box.querySelector('strong');
    var metaEl = box.querySelector('span');
    var fileName = nameEl ? nameEl.textContent.trim() : 'ملف_الواجب';
    var label = (btn.getAttribute('aria-label') || '').trim();

    if (label === 'عرض') {
      previewFile({
        title: fileName,
        meta: metaEl ? metaEl.textContent.trim() : '',
        text: 'معاينة تسليم الطالب ضمن المنصة.'
      });
      return;
    }
    // تنزيل الملف بدون إشعار
  }

  function focusReviewPanel() {
    var firstCard = grid && grid.querySelector('.td-assign-page-card:not(.td-assign-page-card--draft)');
    showReviewPanel(firstCard);
    if (reviewList) {
      var pending = reviewList.querySelector('.td-submission-item:not(.is-graded):not(.is-missing)');
      if (pending) pending.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function showUpcomingDeadlines() {
    modal({
      title: 'مواعيد تسليم قادمة',
      body:
        '<ul class="sd-ui-result-list">' +
          '<li><span>تحليل نص المتنبي</span><strong>اليوم، 11:59 م</strong></li>' +
          '<li><span>البلاغة: التشبيه البليغ</span><strong>غداً، 8:00 م</strong></li>' +
          '<li><span>قواعد الاستثناء</span><strong>25 مايو 2024</strong></li>' +
        '</ul>',
      actions: [{ label: 'حسناً', primary: true }]
    });
  }

  function showStatsSummary() {
    modal({
      title: 'ملخص الواجبات',
      body:
        '<ul class="sd-ui-result-list">' +
          '<li><span>الواجبات النشطة</span><strong>24</strong></li>' +
          '<li><span>متوسط نسبة التسليم</span><strong>87%</strong></li>' +
          '<li><span>مهام تحتاج تصحيح</span><strong>15</strong></li>' +
          '<li><span>النمو عن الشهر الماضي</span><strong>+12%</strong></li>' +
        '</ul>',
      actions: [{ label: 'حسناً', primary: true }]
    });
  }
  function sendAlert(btn) {
    btn.disabled = true;
    btn.textContent = 'تم إرسال التنبيه';
    toast('تم إرسال تنبيه للطالب', 'success');
    window.setTimeout(function () {
      btn.disabled = false;
      btn.textContent = 'إرسال تنبيه للطالب';
    }, 3000);
  }

  document.addEventListener('click', function (e) {
    var target = e.target;

    var menuAction = target.closest('[data-td-assign-action]');
    if (menuAction && root.contains(menuAction)) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      var actionCard = menuAction.closest('.td-assign-page-card');
      closeMenus();
      handleMenuAction(menuAction.getAttribute('data-td-assign-action'), actionCard);
      return;
    }

    if (!contentRoot || !contentRoot.contains(target)) {
      if (!target.closest('.td-class-menu-popover, .td-assign-card-menu-popover')) closeMenus();
      return;
    }

    if (!target.closest('.td-assign-page-card-menu') && !target.closest('.td-class-menu-popover')) {
      closeMenus();
    }

    var viewBtn = target.closest('.td-assign-view-toggle button');
    if (viewBtn) {
      e.preventDefault();
      e.stopPropagation();
      setViewMode(viewBtn);
      return;
    }

    var menuBtn = target.closest('.td-assign-page-card-menu');
    if (menuBtn) {
      e.preventDefault();
      e.stopPropagation();
      var existing = menuBtn.closest('.td-assign-page-card-top').querySelector('.td-assign-card-menu-popover');
      if (existing) {
        existing.remove();
        return;
      }
      openCardMenu(menuBtn);
      return;
    }

    var trashBtn = target.closest('.td-assign-page-card-trash');
    if (trashBtn) {
      e.preventDefault();
      e.stopPropagation();
      deleteCard(trashBtn.closest('.td-assign-page-card'));
      return;
    }

    var downloadBtn = target.closest('.td-assign-page-card-download');
    if (downloadBtn) {
      e.preventDefault();
      e.stopPropagation();
      download('نتائج_' + cardTitle(downloadBtn.closest('.td-assign-page-card')) + '.zip', true);
      return;
    }

    var editBtn = target.closest('.td-assign-page-card-edit');
    if (editBtn) {
      e.preventDefault();
      e.stopPropagation();
      openEditModal(editBtn.closest('.td-assign-page-card'));
      return;
    }

    var cardBtn = target.closest('.td-assign-page-card-btn');
    if (cardBtn) {
      e.preventDefault();
      e.stopPropagation();
      var card = cardBtn.closest('.td-assign-page-card');
      var label = cardBtn.textContent.trim();
      if (label.indexOf('نشر') !== -1) {
        publishDraft(card);
      } else if (label.indexOf('مراجعة') !== -1) {
        showReviewPanel(card);
      } else if (label.indexOf('نتائج') !== -1) {
        showResultsModal(card);
      }
      return;
    }

    var panelClose = target.closest('.td-review-panel-close');
    if (panelClose) {
      e.preventDefault();
      e.stopPropagation();
      hideReviewPanel();
      return;
    }

    var gradeBtn = target.closest('.td-submission-save, .td-submission-grade-btn');
    if (gradeBtn) {
      e.preventDefault();
      e.stopPropagation();
      saveGrade(gradeBtn);
      return;
    }

    var fileBtn = target.closest('.td-submission-file-box button[aria-label]');
    if (fileBtn) {
      e.preventDefault();
      e.stopPropagation();
      handleFileAction(fileBtn);
      return;
    }

    var alertBtn = target.closest('.td-submission-alert');
    if (alertBtn) {
      e.preventDefault();
      e.stopPropagation();
      sendAlert(alertBtn);
      return;
    }

    var allBtn = target.closest('.td-review-panel-all');
    if (allBtn) {
      e.preventDefault();
      e.stopPropagation();
      toggleAllSubmissions();
      return;
    }

    var publishBtn = target.closest('.td-assign-publish');
    if (publishBtn && assignModal && !assignModal.hidden) {
      e.preventDefault();
      e.stopPropagation();
      publishNewAssignment();
      return;
    }

    var statTotal = target.closest('.td-assign-page-stat--total, .td-assign-page-stat--rate');
    if (statTotal) {
      e.preventDefault();
      e.stopPropagation();
      showStatsSummary();
      return;
    }

    var statMini = target.closest('.td-assign-page-stat-mini');
    if (statMini) {
      e.preventDefault();
      e.stopPropagation();
      if (statMini.classList.contains('is-primary')) {
        focusReviewPanel();
      } else {
        showUpcomingDeadlines();
      }
      return;
    }
  }, true);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (assignModal && !assignModal.hidden) closeCreateModal();
      closeMenus();
    }
    if (e.key === 'Enter' && e.target.matches('.td-submission-grade-field input')) {
      var gradeRow = e.target.closest('.td-submission-grade');
      var submitBtn = gradeRow && gradeRow.querySelector('.td-submission-save, .td-submission-grade-btn');
      if (submitBtn) {
        e.preventDefault();
        saveGrade(submitBtn);
      }
    }
  });
})();
