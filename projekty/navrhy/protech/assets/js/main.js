(() => {
  'use strict';

  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const closeMenu = () => {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.querySelector('.sr-only').textContent = 'Otvoriť menu';
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const willOpen = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(willOpen));
      toggle.querySelector('.sr-only').textContent = willOpen ? 'Zatvoriť menu' : 'Otvoriť menu';
      menu.classList.toggle('is-open', willOpen);
      document.body.classList.toggle('menu-open', willOpen);
    });

    menu.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
        toggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 960) closeMenu();
    });
  }

  const updateHeader = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  document.querySelectorAll('[data-subject]').forEach((link) => {
    link.addEventListener('click', () => {
      const select = document.querySelector('#subject');
      if (select) select.value = link.dataset.subject || '';
    });
  });

  const form = document.querySelector('#inquiry-form');
  const status = document.querySelector('[data-form-status]');

  const setFieldState = (field) => {
    const invalid = !field.validity.valid;
    field.setAttribute('aria-invalid', String(invalid));
    const error = document.querySelector(`#${field.id}-error`);
    if (error) error.classList.toggle('is-visible', invalid);
    return !invalid;
  };

  if (form) {
    const requiredFields = [...form.querySelectorAll('[required]')];

    requiredFields.forEach((field) => {
      field.addEventListener('blur', () => setFieldState(field));
      field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') setFieldState(field);
      });
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const valid = requiredFields.map(setFieldState).every(Boolean);

      if (!valid) {
        const firstInvalid = requiredFields.find((field) => !field.validity.valid);
        if (status) status.textContent = 'Skontrolujte, prosím, povinné polia.';
        firstInvalid?.focus();
        return;
      }

      const data = new FormData(form);
      const area = data.get('subject') || 'Dopyt na osobné ochranné pracovné prostriedky';
      const subject = `Dopyt z webu: ${area}`;
      const body = [
        `Meno: ${data.get('name')}`,
        `Spoločnosť: ${data.get('company') || 'neuvedená'}`,
        `E-mail: ${data.get('email')}`,
        `Telefón: ${data.get('phone') || 'neuvedený'}`,
        `Oblasť: ${area}`,
        '',
        'Požiadavka:',
        data.get('message')
      ].join('\n');

      if (status) status.textContent = 'Otváram pripravený e-mail. Správu odošlete až vo svojom e-mailovom programe.';
      window.location.href = `mailto:office@protech.sk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  const revealElements = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px' });
    revealElements.forEach((element) => observer.observe(element));
  }
})();
