(function () {
  var page = document.querySelector('.td-page-account');
  if (!page) return;

  var ui = window.SDUI;

  function feedback(msg, type) {
    if (ui && ui.notice) ui.notice(msg, type || 'info');
    else if (ui && ui.toast) ui.toast(msg, type || 'info');
  }

  function confirmDialog(opts) {
    if (ui && ui.confirm) ui.confirm(opts);
    else if (window.confirm(opts.message || opts.title)) opts.onConfirm && opts.onConfirm();
  }

  function modal(opts) {
    if (ui && ui.modal) ui.modal(opts);
    else feedback(opts.title || '');
  }

  function fieldValue(el) {
    return el ? el.value : '';
  }

  function snapshotForm() {
    var data = {};
    page.querySelectorAll('input, textarea').forEach(function (el) {
      if (el.id) data[el.id] = el.value;
    });
    return data;
  }

  var initialForm = snapshotForm();
  var footerNote = page.querySelector('.td-account-footer p');

  function markDirty() {
    if (footerNote) {
      footerNote.textContent = 'لديك تعديلات غير محفوظة في ملفك الشخصي';
      footerNote.classList.remove('is-saved');
    }
  }

  function markSaved() {
    initialForm = snapshotForm();
    if (footerNote) {
      footerNote.textContent = 'تم حفظ جميع التغييرات بنجاح';
      footerNote.classList.add('is-saved');
    }
    page.querySelectorAll('.td-account-card-body').forEach(function (card) {
      card.classList.add('is-saved-flash');
      window.setTimeout(function () {
        card.classList.remove('is-saved-flash');
      }, 1200);
    });
    feedback('تم حفظ التغييرات', 'success');
  }

  function restoreForm() {
    Object.keys(initialForm).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.value = initialForm[id];
    });
    if (footerNote) {
      footerNote.textContent = 'تم تجاهل التغييرات غير المحفوظة';
      footerNote.classList.remove('is-saved');
    }
    feedback('تم تجاهل التغييرات', 'info');
  }

  function parseExperienceItem(item) {
    var strong = item.querySelector('.td-experience-body strong');
    var desc = item.querySelector('.td-experience-body p');
    var tags = item.querySelectorAll('.td-experience-tags span');
    return {
      title: strong ? strong.textContent.trim() : '',
      desc: desc ? desc.textContent.trim() : '',
      period: tags[0] ? tags[0].textContent.replace(/\s+/g, ' ').trim() : '',
      location: tags[1] ? tags[1].textContent.replace(/\s+/g, ' ').trim() : ''
    };
  }

  function experienceForm(data) {
    data = data || {};
    return (
      '<form class="td-experience-form" id="tdExperienceForm">' +
        '<label class="td-form-group" style="display:block;margin-bottom:12px">المسمى / المؤسسة' +
          '<input type="text" name="title" value="' + (data.title || '').replace(/"/g, '&quot;') + '" style="width:100%;margin-top:6px;padding:10px;border:1px solid #e8ecf4;border-radius:8px;font-family:Cairo,sans-serif">' +
        '</label>' +
        '<label class="td-form-group" style="display:block;margin-bottom:12px">الوصف' +
          '<textarea name="desc" rows="3" style="width:100%;margin-top:6px;padding:10px;border:1px solid #e8ecf4;border-radius:8px;font-family:Cairo,sans-serif">' + (data.desc || '') + '</textarea>' +
        '</label>' +
        '<label class="td-form-group" style="display:block;margin-bottom:12px">الفترة' +
          '<input type="text" name="period" value="' + (data.period || '').replace(/"/g, '&quot;') + '" style="width:100%;margin-top:6px;padding:10px;border:1px solid #e8ecf4;border-radius:8px;font-family:Cairo,sans-serif">' +
        '</label>' +
        '<label class="td-form-group" style="display:block">الموقع' +
          '<input type="text" name="location" value="' + (data.location || '').replace(/"/g, '&quot;') + '" style="width:100%;margin-top:6px;padding:10px;border:1px solid #e8ecf4;border-radius:8px;font-family:Cairo,sans-serif">' +
        '</label>' +
      '</form>'
    );
  }

  function applyExperienceData(item, data) {
    var strong = item.querySelector('.td-experience-body strong');
    var desc = item.querySelector('.td-experience-body p');
    var tags = item.querySelectorAll('.td-experience-tags span');
    if (strong) strong.textContent = data.title || 'خبرة جديدة';
    if (desc) desc.textContent = data.desc || '';
    if (tags[0]) tags[0].innerHTML = '<i class="bi bi-calendar3" aria-hidden="true"></i> ' + (data.period || '—');
    if (tags[1]) tags[1].innerHTML = '<i class="bi bi-geo-alt" aria-hidden="true"></i> ' + (data.location || '—');
  }

  function createExperienceItem(data) {
    var article = document.createElement('article');
    article.className = 'td-experience-item';
    article.innerHTML =
      '<div class="td-experience-body">' +
        '<strong></strong>' +
        '<p></p>' +
        '<div class="td-experience-tags">' +
          '<span><i class="bi bi-calendar3" aria-hidden="true"></i></span>' +
          '<span><i class="bi bi-geo-alt" aria-hidden="true"></i></span>' +
        '</div>' +
      '</div>' +
      '<div class="td-experience-actions">' +
        '<button type="button" aria-label="حذف"><i class="bi bi-trash"></i></button>' +
        '<button type="button" aria-label="تعديل"><i class="bi bi-pencil"></i></button>' +
      '</div>';
    applyExperienceData(article, data);
    return article;
  }

  function openExperienceEditor(item, isNew) {
    var data = item ? parseExperienceItem(item) : {};
    modal({
      title: isNew ? 'إضافة خبرة جديدة' : 'تعديل الخبرة',
      body: experienceForm(data),
      actions: [
        {
          label: isNew ? 'إضافة' : 'حفظ',
          primary: true,
          onClick: function () {
            var form = document.getElementById('tdExperienceForm');
            if (!form) return false;
            var next = {
              title: fieldValue(form.querySelector('[name="title"]')),
              desc: fieldValue(form.querySelector('[name="desc"]')),
              period: fieldValue(form.querySelector('[name="period"]')),
              location: fieldValue(form.querySelector('[name="location"]'))
            };
            if (!next.title.trim()) {
              feedback('يرجى إدخال المسمى أو المؤسسة', 'info');
              return false;
            }
            if (isNew) {
              var timeline = page.querySelector('.td-experience-timeline');
              if (timeline) timeline.insertBefore(createExperienceItem(next), timeline.firstChild);
            } else if (item) {
              applyExperienceData(item, next);
            }
            markDirty();
            feedback(isNew ? 'تمت إضافة الخبرة' : 'تم تحديث الخبرة', 'success');
          }
        },
        { label: 'إلغاء' }
      ]
    });
  }

  page.addEventListener('input', function (e) {
    if (e.target.matches('input, textarea')) markDirty();
  });

  page.addEventListener('click', function (e) {
    var expBtn = e.target.closest('.td-experience-actions button');
    if (expBtn) {
      e.preventDefault();
      var item = expBtn.closest('.td-experience-item');
      if (expBtn.querySelector('.bi-trash')) {
        confirmDialog({
          title: 'حذف الخبرة',
          message: 'هل تريد حذف هذه الخبرة من ملفك؟',
          confirmText: 'حذف',
          onConfirm: function () {
            if (item) item.remove();
            markDirty();
            feedback('تم حذف الخبرة', 'success');
          }
        });
      } else {
        openExperienceEditor(item, false);
      }
      return;
    }

    var addBtn = e.target.closest('.td-experience-add');
    if (addBtn) {
      e.preventDefault();
      openExperienceEditor(null, true);
      return;
    }

    var saveBtn = e.target.closest('.td-account-save');
    if (saveBtn) {
      e.preventDefault();
      markSaved();
      return;
    }

    var cancelBtn = e.target.closest('.td-account-cancel');
    if (cancelBtn) {
      e.preventDefault();
      restoreForm();
    }
  });
})();
