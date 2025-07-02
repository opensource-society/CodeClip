# 🚀 CodeClip – Code Snippet Manager Extension

**CodeClip** is a lightweight, open-source Chrome extension that helps developers **save, organize, and reuse code snippets** directly from their browser.

---

## ✨ Features

- 🖱️ Save selected code from any webpage via right-click
- 📝 Add custom snippets manually via the popup
- 🗂️ Organize snippets by language or tags
- 🔍 Search and filter through your saved snippets
- 📋 Copy code to clipboard instantly
- 🌙 Dark mode support
- 🔐 Local storage (your data stays in your browser)

---

## 📁 Folder Structure

```

codeclip-extension/
├── icons/            # Extension icons
├── popup/            # Quick access popup UI
├── vault/            # Full-page snippet dashboard
├── scripts/          # Background, context menu & storage logic
├── styles/           # Shared CSS (themes, variables)
├── utils/            # Helper functions
├── manifest.json     # Chrome Extension config (V3)
└── README.md

````

---

## 🛠️ Getting Started (Development)

1. **Clone the repository**

```bash
git clone https://github.com/opensource-society/CodeClip.git
cd CodeClip
````

2. **Load the extension in Chrome**

* Open `chrome://extensions/`
* Enable **Developer Mode** (top right)
* Click **"Load unpacked"**
* Select the project directory

3. **Develop and test**

* Make changes to the code
* Reload the extension from the Chrome Extensions page

---

## 🧑‍💻 Contributing

We welcome contributions of all kinds – bug fixes, features, UI improvements, documentation, and more.

**Good first issues:**

* Add "edit snippet" support
* Add language icons to snippet cards
* Improve mobile responsiveness
* Support snippet export/import
* Add keyboard shortcut for quick add

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
