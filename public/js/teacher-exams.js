(function () {
  if (!document.querySelector('.td-page-exams')) return;

  function toast(msg, type) {
    if (window.SDUI && SDUI.toast) SDUI.toast(msg, type || 'info');
  }

  function modal(opts) {
    if (window.SDUI && SDUI.modal) SDUI.modal(opts);
    else toast(opts.title || '');
  }

  function toggleUpcomingExams() {
    var examsToggle = document.getElementById('examsViewAll');
    var examsGrid = document.getElementById('upcomingExamsGrid');
    if (!examsToggle || !examsGrid) return;
    var examExtras = examsGrid.querySelectorAll('.td-upcoming-card--extra');
    var examsExpanded = examsToggle.getAttribute('aria-expanded') === 'true';
    examExtras.forEach(function (item) {
      item.hidden = examsExpanded;
    });
    examsToggle.setAttribute('aria-expanded', examsExpanded ? 'false' : 'true');
    examsToggle.textContent = examsExpanded ? 'عرض الكل' : 'عرض أقل';
  }

  var examsViewAllBtn = document.getElementById('examsViewAll');
  if (examsViewAllBtn) {
    examsViewAllBtn.addEventListener('click', function (e) {
      e.preventDefault();
      toggleUpcomingExams();
    });
  }

  document.querySelectorAll('.td-upcoming-card-action').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.TDUI && TDUI.openExamAction) {
        TDUI.openExamAction(btn);
      } else {
        toast(btn.getAttribute('aria-label') || 'فتح الاختبار', 'info');
      }
    });
  });

  document.querySelectorAll('.td-exams-table-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var row = btn.closest('tr');
      var name = row && row.cells[0] ? row.cells[0].textContent : 'الاختبار';
      modal({
        title: 'تحليل الاختبار',
        body:
          '<p class="sd-ui-modal-text"><strong>' + name + '</strong></p>' +
          '<p class="sd-ui-modal-text"><strong>متوسط الدرجات:</strong> 78%</p>' +
          '<p class="sd-ui-modal-text"><strong>نسبة النجاح:</strong> 84%</p>' +
          '<p class="sd-ui-modal-meta">أعلى درجة: 98% — أدنى درجة: 42%</p>',
        actions: [{ label: 'حسناً', primary: true }]
      });
    });
  });

  var createBtn = document.getElementById('tdCreateExamBtn');
  if (createBtn) {
    createBtn.addEventListener('click', function () {
      modal({
        title: 'إنشاء اختبار جديد',
        body:
          '<p class="sd-ui-modal-text">اختر المادة، حدد المدة وعدد الأسئلة، ثم انشر الاختبار للطلاب.</p>',
        actions: [
          { label: 'متابعة', primary: true, onClick: function () { toast('تم فتح نموذج إنشاء الاختبار', 'success'); } },
          { label: 'إلغاء' }
        ]
      });
    });
  }

  var activeFilter = 'all';
  var searchInput = document.getElementById('tdExamsSearch');

  function applyExamFilters() {
    var query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    var upcomingBlock = document.getElementById('examsUpcomingBlock');
    var completedBlock = document.getElementById('examsCompletedBlock');
    var cards = document.querySelectorAll('#upcomingExamsGrid .td-upcoming-card');
    var rows = document.querySelectorAll('#examsCompletedBlock tbody tr');

    if (upcomingBlock) {
      upcomingBlock.hidden = activeFilter === 'completed';
    }
    if (completedBlock) {
      completedBlock.hidden = activeFilter === 'upcoming';
    }

    cards.forEach(function (card) {
      if (card.classList.contains('td-upcoming-card--extra') && examsViewAllBtn && examsViewAllBtn.getAttribute('aria-expanded') !== 'true') {
        card.hidden = true;
        return;
      }
      var text = card.textContent.toLowerCase();
      var matchesSearch = !query || text.indexOf(query) !== -1;
      card.hidden = !matchesSearch;
    });

    rows.forEach(function (row) {
      var text = row.textContent.toLowerCase();
      var matchesSearch = !query || text.indexOf(query) !== -1;
      row.hidden = !matchesSearch;
    });
  }

  document.querySelectorAll('[data-exam-filter]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('[data-exam-filter]').forEach(function (pill) {
        pill.classList.remove('is-active');
      });
      btn.classList.add('is-active');
      activeFilter = btn.getAttribute('data-exam-filter') || 'all';
      applyExamFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyExamFilters);
  }
})();
