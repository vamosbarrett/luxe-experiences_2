/* ============================
   1. STICKY NAVBAR ON SCROLL
============================ */
const navbar = document.getElementById('navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ============================
   2. MOBILE MENU TOGGLE
============================ */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

/* ============================
   3. PORTFOLIO FILTER
============================ */
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery__item');
const galleryEmpty = document.getElementById('galleryEmpty');

if (filterBtns.length && galleryItems.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.dataset.filter;
      let visibleCount = 0;

      galleryItems.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('is-hidden', !match);
        if (match) visibleCount++;
      });

      if (galleryEmpty) {
        galleryEmpty.classList.toggle('is-visible', visibleCount === 0);
      }
    });
  });
}

/* ============================
   4. (Contact form removed —
   "Book a Consultation" now links
   directly to the Google Form)
============================ */
