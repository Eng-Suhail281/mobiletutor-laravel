(function () {
  if (!window.SDNotificationsDropdown) return;
  SDNotificationsDropdown.init({
    pageUrl: 'student-notifications.html',
    onMarkAll: function () {
      var list = document.getElementById('notificationsList');
      if (list && window.SD_NOTIFICATIONS) {
        document.dispatchEvent(new CustomEvent('sd-notifications-updated'));
      }
    }
  });
})();
