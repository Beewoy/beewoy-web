const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const nav = document.querySelector('[data-nav]');
const hero = document.querySelector('.hero');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let menuScrollY = 0;

const copy = {
  sk: {
    title: 'Naša Pekáreň | Dúbravka, Bratislava',
    skip: 'Preskočiť na obsah',
    brandHome: 'Naša Pekáreň, domov',
    mainNav: 'Hlavná navigácia',
    navOffer: 'Ponuka',
    navStory: 'Náš príbeh',
    navReviews: 'Recenzie',
    navContact: 'Kontakt',
    emailAria: 'Napísať e-mail',
    phoneAria: 'Zavolať na +421 940 541 737',
    langGroup: 'Jazyk',
    menuOpenAria: 'Otvoriť menu',
    menuCloseAria: 'Zavrieť menu',
    heroTitle: 'Pečieme<br>s <em>láskou</em><br>pre vás.',
    heroLead: 'Vaša susedská pekáreň v Dúbravke. Tradičné recepty, čerstvé suroviny a pečivo upečené každý deň. Pre vašu rodinu a priateľov.',
    heroCall: 'Zavolať',
    heroEmail: 'Napísať',
    valuesAria: 'Naše hodnoty',
    value1Title: 'Každý deň čerstvé',
    value1Text: 'Pečieme denne od rána.',
    value2Title: 'Tradičné recepty',
    value2Text: 'Overené postupy a kvalitné suroviny.',
    value3Title: 'V srdci Dúbravky',
    value3Text: 'Vaša susedská pekáreň.',
    value4Title: 'S láskou',
    value4Text: 'Pre vašu rodinu.',
    offerEyebrow: 'Naša ponuka',
    offerTitle: 'Čo u nás nájdete',
    offerSalty: 'Slané pečivo',
    offerSaltyText: 'Rožky, bagety, ciabatta a tradičné slané pochúťky.',
    offerSaltyAlt: 'Slané pečivo',
    offerSweet: 'Sladké pečivo',
    offerSweetText: 'Koláče, záviny, buchty a tradičné sladkosti.',
    offerSweetAlt: 'Sladké pečivo',
    offerCakes: 'Torty na mieru',
    offerCakesText: 'Pre narodeniny, svadby a rodinné oslavy.',
    offerCakesAlt: 'Torty',
    offerGluten: 'Bezgluténové pečivo',
    offerGlutenText: 'Pre tých, ktorí potrebujú špeciálnu stravu.',
    offerGlutenAlt: 'Bezgluténové',
    offerLactose: 'Bezlaktózové',
    offerLactoseText: 'Zdravé alternatívy bez mliečnych výrobkov.',
    offerLactoseAlt: 'Bezlaktózové',
    offerGastro: 'Pre gastro',
    offerGastroText: 'Veľké objednávky pre reštaurácie a firmy.',
    offerGastroAlt: 'Pre gastro',
    storyEyebrow: 'Náš príbeh',
    storyTitle: 'Tradičná<br>pekáreň v&nbsp;štvrti.',
    storyText: 'Naša Pekáreň je súčasťou Dúbravky už mnoho rokov. Pečieme pre vás a vašich najbližších s láskou a rešpektom k tradíciám. Používame overené recepty a kvalitné suroviny.',
    storyText2: 'Navštívte nás v prevádzke na Saratovskej ulici alebo si objednajte telefonicky. Radi pre vás pripravíme čokoľvek z našej ponuky.',
    storyAlt: 'Naša prevádzka v Dúbravke',
    reviewsEyebrow: 'Čo hovoria zákazníci',
    reviewsTitle: 'Vaše skúsenosti',
    reviewsFacebook: 'Navštívte nás na Facebooku',
    reviewsNote: 'Sme tu pre vás každý deň. Tešíme sa na vašu návštevu v našej pekárni v Dúbravke alebo na vašu objednávku.',
    contactEyebrow: 'Kontakt',
    contactTitle: 'Máte otázku<br>alebo objednávku?',
    contactLead: 'Zavolajte nám alebo napíšte. Radi vám pomôžeme s výberom a odpovieme na všetky otázky.',
    contactPhoneLabel: 'Prevádzka:',
    contactSpecialLabel: 'Špeciálne objednávky:',
    contactMaps: 'Otvoriť v Google Maps',
    formName: 'Meno a priezvisko',
    formEmail: 'E-mail',
    formPhone: 'Telefón',
    formMessage: 'Správa',
    formConsent: 'Súhlasím so spracovaním osobných údajov na účely vybavenia tejto správy.',
    formErrorConsent: 'Potvrďte súhlas so spracovaním osobných údajov.',
    formSubmit: 'Odoslať správu',
    formSubmitting: 'Odosielam…',
    formSuccess: 'Ďakujeme, vaša správa bola odoslaná. Ozveme sa vám čo najskôr.',
    formError: 'Správu sa nepodarilo odoslať. Skúste to znova alebo nás kontaktujte telefonicky či e-mailom.',
    formErrorName: 'Zadajte meno a priezvisko.',
    formErrorEmail: 'Zadajte platnú e-mailovú adresu.',
    formErrorPhone: 'Zadajte telefónne číslo.',
    formErrorMessage: 'Napíšte správu.',
    footerNav: 'Navigácia v päte',
    rights: 'Všetky práva vyhradené.',
    footerTagline: 'Pečieme s láskou pre Dúbravku',
    proposal: 'Návrh redizajnu: Beewoy'
  },
  en: {
    title: 'Naša Pekáreň | Dúbravka, Bratislava',
    skip: 'Skip to content',
    brandHome: 'Naša Pekáreň, home',
    mainNav: 'Main navigation',
    navOffer: 'Menu',
    navStory: 'Our story',
    navReviews: 'Reviews',
    navContact: 'Contact',
    emailAria: 'Send email',
    phoneAria: 'Call +421 940 541 737',
    langGroup: 'Language',
    menuOpenAria: 'Open menu',
    menuCloseAria: 'Close menu',
    heroTitle: 'Baked<br>with <em>love</em><br>for you.',
    heroLead: 'Your neighborhood bakery in Dúbravka. Traditional recipes, fresh ingredients and pastry baked every day. For your family and friends.',
    heroCall: 'Call',
    heroEmail: 'Email',
    valuesAria: 'Our values',
    value1Title: 'Fresh daily',
    value1Text: 'We bake daily from morning.',
    value2Title: 'Traditional recipes',
    value2Text: 'Proven methods and quality ingredients.',
    value3Title: 'Heart of Dúbravka',
    value3Text: 'Your neighborhood bakery.',
    value4Title: 'With love',
    value4Text: 'For your family.',
    offerEyebrow: 'Our menu',
    offerTitle: 'What we offer',
    offerSalty: 'Savory pastry',
    offerSaltyText: 'Rolls, baguettes, ciabatta and traditional savory treats.',
    offerSaltyAlt: 'Savory pastry',
    offerSweet: 'Sweet pastry',
    offerSweetText: 'Cakes, strudels, buns and traditional sweets.',
    offerSweetAlt: 'Sweet pastry',
    offerCakes: 'Custom cakes',
    offerCakesText: 'For birthdays, weddings and family celebrations.',
    offerCakesAlt: 'Cakes',
    offerGluten: 'Gluten-free',
    offerGlutenText: 'For those who need a special diet.',
    offerGlutenAlt: 'Gluten-free',
    offerLactose: 'Lactose-free',
    offerLactoseText: 'Healthy alternatives without dairy.',
    offerLactoseAlt: 'Lactose-free',
    offerGastro: 'For gastro',
    offerGastroText: 'Large orders for restaurants and companies.',
    offerGastroAlt: 'For gastro',
    storyEyebrow: 'Our story',
    storyTitle: 'Traditional<br>neighborhood bakery.',
    storyText: 'Naša Pekáreň has been part of Dúbravka for many years. We bake for you and your loved ones with love and respect for traditions. We use proven recipes and quality ingredients.',
    storyText2: 'Visit us at our location on Saratovská street or order by phone. We will gladly prepare anything from our menu for you.',
    storyAlt: 'Our location in Dúbravka',
    reviewsEyebrow: 'What customers say',
    reviewsTitle: 'Your experiences',
    reviewsFacebook: 'Visit us on Facebook',
    reviewsNote: 'We are here for you every day. We look forward to seeing you at our bakery in Dúbravka or receiving your order.',
    contactEyebrow: 'Contact',
    contactTitle: 'Have a question<br>or order?',
    contactLead: 'Call us or write. We will gladly help you choose and answer all questions.',
    contactPhoneLabel: 'Shop:',
    contactSpecialLabel: 'Special orders:',
    contactMaps: 'Open in Google Maps',
    formName: 'Full name',
    formEmail: 'Email',
    formPhone: 'Phone',
    formMessage: 'Message',
    formConsent: 'I agree to the processing of personal data for the purpose of handling this message.',
    formErrorConsent: 'Please confirm consent to personal data processing.',
    formSubmit: 'Send message',
    formSubmitting: 'Sending…',
    formSuccess: 'Thank you, your message has been sent. We will get back to you as soon as we can.',
    formError: 'Your message could not be sent. Please try again or contact us by phone or email.',
    formErrorName: 'Please enter your full name.',
    formErrorEmail: 'Please enter a valid email address.',
    formErrorPhone: 'Please enter a phone number.',
    formErrorMessage: 'Please write a message.',
    footerNav: 'Footer navigation',
    rights: 'All rights reserved.',
    footerTagline: 'Baked with love for Dúbravka',
    proposal: 'Redesign proposal: Beewoy'
  }
};

