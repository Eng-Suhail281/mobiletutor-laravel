(function () {
  'use strict';

  var ui = window.SDUI;

  function toast(msg, type) {
    if (ui && ui.notice) ui.notice(msg, type || 'info');
  }

  function confirmDialog(opts) {
    if (ui && ui.confirm) {
      ui.confirm(opts);
      return;
    }
    if (window.confirm(opts.message || opts.title || 'تأكيد')) {
      if (opts.onConfirm) opts.onConfirm();
    }
  }

  function modal(opts) {
    if (ui && ui.modal) ui.modal(opts);
    else toast(opts.title || '');
  }

  function navigate(href) {
    if (href && href !== '#') window.location.href = href;
  }

  function labelOf(el) {
    return (el.getAttribute('aria-label') || el.textContent || '').trim();
  }

  function activatePill(pill, selector) {
    var group = pill.closest('.sd-filter-pills, .td-channel-pills, .td-level-pills, .td-view-toggle');
    if (!group) return;
    group.querySelectorAll(selector || 'button').forEach(function (btn) {
      btn.classList.remove('is-active');
    });
    pill.classList.add('is-active');
  }

  function ensureHiddenFileInput(id) {
    var input = document.getElementById(id);
    if (input) return input;
    input = document.createElement('input');
    input.type = 'file';
    input.id = id;
    input.hidden = true;
    document.body.appendChild(input);
    return input;
  }

  var coverInput = ensureHiddenFileInput('saCoverFileInput');
  coverInput.accept = 'image/*';
  coverInput.addEventListener('change', function () {
    if (!coverInput.files || !coverInput.files[0]) return;
    var reader = new FileReader();
    reader.onload = function (ev) {
      document.querySelectorAll('.td-cover-preview--course img, .td-cover-preview img').forEach(function (img) {
        img.src = ev.target.result;
      });
      if (ui && ui.notice) ui.notice('تم تحديث صورة الغلاف', 'success');
    };
    reader.readAsDataURL(coverInput.files[0]);
    coverInput.value = '';
  });

  var avatarInput = ensureHiddenFileInput('saAvatarFileInput');
  avatarInput.accept = 'image/*';
  avatarInput.addEventListener('change', function () {
    if (!avatarInput.files || !avatarInput.files[0]) return;
    var reader = new FileReader();
    reader.onload = function (ev) {
      document.querySelectorAll('.td-profile-avatar--edit img, .td-page-account .sd-avatar--img img, .td-page-account .sd-profile-wrap .sd-avatar img').forEach(function (img) {
        img.src = ev.target.result;
      });
      if (ui && ui.notice) ui.notice('تم تحديث صورة الملف الشخصي', 'success');
    };
    reader.readAsDataURL(avatarInput.files[0]);
    avatarInput.value = '';
  });

  var uploadInput = ensureHiddenFileInput('saUploadFileInput');
  uploadInput.addEventListener('change', function () {
    if (!uploadInput.files || !uploadInput.files[0]) return;
    toast('تم رفع «' + uploadInput.files[0].name + '»', 'success');
    uploadInput.value = '';
  });

  var chatFileInput = ensureHiddenFileInput('saChatFileInput');
  chatFileInput.addEventListener('change', function () {
    if (!chatFileInput.files || !chatFileInput.files[0]) return;
    toast('تم إرفاق «' + chatFileInput.files[0].name + '»', 'success');
    chatFileInput.value = '';
  });

  document.addEventListener('click', function (e) {
    var target = e.target;

    var photoEditBtn = target.closest('.td-photo-edit-btn');
    if (photoEditBtn) {
      e.preventDefault();
      avatarInput.click();
      return;
    }

    var googleBtn = target.closest('.auth-google-btn');
    if (googleBtn) {
      e.preventDefault();
      toast('تسجيل الدخول عبر Google قيد التفعيل — استخدم البريد وكلمة المرور', 'info');
      return;
    }

    var markAll = target.closest('.td-notif-mark-all');
    if (markAll) {
      e.preventDefault();
      document.querySelectorAll('.td-notif-item.is-unread').forEach(function (item) {
        item.classList.remove('is-unread');
      });
      var badge = document.querySelector('.td-notif-badge');
      if (badge) badge.textContent = '0 غير مقروء';
      toast('تم تحديد جميع الإشعارات كمقروءة', 'success');
      return;
    }

    var notifDismiss = target.closest('.td-notif-item .sd-btn-outline');
    if (notifDismiss && labelOf(notifDismiss) === 'تجاهل') {
      e.preventDefault();
      var notifItem = notifDismiss.closest('.td-notif-item');
      if (notifItem) notifItem.remove();
      toast('تم تجاهل الإشعار', 'success');
      return;
    }

    var notifReply = target.closest('.td-notif-item .sd-btn-primary');
    if (notifReply && notifReply.textContent.indexOf('رد') !== -1) {
      navigate('teacher-messages.html');
      return;
    }

    var channelPill = target.closest('.td-channel-pill');
    if (channelPill) {
      if (document.querySelector('.td-page-preferences')) return;
      e.preventDefault();
      activatePill(channelPill, '.td-channel-pill');
      toast('تم حفظ قناة الإشعار المفضلة', 'success');
      return;
    }

    var levelPill = target.closest('.td-level-pill');
    if (levelPill) {
      e.preventDefault();
      var levelGroup = levelPill.closest('.td-level-pills, .td-settings-card, .td-form-section, form, main');
      if (levelGroup) {
        levelGroup.querySelectorAll('.td-level-pill').forEach(function (p) {
          if (p.parentElement === levelPill.parentElement) p.classList.remove('is-active');
        });
      }
      levelPill.classList.add('is-active');
      return;
    }

    var filterPill = target.closest('.td-notif-toolbar .sd-filter-pill, .td-page-assignments .sd-filter-pill');
    if (filterPill && !filterPill.hasAttribute('data-student-filter')) {
      e.preventDefault();
      activatePill(filterPill, '.sd-filter-pill');
      var filterText = filterPill.textContent.trim();
      document.querySelectorAll('.td-notif-item').forEach(function (item) {
        if (filterText === 'الكل') {
          item.hidden = false;
          return;
        }
        if (filterText === 'غير المقروءة') {
          item.hidden = !item.classList.contains('is-unread');
          return;
        }
        item.hidden = item.textContent.indexOf(filterText) === -1;
      });
      toast('تم تطبيق الفلتر: ' + filterText, 'info');
      return;
    }

    var viewToggle = target.closest('.td-assign-view-toggle button, .td-view-toggle button');
    if (viewToggle) {
      if (target.closest('.td-page-assignments')) return;
      e.preventDefault();
      activatePill(viewToggle, 'button');
      toast(viewToggle.querySelector('.bi-list-ul') ? 'عرض قائمة' : 'عرض شبكي', 'info');
      return;
    }

    var assignReview = target.closest('a.sd-btn-primary[href="#"]');
    if (assignReview && window.location.pathname.indexOf('teacher-assignments') !== -1) {
      e.preventDefault();
      navigate('teacher-assignments.html');
      return;
    }

    var assignPublish = target.closest('.td-page .sd-btn-outline');
    if (assignPublish && window.location.pathname.indexOf('teacher-assignments') !== -1 && assignPublish.textContent.indexOf('نشر') !== -1) {
      e.preventDefault();
      toast('تم نشر الواجب', 'success');
      return;
    }

    var gradeSave = target.closest('.td-submission-grade .sd-btn-outline, .td-submission-grade .sd-btn-primary');
    if (gradeSave) {
      if (target.closest('.td-page-assignments')) return;
      e.preventDefault();
      var input = gradeSave.closest('.td-submission-grade').querySelector('input');
      if (input && !input.value.trim()) {
        toast('يرجى إدخال الدرجة', 'info');
        return;
      }
      toast('تم حفظ الدرجة', 'success');
      return;
    }

    var submissionTool = target.closest('.td-submission-item button[aria-label]');
    if (submissionTool) {
      if (target.closest('.td-page-assignments')) return;
      e.preventDefault();
      var toolLabel = labelOf(submissionTool);
      if (toolLabel === 'تحميل' || toolLabel === 'عرض') {
        if (ui && ui.download) ui.download('تسليم_الطالب.pdf');
        else toast('جاري تحميل الملف…', 'success');
      }
      return;
    }

    var alertStudent = target.closest('.td-submission-alert');
    if (alertStudent) {
      if (target.closest('.td-page-assignments')) return;
      e.preventDefault();
      toast('تم إرسال تنبيه للطالب', 'success');
      return;
    }

    var reviewPin = target.closest('.td-review-pin');
    if (reviewPin) {
      if (document.querySelector('.td-page-reviews')) return;
      e.preventDefault();
      reviewPin.classList.toggle('is-pinned');
      toast(reviewPin.classList.contains('is-pinned') ? 'تم تثبيت التقييم' : 'تم إلغاء التثبيت', 'success');
      return;
    }

    var reviewReply = target.closest('.td-page .sd-btn-primary');
    if (reviewReply && window.location.pathname.indexOf('teacher-reviews') !== -1 && reviewReply.textContent.indexOf('رد') !== -1 && !document.querySelector('.td-page-reviews')) {
      e.preventDefault();
      modal({
        title: 'إضافة رد',
        body: '<textarea class="td-modal-textarea" rows="4" placeholder="اكتب ردك هنا…" style="width:100%;border:1px solid #e8ecf4;border-radius:8px;padding:10px;font-family:Cairo,sans-serif"></textarea>',
        actions: [
          { label: 'نشر الرد', primary: true, onClick: function () { toast('تم نشر الرد', 'success'); } },
          { label: 'إلغاء' }
        ]
      });
      return;
    }

    var reviewLink = target.closest('.td-page a.sd-link[href="#"]');
    if (reviewLink && window.location.pathname.indexOf('teacher-reviews') !== -1 && !document.querySelector('.td-page-reviews')) {
      e.preventDefault();
      toast('عرض الرد الكامل', 'info');
      return;
    }

    var examIcon = target.closest('.td-page .td-exam-card .sd-icon-btn, .td-page .td-upcoming-exam .sd-icon-btn');
    if (examIcon && window.location.pathname.indexOf('teacher-exams') !== -1) {
      e.preventDefault();
      var examAction = labelOf(examIcon) || (examIcon.querySelector('.bi-calendar3') ? 'جدولة' : 'إعدادات');
      if (examIcon.querySelector('.bi-calendar3')) navigate('teacher-schedule.html');
      else if (examIcon.querySelector('.bi-clipboard')) navigate('teacher-assignments.html');
      else toast('فتح إعدادات الاختبار', 'info');
      return;
    }

    var onCourseFormPage = document.querySelector('.td-page-course-create, .td-page-course-edit');

    var courseFormPreview = target.closest('.td-page .sd-btn-outline');
    if (!onCourseFormPage && courseFormPreview && /teacher-course-(create|edit)/.test(window.location.pathname) && courseFormPreview.textContent.indexOf('معاينة') !== -1) {
      e.preventDefault();
      modal({
        title: 'معاينة المادة',
        body: '<p class="sd-ui-modal-text">هذه معاينة لشكل المادة كما ستظهر للطلاب بعد النشر.</p>',
        actions: [{ label: 'حسناً', primary: true }]
      });
      return;
    }

    var courseFormPublish = target.closest('.td-page .sd-btn-primary');
    if (!onCourseFormPage && courseFormPublish && /teacher-course-(create|edit)/.test(window.location.pathname) && (courseFormPublish.textContent.indexOf('نشر') !== -1 || courseFormPublish.textContent.indexOf('حفظ') !== -1)) {
      e.preventDefault();
      toast(courseFormPublish.textContent.indexOf('حفظ') !== -1 ? 'تم حفظ التغييرات' : 'تم نشر المادة', 'success');
      window.setTimeout(function () { navigate('teacher-course.html'); }, 900);
      return;
    }

    var sectionAdd = target.closest('.td-page .sd-btn-primary');
    if (!onCourseFormPage && sectionAdd && /teacher-course-(create|edit)/.test(window.location.pathname) && sectionAdd.textContent.indexOf('إضافة قسم') !== -1) {
      e.preventDefault();
      toast('تمت إضافة قسم جديد', 'success');
      return;
    }

    var sectionTool = target.closest('.td-section-item .sd-icon-btn, .td-curriculum-section .sd-icon-btn');
    if (sectionTool && !onCourseFormPage) {
      e.preventDefault();
      if (sectionTool.querySelector('.bi-trash')) {
        confirmDialog({
          title: 'حذف القسم',
          message: 'هل تريد حذف هذا القسم؟',
          confirmText: 'حذف',
          onConfirm: function () {
            var row = sectionTool.closest('.td-section-item, article, li');
            if (row) row.remove();
            toast('تم حذف القسم', 'success');
          }
        });
      } else {
        toast('فتح محرر القسم', 'info');
      }
      return;
    }

    var courseEditLink = target.closest('.td-page a.sd-link[href="#"]');
    if (!onCourseFormPage && courseEditLink && /teacher-course-(create|edit)/.test(window.location.pathname)) {
      e.preventDefault();
      toast('فتح محرر الدرس', 'info');
      return;
    }

    var onMessagesPage = /-messages\.html/.test(window.location.pathname);

    var chatNew = target.closest('.td-chat-new-btn');
    if (chatNew && !onMessagesPage) {
      e.preventDefault();
      var isTeacher = document.body.classList.contains('td-page');
      var listUrl = isTeacher ? 'teacher-students.html' : 'student-messages.html';
      var listLabel = isTeacher ? 'فتح الطلاب' : 'عرض المحادثات';
      var listHint = isTeacher
        ? 'اختر طالباً لبدء محادثة جديدة من قائمة الطلاب.'
        : 'اختر معلمك أو جهة التواصل لبدء محادثة جديدة.';
      modal({
        title: 'محادثة جديدة',
        body: '<p class="sd-ui-modal-text">' + listHint + '</p>',
        actions: [
          { label: listLabel, primary: true, onClick: function () { navigate(listUrl); } },
          { label: 'إلغاء' }
        ]
      });
      return;
    }

    var chatHeaderBtn = target.closest('.td-chat-window-actions .sd-icon-btn, .td-chat-compose-icon');
    if (chatHeaderBtn && !onMessagesPage && !chatHeaderBtn.closest('.sd-topbar') && !chatHeaderBtn.classList.contains('td-chat-send')) {
      e.preventDefault();
      if (chatHeaderBtn.querySelector('.bi-telephone')) toast('جاري الاتصال الصوتي…', 'info');
      else if (chatHeaderBtn.querySelector('.bi-camera-video')) toast('جاري فتح مكالمة الفيديو…', 'info');
      else if (chatHeaderBtn.querySelector('.bi-paperclip, .bi-plus-lg')) chatFileInput.click();
      else if (chatHeaderBtn.querySelector('.bi-emoji-smile')) toast('اختر رمزاً تعبيرياً', 'info');
      else if (chatHeaderBtn.querySelector('.bi-mic')) toast('تسجيل رسالة صوتية', 'info');
      else if (chatHeaderBtn.querySelector('.bi-three-dots-vertical')) toast('المزيد من الخيارات', 'info');
      return;
    }

    var chatFileDl = target.closest('.td-chat-file-dl, .td-chat-file button[aria-label="تحميل"]');
    if (chatFileDl && !onMessagesPage) {
      e.preventDefault();
      var fileName = chatFileDl.closest('.td-chat-file').querySelector('strong');
      if (ui && ui.download) ui.download(fileName ? fileName.textContent : 'ملف');
      return;
    }

    var shareBtn = target.closest('button');
    if (shareBtn && shareBtn.querySelector('.bi-share') && window.location.pathname.indexOf('teacher-profile') !== -1) {
      e.preventDefault();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(window.location.href).then(function () {
          toast('تم نسخ رابط الملف الشخصي', 'success');
        });
      } else {
        toast('تم نسخ رابط الملف الشخصي', 'success');
      }
      return;
    }

    var startClass = target.closest('.td-schedule-start-btn, .sd-btn-join');
    if (startClass && /schedule/.test(window.location.pathname)) {
      e.preventDefault();
      var classTitle = startClass.getAttribute('data-subject')
        || (startClass.closest('.td-schedule-class') && startClass.closest('.td-schedule-class').querySelector('h4'));
      var sessionName = classTitle
        ? (typeof classTitle === 'string' ? classTitle : classTitle.textContent)
        : 'الحصة المجدولة';
      if (ui && ui.joinSession) ui.joinSession(sessionName);
      else toast('جاري فتح الحصة…', 'success');
      return;
    }

    var sessionItem = target.closest('.td-session-item');
    if (sessionItem && /schedule/.test(window.location.pathname) && !target.closest('.td-schedule-start-btn, .sd-btn-join')) {
      if (sessionItem.classList.contains('is-done')) {
        toast('تم إنجاز هذه الحصة', 'info');
        return;
      }
      e.preventDefault();
      var sessionTitle = sessionItem.querySelector('.td-session-body strong');
      if (ui && ui.joinSession) ui.joinSession(sessionTitle ? sessionTitle.textContent : 'الحصة');
      else toast('جاري فتح الحصة…', 'info');
      return;
    }

    var footerLink = target.closest('a.footer-bottom-link[href="#"], a.social-icon[href="#"]');
    if (footerLink) {
      e.preventDefault();
      if (footerLink.classList.contains('social-icon')) {
        toast('صفحة التواصل الاجتماعي قريباً', 'info');
      } else if (footerLink.textContent.indexOf('اتصل') !== -1) {
        navigate('support.html');
      } else {
        toast('صفحة «' + footerLink.textContent.trim() + '» قريباً', 'info');
      }
      return;
    }

    var placeholderLink = target.closest('a[href="#"]:not(.page-link):not([data-page])');
    if (placeholderLink && !placeholderLink.closest('.navbar, .sd-sidebar, .td-course-tabs')) {
      var linkText = placeholderLink.textContent.trim();
      if (linkText === 'سجل كمدرس' || linkText.indexOf('مدرس') !== -1 && placeholderLink.classList.contains('hero-cta-btn')) {
        e.preventDefault();
        navigate('register-teacher.html');
        return;
      }
      if (linkText === 'سجل كطالب' || (linkText.indexOf('طالب') !== -1 && placeholderLink.classList.contains('hero-cta-btn'))) {
        e.preventDefault();
        navigate('register-student.html');
        return;
      }
      if (placeholderLink.classList.contains('support-link')) {
        e.preventDefault();
        if (linkText.indexOf('محادثة') !== -1 || linkText.indexOf('مختص') !== -1) navigate('specialists.html');
        else if (linkText.indexOf('ورش') !== -1) navigate('courses.html?filter=workshop');
        else navigate('support.html');
        return;
      }
      if (placeholderLink.classList.contains('sb-hero-btn')) {
        e.preventDefault();
        navigate('support.html');
        return;
      }
      if (linkText.indexOf('جلساتي') !== -1) {
        e.preventDefault();
        navigate('student-schedule.html');
        return;
      }
      if (linkText.indexOf('التقويم') !== -1) {
        e.preventDefault();
        navigate('student-schedule.html');
        return;
      }
      if (linkText.indexOf('مرة أخرى') !== -1) {
        e.preventDefault();
        toast('تم إرسال رابط إعادة التعيين مجدداً', 'success');
        return;
      }
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    var isTeachersPage = window.location.pathname.indexOf('teachers.html') !== -1;
    document.querySelectorAll('.spec-item').forEach(function (item, index) {
      var link = item.querySelector('a.btn-outline-primary[href="#"]');
      if (!link) return;
      link.href = isTeachersPage
        ? 'public-teacher-profile.html?id=' + (index + 1)
        : 'specialist-profile.html?id=' + (index + 1);
    });
  });
})();
