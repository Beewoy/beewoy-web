const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#main-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Zavrieť menu' : 'Otvoriť menu');
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Otvoriť menu');
  });
});

const applicationForm = document.querySelector('#application-form');
applicationForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!applicationForm.reportValidity()) return;

  const form = new FormData(applicationForm);
  const lines = [
    'Dobrý deň,',
    '',
    'mám záujem o Baby’s world a rada/rád by som sa informoval(a) o prijatí dieťaťa.',
    '',
    `Meno rodiča: ${form.get('parentName')}`,
    `Telefón: ${form.get('phone')}`,
    `E-mail: ${form.get('email')}`,
    `Meno dieťaťa: ${form.get('childName')}`,
    `Vek dieťaťa: ${form.get('childAge')}`,
    `Preferovaný režim: ${form.get('program') || 'Ešte neviem'}`,
    `Poznámka: ${form.get('note') || 'Bez poznámky'}`,
    '',
    'Ďakujem.'
  ];
  const subject = `Predbežný záujem – Baby’s world – ${form.get('parentName')}`;
  const mailto = `mailto:skolkavstupave@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  document.querySelector('#form-status').textContent = 'Otvorí sa váš e-mailový program. Správu ešte potvrďte a odošlite v ňom.';
  window.location.href = mailto;
});
