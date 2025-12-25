# 🪄 CodeClip – Coding Challenge Vault

[![GitHub stars](https://img.shields.io/github/stars/adikulkarni006/CodeClip?style=social)](https://github.com/adikulkarni006/CodeClip/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/adikulkarni006/CodeClip?style=social)](https://github.com/adikulkarni006/CodeClip/network/members)
[![GitHub issues](https://img.shields.io/github/issues/adikulkarni006/CodeClip)](https://github.com/adikulkarni006/CodeClip/issues)
[![License](https://img.shields.io/github/license/adikulkarni006/CodeClip)](./LICENSE)

**CodeClip** is a lightweight, fully client-side web app that lets developers **store, solve, run, and share coding challenges directly in the browser**.  
Built with **vanilla HTML, CSS, and JavaScript**, it is ideal for first-time open-source contributors and is being developed under **GirlScript Summer of Code (GSSoC)**.

---

## ✨ Key Features (Planned & Implemented)

| Category      | Feature                                                   | Status   |
|---------------|-----------------------------------------------------------|----------|
| Core Vault    | Challenge repository with tags, difficulty, and search    | 🛠 Planned |
| Playback      | In-browser code runner (JS sandbox) with console output   | 🛠 Planned |
| Editor        | CodeMirror-based editor with themes, linting, and autosave | 🛠 Planned |
| Sharing       | Public solution links, up-votes, and comments             | 🛠 Planned |
| AI Assist     | Challenge recommendations based on user history           | 🛠 Planned |
| Accounts      | Local profile, progress tracking, badges                  | 🛠 Planned |
| UI / UX       | Dark-light theme switcher, mobile-first layout            | 🛠 Planned |
| Accessibility | WCAG-compliant color palette & keyboard nav               | 🛠 Planned |
| DevOps        | GitHub Pages deploy, CI linting, unit tests               | 🛠 Planned |

---

## 🏗️ System Architecture

Client (Browser)
│
├── UI Layer (HTML + CSS)
│ • index.html – Landing / dashboard
│ • pages/ – challenges.html, editor.html, …
│ • styles/ – main.css, components.css, themes.css
│
├── Logic Layer (ES6 Modules)
│ • app.js – App bootstrap & router
│ • storage.js – LocalStorage API wrapper
│ • challenges.js – Challenge CRUD & filters
│ • editor.js – CodeMirror integration
│ • ai.js – Recommendation engine (future)
│ • utils.js – Helpers
│
└── Persistence Layer
• LocalStorage (JSON)
• IndexedDB (future large data)

yaml
Copy code

**Offline-first:** All data lives in the browser; no backend required.  
Optional cloud sync can be added later via GitHub OAuth + Gists.

---

## 📂 Repository Structure

codeclip/
├─ index.html
├─ pages/
│ ├─ challenges.html
│ ├─ editor.html
│ └─ profile.html
├─ styles/
│ ├─ variables.css
│ ├─ main.css
│ ├─ components.css
│ └─ themes.css
├─ scripts/
│ ├─ app.js
│ ├─ storage.js
│ ├─ challenges.js
│ ├─ editor.js
│ ├─ ai.js
│ └─ utils.js
├─ assets/
│ └─ logo.svg
├─ docs/
│ └─ architecture.png
└─ README.md

yaml
Copy code

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/adikulkarni006/CodeClip.git
cd CodeClip
Run Locally
Any static server works. With VS Code:

Install the Live Server extension

Right-click index.html → “Open with Live Server”

🤝 Contributing
We welcome contributions of all levels!

Pick an issue labelled Level 1, Level 2, or Level 3

Create a feature branch:

bash
Copy code
git checkout -b feat/your-feature
Follow the style guide & open a Pull Request

Be responsive to code reviews

🛣️ Roadmap (Q3 2025)
✅ Landing & Vault MVP – basic challenge listing

🛠 Code Editor Integration – CodeMirror + autosave

🛠 JS Runtime – iframe sandbox, execution timers

🛠 Profile & Stats – badges, streak calendar

🛠 AI Recommendations – local ML or hosted API

🛠 PWA Support – installable, offline cache

🛠 Unit & E2E Tests – Vitest + Playwright

👥 Community & Support
Channel	Purpose
GitHub Issues	Bug reports, feature requests
Discussions	Q&A, ideas, polls
Discord	Real-time chat, pair programming
GSSoC Mentors	Onboarding & code reviews

🔖 License
Released under the MIT License – free for personal & commercial use with attribution.