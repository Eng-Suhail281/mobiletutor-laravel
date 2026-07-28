document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var teacherId = params.get('id') || '1';
  var teacher = teachersProfilesData[teacherId] || teachersProfilesData['1'];

  document.getElementById('teacherName').textContent = teacher.name;
  document.getElementById('teacherRole').textContent = teacher.role;
  document.getElementById('teacherImg').src = teacher.img;
  document.getElementById('teacherImg').alt = teacher.name;
  document.getElementById('teacherLocation').innerHTML = '<i class="bi bi-geo-alt"></i> ' + teacher.location;
  document.getElementById('teacherExperience').innerHTML = '<i class="bi bi-journal-text"></i> ' + teacher.experience + ' سنوات خبرة';
  document.getElementById('teacherTeaching').innerHTML = '<i class="bi bi-people"></i> ' + teacher.teaching;
  document.getElementById('teacherRating').innerHTML = '<i class="bi bi-star-fill"></i><strong>' + teacher.rating + '</strong><span>(' + teacher.reviewsCount + ')</span>';
  document.getElementById('teacherPrice').textContent = teacher.price + '$';
  document.getElementById('teacherAbout').textContent = teacher.about;
  document.title = teacher.name + ' - Mobile Tutor';

  var subjectsWrap = document.getElementById('teacherSubjects');
  if (subjectsWrap) {
    subjectsWrap.innerHTML = teacher.subjects.map(function (subject) {
      return '<span class="sp-tag">' + subject + '</span>';
    }).join('');
  }

  var stats = teacher.stats;
  document.getElementById('statHours').textContent = stats.hours;
  document.getElementById('statSatisfaction').textContent = stats.satisfaction;
  document.getElementById('statStudents').textContent = stats.students;
  document.getElementById('statRating').innerHTML = stats.rating + ' <i class="bi bi-star-fill"></i>';

  var coursesList = document.getElementById('teacherCourses');
  if (coursesList) {
    coursesList.innerHTML = teacher.courses.map(function (course) {
      return '<a href="' + course.href + '" class="tp-course-link">' +
        '<div><span class="tp-course-tag">' + course.tag + '</span><strong>' + course.title + '</strong></div>' +
        '<i class="bi bi-chevron-left"></i></a>';
    }).join('');
  }

  var tabs = document.querySelectorAll('#profileTabs .nav-link');
  var panels = document.querySelectorAll('.sp-tab-panel');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.getAttribute('data-tab');
      tabs.forEach(function (t) { t.classList.remove('active'); });
      panels.forEach(function (p) { p.classList.remove('active'); });
      tab.classList.add('active');
      var panel = document.getElementById('panel-' + target);
      if (panel) panel.classList.add('active');
    });
  });
});
