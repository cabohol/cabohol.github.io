(function () {
  "use strict";

  (function () {
    const slidesContainer = document.getElementById("certSlides");
    const dotsContainer = document.getElementById("certDots");
    const prevBtn = document.getElementById("certPrev");
    const nextBtn = document.getElementById("certNext");
    if (!slidesContainer || !dotsContainer || !prevBtn || !nextBtn) {
      return;
    }
    const filterBtns = document.querySelectorAll(".cert-filter-btn");

    // Store ALL original slides once on load
    const allSlides = Array.from(
      slidesContainer.querySelectorAll(".cert-slide"),
    );
    let visible = [...allSlides];
    let current = 0;

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;
        visible =
          filter === "all"
            ? [...allSlides]
            : allSlides.filter((s) => s.dataset.category === filter);

        rebuildSlider();
      });
    });

    function rebuildSlider() {
      // Clear and re-append only visible slides
      while (slidesContainer.firstChild)
        slidesContainer.removeChild(slidesContainer.firstChild);
      visible.forEach((s) => slidesContainer.appendChild(s));
      current = 0;
      slidesContainer.style.transition = "none";
      slidesContainer.style.transform = "translateX(0)";
      buildDots();
      updateNav();
    }

    function buildDots() {
      dotsContainer.innerHTML = "";
      visible.forEach((_, i) => {
        const d = document.createElement("button");
        d.className = "cert-dot" + (i === 0 ? " active" : "");
        d.setAttribute("aria-label", "Certificate " + (i + 1));
        d.addEventListener("click", () => goTo(i));
        dotsContainer.appendChild(d);
      });
    }

    function updateDots() {
      dotsContainer.querySelectorAll(".cert-dot").forEach((d, i) => {
        d.classList.toggle("active", i === current);
      });
    }

    function updateNav() {
      prevBtn.disabled = current === 0;
      nextBtn.disabled = current >= visible.length - 1;
    }

    function goTo(index) {
      current = Math.max(0, Math.min(index, visible.length - 1));
      slidesContainer.style.transition =
        "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)";
      slidesContainer.style.transform = `translateX(-${current * 100}%)`;
      updateDots();
      updateNav();
    }

    prevBtn.addEventListener("click", () => goTo(current - 1));
    nextBtn.addEventListener("click", () => goTo(current + 1));

    // Swipe support
    let touchStartX = 0;
    slidesContainer.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true },
    );
    slidesContainer.addEventListener(
      "touchend",
      (e) => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 40)
          diff > 0 ? goTo(current + 1) : goTo(current - 1);
      },
      { passive: true },
    );

    // Init
    rebuildSlider();
  })();

  const projects = [
    {
      title: "RenTech",
      tag: "Mobile Application",
      desc: "RenTech is designed to help students in need of a laptop by offering a convenient platform to rent laptops for projects or coding on an hourly basis. With student-friendly prices, making it an affordable and flexible solution to address academic requirements.",
      link: "https://drive.google.com/file/d/10WYiAwfmJM2Cf0oU7Z33sZpr8h7FcN_F/view?usp=sharing",
      linkLabel: "View Demo",
      github: "https://github.com/cabohol/rentechv2",
      img: "assets/img/mobapp.png",
      color: "#028082",
    },
    {
      title: "LTMS Portal",
      tag: "Website Redesign",
      desc: "I redesigned the LTMS website layout using React.js and JavaScript to enhance visual clarity and streamline navigation through the application of core UI/UX principles. Optimized user flow with HTML5 and CSS3 for a more intuitive experience.",
      link: "https://ltms-plum.vercel.app/",
      linkLabel: "Live Site",
      github: "https://github.com/cabohol/ltms",
      img: "assets/img/ltmss.png",
      color: "#1a2d4a",
    },
    {
      title: "SendEase",
      tag: "Web Application",
      desc: "I redesigned the SendEase layout using React.js and JavaScript to enhance visual clarity and streamline navigation through the application of core UI/UX principles. Optimized user flow with HTML5 and CSS3 for improved usability.",
      link: "https://drive.google.com/file/d/1NbKwLv7ByBA_eAZRQxPsOiTYw5Nwmidq/view?usp=sharing",
      linkLabel: "View Demo",
      github: "https://github.com/markjamisola/IT-120-Project",
      img: "assets/img/sendeasee.png",
      color: "#4a1a1a",
    },
    {
      title: "LaptopLynx",
      tag: "Web Application",
      desc: "LaptopLynx is a platform offering a convenient way to rent laptops for projects or coding on an hourly basis. With student-friendly prices, it provides an affordable and flexible solution to address academic requirements and ensure access to essential technology.",
      link: "https://laptop-lynx.vercel.app/",
      linkLabel: "Live Site",
      github: "https://github.com/cabohol/LaptopLynx",
      img: "assets/img/laptoplynx.png",
      color: "#001a19",
    },
    {
      title: "Recipe Finder",
      tag: "Web App",
      desc: "Recipe Finder is a web application designed to help users discover and explore a wide variety of recipes. It provides an intuitive interface for searching recipes based on ingredients, dietary preferences, and cooking time.",
      link: "https://drive.google.com/file/d/1RpLGR1u0jLsERpJL2HC9EFNbZ1Vk8m_V/view",
      linkLabel: "View Demo",
      github: "https://github.com/prinsnnyo/RecipeFinder",
      img: "assets/img/recipef.png",
      color: "#381045",
    },
    {
      title: "Rent a Computer",
      tag: "Website Redesign",
      desc: "Rent a Computer is a website redesigned by our team to improve usability, navigation, and overall user experience, creating a more intuitive and seamless rental platform using React.js, JavaScript, HTML5, and CSS3.",
      link: "https://rentacomputer.vercel.app/",
      linkLabel: "Live Site",
      github: "https://github.com/prinsnnyo/RentaComputer",
      img: "assets/img/rentacomp.png",
      color: "#10384a",
    },
    {
      title: "Product Scanner",
      tag: "Mobile Application",
      desc: "ProductScan is an AI-powered mobile application that enables users to instantly identify jewelry items through real-time image recognition using YOLOv8, ONNX, and TensorFlow Lite. Guides users to nearby stores via Google Maps integration.",
      link: "https://drive.google.com/drive/folders/1adRBx9uLeAQdr2r4TinNGfrChoI_HO60?usp=sharing",
      linkLabel: "View Demo",
      github: "https://github.com/cabohol/ProductScan",
      img: "assets/img/productscan.png",
      color: "#1a504c",
    },
    {
      title: "DiaMeal",
      tag: "Mobile Application",
      desc: "DiaMeal is an intelligent mobile application for diabetic meal planning that leverages Meta's Llama 3.3 70B model to deliver personalized meal recommendations and nutrition guidance tailored to users' dietary restrictions and health needs.",
      link: "https://drive.google.com/drive/folders/1dRNygGNetbfopgW7vr4VDa13vGj7R5au?usp=sharing",
      linkLabel: "View Demo",
      github: "https://github.com/cabohol/DiaMeal",
      img: "assets/img/diameal.png",
      color: "#1a401b",
    },
    {
      title: "UHC (Health Card System)",
      tag: "Internship – Web Application",
      desc: "UHC is a web application designed to manage and streamline the process of issuing and managing health cards for patients. It provides a centralized platform for healthcare providers to create, update, and track health card information.",
      link: "",
      linkLabel: "",
      github: "https://github.com/jsoncid/uhc",
      img: "assets/img/uhc.png",
      color: "#403d1a",
    },
    {
      title: "Tracking & Tagging System",
      tag: "Internship – Web Application",
      desc: "A web application designed to manage and streamline the tracking and tagging of medical equipment and supplies, providing a centralized platform for healthcare facilities to create, update, and monitor inventory in real time.",
      link: "",
      linkLabel: "",
      github: "https://github.com/Catalyst-Nexus/ihomis_forms",
      img: "assets/img/trackingntagging.png",
      color: "#1a403d",
    },
  ];

  let current = 0;
  const track = document.getElementById("portTrack");
  const dotsContainer = document.getElementById("portDots");

  // ── Lightbox ──────────────────────────────────────────────
  const lightbox = document.createElement("div");
  lightbox.className = "port-lightbox";
  lightbox.innerHTML =
    '<div class="port-lightbox-inner">' +
    '<button class="port-lightbox-close" aria-label="Close image">&times;</button>' +
    '<img src="" alt="Project screenshot" />' +
    "</div>";
  document.body.appendChild(lightbox);

  const lbImg = lightbox.querySelector("img");
  const lbClose = lightbox.querySelector(".port-lightbox-close");

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || "Project screenshot";
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  lbClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  // ── Build cards ───────────────────────────────────────────
  function buildCards() {
    track.innerHTML = "";
    dotsContainer.innerHTML = "";

    projects.forEach(function (p, i) {
      var card = document.createElement("div");
      card.className = "port-card" + (i === current ? " active" : "");
      card.style.setProperty("--card-color", p.color);

      // GitHub button (always shown if github link exists)
      var githubBtn = "";
      if (p.github) {
        githubBtn =
          '<a href="' +
          p.github +
          '" class="port-card-link" target="_blank" rel="noopener">' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>' +
          "GitHub" +
          "</a>";
      }

      // Primary link button (only shown if link exists)
      var primaryBtn = "";
      if (p.link && p.linkLabel) {
        primaryBtn =
          '<a href="' +
          p.link +
          '" class="port-card-link" target="_blank" rel="noopener">' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>' +
          p.linkLabel +
          "</a>";
      }

      card.innerHTML =
        '<div class="port-card-image-wrap">' +
        '<img src="' +
        p.img +
        '" alt="' +
        p.title +
        ' screenshot" loading="lazy" />' +
        '<span class="port-card-zoom-hint" aria-hidden="true">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15zM10.5 7.5v6m-3-3h6"/></svg>' +
        "</span>" +
        "</div>" +
        '<div class="port-card-body">' +
        '<p class="port-card-tag">' +
        p.tag +
        "</p>" +
        '<h3 class="port-card-title">' +
        p.title +
        "</h3>" +
        '<p class="port-card-desc">' +
        p.desc +
        "</p>" +
        '<div class="port-card-actions">' +
        githubBtn +
        primaryBtn +
        "</div>" +
        "</div>";

      card.addEventListener("click", function () {
        current = i;
        update();
      });

      track.appendChild(card);

      // Dot
      var dot = document.createElement("button");
      dot.className = "port-dot" + (i === current ? " active" : "");
      dot.setAttribute("aria-label", "Go to " + p.title);
      dot.addEventListener("click", function () {
        current = i;
        update();
      });
      dotsContainer.appendChild(dot);
    });

    // Clicking the image on an active card opens lightbox
    track.querySelectorAll(".port-card-image-wrap").forEach(function (wrap, i) {
      wrap.addEventListener("click", function (e) {
        var card = wrap.closest(".port-card");
        if (card.classList.contains("active")) {
          e.stopPropagation();
          openLightbox(projects[i].img, projects[i].title);
        }
      });
    });
  }

  // ── Update slider position ─────────────────────────────────
  function update() {
    var cards = track.querySelectorAll(".port-card");
    var dots = dotsContainer.querySelectorAll(".port-dot");

    cards.forEach(function (card, i) {
      card.classList.toggle("active", i === current);
      dots[i].className = "port-dot" + (i === current ? " active" : "");
    });

    var cardEl = track.children[0];
    if (!cardEl) return;
    var cardW = cardEl.offsetWidth + 20;
    var wrapW = track.parentElement.offsetWidth;
    var offset = current * cardW - (wrapW / 2 - cardEl.offsetWidth / 2);
    track.style.transform = "translateX(" + -Math.max(0, offset) + "px)";
  }

  // ── Touch / swipe ─────────────────────────────────────────
  var touchStartX = 0;
  track.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true },
  );

  track.addEventListener(
    "touchend",
    function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        current =
          diff > 0
            ? (current + 1) % projects.length
            : (current - 1 + projects.length) % projects.length;
        update();
      }
    },
    { passive: true },
  );

  // ── Nav buttons (if present) ──────────────────────────────
  var prevBtn = document.getElementById("portPrev");
  var nextBtn = document.getElementById("portNext");
  if (prevBtn)
    prevBtn.addEventListener("click", function () {
      current = (current - 1 + projects.length) % projects.length;
      update();
    });
  if (nextBtn)
    nextBtn.addEventListener("click", function () {
      current = (current + 1) % projects.length;
      update();
    });

  // ── Init ─────────────────────────────────────────────────
  buildCards();
  setTimeout(update, 80);
  window.addEventListener("resize", update);
})();

