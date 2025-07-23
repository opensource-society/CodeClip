// Utility functions for localStorage data management

const STORAGE_KEYS = {
  progress: 'codeclip_user_progress',
  challenges: 'codeclip_completed_challenges',
  settings: 'codeclip_user_settings',
};

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
    return false;
  }
}

function loadFromStorage(key, defaultValue = null) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    console.error('Failed to load from localStorage:', e);
    return defaultValue;
  }
}

// User Progress
export function saveUserProgress(progress) {
  return saveToStorage(STORAGE_KEYS.progress, progress);
}

export function loadUserProgress() {
  return loadFromStorage(STORAGE_KEYS.progress, {});
}

// Completed Challenges
export function saveCompletedChallenges(challenges) {
  return saveToStorage(STORAGE_KEYS.challenges, challenges);
}

export function loadCompletedChallenges() {
  return loadFromStorage(STORAGE_KEYS.challenges, []);
}

// User Settings
export function saveUserSettings(settings) {
  return saveToStorage(STORAGE_KEYS.settings, settings);
}

export function loadUserSettings() {
  return loadFromStorage(STORAGE_KEYS.settings, {});
} 