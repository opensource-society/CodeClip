document.addEventListener('DOMContentLoaded', () => {
  // Map app themes to Prism.js themes
  const themeMap = {
    light: 'prism.css', // Default Prism theme
    dark: 'prism-okaidia.css' // Okaidia for dark mode
  };

  // Function to load Prism.js theme CSS
  function loadPrismTheme(theme) {
    let prismThemeLink = document.getElementById('prism-theme');
    if (!prismThemeLink) {
      prismThemeLink = document.createElement('link');
      prismThemeLink.id = 'prism-theme';
      prismThemeLink.rel = 'stylesheet';
      document.head.appendChild(prismThemeLink);
    }
    prismThemeLink.href = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/${themeMap[theme]}`;
  }

  // Initialize Prism.js theme based on current app theme
  const initialTheme = document.documentElement.getAttribute('data-theme') || 'light';
  loadPrismTheme(initialTheme);

  // Sync Prism.js theme with app theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-theme') {
        const newTheme = document.documentElement.getAttribute('data-theme') || 'light';
        loadPrismTheme(newTheme);
        Prism.highlightAll();
      }
    });
  });
  observer.observe(document.documentElement, { attributes: true });

  // Enhance code editor with language support
  function enhanceCodeEditor(textareaId, displayId, languageSelectId) {
    const textarea = document.getElementById(textareaId);
    const displayDiv = document.getElementById(displayId);
    const languageSelect = document.getElementById(languageSelectId);
    if (!textarea || !displayDiv || !languageSelect) return;

    // Create initial pre/code block
    function createCodeBlock(language) {
      displayDiv.innerHTML = '';
      const pre = document.createElement('pre');
      pre.className = 'line-numbers';
      const code = document.createElement('code');
      code.className = `language-${language}`;
      code.textContent = textarea.value.trim() || '// Write your code here';
      pre.appendChild(code);
      displayDiv.appendChild(pre);
      Prism.highlightElement(code);
    }

    // Initial language setup
    const initialLanguage = languageSelect.value || 'javascript';
    createCodeBlock(initialLanguage);

    // Sync textarea and code block on input
    textarea.addEventListener('input', () => {
      const currentLanguage = languageSelect.value || 'javascript';
      createCodeBlock(currentLanguage);
    });

    // Update code block when language changes
    languageSelect.addEventListener('change', () => {
      const selectedLanguage = languageSelect.value;
      createCodeBlock(selectedLanguage);
    });
  }

  // Initialize syntax highlighting for editor
  enhanceCodeEditor('editorCode', 'code-editor-display', 'language-select');
});