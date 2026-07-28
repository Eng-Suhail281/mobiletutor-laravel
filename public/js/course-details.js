// Course details - load data from URL and handle tabs
var params = new URLSearchParams(window.location.search);
var courseId = params.get('id') || 'ai';
var course = coursesData[courseId] || coursesData.ai;

document.getElementById('courseTitle').innerHTML = course.titleHtml || course.title.replace('الاصطناعي وتطبيقاته العملية', 'الاصطناعي<br>وتطبيقاته العملية');
document.getElementById('courseDesc').innerHTML = course.descHtml || course.desc;
document.getElementById('courseImage').src = course.image;
document.getElementById('courseHours').textContent = course.hours;
document.getElementById('courseLessons').textContent = course.lessons;
document.getElementById('courseLevel').textContent = course.level;
var studentsMatch = course.students.match(/(\d+)/);
document.getElementById('courseStudents').textContent = studentsMatch ? studentsMatch[1] : course.students;
document.getElementById('includeHours').textContent = course.hours;
document.getElementById('includeLessons').textContent = course.lessons;
document.getElementById('instructorName').textContent = course.instructor.name;
document.getElementById('instructorTitle').textContent = course.instructor.title;
document.getElementById('instructorBio').innerHTML = course.instructor.bioHtml || course.instructor.bio;
document.getElementById('instructorImg').src = course.instructor.img;
document.title = course.title + ' - Mobile Tutor';

var contentLessonsCount = document.getElementById('contentLessonsCount');
var contentHoursCount = document.getElementById('contentHoursCount');
var instructorStudents = document.getElementById('instructorStudents');
if (contentLessonsCount) contentLessonsCount.textContent = (course.lessons.match(/(\d+)/) || [0, '32'])[1];
if (contentHoursCount) contentHoursCount.textContent = course.hours;
if (instructorStudents) instructorStudents.textContent = studentsMatch ? String(parseInt(studentsMatch[1], 10) * 48) : '2,400';

var learnList = document.getElementById('courseLearnList');
if (learnList && course.highlights && course.highlights.length) {
  learnList.innerHTML = course.highlights.map(function (item) {
    return '<li><i class="bi bi-check-circle-fill"></i> ' + item + '.</li>';
  }).join('');
}

if (course.price === 0) {
  document.getElementById('priceOld').style.display = 'none';
  document.getElementById('priceCurrent').textContent = 'مجاني';
  document.getElementById('discountBadge').textContent = 'مجاني';
} else {
  document.getElementById('priceCurrent').textContent = course.price + '$';
  document.getElementById('priceOld').textContent = course.oldPrice + '$';
  var discount = Math.round((1 - course.price / course.oldPrice) * 100);
  document.getElementById('discountBadge').textContent = 'خصم ' + discount + '%';
}

var subscribeBtn = document.querySelector('.sidebar-subscribe-btn');
if (subscribeBtn) {
  subscribeBtn.href = 'checkout.html?id=' + courseId;
}

var ctaBtn = document.querySelector('.course-detail-cta');
if (ctaBtn) {
  ctaBtn.href = 'checkout.html?id=' + courseId;
}

function activateTab(tabName) {
  document.querySelectorAll('#courseTabs .nav-link').forEach(function (t) {
    t.classList.toggle('active', t.getAttribute('data-tab') === tabName);
  });
  document.querySelectorAll('.course-tab-panel').forEach(function (panel) {
    var isActive = panel.getAttribute('data-panel') === tabName;
    panel.classList.toggle('is-active', isActive);
    panel.hidden = !isActive;
  });
}

document.querySelectorAll('#courseTabs .nav-link').forEach(function (tab) {
  tab.addEventListener('click', function () {
    activateTab(tab.getAttribute('data-tab'));
  });
});

