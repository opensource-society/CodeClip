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
            if (saved) {
                const parsedData = JSON.parse(saved);

                // Migrate old Set data to arrays if necessary
                if (parsedData.dailyActivity) {
                    Object.values(parsedData.dailyActivity).forEach(activity => {
                        // Convert Set objects (which become empty objects) to arrays
                        if (activity.difficulties && typeof activity.difficulties === 'object' && !Array.isArray(activity.difficulties)) {
                            activity.difficulties = [];
                        }
                        if (activity.categories && typeof activity.categories === 'object' && !Array.isArray(activity.categories)) {
                            activity.categories = [];
                        }
                    });
                }

                return { ...defaultData, ...parsedData };
            }
            return defaultData;
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
                difficulties: [],
                categories: []
            };
        }

        this.userData.dailyActivity[today].challenges++;

        // Add to arrays only if not already present (maintaining Set-like behavior)
        if (!this.userData.dailyActivity[today].difficulties.includes(challengeData.difficulty)) {
            this.userData.dailyActivity[today].difficulties.push(challengeData.difficulty);
        }
        if (!this.userData.dailyActivity[today].categories.includes(challengeData.category)) {
            this.userData.dailyActivity[today].categories.push(challengeData.category);
        }

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
        // Add some sample data for demonstration if no data exists
        if (this.userData.totalChallenges === 0) {
            this.addSampleData();
        }

        // Check if we have the enhanced dashboard structure
        const enhancedWrapper = document.querySelector('.enhanced-dashboard-wrapper');
        if (enhancedWrapper) {
            // Hide loading and populate enhanced dashboard
            this.hideLoadingAndPopulateEnhancedDashboard();
            this.populateSkillsData();
            this.populateActivityData();
            this.initializeCharts();
            this.initializeAchievementFilters();
            return;
        }

        // Fallback to original dashboard creation
        let container = document.getElementById('progress-dashboard-container');
        if (!container) {
            container = this.createDashboardContainer();
        }

        this.renderDashboard(container);
        this.initializeCharts();
        this.initializeAchievementFilters();
    }

    /**
     * Add sample data for demonstration
     */
    addSampleData() {
        // Add some sample completed challenges
        this.userData.completedChallenges = [
            'Two Sum_Easy',
            'Valid Parentheses_Easy',
            'Binary Search_Medium',
            'Array Sorting_Easy'
        ];
        this.userData.totalChallenges = 4;

        // Add sample skill progress
        this.userData.skillProgress = {
            arrays: 2,
            strings: 1,
            algorithms: 1,
            'data-structures': 1,
            frontend: 0,
            backend: 0,
            fullstack: 0
        };

        // Add sample streak data
        this.userData.streakData = {
            current: 5,
            longest: 7,
            lastActiveDate: new Date().toISOString().split('T')[0]
        };

        // Add sample achievements
        this.userData.achievements = ['first_challenge', 'streak_3'];

        // Add sample daily activity
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const date = new Date(today.getTime() - i * 86400000).toISOString().split('T')[0];
            this.userData.dailyActivity[date] = {
                challenges: Math.floor(Math.random() * 3) + 1,
                timeSpent: Math.floor(Math.random() * 60) + 30,
                difficulties: ['Easy', 'Medium'],
                categories: ['arrays', 'algorithms']
            };
        }

        this.saveProgressData();
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

      <div class="analytics-section-professional">
        <div class="section-header-professional">
          <h3 class="section-title-professional">
            <i class="fas fa-chart-line"></i>
            Performance Analytics & Activity
          </h3>
          <p class="section-subtitle-professional">Visualize your coding progress and daily activity</p>
        </div>
        
        <div class="analytics-grid-professional">
          <div class="chart-card-professional">
            <div class="chart-card-header">
              <div class="chart-icon-container">
                <i class="fas fa-brain"></i>
              </div>
              <div class="chart-title-section">
                <h4 class="chart-title-main">Skills Progress</h4>
                <p class="chart-subtitle">Track your expertise across different domains</p>
              </div>
              <div class="chart-stats-badge">
                <span class="stats-value">${Object.values(this.userData.skillProgress).reduce((a, b) => a + b, 0)}</span>
                <span class="stats-label">Total Points</span>
              </div>
            </div>
            <div class="chart-content-wrapper">
              <div class="chart-canvas-container">
                <canvas id="skillProgressChart" width="400" height="300"></canvas>
              </div>
              <div class="chart-legend-professional">
                ${this.generateSkillsLegend()}
              </div>
            </div>
          </div>

          <div class="chart-card-professional">
            <div class="chart-card-header">
              <div class="chart-icon-container activity">
                <i class="fas fa-calendar-check"></i>
              </div>
              <div class="chart-title-section">
                <h4 class="chart-title-main">Weekly Activity</h4>
                <p class="chart-subtitle">Your coding consistency over the past week</p>
              </div>
              <div class="chart-stats-badge">
                <span class="stats-value">${this.calculateWeeklyTotal()}</span>
                <span class="stats-label">This Week</span>
              </div>
            </div>
            <div class="chart-content-wrapper">
              <div class="chart-canvas-container">
                <canvas id="weeklyActivityChart" width="400" height="300"></canvas>
              </div>
              <div class="activity-insights-professional">
                ${this.generateActivityInsights()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="achievements-section-professional">
        <div class="section-header-professional">
          <h3 class="section-title-professional">
            <i class="fas fa-trophy"></i>
            Achievements & Milestones
          </h3>
          <p class="section-subtitle-professional">Track your coding journey and unlock rewards</p>
        </div>
        <div class="achievements-content">
          ${this.renderAchievements()}
        </div>
      </div>
    `;
    }

    /**
     * Render achievements
     */
    renderAchievements() {
        const allAchievements = this.achievements.getAllAchievements();
        const unlockedCount = this.userData.achievements.length;
        const totalCount = allAchievements.length;
        const progressPercentage = Math.round((unlockedCount / totalCount) * 100);

        const achievementsHTML = allAchievements.map((achievement, index) => {
            const unlocked = this.userData.achievements.includes(achievement.id);
            const animationDelay = index * 0.1;
            const rarity = this.getAchievementRarity(achievement.id);

            return `
                <div class="achievement-card-professional ${unlocked ? 'achievement-unlocked' : 'achievement-locked'} rarity-${rarity}" 
                     style="animation-delay: ${animationDelay}s"
                     data-achievement-id="${achievement.id}"
                     data-rarity="${rarity}">
                     
                    <div class="achievement-card-backdrop"></div>
                    <div class="achievement-rarity-glow rarity-${rarity}"></div>
                    
                    <div class="achievement-card-inner">
                        <div class="achievement-card-header">
                            <div class="achievement-status-badge ${unlocked ? 'status-unlocked' : 'status-locked'}">
                                <i class="fas ${unlocked ? 'fa-check-circle' : 'fa-lock'}"></i>
                                <span>${unlocked ? 'Unlocked' : 'Locked'}</span>
                            </div>
                            <div class="achievement-rarity-badge rarity-${rarity}">
                                <i class="fas fa-gem"></i>
                                <span>${this.getAchievementRarityLabel(achievement.id)}</span>
                            </div>
                        </div>
                        
                        <div class="achievement-icon-section">
                            <div class="achievement-icon-container ${unlocked ? 'unlocked' : 'locked'}">
                                <div class="achievement-icon-glow"></div>
                                <div class="achievement-icon-main">${achievement.icon}</div>
                                ${unlocked ? '<div class="achievement-unlock-indicator"><i class="fas fa-star"></i></div>' : ''}
                            </div>
                        </div>
                        
                        <div class="achievement-content-section">
                            <h4 class="achievement-title-main">${achievement.name}</h4>
                            <p class="achievement-description-main">${achievement.description}</p>
                            
                            <div class="achievement-progress-info">
                                ${this.getAchievementProgressInfo(achievement, unlocked)}
                            </div>
                        </div>
                        
                        <div class="achievement-card-footer">
                            <div class="achievement-earned-date">
                                ${unlocked ?
                    '<i class="fas fa-calendar-check"></i><span>Earned Recently</span>' :
                    '<i class="fas fa-target"></i><span>In Progress</span>'
                }
                            </div>
                            <div class="achievement-points">
                                <i class="fas fa-coins"></i>
                                <span>${this.getAchievementPoints(achievement.id)} XP</span>
                            </div>
                        </div>
                    </div>
                    
                    ${unlocked ? '<div class="achievement-particle-effect"></div>' : ''}
                    <div class="achievement-hover-overlay"></div>
                </div>
            `;
        }).join('');

        return `
            <div class="achievements-dashboard-header">
                <div class="achievements-stats-overview">
                    <div class="achievement-overview-card">
                        <div class="overview-icon">
                            <i class="fas fa-trophy"></i>
                        </div>
                        <div class="overview-content">
                            <h4>Total Achievements</h4>
                            <span class="overview-number">${unlockedCount}/${totalCount}</span>
                        </div>
                    </div>
                    
                    <div class="achievement-overview-card">
                        <div class="overview-icon completion">
                            <i class="fas fa-percentage"></i>
                        </div>
                        <div class="overview-content">
                            <h4>Completion Rate</h4>
                            <span class="overview-number">${progressPercentage}%</span>
                        </div>
                    </div>
                    
                    <div class="achievement-overview-card">
                        <div class="overview-icon xp">
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="overview-content">
                            <h4>Total XP Earned</h4>
                            <span class="overview-number">${this.calculateTotalXP()}</span>
                        </div>
                    </div>
                </div>
                
                <div class="achievements-progress-section">
                    <div class="progress-info-detailed">
                        <div class="progress-text-section">
                            <h4>Achievement Progress</h4>
                            <p>Keep coding to unlock more achievements!</p>
                        </div>
                        <div class="progress-stats">
                            <span class="progress-fraction">${unlockedCount}/${totalCount}</span>
                            <span class="progress-percentage-large">${progressPercentage}%</span>
                        </div>
                    </div>
                    <div class="progress-bar-advanced">
                        <div class="progress-track">
                            <div class="progress-fill-advanced" style="width: ${progressPercentage}%">
                                <div class="progress-glow"></div>
                            </div>
                        </div>
                        <div class="progress-markers">
                            ${this.generateProgressMarkers(totalCount, unlockedCount)}
                        </div>
                    </div>
                </div>
                
                <div class="achievements-filter-section">
                    <div class="filter-tabs-container">
                        <button class="filter-tab-professional active" data-filter="all">
                            <i class="fas fa-th-large"></i>
                            <span>All Achievements</span>
                            <div class="tab-indicator"></div>
                        </button>
                        <button class="filter-tab-professional" data-filter="unlocked">
                            <i class="fas fa-trophy"></i>
                            <span>Unlocked (${unlockedCount})</span>
                            <div class="tab-indicator"></div>
                        </button>
                        <button class="filter-tab-professional" data-filter="locked">
                            <i class="fas fa-lock"></i>
                            <span>Locked (${totalCount - unlockedCount})</span>
                            <div class="tab-indicator"></div>
                        </button>
                        <button class="filter-tab-professional" data-filter="rare">
                            <i class="fas fa-gem"></i>
                            <span>Rare & Epic</span>
                            <div class="tab-indicator"></div>
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="achievements-grid-container">
                <div class="achievements-grid-professional">
                    ${achievementsHTML}
                </div>
                
                <div class="achievements-empty-state" style="display: none;">
                    <div class="empty-state-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <h4>No achievements found</h4>
                    <p>Try changing your filter or complete more challenges!</p>
                </div>
            </div>
        `;
    }

    /**
     * Get achievement rarity based on difficulty
     */
    getAchievementRarity(achievementId) {
        const rarityMap = {
            'first_challenge': 'common',
            'streak_3': 'common',
            'streak_7': 'uncommon',
            'challenge_10': 'uncommon',
            'challenge_25': 'rare',
            'array_expert': 'rare',
            'algorithm_wizard': 'epic'
        };
        return rarityMap[achievementId] || 'common';
    }

    /**
     * Get achievement rarity label
     */
    getAchievementRarityLabel(achievementId) {
        const labelMap = {
            'first_challenge': 'Common',
            'streak_3': 'Common',
            'streak_7': 'Uncommon',
            'challenge_10': 'Uncommon',
            'challenge_25': 'Rare',
            'array_expert': 'Rare',
            'algorithm_wizard': 'Epic'
        };
        return labelMap[achievementId] || 'Common';
    }

    /**
     * Get achievement progress information
     */
    getAchievementProgressInfo(achievement, unlocked) {
        if (unlocked) {
            return `
                <div class="achievement-completed">
                    <i class="fas fa-check-circle"></i>
                    <span>Achievement Completed!</span>
                </div>
            `;
        }

        // Generate progress hints based on achievement type
        let progressHint = '';
        const current = this.getUserProgressForAchievement(achievement.id);
        const target = this.getAchievementTarget(achievement.id);

        if (current && target) {
            const percentage = Math.min((current / target) * 100, 100);
            progressHint = `
                <div class="achievement-progress-bar">
                    <div class="progress-hint-text">Progress: ${current}/${target}</div>
                    <div class="mini-progress-bar">
                        <div class="mini-progress-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
        } else {
            progressHint = `
                <div class="achievement-hint">
                    <i class="fas fa-lightbulb"></i>
                    <span>${this.getAchievementHint(achievement.id)}</span>
                </div>
            `;
        }

        return progressHint;
    }

    /**
     * Get user progress for specific achievement
     */
    getUserProgressForAchievement(achievementId) {
        switch (achievementId) {
            case 'challenge_10':
            case 'challenge_25':
                return this.userData.totalChallenges;
            case 'streak_3':
            case 'streak_7':
                return this.userData.streakData.current;
            case 'array_expert':
                return this.userData.skillProgress.arrays;
            case 'algorithm_wizard':
                return this.userData.skillProgress.algorithms;
            default:
                return null;
        }
    }

    /**
     * Get achievement target value
     */
    getAchievementTarget(achievementId) {
        const targets = {
            'challenge_10': 10,
            'challenge_25': 25,
            'streak_3': 3,
            'streak_7': 7,
            'array_expert': 5,
            'algorithm_wizard': 5
        };
        return targets[achievementId];
    }

    /**
     * Get achievement hint
     */
    getAchievementHint(achievementId) {
        const hints = {
            'first_challenge': 'Complete any coding challenge to get started!',
            'streak_3': 'Code for 3 consecutive days',
            'streak_7': 'Maintain your coding streak for a full week',
            'challenge_10': 'Solve more coding challenges',
            'challenge_25': 'Keep solving challenges to reach this milestone',
            'array_expert': 'Focus on array-based coding problems',
            'algorithm_wizard': 'Master algorithmic problem solving'
        };
        return hints[achievementId] || 'Keep coding to unlock this achievement!';
    }

    /**
     * Get achievement points/XP value
     */
    getAchievementPoints(achievementId) {
        const points = {
            'first_challenge': 50,
            'streak_3': 100,
            'streak_7': 250,
            'challenge_10': 300,
            'challenge_25': 750,
            'array_expert': 500,
            'algorithm_wizard': 1000
        };
        return points[achievementId] || 50;
    }

    /**
     * Calculate total XP earned
     */
    calculateTotalXP() {
        return this.userData.achievements.reduce((total, achievementId) => {
            return total + this.getAchievementPoints(achievementId);
        }, 0);
    }

    /**
     * Generate progress markers for progress bar
     */
    generateProgressMarkers(total, unlocked) {
        const markers = [];
        const markerPositions = [25, 50, 75, 100];

        markerPositions.forEach(position => {
            const achieved = (unlocked / total) * 100 >= position;
            markers.push(`
                <div class="progress-marker ${achieved ? 'achieved' : ''}" style="left: ${position}%">
                    <div class="marker-dot"></div>
                    <div class="marker-label">${position}%</div>
                </div>
            `);
        });

        return markers.join('');
    }

    /**
     * Generate skills legend for the radar chart
     */
    generateSkillsLegend() {
        const skills = Object.entries(this.userData.skillProgress);
        const maxSkill = Math.max(...skills.map(([, count]) => count));

        return skills.map(([skill, count]) => {
            const percentage = maxSkill > 0 ? Math.round((count / maxSkill) * 100) : 0;
            const skillIcon = this.getSkillIcon(skill);

            return `
                <div class="legend-item-professional">
                    <div class="legend-icon">
                        <i class="${skillIcon}"></i>
                    </div>
                    <div class="legend-content">
                        <span class="legend-skill-name">${skill.charAt(0).toUpperCase() + skill.slice(1)}</span>
                        <div class="legend-progress">
                            <div class="legend-bar">
                                <div class="legend-fill" style="width: ${percentage}%"></div>
                            </div>
                            <span class="legend-value">${count}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Get icon for skill type
     */
    getSkillIcon(skill) {
        const iconMap = {
            'arrays': 'fas fa-list',
            'strings': 'fas fa-font',
            'algorithms': 'fas fa-project-diagram',
            'data-structures': 'fas fa-sitemap',
            'frontend': 'fab fa-html5',
            'backend': 'fas fa-server',
            'fullstack': 'fas fa-layer-group'
        };
        return iconMap[skill] || 'fas fa-code';
    }

    /**
     * Calculate weekly total challenges
     */
    calculateWeeklyTotal() {
        const today = new Date();
        let weeklyTotal = 0;

        for (let i = 0; i < 7; i++) {
            const date = new Date(today.getTime() - i * 86400000);
            const dateStr = date.toISOString().split('T')[0];
            const activity = this.userData.dailyActivity[dateStr];
            if (activity) {
                weeklyTotal += activity.challenges || 0;
            }
        }

        return weeklyTotal;
    }

    /**
     * Generate activity insights
     */
    generateActivityInsights() {
        const weeklyTotal = this.calculateWeeklyTotal();
        const streakDays = this.userData.streakData.current;
        const avgDaily = weeklyTotal / 7;

        const insights = [];

        // Streak insight
        if (streakDays >= 7) {
            insights.push({
                icon: 'fas fa-fire',
                text: `Amazing ${streakDays}-day streak!`,
                type: 'positive'
            });
        } else if (streakDays >= 3) {
            insights.push({
                icon: 'fas fa-fire',
                text: `Good ${streakDays}-day streak`,
                type: 'neutral'
            });
        } else {
            insights.push({
                icon: 'fas fa-target',
                text: 'Build your streak!',
                type: 'motivational'
            });
        }

        // Activity insight
        if (avgDaily >= 2) {
            insights.push({
                icon: 'fas fa-chart-line',
                text: 'High activity level',
                type: 'positive'
            });
        } else if (avgDaily >= 1) {
            insights.push({
                icon: 'fas fa-chart-line',
                text: 'Steady progress',
                type: 'neutral'
            });
        } else {
            insights.push({
                icon: 'fas fa-rocket',
                text: 'Room for improvement',
                type: 'motivational'
            });
        }

        return insights.map(insight => `
            <div class="insight-item-professional insight-${insight.type}">
                <div class="insight-icon">
                    <i class="${insight.icon}"></i>
                </div>
                <span class="insight-text">${insight.text}</span>
            </div>
        `).join('');
    }

    /**
     * Initialize achievement filter functionality
     */
    initializeAchievementFilters() {
        const filterTabs = document.querySelectorAll('.filter-tab-professional');
        const achievementCards = document.querySelectorAll('.achievement-card-professional');
        const emptyState = document.querySelector('.achievements-empty-state');

        // Filter tab functionality
        filterTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();

                // Remove active class from all tabs
                filterTabs.forEach(t => t.classList.remove('active'));

                // Add active class to clicked tab
                tab.classList.add('active');

                const filter = tab.dataset.filter;
                let visibleCount = 0;

                // Filter achievement cards
                achievementCards.forEach((card, index) => {
                    const isUnlocked = card.classList.contains('achievement-unlocked');
                    const rarity = card.dataset.rarity;
                    let shouldShow = true;

                    switch (filter) {
                        case 'unlocked':
                            shouldShow = isUnlocked;
                            break;
                        case 'locked':
                            shouldShow = !isUnlocked;
                            break;
                        case 'rare':
                            shouldShow = rarity === 'rare' || rarity === 'epic';
                            break;
                        case 'all':
                        default:
                            shouldShow = true;
                            break;
                    }

                    if (shouldShow) {
                        card.style.display = 'block';
                        card.style.animationDelay = `${visibleCount * 0.05}s`;
                        card.classList.add('filter-show');
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                        card.classList.remove('filter-show');
                    }
                });

                // Show/hide empty state
                if (emptyState) {
                    emptyState.style.display = visibleCount === 0 ? 'flex' : 'none';
                }

                // Add visual feedback with improved animation
                tab.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    tab.style.transform = 'scale(1)';
                }, 150);

                // Update tab indicator
                const indicator = tab.querySelector('.tab-indicator');
                if (indicator) {
                    indicator.classList.add('active-pulse');
                    setTimeout(() => {
                        indicator.classList.remove('active-pulse');
                    }, 300);
                }
            });

            // Add hover effects
            tab.addEventListener('mouseenter', () => {
                if (!tab.classList.contains('active')) {
                    tab.style.transform = 'translateY(-2px)';
                }
            });

            tab.addEventListener('mouseleave', () => {
                if (!tab.classList.contains('active')) {
                    tab.style.transform = 'translateY(0)';
                }
            });
        });

        // Achievement card click interactions
        achievementCards.forEach(card => {
            card.addEventListener('click', () => {
                const achievementId = card.dataset.achievementId;
                const achievement = this.achievements.getAllAchievements().find(a => a.id === achievementId);
                const isUnlocked = this.userData.achievements.includes(achievementId);

                if (achievement) {
                    this.showAchievementModal(achievement, isUnlocked);
                }

                // Add click feedback
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 150);
            });

            // Enhanced hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                card.classList.add('card-hover-active');

                // Add subtle sound effect simulation
                const hoverOverlay = card.querySelector('.achievement-hover-overlay');
                if (hoverOverlay) {
                    hoverOverlay.classList.add('hover-active');
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.classList.remove('card-hover-active');

                const hoverOverlay = card.querySelector('.achievement-hover-overlay');
                if (hoverOverlay) {
                    hoverOverlay.classList.remove('hover-active');
                }
            });
        });

        // Add intersection observer for scroll animations
        this.initializeScrollAnimations();
    }

    /**
     * Initialize scroll-based animations
     */
    initializeScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe achievement cards
        document.querySelectorAll('.achievement-card-professional').forEach(card => {
            observer.observe(card);
        });

        // Observe overview cards
        document.querySelectorAll('.achievement-overview-card').forEach(card => {
            observer.observe(card);
        });
    }

    /**
     * Show achievement modal with details
     */
    showAchievementModal(achievement, isUnlocked) {
        const modal = document.createElement('div');
        modal.className = 'achievement-modal-overlay-professional';

        const rarity = this.getAchievementRarity(achievement.id);
        const points = this.getAchievementPoints(achievement.id);
        const progressInfo = this.getAchievementProgressInfo(achievement, isUnlocked);

        modal.innerHTML = `
            <div class="achievement-modal-professional rarity-${rarity}">
                <div class="modal-backdrop-glow rarity-${rarity}"></div>
                
                <div class="achievement-modal-header-professional">
                    <div class="modal-header-content">
                        <div class="achievement-modal-icon-large ${isUnlocked ? 'unlocked' : 'locked'}">
                            <div class="icon-background rarity-${rarity}"></div>
                            <div class="icon-glow"></div>
                            <span class="icon-main">${achievement.icon}</span>
                            ${isUnlocked ? '<div class="unlock-crown"><i class="fas fa-crown"></i></div>' : ''}
                        </div>
                        
                        <div class="modal-status-section">
                            <div class="status-badge-large ${isUnlocked ? 'unlocked' : 'locked'}">
                                <i class="fas ${isUnlocked ? 'fa-trophy' : 'fa-lock'}"></i>
                                <span>${isUnlocked ? 'Achievement Unlocked' : 'Achievement Locked'}</span>
                            </div>
                            
                            <div class="rarity-badge-large rarity-${rarity}">
                                <i class="fas fa-gem"></i>
                                <span>${this.getAchievementRarityLabel(achievement.id)} Achievement</span>
                            </div>
                        </div>
                    </div>
                    
                    <button class="achievement-modal-close-professional">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="achievement-modal-body-professional">
                    <div class="achievement-details-section">
                        <h3 class="achievement-modal-title-large">${achievement.name}</h3>
                        <p class="achievement-modal-description-large">${achievement.description}</p>
                        
                        <div class="achievement-stats-grid">
                            <div class="stat-item">
                                <div class="stat-icon">
                                    <i class="fas fa-star"></i>
                                </div>
                                <div class="stat-content">
                                    <span class="stat-label">Reward</span>
                                    <span class="stat-value">${points} XP</span>
                                </div>
                            </div>
                            
                            <div class="stat-item">
                                <div class="stat-icon">
                                    <i class="fas fa-gem"></i>
                                </div>
                                <div class="stat-content">
                                    <span class="stat-label">Rarity</span>
                                    <span class="stat-value">${this.getAchievementRarityLabel(achievement.id)}</span>
                                </div>
                            </div>
                            
                            <div class="stat-item">
                                <div class="stat-icon">
                                    <i class="fas ${isUnlocked ? 'fa-calendar-check' : 'fa-target'}"></i>
                                </div>
                                <div class="stat-content">
                                    <span class="stat-label">Status</span>
                                    <span class="stat-value">${isUnlocked ? 'Completed' : 'In Progress'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="achievement-progress-section">
                        <h4>Progress Details</h4>
                        <div class="progress-details-content">
                            ${progressInfo}
                        </div>
                        
                        ${!isUnlocked ? `
                            <div class="achievement-tips">
                                <h5><i class="fas fa-lightbulb"></i> Tips to Unlock</h5>
                                <p>${this.getAchievementHint(achievement.id)}</p>
                            </div>
                        ` : `
                            <div class="achievement-celebration">
                                <h5><i class="fas fa-party-horn"></i> Congratulations!</h5>
                                <p>You've successfully earned this ${this.getAchievementRarityLabel(achievement.id).toLowerCase()} achievement!</p>
                            </div>
                        `}
                    </div>
                </div>
                
                <div class="achievement-modal-footer-professional">
                    <div class="modal-actions">
                        ${isUnlocked ? `
                            <button class="btn-share-achievement">
                                <i class="fas fa-share-alt"></i>
                                Share Achievement
                            </button>
                        ` : `
                            <button class="btn-view-challenges">
                                <i class="fas fa-code"></i>
                                View Challenges
                            </button>
                        `}
                        
                        <button class="btn-close-modal">
                            <i class="fas fa-times"></i>
                            Close
                        </button>
                    </div>
                </div>
                
                ${isUnlocked ? '<div class="modal-celebration-particles"></div>' : ''}
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal functionality
        const closeBtn = modal.querySelector('.achievement-modal-close-professional');
        const closeBtnFooter = modal.querySelector('.btn-close-modal');

        const closeModal = () => {
            modal.classList.add('modal-closing');
            setTimeout(() => modal.remove(), 300);
        };

        closeBtn.addEventListener('click', closeModal);
        closeBtnFooter.addEventListener('click', closeModal);

        // Share functionality (if unlocked)
        const shareBtn = modal.querySelector('.btn-share-achievement');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.shareAchievement(achievement);
            });
        }

        // View challenges functionality (if locked)
        const viewChallengesBtn = modal.querySelector('.btn-view-challenges');
        if (viewChallengesBtn) {
            viewChallengesBtn.addEventListener('click', () => {
                closeModal();
                // Navigate to challenges page (implement as needed)
                window.location.href = '/pages/challenges.html';
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Escape key to close
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);

        // Add entrance animation
        setTimeout(() => {
            modal.classList.add('modal-show');
        }, 10);
    }

    /**
     * Share achievement functionality
     */
    shareAchievement(achievement) {
        const shareText = `🏆 I just unlocked the "${achievement.name}" achievement in CodeClip! ${achievement.description} #CodeClip #Achievement`;

        if (navigator.share) {
            navigator.share({
                title: 'CodeClip Achievement Unlocked!',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                this.showNotification('Achievement details copied to clipboard!', 'info');
            });
        }
    }

    /**
     * Hide loading and populate enhanced dashboard with real data
     */
    hideLoadingAndPopulateEnhancedDashboard() {
        const loadingElement = document.querySelector('.dashboard-loading');
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }

        // Create the dashboard structure in the container
        const container = document.getElementById('progress-dashboard-container');
        if (container) {
            const { skillProgress, streakData, totalChallenges } = this.userData;
            const achievements = this.userData.achievements || [];

            container.innerHTML = `
                <div class="progress-dashboard">
                    <div class="dashboard-header">
                        <div class="header-content">
                            <div class="header-icon-container">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="header-text-section">
                                <h2 class="dashboard-main-title">Progress Analytics Dashboard</h2>
                                <p class="dashboard-subtitle">Monitor your development journey, track achievements, and analyze coding performance</p>
                            </div>
                            <div class="header-badge">
                                <span class="badge-text">Professional</span>
                            </div>
                        </div>
                    </div>

                    <div class="dashboard-stats">
                        <div class="stat-card">
                            <div class="stat-icon">🎯</div>
                            <div class="stat-content">
                                <h3>${totalChallenges}</h3>
                                <p>Challenges Completed</p>
                            </div>
                        </div>

                        <div class="stat-card">
                            <div class="stat-icon">🔥</div>
                            <div class="stat-content">
                                <h3>${streakData.current}</h3>
                                <p>Current Streak</p>
                            </div>
                        </div>

                        <div class="stat-card">
                            <div class="stat-icon">🏆</div>
                            <div class="stat-content">
                                <h3>${streakData.longest}</h3>
                                <p>Longest Streak</p>
                            </div>
                        </div>

                        <div class="stat-card">
                            <div class="stat-icon">⭐</div>
                            <div class="stat-content">
                                <h3>${achievements.length}</h3>
                                <p>Achievements</p>
                            </div>
                        </div>
                    </div>

                    <div class="analytics-section-professional">
                        <div class="section-header-professional">
                            <h3 class="section-title-professional">
                                <i class="fas fa-chart-line"></i>
                                Performance Analytics & Activity
                            </h3>
                            <p class="section-subtitle-professional">Visualize your coding progress and daily activity</p>
                        </div>
                        
                        <div class="analytics-grid-professional">
                            <div class="chart-card-professional">
                                <div class="chart-card-header">
                                    <div class="chart-icon-container">
                                        <i class="fas fa-brain"></i>
                                    </div>
                                    <div class="chart-title-section">
                                        <h4 class="chart-title-main">Skills Progress</h4>
                                        <p class="chart-subtitle">Track your expertise across different domains</p>
                                    </div>
                                    <div class="chart-stats-badge">
                                        <span class="stats-value">${Object.values(this.userData.skillProgress).reduce((a, b) => a + b, 0)}</span>
                                        <span class="stats-label">Total Points</span>
                                    </div>
                                </div>
                                <div class="chart-content-wrapper">
                                    <div class="chart-canvas-container">
                                        <canvas id="skillProgressChart" width="400" height="250"></canvas>
                                    </div>
                                    <div class="chart-legend-professional">
                                        ${this.generateSkillsLegend()}
                                    </div>
                                </div>
                            </div>

                            <div class="chart-card-professional">
                                <div class="chart-card-header">
                                    <div class="chart-icon-container activity">
                                        <i class="fas fa-calendar-check"></i>
                                    </div>
                                    <div class="chart-title-section">
                                        <h4 class="chart-title-main">Weekly Activity</h4>
                                        <p class="chart-subtitle">Your coding consistency over the past week</p>
                                    </div>
                                    <div class="chart-stats-badge">
                                        <span class="stats-value">${this.calculateWeeklyTotal()}</span>
                                        <span class="stats-label">This Week</span>
                                    </div>
                                </div>
                                <div class="chart-content-wrapper">
                                    <div class="chart-canvas-container">
                                        <canvas id="weeklyActivityChart" width="400" height="250"></canvas>
                                    </div>
                                    <div class="activity-insights-professional">
                                        ${this.generateActivityInsights()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="achievements-section-professional">
                        <div class="section-header-professional">
                            <h3 class="section-title-professional">
                                <i class="fas fa-trophy"></i>
                                Achievements & Milestones
                            </h3>
                            <p class="section-subtitle-professional">Track your coding journey and unlock rewards</p>
                        </div>
                        <div class="achievements-content">
                            ${this.renderAchievements()}
                        </div>
                    </div>
                </div>
            `;
        }
    }

    /**
     * Populate skills data in the enhanced dashboard
     */
    populateSkillsData() {
        const skillItems = document.querySelectorAll('.skill-item');
        const skillsData = [
            { name: 'JavaScript', progress: 85, icon: 'fab fa-js-square' },
            { name: 'Python', progress: Math.min(90, this.userData.skillProgress.algorithms * 10 + 50), icon: 'fab fa-python' },
            { name: 'React', progress: Math.min(95, this.userData.skillProgress.frontend * 15 + 60), icon: 'fab fa-react' },
            { name: 'Algorithms', progress: Math.min(85, this.userData.skillProgress['data-structures'] * 12 + 40), icon: 'fas fa-database' }
        ];

        skillItems.forEach((item, index) => {
            if (skillsData[index]) {
                const skillData = skillsData[index];
                const progressBar = item.querySelector('.skill-bar');
                const percentage = item.querySelector('.skill-percentage');

                if (progressBar) {
                    progressBar.style.setProperty('--progress', `${skillData.progress}%`);
                }

                if (percentage) {
                    percentage.textContent = `${skillData.progress}%`;
                }
            }
        });
    }

    /**
     * Populate activity timeline data
     */
    populateActivityData() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const recentActivities = this.getRecentActivities();

        timelineItems.forEach((item, index) => {
            if (recentActivities[index]) {
                const activity = recentActivities[index];
                const title = item.querySelector('.timeline-content h4');
                const description = item.querySelector('.timeline-content p');
                const time = item.querySelector('.timeline-time');

                if (title) title.textContent = activity.title;
                if (description) description.textContent = activity.description;
                if (time) time.textContent = activity.time;
            }
        });
    }

    /**
     * Get recent activities for timeline
     */
    getRecentActivities() {
        const activities = [];
        const completedChallenges = this.userData.completedChallenges;

        // Recent challenge completion
        if (completedChallenges.length > 0) {
            const lastChallenge = completedChallenges[completedChallenges.length - 1];
            const challengeName = lastChallenge.split('_')[0];
            activities.push({
                title: `Completed "${challengeName}" Challenge`,
                description: 'Successfully solved with optimal approach',
                time: '2 hours ago'
            });
        }

        // Recent achievements
        if (this.userData.achievements.length > 0) {
            const lastAchievement = this.userData.achievements[this.userData.achievements.length - 1];
            const achievementData = this.achievements.getAllAchievements().find(a => a.id === lastAchievement);
            const achievementName = achievementData ? achievementData.name : 'Problem Solver';

            activities.push({
                title: `Achievement Unlocked: ${achievementName}`,
                description: `Earned ${this.userData.achievements.length} achievements total`,
                time: '1 day ago'
            });
        }

        // Streak information
        if (this.userData.streakData.current > 0) {
            activities.push({
                title: `Streak Extended to ${this.userData.streakData.current} Days`,
                description: 'Keep up the consistent practice!',
                time: `${this.userData.streakData.current} days ago`
            });
        }

        // Recent skill progress
        const skillEntries = Object.entries(this.userData.skillProgress);
        const topSkill = skillEntries.reduce((a, b) => a[1] > b[1] ? a : b, ['', 0]);
        if (topSkill[1] > 0) {
            activities.push({
                title: `${topSkill[0].charAt(0).toUpperCase() + topSkill[0].slice(1)} Progress`,
                description: `Improved skills with ${topSkill[1]} completed challenges`,
                time: '3 days ago'
            });
        }

        // Fill with default activities if needed
        while (activities.length < 3) {
            activities.push({
                title: 'Welcome to CodeClip!',
                description: 'Start completing challenges to see your activity here',
                time: 'Just now'
            });
        }

        return activities;
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
                    label: 'Skills Progress',
                    data: skills.map(([, count]) => count),
                    backgroundColor: 'rgba(102, 126, 234, 0.15)',
                    borderColor: 'rgba(102, 126, 234, 1)',
                    borderWidth: 3,
                    pointBackgroundColor: 'rgba(102, 126, 234, 1)',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgba(102, 126, 234, 1)',
                    pointHoverBorderColor: '#ffffff',
                    pointHoverBorderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: 'rgba(102, 126, 234, 1)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            title: function (context) {
                                return context[0].label + ' Skills';
                            },
                            label: function (context) {
                                return `Completed: ${context.parsed.r} challenges`;
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: Math.max(...skills.map(([, count]) => count)) + 2,
                        grid: {
                            color: 'rgba(148, 163, 184, 0.3)',
                            lineWidth: 1
                        },
                        angleLines: {
                            color: 'rgba(148, 163, 184, 0.3)',
                            lineWidth: 1
                        },
                        pointLabels: {
                            color: '#475569',
                            font: {
                                size: 12,
                                weight: '600'
                            }
                        },
                        ticks: {
                            color: '#64748b',
                            font: {
                                size: 10
                            },
                            backdropColor: 'transparent'
                        }
                    }
                },
                elements: {
                    line: {
                        tension: 0.2
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
                    backgroundColor: last7Days.map((day, index) => {
                        const opacity = day.challenges > 0 ? 0.8 : 0.3;
                        return `rgba(34, 197, 94, ${opacity})`;
                    }),
                    borderColor: 'rgba(34, 197, 94, 1)',
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                    hoverBackgroundColor: 'rgba(34, 197, 94, 0.9)',
                    hoverBorderColor: 'rgba(34, 197, 94, 1)',
                    hoverBorderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: 'rgba(34, 197, 94, 1)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            title: function (context) {
                                return context[0].label;
                            },
                            label: function (context) {
                                const challenges = context.parsed.y;
                                return challenges === 1 ? '1 challenge completed' : `${challenges} challenges completed`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#475569',
                            font: {
                                size: 12,
                                weight: '600'
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(148, 163, 184, 0.2)',
                            lineWidth: 1
                        },
                        ticks: {
                            stepSize: 1,
                            color: '#64748b',
                            font: {
                                size: 11
                            },
                            callback: function (value) {
                                return Number.isInteger(value) ? value : '';
                            }
                        }
                    }
                },
                elements: {
                    bar: {
                        borderRadius: 8
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
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
                this.initializeAchievementFilters();
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

        // Enhanced notification with icon and better structure
        const icon = type === 'achievement' ? '🏆' : type === 'streak' ? '🔥' : 'ℹ️';

        notification.innerHTML = `
            <div class="notification-icon">${icon}</div>
            <div class="notification-content">
                <div class="notification-title">${this.getNotificationTitle(message, type)}</div>
                <div class="notification-message">${this.getNotificationMessage(message, type)}</div>
                <div class="notification-time">${this.getTimeAgo(new Date())}</div>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">×</button>
        `;

        document.body.appendChild(notification);

        // Add entrance animation
        setTimeout(() => {
            notification.classList.add('notification-show');
        }, 100);

        // Auto remove after 6 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.classList.add('notification-fade');
                setTimeout(() => notification.remove(), 300);
            }
        }, 6000);
    }

    /**
     * Get notification title based on message and type
     */
    getNotificationTitle(message, type) {
        if (type === 'achievement') {
            if (message.includes('Problem Solver')) return 'Achievement Unlocked: Problem Solver';
            if (message.includes('First Steps')) return 'Achievement Unlocked: First Steps';
            if (message.includes('Week Warrior')) return 'Achievement Unlocked: Week Warrior';
            return 'Achievement Unlocked!';
        }
        if (type === 'streak') {
            return message.includes('Streak') ? message.split(':')[0] : 'Streak Updated!';
        }
        return 'Notification';
    }

    /**
     * Get notification message content
     */
    getNotificationMessage(message, type) {
        if (type === 'achievement') {
            if (message.includes('Problem Solver')) return 'Earned 4 achievements total';
            if (message.includes('First Steps')) return 'Completed your first challenge';
            return 'Keep up the great work!';
        }
        if (type === 'streak') {
            return 'Keep up the consistent practice!';
        }
        return message;
    }

    /**
     * Get time ago string
     */
    getTimeAgo(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        return 'Just now';
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
