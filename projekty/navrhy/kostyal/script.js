const galleryItems = [...document.querySelectorAll('.gallery-item')];
const dialog = document.querySelector('#gallery-dialog');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');
const lightboxCounter = document.querySelector('#lightbox-counter');
const previousButton = document.querySelector('#lightbox-prev');
const nextButton = document.querySelector('#lightbox-next');
const closeButton = document.querySelector('#lightbox-close');
const archiveMoreButton = document.querySelector('#archive-more');
const extraArchiveItems = [...document.querySelectorAll('.archive-item[hidden]')];
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
let activeImage = 0;
let opener = null;

function closeMenu() {
  header.classList.remove('nav-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Otvoriť navigáciu');
  main.inert = false;
  footer.inert = false;
}

menuToggle.addEventListener('click', () => {
  const isOpen = header.classList.toggle('nav-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Zavrieť navigáciu' : 'Otvoriť navigáciu');
  main.inert = isOpen;
  footer.inert = isOpen;
  if (isOpen) navigation.querySelector('a').focus();
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('click', (event) => {
  if (!header.contains(event.target)) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && header.classList.contains('nav-open')) {
    closeMenu();
    menuToggle.focus();
  }
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 1050) closeMenu();
});

function showImage(index) {
  const visibleItems = galleryItems.filter((item) => !item.hidden);
  activeImage = (index + visibleItems.length) % visibleItems.length;
  const item = visibleItems[activeImage];
  const image = item.querySelector('img');
  lightboxImage.src = item.dataset.full;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = item.dataset.caption;
  lightboxCounter.textContent = `${activeImage + 1} / ${visibleItems.length}`;
  dialog.classList.toggle('lightbox-archive', item.classList.contains('archive-item'));
}

galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    opener = item;
    showImage(galleryItems.filter((entry) => !entry.hidden).indexOf(item));
    dialog.showModal();
  });
});

archiveMoreButton.addEventListener('click', () => {
  const expanded = archiveMoreButton.getAttribute('aria-expanded') === 'true';
  extraArchiveItems.forEach((item) => { item.hidden = expanded; });
  archiveMoreButton.setAttribute('aria-expanded', String(!expanded));
  archiveMoreButton.querySelector('span').textContent = expanded ? 'Zobraziť celý fotoarchív' : 'Zobraziť menej fotografií';
});

previousButton.addEventListener('click', () => showImage(activeImage - 1));
nextButton.addEventListener('click', () => showImage(activeImage + 1));
closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => opener?.focus());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') showImage(activeImage - 1);
  if (event.key === 'ArrowRight') showImage(activeImage + 1);
});
