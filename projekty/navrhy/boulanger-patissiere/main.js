const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const nav = document.querySelector('[data-nav]');
const hero = document.querySelector('.hero');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let menuScrollY = 0;

const copy = {
  sk: {
    title: 'Boulanger & Patissiere | Prémiový redizajn',
    skip: 'Preskočiť na obsah',
    mottoAria: 'Motto značky',
    topline: 'Dezerty. Torty. Chvíle.',
    brandHome: 'Boulanger and Patissiere, domov',
    mainNav: 'Hlavná navigácia',
    navOffer: 'Ponuka',
    navBakery: 'Pekáreň',
    navCakes: 'Torty na mieru',
    navAbout: 'O nás',
    navVisit: 'Prevádzka',
    navContact: 'Kontakt',
    emailAria: 'Napísať e-mail na boulangerpatissiere@gmail.com',
    phoneAria: 'Zavolať na +421 940 050 801',
    langGroup: 'Jazyk',
    menuOpenAria: 'Otvoriť menu',
    menuCloseAria: 'Zavrieť menu',
    menu: 'Menu',
    menuClose: 'Zavrieť',
    heroEyebrow: 'Vyrobené s láskou',
    heroTitle: 'Život chutí<br><em>lepšie</em><br>s&nbsp;dezertom.',
    heroLead: 'Remeselná cukráreň a pekáreň v Bratislave. Pečieme torty na mieru, dezerty a čerstvé pečivo pre každý deň aj výnimočné chvíle.',
    heroOrder: 'Objednať tortu',
    heroOffer: 'Pozrieť ponuku',
    heroGoogleAria: 'Google hodnotenie 4,8 z 5 podľa 110 recenzií',
    heroGoogleScore: '4,8 z 5 na Google',
    heroGoogleCount: 'podľa 110 overených recenzií',
    sticker: 'Malé detaily,<br>veľké radosti.',
    valuesAria: 'Naše hodnoty',
    value1Title: 'Vlastná výroba',
    value1Text: 'Pripravujeme priamo u nás.',
    value2Title: 'Torty na mieru',
    value2Text: 'Pre oslavy, svadby a výnimočné chvíle.',
    value3Title: 'Čerstvé každý deň',
    value3Text: 'Chlieb, pečivo aj dezerty.',
    value4Title: 'Osobný prístup',
    value4Text: 'Od prvého nápadu po hotovú objednávku.',
    popularEyebrow: 'Objavte našu ponuku',
    popularTitle: 'Naše najobľúbenejšie',
    catBiscuit: 'Piškótové torty',
    catBiscuitText: 'Klasická piškóta, krém a sezónne ovocie.',
    catBiscuitAlt: 'Piškótová torta s krémom a physalis',
    catMousse: 'Mousse torty',
    catMousseText: 'Jemný mousse a lesklá čokoláda.',
    catMousseAlt: 'Čokoládový mousse dezert',
    catCheesecake: 'Cheesecaky',
    catCheesecakeText: 'Krémový rez s karamelom.',
    catCheesecakeAlt: 'Rez cheesecaku s karamelom',
    catPetit: 'Tartaletky, makrónky, choux',
    catPetitAlt: 'Farebný výber makróniek',
    catTravel: 'Cestovné koláče',
    catTravelAlt: 'Cestovný koláč s orechmi a kandizovaným ovocím',
    catVegan: 'Vegánske torty',
    catVeganAlt: 'Vegánsky banánový koláč s orechmi',
    catGluten: 'Bez lepku',
    catGlutenAlt: 'Bezgluténové pavlové s ovocím',
    catDiscover: 'Objaviť',
    fullOffer: 'Celá ponuka',
    bakeryEyebrow: 'Naša pekáreň',
    bakeryTitle: 'Ráno začína vôňou chleba.',
    bakeryText: 'Naše remeslo sa nekončí pri dezertoch. Pečieme chlieb, chrumkavé bagety a čerstvé pečivo na každý deň.',
    bakeryCatBread: 'Chlieb',
    bakeryCatBaguette: 'Bagety',
    bakeryCatPastry: 'Čerstvé pečivo',
    bakeryCta: 'Pozrieť pečivo',
    bakeryAlt: 'Čerstvo upečené bagety na drevenom stole',
    storyEyebrow: 'Náš príbeh',
    storyTitle: 'Viac než dezert.<br>Je to spomienka.',
    storyText: 'Boulanger & Patissiere je miesto, kde sa spája poctivé remeslo, kvalitné suroviny a láska k detailom. Pečieme, aby sme boli súčasťou vašich výnimočných chvíľ, malých aj veľkých.',
    storyCta: 'Spoznať náš príbeh',
    storyNote: 's láskou',
    storyAlt: 'Útulné posedenie v prevádzke Boulanger and Patissiere',
    customEyebrow: 'Vaša predstava, naše remeslo',
    customTitle: 'Torta podľa vašej predstavy',
    customText: 'Či už snívate o narodeninovej torte, svadobnej lahôdke alebo torte pre akúkoľvek inú príležitosť, radi premeníme vaše nápady na sladkú realitu.',
    customCta: 'Objednať tortu',
    customAlt: 'Slávnostná torta na mieru so zlatými detailmi',
    step1: 'Vyberte si štýl a príchuť',
    step2: 'Povedzte nám svoju predstavu',
    step3: 'Dohodneme detaily a termín',
    step4: 'Tortu pre vás s láskou upečieme',
    reviewsEyebrow: 'Čo o nás hovoria',
    reviewsTitle: 'Sladké slová od našich zákazníkov',
    reviewsGoogle: 'Všetky recenzie na Google',
    starsAria: '5 z 5 hviezdičiek',
    review1: '„Najlepšie dezerty v Bratislave! Vždy čerstvé, krásne a hlavne výborné.“',
    review2: '„Torta predčila naše očakávania. Nielen krásna, ale aj úžasne chutná.“',
    review3: '„Príjemná atmosféra, milý personál a neuveriteľný výber. Odporúčam!“',
    igEyebrow: 'Sledujte nás',
    igTitle: 'Sladké chvíle z našej cukrárne',
    igCta: 'Sledovať na Instagrame',
    igAltFeature: 'Jubilejná torta v zlatých tónoch',
    igAltMacarons: 'Farebné makrónky',
    igAltBread: 'Čerstvo upečené bagety na drevenom stole',
    igAltInterior: 'Útulné posedenie v prevádzke Boulanger and Patissiere',
    igAltBerry: 'Jahodová torta s čokoládovou dekoráciou',
    visitEyebrow: 'Navštívte nás',
    visitTitle: 'Zastavte sa u nás.',
    visitHours: 'Objednávky prijímame denne od 9:00 do 18:00.',
    visitNote: 'Osobný odber po dohode, doručenie v Bratislave od 10 €.',
    visitMaps: 'Otvoriť v Google Maps',
    visitWrite: 'Napísať správu',
    visitQuote: 'Tešíme sa<br>na vašu návštevu.',
    contactEyebrow: 'Napíšte nám',
    contactTitle: 'Máte otázku alebo sladkú<br>predstavu?',
    contactLead: 'Napíšte nám, čo pre vás môžeme pripraviť. Ozveme sa vám čo najskôr.',
    formName: 'Meno a priezvisko',
    formEmail: 'E-mail',
    formPhone: 'Telefón',
    formType: 'Typ požiadavky',
    formTypeEmpty: 'Vyberte typ',
    formTypeCake: 'Torta na mieru',
    formTypeOffer: 'Ponuka produktov',
    formTypeOrder: 'Objednávka',
    formTypeGeneral: 'Všeobecná otázka',
    formMessage: 'Správa',
    formPrivacy: 'Vaše údaje použijeme len na vybavenie tejto správy.',
    formConsent: 'Súhlasím so spracovaním osobných údajov na účely vybavenia tejto správy.',
    formErrorConsent: 'Potvrďte súhlas so spracovaním osobných údajov.',
    formSubmit: 'Odoslať správu',
    formSubmitting: 'Odosielam…',
    formSuccess: 'Ďakujeme, vaša správa bola odoslaná. Ozveme sa vám čo najskôr.',
    formError: 'Správu sa nepodarilo odoslať. Skúste to znova alebo nás kontaktujte telefonicky či e-mailom.',
    formErrorName: 'Zadajte meno a priezvisko.',
    formErrorEmail: 'Zadajte platnú e-mailovú adresu.',
    formErrorPhone: 'Skontrolujte formát telefónneho čísla.',
    formErrorMessage: 'Napíšte správu.',
    footerNav: 'Navigácia v päte',
    footerEmail: 'E-mail',
    rights: 'Všetky práva vyhradené.',
    fromBa: 'S láskou z Bratislavy.'
  },
  en: {
    title: 'Boulanger & Patissiere | Premium redesign',
    skip: 'Skip to content',
    mottoAria: 'Brand motto',
    topline: 'Desserts. Cakes. Moments.',
    brandHome: 'Boulanger and Patissiere, home',
    mainNav: 'Main navigation',
    navOffer: 'Menu',
    navBakery: 'Bakery',
    navCakes: 'Custom cakes',
    navAbout: 'About',
    navVisit: 'Visit',
    navContact: 'Contact',
    emailAria: 'Email boulangerpatissiere@gmail.com',
    phoneAria: 'Call +421 940 050 801',
    langGroup: 'Language',
    menuOpenAria: 'Open menu',
    menuCloseAria: 'Close menu',
    menu: 'Menu',
    menuClose: 'Close',
    heroEyebrow: 'Made with love',
    heroTitle: 'Life tastes<br><em>better</em><br>with&nbsp;dessert.',
    heroLead: 'A craft patisserie and bakery in Bratislava. We bake custom cakes, desserts and fresh pastry for every day and special moments.',
    heroOrder: 'Order a cake',
    heroOffer: 'See the menu',
    heroGoogleAria: 'Google rating 4.8 out of 5 from 110 reviews',
    heroGoogleScore: '4.8 out of 5 on Google',
    heroGoogleCount: 'based on 110 verified reviews',
    sticker: 'Small details,<br>great joys.',
    valuesAria: 'Our values',
    value1Title: 'Made in-house',
    value1Text: 'We prepare everything here.',
    value2Title: 'Custom cakes',
    value2Text: 'For celebrations, weddings and special moments.',
    value3Title: 'Fresh every day',
    value3Text: 'Bread, pastry and desserts.',
    value4Title: 'Personal approach',
    value4Text: 'From the first idea to the finished order.',
    popularEyebrow: 'Discover our offer',
    popularTitle: 'Our favourites',
    catBiscuit: 'Biscuit cakes',
    catBiscuitText: 'Classic sponge, cream and seasonal fruit.',
    catBiscuitAlt: 'Biscuit cake with cream and physalis',
    catMousse: 'Mousse cakes',
    catMousseText: 'Light mousse and glossy chocolate.',
    catMousseAlt: 'Chocolate mousse dessert',
    catCheesecake: 'Cheesecakes',
    catCheesecakeText: 'A creamy slice with caramel.',
    catCheesecakeAlt: 'Cheesecake slice with caramel',
    catPetit: 'Tarts, macarons, choux',
    catPetitAlt: 'A colourful selection of macarons',
    catTravel: 'Travel cakes',
    catTravelAlt: 'Travel cake with nuts and candied fruit',
    catVegan: 'Vegan cakes',
    catVeganAlt: 'Vegan banana cake with walnuts',
    catGluten: 'Gluten free',
    catGlutenAlt: 'Gluten-free pavlovas with berries',
    catDiscover: 'Discover',
    fullOffer: 'Full menu',
    bakeryEyebrow: 'Our bakery',
    bakeryTitle: 'The morning begins with the smell of bread.',
    bakeryText: 'Our craft does not end with desserts. We bake bread, crusty baguettes and fresh pastry for every day.',
    bakeryCatBread: 'Bread',
    bakeryCatBaguette: 'Baguettes',
    bakeryCatPastry: 'Fresh pastry',
    bakeryCta: 'See the pastry',
    bakeryAlt: 'Freshly baked baguettes on a wooden board',
    storyEyebrow: 'Our story',
    storyTitle: 'More than dessert.<br>It is a memory.',
    storyText: 'Boulanger & Patissiere is where honest craft, fine ingredients and love of detail meet. We bake to be part of your special moments, small and large.',
    storyCta: 'Discover our story',
    storyNote: 'with love',
    storyAlt: 'Cosy seating at Boulanger and Patissiere',
    customEyebrow: 'Your idea, our craft',
    customTitle: 'A cake made for you',
    customText: 'Whether you dream of a birthday cake, a wedding treat or a cake for any other occasion, we will turn your ideas into something sweet.',
    customCta: 'Order a cake',
    customAlt: 'Celebratory custom cake with gold details',
    step1: 'Choose a style and flavour',
    step2: 'Tell us your idea',
    step3: 'We agree on details and a date',
    step4: 'We bake the cake for you with love',
    reviewsEyebrow: 'What they say',
    reviewsTitle: 'Sweet words from our guests',
    reviewsGoogle: 'All reviews on Google',
    starsAria: '5 out of 5 stars',
    review1: '"The best desserts in Bratislava. Always fresh, beautiful and delicious."',
    review2: '"The cake exceeded our expectations. Beautiful, and even better to eat."',
    review3: '"A lovely atmosphere, kind staff and an incredible selection. Highly recommend!"',
    igEyebrow: 'Follow us',
    igTitle: 'Sweet moments from our patisserie',
    igCta: 'Follow on Instagram',
    igAltFeature: 'A golden anniversary cake',
    igAltMacarons: 'A colourful selection of macarons',
    igAltBread: 'Freshly baked baguettes on a wooden board',
    igAltInterior: 'Cosy seating at Boulanger and Patissiere',
    igAltBerry: 'Strawberry cake with chocolate decoration',
    visitEyebrow: 'Visit us',
    visitTitle: 'Stop by and see us.',
    visitHours: 'We take orders daily from 9:00 to 18:00.',
    visitNote: 'Pickup by arrangement, delivery in Bratislava from 10 €.',
    visitMaps: 'Open in Google Maps',
    visitWrite: 'Write a message',
    visitQuote: 'We look forward<br>to seeing you.',
    contactEyebrow: 'Write to us',
    contactTitle: 'Have a question or a<br>sweet idea?',
    contactLead: 'Tell us what we can prepare for you. We will get back to you as soon as we can.',
    formName: 'Full name',
    formEmail: 'Email',
    formPhone: 'Phone',
    formType: 'Request type',
    formTypeEmpty: 'Choose a type',
    formTypeCake: 'Custom cake',
    formTypeOffer: 'Product offer',
    formTypeOrder: 'Order',
    formTypeGeneral: 'General question',
    formMessage: 'Message',
    formPrivacy: 'We will use your details only to handle this message.',
    formConsent: 'I agree to the processing of personal data for the purpose of handling this message.',
    formErrorConsent: 'Please confirm consent to personal data processing.',
    formSubmit: 'Send message',
    formSubmitting: 'Sending…',
    formSuccess: 'Thank you, your message has been sent. We will get back to you as soon as we can.',
    formError: 'Your message could not be sent. Please try again or contact us by phone or email.',
    formErrorName: 'Please enter your full name.',
    formErrorEmail: 'Please enter a valid email address.',
    formErrorPhone: 'Please check the phone number format.',
    formErrorMessage: 'Please write a message.',
    footerNav: 'Footer navigation',
    footerEmail: 'Email',
    rights: 'All rights reserved.',
    fromBa: 'With love from Bratislava.'
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
  try { localStorage.setItem('bp-lang', currentLang); } catch { /* ignore */ }
};

document.querySelector('[data-lang-switch]')?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-lang]');
  if (!button) return;
  applyLang(button.dataset.lang);
});

try {
  const saved = localStorage.getItem('bp-lang');
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
  const typeField = form.querySelector('#contact-type');
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
      if (!trimmed) return '';
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

  const applyTypeFromQuery = () => {
    if (!typeField) return;
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash;
    const type = params.get('typ');
    if (type === 'torta-na-mieru') {
      typeField.value = 'torta-na-mieru';
    }
    if (hash === '#kontakt' && type === 'torta-na-mieru') {
      typeField.value = 'torta-na-mieru';
    }
  };

  applyTypeFromQuery();
  window.addEventListener('popstate', applyTypeFromQuery);
  window.addEventListener('hashchange', applyTypeFromQuery);

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
        // Backend endpoint is not configured yet. Keep UI ready without fake success.
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
      applyTypeFromQuery();
      showStatus(strings().formSuccess, 'success');
    } catch {
      showStatus(strings().formError, 'error');
    } finally {
      setLoading(false);
    }
  });
};

initContactForm();
