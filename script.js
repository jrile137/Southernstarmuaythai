(() => {
  const nav = document.getElementById('nav');
  const toggle = nav.querySelector('.nav__toggle');
  const menu = document.getElementById('nav-menu');

  const setScrolled = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  setScrolled();
  window.addEventListener('scroll', setScrolled, { passive: true });

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  menu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.querySelectorAll('.timetable__row').forEach((row) => {
    const slots = row.querySelectorAll('.timetable__slot');
    const labels = ['Morning', 'Midday', 'Evening'];
    slots.forEach((slot, i) => slot.setAttribute('data-label', labels[i] || ''));
  });

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const form = document.getElementById('bookForm');
  const status = document.getElementById('bookStatus');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      if (!data.get('name') || !data.get('phone') || !data.get('email')) {
        status.textContent = 'Please fill in your name, phone and email.';
        return;
      }
      status.textContent = 'Thanks — we\'ll be in touch within 24 hours.';
      form.reset();
    });
  }

  const revealEls = document.querySelectorAll(
    '.about, .offer, .timetable, .book, .contact'
  );
  revealEls.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
})();
