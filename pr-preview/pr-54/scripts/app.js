console.log('app script loaded');
const form = document.getElementById('challengeForm');
const preview = document.getElementById('preview');

const descriptionField = document.getElementById('description');
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
  preview.innerHTML = '';
});
import { saveUserProgress, loadUserProgress, saveCompletedChallenges, loadCompletedChallenges } from './data.js';

console.log('app script loaded');

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