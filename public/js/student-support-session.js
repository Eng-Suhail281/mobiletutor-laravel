(function () {
  var data = window.SD_SUPPORT && window.SD_SUPPORT.upcomingSession;
  if (!data) return;

  var titleEl = document.getElementById('sessionTitle');
  var subtitleEl = document.getElementById('sessionSubtitle');
  var statusEl = document.getElementById('sessionStatus');
  var pillsEl = document.getElementById('sessionPills');
  var notesEl = document.getElementById('sessionNotes');
  var prepEl = document.getElementById('sessionPreparation');
  var specialistEl = document.getElementById('sessionSpecialist');
  var joinBtn = document.getElementById('sessionJoinBtn');
  var cancelBtn = document.getElementById('sessionCancelBtn');

  if (titleEl) titleEl.textContent = data.title;
  if (subtitleEl) subtitleEl.textContent = data.type + ' — ' + data.specialty;
  if (statusEl) statusEl.textContent = data.statusLabel || 'مؤكدة';
  if (notesEl) notesEl.textContent = data.notes || '';

  if (pillsEl) {
    pillsEl.innerHTML = [
      { label: 'التاريخ', value: data.date, icon: 'calendar3' },
      { label: 'الوقت', value: data.time, icon: 'clock' },
      { label: 'المدة', value: data.duration, icon: 'hourglass-split' },
      { label: 'النوع', value: data.type, icon: 'camera-video' }
    ].map(function (item) {
      return (
        '<div class="sd-support-session-pill">' +
          '<i class="bi bi-' + item.icon + '"></i>' +
          '<span class="sd-support-session-pill-label">' + item.label + '</span>' +
          '<strong>' + item.value + '</strong>' +
        '</div>'
      );
    }).join('');
  }

  if (prepEl && data.preparation) {
    prepEl.innerHTML = data.preparation.map(function (item) {
      return '<li><i class="bi bi-check-circle-fill"></i><span>' + item + '</span></li>';
    }).join('');
  }

  if (specialistEl) {
    specialistEl.innerHTML =
      '<img src="' + data.avatar + '" alt="' + data.specialistName + '" class="sd-support-session-specialist-avatar">' +
      '<div>' +
        '<span class="sd-support-session-specialist-label">المختص</span>' +
        '<h3>' + data.specialistName + '</h3>' +
        '<p>' + data.specialistTitle + '</p>' +
        '<div class="sd-support-session-specialist-meta">' +
          '<span><i class="bi bi-star-fill"></i> ' + data.rating + '</span>' +
          '<span><i class="bi bi-patch-check-fill"></i> معتمدة</span>' +
        '</div>' +
      '</div>';
  }

  if (joinBtn) {
    joinBtn.addEventListener('click', function () {
      if (window.SDUI) {
        SDUI.modal({
          title: 'انضمام للجلسة',
          body: '<p class="sd-ui-modal-text">سيُفعّل زر الانضمام قبل موعد الجلسة بـ 10 دقائق. ستصلك إشعار على المنصة عند فتح الغرفة.</p>',
          actions: [
            { label: 'حسناً', primary: true },
            { label: 'أضف للتقويم', onClick: function () {
              if (window.SDUI && SDUI.toast) SDUI.toast('تم حفظ تذكير الجلسة');
            }}
          ]
        });
      }
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', function () {
      if (!window.SDUI) return;
      SDUI.modal({
        title: 'إلغاء الجلسة',
        body: '<p class="sd-ui-modal-text">هل تريد إلغاء جلسة الدعم مع ' + data.specialistName + '؟ يمكنك إعادة الحجز لاحقاً من صفحة الدعم النفسي.</p>',
        actions: [
          { label: 'نعم، إلغاء الجلسة', primary: true, onClick: function () {
            window.location.href = 'student-support.html';
            if (SDUI.toast) SDUI.toast('تم إلغاء الجلسة');
          }},
          { label: 'تراجع' }
        ]
      });
    });
  }
})();
