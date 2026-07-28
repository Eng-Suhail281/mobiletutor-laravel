document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.auth-input-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = btn.closest('.auth-input-wrap').querySelector('input');
      if (!input) return;
      var isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.querySelector('i').className = isPassword ? 'bi bi-eye' : 'bi bi-eye-slash';
    });
  });

  var gradeGrid = document.getElementById('gradeGrid');
  var specialtyField = document.getElementById('specialtyField');
  var gradeSelect = document.getElementById('gradeSelect');
  var specialtySelect = document.getElementById('specialty');
  var majorSelect = document.getElementById('majorSelect');
  var nextBtn = document.getElementById('setupNextBtn');
  var photoInput = document.getElementById('profilePhoto');
  var hasPhoto = false;

  function gradeNeedsTrack(grade) {
    return grade === 11 || grade === 12;
  }

  function updateSpecialtyField(grade) {
    if (!specialtyField) return;

    var showField = gradeNeedsTrack(grade);
    specialtyField.classList.toggle('is-visible', showField);

    if (specialtySelect) {
      var shariaOption = specialtySelect.querySelector('option[value="sharia"]');
      if (shariaOption) {
        shariaOption.hidden = grade === 11;
        shariaOption.disabled = grade === 11;
      }

      if (!showField || (grade === 11 && specialtySelect.value === 'sharia')) {
        specialtySelect.selectedIndex = 0;
      }
    }
  }

  function validateProfileForm() {
    if (!nextBtn) return;

    var grade = gradeSelect ? parseInt(gradeSelect.value, 10) : null;
    var needsTrack = gradeNeedsTrack(grade);
    var trackOk = !needsTrack || (specialtySelect && specialtySelect.value);
    var gradeOk = !gradeSelect || gradeSelect.value;
    var majorOk = !majorSelect || majorSelect.value;
    var photoOk = !photoInput || hasPhoto;

    if (gradeSelect) {
      nextBtn.disabled = !(photoOk && gradeOk && trackOk);
    } else if (majorSelect) {
      nextBtn.disabled = !(photoOk && majorOk);
    } else if (photoInput) {
      nextBtn.disabled = !photoOk;
    }
  }

  if (gradeGrid) {
    gradeGrid.querySelectorAll('.auth-grade-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        gradeGrid.querySelectorAll('.auth-grade-btn').forEach(function (b) {
          b.classList.remove('is-selected');
        });
        btn.classList.add('is-selected');
        if (specialtyField) {
          var grade = parseInt(btn.getAttribute('data-grade'), 10);
          updateSpecialtyField(grade);
        }
        validateProfileForm();
      });
    });
  }

  if (gradeSelect) {
    gradeSelect.addEventListener('change', function () {
      var grade = parseInt(gradeSelect.value, 10);
      updateSpecialtyField(grade);
      validateProfileForm();
    });
  }

  if (specialtySelect) {
    specialtySelect.addEventListener('change', validateProfileForm);
  }

  if (majorSelect) {
    majorSelect.addEventListener('change', validateProfileForm);
  }

  if (nextBtn) {
    var nextUrl = nextBtn.getAttribute('data-next') || 'index.html';
    nextBtn.addEventListener('click', function () {
      if (nextBtn.disabled) return;
      window.location.href = nextUrl;
    });
  }

  document.querySelectorAll('.auth-file-upload').forEach(function (wrap) {
    var input = wrap.querySelector('input[type="file"]');
    var label = wrap.querySelector('.auth-file-label');
    if (!input || !label) return;
    wrap.addEventListener('click', function () { input.click(); });
    input.addEventListener('change', function () {
      if (input.files && input.files[0]) {
        label.textContent = input.files[0].name;
        label.style.color = '#374151';
      }
    });
  });

  document.querySelectorAll('.auth-upload-box').forEach(function (box) {
    var input = box.querySelector('input[type="file"]');
    var label = box.querySelector('.auth-upload-label');
    if (!input) return;
    box.addEventListener('click', function () { input.click(); });
    input.addEventListener('change', function () {
      if (input.files && input.files[0]) {
        box.classList.add('has-file');
        if (label) label.textContent = input.files[0].name;
        hasPhoto = true;
        validateProfileForm();
      }
    });
  });

  document.querySelectorAll('.auth-avatar-circle').forEach(function (circle) {
    var input = circle.querySelector('input[type="file"]');
    if (!input) return;
    circle.addEventListener('click', function (e) {
      if (e.target !== input) input.click();
    });
    input.addEventListener('change', function () {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          var existing = circle.querySelector('img');
          if (existing) existing.remove();
          var img = document.createElement('img');
          img.src = e.target.result;
          img.alt = 'صورة شخصية';
          circle.insertBefore(img, circle.firstChild);
          circle.classList.add('has-photo');
        };
        reader.readAsDataURL(input.files[0]);
        hasPhoto = true;
        validateProfileForm();
      }
    });
  });

  document.querySelectorAll('[data-setup-next]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      window.location.href = btn.getAttribute('data-setup-next');
    });
  });

  var registerStudentForm = document.querySelector('form[action="student-setup.html"]');
  if (registerStudentForm) {
    var setupTrack = new URLSearchParams(window.location.search).get('track');
    if (setupTrack === 'university') {
      registerStudentForm.setAttribute('action', 'student-setup-university.html');
    }
  }

  var forgotForm = document.querySelector('.auth-forgot-page form');
  if (forgotForm) {
    var forgotHint = document.getElementById('forgotHint');
    var forgotResend = document.getElementById('forgotResend');
    var forgotEmail = forgotForm.querySelector('#email');

    function showForgotSentState() {
      if (forgotEmail && !forgotEmail.value.trim()) {
        forgotEmail.focus();
        return;
      }
      if (forgotHint) forgotHint.hidden = false;
      if (forgotResend) forgotResend.hidden = false;
    }

    forgotForm.addEventListener('submit', function (e) {
      e.preventDefault();
      showForgotSentState();
    });

    var resendLink = forgotResend ? forgotResend.querySelector('a') : null;
    if (resendLink) {
      resendLink.addEventListener('click', function (e) {
        e.preventDefault();
        showForgotSentState();
      });
    }
  }

  var loginForm = document.getElementById('loginForm');
  if (loginForm) {
    var roleInput = document.getElementById('loginRole');
    var roleButtons = document.querySelectorAll('.auth-role-switch-btn');

    function setLoginRole(role) {
      if (roleInput) roleInput.value = role;
      roleButtons.forEach(function (btn) {
        btn.classList.toggle('is-active', btn.getAttribute('data-role') === role);
      });
    }

    var params = new URLSearchParams(window.location.search);
    if (params.get('role') === 'teacher') {
      setLoginRole('teacher');
    }

    roleButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLoginRole(btn.getAttribute('data-role'));
      });
    });

    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var role = roleInput ? roleInput.value : 'student';
      window.location.href = role === 'teacher' ? 'teacher-dashboard.html' : 'student-dashboard.html';
    });
  }
});
