/* === GITHUB-STYLE LEARNING STREAK CALENDAR & GOAL SETTING INTERFACE === */

class StreakCalendar {
    constructor() {
        this.currentDate = new Date();
        this.calendarData = this.generateCalendarData();
        this.init();
    }

    init() {
        this.renderCalendar();
        this.updateStats();
        this.attachEventListeners();
    }

    generateCalendarData() {
        const data = {};
        const today = new Date();
        const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

        // Generate random activity data for the past year
        for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            // Simulate realistic coding patterns
            const dayOfWeek = d.getDay();
            let baseActivity = 0;

            // Higher activity on weekdays
            if (dayOfWeek >= 1 && dayOfWeek <= 5) {
                baseActivity = Math.random() * 4;
            } else {
                baseActivity = Math.random() * 2;
            }

            // Add some randomness and create streaks
            const activity = Math.floor(baseActivity * (0.5 + Math.random()));
            data[dateStr] = Math.min(activity, 4);
        }

        // Add current streak data
        const streakDays = 5;
        for (let i = 0; i < streakDays; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            data[dateStr] = Math.max(data[dateStr] || 0, 1);
        }

        return data;
    }

    renderCalendar() {
        const grid = document.getElementById('streak-calendar-grid');
        if (!grid) return;

        grid.innerHTML = '';

        const today = new Date();
        const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

        // Calculate the starting Sunday
        const startDate = new Date(oneYearAgo);
        startDate.setDate(startDate.getDate() - startDate.getDay());

        // Generate 53 weeks * 7 days
        for (let week = 0; week < 53; week++) {
            for (let day = 0; day < 7; day++) {
                const currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + (week * 7) + day);

                const dateStr = currentDate.toISOString().split('T')[0];
                const activity = this.calendarData[dateStr] || 0;

                const cell = document.createElement('div');
                cell.className = `calendar-cell level-${activity}`;

                if (this.isSameDay(currentDate, today)) {
                    cell.classList.add('today');
                }

                cell.dataset.date = dateStr;
                cell.dataset.activity = activity;

                // Add tooltip
                cell.addEventListener('mouseenter', (e) => this.showTooltip(e, currentDate, activity));
                cell.addEventListener('mouseleave', () => this.hideTooltip());

                grid.appendChild(cell);
            }
        }
    }

    showTooltip(event, date, activity) {
        const tooltip = document.createElement('div');
        tooltip.className = 'calendar-tooltip visible';

        const dateStr = date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        const activityText = activity === 0 ? 'No contributions' :
            activity === 1 ? '1 contribution' :
                `${activity} contributions`;

        tooltip.innerHTML = `
            <strong>${activityText}</strong><br>
            ${dateStr}
        `;

        document.body.appendChild(tooltip);

        const rect = event.target.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 + 'px';
        tooltip.style.top = rect.top - 10 + 'px';

        this.currentTooltip = tooltip;
    }

    hideTooltip() {
        if (this.currentTooltip) {
            this.currentTooltip.remove();
            this.currentTooltip = null;
        }
    }

    updateStats() {
        const currentStreak = this.calculateCurrentStreak();
        const longestStreak = this.calculateLongestStreak();
        const totalContributions = this.calculateTotalContributions();

        const currentStreakEl = document.getElementById('current-streak-display');
        const longestStreakEl = document.getElementById('longest-streak-display');
        const totalContribEl = document.getElementById('total-contributions');

        if (currentStreakEl) currentStreakEl.textContent = currentStreak;
        if (longestStreakEl) longestStreakEl.textContent = longestStreak;
        if (totalContribEl) totalContribEl.textContent = totalContributions;
    }

    calculateCurrentStreak() {
        const today = new Date();
        let streak = 0;

        for (let i = 0; i < 365; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            if (this.calendarData[dateStr] > 0) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    }

    calculateLongestStreak() {
        let maxStreak = 0;
        let currentStreak = 0;

        const sortedDates = Object.keys(this.calendarData).sort();

        for (const dateStr of sortedDates) {
            if (this.calendarData[dateStr] > 0) {
                currentStreak++;
                maxStreak = Math.max(maxStreak, currentStreak);
            } else {
                currentStreak = 0;
            }
        }

        return maxStreak;
    }

    calculateTotalContributions() {
        return Object.values(this.calendarData).reduce((sum, activity) => sum + activity, 0);
    }

    isSameDay(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    }

    attachEventListeners() {
        // Add any additional event listeners here
    }
}

class GoalManager {
    constructor() {
        this.goals = this.loadGoals();
        this.init();
    }

    init() {
        this.updateProgressRings();
        this.attachEventListeners();
    }

