(function () {
  var toggle = document.getElementById('sdMenuToggle');
  var sidebar = document.getElementById('sdSidebar');
  var backdrop = document.createElement('button');
  backdrop.className = 'sd-sidebar-backdrop';
  backdrop.type = 'button';
  backdrop.hidden = true;
  backdrop.setAttribute('aria-label', 'إغلاق القائمة');
  document.body.appendChild(backdrop);

  function setSidebar(open) {
    if (!sidebar) return;
    sidebar.classList.toggle('is-open', open);
    backdrop.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (toggle && sidebar) {
    toggle.addEventListener('click', function () {
      setSidebar(!sidebar.classList.contains('is-open'));
    });

    backdrop.addEventListener('click', function () {
      setSidebar(false);
    });

    sidebar.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setSidebar(false);
      });
    });
  } else {
    backdrop.remove();
  }

  var profileToggle = document.getElementById('sdProfileToggle');
  var profileDropdown = document.getElementById('sdProfileDropdown');
  var profileAvatar = document.querySelector('.sd-profile-wrap .sd-avatar');

  function initStudentProfileMenu() {
    if (!profileDropdown || profileDropdown.dataset.sdProfileReady) return;
    if (document.body.classList.contains('td-page')) return;

    var logoutLink = profileDropdown.querySelector('[href="login.html"]');
    if (!profileDropdown.querySelector('[href="student-profile.html"]')) {
      var profileLink = document.createElement('a');
      profileLink.href = 'student-profile.html';
      profileLink.className = 'sd-profile-dropdown-item';
      profileLink.setAttribute('role', 'menuitem');
      profileLink.innerHTML = '<i class="bi bi-person" aria-hidden="true"></i> الملف الشخصي';
      if (logoutLink) profileDropdown.insertBefore(profileLink, logoutLink);
      else profileDropdown.appendChild(profileLink);
    }

    var settingsLink = profileDropdown.querySelector('[href="student-settings.html"]');
    if (settingsLink) settingsLink.remove();

    if (logoutLink) {
      logoutLink.className = 'sd-profile-dropdown-item';
      logoutLink.setAttribute('role', 'menuitem');
      logoutLink.innerHTML = '<i class="bi bi-box-arrow-right" aria-hidden="true"></i> تسجيل الخروج';
    }

    profileDropdown.dataset.sdProfileReady = '1';
  }

  initStudentProfileMenu();

  function toggleProfileMenu(e) {
    if (!profileToggle || !profileDropdown) return;
    e.stopPropagation();
    var notifyDropdown = document.getElementById('sdNotifyDropdown');
    var notifyToggle = document.getElementById('sdNotifyToggle');
    var msgDropdown = document.getElementById('sdMsgDropdown');
    var msgToggle = document.getElementById('sdMsgToggle');
    if (notifyDropdown && !notifyDropdown.hidden) {
      notifyDropdown.hidden = true;
      if (notifyToggle) notifyToggle.setAttribute('aria-expanded', 'false');
    }
    if (msgDropdown && !msgDropdown.hidden) {
      msgDropdown.hidden = true;
      if (msgToggle) msgToggle.setAttribute('aria-expanded', 'false');
    }
    var isOpen = !profileDropdown.hidden;
    profileDropdown.hidden = isOpen;
    profileToggle.setAttribute('aria-expanded', String(!isOpen));
  }

  if (profileToggle && profileDropdown) {
    profileToggle.addEventListener('click', toggleProfileMenu);

    if (profileAvatar) {
      profileAvatar.setAttribute('role', 'button');
      profileAvatar.setAttribute('tabindex', '0');
      profileAvatar.setAttribute('aria-label', 'قائمة المستخدم');
      profileAvatar.addEventListener('click', toggleProfileMenu);
      profileAvatar.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleProfileMenu(e);
        }
      });
    }

    document.addEventListener('click', function (e) {
      if (
        !profileDropdown.hidden &&
        !profileToggle.contains(e.target) &&
        !(profileAvatar && profileAvatar.contains(e.target)) &&
        !profileDropdown.contains(e.target)
      ) {
        profileDropdown.hidden = true;
        profileToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !profileDropdown.hidden) {
        profileDropdown.hidden = true;
        profileToggle.setAttribute('aria-expanded', 'false');
        profileToggle.focus();
      }
    });
  }
})();
