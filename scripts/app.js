console.log('app script loaded');
const form = document.getElementById('challengeForm');
const preview = document.getElementById('preview');

const descriptionField = document.getElementById('description');
if (descriptionField) {
  descriptionField.addEventListener('input', () => {
    const raw = descriptionField.value;
    let formatted = raw
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>')
      .replace(/\*(.*?)\*/gim, '<i>$1</i>')
      .replace(/\n/gim, '<br />');

    preview.innerHTML = formatted;
  });
}



if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = {
      title: document.getElementById('title').value.trim(),
      description: document.getElementById('description').value.trim(),
      difficulty: document.getElementById('difficulty').value,
      testCases: document.getElementById('testCases').value.trim(),
      solution: document.getElementById('solution').value.trim()
    };

    try {
      JSON.parse(data.testCases);
    } catch (err) {
      alert(`Test cases must be valid JSON format. Error: ${err.message}\nExample of valid JSON: [{"input": "value1", "output": "value2"}]`);
      return;
    }

    console.log("Submitted Challenge Data:", data);
    alert("Challenge submitted successfully!");

    form.reset();
    if (preview) preview.innerHTML = '';
  });
}

import { saveUserProgress, loadUserProgress, saveCompletedChallenges, loadCompletedChallenges } from './data.js';

console.log('app script loaded');

// Simple Client-Side Router
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
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
      this.handleRoute(window.location.pathname);
    });

    // Handle navigation clicks
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-route]') || e.target.closest('[data-route]')) {
        e.preventDefault();
        const route = e.target.getAttribute('data-route') || e.target.closest('[data-route]').getAttribute('data-route');
        this.navigate(route);
      }
    });
  }

  navigate(path) {
    // Normalize path
    if (path === '/' || path === '/index.html') {
      path = '/';
    }

    // Only navigate if we're not already on the target page
    const currentPath = window.location.pathname;
    const currentPage = this.getCurrentPageFromPath(currentPath);
    const targetPage = this.routes[path];

    if (currentPage === targetPage) {
      // Already on the correct page, just update the URL
      window.history.pushState({}, '', path);
      return;
    }

    // Navigate to the new page
    window.history.pushState({}, '', path);
    this.handleRoute(path);
  }

  getCurrentPageFromPath(path) {
    // Determine what page we're currently on based on the file name
    const fileName = path.split('/').pop() || 'index.html';
    if (fileName === '' || fileName === 'index.html') return 'index.html';
    if (fileName === 'challenges.html') return 'pages/challenges.html';
    if (fileName === 'editor.html') return 'editor.html';
    if (fileName === 'profile.html') return 'pages/profile.html';
    return 'index.html';
  }

  handleRoute(path) {
    // Normalize path
    if (path === '/' || path === '/index.html') {
      path = '/';
    }

    if (this.routes[path]) {
      const targetPage = this.routes[path];
      const currentPath = window.location.pathname;
      const currentPage = this.getCurrentPageFromPath(currentPath);

      // Only redirect if we need to change pages
      if (currentPage !== targetPage) {
        if (path === '/') {
          window.location.href = '/';
        } else {
          window.location.href = targetPage;
        }
      }
    } else {
      console.warn('Route not found:', path);
      // Fallback to homepage
      window.location.href = '/';
    }
  }
}

// Initialize router only if we're not in a form submission context
if (!window.location.pathname.includes('submit-challenge')) {
  const router = new Router();
}

// Example: Save and load user progress
const userProgress = loadUserProgress();
console.log('Loaded user progress:', userProgress);

const updatedProgress = { ...userProgress, lastVisited: Date.now() };
if (!saveUserProgress(updatedProgress)) {
  alert('Failed to save user progress.');
}

// Example: Save and load completed challenges
const completed = loadCompletedChallenges();
console.log('Loaded completed challenges:', completed);

const updatedCompleted = [...completed, 'challenge-1'];
if (!saveCompletedChallenges(updatedCompleted)) {
  alert('Failed to save completed challenges.');
}

// Hamburger menu functionality
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.addEventListener('click', () => {
    const navList = navMenu.querySelector('.nav__list');
    const isOpen = navList.classList.toggle('open');
    navToggle.setAttribute(
      'aria-label',
      isOpen ? 'Close navigation menu' : 'Open navigation menu'
    );
    navToggle.setAttribute('aria-expanded', isOpen);
    
    // Animate hamburger toEye icon
    if (isOpen) {
      navToggle.children[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
      navToggle.children[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
      navToggle.children[1].style.opacity = '0';
    } else {
      navToggle.children[0].style.transform = 'rotate(0deg)';
      navToggle.children[2].style.transform = 'rotate(0deg)';
      navToggle.children[1].style.opacity = '1';
    }
  });
}