let currentLang = 'sk';

const applyLang = (lang) => {
  currentLang = copy[lang] ? lang : 'sk';
  const strings = copy[currentLang];
  document.documentElement.lang = currentLang;
  document.title = strings.title;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = strings[element.dataset.i18n];
    if (value == null) return;
    if (element.hasAttribute('data-i18n-html')) element.innerHTML = value;
    else element.textContent = value;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
    const value = strings[element.dataset.i18nAria];
    if (value) element.setAttribute('aria-label', value);
  });
  document.querySelectorAll('[data-i18n-alt]').forEach((element) => {
    const value = strings[element.dataset.i18nAlt];
    if (value) element.setAttribute('alt', value);
  });
  document.querySelectorAll('[data-lang]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.lang === currentLang));
  });
  if (menuButton) {
    const menuOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-label', menuOpen ? strings.menuCloseAria : strings.menuOpenAria);
  }
  const submitLabel = document.querySelector('[data-form-submit-label]');
  const form = document.querySelector('[data-contact-form]');
  if (submitLabel && form?.dataset.submitting !== 'true') {
    submitLabel.textContent = strings.formSubmit;
  }
  try { localStorage.setItem('np-lang', currentLang); } catch { /* ignore */ }
};

document.querySelector('[data-lang-switch]')?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-lang]');
  if (!button) return;
  applyLang(button.dataset.lang);
});

