(function () {
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(function () {
    if (window.lucide) window.lucide.createIcons();

    var header = document.getElementById("siteHeader");
    var topbar = document.querySelector(".topbar");
    var backTop = document.getElementById("backTop");

    function onScroll() {
      var scrolled = window.scrollY > 24;
      if (header) header.classList.toggle("scrolled", scrolled);
      if (topbar) topbar.classList.toggle("is-hidden", scrolled);
      if (backTop) backTop.classList.toggle("visible", window.scrollY > 650);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    var menuToggle = document.getElementById("menuToggle");
    var mobileNav = document.getElementById("mobileNav");
    function closeMenu() {
      if (!mobileNav || !menuToggle) return;
      mobileNav.classList.remove("open");
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Otvoriť menu");
      menuToggle.innerHTML = '<i data-lucide="menu"></i>';
      if (window.lucide) window.lucide.createIcons();
    }
    if (menuToggle && mobileNav) {
      menuToggle.addEventListener("click", function () {
        var open = !mobileNav.classList.contains("open");
        mobileNav.classList.toggle("open", open);
        document.body.classList.toggle("menu-open", open);
        menuToggle.setAttribute("aria-expanded", String(open));
        menuToggle.setAttribute("aria-label", open ? "Zatvoriť menu" : "Otvoriť menu");
        menuToggle.innerHTML = open ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
        if (window.lucide) window.lucide.createIcons();
      });
      mobileNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMenu);
      });
    }

    document.querySelectorAll(".nav-dropdown-toggle").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var wrap = btn.closest(".nav-dropdown");
        var open = !wrap.classList.contains("open");
        document.querySelectorAll(".nav-dropdown.open").forEach(function (el) {
          if (el !== wrap) {
            el.classList.remove("open");
            var t = el.querySelector(".nav-dropdown-toggle");
            if (t) t.setAttribute("aria-expanded", "false");
          }
        });
        wrap.classList.toggle("open", open);
        btn.setAttribute("aria-expanded", String(open));
      });
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".nav-dropdown")) {
        document.querySelectorAll(".nav-dropdown.open").forEach(function (el) {
          el.classList.remove("open");
          var t = el.querySelector(".nav-dropdown-toggle");
          if (t) t.setAttribute("aria-expanded", "false");
        });
      }
    });

    document.querySelectorAll(".mobile-subtoggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".mobile-sub");
        var open = !item.classList.contains("open");
        item.classList.toggle("open", open);
        btn.setAttribute("aria-expanded", String(open));
      });
    });

    document.querySelectorAll(".faq-question").forEach(function (button) {
      button.addEventListener("click", function () {
        var item = button.closest(".faq-item");
        var willOpen = !item.classList.contains("open");
        document.querySelectorAll(".faq-item").forEach(function (other) {
          other.classList.remove("open");
          var q = other.querySelector(".faq-question");
          if (q) q.setAttribute("aria-expanded", "false");
        });
        item.classList.toggle("open", willOpen);
        button.setAttribute("aria-expanded", String(willOpen));
      });
    });

    var revealItems = document.querySelectorAll("[data-reveal]");
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealItems.forEach(function (item) { observer.observe(item); });
    } else {
      revealItems.forEach(function (item) { item.classList.add("revealed"); });
    }

    document.querySelectorAll("form[data-form-stub]").forEach(function (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var status = form.querySelector(".form-status");
        if (status) status.classList.add("show");
      });
    });

    if (backTop) {
      backTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    initGallery();
  });

  function initGallery() {
    var grid = document.querySelector("[data-gallery-grid]");
    if (!grid || !window.KP || !KP.gallery) return;

    var filters = document.querySelectorAll("[data-gallery-filter]");
    var items = KP.gallery.slice();
    var branchOnly = grid.getAttribute("data-branch");
    if (branchOnly) {
      items = items.filter(function (i) { return i.branch === branchOnly; });
    }

    function render(list) {
      grid.innerHTML = list.map(function (item, idx) {
        var badge = item.branch === "petrzalka" ? "Petržalka" : "Ružinov";
        return (
          '<button type="button" class="gallery-item" data-lightbox-index="' + idx + '" aria-label="' + item.alt + '">' +
          '<span class="gallery-badge">' + badge + "</span>" +
          '<img src="' + item.src + '" alt="' + item.alt + '" loading="lazy">' +
          "</button>"
        );
      }).join("");
      if (window.lucide) window.lucide.createIcons();
      bindLightbox(list);
    }

    var currentFilter = "all";
    function applyFilter(key) {
      currentFilter = key;
      filters.forEach(function (btn) {
        btn.classList.toggle("is-active", btn.getAttribute("data-gallery-filter") === key);
      });
      var filtered = items.filter(function (item) {
        if (key === "all") return true;
        if (key === "petrzalka" || key === "ruzinov") return item.branch === key;
        return item.type === key;
      });
      render(filtered);
    }

    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyFilter(btn.getAttribute("data-gallery-filter"));
      });
    });

    applyFilter("all");
  }

  function bindLightbox(list) {
    var existing = document.getElementById("kpLightbox");
    if (!existing) {
      var lb = document.createElement("div");
      lb.id = "kpLightbox";
      lb.className = "lightbox";
      lb.hidden = true;
      lb.innerHTML =
        '<div class="lightbox-backdrop" data-lightbox-close></div>' +
        '<div class="lightbox-dialog" role="dialog" aria-modal="true" aria-label="Fotografia">' +
        '<button type="button" class="lightbox-close" data-lightbox-close aria-label="Zavrieť"><i data-lucide="x"></i></button>' +
        '<button type="button" class="lightbox-nav prev" data-lightbox-prev aria-label="Predchádzajúca"><i data-lucide="chevron-left"></i></button>' +
        '<img class="lightbox-img" alt="">' +
        '<button type="button" class="lightbox-nav next" data-lightbox-next aria-label="Ďalšia"><i data-lucide="chevron-right"></i></button>' +
        "</div>";
      document.body.appendChild(lb);
      if (window.lucide) window.lucide.createIcons();
    }

    var lightbox = document.getElementById("kpLightbox");
    var img = lightbox.querySelector(".lightbox-img");
    var index = 0;

    function open(i) {
      index = i;
      img.src = list[index].src;
      img.alt = list[index].alt;
      lightbox.hidden = false;
      document.body.classList.add("menu-open");
      if (window.lucide) window.lucide.createIcons();
    }
    function close() {
      lightbox.hidden = true;
      document.body.classList.remove("menu-open");
      img.removeAttribute("src");
    }
    function next(dir) {
      index = (index + dir + list.length) % list.length;
      img.src = list[index].src;
      img.alt = list[index].alt;
    }

    document.querySelectorAll("[data-lightbox-index]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        open(Number(btn.getAttribute("data-lightbox-index")));
      });
    });

    lightbox.querySelectorAll("[data-lightbox-close]").forEach(function (el) {
      el.onclick = close;
    });
    var prevBtn = lightbox.querySelector("[data-lightbox-prev]");
    var nextBtn = lightbox.querySelector("[data-lightbox-next]");
    if (prevBtn) prevBtn.onclick = function () { next(-1); };
    if (nextBtn) nextBtn.onclick = function () { next(1); };

    document.addEventListener("keydown", function (e) {
      if (lightbox.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") next(-1);
      if (e.key === "ArrowRight") next(1);
    });
  }
})();
