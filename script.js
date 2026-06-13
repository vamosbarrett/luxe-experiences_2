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
   4. GALLERY CAROUSEL
============================ */
const galleryCarousels = document.querySelectorAll('.gallery__carousel');

galleryCarousels.forEach(carousel => {
  const track = carousel.querySelector('.gallery__carousel-track');
  const prevButton = carousel.querySelector('.gallery__carousel-btn--prev');
  const nextButton = carousel.querySelector('.gallery__carousel-btn--next');

  if (!track || !prevButton || !nextButton) {
    return;
  }

  const slides = Array.from(track.children);
  const slideCount = slides.length;
  if (slideCount === 0) {
    return;
  }
  let currentIndex = 0;
  let touchStartX = 0;

  const normalizeIndex = index => {
    return ((index % slideCount) + slideCount) % slideCount;
  };

  const scrollToIndex = index => {
    currentIndex = normalizeIndex(index);
    track.scrollTo({ left: currentIndex * track.clientWidth, behavior: 'smooth' });
  };

  const updateButtons = () => {
    prevButton.classList.remove('is-disabled');
    nextButton.classList.remove('is-disabled');
  };

  const syncIndex = () => {
    currentIndex = Math.round(track.scrollLeft / track.clientWidth) || 0;
  };

  const moveBySlide = direction => {
    scrollToIndex(currentIndex + direction);
  };

  prevButton.addEventListener('click', () => moveBySlide(-1));
  nextButton.addEventListener('click', () => moveBySlide(1));

  track.addEventListener('scroll', syncIndex, { passive: true });
  track.addEventListener('touchstart', event => {
    touchStartX = event.touches[0].clientX;
  }, { passive: true });
  track.addEventListener('touchend', event => {
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (Math.abs(deltaX) < 40) {
      return;
    }

    if (deltaX < 0 && currentIndex === slideCount - 1) {
      scrollToIndex(0);
    }

    if (deltaX > 0 && currentIndex === 0) {
      scrollToIndex(slideCount - 1);
    }
  });

  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveBySlide(-1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveBySlide(1);
    }
  });

  updateButtons();
});

/* ============================
   5. (Contact form removed —
   "Book a Consultation" now links
   directly to the Google Form)
============================ */
