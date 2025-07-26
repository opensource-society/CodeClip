/* === SMART PROGRESS DASHBOARD DEMO DATA START === */
/**
 * Demo data setup for Progress Dashboard
 * This script adds sample progress data to demonstrate the dashboard features
 */

// Demo data setup function
function setupDemoData() {
    // Check if demo data already exists
    const existingData = localStorage.getItem('codeclip_progress_data');
    if (existingData) {
        const parsed = JSON.parse(existingData);
        if (parsed.totalChallenges > 0) {
            // Demo data already exists, don't override
            return;
        }
    }

    // Sample progress data
    const demoData = {
        startDate: new Date(Date.now() - 30 * 86400000).toISOString(), // 30 days ago
        totalChallenges: 12,
        completedChallenges: [
            'Two Sum_easy',
            'Valid Parentheses_easy',
            'Longest Palindromic Substring_medium',
            'Responsive Navbar_easy',
            'Binary Search Algorithm_medium',
            'CSS Card Component_easy',
            'To-Do List Application_easy',
            'Simple REST API Server_medium',
            'Merge K Sorted Lists_hard',
            'Database Schema Design_medium',
            'Weather API App_medium',
            'Sorting Visualizer_hard'
        ],
        dailyActivity: generateSampleActivity(),
        skillProgress: {
            arrays: 3,
            strings: 2,
            algorithms: 4,
            'data-structures': 2,
            frontend: 4,
            backend: 2,
            fullstack: 1
        },
        streakData: {
            current: 5,
            longest: 8,
            lastActiveDate: new Date().toISOString().split('T')[0]
        },
        achievements: [
            'first_challenge',
            'streak_3',
            'challenge_10',
            'array_expert'
        ],
        timeSpent: 2400, // 40 hours in minutes
        lastUpdated: new Date().toISOString()
    };

    // Save demo data
    localStorage.setItem('codeclip_progress_data', JSON.stringify(demoData));

    console.log('📊 Demo progress data loaded! Visit the Profile page to see your dashboard.');
}

// Generate sample daily activity for the last 30 days
function generateSampleActivity() {
    const activity = {};
    const today = new Date();

    // Add some random activity over the last 30 days
    for (let i = 0; i < 30; i++) {
        const date = new Date(today.getTime() - i * 86400000);
        const dateStr = date.toISOString().split('T')[0];

        // Random chance of activity (70% chance)
        if (Math.random() > 0.3) {
            const challenges = Math.floor(Math.random() * 3) + 1; // 1-3 challenges
            activity[dateStr] = {
                challenges: challenges,
                timeSpent: challenges * (30 + Math.random() * 60), // 30-90 mins per challenge
                difficulties: new Set(['easy', 'medium', 'hard'].slice(0, challenges)),
                categories: new Set(['arrays', 'algorithms', 'frontend'].slice(0, challenges))
            };
        }
    }

    return activity;
}

// Initialize demo data when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Only set up demo data if no real progress exists
    setupDemoData();
});

// Expose function globally for manual testing
window.setupDemoData = setupDemoData;

/* === SMART PROGRESS DASHBOARD DEMO DATA END === */
