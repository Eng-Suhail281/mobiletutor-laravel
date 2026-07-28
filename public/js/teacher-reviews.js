(function () {
  'use strict';

  var root = document.querySelector('.td-page-reviews');
  if (!root) return;

  var grid = document.getElementById('tdReviewsGrid');
  var searchInput = document.getElementById('tdReviewsSearch');
  var countEl = document.getElementById('tdReviewsCount');
  var activeFilter = 'all';

  var ui = window.SDUI;

  function toast(msg, type) {
    if (ui && ui.toast) ui.toast(msg, type || 'info');
  }

  function modal(opts) {
    if (ui && ui.modal) ui.modal(opts);
    else toast(opts.title || '');
  }

  function cards() {
    return grid ? Array.from(grid.querySelectorAll('.td-review-card')) : [];
  }

  function updateCount() {
    if (!countEl) return;
    var visible = cards().filter(function (c) { return !c.classList.contains('is-hidden'); }).length;
    countEl.textContent = visible + ' تقييمات';
  }

  function matchesFilter(card) {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'five') return card.getAttribute('data-rating') === '5';
    if (activeFilter === 'pending') return !card.classList.contains('is-replied');
    if (activeFilter === 'pinned') return card.classList.contains('is-pinned');
    return true;
  }

  function matchesSearch(card, query) {
    if (!query) return true;
    return card.textContent.toLowerCase().indexOf(query) !== -1;
  }

  function applyFilters() {
    var query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    cards().forEach(function (card) {
      var show = matchesFilter(card) && matchesSearch(card, query);
      card.classList.toggle('is-hidden', !show);
    });
    updateCount();
  }

  function setPin(btn, pinned) {
    var card = btn.closest('.td-review-card');
    if (!card) return;
    card.classList.toggle('is-pinned', pinned);
    card.setAttribute('data-pinned', pinned ? 'true' : 'false');
    btn.classList.toggle('is-pinned', pinned);
    if (pinned) {
      btn.innerHTML = '<i class="bi bi-pin-fill" aria-hidden="true"></i> إلغاء التثبيت';
      if (!card.querySelector('.td-review-pinned-badge')) {
        var badge = document.createElement('span');
        badge.className = 'td-review-pinned-badge';
        badge.innerHTML = '<i class="bi bi-pin-fill" aria-hidden="true"></i> مثبت';
        card.insertBefore(badge, card.firstChild);
      }
      toast('تم تثبيت التقييم', 'success');
    } else {
      btn.innerHTML = '<i class="bi bi-pin" aria-hidden="true"></i> تثبيت';
      var existing = card.querySelector('.td-review-pinned-badge');
      if (existing) existing.remove();
      toast('تم إلغاء التثبيت', 'info');
    }
    applyFilters();
  }

  function openReplyModal(card) {
    if (!card) return;
    var replyBtn = card.querySelector('.td-review-reply-btn');
    modal({
      title: 'إضافة رد',
      body: '<textarea id="tdReviewReplyText" rows="4" style="width:100%;padding:10px;border:1px solid #e8ecf4;border-radius:8px;font-family:Cairo,sans-serif" placeholder="اكتب ردك على التقييم…"></textarea>',
      actions: [
        {
          label: 'إرسال الرد',
          primary: true,
          onClick: function () {
            var textEl = document.getElementById('tdReviewReplyText');
            var text = textEl ? textEl.value.trim() : '';
            if (!text) {
              toast('يرجى كتابة الرد', 'info');
              return false;
            }
            card.classList.add('is-replied');
            if (replyBtn) {
              replyBtn.classList.add('is-replied');
              replyBtn.disabled = true;
              replyBtn.innerHTML = 'تم الرد';
            }
            var existingReply = card.querySelector('.td-review-teacher-reply');
            if (!existingReply) {
              var replyBox = document.createElement('div');
              replyBox.className = 'td-review-teacher-reply';
              replyBox.innerHTML = '<strong>ردك</strong><p></p>';
              replyBox.querySelector('p').textContent = text;
              var foot = card.querySelector('.td-review-card-foot');
              if (foot) card.insertBefore(replyBox, foot);
            }
            var report = card.querySelector('.td-review-report');
            if (report) {
              var viewBtn = document.createElement('button');
              viewBtn.type = 'button';
              viewBtn.className = 'td-review-view-reply';
              viewBtn.textContent = 'عرض الرد';
              report.replaceWith(viewBtn);
            }
            toast('تم إرسال الرد', 'success');
            applyFilters();
          }
        },
        { label: 'إلغاء' }
      ]
    });
  }

  function showReply(card) {
    var reply = card && card.querySelector('.td-review-teacher-reply p');
    modal({
      title: 'رد المعلم',
      body: '<p class="sd-ui-modal-text">' + (reply ? reply.textContent : 'لا يوجد رد.') + '</p>',
      actions: [{ label: 'إغلاق', primary: true }]
    });
  }

  root.querySelectorAll('.td-reviews-filters .sd-filter-pill').forEach(function (pill) {
    pill.addEventListener('click', function () {
      root.querySelectorAll('.td-reviews-filters .sd-filter-pill').forEach(function (p) {
        p.classList.remove('is-active');
      });
      pill.classList.add('is-active');
      activeFilter = pill.getAttribute('data-review-filter') || 'all';
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  root.addEventListener('click', function (e) {
    var target = e.target;

    var replyBtn = target.closest('.td-review-reply-btn:not(.is-replied)');
    if (replyBtn) {
      e.preventDefault();
      openReplyModal(replyBtn.closest('.td-review-card'));
      return;
    }

    var pinBtn = target.closest('.td-review-pin');
    if (pinBtn) {
      e.preventDefault();
      setPin(pinBtn, !pinBtn.classList.contains('is-pinned'));
      return;
    }

    var viewReply = target.closest('.td-review-view-reply');
    if (viewReply) {
      e.preventDefault();
      showReply(viewReply.closest('.td-review-card'));
      return;
    }

    var reportBtn = target.closest('.td-review-report');
    if (reportBtn) {
      e.preventDefault();
      toast('تم إرسال البلاغ للمراجعة', 'info');
    }
  });

  updateCount();
})();
