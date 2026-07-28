(function () {
  var ui = window.SDUI;

  document.querySelectorAll('.sd-profile-course').forEach(function (row) {
    row.addEventListener('click', function () {
      window.location.href = 'student-subject.html?id=' + (row.getAttribute('data-subject') || 'math');
    });
  });

  document.querySelectorAll('.sd-profile-achievement').forEach(function (el) {
    el.addEventListener('click', function () {
      window.location.href = el.getAttribute('data-link') || 'student-certificates.html';
    });
  });

  var editBtn = document.getElementById('editProfileBtn');
  if (editBtn && ui) {
    editBtn.addEventListener('click', function () {
      ui.modal({
        title: 'تعديل الملف الشخصي',
        body:
          '<form class="sd-settings-form" id="profileForm">' +
            '<label>الاسم كامل<input type="text" id="inputName" value="نور جبر"></label>' +
            '<label>البريد الإلكتروني<input type="email" id="inputEmail" value="noorjber@gmail.com"></label>' +
            '<label>رقم الهاتف<input type="tel" id="inputPhone" value="0567****40"></label>' +
            '<label>المرحلة الدراسية<input type="text" id="inputLevel" value="الصف الثاني عشر — علمي"></label>' +
            '<label>نبذة شخصية<textarea id="inputQuote" rows="3">«أؤمن أن التعليم هو مفتاح المستقبل، وكل يوم هو فرصة لأتعلم شيئاً جديداً»</textarea></label>' +
          '</form>',
        actions: [
          {
            label: 'حفظ التغييرات',
            primary: true,
            onClick: function () {
              var name = document.getElementById('inputName').value;
              var email = document.getElementById('inputEmail').value;
              var phone = document.getElementById('inputPhone').value;
              var level = document.getElementById('inputLevel').value;
              var quote = document.getElementById('inputQuote').value;
              document.getElementById('profileName').textContent = name;
              document.getElementById('profileQuote').textContent = quote;
              var levelEl = document.getElementById('profileRoleLevel');
              if (levelEl) levelEl.textContent = '(' + level + ')';
              document.getElementById('accountName').textContent = name;
              document.getElementById('accountEmail').textContent = email;
              document.getElementById('accountPhone').textContent = phone;
              document.getElementById('accountLevel').textContent = level;
              ui.toast('تم تحديث ملفك الشخصي', 'success');
            }
          },
          { label: 'إلغاء' }
        ]
      });
    });
  }
})();
