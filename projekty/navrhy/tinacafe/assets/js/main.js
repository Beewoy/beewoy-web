(function () {
  'use strict';

  var header = document.querySelector('[data-header]');
  var menuButton = document.querySelector('.menu-toggle');
  var navigation = document.querySelector('.site-nav');
  var year = document.querySelector('[data-current-year]');

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  function setMenu(open) {
    if (!menuButton || !navigation) return;

    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.querySelector('.sr-only').textContent = open ? 'Zatvoriť menu' : 'Otvoriť menu';
    navigation.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
  }

  if (menuButton && navigation) {
    menuButton.addEventListener('click', function () {
      setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
    });

    navigation.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        menuButton.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 896) setMenu(false);
    });
  }

  function updateHeader() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  var form = document.getElementById('contact-form');
  if (!form) return;

  var status = document.getElementById('form-status');
  var fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    message: document.getElementById('message'),
    consent: document.getElementById('consent')
  };

  var messages = {
    name: 'Uveďte, prosím, svoje meno.',
    email: 'Uveďte platnú e-mailovú adresu.',
    message: 'Napíšte, prosím, s čím vám môžeme pomôcť.',
    consent: 'Pre prípravu dopytu je potrebné potvrdiť súhlas.'
  };

  function setError(key, message) {
    var field = fields[key];
    var error = document.getElementById(key + '-error');

    if (!field || !error) return;
    error.textContent = message || '';
    field.setAttribute('aria-invalid', message ? 'true' : 'false');

    if (message) {
      field.setAttribute('aria-describedby', error.id);
    } else {
      field.removeAttribute('aria-describedby');
    }
  }

  function fieldIsValid(key) {
    var field = fields[key];
    if (!field) return true;

    var valid = field.checkValidity();
    setError(key, valid ? '' : messages[key]);
    return valid;
  }

  Object.keys(fields).forEach(function (key) {
    var field = fields[key];
    if (!field) return;

    field.addEventListener(field.type === 'checkbox' ? 'change' : 'input', function () {
      if (field.getAttribute('aria-invalid') === 'true') fieldIsValid(key);
      if (status) status.textContent = '';
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var keys = Object.keys(fields);
    var allValid = keys.every(fieldIsValid);

    if (!allValid) {
      var firstInvalid = keys.map(function (key) { return fields[key]; }).find(function (field) {
        return field && !field.checkValidity();
      });
      if (firstInvalid) firstInvalid.focus();
      if (status) status.textContent = 'Skontrolujte označené polia.';
      return;
    }

    var data = new FormData(form);
    var subject = 'Dopyt z webu – ' + data.get('interest');
    var body = [
      'Dobrý deň,',
      '',
      String(data.get('message')).trim(),
      '',
      'Záujem o: ' + data.get('interest'),
      'Meno: ' + String(data.get('name')).trim(),
      'Firma: ' + (String(data.get('company')).trim() || 'neuvedená'),
      'E-mail: ' + String(data.get('email')).trim(),
      'Telefón: ' + (String(data.get('phone')).trim() || 'neuvedený')
    ].join('\n');

    if (status) status.textContent = 'Otvárame vašu e-mailovú aplikáciu. Dopyt odošlete až v nej.';

    window.location.href = 'mailto:tinacafe@tinacafe.sk?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
})();
