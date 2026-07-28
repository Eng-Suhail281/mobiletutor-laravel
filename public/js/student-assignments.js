(function () {
  var data = window.SD_ASSIGNMENTS;
  if (!data) return;

  var STATUS = {
    progress: { label: 'قيد الإنجاز', className: 'is-progress' },
    done: { label: 'مكتمل', className: 'is-done' },
    late: { label: 'متأخر', className: 'is-late' }
  };

  var activeFilter = 'all';

  function renderAttention() {
    var grid = document.getElementById('assignmentsAttention');
    if (!grid) return;

    grid.innerHTML = data.attention.map(function (item) {
      var href = 'student-assignment.html?id=' + (item.id || 'math');
      return (
        '<article class="sd-attention-card sd-assignment-attention-card">' +
          '<div class="sd-attention-content">' +
            '<h4>' + item.title + '</h4>' +
            '<p>' + item.text + '</p>' +
          '</div>' +
          '<a href="' + href + '" class="sd-btn-primary">' + item.btn + '</a>' +
        '</article>'
      );
    }).join('');
  }

  function renderAssignments(items) {
    var grid = document.getElementById('assignmentsGrid');
    if (!grid) return;

    grid.innerHTML = items.map(function (item) {
      var status = STATUS[item.status] || STATUS.progress;
      var detailUrl = 'student-assignment.html?id=' + (item.id || 'math');
      var actions;

      if (item.status === 'done') {
        actions = '<a href="' + detailUrl + '" class="sd-btn-primary sd-assignment-btn-full">مكتمل</a>';
      } else {
        actions =
          '<a href="' + detailUrl + '" class="sd-btn-outline sd-assignment-btn-outline">رفع الحل</a>' +
          '<a href="' + detailUrl + '" class="sd-btn-primary sd-assignment-btn-primary">متابعة</a>';
      }

      return (
        '<article class="sd-assignment-card" data-status="' + item.status + '" data-title="' + item.title + '" data-progress="' + item.progress + '">' +
          '<span class="sd-assignment-badge ' + status.className + '">' + status.label + '</span>' +
          '<div class="sd-assignment-head">' +
            '<h3>' + item.subject + '</h3>' +
            '<p class="sd-assignment-grade">' + item.grade + '</p>' +
          '</div>' +
          '<h4 class="sd-assignment-title">' + item.title + '</h4>' +
          '<p class="sd-assignment-teacher">' + item.teacher + '</p>' +
          '<p class="sd-assignment-due">' + item.due + '</p>' +
          '<div class="sd-assignment-progress">' +
            '<span class="sd-assignment-progress-pct">' + item.progress + '%</span>' +
            '<div class="sd-assignment-progress-bar">' +
              '<span style="width:' + item.progress + '%"></span>' +
            '</div>' +
          '</div>' +
          '<div class="sd-assignment-actions">' + actions + '</div>' +
        '</article>'
      );
    }).join('');
  }

  function filterItems() {
    var items = data.items;
    if (activeFilter === 'all') return items;
    if (activeFilter === 'done') return items.filter(function (i) { return i.status === 'done'; });
    if (activeFilter === 'submit') return items.filter(function (i) { return i.status === 'progress'; });
    if (activeFilter === 'late') return items.filter(function (i) { return i.status === 'late'; });
    return items;
  }

  function applySearchSort() {
    var cards = Array.from(document.querySelectorAll('#assignmentsGrid .sd-assignment-card'));
    var search = document.querySelector('.sd-assignments-filter input[type="search"]');
    var sort = document.querySelector('.sd-assignments-filter .sd-sort-select');
    var q = search ? search.value.trim().toLowerCase() : '';

    cards.forEach(function (card) {
      var text = card.textContent.toLowerCase();
      card.style.display = !q || text.indexOf(q) !== -1 ? '' : 'none';
    });

    if (sort && cards.length) {
      var grid = document.getElementById('assignmentsGrid');
      var sorted = cards.slice().sort(function (a, b) {
        var pa = parseInt(a.getAttribute('data-progress') || '0', 10);
        var pb = parseInt(b.getAttribute('data-progress') || '0', 10);
        var ta = a.getAttribute('data-title') || '';
        var tb = b.getAttribute('data-title') || '';
        if (sort.selectedIndex === 0) return pa - pb;
        if (sort.selectedIndex === 1) return pb - pa;
        if (sort.selectedIndex === 2) return ta.localeCompare(tb, 'ar');
        return 0;
      });
      sorted.forEach(function (el) { grid.appendChild(el); });
    }
  }

  function initFilters() {
    var pills = document.querySelectorAll('#assignmentFilters .sd-filter-pill');
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) { p.classList.remove('is-active'); });
        pill.classList.add('is-active');
        activeFilter = pill.getAttribute('data-filter');
        renderAssignments(filterItems());
        applySearchSort();
      });
    });

    var search = document.querySelector('.sd-assignments-filter input[type="search"]');
    var sort = document.querySelector('.sd-assignments-filter .sd-sort-select');
    if (search) search.addEventListener('input', applySearchSort);
    if (sort) sort.addEventListener('change', applySearchSort);
  }

  renderAttention();
  renderAssignments(data.items);
  initFilters();
})();