var expandAllBtn = document.getElementById('expandAll');
if (expandAllBtn) {
  expandAllBtn.addEventListener('click', function () {
    var collapses = document.querySelectorAll('#courseAccordion .accordion-collapse');
    var buttons = document.querySelectorAll('#courseAccordion .accordion-button');
    var anyCollapsed = Array.prototype.some.call(buttons, function (btn) {
      return btn.classList.contains('collapsed');
    });
    collapses.forEach(function (item) {
      item.classList.toggle('show', anyCollapsed);
    });
    buttons.forEach(function (btn) {
      btn.classList.toggle('collapsed', !anyCollapsed);
    });
    expandAllBtn.textContent = anyCollapsed ? 'طي الكل' : 'توسيع الكل';
  });
}

var extraCourseReviews = [
  { name: 'نور الدين', img: 'images/support/specialists/nour.jpg', stars: 5, time: 'منذ 3 أشهر', text: 'مادة ممتازة ومنظمة، المدرب يشرح بطريقة سلسة ومفهومة' },
  { name: 'طارق سليم', img: 'images/support/specialists/tarek.jpg', stars: 4, time: 'منذ 4 أشهر', text: 'استفدت كثيراً من الأمثلة العملية في نهاية كل وحدة' },
  { name: 'رانية خليل', img: 'images/support/specialists/rania.jpg', stars: 5, time: 'منذ 5 أشهر', text: 'أنصح به لكل من يريد دخول مجال الذكاء الاصطناعي' },
  { name: 'محمد سالم', img: 'images/shared/avatars/mohammad.jpg', stars: 4, time: 'منذ 6 أشهر', text: 'محتوى قيّم، لكن أتمنى المزيد من التمارين التفاعلية' }
];

function renderReviewStars(count) {
  var html = '';
  for (var i = 1; i <= 5; i++) {
    html += '<i class="bi bi-star' + (i <= count ? '-fill' : '') + '"></i>';
  }
  return html;
}

function buildReviewCard(review) {
  return '<article class="course-review-card">' +
    '<img src="' + review.img + '" alt="' + review.name + '">' +
    '<div><div class="course-review-card-head"><strong>' + review.name + '</strong>' +
    '<div class="course-review-card-stars">' + renderReviewStars(review.stars) + '</div></div>' +
    '<span class="review-time">' + review.time + '</span><p>' + review.text + '</p></div></article>';
}

var reviewsList = document.querySelector('.course-reviews-list');
var reviewsMoreBtn = document.getElementById('reviewsLoadMore');
var extraReviewsLoaded = 0;
var REVIEWS_BATCH_SIZE = 2;

if (reviewsList && reviewsMoreBtn) {
  reviewsMoreBtn.addEventListener('click', function () {
    var batch = extraCourseReviews.slice(extraReviewsLoaded, extraReviewsLoaded + REVIEWS_BATCH_SIZE);
    if (!batch.length) {
      reviewsMoreBtn.hidden = true;
      return;
    }
    batch.forEach(function (review) {
      reviewsList.insertAdjacentHTML('beforeend', buildReviewCard(review));
    });
    extraReviewsLoaded += batch.length;
    if (extraReviewsLoaded >= extraCourseReviews.length) {
      reviewsMoreBtn.hidden = true;
    }
  });
}

document.querySelectorAll('.sidebar-share-card .share-btn').forEach(function (btn) {
  if (btn.id === 'copyLink') return;
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    var pageUrl = encodeURIComponent(window.location.href);
    var pageTitle = encodeURIComponent(course.title);
    var label = btn.getAttribute('aria-label');
    var shareUrl = '';
    if (label === 'X') {
      shareUrl = 'https://twitter.com/intent/tweet?url=' + pageUrl + '&text=' + pageTitle;
    } else if (label === 'LinkedIn') {
      shareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + pageUrl;
    } else if (label === 'Facebook') {
      shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + pageUrl;
    }
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer,width=620,height=520');
    }
  });
});

var copyLinkBtn = document.getElementById('copyLink');
if (copyLinkBtn) {
  copyLinkBtn.addEventListener('click', function () {
    navigator.clipboard.writeText(window.location.href);
    this.innerHTML = '<i class="bi bi-check-lg"></i>';
    var btn = this;
    setTimeout(function () { btn.innerHTML = '<i class="bi bi-link-45deg"></i>'; }, 2000);
  });
}
