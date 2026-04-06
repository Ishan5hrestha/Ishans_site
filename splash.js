/**
 * Minimal splash: connecting message, rotating technical terms, ~5s then homepage.
 */
(function () {
  "use strict";

  var TOTAL_MS = 5000;
  var EXIT_TRANSITION_MS = 420;
  var HOME_HREF = "pages/homepage.html";

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

  var root = document.getElementById("splash-root");
  var wordEl = document.getElementById("splash-word");

  if (!root || !wordEl) {
    window.location.href = HOME_HREF;
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
      window.location.href = HOME_HREF;
    }, EXIT_TRANSITION_MS);
  }

  window.setTimeout(showNextTerm, 380);
  window.setTimeout(finish, TOTAL_MS);
})();
