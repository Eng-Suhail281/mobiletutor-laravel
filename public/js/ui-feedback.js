/* Minimal toast/modal/confirm for pages without student-ui.js */
(function () {
  if (window.SDUI && typeof window.SDUI.toast === 'function') return;

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

  function closeModal() {
    var modal = document.getElementById('sdUiModal');
    if (modal) modal.hidden = true;
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

    actionsEl.querySelectorAll('[data-sd-action]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(btn.getAttribute('data-sd-action'), 10);
        var action = (opts.actions || [])[idx];
        closeModal();
        if (action && action.onClick) action.onClick();
      });
    });

    modalEl.hidden = false;
  }

  function confirm(opts) {
    modal({
      title: opts.title || 'تأكيد',
      body: '<p class="sd-ui-modal-text">' + (opts.message || '') + '</p>',
      actions: [
        {
          label: opts.confirmText || 'تأكيد',
          primary: true,
          onClick: function () {
            if (opts.onConfirm) opts.onConfirm();
          }
        },
        { label: opts.cancelText || 'إلغاء' }
      ]
    });
  }

  window.SDUI = {
    toast: toast,
    notice: notice,
    modal: modal,
    confirm: confirm,
    download: function (name) {
      toast('جاري تحميل «' + (name || 'الملف') + '»…', 'success');
    },
    joinSession: function (title) {
      toast('جاري فتح «' + (title || 'الحصة') + '»…', 'success');
    }
  };
})();
