(function () {
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id') || 'ahmed-teacher';
  window.location.replace('student-messages.html?id=' + encodeURIComponent(id));
})();