    loadGoals() {
        // Load goals from localStorage or return default goals
        const saved = localStorage.getItem('codeclip_goals');
        if (saved) {
            return JSON.parse(saved);
        }

        // Generate dynamic dates relative to current date
        const today = new Date();
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        const twoWeeksFromNow = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
        const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

        return {
            weekly: [
                {
                    id: 'w1',
                    title: 'Complete 5 Array Challenges',
                    description: 'Focus on fundamental array operations',
                    target: 5,
                    current: 5,
                    deadline: lastWeek.toISOString().split('T')[0],
                    status: 'completed',
                    category: 'challenges'
                },
                {
                    id: 'w2',
                    title: 'Maintain 7-Day Streak',
                    description: 'Code every day for a week straight',
                    target: 7,
                    current: 5,
                    deadline: nextWeek.toISOString().split('T')[0],
                    status: 'in-progress',
                    category: 'streak'
                },
                {
                    id: 'w3',
                    title: 'Learn React Hooks',
                    description: 'Complete 3 React hook challenges',
                    target: 3,
                    current: 1,
                    deadline: twoWeeksFromNow.toISOString().split('T')[0],
                    status: 'pending',
                    category: 'skills'
                }
            ],
            monthly: [
                {
                    id: 'm1',
                    title: 'Complete 25 Challenges',
                    description: 'Solve challenges across all difficulty levels',
                    target: 25,
                    current: 25,
                    deadline: lastWeek.toISOString().split('T')[0],
                    status: 'completed',
                    category: 'challenges'
                },
                {
                    id: 'm2',
                    title: 'Master Data Structures',
                    description: 'Complete 10 advanced data structure problems',
                    target: 10,
                    current: 6,
                    deadline: nextMonth.toISOString().split('T')[0],
                    status: 'in-progress',
                    category: 'skills'
                }
            ]
        };
    }

    saveGoals() {
        localStorage.setItem('codeclip_goals', JSON.stringify(this.goals));
    }

    updateProgressRings() {
        // Update weekly goals progress
        const weeklyCompleted = this.goals.weekly.filter(g => g.status === 'completed').length;
        const weeklyTotal = this.goals.weekly.length;
        const weeklyProgress = Math.round((weeklyCompleted / weeklyTotal) * 100);

        const weeklyRing = document.querySelector('.goal-category:first-child .progress-ring-fill');
        const weeklyPercentage = document.querySelector('.goal-category:first-child .progress-percentage');
        const weeklyText = document.querySelector('.goal-category:first-child .progress-text');

        if (weeklyRing) {
            const circumference = 2 * Math.PI * 16;
            const strokeDasharray = (weeklyProgress / 100) * circumference;
            weeklyRing.style.strokeDasharray = `${strokeDasharray} ${circumference}`;
        }
        if (weeklyPercentage) weeklyPercentage.textContent = `${weeklyProgress}%`;
        if (weeklyText) weeklyText.textContent = `${weeklyCompleted} of ${weeklyTotal} completed`;

        // Update monthly goals progress
        const monthlyCompleted = this.goals.monthly.filter(g => g.status === 'completed').length;
        const monthlyTotal = this.goals.monthly.length;
        const monthlyProgress = Math.round((monthlyCompleted / monthlyTotal) * 100);

        const monthlyRing = document.querySelector('.goal-category:last-child .progress-ring-fill');
        const monthlyPercentage = document.querySelector('.goal-category:last-child .progress-percentage');
        const monthlyText = document.querySelector('.goal-category:last-child .progress-text');

        if (monthlyRing) {
            const circumference = 2 * Math.PI * 16;
            const strokeDasharray = (monthlyProgress / 100) * circumference;
            monthlyRing.style.strokeDasharray = `${strokeDasharray} ${circumference}`;
        }
        if (monthlyPercentage) monthlyPercentage.textContent = `${monthlyProgress}%`;
        if (monthlyText) monthlyText.textContent = `${monthlyCompleted} of ${monthlyTotal} completed`;
    }

