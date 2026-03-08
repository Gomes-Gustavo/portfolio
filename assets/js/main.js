document.addEventListener('DOMContentLoaded', function () {
  // AOS scroll animations
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, offset: 80, once: true });
  }

  // Mobile menu
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }

  // Header scroll state
  const header = document.getElementById('main-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth',
          });
        }
      }
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  window.addEventListener(
    'scroll',
    function () {
      let current = '';
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 160) {
          current = section.getAttribute('id');
        }
      });
      navItems.forEach((item) => {
        item.classList.toggle(
          'active',
          item.getAttribute('href') === '#' + current,
        );
      });
    },
    { passive: true },
  );

  // Project filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length && projectCards.length) {
    projectCards.forEach((card) => {
      card.addEventListener('transitionend', () => {
        if (card.classList.contains('filtered-out')) {
          card.classList.add('is-hidden');
        }
      });
    });

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', function () {
        if (this.classList.contains('active')) return;

        filterBtns.forEach((b) => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');
        projectCards.forEach((card) => {
          const cats = (card.getAttribute('data-category') || '').split(' ');
          const matches = filter === 'all' || cats.includes(filter);

          if (matches) {
            card.classList.remove('is-hidden');
            requestAnimationFrame(() => {
              requestAnimationFrame(() =>
                card.classList.remove('filtered-out'),
              );
            });
          } else {
            card.classList.add('filtered-out');
          }
        });
      });
    });
  }
});
