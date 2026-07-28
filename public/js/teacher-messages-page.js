(function () {
  var data = window.SD_MESSAGES;
  if (!data) return;

  var params = new URLSearchParams(window.location.search);
  var isStudent = !document.body.classList.contains('td-page');
  var activeId = params.get('id') || (isStudent ? 'ahmed-teacher' : 'saif');

  var threads = isStudent ? {
    'ahmed-teacher': {
      messages: [
        { type: 'date', text: 'اليوم، 24 يوليو' },
        { type: 'them', text: 'السلام عليكم، كيف حالك يا بني؟ لقد راجعت مذكرتك الأخيرة وهي ممتازة جداً.', time: '9:30 ص', avatar: 'images/shared/avatars/ahmed.jpg' },
        { type: 'me', text: 'وعليكم السلام يا أستاذي. شكراً جزيلاً لك! هل هناك أي ملاحظات على الجزء الخاص بقوانين الحركة؟', time: '9:32 ص', read: true },
        { type: 'file', name: 'مراجعة_قوانين_نيوتن.pdf', size: '2.4 ميجابايت • PDF', avatar: 'images/shared/avatars/ahmed.jpg' },
        { type: 'file', name: 'مراجعة_قوانين_نيوتن.pdf', size: '2.4 ميجابايت • PDF', avatar: 'images/shared/avatars/ahmed.jpg' }
      ]
    },
    'math-teacher': {
      messages: [
        { type: 'date', text: 'اليوم' },
        { type: 'them', text: 'رائع! راجعت واجبك وأرسلت ملاحظات على الحلول.', time: '10:15 ص', avatar: 'images/courses/details/instructor-mohammad.jpg' },
        { type: 'me', text: 'شكراً أستاذ، سأراجع الملاحظات اليوم.', time: '10:20 ص', read: true }
      ]
    },
    'support-sara': {
      messages: [
        { type: 'them', text: 'كيف تشعر اليوم بعد جلستنا؟ أنا هنا إن احتجت.', time: 'أمس', avatar: 'images/support/specialists/sara.jpg' }
      ]
    },
    platform: {
      messages: [
        { type: 'them', text: 'تم تأكيد موعد جلستك يوم الخميس الساعة 3:00 م.', time: 'أمس', icon: 'shield-check' }
      ]
    },
    'arabic-teacher': {
      messages: [
        { type: 'them', text: 'لا تنسَ مراجعة الوحدة الثانية قبل الاختبار.', time: 'أمس', avatar: 'images/courses/details/instructor-khaled.png' }
      ]
    },
    'physics-teacher': {
      messages: [
        { type: 'them', text: 'أرسلت لك ملفاً إضافياً للمراجعة.', time: 'أمس', avatar: 'images/support/specialists/khaled.jpg' }
      ]
    }
  } : {
    saif: {
      messages: [
        { type: 'date', text: 'اليوم، 24 يوليو' },
        { type: 'them', text: 'السلام عليكم، كيف حالك يا بني؟ لقد راجعت مذكرتك الأخيرة وهي ممتازة جداً.', time: '9:30 ص', avatar: 'images/courses/details/student-ahmed.jpg' },
        { type: 'me', text: 'وعليكم السلام يا أستاذي. شكراً جزيلاً لك! هل هناك أي ملاحظات على الجزء الخاص بقوانين الحركة؟', time: '9:32 ص', read: true },
        { type: 'file', name: 'مراجعة_قوانين_نيوتن.pdf', size: '2.4 ميجابايت • PDF', avatar: 'images/courses/details/student-ahmed.jpg' },
        { type: 'file', name: 'مراجعة_قوانين_نيوتن.pdf', size: '2.4 ميجابايت • PDF', avatar: 'images/courses/details/student-ahmed.jpg' }
      ]
    },
    sara: {
      messages: [
        { type: 'date', text: 'اليوم' },
        { type: 'them', text: 'هل يمكن مراجعة إضافية قبل الاختبار القادم؟', time: '10:15 ص', avatar: 'images/shared/avatars/sara.jpg' },
        { type: 'me', text: 'بالتأكيد سارة، سأجهز لك ملف مراجعة اليوم.', time: '10:20 ص', read: true }
      ]
    },
    omar: {
      messages: [
        { type: 'them', text: 'شكراً على الملاحظات على الواجب، سأعدّل الحل وأعيد الإرسال.', time: 'أمس', avatar: 'images/shared/avatars/mohammad.jpg' }
      ]
    },
    platform: {
      messages: [
        { type: 'them', text: 'تم اعتماد مادتك التعليمية بنجاح.', time: 'أمس', icon: 'shield-check' }
      ]
    },
    'elite-group': {
      messages: [
        { type: 'me', text: 'لا تنسوا مراجعة الوحدة الثالثة قبل الاختبار يوم الخميس.', time: 'أمس', read: true }
      ]
    },
    layla: {
      messages: [
        { type: 'them', text: 'أرسلت ملف الواجب للمراجعة.', time: 'أمس', avatar: 'images/courses/details/student-sara.jpg' }
      ]
    }
  };

  var defaultId = isStudent ? 'ahmed-teacher' : 'saif';
  if (!threads[activeId]) activeId = defaultId;

  var listEl = document.getElementById('chatList');
  var messagesEl = document.getElementById('chatMessages');
  var activeName = document.getElementById('activeName');
  var activeStatus = document.getElementById('activeStatus');
  var activeAvatar = document.getElementById('activeAvatar');
  var activeAvatarWrap = document.getElementById('activeAvatarWrap');

  function getContact(id) {
    for (var i = 0; i < data.items.length; i++) {
      if (data.items[i].id === id) return data.items[i];
    }
    return data.items[0];
  }

  function renderListAvatar(item) {
    var online = item.online ? '<span class="sd-msg-online" aria-hidden="true"></span>' : '';
    if (item.avatar) {
      return (
        '<span class="sd-msg-avatar-wrap">' +
          '<img src="' + item.avatar + '" alt="" class="sd-msg-item-avatar">' +
          online +
        '</span>'
      );
    }
    return '<span class="td-chat-list-icon"><i class="bi bi-' + (item.icon || 'chat') + '"></i></span>';
  }

  function renderList(filter) {
    var q = (filter || '').trim().toLowerCase();
    listEl.innerHTML = data.items.map(function (item) {
      if (q && item.name.toLowerCase().indexOf(q) === -1 && (item.shortName || '').toLowerCase().indexOf(q) === -1) return '';
      var badge = item.unreadCount > 0 ? '<span class="sd-msg-count">' + item.unreadCount + '</span>' : '';
      var previewClass = item.typing ? 'td-chat-preview is-typing' : 'td-chat-preview';
      var previewText = item.typing ? 'يكتب الآن...' : item.preview;
      return (
        '<button type="button" class="td-chat-list-item' + (item.id === activeId ? ' is-active' : '') + (item.unread ? ' is-unread' : '') + '" data-id="' + item.id + '">' +
          renderListAvatar(item) +
          '<div class="td-chat-list-body">' +
            '<div class="td-chat-list-top"><strong>' + item.name + '</strong><time>' + item.time + '</time></div>' +
            '<span class="' + previewClass + '">' + previewText + '</span>' +
          '</div>' + badge +
        '</button>'
      );
    }).join('');
  }

  function renderFileCard(file) {
    return (
      '<div class="td-chat-file">' +
        '<i class="bi bi-file-earmark-pdf td-chat-file-icon" aria-hidden="true"></i>' +
        '<div class="td-chat-file-meta"><strong>' + file.name + '</strong><span>' + file.size + '</span></div>' +
        '<button type="button" class="td-chat-file-dl" aria-label="تحميل"><i class="bi bi-download"></i></button>' +
      '</div>'
    );
  }

  function renderFileGroup(files, avatar, fromMe) {
    var cards = files.map(renderFileCard).join('');
    var avatarHtml = (!fromMe && avatar) ? '<img src="' + avatar + '" alt="" class="td-chat-msg-avatar">' : '';
    return (
      '<div class="td-chat-file-wrap' + (fromMe ? ' is-me' : ' is-them') + '">' +
        avatarHtml +
        '<div class="td-chat-files-stack">' + cards + '</div>' +
      '</div>'
    );
  }

  function renderMessage(m) {
    if (m.type === 'date') {
      return '<div class="td-chat-date"><span>' + m.text + '</span></div>';
    }
    if (m.type === 'file') {
      return renderFileCard(m);
    }
    var read = m.type === 'me' && m.read ? '<i class="bi bi-check2-all td-chat-read" aria-hidden="true"></i>' : '';
    var avatarHtml = '';
    if (m.type === 'them' && m.avatar) {
      avatarHtml = '<img src="' + m.avatar + '" alt="" class="td-chat-msg-avatar">';
    } else if (m.type === 'them' && m.icon) {
      avatarHtml = '<span class="td-chat-msg-icon"><i class="bi bi-' + m.icon + '"></i></span>';
    }
    if (m.type === 'me') {
      return (
        '<div class="sd-chat-bubble-wrap is-me">' +
          '<div class="td-chat-bubble-col">' +
            '<div class="sd-chat-bubble">' + m.text + '</div>' +
            '<time class="td-chat-msg-time">' + read + (m.time || '') + '</time>' +
          '</div>' +
        '</div>'
      );
    }
    return (
      '<div class="sd-chat-bubble-wrap is-them">' +
        '<div class="td-chat-bubble-row">' +
          avatarHtml +
          '<div class="td-chat-bubble-col">' +
            '<div class="sd-chat-bubble">' + m.text + '</div>' +
            '<time class="td-chat-msg-time">' + (m.time || '') + '</time>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderMessages(messages) {
    var html = [];
    var i = 0;
    while (i < messages.length) {
      var m = messages[i];
      if (m.type === 'file') {
        var files = [];
        var avatar = m.avatar;
        var fromMe = !!m.fromMe;
        while (i < messages.length && messages[i].type === 'file') {
          files.push(messages[i]);
          if (messages[i].avatar) avatar = messages[i].avatar;
          if (messages[i].fromMe) fromMe = true;
          i++;
        }
        html.push(renderFileGroup(files, avatar, fromMe));
      } else {
        html.push(renderMessage(m));
        i++;
      }
    }
    return html.join('');
  }

  function renderChat(id) {
    activeId = id;
    var contact = getContact(id);
    var thread = threads[id] || threads[defaultId];

    activeName.textContent = contact.name;
    activeStatus.textContent = contact.typing ? 'يكتب الآن...' : (contact.online ? 'نشط الآن' : contact.role);

    if (contact.avatar && activeAvatar) {
      activeAvatar.src = contact.avatar;
      activeAvatar.hidden = false;
      if (activeAvatarWrap) activeAvatarWrap.hidden = false;
    } else if (activeAvatar) {
      activeAvatar.hidden = true;
    }

    var onlineDot = activeAvatarWrap && activeAvatarWrap.querySelector('.sd-msg-online');
    if (onlineDot) onlineDot.hidden = !contact.online;

    contact.unread = false;
    contact.unreadCount = 0;

    messagesEl.innerHTML = renderMessages(thread.messages);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    renderList(document.getElementById('chatSearch').value);

    if (window.SDMessagesDropdown) SDMessagesDropdown.updateBadge && SDMessagesDropdown.updateBadge();

    var url = new URL(window.location.href);
    url.searchParams.set('id', id);
    window.history.replaceState({}, '', url);

    document.body.classList.add('td-chat-open');
  }

  listEl.addEventListener('click', function (e) {
    var btn = e.target.closest('.td-chat-list-item');
    if (!btn) return;
    renderChat(btn.getAttribute('data-id'));
  });

  var backBtn = document.getElementById('chatBackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', function () {
      document.body.classList.remove('td-chat-open');
    });
  }

  document.getElementById('chatSearch').addEventListener('input', function (e) {
    renderList(e.target.value);
  });

  document.getElementById('chatForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var input = document.getElementById('chatInput');
    var text = input.value.trim();
    if (!text) return;
    var thread = threads[activeId] || (threads[activeId] = { messages: [] });
    thread.messages.push({ type: 'me', text: text, time: 'الآن', read: true });
    input.value = '';
    renderChat(activeId);
  });

  function toast(msg, type) {
    if (window.SDUI && SDUI.toast) SDUI.toast(msg, type);
  }

  function initActions() {
    var searchInput = document.getElementById('chatSearch');
    var chatInput = document.getElementById('chatInput');
    var emojis = [
      '😊', '😀', '😁', '😂', '🤣', '😍', '😘', '😎',
      '🙂', '😉', '🤔', '😴', '😇', '🥳', '😢', '😭',
      '👍', '👎', '👏', '🙏', '💪', '🤝', '👌', '✌️',
      '❤️', '🔥', '✨', '🎉', '⭐', '💯', '📚', '✅'
    ];

    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.hidden = true;
    fileInput.accept = '.pdf,.jpg,.jpeg,.png,.doc,.docx';
    document.body.appendChild(fileInput);

    fileInput.addEventListener('change', function () {
      if (!fileInput.files || !fileInput.files[0]) return;
      var file = fileInput.files[0];
      var thread = threads[activeId] || (threads[activeId] = { messages: [] });
      var ext = file.name.split('.').pop().toUpperCase();
      var sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      thread.messages.push({
        type: 'file',
        fromMe: true,
        name: file.name,
        size: sizeMb + ' ميجابايت • ' + ext
      });
      fileInput.value = '';
      renderChat(activeId);
      toast('تم إرفاق الملف وإرساله', 'success');
    });

    var newBtn = document.querySelector('.td-chat-new-btn');
    if (newBtn) {
      newBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
          renderList('');
        }
        toast('ابحث عن جهة اتصال أو اختر محادثة من القائمة', 'info');
      });
    }

    var headActions = document.querySelectorAll('.td-chat-window-actions .sd-icon-btn');
    if (headActions[0]) {
      headActions[0].addEventListener('click', function (e) {
        e.stopPropagation();
        toast('جاري بدء المكالمة الصوتية مع ' + activeName.textContent + '…', 'info');
      });
    }
    if (headActions[1]) {
      headActions[1].addEventListener('click', function (e) {
        e.stopPropagation();
        toast('جاري فتح مكالمة الفيديو…', 'info');
      });
    }
    if (headActions[2]) {
      var moreBtn = headActions[2];
      var moreMenu = document.createElement('div');
      moreMenu.className = 'td-chat-more-menu';
      moreMenu.hidden = true;
      moreMenu.innerHTML =
        '<button type="button" class="td-chat-more-item" data-act="mute"><i class="bi bi-bell-slash"></i><span>كتم الإشعارات</span></button>' +
        '<button type="button" class="td-chat-more-item" data-act="search"><i class="bi bi-search"></i><span>بحث في المحادثة</span></button>' +
        '<button type="button" class="td-chat-more-item" data-act="block"><i class="bi bi-slash-circle"></i><span>حظر</span></button>' +
        '<button type="button" class="td-chat-more-item td-chat-more-item--danger" data-act="clear"><i class="bi bi-trash3"></i><span>مسح المحادثة</span></button>';

      var moreWrap = moreBtn.closest('.td-chat-window-actions') || moreBtn.parentNode;
      moreWrap.style.position = moreWrap.style.position || 'relative';
      moreWrap.appendChild(moreMenu);

      function closeMore() {
        moreMenu.hidden = true;
        moreBtn.setAttribute('aria-expanded', 'false');
      }

      moreBtn.setAttribute('aria-expanded', 'false');
      moreBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var willOpen = moreMenu.hidden;
        moreMenu.hidden = !willOpen;
        moreBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      });

      moreMenu.addEventListener('click', function (e) {
        var item = e.target.closest('.td-chat-more-item');
        if (!item) return;
        e.preventDefault();
        var act = item.getAttribute('data-act');
        closeMore();
        if (act === 'mute') {
          toast('تم كتم إشعارات هذه المحادثة', 'success');
        } else if (act === 'search') {
          if (searchInput) searchInput.focus();
          toast('اكتب للبحث في محادثاتك', 'info');
        } else if (act === 'block') {
          toast('تم حظر ' + activeName.textContent, 'success');
        } else if (act === 'clear') {
          if (threads[activeId]) threads[activeId].messages = [];
          renderChat(activeId);
          toast('تم مسح المحادثة', 'success');
        }
      });

      document.addEventListener('click', function (e) {
        if (moreMenu.hidden) return;
        if (e.target.closest('.td-chat-more-menu') || moreBtn.contains(e.target)) return;
        closeMore();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMore();
      });
    }

    var composeIcons = document.querySelectorAll('.td-chat-compose-icon');
    if (composeIcons[0]) {
      composeIcons[0].addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        fileInput.click();
      });
    }

    var emojiBtn = composeIcons[1];
    if (emojiBtn) {
      var emojiPanel = document.createElement('div');
      emojiPanel.className = 'td-chat-emoji-panel';
      emojiPanel.hidden = true;
      emojiPanel.innerHTML = emojis.map(function (em) {
        return '<button type="button" class="td-chat-emoji" tabindex="-1">' + em + '</button>';
      }).join('');

      var composeWrap = emojiBtn.closest('.td-chat-compose-wrap') || emojiBtn.parentNode;
      composeWrap.style.position = composeWrap.style.position || 'relative';
      composeWrap.appendChild(emojiPanel);

      function closeEmoji() {
        emojiPanel.hidden = true;
        emojiBtn.setAttribute('aria-expanded', 'false');
      }

      emojiBtn.setAttribute('aria-expanded', 'false');
      emojiBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var willOpen = emojiPanel.hidden;
        emojiPanel.hidden = !willOpen;
        emojiBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      });

      emojiPanel.addEventListener('click', function (e) {
        var btn = e.target.closest('.td-chat-emoji');
        if (!btn || !chatInput) return;
        e.preventDefault();
        chatInput.value += btn.textContent;
        chatInput.focus();
      });

      document.addEventListener('click', function (e) {
        if (emojiPanel.hidden) return;
        if (e.target.closest('.td-chat-emoji-panel') || e.target === emojiBtn || emojiBtn.contains(e.target)) return;
        closeEmoji();
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeEmoji();
      });
    }

    if (composeIcons[2]) {
      composeIcons[2].addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toast('اضغط مطولاً على الميكروفون لتسجيل رسالة صوتية', 'info');
      });
    }

    messagesEl.addEventListener('click', function (e) {
      var dlBtn = e.target.closest('.td-chat-file-dl');
      if (!dlBtn) return;
      e.preventDefault();
      e.stopPropagation();
      var fileEl = dlBtn.closest('.td-chat-file');
      var nameEl = fileEl && fileEl.querySelector('strong');
      toast('جاري تحميل «' + (nameEl ? nameEl.textContent : 'الملف') + '»', 'success');
    });
  }

  renderList();
  renderChat(activeId);
  initActions();
})();
