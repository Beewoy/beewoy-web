const body = document.body;
const header = document.querySelector('#siteHeader');
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobileMenu');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const contactForm = document.querySelector('#contactForm');
const formStatus = document.querySelector('#formStatus');

menuButton.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Zatvoriť menu' : 'Otvoriť menu');
  mobileMenu.setAttribute('aria-hidden', String(!open));
  mobileMenu.toggleAttribute('inert', !open);
  body.classList.toggle('menu-open', open);
});

mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Otvoriť menu');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenu.setAttribute('inert', '');
    body.classList.remove('menu-open');
  });
});

const trackedSections = Array.from(document.querySelectorAll('#sluzby, #o-mne, #cennik, #kontakt'));
const sectionNavLinks = Array.from(document.querySelectorAll('.desktop-nav a[href^="#"], .mobile-nav a[href^="#"]:not(.button)'));

const setActiveSection = (sectionId) => {
  sectionNavLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${sectionId}`;
    link.classList.toggle('is-active', isActive);

    if (isActive) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });
};

const initialSectionId = window.location.hash.slice(1);
if (trackedSections.some((section) => section.id === initialSectionId)) {
  setActiveSection(initialSectionId);
}

const sectionObserver = new IntersectionObserver((entries) => {
  const visibleSections = entries
    .filter((entry) => entry.isIntersecting)
    .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top);

  if (visibleSections.length > 0) {
    setActiveSection(visibleSections[visibleSections.length - 1].target.id);
  }
}, {
  rootMargin: '-25% 0px -65% 0px',
  threshold: 0,
});

trackedSections.forEach((section) => sectionObserver.observe(section));
sectionNavLinks.forEach((link) => {
  link.addEventListener('click', () => {
    setActiveSection(link.getAttribute('href').slice(1));
  });
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = String(formData.get('name') || '').trim();
  const contact = String(formData.get('contact') || '').trim();
  const message = String(formData.get('message') || '').trim();
  const subject = `Objednanie terapie - ${name}`;
  const body = `Meno: ${name}\nKontakt: ${contact}\n\nSpráva:\n${message}`;

  formStatus.textContent = 'Otváram e-mailového klienta...';
  window.location.href = `mailto:michal.straka1311@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

const headerObserver = new IntersectionObserver(([entry]) => {
  header.classList.toggle('scrolled', !entry.isIntersecting);
}, { rootMargin: '-96px 0px 0px 0px', threshold: 0 });
headerObserver.observe(document.querySelector('#domov'));

if (!reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .14, rootMargin: '0px 0px -45px 0px' });

  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
}

document.querySelector('#year').textContent = new Date().getFullYear();
