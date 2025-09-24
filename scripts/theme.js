import { saveUserSettings, loadUserSettings } from "./data.js";

console.log("theme script loaded");

// ------------------- Theme Toggle ------------------- //  

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");

  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
  
    console.log("Theme set to:", theme);  
    // -------------- console log for checking the theme --------------// 

    // Toggle icon based on theme
    if (theme === "dark") {
      toggleBtn.classList.remove("fa-sun");
      toggleBtn.classList.add("fa-moon");
    } else {
      toggleBtn.classList.remove("fa-moon");
      toggleBtn.classList.add("fa-sun");
    }

    const success = saveUserSettings({ ...loadUserSettings(), theme });
    if (!success) {
      alert("Failed to save theme preference.");
    }
  };

  // Apply saved theme on load
  const savedSettings = loadUserSettings();
  const savedTheme = savedSettings.theme;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
  setTheme(initialTheme);

  // Toggle button click
  toggleBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const newTheme = current === "light" ? "dark" : "light";
    setTheme(newTheme);
  });

  // Real-time sync: The theme changed in one tab is linked and synced with the theme change in other tabs.
  window.addEventListener("storage", (event) => {
    if (event.key === "codeclip_user_settings") {
      try {
        const newSettings = JSON.parse(event.newValue);
        if (newSettings && newSettings.theme) {
          document.documentElement.setAttribute(
            "data-theme",
            newSettings.theme
          );
        }
      } catch (e) {
      }
    }
  });
});