/**
 * Apply .scrolled class to the body as the page is scrolled down
 */
function toggleScrolled() {
  const selectBody = document.querySelector("body");
  const selectHeader = document.querySelector("#header");
  if (!selectBody || !selectHeader) return;
  if (
    !selectHeader.classList.contains("scroll-up-sticky") &&
    !selectHeader.classList.contains("sticky-top") &&
    !selectHeader.classList.contains("fixed-top")
  )
    return;
  window.scrollY > 100
    ? selectBody.classList.add("scrolled")
    : selectBody.classList.remove("scrolled");
}

document.addEventListener("scroll", toggleScrolled);
window.addEventListener("load", toggleScrolled);

/**
 * Mobile nav toggle
 */
const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

function mobileNavToogle() {
  document.querySelector("body").classList.toggle("mobile-nav-active");
  if (!mobileNavToggleBtn) return;
  mobileNavToggleBtn.classList.toggle("bi-list");
  mobileNavToggleBtn.classList.toggle("bi-x");
}
if (mobileNavToggleBtn) {
  mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
}

/**
 * Hide mobile nav on same-page/hash links
 */

document.querySelectorAll("#navmenu a").forEach((navmenu) => {
  navmenu.addEventListener("click", () => {
    if (document.querySelector(".mobile-nav-active")) {
      mobileNavToogle();
    }
  });
});