try {
  const saved = localStorage.getItem('np-lang');
  if (saved && copy[saved] && saved !== 'sk') applyLang(saved);
} catch { /* ignore */ }

const headerObserver = new IntersectionObserver(([entry]) => {
  header.classList.toggle('is-scrolled', !entry.isIntersecting);
}, { threshold: 0.86 });
headerObserver.observe(document.querySelector('.hero-inner') || hero);

const setMenuOpen = (willOpen) => {
  menuButton.setAttribute('aria-expanded', String(willOpen));
  menuButton.setAttribute('aria-label', willOpen ? copy[currentLang].menuCloseAria : copy[currentLang].menuOpenAria);
  nav.classList.toggle('is-open', willOpen);
  header.classList.toggle('menu-active', willOpen);
  document.documentElement.classList.toggle('menu-open', willOpen);
  document.body.classList.toggle('menu-open', willOpen);

  if (willOpen) {
    menuScrollY = window.scrollY;
    document.body.style.top = `-${menuScrollY}px`;
  } else {
    document.body.style.top = '';
    window.scrollTo(0, menuScrollY);
  }
};

const closeMenu = () => {
  if (menuButton.getAttribute('aria-expanded') !== 'true') return;
  setMenuOpen(false);
};

menuButton.addEventListener('click', () => {
  const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  setMenuOpen(willOpen);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
window.addEventListener('resize', () => {
  if (window.matchMedia('(min-width: 821px)').matches) closeMenu();
});

if (reduceMotion) {
  document.querySelectorAll('[data-reveal]').forEach((element) => element.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.05, rootMargin: '0px 0px 8% 0px' });
  document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element));
}

