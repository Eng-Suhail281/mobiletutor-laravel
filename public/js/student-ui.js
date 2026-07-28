window.SDUI = (function () {
  var toastTimer;

  function ensureShell() {
    if (document.getElementById('sdUiShell')) return;
    var shell = document.createElement('div');
    shell.id = 'sdUiShell';
    shell.innerHTML =
      '<div class="sd-toast" id="sdToast" hidden role="status"></div>' +
      '<div class="sd-ui-modal" id="sdUiModal" hidden>' +
        '<div class="sd-ui-modal-backdrop" data-sd-close></div>' +
        '<div class="sd-ui-modal-dialog" role="dialog" aria-modal="true">' +
          '<div class="sd-ui-modal-header">' +
            '<button type="button" class="sd-ui-modal-close" data-sd-close aria-label="إغلاق"><i class="bi bi-x-lg"></i></button>' +
            '<h2 id="sdUiModalTitle"></h2>' +
          '</div>' +
          '<div id="sdUiModalBody" class="sd-ui-modal-body"></div>' +
          '<div id="sdUiModalActions" class="sd-ui-modal-actions"></div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(shell);

    document.getElementById('sdUiModal').addEventListener('click', function (e) {
      if (e.target.closest('[data-sd-close]')) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  function toast(msg, type) {
    notice(msg, type);
  }

  var noticeTimer;

  function notice(msg, type) {
    if (!msg) return;
    var el = document.getElementById('saPageNotice');
    if (!el) {
      el = document.createElement('div');
      el.id = 'saPageNotice';
      el.className = 'sa-page-notice';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.className = 'sa-page-notice sa-page-notice--' + (type || 'info');
    el.hidden = false;
    clearTimeout(noticeTimer);
    noticeTimer = window.setTimeout(function () {
      el.hidden = true;
    }, 2800);
  }

  function closeModal() {
    var modal = document.getElementById('sdUiModal');
    if (modal) modal.hidden = true;
  }

  function modal(opts) {
    ensureShell();
    var modalEl = document.getElementById('sdUiModal');
    var titleEl = document.getElementById('sdUiModalTitle');
    var bodyEl = document.getElementById('sdUiModalBody');
    var actionsEl = document.getElementById('sdUiModalActions');
    if (!modalEl || !titleEl || !bodyEl || !actionsEl) return;

    titleEl.textContent = opts.title || '';
    bodyEl.innerHTML = opts.body || '';
    actionsEl.innerHTML = (opts.actions || []).map(function (action, i) {
      var cls = action.primary ? 'sd-btn-primary' : 'sd-btn-outline';
      return '<button type="button" class="' + cls + '" data-sd-action="' + i + '">' + action.label + '</button>';
    }).join('');

    (opts.actions || []).forEach(function (action, i) {
      var btn = actionsEl.querySelector('[data-sd-action="' + i + '"]');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var result;
        if (action.onClick) result = action.onClick();
        if (result === false) return;
        if (action.close !== false) closeModal();
      });
    });

    modalEl.hidden = false;
  }

  function confirm(opts) {
    modal({
      title: opts.title || 'تأكيد',
      body: '<p class="sd-ui-modal-text">' + (opts.message || '') + '</p>',
      actions: [
        { label: opts.confirmText || 'تأكيد', primary: true, onClick: opts.onConfirm },
        { label: opts.cancelText || 'إلغاء', onClick: opts.onCancel }
      ]
    });
  }

  function previewFile(opts) {
    var image = opts.image
      ? '<img src="' + opts.image + '" alt="" class="sd-ui-preview-img">'
      : '<div class="sd-ui-preview-placeholder"><i class="bi bi-file-earmark-pdf"></i></div>';
    modal({
      title: opts.title || 'معاينة الملف',
      body:
        image +
        '<p class="sd-ui-modal-meta">' + (opts.meta || '') + '</p>' +
        '<p class="sd-ui-modal-text">' + (opts.text || 'هذا عرض تجريبي للملف ضمن المنصة.') + '</p>',
      actions: [
        { label: 'تحميل', primary: true, onClick: function () { download(opts.title, opts.meta); } },
        { label: 'إغلاق' }
      ]
    });
  }

  function previewCertificate(item) {
    modal({
      title: 'شهادة ' + item.subject,
      body:
        '<div class="sd-ui-cert-preview">' +
          '<img src="' + item.image + '" alt="' + item.subject + '">' +
          '<div><strong>' + item.subject + '</strong><span>' + item.grade + '</span><span>' + item.date + '</span></div>' +
        '</div>' +
        '<p class="sd-ui-modal-text">تهانينا! أكملت متطلبات هذه المادة بنجاح.</p>',
      actions: [
        { label: 'تحميل PDF', primary: true, onClick: function () { download('شهادة-' + item.subject + '.pdf'); toast('جاري تحميل الشهادة…', 'success'); } },
        { label: 'إغلاق' }
      ]
    });
  }

  function examResult(exam) {
    modal({
      title: 'نتيجة ' + exam.subject,
      body:
        '<div class="sd-ui-result-score"><strong>' + exam.score + '</strong><span>درجتك النهائية</span></div>' +
        '<ul class="sd-ui-result-list">' +
          '<li><span>الإجابات الصحيحة</span><strong>23 / 25</strong></li>' +
          '<li><span>الوقت المستغرق</span><strong>38 دقيقة</strong></li>' +
          '<li><span>الترتيب في الصف</span><strong>5 من 32</strong></li>' +
        '</ul>' +
        '<p class="sd-ui-modal-text">أداء ممتاز! راجع الأسئلة الخاطئة لتعزيز فهمك.</p>',
      actions: [
        { label: 'عرض الإجابات', primary: true, onClick: function () { toast('سيتم عرض تفاصيل الإجابات قريباً', 'info'); } },
        { label: 'العودة للاختبارات', onClick: function () { window.location.href = 'student-exams.html'; }, close: false }
      ]
    });
  }

  function download(name) {
    toast('تم بدء تحميل «' + (name || 'الملف') + '»', 'success');
  }

  function joinSession(title) {
    modal({
      title: 'الانضمام للحصة',
      body:
        '<p class="sd-ui-modal-text">أنت على وشك الدخول إلى:<br><strong>' + title + '</strong></p>' +
        '<p class="sd-ui-modal-meta">تأكد من اتصالك بالإنترنت وتفعيل الميكروفون إن لزم.</p>',
      actions: [
        { label: 'انضم الآن', primary: true, onClick: function () { toast('جاري فتح قاعة الحصة…', 'success'); } },
        { label: 'إلغاء' }
      ]
    });
  }

  function bookSlot(title) {
    toast('تم حجز «' + title + '» بنجاح', 'success');
  }

  function setReminder(title) {
    toast('سنذكّرك قبل «' + title + '»', 'success');
  }

  function getCardMeta(btn) {
    var card = btn.closest('.sd-file-card, .sd-lesson-file-row, .sd-attached-file-card, article');
    if (!card) return { title: 'ملف', meta: '' };
    var titleEl = card.querySelector('h4');
    var metaEl = card.querySelector('p');
    return {
      title: titleEl ? titleEl.textContent : 'ملف',
      meta: metaEl ? metaEl.textContent : ''
    };
  }

  function initDelegation() {
    document.addEventListener('click', function (e) {
      var viewBtn = e.target.closest('.sd-btn-file-outline, .sd-lesson-file-btn-outline, [data-sd-view]');
      if (viewBtn) {
        e.preventDefault();
        var meta = getCardMeta(viewBtn);
        previewFile({ title: meta.title, meta: meta.meta });
        return;
      }

      var dlBtn = e.target.closest('.sd-btn-file, .sd-lesson-file-btn-download, [data-sd-download]');
      if (dlBtn) {
        e.preventDefault();
        var fileMeta = getCardMeta(dlBtn);
        download(fileMeta.title);
      }
    });
  }

  ensureShell();
  initDelegation();

  return {
    toast: toast,
    notice: notice,
    modal: modal,
    confirm: confirm,
    closeModal: closeModal,
    previewFile: previewFile,
    previewCertificate: previewCertificate,
    examResult: examResult,
    download: download,
    joinSession: joinSession,
    bookSlot: bookSlot,
    setReminder: setReminder
  };
})();
