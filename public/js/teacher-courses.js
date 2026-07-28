(function () {
  var pills = document.querySelectorAll('.td-page-courses .sd-filter-pill');
  var cards = document.querySelectorAll('.td-page-courses .td-course-card');
  if (!pills.length) return;

  var filterMap = {
    'الكل': 'all',
    'منشور': 'is-active',
    'مسودات': 'is-draft',
    'مكتمل': 'is-done'
  };

  function applyFilter(activePill) {
    var label = activePill.textContent.trim();
    var statusClass = filterMap[label] || 'all';
    cards.forEach(function (card) {
      if (statusClass === 'all') {
        card.hidden = false;
        return;
      }
      var status = card.querySelector('.td-course-status');
      card.hidden = !(status && status.classList.contains(statusClass));
    });
  }

  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      pills.forEach(function (p) { p.classList.remove('is-active'); });
      pill.classList.add('is-active');
      applyFilter(pill);
    });
  });

  var pageBtns = document.querySelectorAll('.td-page-courses .td-pagination-pages button:not([aria-label])');
  var perPage = 4;

  function visibleCards() {
    return Array.from(cards).filter(function (card) { return !card.hidden; });
  }

  function showPage(page) {
    var list = visibleCards();
    var start = (page - 1) * perPage;
    cards.forEach(function (card) { card.style.display = 'none'; });
    list.slice(start, start + perPage).forEach(function (card) {
      card.style.display = '';
    });
  }

  pageBtns.forEach(function (btn, index) {
    btn.addEventListener('click', function () {
      pageBtns.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      showPage(index + 1);
    });
  });

  applyFilter(document.querySelector('.td-page-courses .sd-filter-pill.is-active') || pills[0]);
  showPage(1);
})();
