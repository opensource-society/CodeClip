// Debug log to confirm script is loaded
console.log('challengeOfTheDay.js loaded');

/**
 * Challenge of the Day functionality
 * Displays a random coding challenge when the button is clicked
 */

// Array of coding challenges
const challenges = [
  {"title": "Two Sum", "difficulty": "Easy", "url": "https://leetcode.com/problems/two-sum/"},
  {"title": "Add Two Numbers", "difficulty": "Medium", "url": "https://leetcode.com/problems/add-two-numbers/"},
  {"title": "Longest Substring Without Repeating Characters", "difficulty": "Medium", "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/"},
  {"title": "Longest Palindromic Substring", "difficulty": "Medium", "url": "https://leetcode.com/problems/longest-palindromic-substring/"},
  {"title": "Zigzag Conversion", "difficulty": "Medium", "url": "https://leetcode.com/problems/zigzag-conversion/"},
  {"title": "Reverse Integer", "difficulty": "Medium", "url": "https://leetcode.com/problems/reverse-integer/"},
  {"title": "String to Integer (atoi)", "difficulty": "Medium", "url": "https://leetcode.com/problems/string-to-integer-atoi/"},
  {"title": "Palindrome Number", "difficulty": "Easy", "url": "https://leetcode.com/problems/palindrome-number/"},
  {"title": "Container With Most Water", "difficulty": "Medium", "url": "https://leetcode.com/problems/container-with-most-water/"},
  {"title": "Roman to Integer", "difficulty": "Easy", "url": "https://leetcode.com/problems/roman-to-integer/"},
  {"title": "Longest Common Prefix", "difficulty": "Easy", "url": "https://leetcode.com/problems/longest-common-prefix/"},
  {"title": "3Sum", "difficulty": "Medium", "url": "https://leetcode.com/problems/3sum/"},
  {"title": "3Sum Closest", "difficulty": "Medium", "url": "https://leetcode.com/problems/3sum-closest/"},
  {"title": "Letter Combinations of a Phone Number", "difficulty": "Medium", "url": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/"},
  {"title": "4Sum", "difficulty": "Medium", "url": "https://leetcode.com/problems/4sum/"},
  {"title": "Remove Nth Node From End of List", "difficulty": "Medium", "url": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/"},
  {"title": "Valid Parentheses", "difficulty": "Easy", "url": "https://leetcode.com/problems/valid-parentheses/"},
  {"title": "Merge Two Sorted Lists", "difficulty": "Easy", "url": "https://leetcode.com/problems/merge-two-sorted-lists/"},
  {"title": "Generate Parentheses", "difficulty": "Medium", "url": "https://leetcode.com/problems/generate-parentheses/"},
  {"title": "Merge k Sorted Lists", "difficulty": "Hard", "url": "https://leetcode.com/problems/merge-k-sorted-lists/"},
  {"title": "Swap Nodes in Pairs", "difficulty": "Medium", "url": "https://leetcode.com/problems/swap-nodes-in-pairs/"},
  {"title": "Remove Duplicates from Sorted Array", "difficulty": "Easy", "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/"},
  {"title": "Remove Element", "difficulty": "Easy", "url": "https://leetcode.com/problems/remove-element/"},
  {"title": "Find the Index of the First Occurrence in a String", "difficulty": "Easy", "url": "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/"},
  {"title": "Search in Rotated Sorted Array", "difficulty": "Medium", "url": "https://leetcode.com/problems/search-in-rotated-sorted-array/"},
  {"title": "Search Insert Position", "difficulty": "Easy", "url": "https://leetcode.com/problems/search-insert-position/"},
  {"title": "Valid Sudoku", "difficulty": "Medium", "url": "https://leetcode.com/problems/valid-sudoku/"},
  {"title": "Count and Say", "difficulty": "Medium", "url": "https://leetcode.com/problems/count-and-say/"},
  {"title": "Combination Sum", "difficulty": "Medium", "url": "https://leetcode.com/problems/combination-sum/"},
  {"title": "Combination Sum II", "difficulty": "Medium", "url": "https://leetcode.com/problems/combination-sum-ii/"},
  {"title": "Multiply Strings", "difficulty": "Medium", "url": "https://leetcode.com/problems/multiply-strings/"},
  {"title": "Jump Game II", "difficulty": "Medium", "url": "https://leetcode.com/problems/jump-game-ii/"},
  {"title": "Permutations", "difficulty": "Medium", "url": "https://leetcode.com/problems/permutations/"},
  {"title": "Rotate Image", "difficulty": "Medium", "url": "https://leetcode.com/problems/rotate-image/"},
  {"title": "Group Anagrams", "difficulty": "Medium", "url": "https://leetcode.com/problems/group-anagrams/"},
  {"title": "Maximum Subarray", "difficulty": "Medium", "url": "https://leetcode.com/problems/maximum-subarray/"},
  {"title": "Spiral Matrix", "difficulty": "Medium", "url": "https://leetcode.com/problems/spiral-matrix/"},
  {"title": "Jump Game", "difficulty": "Medium", "url": "https://leetcode.com/problems/jump-game/"},
  {"title": "Merge Intervals", "difficulty": "Medium", "url": "https://leetcode.com/problems/merge-intervals/"},
  {"title": "Insert Interval", "difficulty": "Medium", "url": "https://leetcode.com/problems/insert-interval/"},
  {"title": "Length of Last Word", "difficulty": "Easy", "url": "https://leetcode.com/problems/length-of-last-word/"},
  {"title": "Spiral Matrix II", "difficulty": "Medium", "url": "https://leetcode.com/problems/spiral-matrix-ii/"},
  {"title": "Rotate List", "difficulty": "Medium", "url": "https://leetcode.com/problems/rotate-list/"},
  {"title": "Unique Paths", "difficulty": "Medium", "url": "https://leetcode.com/problems/unique-paths/"},
  {"title": "Unique Paths II", "difficulty": "Medium", "url": "https://leetcode.com/problems/unique-paths-ii/"},
  {"title": "Minimum Path Sum", "difficulty": "Medium", "url": "https://leetcode.com/problems/minimum-path-sum/"},
  {"title": "Climbing Stairs", "difficulty": "Easy", "url": "https://leetcode.com/problems/climbing-stairs/"},
  {"title": "Simplify Path", "difficulty": "Medium", "url": "https://leetcode.com/problems/simplify-path/"},
  {"title": "Set Matrix Zeroes", "difficulty": "Medium", "url": "https://leetcode.com/problems/set-matrix-zeroes/"},
  {"title": "Search a 2D Matrix", "difficulty": "Medium", "url": "https://leetcode.com/problems/search-a-2d-matrix/"},
  {"title": "Sort Colors", "difficulty": "Medium", "url": "https://leetcode.com/problems/sort-colors/"}
];

// Function to show loading state
function showLoading() {
    const container = document.getElementById('challenge-container');
    if (container) {
        container.innerHTML = `
            <div class="loading-text">
                <div class="spinner"></div>
                <span>Generating your challenge...</span>
            </div>
        `;
    }
}

// Function to generate a random challenge
function generateRandomChallenge() {
    // Show loading state
    showLoading();
    
    // Simulate API call delay
    return new Promise((resolve) => {
        setTimeout(() => {
            // Generate a random index
            const randomIndex = Math.floor(Math.random() * challenges.length);
            resolve(challenges[randomIndex]);
        }, 500); // 0.5 second delay for better UX
    });
}

// Function to display a challenge
function displayChallenge(challenge) {
    const container = document.getElementById('challenge-container');
    if (container) {
        container.innerHTML = `
            <div class="challenge-card">
                <h3>${challenge.title}</h3>
                <span class="difficulty ${challenge.difficulty.toLowerCase()}">
                    <i class="fas fa-${challenge.difficulty === 'Easy' ? 'star' : challenge.difficulty === 'Medium' ? 'star-half-alt' : 'star'}"></i>
                    ${challenge.difficulty}
                </span>
                <div class="challenge-actions">
                    <a href="${challenge.url}" target="_blank" class="btn btn-solve">
                        <i class="fas fa-code"></i> Solve Challenge
                    </a>
                    <a href="https://leetcode.com/" target="_blank" class="btn btn-leetcode">
                        <i class="fab fa-java"></i> View on LeetCode
                    </a>
                </div>
            </div>
        `;
    }
}

// Add event listener when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the button element
    const generateBtn = document.getElementById('generateChallengeBtn');
    
    // Add click event listener to the button
    if (generateBtn) {
        generateBtn.addEventListener('click', async function() {
            // Add click effect
            this.classList.add('active');
            
            // Generate and display a random challenge
            const randomChallenge = await generateRandomChallenge();
            displayChallenge(randomChallenge);
            
            // Remove active class after animation completes
            setTimeout(() => {
                this.classList.remove('active');
            }, 200);
        });
        
        // Trigger a click after a short delay to show the first challenge automatically
        setTimeout(() => {
            generateBtn.click();
        }, 300);
    }
});
