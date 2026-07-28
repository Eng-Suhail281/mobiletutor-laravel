(function () {
  var ui = window.SDUI;

  var channelGroup = document.getElementById('channelGroup');
  if (channelGroup) {
    channelGroup.addEventListener('click', function (e) {
      var btn = e.target.closest('.sd-settings-channel');
      if (!btn) return;
      channelGroup.querySelectorAll('.sd-settings-channel').forEach(function (el) {
        el.classList.remove('is-active');
      });
      btn.classList.add('is-active');
      if (ui) ui.toast('تم حفظ قناة الإشعار المفضلة', 'success');
    });
  }

  document.querySelectorAll('.sd-settings-switch input').forEach(function (input) {
    input.addEventListener('change', function () {
      if (ui) ui.toast('تم حفظ التفضيل', 'success');
    });
  });

  document.querySelectorAll('.sd-settings-link-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.textContent.indexOf('تغيير') !== -1) {
        ui.modal({
          title: 'تغيير كلمة المرور',
          body:
            '<form class="sd-settings-form" id="passwordForm">' +
              '<label>كلمة المرور الحالية<input type="password" required></label>' +
              '<label>كلمة المرور الجديدة<input type="password" required></label>' +
              '<label>تأكيد كلمة المرور<input type="password" required></label>' +
            '</form>',
          actions: [
            { label: 'حفظ', primary: true, onClick: function () { ui.toast('تم تحديث كلمة المرور', 'success'); } },
            { label: 'إلغاء' }
          ]
        });
      } else if (btn.textContent.indexOf('إنهاء') !== -1) {
        ui.confirm({
          title: 'إنهاء الجلسة',
          message: 'سيتم تسجيل خروج iPhone 15 Pro من حسابك.',
          confirmText: 'إنهاء الجلسة',
          onConfirm: function () { ui.toast('تم إنهاء الجلسة', 'success'); }
        });
      }
    });
  });

  var dangerOutline = document.querySelector('.sd-settings-danger-outline');
  if (dangerOutline) {
    dangerOutline.addEventListener('click', function () {
      ui.confirm({
        title: 'تعطيل الحساب مؤقتاً',
        message: 'لن تتمكن من الدخول حتى إعادة التفعيل. هل تريد المتابعة؟',
        confirmText: 'تعطيل مؤقت',
        onConfirm: function () { ui.toast('تم تعطيل الحساب مؤقتاً', 'info'); }
      });
    });
  }

  var dangerDelete = document.querySelector('.sd-settings-danger-delete');
  if (dangerDelete) {
    dangerDelete.addEventListener('click', function () {
      ui.confirm({
        title: 'حذف الحساب نهائياً',
        message: 'هذا الإجراء لا يمكن التراجع عنه. سيتم حذف جميع بياناتك.',
        confirmText: 'حذف نهائي',
        onConfirm: function () { window.location.href = 'login.html'; }
      });
    });
  }
})();
