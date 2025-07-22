document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("theme-toggle");
  
    const setTheme = (theme) => {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
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
      setTheme(newTheme);
    });
  
    // Real-time sync: The theme changed in one tab is linked and synced with the theme change in other tabs.
    window.addEventListener("storage", (event) => {
      if (event.key === "theme") {
        document.documentElement.setAttribute("data-theme", event.newValue);
      }
    });
  });
  docunment .getElementById("hamburger").addEventListener("click",()=>{
    const menu = docunment.getElementById("mobileMenu");
    menu.classList.toggle("show");
  })
  