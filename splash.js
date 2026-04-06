/**
 * Minimal splash: connecting message, rotating technical terms, ~5s then homepage.
 * Runs after DOMContentLoaded so #splash-root / #splash-word exist even if a host
 * or CDN serves this script early/async (otherwise getElementById is null and we
 * would redirect immediately).
 */
(function () {
  "use strict";

  var TOTAL_MS = 5000;
  var EXIT_TRANSITION_MS = 420;

  var TECH_TERMS = [
    "TLS handshake",
    "DNS resolution",
    "edge cache",
    "bundle graph",
    "source maps",
    "tree-shaking",
    "TypeScript emit",
    "container pull",
    "CI artifact",
    "OAuth token",
    "REST schema",
    "GraphQL document",
    "WebSocket upgrade",
    "PostgreSQL pool",
    "Redis session",
    "S3 presign",
    "CloudFront policy",
    "VPC route",
    "IAM policy",
    "secrets rotation",
    "Lambda cold start",
    "Kubernetes rollout",
    "service mesh",
    "observability stack",
    "webpack resolve",
    "esbuild target",
    "SSR payload",
    "hydration pass",
    "edge function",
    "WASM module",
  ];

  function shuffleInPlace(arr) {
    var i = arr.length;
    while (i > 1) {
      i -= 1;
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }
    return arr;
  }

  /**
   * Resolves homepage URL from current splash URL (correct for subpaths and CDNs).
   * @returns {string}
   */
  function homepageHref() {
    return new URL("pages/homepage.html", window.location.href).href;
  }

  function startSplash() {
    var root = document.getElementById("splash-root");
    var wordEl = document.getElementById("splash-word");
    var homeHref = homepageHref();

    if (!root || !wordEl) {
      window.location.href = homeHref;
      return;
    }

    var startAt = Date.now();
    var seq = shuffleInPlace(TECH_TERMS.slice()).slice(0, 14);
    var index = 0;

    function msLeft() {
      return TOTAL_MS - (Date.now() - startAt);
    }

    function showNextTerm() {
      var left = msLeft();
      if (left <= EXIT_TRANSITION_MS + 80) {
        return;
      }
      if (index < seq.length) {
        wordEl.textContent = seq[index];
        index += 1;
      }
      var delay = 240 + Math.floor(Math.random() * 260);
      if (delay > left - EXIT_TRANSITION_MS - 120) {
        delay = Math.max(90, left - EXIT_TRANSITION_MS - 120);
      }
      window.setTimeout(showNextTerm, delay);
    }

    function finish() {
      root.classList.add("splash--exit");
      window.setTimeout(function () {
        window.location.href = homeHref;
      }, EXIT_TRANSITION_MS);
    }

    window.setTimeout(showNextTerm, 380);
    window.setTimeout(finish, TOTAL_MS);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startSplash);
  } else {
    startSplash();
  }
})();
