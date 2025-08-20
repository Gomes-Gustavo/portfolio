// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  // Close menu when clicking a link (mobile)
  const navLinksItems = document.querySelectorAll('.nav-links a');
  navLinksItems.forEach((link) => {
    link.addEventListener('click', function () {
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (menuToggle) {
          menuToggle.classList.remove('active');
        }
      }
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const hrefAttribute = this.getAttribute('href');
      if (
        hrefAttribute &&
        hrefAttribute.length > 1 &&
        hrefAttribute.startsWith('#')
      ) {
        const targetElement = document.querySelector(hrefAttribute);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }
    });
  });

  // Active navigation link highlighting based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', function () {
    let current = '';
    const scrollYPosition = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (
        scrollYPosition >= sectionTop - 150 &&
        scrollYPosition < sectionTop + sectionHeight - 150
      ) {
        current = section.getAttribute('id');
      }
    });

    let homeManuallyActivated = false;
    navItems.forEach((navItem) => {
      navItem.classList.remove('active');
      if (navItem.getAttribute('href') === `#${current}`) {
        navItem.classList.add('active');
        homeManuallyActivated = true;
      }
    });

    const homeLink = document.querySelector('.nav-links a[href="#home"]');
    if (homeLink) {
      if (
        !current &&
        scrollYPosition <
          (sections.length > 0 ? sections[0].offsetTop - 150 : 500)
      ) {
        if (!homeManuallyActivated) {
          navItems.forEach((item) => item.classList.remove('active'));
        }
        homeLink.classList.add('active');
      } else if (
        current === '' &&
        scrollYPosition >=
          (sections.length > 0 ? sections[0].offsetTop - 150 : 500)
      ) {
        if (homeLink.classList.contains('active') && !current) {
          homeLink.classList.remove('active');
        }
      }
    }
  });

  // Project filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    projectCards.forEach((card) => {
      card.addEventListener('transitionend', () => {
        if (card.classList.contains('filtered-out')) {
          card.classList.add('is-hidden');
        }
      });
    });

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', function () {
        if (this.classList.contains('active')) {
          return;
        }

        filterBtns.forEach((filterBtn) => filterBtn.classList.remove('active'));
        this.classList.add('active');
        const filterValue = this.getAttribute('data-filter');

        projectCards.forEach((card) => {
          const cardCategory = card.getAttribute('data-category') || '';
          const matchesFilter =
            filterValue === 'all' ||
            cardCategory.split(' ').includes(filterValue);

          if (matchesFilter) {
            card.classList.remove('is-hidden');
            setTimeout(() => {
              card.classList.remove('filtered-out');
            }, 20);
          } else {
            card.classList.add('filtered-out');
          }
        });
      });
    });
  }

  if (typeof Typed !== 'undefined' && document.querySelector('.name')) {
    new Typed('.name', {
      strings: [document.querySelector('.name').textContent || 'GUSTAVO GOMES'],
      typeSpeed: 70,
      backSpeed: 30,
      backDelay: 1500,
      loop: false,
      showCursor: true,
      cursorChar: '_',
    });
  }

  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      offset: 100,
      once: true,
      easing: 'ease-in-out-sine',
    });
  }
});