    attachEventListeners() {
        // Modal controls
        const createBtn = document.getElementById('create-new-goal');
        const modal = document.getElementById('goal-creation-modal');
        const closeBtn = document.getElementById('close-goal-modal');
        const cancelBtn = document.getElementById('cancel-goal-creation');
        const form = document.getElementById('goal-creation-form');
        const overlay = modal?.querySelector('.modal-overlay');

        if (createBtn && modal) {
            createBtn.addEventListener('click', () => {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }

        const closeModal = () => {
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                this.resetForm();
            }
        };

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
        if (overlay) overlay.addEventListener('click', closeModal);

        // Form submission
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.createGoal();
                closeModal();
            });
        }

        // Goal type change
        const goalTypeSelect = document.getElementById('goal-type-select');
        if (goalTypeSelect) {
            goalTypeSelect.addEventListener('change', (e) => {
                this.updateDeadlineBasedOnType(e.target.value);
            });
        }

        // Edit and delete buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.edit-goal')) {
                const goalCard = e.target.closest('.goal-card');
                this.editGoal(goalCard);
            }
            if (e.target.closest('.delete-goal')) {
                const goalCard = e.target.closest('.goal-card');
                this.deleteGoal(goalCard);
            }
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal?.classList.contains('active')) {
                closeModal();
            }
        });
    }

    updateDeadlineBasedOnType(type) {
        const deadlineInput = document.getElementById('goal-deadline-input');
        if (!deadlineInput) return;

        const today = new Date();
        let suggestedDate;

        switch (type) {
            case 'weekly':
                suggestedDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
                break;
            case 'monthly':
                suggestedDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
                break;
            default:
                suggestedDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
        }

        deadlineInput.value = suggestedDate.toISOString().split('T')[0];
    }

    createGoal() {
        const form = document.getElementById('goal-creation-form');
        if (!form) return;

        const formData = new FormData(form);
        const goalData = {
            id: 'goal_' + Date.now(),
            title: document.getElementById('goal-title-input').value,
            description: document.getElementById('goal-description-input').value,
            type: document.getElementById('goal-type-select').value,
            deadline: document.getElementById('goal-deadline-input').value,
            target: parseInt(document.getElementById('goal-target-input').value),
            category: document.getElementById('goal-category-select').value,
            current: 0,
            status: 'pending'
        };

        // Add to appropriate category
        if (goalData.type === 'weekly') {
            this.goals.weekly.push(goalData);
        } else {
            this.goals.monthly.push(goalData);
        }

        this.saveGoals();
        this.renderNewGoal(goalData);
        this.updateProgressRings();

        // Show success message
        this.showNotification('Goal created successfully!', 'success');
    }

    renderNewGoal(goal) {
        const category = goal.type === 'weekly' ? 'weekly' : 'monthly';
        const container = document.querySelector(`.goal-category:${category === 'weekly' ? 'first-child' : 'last-child'} .goals-grid`);
        if (!container) return;

        const goalCard = this.createGoalCardHTML(goal);
        container.insertAdjacentHTML('beforeend', goalCard);
    }

    createGoalCardHTML(goal) {
        const progressPercent = Math.round((goal.current / goal.target) * 100);
        const statusClass = goal.status;
        const statusIcon = goal.status === 'completed' ? 'fa-check' :
            goal.status === 'in-progress' ? 'fa-play' : 'fa-clock';

        return `
            <div class="goal-card ${statusClass}" data-goal-id="${goal.id}">
                <div class="goal-card-header">
                    <div class="goal-status-indicator ${statusClass}">
                        <i class="fas ${statusIcon}"></i>
                    </div>
                    <div class="goal-info">
                        <h5 class="goal-title">${goal.title}</h5>
                        <p class="goal-description">${goal.description}</p>
                    </div>
                    <div class="goal-actions">
                        <button class="action-btn edit-goal" title="Edit Goal">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete-goal" title="Delete Goal">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="goal-progress-section">
                    <div class="progress-bar-container">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progressPercent}%"></div>
                        </div>
                        <span class="progress-label">${goal.current}/${goal.target} completed</span>
                    </div>
                    <div class="goal-deadline">
                        <i class="fas fa-calendar"></i>
                        <span>Due ${new Date(goal.deadline).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        `;
    }

    editGoal(goalCard) {
        // Implementation for editing goals
        this.showNotification('Edit goal functionality coming soon!', 'info');
    }

    deleteGoal(goalCard) {
        if (!confirm('Are you sure you want to delete this goal?')) return;

        const goalId = goalCard.dataset.goalId;

        // Remove from data
        this.goals.weekly = this.goals.weekly.filter(g => g.id !== goalId);
        this.goals.monthly = this.goals.monthly.filter(g => g.id !== goalId);

        // Remove from DOM
        goalCard.remove();

        this.saveGoals();
        this.updateProgressRings();
        this.showNotification('Goal deleted successfully!', 'success');
    }

    resetForm() {
        const form = document.getElementById('goal-creation-form');
        if (form) form.reset();
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#22c55e' : '#3b82f6'};
            color: white;
            padding: 16px 20px;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the profile page
    if (window.location.pathname.includes('profile') || document.getElementById('streak-calendar-grid')) {
        window.streakCalendar = new StreakCalendar();
        window.goalManager = new GoalManager();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { StreakCalendar, GoalManager };
}
