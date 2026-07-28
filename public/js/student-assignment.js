(function () {
  var STATUS_CLASS = {
    progress: 'is-progress',
    done: 'is-done',
    late: 'is-late'
  };

  function getAssignmentId() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id') || 'math';
    return window.SD_ASSIGNMENT_DETAILS && window.SD_ASSIGNMENT_DETAILS[id] ? id : 'math';
  }

  function renderDetailPill(text) {
    var parts = text.split(':');
    if (parts.length < 2) {
      return '<span class="sd-assignment-detail-pill">' + text + '</span>';
    }
    return (
      '<span class="sd-assignment-detail-pill">' +
        '<span class="sd-assignment-detail-pill-label">' + parts[0].trim() + ':</span> ' +
        '<span class="sd-assignment-detail-pill-value">' + parts.slice(1).join(':').trim() + '</span>' +
      '</span>'
    );
  }

  function renderMeta(assignment) {
    var meta = document.getElementById('assignmentMeta');
    if (!meta) return;

    var statusClass = STATUS_CLASS[assignment.status] || STATUS_CLASS.progress;

    meta.innerHTML =
      '<div class="sd-assignment-detail-pills">' +
        renderDetailPill(assignment.subject) +
        renderDetailPill(assignment.grade) +
        renderDetailPill(assignment.deadline) +
        '<span class="sd-assignment-detail-status ' + statusClass + '">' + assignment.statusLabel + '</span>' +
      '</div>';
  }

  function renderInstructions(list) {
    var ul = document.getElementById('assignmentInstructions');
    if (!ul) return;
    ul.innerHTML = list.map(function (item) {
      return '<li>' + item + '</li>';
    }).join('');
  }

  function renderAttachedFiles(files) {
    var container = document.getElementById('attachedFiles');
    if (!container) return;

    container.innerHTML = files.map(function (file) {
      return (
        '<article class="sd-attached-file-card">' +
          '<div class="sd-attached-file-info">' +
            '<i class="bi bi-file-earmark-pdf" aria-hidden="true"></i>' +
            '<div>' +
              '<h4>' + file.title + '</h4>' +
              '<p>' + file.size + '</p>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  function renderUploaded(uploaded) {
    var section = document.getElementById('uploadedSection');
    var container = document.getElementById('uploadedFile');
    if (!section || !container) return;

    if (!uploaded) {
      section.hidden = true;
      return;
    }

    section.hidden = false;
    container.innerHTML =
      '<div class="sd-uploaded-file-info">' +
        '<i class="bi bi-file-earmark-pdf" aria-hidden="true"></i>' +
        '<div>' +
          '<h4>' + uploaded.title + '</h4>' +
          '<p>' + uploaded.size + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="sd-uploaded-file-actions">' +
        '<button type="button" class="sd-btn-upload-action is-delete" id="deleteUpload">حذف</button>' +
        '<button type="button" class="sd-btn-upload-action is-replace" id="replaceUpload">استبدال</button>' +
      '</div>';
  }

  function loadAssignment() {
    var id = getAssignmentId();
    var assignment = window.SD_ASSIGNMENT_DETAILS[id];
    if (!assignment) return;

    document.title = assignment.title + ' — Mobile Tutor';

    var titleEl = document.getElementById('assignmentTitle');
    var descEl = document.getElementById('assignmentDesc');
    if (titleEl) titleEl.textContent = assignment.title;
    if (descEl) descEl.textContent = assignment.desc;

    renderMeta(assignment);
    renderInstructions(assignment.instructions);
    renderAttachedFiles(assignment.files);
    renderUploaded(assignment.uploaded);
    bindUploadActions(
      document.getElementById('assignmentFileInput'),
      document.getElementById('uploadedSection')
    );
  }

  function initUpload() {
    var input = document.getElementById('assignmentFileInput');
    var section = document.getElementById('uploadedSection');
    var container = document.getElementById('uploadedFile');
    if (!input) return;

    input.addEventListener('change', function () {
      if (!input.files || !input.files[0]) return;
      var file = input.files[0];
      var sizeMb = (file.size / (1024 * 1024)).toFixed(1) + ' MB';

      if (section) section.hidden = false;
      if (container) {
        container.innerHTML =
          '<div class="sd-uploaded-file-info">' +
            '<i class="bi bi-file-earmark-pdf" aria-hidden="true"></i>' +
            '<div>' +
              '<h4>' + file.name + '</h4>' +
              '<p>' + sizeMb + '</p>' +
            '</div>' +
          '</div>' +
          '<div class="sd-uploaded-file-actions">' +
            '<button type="button" class="sd-btn-upload-action is-delete" id="deleteUpload">حذف</button>' +
            '<button type="button" class="sd-btn-upload-action is-replace" id="replaceUpload">استبدال</button>' +
          '</div>';
        bindUploadActions(input, section);
      }
    });
  }

  function bindUploadActions(input, section) {
    var deleteBtn = document.getElementById('deleteUpload');
    var replaceBtn = document.getElementById('replaceUpload');

    if (deleteBtn) {
      deleteBtn.addEventListener('click', function () {
        input.value = '';
        if (section) section.hidden = true;
      });
    }

    if (replaceBtn) {
      replaceBtn.addEventListener('click', function () {
        input.click();
      });
    }
  }

  loadAssignment();
  initUpload();
})();
