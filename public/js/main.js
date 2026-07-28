// Navbar scroll effect
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  if (window.scrollY > 50) {
    navbar.classList.add('shadow');
  } else {
    navbar.classList.remove('shadow');
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    const navbar = document.querySelector('.navbar');
    if (target) {
      e.preventDefault();
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const top = target.offsetTop - navHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});

// Active nav link on scroll
const navLinks = document.querySelectorAll('.nav-link');
const homeNavLink = document.querySelector('.nav-link[href="index.html"]');
const isHomePage = document.getElementById('home') !== null;

window.addEventListener('scroll', function () {
  // Homepage only: keep الرئيسية active on scroll
  if (!isHomePage || !homeNavLink) return;

  navLinks.forEach(function (link) {
    link.classList.remove('active');
  });
  homeNavLink.classList.add('active');
});

// Favorite button toggle
document.querySelectorAll('.btn-fav').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const icon = this.querySelector('i');
    icon.classList.toggle('bi-heart');
    icon.classList.toggle('bi-heart-fill');
    if (icon.classList.contains('bi-heart-fill')) {
      icon.style.color = '#3b66cf';
    } else {
      icon.style.color = '';
    }
  });
});
