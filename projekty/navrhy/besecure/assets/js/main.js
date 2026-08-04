(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.querySelector('.primary-nav');
  const navLinks = primaryNav?.querySelectorAll('a');

  const closeMenu = (returnFocus = false) => {
    if (!navToggle || !primaryNav) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Otvoriť menu');
    primaryNav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    if (returnFocus) navToggle.focus();
  };

  const openMenu = () => {
    if (!navToggle || !primaryNav) return;
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Zavrieť menu');
    primaryNav.classList.add('is-open');
    document.body.classList.add('nav-open');
  };

  navToggle?.addEventListener('click', () => {
    navToggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });
  navLinks?.forEach((link) => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navToggle?.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('click', (event) => {
    if (navToggle?.getAttribute('aria-expanded') === 'true' && !primaryNav?.contains(event.target) && !navToggle.contains(event.target)) closeMenu();
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });

  const form = document.querySelector('#contact-form');
  const formStatus = document.querySelector('#form-status');
  const setFieldState = (field) => {
    const wrapper = field.closest('.field');
    if (!wrapper) return;
    const invalid = !field.validity.valid;
    wrapper.classList.toggle('is-invalid', invalid);
    field.setAttribute('aria-invalid', invalid ? 'true' : 'false');
  };

  form?.querySelectorAll('input, select, textarea').forEach((field) => {
    field.addEventListener('blur', () => setFieldState(field));
    field.addEventListener('input', () => {
      if (field.closest('.field')?.classList.contains('is-invalid')) setFieldState(field);
      if (formStatus) formStatus.textContent = '';
    });
    field.addEventListener('change', () => {
      if (field.closest('.field')?.classList.contains('is-invalid')) setFieldState(field);
    });
  });

  form?.addEventListener('submit', (event) => {
    const fields = [...form.querySelectorAll('input, select, textarea')];
    fields.forEach(setFieldState);
    const firstInvalid = fields.find((field) => !field.validity.valid);
    if (firstInvalid) {
      event.preventDefault();
      firstInvalid.focus();
      if (formStatus) formStatus.textContent = 'Skontrolujte, prosím, označené povinné polia.';
      return;
    }
    const endpoint = form.dataset.endpoint?.trim();
    if (!endpoint) {
      event.preventDefault();
      if (formStatus) {
        formStatus.textContent = 'Formulár zatiaľ neodosiela údaje. Dopyt pošlite na info@besecure.sk alebo zavolajte na +421 908 408 456.';
        formStatus.focus();
      }
      return;
    }
    form.action = endpoint;
    form.method = 'post';
  });

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
