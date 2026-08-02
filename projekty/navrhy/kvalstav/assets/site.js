(() => {
  const body = document.body;
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const menuShade = document.querySelector('.menu-shade');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let previousFocus = null;

  const setMenu = (open) => {
    body.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Zavrieť menu' : 'Otvoriť menu');
    mobileNav.setAttribute('aria-hidden', String(!open));
    if (open) {
      previousFocus = document.activeElement;
      mobileNav.querySelector('a')?.focus();
    } else if (previousFocus && previousFocus !== document.body) {
      previousFocus.focus();
    }
  };

  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  menuShade.addEventListener('click', () => setMenu(false));
  mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && body.classList.contains('menu-open')) setMenu(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1180 && body.classList.contains('menu-open')) setMenu(false);
  }, { passive: true });

  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 18);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const revealItems = document.querySelectorAll('[data-reveal]');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, revealObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px' });
    revealItems.forEach((item) => observer.observe(item));
  }

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.desktop-nav > a:not(.header-cta)')];
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => link.toggleAttribute('aria-current', link.getAttribute('href') === `#${visible.target.id}`));
    }, { rootMargin: '-30% 0px -60%', threshold: [0, .2, .6] });
    sections.forEach((section) => navObserver.observe(section));
  }

  const privacyDetails = document.getElementById('ochrana-udajov');
  document.querySelectorAll('a[href="#ochrana-udajov"]').forEach((link) => {
    link.addEventListener('click', () => { privacyDetails.open = true; });
  });

  const form = document.getElementById('inquiry-form');
  const status = document.getElementById('form-status');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = `Nezáväzný dopyt – ${data.get('projectType')}`;
    const message = [
      `Meno / spoločnosť: ${data.get('name')}`,
      `E-mail: ${data.get('email')}`,
      `Telefón: ${data.get('phone') || 'neuvedený'}`,
      `Typ projektu: ${data.get('projectType')}`,
      '',
      'Správa:',
      data.get('message')
    ].join('\n');
    status.textContent = 'Dopyt je pripravený. Otváram váš e‑mailový program…';
    status.dataset.state = 'ready';
    window.location.href = `mailto:kvalstav@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  });

  const initialHash = window.location.hash;
  const alignInitialHash = () => {
    if (!initialHash || window.location.hash !== initialHash) return;
    const target = document.getElementById(initialHash.slice(1));
    if (!target) return;
    requestAnimationFrame(() => requestAnimationFrame(() => target.scrollIntoView({ block: 'start', behavior: 'auto' })));
  };
  const settleInitialHash = () => {
    alignInitialHash();
    window.setTimeout(alignInitialHash, 160);
    window.setTimeout(alignInitialHash, 520);
  };
  window.addEventListener('load', () => {
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(settleInitialHash);
    else settleInitialHash();
  }, { once: true });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
