(function () {
  var page = document.querySelector('.td-page-course-edit, .td-page-course-create');
  if (!page) return;

  var ui = window.SDUI;
  function toast(msg, type) {
    if (ui && ui.toast) ui.toast(msg, type || 'info');
  }
  function confirmDialog(opts) {
    if (ui && ui.confirm) ui.confirm(opts);
    else if (window.confirm(opts.message || opts.title)) opts.onConfirm && opts.onConfirm();
  }
  function modal(opts) {
    if (ui && ui.modal) ui.modal(opts);
    else toast(opts.title || '');
  }

  var curriculumSection = page.querySelector('.td-edit-section .td-curriculum-unit')
    ? page.querySelector('.td-edit-section .td-curriculum-unit').closest('.td-edit-section')
    : null;

  document.querySelectorAll('.td-privacy-options--course .td-privacy-option').forEach(function (option) {
    option.addEventListener('click', function () {
      document.querySelectorAll('.td-privacy-options--course .td-privacy-option').forEach(function (item) {
        item.classList.remove('is-selected');
      });
      option.classList.add('is-selected');
      var input = option.querySelector('input[type="radio"]');
      if (input) input.checked = true;
    });
  });

  document.querySelectorAll('.td-pricing-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      page.querySelectorAll('.td-pricing-tab').forEach(function (t) {
        t.classList.remove('is-active');
      });
      tab.classList.add('is-active');
      var priceInput = document.getElementById('price');
      if (priceInput) {
        priceInput.disabled = tab.textContent.indexOf('مجانية') !== -1;
        if (priceInput.disabled) priceInput.value = '0';
      }
    });
  });

  document.querySelectorAll('.td-tag-suggestion').forEach(function (tag) {
    tag.addEventListener('click', function () {
      var desc = document.getElementById('courseDesc');
      if (!desc) return;
      var text = tag.textContent.trim();
      if (desc.value.indexOf(text) === -1) {
        desc.value = (desc.value ? desc.value + ' ' : '') + text;
      }
    });
  });

  var coverInput = document.getElementById('courseCoverInput');
  var thumbInput = document.getElementById('courseThumbInput');

  function applyUploadPreview(box, file) {
    if (!box || !file || !file.type.match(/^image\//)) return;
    var preview = box.querySelector('.td-upload-box-preview');
    if (!preview) return;
    var url = URL.createObjectURL(file);
    preview.src = url;
    preview.hidden = false;
    box.classList.add('has-preview');
  }

  function handleUploadFile(box, file) {
    if (!file) return;
    if (!file.type.match(/^image\//)) {
      toast('يرجى اختيار ملف صورة (JPG أو PNG أو WebP)', 'info');
      return;
    }
    applyUploadPreview(box, file);
    var label = box.getAttribute('data-upload') === 'cover' ? 'صورة الغلاف' : 'الصورة المصغرة';
    toast('تم رفع ' + label + ' بنجاح', 'success');
  }

  function initUploadBox(box) {
    var type = box.getAttribute('data-upload');
    var input = type === 'cover' ? coverInput : thumbInput;
    if (!input) return;

    box.addEventListener('click', function () {
      input.click();
    });

    input.addEventListener('change', function () {
      if (!input.files || !input.files[0]) return;
      handleUploadFile(box, input.files[0]);
    });

    ['dragenter', 'dragover'].forEach(function (evt) {
      box.addEventListener(evt, function (e) {
        e.preventDefault();
        e.stopPropagation();
        box.classList.add('is-dragover');
      });
    });

    ['dragleave', 'drop'].forEach(function (evt) {
      box.addEventListener(evt, function (e) {
        e.preventDefault();
        e.stopPropagation();
        box.classList.remove('is-dragover');
      });
    });

    box.addEventListener('drop', function (e) {
      var file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if (file) {
        handleUploadFile(box, file);
        input.value = '';
      }
    });
  }

  page.querySelectorAll('.td-upload-box[data-upload]').forEach(initUploadBox);

  document.querySelectorAll('.td-edit-cover-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (coverInput) coverInput.click();
      else toast('فتح محرر الوسائط', 'info');
    });
  });

  function nextUnitNumber() {
    return page.querySelectorAll('.td-curriculum-unit').length + 1;
  }

  function lessonIconClass(type) {
    if (type === 'pdf') return 'bi-file-earmark-pdf';
    if (type === 'quiz') return 'bi-patch-question';
    return 'bi-play-circle';
  }

  function lessonFormBody(values) {
    values = values || {};
    function sel(v) { return values.type === v ? ' selected' : ''; }
    return (
      '<div class="td-exam-edit-form">' +
        '<div class="td-form-group">' +
          '<label for="lessonTitle">عنوان الدرس</label>' +
          '<input type="text" id="lessonTitle" value="' + (values.title || '') + '" placeholder="مثلاً: مقدمة الوحدة">' +
        '</div>' +
        '<div class="td-form-row td-form-row--exam-edit">' +
          '<div class="td-form-group">' +
            '<label for="lessonType">نوع الدرس</label>' +
            '<select id="lessonType">' +
              '<option value="video"' + sel('video') + '>فيديو</option>' +
              '<option value="pdf"' + sel('pdf') + '>ملف PDF</option>' +
              '<option value="quiz"' + sel('quiz') + '>اختبار قصير</option>' +
            '</select>' +
          '</div>' +
          '<div class="td-form-group">' +
            '<label for="lessonMeta">المدة / الحجم</label>' +
            '<input type="text" id="lessonMeta" value="' + (values.meta || '') + '" placeholder="مثلاً: 05:20 دقيقة">' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function readLessonForm() {
    var titleEl = document.getElementById('lessonTitle');
    var typeEl = document.getElementById('lessonType');
    var metaEl = document.getElementById('lessonMeta');
    return {
      title: titleEl && titleEl.value.trim() ? titleEl.value.trim() : 'درس جديد',
      type: typeEl ? typeEl.value : 'video',
      meta: metaEl && metaEl.value.trim() ? metaEl.value.trim() : '00:00 دقيقة'
    };
  }

  function fillLesson(lesson, values) {
    lesson.innerHTML =
      '<i class="bi ' + lessonIconClass(values.type) + '" aria-hidden="true"></i>' +
      '<div><strong>' + values.title + '</strong><span>' + values.meta + '</span></div>' +
      '<button type="button" class="td-curriculum-lesson-edit">تعديل</button>';
    bindLesson(lesson);
  }

  function bindLesson(lesson) {
    var editBtn = lesson.querySelector('.td-curriculum-lesson-edit');
    if (!editBtn) return;
    editBtn.addEventListener('click', function () {
      var strong = lesson.querySelector('strong');
      var span = lesson.querySelector('span');
      var iconEl = lesson.querySelector('i');
      var type = 'video';
      if (iconEl && iconEl.classList.contains('bi-file-earmark-pdf')) type = 'pdf';
      else if (iconEl && iconEl.classList.contains('bi-patch-question')) type = 'quiz';

      modal({
        title: 'تعديل الدرس',
        body: lessonFormBody({
          title: strong ? strong.textContent : '',
          meta: span ? span.textContent : '',
          type: type
        }),
        actions: [
          {
            label: 'حفظ التغييرات',
            primary: true,
            onClick: function () {
              fillLesson(lesson, readLessonForm());
              toast('تم حفظ تعديلات الدرس', 'success');
            }
          },
          { label: 'إلغاء' }
        ]
      });
    });
  }

  function createUnit(num) {
    var article = document.createElement('article');
    article.className = 'td-curriculum-unit';
    article.innerHTML =
      '<div class="td-curriculum-unit-head">' +
        '<div class="td-curriculum-unit-start">' +
          '<button type="button" class="td-curriculum-grip" aria-label="سحب القسم"><i class="bi bi-grip-vertical"></i></button>' +
          '<span class="td-curriculum-num">' + num + '</span>' +
          '<h4>قسم جديد</h4>' +
        '</div>' +
        '<div class="td-curriculum-unit-tools">' +
          '<button type="button" aria-label="تعديل القسم"><i class="bi bi-pencil"></i></button>' +
          '<button type="button" aria-label="حذف القسم"><i class="bi bi-trash3"></i></button>' +
          '<button type="button" aria-label="طي القسم"><i class="bi bi-chevron-down"></i></button>' +
        '</div>' +
      '</div>' +
      '<button type="button" class="td-curriculum-add"><i class="bi bi-plus-lg" aria-hidden="true"></i> إضافة درس</button>';
    bindUnitTools(article);
    return article;
  }

  function bindUnitTools(unit) {
    unit.querySelectorAll('.td-curriculum-unit-tools button').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (btn.querySelector('.bi-trash3')) {
          confirmDialog({
            title: 'حذف القسم',
            message: 'هل تريد حذف هذا القسم وجميع دروسه؟',
            confirmText: 'حذف',
            onConfirm: function () {
              unit.remove();
              toast('تم حذف القسم', 'success');
            }
          });
          return;
        }
        if (btn.querySelector('.bi-chevron-down')) {
          unit.classList.toggle('is-collapsed');
          toast(unit.classList.contains('is-collapsed') ? 'تم طي القسم' : 'تم عرض القسم', 'info');
          return;
        }
        var titleEl = unit.querySelector('.td-curriculum-unit-start h4');
        modal({
          title: 'تعديل القسم',
          body:
            '<div class="td-exam-edit-form">' +
              '<div class="td-form-group">' +
                '<label for="sectionTitle">عنوان القسم</label>' +
                '<input type="text" id="sectionTitle" value="' + (titleEl ? titleEl.textContent : '') + '" placeholder="مثلاً: مقدمة الوحدة الأولى">' +
              '</div>' +
            '</div>',
          actions: [
            {
              label: 'حفظ',
              primary: true,
              onClick: function () {
                var input = document.getElementById('sectionTitle');
                if (titleEl && input && input.value.trim()) {
                  titleEl.textContent = input.value.trim();
                  toast('تم تحديث عنوان القسم', 'success');
                }
              }
            },
            { label: 'إلغاء' }
          ]
        });
      });
    });

    var addLesson = unit.querySelector('.td-curriculum-add');
    if (addLesson) {
      addLesson.addEventListener('click', function () {
        modal({
          title: 'إضافة درس جديد',
          body: lessonFormBody({ type: 'video' }),
          actions: [
            {
              label: 'إضافة الدرس',
              primary: true,
              onClick: function () {
                var lesson = document.createElement('div');
                lesson.className = 'td-curriculum-lesson';
                unit.insertBefore(lesson, addLesson);
                fillLesson(lesson, readLessonForm());
                toast('تمت إضافة الدرس بنجاح', 'success');
              }
            },
            { label: 'إلغاء' }
          ]
        });
      });
    }

    unit.querySelectorAll('.td-curriculum-lesson').forEach(bindLesson);
  }

  page.querySelectorAll('.td-curriculum-unit').forEach(bindUnitTools);

  document.querySelectorAll('.td-edit-add-section').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!curriculumSection) return;
      var unit = createUnit(nextUnitNumber());
      curriculumSection.appendChild(unit);
      toast('تمت إضافة قسم جديد', 'success');
    });
  });

  var saveBtn = document.querySelector('.td-edit-save');
  if (saveBtn) {
    saveBtn.addEventListener('click', function () {
      toast('تم حفظ التعديلات', 'success');
      window.setTimeout(function () {
        window.location.href = 'teacher-course.html';
      }, 800);
    });
  }

  var publishBtn = document.querySelector('.td-create-publish');
  if (publishBtn) {
    publishBtn.addEventListener('click', function () {
      var title = document.getElementById('courseTitle');
      if (title && !title.value.trim()) {
        toast('يرجى إدخال عنوان المادة', 'info');
        title.focus();
        return;
      }
      toast('تم نشر المادة بنجاح', 'success');
      window.setTimeout(function () {
        window.location.href = 'teacher-course.html';
      }, 900);
    });
  }

  var previewBtn = document.querySelector('.td-create-preview');
  if (previewBtn) {
    previewBtn.addEventListener('click', function () {
      var titleEl = document.getElementById('courseTitle');
      var descEl = document.getElementById('courseDesc');
      var priceEl = document.getElementById('price');
      var catEl = document.getElementById('courseCat');
      var levelEl = page.querySelector('.td-level-pill.is-active');

      var title = titleEl && titleEl.value.trim() ? titleEl.value.trim() : 'المادة الجديدة';
      var desc = descEl && descEl.value.trim() ? descEl.value.trim() : 'لم تتم إضافة وصف للمادة بعد.';
      var price = priceEl && priceEl.value ? priceEl.value + ' ر.س' : 'غير محدد';
      var cat = catEl && catEl.selectedIndex > 0 ? catEl.options[catEl.selectedIndex].text : 'غير مصنّف';
      var level = levelEl ? levelEl.textContent.trim() : 'مبتدئ';
      var lessons = page.querySelectorAll('.td-curriculum-lesson').length;
      var units = page.querySelectorAll('.td-curriculum-unit').length;

      modal({
        title: 'معاينة المادة',
        body:
          '<div class="td-preview-modal">' +
            '<h3 class="td-preview-title">' + title + '</h3>' +
            '<p class="td-preview-desc">' + desc + '</p>' +
            '<ul class="sd-ui-result-list">' +
              '<li><span>التصنيف</span><strong>' + cat + '</strong></li>' +
              '<li><span>المستوى المستهدف</span><strong>' + level + '</strong></li>' +
              '<li><span>السعر</span><strong>' + price + '</strong></li>' +
              '<li><span>محتوى المنهج</span><strong>' + units + ' وحدة · ' + lessons + ' درس</strong></li>' +
            '</ul>' +
            '<p class="sd-ui-modal-meta">هذه معاينة سريعة لشكل المادة كما ستظهر للطلاب قبل النشر.</p>' +
          '</div>',
        actions: [
          { label: 'متابعة التعديل' },
          {
            label: 'فتح صفحة المعاينة',
            primary: true,
            onClick: function () { window.location.href = 'teacher-course.html'; }
          }
        ]
      });
    });
  }
})();
