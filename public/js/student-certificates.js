(function () {
  var data = window.SD_CERTIFICATES;
  if (!data) return;

  function renderCertificates(items) {
    var grid = document.getElementById('certificatesGrid');
    if (!grid) return;

    grid.innerHTML = items.map(function (item) {
      return (
        '<article class="sd-certificate-card" data-id="' + item.id + '">' +
          '<div class="sd-certificate-thumb">' +
            '<img src="' + item.image + '" alt="' + item.subject + '">' +
          '</div>' +
          '<div class="sd-certificate-body">' +
            '<h3>' + item.subject + '</h3>' +
            '<p class="sd-certificate-grade">' + item.grade + '</p>' +
            '<p class="sd-certificate-date">' + item.date + '</p>' +
            '<div class="sd-certificate-actions">' +
              '<button type="button" class="sd-btn-outline sd-cert-btn-view" data-id="' + item.id + '">عرض الشهادة</button>' +
              '<button type="button" class="sd-btn-primary sd-cert-btn-download" data-id="' + item.id + '">تحميل</button>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  function getItem(id) {
    for (var i = 0; i < data.items.length; i++) {
      if (data.items[i].id === id) return data.items[i];
    }
    return null;
  }

  function initActions() {
    document.addEventListener('click', function (e) {
      var viewBtn = e.target.closest('.sd-cert-btn-view');
      if (viewBtn && window.SDUI) {
        var item = getItem(viewBtn.getAttribute('data-id'));
        if (item) SDUI.previewCertificate(item);
        return;
      }
      var downloadBtn = e.target.closest('.sd-cert-btn-download');
      if (downloadBtn && window.SDUI) {
        var cert = getItem(downloadBtn.getAttribute('data-id'));
        if (cert) {
          SDUI.download('شهادة-' + cert.subject + '.pdf');
          SDUI.toast('جاري تحميل شهادة ' + cert.subject, 'success');
        }
      }
    });
  }

  renderCertificates(data.items);
  initActions();
})();
