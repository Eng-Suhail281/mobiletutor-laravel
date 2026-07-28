// Courses page - simple filter, search & pagination
(function () {
  var searchInput = document.getElementById('searchInput');
  var coursesGrid = document.getElementById('coursesGrid');
  if (!searchInput || !coursesGrid) return;

  var currentPage = 1;
  var perPage = 6;
  var activePill = 'all';

  var priceRange = document.getElementById('priceRange');
  var priceValue = document.getElementById('priceValue');
  var freeOnly = document.getElementById('freeOnly');
  var noResults = document.getElementById('noResults');
  var allItems = Array.from(document.querySelectorAll('.course-item'));
  var sortSelect = document.getElementById('sortSelect');
  var initialFilter = new URLSearchParams(window.location.search).get('filter');
  var sidebarFilters = {
    categories: [],
    levels: [],
    durations: [],
    langs: [],
    types: [],
    maxPrice: 100,
    freeOnly: false
  };

  function getCheckedValues(name) {
    return Array.from(document.querySelectorAll('input[name="' + name + '"]:checked')).map(function (cb) {
      return cb.value;
    });
  }

  function syncSidebarFilters() {
    sidebarFilters.categories = getCheckedValues('category');
    sidebarFilters.levels = getCheckedValues('level');
    sidebarFilters.durations = getCheckedValues('duration');
    sidebarFilters.langs = getCheckedValues('lang');
    sidebarFilters.types = getCheckedValues('type');
    sidebarFilters.maxPrice = priceRange ? parseInt(priceRange.value, 10) : 100;
    sidebarFilters.freeOnly = !!(freeOnly && freeOnly.checked);
  }

  if (initialFilter) {
    var initialPill = document.querySelector('.courses-toolbar .pill-btn[data-filter="' + initialFilter + '"]');
    if (initialPill) {
      document.querySelectorAll('.courses-toolbar .pill-btn').forEach(function (b) { b.classList.remove('active'); });
      initialPill.classList.add('active');
      activePill = initialFilter;
    }
  }

  document.querySelectorAll('.courses-toolbar .pill-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.courses-toolbar .pill-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      activePill = btn.getAttribute('data-filter');
      currentPage = 1;
      applyFilters();
    });
  });

  function updatePriceRangeTrack() {
    if (!priceRange) return;
    var min = parseInt(priceRange.min, 10);
    var max = parseInt(priceRange.max, 10);
    var val = parseInt(priceRange.value, 10);
    var pct = ((val - min) / (max - min)) * 100;
    priceRange.style.setProperty('--range-fill', pct + '%');
  }

  // Price range label
  if (priceRange) {
    updatePriceRangeTrack();
    priceRange.addEventListener('input', function () {
      priceValue.textContent = priceRange.value + '$';
      updatePriceRangeTrack();
    });
  }

  // Reset filters
  var resetFilters = document.getElementById('resetFilters');
  if (resetFilters) {
    resetFilters.addEventListener('click', function () {
      searchInput.value = '';
      if (priceRange) {
        priceRange.value = 100;
        if (priceValue) priceValue.textContent = '100$';
        updatePriceRangeTrack();
      }
      if (freeOnly) freeOnly.checked = false;
      activePill = 'all';
      document.querySelectorAll('.courses-toolbar .pill-btn').forEach(function (b) { b.classList.remove('active'); });
      var allPill = document.querySelector('.courses-toolbar .pill-btn[data-filter="all"]');
      if (allPill) allPill.classList.add('active');
      document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(function (cb) {
        cb.checked = cb.value === 'all';
      });
      syncSidebarFilters();
      currentPage = 1;
      applyFilters();
    });
  }

  var applyFiltersBtn = document.getElementById('applyFilters');
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', function () {
      syncSidebarFilters();
      currentPage = 1;
      applyFilters();
    });
  }
  searchInput.addEventListener('input', function () {
    currentPage = 1;
    applyFilters();
  });

  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      currentPage = 1;
      applyFilters();
    });
  }

  // Pagination
  var pagination = document.getElementById('pagination');
  if (pagination) {
    pagination.addEventListener('click', function (e) {
    e.preventDefault();
    var link = e.target.closest('[data-page]');
    if (!link) return;

    var page = link.getAttribute('data-page');
    var totalPages = Math.ceil(getVisibleItems().length / perPage) || 1;

    if (page === 'prev' && currentPage > 1) currentPage--;
    else if (page === 'next' && currentPage < totalPages) currentPage++;
    else if (!isNaN(page)) currentPage = parseInt(page);

    showPage();
    updatePagination();
    });
  }

  function getVisibleItems() {
    var search = searchInput.value.trim().toLowerCase();
    var maxPrice = sidebarFilters.maxPrice;
    var categories = sidebarFilters.categories;
    var levels = sidebarFilters.levels;
    var durations = sidebarFilters.durations;
    var langs = sidebarFilters.langs;
    var types = sidebarFilters.types;
    var sidebarFreeOnly = sidebarFilters.freeOnly;

    var visible = allItems.filter(function (item) {
      var title = item.querySelector('h5').textContent.toLowerCase();
      var price = parseInt(item.getAttribute('data-price'), 10);
      var tag = item.getAttribute('data-tag') || '';
      var cat = item.getAttribute('data-category');
      var level = item.getAttribute('data-level');
      var duration = item.getAttribute('data-duration');
      var lang = item.getAttribute('data-lang');
      var type = item.getAttribute('data-type');

      if (search && title.indexOf(search) === -1) return false;
      if (sidebarFreeOnly && price !== 0) return false;
      if (!sidebarFreeOnly && price > maxPrice) return false;
      if (activePill !== 'all' && tag.indexOf(activePill) === -1) return false;
      if (categories.length && !categories.includes('all') && categories.indexOf(cat) === -1) return false;
      if (levels.length && levels.indexOf(level) === -1) return false;
      if (durations.length && durations.indexOf(duration) === -1) return false;
      if (langs.length && langs.indexOf(lang) === -1) return false;
      if (types.length && types.indexOf(type) === -1) return false;

      return true;
    });

    var sortValue = sortSelect ? sortSelect.value : 'popular';
    visible.sort(function (a, b) {
      var priceA = parseInt(a.getAttribute('data-price'), 10);
      var priceB = parseInt(b.getAttribute('data-price'), 10);
      if (sortValue === 'price-low') return priceA - priceB;
      if (sortValue === 'price-high') return priceB - priceA;
      if (sortValue === 'newest') {
        var newA = (a.getAttribute('data-tag') || '').indexOf('new') !== -1 ? 1 : 0;
        var newB = (b.getAttribute('data-tag') || '').indexOf('new') !== -1 ? 1 : 0;
        return newB - newA;
      }
      var topA = (a.getAttribute('data-tag') || '').indexOf('top') !== -1 ? 1 : 0;
      var topB = (b.getAttribute('data-tag') || '').indexOf('top') !== -1 ? 1 : 0;
      return topB - topA;
    });

    return visible;
  }

  function applyFilters() {
    var visible = getVisibleItems();
    var visibleSet = new Set(visible);

    allItems.forEach(function (item) {
      item.classList.add('d-none');
    });

    if (noResults) noResults.classList.toggle('d-none', visible.length > 0);
    showPage();
    updatePagination();
  }

  function showPage() {
    var visible = getVisibleItems();
    var start = (currentPage - 1) * perPage;
    var pageItems = visible.slice(start, start + perPage);

    allItems.forEach(function (item) {
      item.classList.add('d-none');
    });

    pageItems.forEach(function (item) {
      item.classList.remove('d-none');
      coursesGrid.appendChild(item);
    });
  }

  function updatePagination() {
    var total = Math.ceil(getVisibleItems().length / perPage) || 1;
    if (currentPage > total) currentPage = total;

    document.querySelectorAll('#pagination .page-item').forEach(function (li) {
      li.classList.remove('active', 'disabled');
    });

    document.querySelectorAll('#pagination [data-page]').forEach(function (link) {
      var page = link.getAttribute('data-page');
      var li = link.parentElement;

      if (page === String(currentPage)) li.classList.add('active');
      if (page === 'prev' && currentPage === 1) li.classList.add('disabled');
      if (page === 'next' && currentPage === total) li.classList.add('disabled');
      if (!isNaN(page) && parseInt(page) > total) li.classList.add('d-none');
      else if (!isNaN(page)) li.classList.remove('d-none');
    });
  }

  syncSidebarFilters();
  applyFilters();
})();