document.querySelector('[data-year]').textContent = new Date().getFullYear();

const initContactForm = () => {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const status = document.getElementById('contact-form-status');
  const submitButton = form.querySelector('[data-form-submit]');
  const submitLabel = form.querySelector('[data-form-submit-label]');
  const endpoint = (form.dataset.endpoint || '').trim();

  const fields = {
    name: form.querySelector('#contact-name'),
    email: form.querySelector('#contact-email'),
    phone: form.querySelector('#contact-phone'),
    message: form.querySelector('#contact-message'),
    consent: form.querySelector('#contact-consent')
  };

  const strings = () => copy[currentLang];

  const showFieldError = (field, message) => {
    if (!field) return;
    const wrapper = field.closest('.field');
    const error = document.getElementById(`${field.id}-error`);
    wrapper?.classList.toggle('has-error', Boolean(message));
    field.setAttribute('aria-invalid', String(Boolean(message)));
    if (error) error.textContent = message || '';
  };

  const validators = {
    name: (value) => (value.trim() ? '' : strings().formErrorName),
    email: (value) => {
      const trimmed = value.trim();
      if (!trimmed) return strings().formErrorEmail;
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) ? '' : strings().formErrorEmail;
    },
    phone: (value) => {
      const trimmed = value.trim();
      if (!trimmed) return strings().formErrorPhone;
      const digits = trimmed.replace(/\D/g, '');
      return digits.length >= 9 && digits.length <= 15 ? '' : strings().formErrorPhone;
    },
    message: (value) => (value.trim() ? '' : strings().formErrorMessage),
    consent: (_value, field) => (field.checked ? '' : strings().formErrorConsent)
  };

  const validateField = (field, key) => {
    const message = validators[key]?.(field.value, field) || '';
    showFieldError(field, message);
    return !message;
  };

  Object.entries(fields).forEach(([key, field]) => {
    if (!field) return;
    const eventName = field.type === 'checkbox' ? 'change' : 'input';
    field.addEventListener('blur', () => validateField(field, key));
    field.addEventListener(eventName, () => {
      if (field.getAttribute('aria-invalid') === 'true') validateField(field, key);
    });
  });

  const setLoading = (loading) => {
    form.dataset.submitting = String(loading);
    if (submitButton) {
      if (loading) {
        submitButton.style.minWidth = `${Math.ceil(submitButton.getBoundingClientRect().width)}px`;
      } else {
        submitButton.style.minWidth = '';
      }
      submitButton.disabled = loading;
      submitButton.setAttribute('aria-busy', String(loading));
    }
    if (submitLabel) {
      submitLabel.textContent = loading ? strings().formSubmitting : strings().formSubmit;
    }
  };

  const showStatus = (message, type) => {
    if (!status) return;
    status.hidden = false;
    status.textContent = message;
    status.classList.toggle('is-success', type === 'success');
    status.classList.toggle('is-error', type === 'error');
    status.focus({ preventScroll: true });
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (form.dataset.submitting === 'true') return;

    const honeypot = form.querySelector('#contact-website');
    if (honeypot && honeypot.value.trim()) return;

    if (status) {
      status.hidden = true;
      status.textContent = '';
      status.classList.remove('is-success', 'is-error');
    }

    let firstInvalid = null;
    Object.entries(fields).forEach(([key, field]) => {
      if (!field) return;
      const ok = validateField(field, key);
      if (!ok && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    setLoading(true);

    try {
      if (!endpoint) {
        showStatus(strings().formError, 'error');
        return;
      }

      const payload = Object.fromEntries(new FormData(form).entries());
      delete payload.website;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('submit_failed');

      form.reset();
      Object.values(fields).forEach((field) => showFieldError(field, ''));
      showStatus(strings().formSuccess, 'success');
    } catch {
      showStatus(strings().formError, 'error');
    } finally {
      setLoading(false);
    }
  });
};

initContactForm();
