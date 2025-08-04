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
});

//Copy button
const copyBtns = document.querySelectorAll('.copy-button');

copyBtns.forEach(btn => {
  btn.setAttribute('tabindex', '0'); // Make it keyboard-focusable

  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      btn.click(); // Trigger the action
    }
  });
});

document.querySelectorAll('.copy-button').forEach(button => {
  button.setAttribute('tabindex', '0'); // Now can be focused with Tab
});

document.querySelectorAll('.copy-button').forEach(button => {
  button.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      button.click(); // Simulates mouse click
    }
  });
});

