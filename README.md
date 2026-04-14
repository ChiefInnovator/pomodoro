# Pomodorowith.ai — Free Online Pomodoro Timer

> A fast, installable, privacy-friendly Pomodoro Technique timer and task manager. Work in focused 25-minute intervals, take real breaks, and reclaim your time.

**Live site:** **[https://pomodorowith.ai](https://pomodorowith.ai)**  ·  Mirror: [GitHub Pages](https://chiefinnovator.github.io/pomodoro/)

<p align="center">
  <a href="https://pomodorowith.ai">
    <img src="assets/images/tomatotimer-image.png" alt="Pomodorowith.ai — free online Pomodoro Technique timer" width="360">
  </a>
</p>

## Live preview

Sharing the link anywhere that renders Open Graph metadata (Slack, iMessage, X/Twitter, Discord, LinkedIn, Facebook, WhatsApp, Teams) will show a rich card with the title, description, and the timer image above. You can verify link previews with:

- [opengraph.xyz/url/https%3A%2F%2Fpomodorowith.ai](https://www.opengraph.xyz/url/https%3A%2F%2Fpomodorowith.ai)
- [Meta Sharing Debugger](https://developers.facebook.com/tools/debug/?q=https%3A%2F%2Fpomodorowith.ai)
- [X Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/inspect/https:%2F%2Fpomodorowith.ai)

## Features

- **Customizable timer** — Adjust work, short break, long break, and long-break interval.
- **Task manager** — Add tasks with categories, priorities, notes, and estimated Pomodoros. Filter by category.
- **Session statistics** — Track your Pomodoro count and progress throughout the day.
- **Audio notifications** — Volume control and mute toggle for session and break alerts.
- **Offline support (PWA)** — Service worker caches the app; works without a network after the first visit.
- **Installable** — Add to home screen on iOS, Android, and desktop Chrome / Edge.
- **Responsive** — Works on phones, tablets, and desktops.
- **Privacy-first** — Settings and tasks live in your browser's local storage. No account, no tracking of personal data.

## Pages

| Page | Purpose |
| --- | --- |
| [`index.html`](index.html) | Timer, task manager, and settings |
| [`tips.html`](tips.html) | Practical Pomodoro Technique tips and tricks |
| [`highlights.html`](highlights.html) | Real-world success stories |
| [`resources.html`](resources.html) | Curated books, research, and further reading |
| [`about.html`](about.html) | Project and creator background |

## SEO, GEO & AEO

This project is optimized for classic search, generative engines (GEO), and answer engines (AEO):

- Per-page `<title>`, `<meta name="description">`, and keyword-focused content
- Canonical URLs, absolute Open Graph / Twitter Card tags, and validated image dimensions for link previews
- JSON-LD `@graph` with `WebSite`, `WebApplication`, `Person`, `HowTo`, `FAQPage`, `BreadcrumbList`, and `SpeakableSpecification`
- [`sitemap.xml`](sitemap.xml) and [`robots.txt`](robots.txt) with explicit `Allow` for GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, and others
- [`llms.txt`](llms.txt) providing a clean, citation-ready summary for large language models

## Run locally

No build step — it is vanilla HTML, CSS, and JavaScript.

```bash
git clone https://github.com/ChiefInnovator/pomodoro.git
cd pomodoro
# Option 1: open index.html directly in your browser
# Option 2: serve over HTTP so the service worker and PWA features work
python3 -m http.server 8080
# then visit http://localhost:8080
```

> Service workers require HTTPS (or `localhost`). Opening `index.html` via `file://` will disable offline and install features.

## Project structure

```text
.
├── index.html           # Timer + task manager + settings
├── about.html           # About the project and creator
├── tips.html            # Pomodoro tips & tricks
├── highlights.html      # Success stories
├── resources.html       # Curated Pomodoro resources
├── css/                 # Stylesheets (styles, menu, page-specific)
├── js/                  # app.js, timer.js, tasks.js, settings.js, stats.js, menu.js, utils.js
├── sounds/              # Audio alerts
├── assets/              # Icons and images
├── manifest.json        # PWA manifest
├── service-worker.js    # Offline cache
├── robots.txt           # Crawler rules (incl. AI crawlers)
├── sitemap.xml          # Sitemap
└── llms.txt             # LLM-friendly site summary
```

## Tech

Vanilla JavaScript, HTML, CSS. Service Worker for offline. Plausible Analytics for privacy-friendly page views. Deployed as an Azure Static Web App (see [`deployment.md`](deployment.md)).

## Customization

- **Theme** — Adjust CSS variables in [`css/styles.css`](css/styles.css).
- **Sounds** — Replace files in [`sounds/`](sounds/) and update references in [`js/app.js`](js/app.js).
- **Defaults** — Edit the `settings` defaults in [`js/app.js`](js/app.js).

## Contributing

Issues and pull requests welcome. Fork the repo, create a feature branch, and open a PR.

## License

MIT. See [LICENSE](LICENSE) if present, otherwise the project is distributed under the standard MIT terms.

---

### Creator

Built by **[Richard Crane](https://inventingfirewith.ai)** — Microsoft MVP in AI, Azure, Dev, and DevOps.

- [Microsoft MVP Profile](https://mvp.microsoft.com/en-US/MVP/profile/10ce0bc0-7536-43f6-b28c-e9601a4a0d0d)
- [Inventing Fire with AI podcast](https://inventingfirewith.ai)

<sub>Contact: [rich@mill5.com](mailto:rich@mill5.com)</sub>

---

<sub>Powered by [RepoBeacon](https://repobeacon.com)</sub>