/**
 * Toggle mobile nav dropdowns
 */
document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
  navmenu.addEventListener("click", function (e) {
    e.preventDefault();
    this.parentNode.classList.toggle("active");
    this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
    e.stopImmediatePropagation();
  });
});

let navmenulinks = document.querySelectorAll(".navmenu a");

function navmenuScrollspy() {
  navmenulinks.forEach((navmenulink) => {
    if (!navmenulink.hash) return;
    let section = document.querySelector(navmenulink.hash);
    if (!section) return;
    let position = window.scrollY + 200;
    if (
      position >= section.offsetTop &&
      position <= section.offsetTop + section.offsetHeight
    ) {
      document
        .querySelectorAll(".navmenu a.active")
        .forEach((link) => link.classList.remove("active"));
      navmenulink.classList.add("active");
    } else {
      navmenulink.classList.remove("active");
    }
  });
}
window.addEventListener("load", navmenuScrollspy);
document.addEventListener("scroll", navmenuScrollspy);

/**
 * Preloader
 */

/**
 * Preloader
 */
const preloader = document.querySelector("#preloader");
if (preloader) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("loaded");
    }, 1000);
    setTimeout(() => {
      preloader.remove();
    }, 2000);
  });
}

/**
 * Scroll top button
 */
let scrollTop = document.querySelector(".scroll-top");

