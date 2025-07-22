# Contributing to CodeClip

Thank you for your interest in contributing to **CodeClip**! We welcome developers of all levels—especially GSSoC participants—to help build, improve, and maintain this open-source coding challenge vault.

## Table of Contents
1. Getting Started  
2. Contribution Workflow  
3. Issue Guidelines  
4. Coding Standards  
5. Branching & Commits  
6. Pull Request Process  
7. Code of Conduct  
8. Developer Resources  

## 1. Getting Started

1. **Fork the repository**  
   Click “Fork” in the top-right corner of the CodeClip GitHub page to create your own copy.

2. **Clone your fork**  
   ```bash
   git clone https://github.com/<your-username>/CodeClip.git
   cd CodeClip
   ```

3. **Install Live Server (optional)**  
   - In VS Code, install the **Live Server** extension  
   - Right-click `index.html` → “Open with Live Server”  

4. **Explore the codebase**  
   - **`index.html`**: Landing/dashboard  
   - **`pages/`**: `challenges.html`, `editor.html`, `profile.html`  
   - **`styles/`**: CSS modules and theme files  
   - **`scripts/`**: ES6 modules (`app.js`, `storage.js`, etc.)  

## 2. Contribution Workflow

We follow a standard fork-and-branch workflow:

1. Create a new branch for your feature or bugfix:  
   ```bash
   git checkout -b feat/
   ```
2. Write code, tests, and documentation.  
3. Commit early & often, following commit guidelines below.  
4. Push your branch:  
   ```bash
   git push origin feat/
   ```
5. Open a Pull Request against `main`.

## 3. Issue Guidelines

- **Good First Issues**: Tagged `Level 1` for beginners; simple HTML/CSS tasks.  
- **Intermediate Issues**: `Level 2` for JS features, UI enhancements.  
- **Advanced Issues**: `Level 3` for architecture, performance, AI integration.  

Before creating a new issue, search existing issues to avoid duplicates. Use the template when opening issues:

```markdown
**Title**: Short description  
**Description**: What problem does this solve?  
**Steps to Reproduce** (for bugs) or **Proposed Solution** (for features)  
**Labels**: feature / bug / Level 1 / Level 2 / Level 3  
```

## 4. Coding Standards

- **HTML**: Use semantic tags, include `aria-*` for accessibility.  
- **CSS**: Follow BEM class naming; mobile-first, responsive design.  
- **JavaScript**:  
  - ES6+ syntax (arrow functions, `const`/`let`)  
  - Modular code: one class or module per file  
  - Comprehensive error handling  
  - JSDoc comments for public functions  

Run linting before committing:

```bash
npm install
npm run lint
```

## 5. Branching & Commits

- Branch from `main`, name branches:  
  - `feat/` for features  
  - `fix/` for bug fixes  
  - `docs/` for documentation  

- Commit message format:  
  ```text
   <type>(<scope>): <subject>

   <body>        # optional detailed description
   <footer>      # references issue number, e.g., Closes #42

  ```
  - **type**: feat, fix, docs, chore, test  
  - **scope**: module or feature name  

Example:

```text
feat(editor): add dark-mode toggle

Users can now switch between light and dark themes directly in the code editor.
Closes #17
```

## 6. Pull Request Process

1. Ensure your branch is up to date with `main`:  
   ```bash
   git fetch origin
   git rebase origin/main
   ```
2. Push your branch and open a PR against `main`.  
3. Use the PR template to describe changes and link related issues.  
4. Reviewers will comment; address feedback, add commits as needed.  
5. Once approved and CI checks pass, a maintainer will merge.

## 7. Code of Conduct

This project follows the [Contributor Covenant v2.1](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). Please read and adhere to it:

- Be respectful and inclusive.  
- Report unacceptable behavior to project maintainers.  
- Encourage open communication.

## 8. Developer Resources

- **Architecture Diagram**: `docs/architecture.png`  
- **Feature Specifications**: `docs/FEATURE_SPECIFICATIONS.md`  
- **Implementation Roadmap**: `docs/IMPLEMENTATION_ROADMAP.md`  
- **Testing Guide**: `docs/TESTING.md`  
- **AI Integration Notes**: `docs/AI_PLANNING.md`  

Thank you for helping make CodeClip better! Your contributions power our community.