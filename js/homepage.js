/**
 * Loads HTML fragments under pages/partials/ (nav + one file per menu section),
 * then wires section navigation and business-card tilt.
 * Requires serving pages/homepage.html over HTTP(S) so fetch() can load partials.
 */
(function () {
  "use strict";

  var PARTIAL_BASE = new URL("partials/", window.location.href);

  /**
   * Fetches a single HTML fragment from the partials directory.
   * @param {string} filename
   * @returns {Promise<string>}
   */
  function loadPartial(filename) {
    var url = new URL(filename, PARTIAL_BASE);
    return fetch(url).then(function (res) {
      if (!res.ok) {
        throw new Error("Failed to load " + filename + ": " + res.status);
      }
      return res.text();
    });
  }

  /**
   * Injects nav + all sections into mount points (keeps page shell small).
   * @returns {Promise<void>}
   */
  function loadHomepageFragments() {
    var navMount = document.getElementById("site-nav");
    var sectionsMount = document.getElementById("site-sections");
    if (!navMount || !sectionsMount) {
      throw new Error("Mount elements #site-nav or #site-sections are missing.");
    }

    return Promise.all([
      loadPartial("nav.html"),
      loadPartial("section-home.html"),
      loadPartial("section-services.html"),
      loadPartial("section-experience.html"),
      loadPartial("section-funstuff.html"),
      loadPartial("section-github.html"),
      loadPartial("section-projects.html"),
      loadPartial("section-contact.html"),
    ]).then(function (parts) {
      navMount.innerHTML = parts[0];
      sectionsMount.innerHTML =
        parts[1] +
        parts[2] +
        parts[3] +
        parts[4] +
        parts[5] +
        parts[6] +
        parts[7];
      /** Dialog must live under body so it is not hidden with inactive `.section`. */
      var inquiryModal = document.getElementById("project-inquiry-modal");
      if (inquiryModal && inquiryModal.parentNode !== document.body) {
        document.body.appendChild(inquiryModal);
      }
      var homeVideoModal = document.getElementById("home-video-modal");
      if (homeVideoModal && homeVideoModal.parentNode !== document.body) {
        document.body.appendChild(homeVideoModal);
      }
      navMount.removeAttribute("aria-busy");
      sectionsMount.removeAttribute("aria-busy");
    });
  }

  var CONTACT_EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /**
   * Fun section: toggle itch.io games grid when "Game making" is clicked.
   */
  function initFunGamesPanel() {
    var toggle = document.getElementById("fun-games-toggle");
    var panel = document.getElementById("fun-games-panel");
    var hint = document.getElementById("fun-games-hint-text");
    if (!toggle || !panel) {
      return;
    }

    function setOpen(isOpen) {
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      if (isOpen) {
        panel.removeAttribute("hidden");
        toggle.classList.add("fun-hero-tile--games-active");
        if (hint) {
          hint.textContent = "Hide games";
        }
      } else {
        panel.setAttribute("hidden", "");
        toggle.classList.remove("fun-hero-tile--games-active");
        if (hint) {
          hint.textContent = "Show games";
        }
      }
    }

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      setOpen(!open);
      if (!open) {
        window.setTimeout(function () {
          panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 80);
      }
    });
  }

  /**
   * Home intro video lightbox (full-page overlay; modal moved to `document.body`).
   */
  function initHomeVideoModal() {
    var modal = document.getElementById("home-video-modal");
    var openBtn = document.getElementById("home-video-open");
    var video = document.getElementById("home-intro-video");
    if (!modal || !openBtn || !video) {
      return;
    }

    var lastFocus = null;

    function closeModal() {
      modal.setAttribute("hidden", "");
      video.pause();
      video.currentTime = 0;
      if (lastFocus && typeof lastFocus.focus === "function") {
        lastFocus.focus();
      }
    }

    function openModal() {
      lastFocus = document.activeElement;
      modal.removeAttribute("hidden");
      var playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(function () {
          void 0;
        });
      }
      window.setTimeout(function () {
        var closeEl = modal.querySelector(".home-video-modal__close");
        if (closeEl) {
          closeEl.focus();
        }
      }, 80);
    }

    openBtn.addEventListener("click", function () {
      openModal();
    });

    modal.querySelectorAll("[data-home-video-close]").forEach(function (el) {
      el.addEventListener("click", function () {
        closeModal();
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") {
        return;
      }
      if (modal.hasAttribute("hidden")) {
        return;
      }
      closeModal();
      e.preventDefault();
    });

    /** Golden pulsing play cue on avatar for 4s so video affordance is obvious. */
    openBtn.classList.add("home-avatar-intro-cue");
    window.setTimeout(function () {
      openBtn.classList.remove("home-avatar-intro-cue");
    }, 4000);
  }

  /**
   * Validates contact form: trimmed name length, email shape, message ≥ 20 chars.
   * Uses setCustomValidity + reportValidity; highlights fields with CSS class.
   */
  function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) {
      return;
    }

    var nameEl = document.getElementById("contact-name");
    var emailEl = document.getElementById("contact-email");
    var msgEl = document.getElementById("contact-message");
    var formError = document.getElementById("contact-form-error");

    function setFieldInvalid(el, invalid) {
      if (!el) {
        return;
      }
      if (invalid) {
        el.classList.add("contact-input--invalid");
        el.setAttribute("aria-invalid", "true");
      } else {
        el.classList.remove("contact-input--invalid");
        el.setAttribute("aria-invalid", "false");
      }
    }

    function validateName() {
      if (!nameEl) {
        return false;
      }
      nameEl.setCustomValidity("");
      var t = nameEl.value.trim();
      if (t.length < 2) {
        nameEl.setCustomValidity(
          "Please enter at least 2 characters for your name."
        );
        return false;
      }
      if (t.length > 120) {
        nameEl.setCustomValidity("Name cannot exceed 120 characters.");
        return false;
      }
      return true;
    }

    function validateEmail() {
      if (!emailEl) {
        return false;
      }
      emailEl.setCustomValidity("");
      var v = emailEl.value.trim();
      if (!v) {
        emailEl.setCustomValidity("Please enter your email address.");
        return false;
      }
      if (!CONTACT_EMAIL_RE.test(v)) {
        emailEl.setCustomValidity("Please enter a valid email address.");
        return false;
      }
      if (v.length > 254) {
        emailEl.setCustomValidity("Email is too long.");
        return false;
      }
      return true;
    }

    function validateMessage() {
      if (!msgEl) {
        return false;
      }
      msgEl.setCustomValidity("");
      var t = msgEl.value.trim();
      if (t.length < 20) {
        msgEl.setCustomValidity("Message must be at least 20 characters.");
        return false;
      }
      if (t.length > 5000) {
        msgEl.setCustomValidity("Message cannot exceed 5,000 characters.");
        return false;
      }
      return true;
    }

    function syncFieldVisualState() {
      setFieldInvalid(nameEl, nameEl && !nameEl.validity.valid);
      setFieldInvalid(emailEl, emailEl && !emailEl.validity.valid);
      setFieldInvalid(msgEl, msgEl && !msgEl.validity.valid);
    }

    [nameEl, emailEl, msgEl].forEach(function (el) {
      if (!el) {
        return;
      }
      el.addEventListener("input", function () {
        el.setCustomValidity("");
        setFieldInvalid(el, false);
        if (formError) {
          formError.classList.add("hidden");
          formError.textContent = "";
        }
      });
      el.addEventListener("blur", function () {
        if (el === nameEl) {
          validateName();
        }
        if (el === emailEl) {
          validateEmail();
        }
        if (el === msgEl) {
          validateMessage();
        }
        syncFieldVisualState();
      });
    });

    form.addEventListener("submit", function (e) {
      validateName();
      validateEmail();
      validateMessage();
      syncFieldVisualState();

      if (formError) {
        formError.classList.add("hidden");
        formError.textContent = "";
      }

      if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
        if (formError) {
          formError.textContent =
            "Please correct the highlighted fields before sending.";
          formError.classList.remove("hidden");
        }
        return;
      }

      if (nameEl) {
        nameEl.value = nameEl.value.trim();
      }
      if (emailEl) {
        emailEl.value = emailEl.value.trim();
      }
      if (msgEl) {
        msgEl.value = msgEl.value.trim();
      }
    });
  }

  /**
   * Portfolio inquiry modal + Formspree (same endpoint as contact).
   * Prepends project name and intent to `message` on successful validation.
   */
  function initProjectInquiryModal() {
    var modal = document.getElementById("project-inquiry-modal");
    var form = document.getElementById("project-inquiry-form");
    if (!modal || !form) {
      return;
    }

    var titleEl = document.getElementById("project-inquiry-title");
    var contextEl = document.getElementById("project-inquiry-context");
    var subjectEl = document.getElementById("project-inquiry-subject");
    var submitLabelEl = document.getElementById("project-inquiry-submit-label");
    var nameEl = document.getElementById("project-inquiry-name");
    var emailEl = document.getElementById("project-inquiry-email");
    var msgEl = document.getElementById("project-inquiry-message");
    var formError = document.getElementById("project-inquiry-form-error");

    var openButtons = document.querySelectorAll(".project-inquiry-open");
    var lastFocusEl = null;

    var state = {
      projectName: "",
      demoUrl: "",
      inquiryType: "question",
    };

    function setFieldInvalid(el, invalid) {
      if (!el) {
        return;
      }
      if (invalid) {
        el.classList.add("contact-input--invalid");
        el.setAttribute("aria-invalid", "true");
      } else {
        el.classList.remove("contact-input--invalid");
        el.setAttribute("aria-invalid", "false");
      }
    }

    function validateName() {
      if (!nameEl) {
        return false;
      }
      nameEl.setCustomValidity("");
      var t = nameEl.value.trim();
      if (t.length < 2) {
        nameEl.setCustomValidity(
          "Please enter at least 2 characters for your name."
        );
        return false;
      }
      if (t.length > 120) {
        nameEl.setCustomValidity("Name cannot exceed 120 characters.");
        return false;
      }
      return true;
    }

    function validateEmail() {
      if (!emailEl) {
        return false;
      }
      emailEl.setCustomValidity("");
      var v = emailEl.value.trim();
      if (!v) {
        emailEl.setCustomValidity("Please enter your email address.");
        return false;
      }
      if (!CONTACT_EMAIL_RE.test(v)) {
        emailEl.setCustomValidity("Please enter a valid email address.");
        return false;
      }
      if (v.length > 254) {
        emailEl.setCustomValidity("Email is too long.");
        return false;
      }
      return true;
    }

    function validateMessage() {
      if (!msgEl) {
        return false;
      }
      msgEl.setCustomValidity("");
      var t = msgEl.value.trim();
      if (t.length < 20) {
        msgEl.setCustomValidity("Message must be at least 20 characters.");
        return false;
      }
      if (t.length > 4800) {
        msgEl.setCustomValidity(
          "Message cannot exceed 4,800 characters (room reserved for project tag)."
        );
        return false;
      }
      return true;
    }

    function syncFieldVisualState() {
      setFieldInvalid(nameEl, nameEl && !nameEl.validity.valid);
      setFieldInvalid(emailEl, emailEl && !emailEl.validity.valid);
      setFieldInvalid(msgEl, msgEl && !msgEl.validity.valid);
    }

    function escapeHtml(s) {
      return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    function renderContext() {
      if (!contextEl) {
        return;
      }
      var intentLabel =
        state.inquiryType === "quote" ? "Quote request" : "Question";
      var demo = state.demoUrl.trim();
      var demoHost = "";
      try {
        if (demo) {
          demoHost = new URL(demo).hostname;
        }
      } catch (err) {
        void err;
      }
      var demoBlock =
        demo && demoHost
          ? '<p class="project-inquiry-context__meta">Live demo: <a href="' +
            escapeHtml(demo) +
            '" target="_blank" rel="noopener noreferrer">' +
            escapeHtml(demoHost) +
            "</a></p>"
          : "";
      contextEl.innerHTML =
        '<p class="project-inquiry-context__title">' +
        escapeHtml(state.projectName) +
        "</p>" +
        '<p class="project-inquiry-context__meta">' +
        escapeHtml(intentLabel) +
        " · Your message will include this project name so the thread is " +
        "easy to route.</p>" +
        demoBlock;
    }

    function openModal(trigger) {
      if (!trigger || !trigger.dataset) {
        return;
      }
      form.reset();
      state.projectName = trigger.dataset.projectName || "Project";
      state.demoUrl = trigger.dataset.demoUrl || "";
      state.inquiryType =
        trigger.dataset.inquiryType === "quote" ? "quote" : "question";

      if (titleEl) {
        titleEl.textContent =
          state.inquiryType === "quote"
            ? "Request a quote"
            : "Ask a question";
      }
      if (subjectEl) {
        subjectEl.value =
          state.inquiryType === "quote"
            ? "Quote request: " + state.projectName
            : "Question: " + state.projectName;
      }
      if (submitLabelEl) {
        submitLabelEl.textContent =
          state.inquiryType === "quote" ? "Send quote request" : "Send question";
      }

      renderContext();

      if (formError) {
        formError.classList.add("hidden");
        formError.textContent = "";
      }
      [nameEl, emailEl, msgEl].forEach(function (el) {
        if (el) {
          el.setCustomValidity("");
          setFieldInvalid(el, false);
        }
      });

      lastFocusEl = document.activeElement;
      modal.removeAttribute("hidden");
      if (nameEl) {
        window.setTimeout(function () {
          nameEl.focus();
        }, 40);
      }
    }

    function closeModal() {
      modal.setAttribute("hidden", "");
      if (lastFocusEl && typeof lastFocusEl.focus === "function") {
        lastFocusEl.focus();
      }
    }

    openButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        openModal(btn);
      });
    });

    modal.querySelectorAll("[data-close-inquiry]").forEach(function (el) {
      el.addEventListener("click", function () {
        closeModal();
      });
    });

    document.addEventListener("keydown", function (e) {
      if (!modal.hasAttribute("hidden") && e.key === "Escape") {
        closeModal();
      }
    });

    [nameEl, emailEl, msgEl].forEach(function (el) {
      if (!el) {
        return;
      }
      el.addEventListener("input", function () {
        el.setCustomValidity("");
        setFieldInvalid(el, false);
        if (formError) {
          formError.classList.add("hidden");
          formError.textContent = "";
        }
      });
      el.addEventListener("blur", function () {
        if (el === nameEl) {
          validateName();
        }
        if (el === emailEl) {
          validateEmail();
        }
        if (el === msgEl) {
          validateMessage();
        }
        syncFieldVisualState();
      });
    });

    form.addEventListener("submit", function (e) {
      validateName();
      validateEmail();
      validateMessage();
      syncFieldVisualState();

      if (formError) {
        formError.classList.add("hidden");
        formError.textContent = "";
      }

      if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
        if (formError) {
          formError.textContent =
            "Please correct the highlighted fields before sending.";
          formError.classList.remove("hidden");
        }
        return;
      }

      var userMsg = msgEl ? msgEl.value.trim() : "";
      var intentLabel =
        state.inquiryType === "quote" ? "Quote request" : "Question";
      var prefix =
        "[Project: " +
        state.projectName +
        "]\n" +
        "[Intent: " +
        intentLabel +
        "]\n\n";
      if (prefix.length + userMsg.length > 5000) {
        e.preventDefault();
        if (formError) {
          formError.textContent =
            "Message is too long after including the project header. " +
            "Please shorten your text.";
          formError.classList.remove("hidden");
        }
        return;
      }

      if (msgEl) {
        msgEl.value = prefix + userMsg;
      }
      if (nameEl) {
        nameEl.value = nameEl.value.trim();
      }
      if (emailEl) {
        emailEl.value = emailEl.value.trim();
      }
    });
  }

  /** Fiverr profile opened when the review toast is clicked. */
  var FIVERR_PROFILE_URL = "https://www.fiverr.com/ishan498";

  /**
   * Returns an integer in [min, max] inclusive.
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  function randomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Builds two-letter initials from a reviewer display name.
   * @param {string} name
   * @returns {string}
   */
  function fiverrReviewerInitials(name) {
    var trimmed = String(name || "").trim();
    if (!trimmed) {
      return "?";
    }
    var parts = trimmed.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      var firstChar = parts[0].charAt(0);
      var lastChar = parts[parts.length - 1].charAt(0);
      return (firstChar + lastChar).toUpperCase();
    }
    var single = parts[0];
    if (single.length >= 2) {
      return single.slice(0, 2).toUpperCase();
    }
    return single.charAt(0).toUpperCase();
  }

  /**
   * Fetches review copy from JSON, then shows a toast on a timer:
   * first after 15–20s, visible 9s (timer pauses while hovering the toast),
   * then every 50–60s. Click opens Fiverr.
   * @returns {void}
   */
  function initFiverrReviewToasts() {
    var reviewsUrl = new URL("../js/fiverr-reviews.json", window.location.href);
    var hideMs = 9000;
    var hideTransitionMs = 380;

    fetch(reviewsUrl)
      .then(function (res) {
        if (!res.ok) {
          throw new Error("HTTP " + String(res.status));
        }
        return res.json();
      })
      .then(function (data) {
        if (!data || !Array.isArray(data) || data.length === 0) {
          return;
        }

        /** @type {Array<{ name: string, handle: string, text: string, stars: number }>} */
        var reviews = [];
        for (var i = 0; i < data.length; i += 1) {
          var raw = data[i];
          if (!raw || typeof raw !== "object") {
            continue;
          }
          var n = raw.name;
          var t = raw.text;
          var s = raw.stars;
          var h = raw.handle;
          if (typeof n !== "string" || typeof t !== "string") {
            continue;
          }
          if (typeof s !== "number" || s < 1 || s > 5 || s !== Math.floor(s)) {
            continue;
          }
          var handleStr = typeof h === "string" ? h : "";
          reviews.push({
            name: n,
            handle: handleStr,
            text: t,
            stars: s,
          });
        }
        if (reviews.length === 0) {
          return;
        }

        var lastIndex = -1;
        var showTimerId = 0;
        var hideTimerId = 0;
        var exitTimerId = 0;
        /** @type {HTMLElement | null} */
        var currentEl = null;

        function clearTimers() {
          if (showTimerId) {
            window.clearTimeout(showTimerId);
            showTimerId = 0;
          }
          if (hideTimerId) {
            window.clearTimeout(hideTimerId);
            hideTimerId = 0;
          }
          if (exitTimerId) {
            window.clearTimeout(exitTimerId);
            exitTimerId = 0;
          }
        }

        function pickReview() {
          var idx = 0;
          if (reviews.length > 1) {
            do {
              idx = randomIntInclusive(0, reviews.length - 1);
            } while (idx === lastIndex);
          }
          lastIndex = idx;
          return reviews[idx];
        }

        function removeToastEl(el) {
          if (el && el.parentNode) {
            el.parentNode.removeChild(el);
          }
          if (currentEl === el) {
            currentEl = null;
          }
        }

        function scheduleNextShow(delayMs) {
          if (showTimerId) {
            window.clearTimeout(showTimerId);
          }
          showTimerId = window.setTimeout(function () {
            showTimerId = 0;
            showToast();
          }, delayMs);
        }

        /**
         * Runs hide animation, then removes the node and schedules the next toast.
         * @param {HTMLElement} wrap
         * @returns {void}
         */
        function beginDismissSequence(wrap) {
          if (!wrap.parentNode) {
            return;
          }
          wrap.classList.remove("fiverr-review-toast--visible");
          wrap.classList.add("fiverr-review-toast--hiding");
          exitTimerId = window.setTimeout(function () {
            exitTimerId = 0;
            removeToastEl(wrap);
            scheduleNextShow(randomIntInclusive(50000, 60000));
          }, hideTransitionMs);
        }

        /**
         * (Re)starts the auto-hide countdown for the current toast.
         * @param {HTMLElement} wrap
         * @returns {void}
         */
        function scheduleAutoHide(wrap) {
          if (hideTimerId) {
            window.clearTimeout(hideTimerId);
            hideTimerId = 0;
          }
          hideTimerId = window.setTimeout(function () {
            hideTimerId = 0;
            beginDismissSequence(wrap);
          }, hideMs);
        }

        function showToast() {
          clearTimers();
          if (currentEl) {
            removeToastEl(currentEl);
          }

          var r = pickReview();
          var wrap = document.createElement("div");
          wrap.className = "fiverr-review-toast";
          wrap.setAttribute("role", "status");
          wrap.setAttribute("aria-live", "polite");

          var link = document.createElement("a");
          link.className = "fiverr-review-toast__link";
          link.href = FIVERR_PROFILE_URL;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.setAttribute(
            "aria-label",
            "View Ishan's Fiverr profile (opens in a new tab)"
          );

          var avatar = document.createElement("div");
          avatar.className = "fiverr-review-toast__avatar";
          avatar.setAttribute("aria-hidden", "true");
          avatar.textContent = fiverrReviewerInitials(r.name);

          var body = document.createElement("div");
          body.className = "fiverr-review-toast__body";

          var headline = document.createElement("p");
          headline.className = "fiverr-review-toast__headline";
          headline.textContent =
            "Ishan received a " + String(r.stars) + " star review:";

          var who = document.createElement("p");
          who.className = "fiverr-review-toast__who";
          var handleClean = r.handle.replace(/^@+/, "");
          who.textContent =
            r.name.trim() + (handleClean ? " @" + handleClean : "");

          var quote = document.createElement("p");
          quote.className = "fiverr-review-toast__quote";
          quote.textContent = "\"" + r.text.trim() + "\"";

          body.appendChild(headline);
          body.appendChild(who);
          body.appendChild(quote);
          link.appendChild(avatar);
          link.appendChild(body);
          wrap.appendChild(link);
          document.body.appendChild(wrap);
          currentEl = wrap;

          window.requestAnimationFrame(function () {
            wrap.classList.add("fiverr-review-toast--visible");
          });

          link.addEventListener("mouseenter", function onToastEnter() {
            if (hideTimerId) {
              window.clearTimeout(hideTimerId);
              hideTimerId = 0;
            }
          });

          link.addEventListener("mouseleave", function onToastLeave() {
            scheduleAutoHide(wrap);
          });

          scheduleAutoHide(wrap);
        }

        scheduleNextShow(randomIntInclusive(15000, 20000));
      })
      .catch(function () {
        /* Silent: no toast if JSON missing or invalid (e.g. file:// quirks). */
      });
  }

  /**
   * Binds all interactive behavior after fragments are in the DOM.
   */
  function initHomepage() {
    var sections = document.querySelectorAll(".section");
    var navLinks = document.querySelectorAll("a[data-section]");
    var exploreButton = document.getElementById("explore-button");
    var logoLink = document.getElementById("logo-link");

    var yearEl = document.getElementById("copyright-year");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }

    function navigateTo(sectionId) {
      if (!sectionId || typeof sectionId !== "string") {
        return;
      }

      sections.forEach(function (section) {
        section.classList.remove("active");
      });

      var targetSection = document.getElementById(sectionId);
      if (targetSection) {
        window.setTimeout(function () {
          targetSection.classList.add("active");
        }, 100);

        navLinks.forEach(function (link) {
          link.classList.remove("nav-active");
          link.removeAttribute("aria-current");
          if (link.getAttribute("data-section") === sectionId) {
            link.classList.add("nav-active");
            link.setAttribute("aria-current", "page");
          }
        });
      }
    }

    navLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var sectionId = link.getAttribute("data-section");
        navigateTo(sectionId);
      });
    });

    if (exploreButton) {
      exploreButton.addEventListener("click", function () {
        navigateTo("services");
      });
    }

    if (logoLink) {
      logoLink.addEventListener("click", function (e) {
        e.preventDefault();
        navigateTo("home");
      });
    }

    /**
     * Subtle tilt on whichever section is active and contains a business card
     * (home + contact).
     */
    document.addEventListener("mousemove", function (e) {
      var active = document.querySelector(".section.active");
      if (!active) {
        return;
      }
      var card = active.querySelector(".business-card");
      if (!card) {
        return;
      }
      var xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      var yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      card.style.transform =
        "perspective(1000px) rotateY(" +
        xAxis +
        "deg) rotateX(" +
        yAxis +
        "deg)";
    });

    document.addEventListener("mouseleave", function () {
      var active = document.querySelector(".section.active");
      if (!active) {
        return;
      }
      var card = active.querySelector(".business-card");
      if (card) {
        card.style.transform =
          "perspective(1000px) rotateY(0deg) rotateX(0deg)";
      }
    });

    initContactForm();
    initProjectInquiryModal();
    initHomeVideoModal();
    initFunGamesPanel();
    initFiverrReviewToasts();

    if (typeof window.tailwind !== "undefined") {
      var refresh = window.tailwind.refresh;
      if (typeof refresh === "function") {
        try {
          refresh.call(window.tailwind);
        } catch (e) {
          void e;
        }
      }
    }
  }

  function showLoadFailure(err) {
    console.error(err);
    var sectionsMount = document.getElementById("site-sections");
    if (sectionsMount) {
      sectionsMount.innerHTML =
        "<div class=\"p-6 text-center text-gray-300 max-w-md mx-auto mt-10\">" +
        "<p class=\"mb-2\">Content could not be loaded.</p>" +
        "<p class=\"text-sm text-gray-500\">Open this page through a local web server " +
        "(for example <code class=\"text-blue-400\">python -m http.server</code> from the project root) " +
        "so partial HTML files can load.</p>" +
        "</div>";
      sectionsMount.removeAttribute("aria-busy");
    }
    var navMount = document.getElementById("site-nav");
    if (navMount) {
      navMount.removeAttribute("aria-busy");
    }
  }

  loadHomepageFragments().then(initHomepage).catch(showLoadFailure);
})();
