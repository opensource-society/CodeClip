/* === SMART PROGRESS DASHBOARD FEATURE START === */
/**
 * Smart Progress Dashboard with User Analytics
 * Tracks user coding progress, visualizes skill improvements, and provides gamified achievements
 */

class ProgressDashboard {
    constructor() {
        this.storageKey = 'codeclip_progress_data';
        this.userData = this.loadProgressData();
        this.charts = new Map();
        this.achievements = new AchievementSystem();

        // Initialize dashboard if we're on profile page
        if (this.isProfilePage()) {
            this.initializeDashboard();
        }
    }

    /**
     * Check if current page is profile page
     */
    isProfilePage() {
        return window.location.pathname.includes('profile') ||
            document.getElementById('progress-dashboard-container');
    }

    /**
     * Load progress data from localStorage
     */
    loadProgressData() {
        const defaultData = {
            startDate: new Date().toISOString(),
            totalChallenges: 0,
            completedChallenges: [],
            dailyActivity: {},
            skillProgress: {
                arrays: 0,
                strings: 0,
                algorithms: 0,
                'data-structures': 0,
                frontend: 0,
                backend: 0,
                fullstack: 0
            },
            streakData: {
                current: 0,
                longest: 0,
                lastActiveDate: null
            },
            achievements: [],
            timeSpent: 0,
            lastUpdated: new Date().toISOString()
        };

        try {
            const saved = localStorage.getItem(this.storageKey);
            return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
        } catch (error) {
            console.warn('Error loading progress data:', error);
            return defaultData;
        }
    }

    /**
     * Save progress data to localStorage
     */
    saveProgressData() {
        try {
            this.userData.lastUpdated = new Date().toISOString();
            localStorage.setItem(this.storageKey, JSON.stringify(this.userData));
            return true;
        } catch (error) {
            console.error('Error saving progress data:', error);
            return false;
        }
    }

    /**
     * Track challenge completion
     */
    trackChallengeCompletion(challengeData) {
        const today = new Date().toISOString().split('T')[0];
        const challengeId = challengeData.title + '_' + challengeData.difficulty;

        // Avoid duplicate tracking
        if (this.userData.completedChallenges.includes(challengeId)) {
            return;
        }

        // Update completion data
        this.userData.completedChallenges.push(challengeId);
        this.userData.totalChallenges++;

        // Update daily activity
        if (!this.userData.dailyActivity[today]) {
            this.userData.dailyActivity[today] = {
                challenges: 0,
                timeSpent: 0,
                difficulties: new Set(),
                categories: new Set()
            };
        }

        this.userData.dailyActivity[today].challenges++;
        this.userData.dailyActivity[today].difficulties.add(challengeData.difficulty);
        this.userData.dailyActivity[today].categories.add(challengeData.category);

        // Update skill progress
        if (this.userData.skillProgress[challengeData.category] !== undefined) {
            this.userData.skillProgress[challengeData.category]++;
        }

        // Update streak
        this.updateStreak();

        // Check achievements
        this.achievements.checkAndUnlock(this.userData);

        // Save data
        this.saveProgressData();

        // Update dashboard if visible
        if (this.isProfilePage()) {
            this.updateDashboard();
        }

        // Show achievement notification if any unlocked
        this.showAchievementNotifications();
    }

    /**
     * Update streak data
     */
    updateStreak() {
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        if (this.userData.streakData.lastActiveDate === yesterday) {
            // Continue streak
            this.userData.streakData.current++;
        } else if (this.userData.streakData.lastActiveDate !== today) {
            // Start new streak
            this.userData.streakData.current = 1;
        }

        // Update longest streak
        if (this.userData.streakData.current > this.userData.streakData.longest) {
            this.userData.streakData.longest = this.userData.streakData.current;
        }

        this.userData.streakData.lastActiveDate = today;
    }

    /**
     * Initialize dashboard UI
     */
    initializeDashboard() {
        // Create dashboard container if it doesn't exist
        let container = document.getElementById('progress-dashboard-container');
        if (!container) {
            container = this.createDashboardContainer();
        }

        this.renderDashboard(container);
        this.initializeCharts();
    }

    /**
     * Create dashboard container HTML
     */
    createDashboardContainer() {
        const container = document.createElement('div');
        container.id = 'progress-dashboard-container';
        container.className = 'progress-dashboard';

        // Find a good place to insert it (after profile header if exists)
        const profileHeader = document.querySelector('.profile-header');
        const insertAfter = profileHeader || document.querySelector('main');

        if (insertAfter) {
            insertAfter.appendChild(container);
        }

        return container;
    }

