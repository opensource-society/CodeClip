document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("theme-toggle");
    const sunIcon = toggleBtn.querySelector('.icon-sun');
    const moonIcon = toggleBtn.querySelector('.icon-moon');

    const updateIcon = (theme) => {
      if (theme === "light") {
        sunIcon.style.display = "inline";
        moonIcon.style.display = "none";
      } else {
        sunIcon.style.display = "none";
        moonIcon.style.display = "inline";
      }
    };

    const setTheme = (theme) => {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      updateIcon(theme);
    };
  
    // Apply saved theme on load
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
  
    // Toggle button click
    toggleBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const newTheme = current === "light" ? "dark" : "light";
      // Add animation class
      toggleBtn.classList.add("animated");
      setTheme(newTheme);
      // Remove animation class after animation duration (400ms)
      setTimeout(() => {
        toggleBtn.classList.remove("animated");
      }, 400);
    });
  
    // Real-time sync: The theme changed in one tab is linked and synced with the theme change in other tabs.
    window.addEventListener("storage", (event) => {
      if (event.key === "theme") {
        document.documentElement.setAttribute("data-theme", event.newValue);
        updateIcon(event.newValue);
      }
    });
  });
  