document.addEventListener('DOMContentLoaded', () => {
  const challenges = [
    {
      title: "Responsive Navbar",
      difficulty: "easy",
      language: "HTML, CSS",
      status: "Incomplete",
      category: "frontend"
    },
    {
      title: "Simple REST API Server",
      difficulty: "medium",
      language: "Node.js, Express",
      status: "Complete",
      category: "backend"
    },
    {
      title: "User Authentication Flow",
      difficulty: "hard",
      language: "React, Node.js",
      status: "Incomplete",
      category: "fullstack"
    },
    {
      title: "To-Do List Application",
      difficulty: "easy",
      language: "JavaScript, HTML, CSS",
      status: "Complete",
      category: "frontend"
    },
    {
      title: "Database Schema Design",
      difficulty: "medium",
      language: "SQL",
      status: "Incomplete",
      category: "backend"
    },
    {
      title: "Binary Search Algorithm",
      difficulty: "medium",
      language: "Python",
      status: "Complete",
      category: "algorithms"
    },
     {
      title: "CSS Card Component",
      difficulty: "easy",
      language: "HTML, CSS",
      status: "Complete",
      category: "frontend"
    },
     {
      title: "Real-time Chat App",
      difficulty: "hard",
      language: "Socket.IO, Node.js",
      status: "Incomplete",
      category: "fullstack"
    }
  ];

  const grid = document.getElementById("challengeGrid");
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const noResultsMessage = document.getElementById('no-results');

  function renderChallenges(data) {
    grid.innerHTML = ""; // Clear existing cards
    
    if (data.length === 0) {
        noResultsMessage.style.display = 'block';
    } else {
        noResultsMessage.style.display = 'none';
    }

    data.forEach((challenge) => {
      const card = document.createElement("div");
      card.className = "card";
      
      const statusClass = challenge.status.toLowerCase() === 'complete' ? 'complete' : 'incomplete';

      card.innerHTML = `
        <div class="card-header">
            <h3>${challenge.title}</h3>
            <span class="badge ${challenge.difficulty}">${challenge.difficulty}</span>
        </div>
        <div class="card-body">
            <p class="language">🧑‍💻 ${challenge.language}</p>
        </div>
        <div class="card-footer">
            <div class="status ${statusClass}">${challenge.status}</div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function applyFilters() {
      const searchTerm = searchInput.value.toLowerCase();
      const category = categoryFilter.value;

      const filteredChallenges = challenges.filter(challenge => {
          const matchesSearch = challenge.title.toLowerCase().includes(searchTerm) || challenge.language.toLowerCase().includes(searchTerm);
          const matchesCategory = category === 'all' || challenge.category === category;
          return matchesSearch && matchesCategory;
      });

      renderChallenges(filteredChallenges);
  }
  
  // Theme Toggler
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  // Check for saved theme in localStorage
  if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? '' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Save preference
  });

  // Event Listeners for filters
  searchInput.addEventListener('input', applyFilters);
  categoryFilter.addEventListener('change', applyFilters);

  // Initial render of all challenges
  applyFilters();

  // === SMART PROGRESS DASHBOARD FEATURE START === 
  // Add progress tracking for challenge interactions
  function trackChallengeInteraction(challengeTitle, difficulty, category) {
    // Check if progress dashboard is available
    if (window.progressDashboard) {
      window.progressDashboard.trackChallengeCompletion({
        title: challengeTitle,
        difficulty: difficulty,
        category: category,
        timestamp: new Date().toISOString()
      });
    }
  }

  // Add click event listeners to all "Solve Challenge" buttons
  document.addEventListener('click', (e) => {
    if (e.target.matches('.btn[aria-label*="Solve challenge"]') ||
      e.target.matches('.btn[aria-label*="Solve Challenge"]')) {

      // Find the challenge card
      const challengeCard = e.target.closest('.challenge-card');
      if (challengeCard) {
        const title = challengeCard.querySelector('.challenge-card__title')?.textContent || 'Unknown';
        const difficulty = challengeCard.getAttribute('data-difficulty') || 'unknown';
        const category = challengeCard.getAttribute('data-category') || 'unknown';

        // Track the challenge interaction
        trackChallengeInteraction(title, difficulty, category);
      }
    }
  });
  // === SMART PROGRESS DASHBOARD FEATURE END ===
});

// Copy button accessibility - consolidated implementation
document.querySelectorAll('.copy-button').forEach(button => {
  button.setAttribute('tabindex', '0'); // Make it keyboard-focusable

  button.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      button.click(); // Trigger the action
    }
  });
});

