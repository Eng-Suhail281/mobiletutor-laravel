(function () {
  var searchInput = document.getElementById('courseSearch');
  var filterBtns = document.querySelectorAll('#courseFilters .sd-filter-pill');
  var items = Array.from(document.querySelectorAll('.sd-subject-item'));
  var activeFilter = 'all';

  function applyFilters() {
    var query = searchInput ? searchInput.value.trim().toLowerCase() : '';

    items.forEach(function (item) {
      var name = (item.getAttribute('data-name') || '').toLowerCase();
      var title = item.querySelector('h3').textContent.toLowerCase();
      var status = item.getAttribute('data-status');
      var matchSearch = !query || name.indexOf(query) !== -1 || title.indexOf(query) !== -1;
      var matchFilter = activeFilter === 'all' || status === activeFilter;
      item.style.display = matchSearch && matchFilter ? '' : 'none';
    });
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      activeFilter = btn.getAttribute('data-filter');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  var attentionLinks = document.querySelectorAll('.sd-attention-section .sd-attention-card .sd-btn-primary');
  var attentionHrefs = ['student-exams.html', 'student-assignment.html?id=math', 'student-schedule.html'];
  attentionLinks.forEach(function (link, i) {
    if (attentionHrefs[i]) link.href = attentionHrefs[i];
  });

  var showAll = document.querySelector('.sd-section-head--attention .sd-link');
  if (showAll) showAll.href = 'student-assignments.html';

  var sortSelect = document.querySelector('.sd-sort-select');
  if (sortSelect && items.length) {
    sortSelect.addEventListener('change', function () {
      var grid = document.querySelector('#subjectsGrid');
      if (!grid) return;
      var sorted = items.slice().sort(function (a, b) {
        var pa = parseInt((a.querySelector('.sd-course-pct') || {}).textContent || '0', 10);
        var pb = parseInt((b.querySelector('.sd-course-pct') || {}).textContent || '0', 10);
        var na = a.querySelector('h3').textContent;
        var nb = b.querySelector('h3').textContent;
        if (sortSelect.selectedIndex === 0) return pb - pa;
        if (sortSelect.selectedIndex === 1) return pa - pb;
        if (sortSelect.selectedIndex === 3) return na.localeCompare(nb, 'ar');
        return 0;
      });
      sorted.forEach(function (el) { grid.appendChild(el); });
    });
  }
})();
