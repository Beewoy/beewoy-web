(() => {
  const menuButton = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const menuLinks = menu ? [...menu.querySelectorAll('a[href^="#"]')] : [];

  const closeMenu = () => {
    if (!menuButton || !menu) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(willOpen));
      menu.classList.toggle('is-open', willOpen);
      document.body.classList.toggle('menu-open', willOpen);
    });

    menuLinks.forEach((link) => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
        menuButton.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  const sectionLinks = menuLinks.filter((link) => {
    const target = link.getAttribute('href');
    return target && target !== '#kontakt' && document.querySelector(target);
  });

  if ('IntersectionObserver' in window && sectionLinks.length) {
    const sections = sectionLinks
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      sectionLinks.forEach((link) => {
        const isCurrent = link.getAttribute('href') === `#${visible.target.id}`;
        if (isCurrent) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }, {
      rootMargin: '-25% 0px -62% 0px',
      threshold: [0, 0.15, 0.4]
    });

    sections.forEach((section) => observer.observe(section));
  }

  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#form-status');

  if (form && status) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      status.classList.remove('is-error');

      if (!form.checkValidity()) {
        form.reportValidity();
        status.textContent = 'Skontrolujte, prosím, povinné polia.';
        status.classList.add('is-error');
        return;
      }

      const data = new FormData(form);
      const recipient = form.dataset.recipient;
      const service = String(data.get('service') || 'Nešpecifikovaná požiadavka');
      const subject = `Požiadavka z webu: ${service}`;
      const body = [
        `Meno: ${data.get('name') || ''}`,
        `Spoločnosť: ${data.get('company') || 'neuvedená'}`,
        `E-mail: ${data.get('email') || ''}`,
        `Telefón: ${data.get('phone') || 'neuvedený'}`,
        `Služba: ${service}`,
        '',
        'Opis prípadu:',
        String(data.get('message') || '')
      ].join('\n');

      status.textContent = 'Otváram váš e-mailový program s pripravenou správou…';
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
})();
