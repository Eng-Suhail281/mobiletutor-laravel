(function () {
  var searchInput = document.getElementById('searchInput');
  if (!searchInput || !document.querySelector('.spec-item')) return;

  var currentPage = 1;
  var perPage = 9;

  var priceRange = document.getElementById('priceRange');
  var priceValue = document.getElementById('priceValue');
  var freeOnly = document.getElementById('freeOnly');
  var noResults = document.getElementById('noResults');
  var allItems = Array.from(document.querySelectorAll('.spec-item'));
  var toolbarSelects = document.querySelectorAll('.spec-toolbar .spec-filter-select');
  var allPill = document.querySelector('.spec-toolbar .pill-btn[data-filter="all"]');
  var sidebarFilters = {
    specialties: [],
    sessions: [],
    genders: [],
    langs: [],
    sessionTypes: [],
    maxPrice: 100,
    freeOnly: false
  };

  function syncSidebarFilters() {
    sidebarFilters.specialties = getCheckedValues('specialty');
    sidebarFilters.sessions = getCheckedValues('session');
    sidebarFilters.genders = getCheckedValues('gender');
    sidebarFilters.langs = getCheckedValues('lang');
    sidebarFilters.sessionTypes = getCheckedValues('sessionType');
    sidebarFilters.maxPrice = priceRange ? parseInt(priceRange.value, 10) : 100;
    sidebarFilters.freeOnly = !!(freeOnly && freeOnly.checked);
  }

  function updatePriceRangeTrack() {
    if (!priceRange) return;
    var min = parseInt(priceRange.min, 10);
    var max = parseInt(priceRange.max, 10);
    var val = parseInt(priceRange.value, 10);
    var pct = ((val - min) / (max - min)) * 100;
    priceRange.style.setProperty('--range-fill', pct + '%');
  }

  if (priceRange) {
    updatePriceRangeTrack();
    priceRange.addEventListener('input', function () {
      if (priceValue) priceValue.textContent = priceRange.value + '$';
      updatePriceRangeTrack();
    });
  }

  function getCheckedValues(name) {
    return Array.from(document.querySelectorAll('input[name="' + name + '"]:checked')).map(function (cb) {
      return cb.value;
    });
  }

  function getToolbarValue(label) {
    var sel = document.querySelector('.spec-filter-select[aria-label="' + label + '"]');
    return sel ? sel.value : '';
  }

  function matchesTokens(itemValue, selected) {
    if (!selected.length) return true;
    var tokens = (itemValue || '').split(/\s+/);
    return selected.some(function (value) {
      return tokens.indexOf(value) !== -1;
    });
  }

  function matchesSupportType(itemSession, supportType) {
    if (!supportType) return true;
    if (supportType === 'individual') return itemSession.indexOf('individual') !== -1;
    if (supportType === 'group') return itemSession.indexOf('group') !== -1;
    return true;
  }

  function matchesToolbarPrice(price) {
    var band = getToolbarValue('السعر');
    if (!band) return true;
    if (band === 'under20') return price < 20;
    if (band === '20-40') return price >= 20 && price <= 40;
    if (band === 'over40') return price > 40;
    return true;
  }

  function getVisibleItems() {
    var query = searchInput.value.trim().toLowerCase();
    var maxPrice = sidebarFilters.maxPrice;
    var specialties = sidebarFilters.specialties.slice();
    var sessions = sidebarFilters.sessions.slice();
    var genders = sidebarFilters.genders.slice();
    var langs = sidebarFilters.langs.slice();
    var sessionTypes = sidebarFilters.sessionTypes.slice();
    var sidebarFreeOnly = sidebarFilters.freeOnly;

    var toolbarSupport = getToolbarValue('نوع الدعم');
    var toolbarSession = getToolbarValue('نوع الجلسة');
    var toolbarGender = getToolbarValue('الجنس');
    if (toolbarSession) sessions = [toolbarSession];
    if (toolbarGender) genders = [toolbarGender];

    return allItems.filter(function (item) {
      var name = (item.getAttribute('data-name') || '').toLowerCase();
      var roleEl = item.querySelector('.ps-specialist-role');
      var role = roleEl ? roleEl.textContent.toLowerCase() : '';
      var price = parseInt(item.getAttribute('data-price'), 10);
      var specialty = item.getAttribute('data-specialty') || '';
      var session = item.getAttribute('data-session') || '';
      var gender = item.getAttribute('data-gender') || '';
      var lang = item.getAttribute('data-lang') || 'ar';
      var sessionType = item.getAttribute('data-session-type') || '';

      if (query && name.indexOf(query) === -1 && role.indexOf(query) === -1) return false;
      if (sidebarFreeOnly && price !== 0) return false;
      if (!sidebarFreeOnly && priceRange && price > maxPrice) return false;
      if (!matchesToolbarPrice(price)) return false;
      if (!matchesSupportType(session, toolbarSupport)) return false;
      if (specialties.length && !matchesTokens(specialty, specialties)) return false;
      if (sessions.length && !matchesTokens(session, sessions)) return false;
      if (genders.length && genders.indexOf(gender) === -1) return false;
      if (langs.length && langs.indexOf(lang) === -1) return false;
      if (sessionTypes.length && sessionTypes.indexOf(sessionType) === -1) return false;

      return true;
    });
  }

  function resetToolbar() {
    toolbarSelects.forEach(function (sel) {
      sel.selectedIndex = 0;
    });
  }

  function resetSidebar() {
    if (priceRange) {
      priceRange.value = 100;
      if (priceValue) priceValue.textContent = '100$';
      updatePriceRangeTrack();
    }
    if (freeOnly) freeOnly.checked = false;
    document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(function (cb) {
      cb.checked = false;
    });
  }

  function applyFilters() {
    currentPage = 1;
    renderPage();
    updatePagination(Math.ceil(getVisibleItems().length / perPage) || 1);
  }

  function renderPage() {
    var visible = getVisibleItems();
    var start = (currentPage - 1) * perPage;
    var end = start + perPage;

    allItems.forEach(function (item) {
      item.style.display = 'none';
    });

    visible.slice(start, end).forEach(function (item) {
      item.style.display = '';
    });

    if (noResults) noResults.classList.toggle('d-none', visible.length > 0);
  }

  function updatePagination(totalPages) {
    document.querySelectorAll('#pagination .page-item').forEach(function (li) {
      var link = li.querySelector('[data-page]');
      if (!link) return;
      var page = link.getAttribute('data-page');
      li.classList.remove('active', 'disabled');

      if (page === 'prev') {
        if (currentPage <= 1) li.classList.add('disabled');
      } else if (page === 'next') {
        if (currentPage >= totalPages) li.classList.add('disabled');
      } else if (parseInt(page, 10) === currentPage) {
        li.classList.add('active');
      }
    });
  }

  var resetBtn = document.getElementById('resetFilters');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      searchInput.value = '';
      resetSidebar();
      resetToolbar();
      if (allPill) {
        document.querySelectorAll('.spec-toolbar .pill-btn').forEach(function (btn) {
          btn.classList.remove('active');
        });
        allPill.classList.add('active');
      }
      syncSidebarFilters();
      applyFilters();
    });
  }

  var applyBtn = document.getElementById('applyFilters');
  if (applyBtn) {
    applyBtn.addEventListener('click', function () {
      syncSidebarFilters();
      applyFilters();
    });
  }

  searchInput.addEventListener('input', function () {
    currentPage = 1;
    applyFilters();
  });

  document.querySelectorAll('.spec-toolbar .pill-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.spec-toolbar .pill-btn').forEach(function (pill) {
        pill.classList.remove('active');
      });
      btn.classList.add('active');
      if (btn.getAttribute('data-filter') === 'all') {
        resetToolbar();
        resetSidebar();
        syncSidebarFilters();
      }
      applyFilters();
    });
  });

  toolbarSelects.forEach(function (sel) {
    sel.addEventListener('change', function () {
      document.querySelectorAll('.spec-toolbar .pill-btn').forEach(function (pill) {
        pill.classList.remove('active');
      });
      applyFilters();
    });
  });

  var paginationEl = document.getElementById('pagination');
  if (paginationEl) {
    paginationEl.addEventListener('click', function (e) {
      e.preventDefault();
      var link = e.target.closest('[data-page]');
      if (!link) return;

      var page = link.getAttribute('data-page');
      var totalPages = Math.ceil(getVisibleItems().length / perPage) || 1;

      if (page === 'prev' && currentPage > 1) currentPage--;
      else if (page === 'next' && currentPage < totalPages) currentPage++;
      else if (!isNaN(page)) currentPage = parseInt(page, 10);

      renderPage();
      updatePagination(totalPages);
    });
  }

  syncSidebarFilters();
  renderPage();
  updatePagination(Math.ceil(getVisibleItems().length / perPage) || 1);
})();
