# 🪄 CodeClip &nbsp;– Coding Challenge Vault

**CodeClip** is a lightweight, fully client-side web app that lets developers **store, solve, run, and share coding challenges** directly in the browser. Built with vanilla **HTML, CSS, and JavaScript**, it is ideal for first-time open-source contributors and is being developed under **GirlScript Summer of Code (GSSoC)**.

## ✨ Key Features (Planned & Implemented)

| Category | Feature | Status |
|----------|---------|--------|
| Core Vault | Challenge repository with tags, difficulty, and search | 🛠 Planned |
| Playback | In-browser code runner (JS sandbox) with console output | 🛠 Planned |
| Editor | CodeMirror-based editor with themes, linting, and autosave | 🛠 Planned |
| Sharing | Public solution links, up-votes, and comments | 🛠 Planned |
| AI Assist | Challenge recommendations based on user history | 🛠 Planned |
| Accounts | Local profile, progress tracking, badges | 🛠 Planned |
| UI / UX | Dark-light theme switcher, mobile-first layout | 🛠 Planned |
| Accessibility | WCAG-compliant color palette & keyboard nav | 🛠 Planned |
| DevOps | GitHub Pages deploy, CI linting, unit tests | 🛠 Planned |

## 🏗️ System Architecture

```
Client (Browser) ────────────────────────────────────────────┐
│                                                           │
│ 1. UI Layer (HTML + CSS)                                  │
│    • index.html  – Landing / dashboard                    │
│    • pages/        challenges.html, editor.html, …        │
│    • styles/       main.css, components.css, themes.css   │
│                                                           │
│ 2. Logic Layer (ES6 Modules)                              │
│    • app.js       – App bootstrap & router                │
│    • storage.js   – LocalStorage API wrapper              │
│    • challenges.js – Challenge CRUD & filters             │
│    • editor.js    – CodeMirror integration                │
│    • ai.js        – Recommendation engine (future)        │
│    • utils.js     – Helpers                               │
│                                                           │
│ 3. Persistence Layer                                      │
│    • LocalStorage (JSON)                                  │
│    • IndexedDB (future large data)                        │
│                                                           │
└─────────────────────────────────────────────────────────────

Offline-first: All data lives in the browser; no backend required.  
Optional cloud sync can be added later via GitHub OAuth + Gists.
```

## 📂 Repository Structure

```text
codeclip/
├─ index.html
├─ pages/
│  ├─ challenges.html
│  ├─ editor.html
│  └─ profile.html
├─ styles/
│  ├─ variables.css
│  ├─ main.css
│  ├─ components.css
│  └─ themes.css
├─ scripts/
│  ├─ app.js
│  ├─ storage.js
│  ├─ challenges.js
│  ├─ editor.js
│  ├─ ai.js
│  └─ utils.js
├─ assets/
│  └─ logo.svg
├─ docs/
│  └─ architecture.png
└─ README.md  ← you are here
```

## 🚀 Getting Started

1. **Clone**  
   ```bash
   git clone https://github.com/opensource-society/CodeClip.git
   cd CodeClip
   ```

2. **Run Locally**  
   Any static server works; with VS Code:  
   1. Install the *Live Server* extension  
   2. Right-click `index.html` → “Open with Live Server”

3. **Contribute**  
   - Pick an issue labelled **Level 1**, **Level 2**, or **Level 3**.  
   - Create a **feature branch**: `git checkout -b feat/`  
   - Follow the style guide; submit a pull request; respond to reviews.

## 🛣️ Roadmap (Quarter 3 2025)

1. **Landing & Vault MVP** – basic challenge listing 🛠  
2. **Code Editor Integration** – CodeMirror + autosave 🛠  
3. **JS Runtime** – iframe sandbox, execution timers 🛠  
4. **Profile & Stats** – badges, streak calendar 🛠  
5. **AI Recommendations** – local ML or hosted API 🛠  
6. **PWA Support** – installable, offline cache 🛠  
7. **Unit & E2E Tests** – Vitest + Playwright 🛠  

*Issues are filed chronologically in the `/docs/issues.docx` for reference.*

## 👥 Community & Support

| Channel | Purpose |
|---------|---------|
| GitHub Issues | Bug reports, feature requests |
| GitHub Discussions | Q&A, ideas, polls |
| Discord | Real-time chat, pair programming |
| GSSoC Mentors | Onboarding & code reviews |

## 🔖 License

CodeClip is released under the **MIT License** – free for personal & commercial use with attribution.

### ⭐ Give the repo a star and join us in building the most accessible coding-challenge vault on the web!
