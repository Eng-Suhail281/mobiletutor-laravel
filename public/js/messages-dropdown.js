window.SDMessagesDropdown = (function () {
  function unreadTotal(data) {
    return data.items.reduce(function (sum, i) {
      return sum + (i.unreadCount || 0);
    }, 0);
  }

  function renderAvatar(item) {
    var online = item.online
      ? '<span class="sd-msg-online" aria-hidden="true"></span>'
      : '';
    if (item.avatar) {
      return (
        '<span class="sd-msg-avatar-wrap">' +
          '<img src="' + item.avatar + '" alt="" class="sd-msg-item-avatar">' +
          online +
        '</span>'
      );
    }
    return (
      '<span class="sd-msg-item-icon sd-msg-item-icon--' + (item.iconType || 'default') + '">' +
        '<i class="bi bi-' + (item.icon || 'chat') + '"></i>' +
      '</span>'
    );
  }

  function renderMeta(item) {
    if (item.unreadCount > 0) {
      return '<span class="sd-msg-count">' + item.unreadCount + '</span>';
    }
    if (item.read || item.seen) {
      return '<i class="bi bi-check2-all sd-msg-read" aria-label="مقروءة"></i>';
    }
    return '';
  }

  function renderName(item) {
    var verified = item.verified
      ? ' <i class="bi bi-patch-check-fill sd-msg-verified" aria-hidden="true"></i>'
      : '';
    return '<strong>' + (item.shortName || item.name) + verified + '</strong>';
  }

  function renderPreview(item) {
    if (item.typing) {
      return '<p class="td-msg-typing">' + item.preview + '</p>';
    }
    return '<p>' + item.preview + '</p>';
  }

  function renderItem(item, pageUrl) {
    return (
      '<a href="' + pageUrl + '?id=' + item.id + '" class="sd-msg-item' + (item.unread ? ' is-unread' : '') + '" data-id="' + item.id + '">' +
        renderAvatar(item) +
        '<div class="sd-msg-item-body">' +
          '<div class="sd-msg-item-top">' + renderName(item) + '</div>' +
          renderPreview(item) +
        '</div>' +
        '<div class="sd-msg-item-meta"><time>' + item.time + '</time>' + renderMeta(item) + '</div>' +
      '</a>'
    );
  }

  function closeOthers() {
    var notifyDropdown = document.getElementById('sdNotifyDropdown');
    var notifyToggle = document.getElementById('sdNotifyToggle');
    var profileDropdown = document.getElementById('sdProfileDropdown');
    var profileToggle = document.getElementById('sdProfileToggle');
    if (notifyDropdown && !notifyDropdown.hidden) {
      notifyDropdown.hidden = true;
      if (notifyToggle) notifyToggle.setAttribute('aria-expanded', 'false');
    }
    if (profileDropdown && !profileDropdown.hidden) {
      profileDropdown.hidden = true;
      if (profileToggle) profileToggle.setAttribute('aria-expanded', 'false');
    }
  }

  function init(options) {
    var data = window.SD_MESSAGES;
    if (!data) return;

    var pageUrl = options.pageUrl || 'teacher-messages.html';
    var searchPlaceholder = options.searchPlaceholder || 'البحث في المحادثات...';

    function updateBadge() {
      var badge = document.getElementById('sdMsgBadge');
      if (!badge) return;
      var count = unreadTotal(data);
      badge.textContent = String(count);
      badge.hidden = count === 0;
    }

    function renderDropdown() {
      var dropdown = document.getElementById('sdMsgDropdown');
      if (!dropdown) return;

      var recent = data.items.filter(function (i) { return i.dropdown; });
      var count = unreadTotal(data);

      dropdown.innerHTML =
        '<div class="sd-msg-dropdown-head">' +
          '<h2>الرسائل' +
            (count ? ' <span class="td-msg-unread-badge">' + count + ' غير مقروءة</span>' : '') +
          '</h2>' +
          '<button type="button" class="sd-msg-mark-all" id="sdMsgMarkAll">تحديد الكل كمقروء</button>' +
        '</div>' +
        '<div class="sd-search sd-search--pill td-msg-dropdown-search">' +
          '<i class="bi bi-search" aria-hidden="true"></i>' +
          '<input type="search" id="sdMsgSearch" placeholder="' + searchPlaceholder + '" aria-label="بحث">' +
        '</div>' +
        '<div class="sd-msg-dropdown-list" id="sdMsgDropdownList">' +
          recent.map(function (item) { return renderItem(item, pageUrl); }).join('') +
        '</div>' +
        '<a href="' + pageUrl + '" class="sd-btn-primary sd-msg-dropdown-footer">عرض جميع المحادثات</a>';

      var markAll = document.getElementById('sdMsgMarkAll');
      if (markAll) {
        markAll.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          data.items.forEach(function (item) {
            item.unread = false;
            item.unreadCount = 0;
            item.seen = true;
          });
          updateBadge();
          renderDropdown();
          if (options.onMarkAll) options.onMarkAll();
        });
      }

      var search = document.getElementById('sdMsgSearch');
      if (search) {
        search.addEventListener('input', function () {
          var q = search.value.trim().toLowerCase();
          document.querySelectorAll('#sdMsgDropdownList .sd-msg-item').forEach(function (el) {
            el.style.display = !q || el.textContent.toLowerCase().indexOf(q) !== -1 ? '' : 'none';
          });
        });
      }
    }

    function initDropdownToggle() {
      var toggle = document.getElementById('sdMsgToggle');
      var dropdown = document.getElementById('sdMsgDropdown');
      if (!toggle || !dropdown) return;

      toggle.addEventListener('click', function (e) {
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
    }

    updateBadge();
    renderDropdown();
    initDropdownToggle();

    api.updateBadge = updateBadge;
    api.renderDropdown = renderDropdown;
    return api;
  }

  var api = { init: init, updateBadge: function () {}, renderDropdown: function () {} };

  return api;
})();
