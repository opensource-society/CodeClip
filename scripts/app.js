import { saveUserProgress, loadUserProgress, saveCompletedChallenges, loadCompletedChallenges } from './data.js';

// console.log('app script loaded');

const form = document.getElementById('challengeForm');
const preview = document.getElementById('preview');

if (form && preview) {
  const descriptionField = document.getElementById('description');
  descriptionField.addEventListener('input', () => {
    const raw = descriptionField.value;
    const formatted = raw
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>')
      .replace(/\*(.*?)\*/gim, '<i>$1</i>')
      .replace(/\n/gim, '<br />');

    preview.innerHTML = formatted;
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = {
      title: document.getElementById('title').value.trim(),
      description: descriptionField.value.trim(),
      difficulty: document.getElementById('difficulty').value,
      testCases: document.getElementById('testCases').value.trim(),
      solution: document.getElementById('solution').value.trim()
    };

    try {
      JSON.parse(data.testCases);
    } catch (err) {
      alert(`Test cases must be valid JSON format. Error: ${err.message}\nExample: [{"input": "x", "output": "y"}]`);
      return;
    }

    console.log("Submitted Challenge Data:", data);
    alert("Challenge submitted successfully!");
    form.reset();
    preview.innerHTML = '';
  });
}

// ------------------- Router ------------------- //
class Router {
  constructor() {
    this.routes = {
      '/': 'index.html',
      '/home': 'index.html',
      '/challenges': 'pages/challenges.html',
      '/editor': 'editor.html',
      '/profile': 'pages/profile.html',
      '/coding': 'editor.html'
    };
    this.init();
  }

  init() {
    window.addEventListener('popstate', () => {
      this.handleRoute(window.location.pathname);
    });

    document.querySelectorAll('[data-route]').forEach(el => {
      el.setAttribute('tabindex', '0');
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const route = el.getAttribute('data-route');
        this.navigate(route);
      });

      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const route = el.getAttribute('data-route');
          this.navigate(route);
        }
      });
    });
  }

  navigate(path) {
    if (!path) return;
    if (path === '/' || path === '/index.html') path = '/';

    const currentPath = window.location.pathname;
    const currentPage = this.getCurrentPageFromPath(currentPath);
    const targetPage = this.routes[path];

    if (currentPage === targetPage) {
      window.history.pushState({}, '', path);
      return;
    }

    window.history.pushState({}, '', path);
    this.handleRoute(path);
  }

  getCurrentPageFromPath(path) {
    const fileName = path.split('/').pop() || 'index.html';
    switch (fileName) {
      case 'index.html':
      case '':
        return 'index.html';
      case 'challenges.html':
        return 'pages/challenges.html';
      case 'editor.html':
        return 'editor.html';
      case 'profile.html':
        return 'pages/profile.html';
      default:
        return 'index.html';
    }
  }

  handleRoute(path) {
    if (path === '/' || path === '/index.html') path = '/';

    const targetPage = this.routes[path];
    if (targetPage) {
      const currentPage = this.getCurrentPageFromPath(window.location.pathname);
      if (currentPage !== targetPage) {
        window.location.href = targetPage;
      }
    } else {
      console.warn('Route not found:', path);
      window.location.href = '/';
    }
  }
}

if (!window.location.pathname.includes('submit-challenge')) {
  new Router();
}

// ------------------- Save/Load Data ------------------- //
const userProgress = loadUserProgress();
// console.log('Loaded user progress:', userProgress);

const updatedProgress = { ...userProgress, lastVisited: Date.now() };
if (!saveUserProgress(updatedProgress)) {
  alert('Failed to save user progress.');
}

const completed = loadCompletedChallenges();
// console.log('Loaded completed challenges:', completed);

const updatedCompleted = [...completed, 'challenge-1'];
if (!saveCompletedChallenges(updatedCompleted)) {
  alert('Failed to save completed challenges.');
}

// ------------------- Hamburger Menu ------------------- //
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.addEventListener('click', () => {
    const navList = navMenu.querySelector('.nav__list');
    const isOpen = navList.classList.toggle('open');
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    navToggle.setAttribute('aria-expanded', isOpen);

    // Animate hamburger icon
    const [line1, line2, line3] = navToggle.children;
    line1.style.transform = isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'rotate(0deg)';
    line2.style.opacity = isOpen ? '0' : '1';
    line3.style.transform = isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'rotate(0deg)';
  });
}
// --- Profile Page Logic ---
document.addEventListener("DOMContentLoaded", () => {
  const avatarInput = document.getElementById('upload-avatar');
  const avatarPreview = document.getElementById('avatarPreview');
  const avatarInitial = document.getElementById('avatarInitial');
  const avatarCircle = document.getElementById('avatarCircle');

  // Load from localStorage
  const savedImage = localStorage.getItem('profileAvatar');
  if (savedImage && avatarPreview) {
    avatarPreview.src = savedImage;
    avatarPreview.hidden = false;
    avatarInitial.style.display = 'none';
  }

  // Trigger input when avatar is clicked
  if (avatarCircle && avatarInput) {
    avatarCircle.addEventListener('click', () => avatarInput.click());
  }

  // Handle image selection
  if (avatarInput) {
    avatarInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (event) {
        const dataUrl = event.target.result;
        if (avatarPreview) {
          avatarPreview.src = dataUrl;
          avatarPreview.removeAttribute('hidden');
          avatarInitial.style.display = 'none';
        }
        localStorage.setItem('profileAvatar', dataUrl);
      };
      reader.readAsDataURL(file);
    });
  }
});
