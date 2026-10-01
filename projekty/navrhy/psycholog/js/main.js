(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.getElementById("mobilna-navigacia");
  var desktop = window.matchMedia("(min-width: 1120px)");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Zavrieť menu" : "Otvoriť menu");
    menu.hidden = !open;
    document.body.classList.toggle("menu-open", open);
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });

    document.addEventListener("click", function (event) {
      if (menu.hidden) return;
      if (toggle.contains(event.target) || menu.contains(event.target)) return;
      setMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });

    desktop.addEventListener("change", function (event) {
      if (event.matches) setMenu(false);
    });
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("a[href^='#']");
    if (!link || link.target === "_blank") return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    var hash = link.getAttribute("href");
    if (!hash || hash.length < 2) return;
    var target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return;
    event.preventDefault();
    if (toggle && menu && !menu.hidden) setMenu(false);
    window.requestAnimationFrame(function () {
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
    if (history.pushState) history.pushState(null, "", hash);
  });

  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".desktop-nav a, .mobile-nav a"));

  function spy() {
    if (!sections.length) return;
    var marker = 96;
    var current = sections[0];
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= marker) current = section;
    });
    navLinks.forEach(function (link) {
      if (link.getAttribute("href") === "#" + current.id) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
      spy();
      ticking = false;
    });
  }, { passive: true });
  spy();

  document.querySelectorAll(".faq-item summary").forEach(function (summary) {
    summary.addEventListener("keydown", function (event) {
      var summaries = Array.prototype.slice.call(document.querySelectorAll(".faq-item summary"));
      var index = summaries.indexOf(summary);
      var next = null;
      if (event.key === "ArrowDown") next = summaries[index + 1];
      if (event.key === "ArrowUp") next = summaries[index - 1];
      if (event.key === "Home") next = summaries[0];
      if (event.key === "End") next = summaries[summaries.length - 1];
      if (!next) return;
      event.preventDefault();
      next.focus();
    });
  });

  if (!reduceMotion) {
    document.querySelectorAll(".faq-item").forEach(function (item) {
      var summary = item.querySelector("summary");
      var body = item.querySelector(".faq-body");
      if (!summary || !body) return;

      summary.addEventListener("click", function (event) {
        event.preventDefault();
        if (body.dataset.animating === "true") return;
        body.dataset.animating = "true";

        var finish = function (callback) {
          var onEnd = function (endEvent) {
            if (endEvent.propertyName !== "height") return;
            body.removeEventListener("transitionend", onEnd);
            body.dataset.animating = "false";
            callback();
          };
          body.addEventListener("transitionend", onEnd);
        };

        if (item.open) {
          body.style.height = body.scrollHeight + "px";
          window.requestAnimationFrame(function () {
            body.style.height = "0px";
          });
          finish(function () {
            item.open = false;
            body.style.height = "";
          });
          return;
        }

        item.open = true;
        body.style.height = "0px";
        window.requestAnimationFrame(function () {
          body.style.height = body.scrollHeight + "px";
        });
        finish(function () {
          body.style.height = "auto";
        });
      });
    });

    var revealItems = document.querySelectorAll(".reveal");
    if (revealItems.length && "IntersectionObserver" in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: 0.08, rootMargin: "0px 0px 12% 0px" });
      revealItems.forEach(function (item) {
        revealObserver.observe(item);
      });
    } else {
      revealItems.forEach(function (item) {
        item.classList.add("is-in");
      });
    }
  } else {
    document.querySelectorAll(".reveal").forEach(function (item) {
      item.classList.add("is-in");
    });
  }

  var form = document.getElementById("booking-form");
  var success = document.getElementById("form-success");

  function setFieldError(input, message) {
    var error = document.getElementById(input.id + "-error");
    if (!error) return;
    var invalid = Boolean(message);
    input.setAttribute("aria-invalid", invalid ? "true" : "false");
    if (invalid) input.setAttribute("aria-describedby", error.id);
    else input.removeAttribute("aria-describedby");
    error.textContent = message || "";
    error.hidden = !invalid;
  }

  if (form && success) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = form.querySelector("#meno");
      var email = form.querySelector("#email");
      var message = form.querySelector("#sprava");
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      var firstInvalid = null;

      setFieldError(name, name.value.trim() ? "" : "Napíšte, prosím, svoje meno.");
      setFieldError(email, emailOk ? "" : "Zadajte e-mail v tvare meno@domena.sk.");
      setFieldError(message, message.value.trim() ? "" : "Napíšte krátku správu.");

      [name, email, message].forEach(function (input) {
        if (!firstInvalid && input.getAttribute("aria-invalid") === "true") firstInvalid = input;
      });

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      form.hidden = true;
      success.hidden = false;
      success.focus();
    });
  }
})();