function toggleScrollTop() {
  if (scrollTop) {
    window.scrollY > 100
      ? scrollTop.classList.add("active")
      : scrollTop.classList.remove("active");
  }
}
if (scrollTop) {
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

window.addEventListener("load", toggleScrollTop);
document.addEventListener("scroll", toggleScrollTop);

/**
 * Animation on scroll function and init
 */
function aosInit() {
  AOS.init({
    duration: 600,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });
}
window.addEventListener("load", aosInit);

/**
 * Init typed.js
 */
const selectTyped = document.querySelector(".typed");
if (selectTyped) {
  let typed_strings = selectTyped.getAttribute("data-typed-items");
  typed_strings = typed_strings.split(",");
  new Typed(".typed", {
    strings: typed_strings,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000,
  });
}

/**
 * Initiate Pure Counter
 */
new PureCounter();

/**
 * Animate the skills items on reveal
 */
let skillsAnimation = document.querySelectorAll(".skills-animation");
skillsAnimation.forEach((item) => {
  new Waypoint({
    element: item,
    offset: "80%",
    handler: function (direction) {
      let progress = item.querySelectorAll(".progress .progress-bar");
      progress.forEach((el) => {
        el.style.width = el.getAttribute("aria-valuenow") + "%";
      });
    },
  });
});

/**
 * Init swiper sliders
 */
function initSwiper() {
  document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
    let config = JSON.parse(
      swiperElement.querySelector(".swiper-config").innerHTML.trim(),
    );

    if (swiperElement.classList.contains("swiper-tab")) {
      initSwiperWithCustomPagination(swiperElement, config);
    } else {
      new Swiper(swiperElement, config);
    }
  });
}

window.addEventListener("load", initSwiper);

/**
 * Initiate glightbox
 */
const glightbox = GLightbox({
  selector: ".glightbox",
});

/**
 * Init isotope layout and filters
 */
document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
  let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
  let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
  let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

  let initIsotope;
  imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
    initIsotope = new Isotope(isotopeItem.querySelector(".isotope-container"), {
      itemSelector: ".isotope-item",
      layoutMode: layout,
      filter: filter,
      sortBy: sort,
    });
  });

  isotopeItem
    .querySelectorAll(".isotope-filters li")
    .forEach(function (filters) {
      filters.addEventListener(
        "click",
        function () {
          isotopeItem
            .querySelector(".isotope-filters .filter-active")
            .classList.remove("filter-active");
          this.classList.add("filter-active");
          initIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          if (typeof aosInit === "function") {
            aosInit();
          }
        },
        false,
      );
    });
});

const multipleTyped = document.querySelector(".multiple");
if (multipleTyped) {
  const typed = new Typed(".multiple", {
    strings: ["Student", "Full-Stack Developer", "Mobile Developer"],
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 1000,
    loop: true,
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // For the first span with the "I am a" section

  // For the nickname span
  var typedNicknameElement = document.querySelector(".nickname .typed");
  if (typedNicknameElement) {
    var typedNickname = new Typed(".nickname .typed", {
      strings: typedNicknameElement.getAttribute("data-typed-items").split(","),
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      loop: true,
    });
  }
});

if (
  typeof particlesJS !== "undefined" &&
  document.getElementById("particles-js")
) {
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 1000,
        },
      },
      color: {
        value: ["#18d26e", "#18d26e", "#18d26e", "#18d26e"],
      },

      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#18d26e",
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: "img/github.svg",
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 0.6,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 2,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 130,
        color: "#18d26e",
        opacity: 0.4,
        width: 1,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: false,
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  });
}
