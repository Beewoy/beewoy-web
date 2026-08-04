(() => {
  const body = document.body;
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');

  const closeNav = () => {
    body.classList.remove('nav-open');
    navToggle?.setAttribute('aria-expanded', 'false');
    navToggle?.querySelector('.sr-only')?.replaceChildren(document.createTextNode('Otvoriť menu'));
  };

  navToggle?.addEventListener('click', () => {
    const willOpen = !body.classList.contains('nav-open');
    body.classList.toggle('nav-open', willOpen);
    navToggle.setAttribute('aria-expanded', String(willOpen));
    navToggle.querySelector('.sr-only')?.replaceChildren(document.createTextNode(willOpen ? 'Zavrieť menu' : 'Otvoriť menu'));
  });

  nav?.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeNav();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeNav();
      navToggle?.focus();
    }
  });

  document.getElementById('year').textContent = String(new Date().getFullYear());

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${visible.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-25% 0px -60%', threshold: [0, 0.1, 0.5] });
    sections.forEach((section) => observer.observe(section));
  }

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const errorText = {
    name: 'Zadajte svoje meno.',
    phone: 'Zadajte telefónne číslo.',
    email: 'Skontrolujte formát e-mailovej adresy.',
    problem: 'Vyberte typ problému.',
    message: 'Stručne opíšte problém a lokalitu.'
  };

  const showError = (field) => {
    const error = document.getElementById(`${field.id}-error`);
    const invalid = !field.validity.valid;
    field.setAttribute('aria-invalid', String(invalid));
    if (error) error.textContent = invalid ? errorText[field.id] : '';
    return !invalid;
  };

  form?.querySelectorAll('input, select, textarea').forEach((field) => {
    field.addEventListener('blur', () => showError(field));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') showError(field);
    });
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = [...form.querySelectorAll('input, select, textarea')];
    const valid = fields.map(showError).every(Boolean);
    if (!valid) {
      form.querySelector('[aria-invalid="true"]')?.focus();
      status.textContent = 'Doplňte označené polia.';
      return;
    }

    const data = new FormData(form);
    const subject = encodeURIComponent(`Dopyt z webu: ${data.get('problem')}`);
    const bodyText = [
      `Meno: ${data.get('name')}`,
      `Telefón: ${data.get('phone')}`,
      `E-mail: ${data.get('email') || 'neuvedený'}`,
      `Typ problému: ${data.get('problem')}`,
      '',
      String(data.get('message'))
    ].join('\n');

    status.textContent = 'Otváram váš e-mailový program. Dopyt odošlite až po jeho kontrole.';
    window.location.href = `mailto:krtkovanie@centrum.sk?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
  });
})();
