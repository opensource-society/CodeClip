Table of Contents
Getting Started
Contribution Workflow
Issue Guidelines
Coding Standards
Branching & Commits
Pull Request Process
Code of Conduct
Developer Resources

1. Getting Started
Fork the repository
Click “Fork” in the top-right corner of the CodeClip GitHub page to create your own copy.

Clone your fork

git clone https://github.com/<your-username>/CodeClip.git
cd CodeClip
Install Live Server (optional)

In VS Code, install the Live Server extension
Right-click index.html → “Open with Live Server”
Explore the codebase

index.html: Landing/dashboard
pages/: challenges.html, editor.html, profile.html
styles/: CSS modules and theme files
scripts/: ES6 modules (app.js, storage.js, etc.)

2. Contribution Workflow
We follow a standard fork-and-branch workflow:

Create a new branch for your feature or bugfix:
git checkout -b feat/
Write code, tests, and documentation.
Commit early & often, following commit guidelines below.
Push your branch:
git push origin feat/
Open a Pull Request against main.
3. Issue Guidelines
Good First Issues: Tagged Level 1 for beginners; simple HTML/CSS tasks.
Intermediate Issues: Level 2 for JS features, UI enhancements.
Advanced Issues: Level 3 for architecture, performance, AI integration.
Before creating a new issue, search existing issues to avoid duplicates. Use the template when opening issues:

**Title**: Short description  
**Description**: What problem does this solve?  
**Steps to Reproduce** (for bugs) or **Proposed Solution** (for features)  
**Labels**: feature / bug / Level 1 / Level 2 / Level 3  
4. Coding Standards
HTML: Use semantic tags, include aria-* for accessibility.
CSS: Follow BEM class naming; mobile-first, responsive design.
JavaScript:
ES6+ syntax (arrow functions, const/let)
Modular code: one class or module per file
Comprehensive error handling
JSDoc comments for public functions
Run linting before committing:

npm install
npm run lint
5. Branching & Commits
Branch from main, name branches:

feat/ for features
fix/ for bug fixes
docs/ for documentation
Commit message format:

 <type>(<scope>): <subject>

 <body>        # optional detailed description
 <footer>      # references issue number, e.g., Closes #42

type: feat, fix, docs, chore, test
scope: module or feature name
Example:

feat(editor): add dark-mode toggle

Users can now switch between light and dark themes directly in the code editor.
Closes #17
6. Pull Request Process
Ensure your branch is up to date with main:
git fetch origin
git rebase origin/main
Push your branch and open a PR against main.
Use the PR template to describe changes and link related issues.
Reviewers will comment; address feedback, add commits as needed.
Once approved and CI checks pass, a maintainer will merge.
7. Code of Conduct
This project follows the Contributor Covenant v2.1. Please read and adhere to it:

Be respectful and inclusive.
Report unacceptable behavior to project maintainers.
Encourage open communication.
8. Developer Resources
Architecture Diagram: docs/architecture.png
Feature Specifications: docs/FEATURE_SPECIFICATIONS.md
Implementation Roadmap: docs/IMPLEMENTATION_ROADMAP.md
Testing Guide: docs/TESTING.md
AI Integration Notes: docs/AI_PLANNING.md