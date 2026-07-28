(function () {
  var data = window.SD_NOTIFICATIONS;
  var list = document.getElementById('notificationsList');
  if (!data || !list) return;

  function unreadCount() {
    return data.items.filter(function (i) { return i.unread; }).length;
  }

  function updatePageBadge() {
    var badge = document.getElementById('notifyPageBadge');
    if (!badge) return;
    var count = unreadCount();
    badge.textContent = count + ' غير مقروء';
    badge.hidden = count === 0;
  }

  function renderIcon(item) {
    if (item.iconType === 'user' && item.avatar) {
      return '<img src="' + item.avatar + '" alt="" class="sd-notify-page-avatar">';
    }
    return (
      '<span class="sd-notify-page-icon">' +
        '<i class="bi bi-' + item.icon + '"></i>' +
      '</span>'
    );
  }

  function renderPageItem(item) {
    var actions = '';
    if (item.action) {
      actions += '<a href="' + item.action.href + '" class="sd-btn-primary sd-notify-btn">' + item.action.label + '</a>';
    }
    if (item.secondaryAction) {
      actions += '<button type="button" class="sd-btn-outline sd-notify-btn sd-notify-item-dismiss">' + item.secondaryAction.label + '</button>';
    }
    var actionsHtml = actions ? '<div class="sd-notify-item-actions">' + actions + '</div>' : '';
    var dot = item.unread
      ? '<span class="sd-notify-unread-dot" aria-hidden="true"></span>'
      : '<span class="sd-notify-unread-dot is-empty" aria-hidden="true"></span>';

    return (
      '<article class="sd-notify-item sd-notify-item--page' + (item.unread ? ' is-unread' : '') + '" data-id="' + item.id + '">' +
        '<div class="sd-notify-item-start">' + renderIcon(item) + '</div>' +
        '<div class="sd-notify-item-body">' +
          '<strong class="sd-notify-item-title">' + item.title + '</strong>' +
          '<p>' + item.desc + '</p>' +
          actionsHtml +
        '</div>' +
        '<div class="sd-notify-item-meta">' + dot + '<time>' + item.time + '</time></div>' +
      '</article>'
    );
  }

  function renderPage() {
    var activeFilter = list.getAttribute('data-filter') || 'all';
    var items = data.items.filter(function (i) { return !i.dropdown; });

    if (activeFilter === 'unread') {
      items = items.filter(function (i) { return i.unread; });
    } else if (activeFilter !== 'all') {
      items = items.filter(function (i) { return i.category === activeFilter; });
    }

    var groups = [
      { key: 'today', label: 'اليوم' },
      { key: 'yesterday', label: 'أمس' }
    ];

    list.innerHTML = groups.map(function (group) {
      var groupItems = items.filter(function (i) { return i.group === group.key; });
      if (!groupItems.length) return '';
      return (
        '<section class="sd-notify-group">' +
          '<h3 class="sd-notify-group-label">' + group.label + '</h3>' +
          '<div class="sd-notify-group-list">' +
            groupItems.map(renderPageItem).join('') +
          '</div>' +
        '</section>'
      );
    }).join('');

    updatePageBadge();
    if (window.SDNotificationsDropdown && SDNotificationsDropdown.updateBadge) {
      SDNotificationsDropdown.updateBadge();
    }
  }

  function initFilters() {
    var filters = document.getElementById('notificationFilters');
    if (!filters) return;

    filters.addEventListener('click', function (e) {
      var pill = e.target.closest('[data-filter]');
      if (!pill) return;
      filters.querySelectorAll('.sd-filter-pill').forEach(function (el) {
        el.classList.remove('is-active');
      });
      pill.classList.add('is-active');
      list.setAttribute('data-filter', pill.getAttribute('data-filter'));
      renderPage();
    });
  }

  function initMarkAll() {
    var markAll = document.getElementById('sdNotifyMarkAllPage');
    if (!markAll) return;
    markAll.addEventListener('click', function (e) {
      e.preventDefault();
      data.items.forEach(function (item) { item.unread = false; });
      renderPage();
      if (window.SDNotificationsDropdown && SDNotificationsDropdown.renderDropdown) {
        SDNotificationsDropdown.renderDropdown();
      }
    });
  }

  list.addEventListener('click', function (e) {
    var dismiss = e.target.closest('.sd-notify-item-dismiss');
    if (dismiss) {
      var item = dismiss.closest('.sd-notify-item');
      if (!item) return;
      var id = item.getAttribute('data-id');
      data.items.forEach(function (n) {
        if (n.id === id) n.unread = false;
      });
      renderPage();
      if (window.SDNotificationsDropdown && SDNotificationsDropdown.renderDropdown) {
        SDNotificationsDropdown.renderDropdown();
      }
      return;
    }

    var row = e.target.closest('.sd-notify-item--page');
    if (row && !e.target.closest('.sd-notify-btn, .sd-btn-primary, .sd-btn-outline')) {
      var rowId = row.getAttribute('data-id');
      data.items.forEach(function (n) {
        if (n.id === rowId) n.unread = false;
      });
      renderPage();
      if (window.SDNotificationsDropdown && SDNotificationsDropdown.renderDropdown) {
        SDNotificationsDropdown.renderDropdown();
      }
    }
  });

  initFilters();
  initMarkAll();
  renderPage();

  document.addEventListener('sd-notifications-updated', renderPage);
})();
