var params = new URLSearchParams(window.location.search);
var courseId = params.get('id') || 'ai';
var course = coursesData[courseId] || coursesData.ai;

var defaultHighlights = [
  'فهم أساسيات الذكاء الاصطناعي',
  'تطبيق عملي ومشاريع تدريبية',
  'مشاريع تدريبية احترافية'
];

document.getElementById('checkoutImage').src = course.image;
document.getElementById('checkoutImage').alt = course.title;
document.getElementById('checkoutTitle').textContent = course.title;
document.getElementById('checkoutInstructorImg').src = course.instructor.img;
document.getElementById('checkoutInstructorImg').alt = course.instructor.name;
document.getElementById('checkoutInstructorName').textContent = course.instructor.name;
document.getElementById('checkoutLessons').textContent = course.lessons.replace('درس', 'درساً').replace('دروس', 'درساً');
document.getElementById('checkoutHours').textContent = course.hours
  .replace('ساعات', 'ساعات دراسية')
  .replace('ساعة', 'ساعة دراسية');

var highlights = course.highlights || defaultHighlights;
document.getElementById('checkoutHighlights').innerHTML = highlights.map(function (item) {
  return '<li>' + item + '</li>';
}).join('');

var detailsLink = 'course-details.html?id=' + courseId;
document.getElementById('checkoutDetailsLink').href = detailsLink;
document.getElementById('checkoutBackLink').href = detailsLink;
document.title = 'الاشتراك في الكورس - ' + course.title;

var basePrice = course.price;
var originalPrice = course.oldPrice || course.price;
var promoDiscount = 0;

function formatOriginalPrice(amount) {
  if (amount === 0) return 'مجاني';
  return '$' + amount;
}

function formatDiscount(amount) {
  if (amount <= 0) return '- $0';
  return '- $' + amount;
}

function formatTotal(amount) {
  if (amount === 0) return 'مجاني';
  return amount + '$';
}

function updatePrices() {
  var total = Math.max(basePrice - promoDiscount, 0);
  var discountAmount = originalPrice - total;

  document.getElementById('checkoutOriginalPrice').textContent = formatOriginalPrice(originalPrice);

  var discountRow = document.getElementById('checkoutDiscountRow');
  if (originalPrice > total && originalPrice > 0) {
    discountRow.style.display = 'flex';
    document.getElementById('checkoutDiscount').textContent = formatDiscount(discountAmount);
  } else {
    discountRow.style.display = 'none';
  }

  document.getElementById('checkoutTotal').textContent = formatTotal(total);
}

updatePrices();

document.querySelectorAll('.checkout-pay-method').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.checkout-pay-method').forEach(function (b) {
      b.classList.remove('is-active');
    });
    btn.classList.add('is-active');
  });
});

document.getElementById('promoApplyBtn').addEventListener('click', function () {
  var code = document.getElementById('promoInput').value.trim().toUpperCase();
  var msgEl = document.getElementById('promoMessage');

  if (!code) {
    msgEl.textContent = 'يرجى إدخال كود الخصم';
    msgEl.className = 'checkout-promo-msg is-error';
    return;
  }

  if (code === 'STUDENT10') {
    promoDiscount = Math.round(basePrice * 0.1);
    msgEl.textContent = 'تم تطبيق خصم 10% بنجاح';
    msgEl.className = 'checkout-promo-msg is-success';
    updatePrices();
    return;
  }

  msgEl.textContent = 'كود الخصم غير صالح';
  msgEl.className = 'checkout-promo-msg is-error';
});

document.getElementById('completeCheckoutBtn').addEventListener('click', function () {
  var btn = this;
  if (btn.disabled) return;

  btn.disabled = true;
  btn.textContent = 'جاري تأكيد الاشتراك...';

  var steps = document.querySelectorAll('.checkout-step');
  var lines = document.querySelectorAll('.checkout-step-line');
  var paymentBody = document.getElementById('checkoutPaymentBody');
  var confirmation = document.getElementById('checkoutConfirmation');
  var paymentTitle = document.getElementById('checkoutPaymentTitle');
  var subtitle = document.querySelector('.checkout-subtitle');

  steps.forEach(function (step) {
    step.classList.remove('is-active', 'is-pending', 'is-done');
  });
  lines.forEach(function (line) {
    line.classList.add('is-done');
  });

  if (steps[0]) steps[0].classList.add('is-done');
  if (steps[1]) steps[1].classList.add('is-done');
  if (steps[2]) steps[2].classList.add('is-active');

  window.setTimeout(function () {
    if (paymentBody) paymentBody.hidden = true;
    if (confirmation) confirmation.hidden = false;
    if (paymentTitle) paymentTitle.textContent = 'تأكيد الاشتراك';
    if (subtitle) subtitle.textContent = 'تم الاشتراك بنجاح، يمكنك البدء بالتعلم الآن';
    btn.textContent = 'تم الاشتراك';
  }, 600);
});
