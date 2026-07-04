# **Pomodorowith.ai** — *Free Online Pomodoro Timer*

> A fast, installable, privacy-friendly Pomodoro Technique timer and task manager. Work in focused 25-minute intervals, take real breaks, and reclaim your time.

**Live site:** **[https://pomodorowith.ai](https://pomodorowith.ai)**  ·  Mirror: [GitHub Pages](https://chiefinnovator.github.io/pomodoro/)

<p align="center">
  <a href="https://pomodorowith.ai">
    <img src="assets/images/tomatotimer-image.png" alt="Pomodorowith.ai — free online Pomodoro Technique timer" width="360">
  </a>
</p>

## ✨ Features

- **Customizable timer** — Adjust work, short break, long break, and long-break intervals.
- **Task manager** — Add tasks with categories, priorities, notes, and estimated Pomodoros. Filter by category.
- **Session statistics** — Track your Pomodoro count and progress throughout the day.
- **Audio notifications** — Volume control and mute toggle for session and break alerts.
- **Offline support (PWA)** — Service worker caches the app; works without a network after the first visit.
- **Installable** — Add to home screen on iOS, Android, and desktop Chrome / Edge.
- **Responsive** — Works on phones, tablets, and desktops.
- **Privacy-first** — Settings and tasks live in your browser's local storage. No account, no tracking of personal data.

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge).
- Basic knowledge of HTML, CSS, and JavaScript.

### Installation

To run the Pomodoro Timer locally, clone the repository:

```bash
git clone https://github.com/ChiefInnovator/pomodoro.git
cd pomodoro
```

### Run Locally

No build step is required — it is vanilla HTML, CSS, and JavaScript.

```bash
# Option 1: Open index.html directly in your browser
# Option 2: Serve over HTTP so the service worker and PWA features work
python3 -m http.server 8080
# Then visit http://localhost:8080
```

> **Note:** Service workers require HTTPS (or `localhost`). Opening `index.html` via `file://` will disable offline and install features.

## 🏗️ Architecture

### Project Structure

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

### Tech Stack

- **Languages:** Vanilla JavaScript, HTML, CSS.
- **Offline Support:** Service Worker for caching and offline functionality.
- **Analytics:** Plausible Analytics for privacy-friendly page views.
- **Deployment:** Deployed as an Azure Static Web App (see [`deployment.md`](deployment.md)).

### Customization

- **Theme** — Adjust CSS variables in [`css/styles.css`](css/styles.css).
- **Sounds** — Replace files in [`sounds/`](sounds/) and update references in [`js/app.js`](js/app.js).
- **Defaults** — Edit the `settings` defaults in [`js/app.js`](js/app.js).

## 📄 Pages

| Page | Purpose |
| --- | --- |
| [`index.html`](index.html) | Timer, task manager, and settings |
| [`tips.html`](tips.html) | Practical Pomodoro Technique tips and tricks |
| [`highlights.html`](highlights.html) | Real-world success stories |
| [`resources.html`](resources.html) | Curated books, research, and further reading |
| [`about.html`](about.html) | Project and creator background |

## 🤝 Contributing

Issues and pull requests are welcome! Fork the repo, create a feature branch, and open a PR.

## 📜 License

MIT. See [LICENSE](LICENSE) if present, otherwise the project is distributed under the standard MIT terms.

---

### Creator

Built by **[Richard Crane](https://inventingfirewith.ai)** — Microsoft MVP in AI, Azure, Dev, and DevOps.

- [MILL5](https://www.mill5.com) - An AI innovation company.
- [Microsoft MVP Profile](https://mvp.microsoft.com/en-US/MVP/profile/10ce0bc0-7536-43f6-b28c-e9601a4a0d0d)
- [Inventing Fire with AI podcast](https://inventingfirewith.ai)

<sub>Contact: [rich@mill5.com](mailto:rich@mill5.com)</sub>

---

<sub>Powered by [GitHub](https://github.com)</sub>


---

<sub>Powered by [RepoSpotlight](https://repospotlight.ai)</sub>
