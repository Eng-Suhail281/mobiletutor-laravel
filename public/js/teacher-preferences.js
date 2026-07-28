(function () {
  if (!document.querySelector('.td-page-preferences')) return;

  var ui = window.SDUI;
  function toast(msg, type) {
    if (ui && ui.toast) ui.toast(msg, type || 'info');
  }
  function confirmDialog(opts) {
    if (ui && ui.confirm) ui.confirm(opts);
    else if (window.confirm(opts.message)) opts.onConfirm && opts.onConfirm();
  }
  function modal(opts) {
    if (ui && ui.modal) ui.modal(opts);
    else toast(opts.title || '');
  }

  document.querySelectorAll('.td-settings-link').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.textContent.indexOf('تغيير') !== -1) {
        modal({
          title: 'تغيير كلمة المرور',
          body:
            '<form class="sd-settings-form">' +
              '<label style="display:block;margin-bottom:10px">كلمة المرور الحالية<input type="password" style="width:100%;margin-top:4px;padding:8px;border:1px solid #e8ecf4;border-radius:8px"></label>' +
              '<label style="display:block;margin-bottom:10px">كلمة المرور الجديدة<input type="password" style="width:100%;margin-top:4px;padding:8px;border:1px solid #e8ecf4;border-radius:8px"></label>' +
            '</form>',
          actions: [
            { label: 'حفظ', primary: true, onClick: function () { toast('تم تحديث كلمة المرور', 'success'); } },
            { label: 'إلغاء' }
          ]
        });
      } else {
        confirmDialog({
          title: 'إنهاء الجلسة',
          message: 'سيتم تسجيل خروج هذا الجهاز من حسابك.',
          confirmText: 'إنهاء الجلسة',
          onConfirm: function () { toast('تم إنهاء الجلسة', 'success'); }
        });
      }
    });
  });

  document.querySelectorAll('.td-page-preferences .td-toggle input').forEach(function (input) {
    input.addEventListener('change', function () {
      toast('تم حفظ التفضيل', 'success');
    });
  });

  document.querySelectorAll('.td-channel-pill').forEach(function (pill) {
    pill.addEventListener('click', function () {
      document.querySelectorAll('.td-channel-pill').forEach(function (p) { p.classList.remove('is-active'); });
      pill.classList.add('is-active');
      toast('تم تحديث قناة الإشعار', 'success');
    });
  });

  var disableBtn = document.querySelector('.td-danger-btn-outline');
  var deleteBtn = document.querySelector('.td-danger-btn-delete');

  if (disableBtn) {
    disableBtn.addEventListener('click', function () {
      confirmDialog({
        title: 'تعطيل الحساب مؤقتاً',
        message: 'لن تتمكن من الدخول حتى إعادة التفعيل.',
        confirmText: 'تعطيل',
        onConfirm: function () { toast('تم تعطيل الحساب مؤقتاً', 'info'); }
      });
    });
  }

  if (deleteBtn) {
    deleteBtn.addEventListener('click', function () {
      confirmDialog({
        title: 'حذف الحساب نهائياً',
        message: 'هذا الإجراء لا يمكن التراجع عنه.',
        confirmText: 'حذف نهائي',
        onConfirm: function () { window.location.href = 'login.html'; }
      });
    });
  }
})();
