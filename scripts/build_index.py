#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Rebuilds root index.html from pages/homepage.html <head> and pages/partials/*.html.
Run after editing partials or homepage head assets so the single-page shell stays in sync.
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PARTIAL_ORDER = [
    "nav.html",
    "section-home.html",
    "section-services.html",
    "section-experience.html",
    "section-funstuff.html",
    "section-github.html",
    "section-projects.html",
    "section-contact.html",
]

SOCIAL_BLOCK_PATTERN = re.compile(
    r"\s*<!-- Open Graph Metadata tags -->.*?"
    r'<meta\s+name="description"[^>]*>\s*',
    re.DOTALL,
)

SOCIAL_BLOCK_REPLACEMENT = """
    <!-- TODO: social preview — update URL, image, titles, and descriptions when you are ready -->
    <meta property="og:url" content="https://ishans.com.np/" />
    <meta property="og:image" content="https://ishans.com.np/" />
    <meta
      property="og:image:alt"
      content="A Deep Dreamed view of the Middlesex Fells Reservoir in Medford, MA"
    />
    <meta property="g:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta property="og:author" content="Ishan Shrestha" />
    <meta property="og:title" content="Ishan&apos;s Personal Website" />
    <meta
      property="og:description"
      content="This is Ishan Shrestha&apos;s Personal Website, where he includes college projects, personal side projects and any professional or open source stuff"
    />
    <meta
      name="description"
      content="This is Ishan Shrestha&apos;s Personal Website, where he includes college projects, personal side projects and any professional or open source stuff"
    />
    <!-- TODO end: social preview -->
"""


def build_head_inner() -> str:
    src = (ROOT / "pages/homepage.html").read_text(encoding="utf-8")
    match = re.search(r"<head>([\s\S]*?)</head>", src)
    if not match:
        raise SystemExit("Could not find <head> in pages/homepage.html")
    inner = match.group(1)
    inner = re.sub(
        r"<title>[\s\S]*?</title>",
        "<title>Ishan&apos;s Site</title>",
        inner,
        count=1,
    )
    inner = inner.replace('href="../css/', 'href="css/')
    inner = SOCIAL_BLOCK_PATTERN.sub(SOCIAL_BLOCK_REPLACEMENT, inner, count=1)
    if "<link rel=\"canonical\"" not in inner:
        inner = inner.replace(
            '<meta charset="utf-8" />',
            '<meta charset="utf-8" />\n    <link rel="canonical" href="https://ishans.com.np/" />',
            1,
        )
    return inner


def main() -> None:
    head_inner = build_head_inner()
    base = ROOT / "pages/partials"
    nav_text = (base / "nav.html").read_text(encoding="utf-8").replace("../assets/", "/assets/")
    section_texts = []
    for name in PARTIAL_ORDER[1:]:
        section_texts.append((base / name).read_text(encoding="utf-8").replace("../assets/", "/assets/"))
    sections_joined = "\n".join(section_texts)

    out = f"""<!DOCTYPE html>
<html lang="en">
<head>{head_inner}
    <link rel="stylesheet" href="splash_style.css" />
</head>
  <body class="bg-[#121212] has-news-banner">
    <noscript>
      <div
        class="fixed bottom-0 left-0 right-0 z-[100] bg-[#121212]/95 text-gray-300 p-3 text-center text-sm border-t border-blue-900/30"
      >
        <p>
          JavaScript is disabled. Section content is present in this page for reading; enable JavaScript for navigation and interactions.
        </p>
      </div>
    </noscript>

    <div id="splash-root" class="splash splash--overlay">
      <div class="splash-inner">
        <p class="splash-connect" id="splash-connect">Connecting&hellip;</p>
        <p class="splash-word" id="splash-word" aria-live="polite"></p>
      </div>
    </div>

    <div id="portfolio-shell">
    <div
      class="news-banner"
      role="region"
      aria-label="Announcement"
    >
      <p class="news-banner__inner">
        Check out my Nepali TTS project
        <a
          href="https://preeti.ishans.com.np"
          target="_blank"
          rel="noopener noreferrer"
          class="news-banner__link"
          >here</a
        >.
      </p>
    </div>
    <div id="site-nav" aria-busy="true">
{nav_text}
    </div>

    <div id="site-sections" aria-busy="true">
{sections_joined}
    </div>

    <div
      class="copyright-footer fixed bottom-4 left-0 w-full text-center text-gray-500 text-xs z-30 md:bottom-4 pb-[env(safe-area-inset-bottom,0)] max-md:bottom-[calc(var(--nav-mobile-bar-height)+0.25rem)] pointer-events-none"
    >
      Ishan Shrestha &copy; 2021 - <span id="copyright-year"></span>
    </div>
    </div>

    <script src="splash.js" defer></script>
    <script src="js/homepage.js" defer></script>
  </body>
</html>
"""
    (ROOT / "index.html").write_text(out, encoding="utf-8", newline="\n")
    print("Wrote index.html")


if __name__ == "__main__":
    main()
