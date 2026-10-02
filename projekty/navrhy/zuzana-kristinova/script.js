const header = document.querySelector('.site-header');
const menu = document.querySelector('.nav');
const toggle = document.querySelector('.menu-toggle');

const closeMenu = () => {
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Otvoriť menu');
  document.body.classList.remove('menu-open');
};

toggle.addEventListener('click', () => {
  const open = !menu.classList.contains('open');
  menu.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Zavrieť menu' : 'Otvoriť menu');
  document.body.classList.toggle('menu-open', open);
});
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 16);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

document.querySelector('#rok').textContent = new Date().getFullYear();
const revealItems = document.querySelectorAll('.reveal');
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealItems.forEach((item) => observer.observe(item));
}

document.querySelector('#dopyt-formular')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get('meno') || '').trim();
  const email = String(data.get('email') || '').trim();
  const phone = String(data.get('telefon') || '').trim();
  const message = String(data.get('sprava') || '').trim();
  const body = [
    'Dobrý deň,',
    '',
    message,
    '',
    `Meno: ${name}`,
    `E-mail: ${email}`,
    phone ? `Telefón: ${phone}` : null,
  ].filter((line) => line !== null).join('\n');
  const href = `mailto:kristinovazuz@gmail.com?subject=${encodeURIComponent('Dopyt na konzultáciu')}&body=${encodeURIComponent(body)}`;
  window.location.href = href;
});
