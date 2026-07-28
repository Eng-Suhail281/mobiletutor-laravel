window.SDNotificationsDropdown = (function () {
  function unreadCount(data) {
    return data.items.filter(function (i) { return i.unread; }).length;
  }

  function renderIcon(item) {
    if (item.iconType === 'user' && item.avatar) {
      var badge = item.badgeIcon
        ? '<span class="sd-notify-avatar-badge"><i class="bi bi-' + item.badgeIcon + '"></i></span>'
        : '';
      return (
        '<span class="sd-notify-item-avatar">' +
          '<img src="' + item.avatar + '" alt="">' +
          badge +
        '</span>'
      );
    }
    return (
      '<span class="sd-notify-item-icon sd-notify-item-icon--' + (item.icon || 'bell') + '">' +
        '<i class="bi bi-' + item.icon + '"></i>' +
      '</span>'
    );
  }

  function renderDropdownItem(item) {
    var readClass = item.unread ? ' is-unread' : ' is-read';
    return (
      '<article class="sd-notify-item sd-notify-item--dropdown' + readClass + '" data-id="' + item.id + '">' +
        renderIcon(item) +
        '<div class="sd-notify-item-body">' +
          '<p><strong>' + item.title + '</strong> ' + item.desc + '</p>' +
        '</div>' +
        '<div class="sd-notify-item-meta"><time>' + item.time + '</time></div>' +
      '</article>'
    );
  }

  function closeOthers() {
    var msgDropdown = document.getElementById('sdMsgDropdown');
    var msgToggle = document.getElementById('sdMsgToggle');
    var profileDropdown = document.getElementById('sdProfileDropdown');
    var profileToggle = document.getElementById('sdProfileToggle');
    if (msgDropdown && !msgDropdown.hidden) {
      msgDropdown.hidden = true;
      if (msgToggle) msgToggle.setAttribute('aria-expanded', 'false');
    }
    if (profileDropdown && !profileDropdown.hidden) {
      profileDropdown.hidden = true;
      if (profileToggle) profileToggle.setAttribute('aria-expanded', 'false');
    }
  }

  function init(options) {
    var data = window.SD_NOTIFICATIONS;
    if (!data) return;

    var pageUrl = options.pageUrl || 'teacher-notifications.html';

    function updateBadge() {
      var badge = document.getElementById('sdNotifyBadge');
      if (!badge) return;
      var count = unreadCount(data);
      badge.textContent = String(count);
      badge.hidden = count === 0;
    }

    function renderDropdown() {
      var dropdown = document.getElementById('sdNotifyDropdown');
      if (!dropdown) return;

      var recent = data.items.filter(function (i) { return i.dropdown; });
      var count = unreadCount(data);
      var countLabel = count > 0
        ? ' <span class="sd-notify-head-count">(' + count + ' جديدة)</span>'
        : '';

      dropdown.innerHTML =
        '<div class="sd-notify-dropdown-head">' +
          '<h2>الإشعارات' + countLabel + '</h2>' +
          '<button type="button" class="sd-notify-mark-all" id="sdNotifyMarkAll">تحديد الكل كمقروء</button>' +
        '</div>' +
        '<div class="sd-notify-dropdown-list" id="sdNotifyDropdownList">' +
          recent.map(renderDropdownItem).join('') +
        '</div>' +
        '<a href="' + pageUrl + '" class="sd-btn-primary sd-notify-dropdown-footer">عرض جميع الإشعارات</a>';

      var markAll = document.getElementById('sdNotifyMarkAll');
      if (markAll) {
        markAll.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          data.items.forEach(function (item) { item.unread = false; });
          updateBadge();
          renderDropdown();
          if (options.onMarkAll) options.onMarkAll();
        });
      }
    }

    function initDropdownToggle() {
      var toggle = document.getElementById('sdNotifyToggle');
      var dropdown = document.getElementById('sdNotifyDropdown');
      if (!toggle || !dropdown) return;

      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var isOpen = !dropdown.hidden;
        if (!isOpen) closeOthers();
        dropdown.hidden = isOpen;
        toggle.setAttribute('aria-expanded', String(!isOpen));
      });

      document.addEventListener('click', function (e) {
        if (
          !dropdown.hidden &&
          !toggle.contains(e.target) &&
          !dropdown.contains(e.target)
        ) {
          dropdown.hidden = true;
          toggle.setAttribute('aria-expanded', 'false');
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !dropdown.hidden) {
          dropdown.hidden = true;
          toggle.setAttribute('aria-expanded', 'false');
          toggle.focus();
        }
      });

      dropdown.addEventListener('click', function (e) {
        var item = e.target.closest('.sd-notify-item--dropdown');
        if (!item || e.target.closest('.sd-notify-mark-all, .sd-notify-dropdown-footer')) return;
        e.preventDefault();
        var id = item.getAttribute('data-id');
        data.items.forEach(function (n) {
          if (n.id === id) n.unread = false;
        });
        updateBadge();
        renderDropdown();
        if (options.onItemClick) options.onItemClick(id);
        window.location.href = pageUrl;
      });
    }

    updateBadge();
    renderDropdown();
    initDropdownToggle();

    api.updateBadge = updateBadge;
    api.renderDropdown = renderDropdown;
    api.unreadCount = function () { return unreadCount(data); };
    return api;
  }

  var api = {
    init: init,
    updateBadge: function () {},
    renderDropdown: function () {},
    unreadCount: function () { return 0; }
  };

  return api;
})();