    /**
     * Render dashboard HTML
     */
    renderDashboard(container) {
        const { skillProgress, streakData, totalChallenges, achievements } = this.userData;

        container.innerHTML = `
      <div class="dashboard-header">
        <h2>📊 Your Progress Dashboard</h2>
        <p>Track your coding journey and achievements</p>
      </div>

      <div class="dashboard-stats">
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-content">
            <div class="stat-number">${totalChallenges}</div>
            <div class="stat-label">Challenges Completed</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">🔥</div>
          <div class="stat-content">
            <div class="stat-number">${streakData.current}</div>
            <div class="stat-label">Current Streak</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">🏆</div>
          <div class="stat-content">
            <div class="stat-number">${streakData.longest}</div>
            <div class="stat-label">Longest Streak</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-content">
            <div class="stat-number">${achievements.length}</div>
            <div class="stat-label">Achievements</div>
          </div>
        </div>
      </div>

      <div class="dashboard-charts">
        <div class="chart-container">
          <h3>Skill Progress</h3>
          <canvas id="skillProgressChart" width="400" height="200"></canvas>
        </div>

        <div class="chart-container">
          <h3>Weekly Activity</h3>
          <canvas id="weeklyActivityChart" width="400" height="200"></canvas>
        </div>
      </div>

      <div class="achievements-section">
        <h3>🏆 Achievements</h3>
        <div class="achievements-grid" id="achievementsGrid">
          ${this.renderAchievements()}
        </div>
      </div>

      <div class="insights-section">
        <h3>💡 Personal Insights</h3>
        <div class="insights-content">
          ${this.generateInsights()}
        </div>
      </div>
    `;
    }

    /**
     * Render achievements
     */
    renderAchievements() {
        const allAchievements = this.achievements.getAllAchievements();

        return allAchievements.map(achievement => {
            const unlocked = this.userData.achievements.includes(achievement.id);
            return `
        <div class="achievement-badge ${unlocked ? 'unlocked' : 'locked'}">
          <div class="achievement-icon">${achievement.icon}</div>
          <div class="achievement-name">${achievement.name}</div>
          <div class="achievement-description">${achievement.description}</div>
        </div>
      `;
        }).join('');
    }

    /**
     * Generate personalized insights
     */
    generateInsights() {
        const insights = [];

        // Find strongest skill
        const skills = Object.entries(this.userData.skillProgress);
        const strongestSkill = skills.reduce((a, b) => a[1] > b[1] ? a : b);

        if (strongestSkill[1] > 0) {
            insights.push(`🌟 Your strongest area is <strong>${strongestSkill[0]}</strong> with ${strongestSkill[1]} challenges completed!`);
        }

        // Find areas for improvement
        const weakestSkill = skills.filter(([, count]) => count === 0)[0];
        if (weakestSkill) {
            insights.push(`📈 Try exploring <strong>${weakestSkill[0]}</strong> challenges to broaden your skills!`);
        }

        // Streak encouragement
        if (this.userData.streakData.current >= 3) {
            insights.push(`🔥 Amazing ${this.userData.streakData.current}-day streak! Keep the momentum going!`);
        }

        return insights.length > 0
            ? insights.map(insight => `<div class="insight-item">${insight}</div>`).join('')
            : '<div class="insight-item">Complete more challenges to unlock personalized insights!</div>';
    }

    /**
     * Initialize charts with Chart.js
     */
    initializeCharts() {
        // Only initialize if Chart.js is available
        if (typeof Chart !== 'undefined') {
            this.initializeSkillChart();
            this.initializeActivityChart();
        } else {
            // Load Chart.js dynamically
            this.loadChartJS().then(() => {
                this.initializeSkillChart();
                this.initializeActivityChart();
            });
        }
    }

