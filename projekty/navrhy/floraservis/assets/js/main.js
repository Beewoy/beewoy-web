const menuButton = document.querySelector('[data-menu-button]');
const navigation = document.querySelector('[data-navigation]');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    navigation.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      menuButton.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    }
  });
}

const searchForm = document.querySelector('[data-search-form]');
const searchInput = document.querySelector('[data-search-input]');
const solutionCards = [...document.querySelectorAll('[data-search-terms]')];
const noResults = document.querySelector('[data-no-results]');

const normalize = (value) => value
  .toLocaleLowerCase('sk')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .trim();

const filterSolutions = () => {
  if (!searchInput) return;
  const query = normalize(searchInput.value);
  let visibleCount = 0;

  solutionCards.forEach((card) => {
    const searchableText = normalize(`${card.dataset.searchTerms} ${card.textContent}`);
    const isVisible = !query || searchableText.includes(query);
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  if (noResults) noResults.hidden = visibleCount !== 0;
};

if (searchForm && searchInput) {
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    filterSolutions();
    document.querySelector('#riesenia')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  searchInput.addEventListener('input', filterSolutions);
}

const header = document.querySelector('[data-header]');
if (header) {
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

const contactForm = document.querySelector('[data-contact-form]');
if (contactForm) {
  const status = contactForm.querySelector('[data-form-status]');

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const data = new FormData(contactForm);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const topic = String(data.get('topic') || '').trim();
    const message = String(data.get('message') || '').trim();

    const body = [
      `Meno / firma: ${name}`,
      `E-mail: ${email}`,
      phone ? `Telefón: ${phone}` : null,
      `Téma: ${topic}`,
      '',
      message,
    ].filter((line) => line !== null).join('\n');

    const mailto = `mailto:obchod@floraservis.sk?subject=${encodeURIComponent(`Kontakt: ${topic}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    if (status) {
      status.textContent = 'Otvára sa e-mailový klient so správou.';
      status.classList.add('is-ready');
    }
  });
}