    /**
     * Load Chart.js library
     */
    loadChartJS() {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            script.onload = resolve;
            document.head.appendChild(script);
        });
    }

    /**
     * Initialize skill progress chart
     */
    initializeSkillChart() {
        const ctx = document.getElementById('skillProgressChart');
        if (!ctx) return;

        const skills = Object.entries(this.userData.skillProgress);

        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: skills.map(([skill]) => skill.charAt(0).toUpperCase() + skill.slice(1)),
                datasets: [{
                    label: 'Skills',
                    data: skills.map(([, count]) => count),
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(59, 130, 246, 1)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: Math.max(...skills.map(([, count]) => count)) + 2
                    }
                }
            }
        });
    }

    /**
     * Initialize weekly activity chart
     */
    initializeActivityChart() {
        const ctx = document.getElementById('weeklyActivityChart');
        if (!ctx) return;

        // Get last 7 days of activity
        const last7Days = [];
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today.getTime() - i * 86400000);
            const dateStr = date.toISOString().split('T')[0];
            const activity = this.userData.dailyActivity[dateStr];

            last7Days.push({
                date: date.toLocaleDateString('en-US', { weekday: 'short' }),
                challenges: activity ? activity.challenges : 0
            });
        }

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: last7Days.map(day => day.date),
                datasets: [{
                    label: 'Challenges Completed',
                    data: last7Days.map(day => day.challenges),
                    backgroundColor: 'rgba(34, 197, 94, 0.8)',
                    borderColor: 'rgba(34, 197, 94, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    /**
     * Update dashboard with new data
     */
    updateDashboard() {
        if (this.isProfilePage()) {
            const container = document.getElementById('progress-dashboard-container');
            if (container) {
                this.renderDashboard(container);
                this.initializeCharts();
            }
        }
    }

    /**
     * Show achievement notifications
     */
    showAchievementNotifications() {
        // Check for new achievements and show notifications
        const newAchievements = this.achievements.getNewAchievements();

        newAchievements.forEach(achievement => {
            this.showNotification(`🏆 Achievement Unlocked: ${achievement.name}!`, 'achievement');
        });
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
      <div class="notification-content">${message}</div>
      <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    /**
     * Get progress summary for other components
     */
    getProgressSummary() {
        return {
            totalChallenges: this.userData.totalChallenges,
            currentStreak: this.userData.streakData.current,
            longestStreak: this.userData.streakData.longest,
            achievements: this.userData.achievements.length,
            skillProgress: this.userData.skillProgress
        };
    }
}

/**
 * Achievement System
 */
class AchievementSystem {
    constructor() {
        this.achievements = [
            {
                id: 'first_challenge',
                name: 'First Steps',
                description: 'Complete your first challenge',
                icon: '🎯',
                condition: (userData) => userData.totalChallenges >= 1
            },
            {
                id: 'streak_3',
                name: 'Getting Started',
                description: 'Maintain a 3-day coding streak',
                icon: '🔥',
                condition: (userData) => userData.streakData.current >= 3
            },
            {
                id: 'streak_7',
                name: 'Week Warrior',
                description: 'Maintain a 7-day coding streak',
                icon: '📅',
                condition: (userData) => userData.streakData.current >= 7
            },
            {
                id: 'challenge_10',
                name: 'Problem Solver',
                description: 'Complete 10 challenges',
                icon: '🧩',
                condition: (userData) => userData.totalChallenges >= 10
            },
            {
                id: 'challenge_25',
                name: 'Code Master',
                description: 'Complete 25 challenges',
                icon: '👑',
                condition: (userData) => userData.totalChallenges >= 25
            },
            {
                id: 'array_expert',
                name: 'Array Expert',
                description: 'Complete 5 array challenges',
                icon: '📊',
                condition: (userData) => userData.skillProgress.arrays >= 5
            },
            {
                id: 'algorithm_wizard',
                name: 'Algorithm Wizard',
                description: 'Complete 5 algorithm challenges',
                icon: '🧙‍♂️',
                condition: (userData) => userData.skillProgress.algorithms >= 5
            }
        ];

        this.newlyUnlocked = [];
    }

    /**
     * Check and unlock achievements
     */
    checkAndUnlock(userData) {
        this.newlyUnlocked = [];

        this.achievements.forEach(achievement => {
            if (!userData.achievements.includes(achievement.id) &&
                achievement.condition(userData)) {
                userData.achievements.push(achievement.id);
                this.newlyUnlocked.push(achievement);
            }
        });

        return this.newlyUnlocked;
    }

    /**
     * Get all achievements
     */
    getAllAchievements() {
        return this.achievements;
    }

    /**
     * Get newly unlocked achievements
     */
    getNewAchievements() {
        return this.newlyUnlocked;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProgressDashboard, AchievementSystem };
}

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    window.progressDashboard = new ProgressDashboard();
});

/* === SMART PROGRESS DASHBOARD FEATURE END === */
