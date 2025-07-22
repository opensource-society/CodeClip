---
name: Comprehensive Pull Request
about: Use this template for bug fixes, features, enhancements, documentation, or security updates.
title: "[PR] Fix: UI Enhancements and Bug Fixes"
---

## Type of Change

Please check all that apply:
- [x] Bug Fix
- [x] Feature
- [x] Enhancement
- [ ] Documentation
- [ ] Security
- [ ] Other (please specify below)

## Description

This pull request addresses several UI issues and introduces a new night theme feature. The changes include:

*   **UI Enhancements:**
    *   Introduced a more visually appealing color scheme and typography.
    *   Added subtle animations and transitions to improve the user experience.
    *   Refined the layout and spacing of various UI components.
*   **Bug Fixes:**
    *   Fixed an issue where fonts were not being correctly applied to the challenges grid.
    *   Resolved conflicting styles by consolidating all styles into a single `styles.css` file.
*   **Features:**
    *   Added a new night theme feature with a dedicated toggle button.

## Motivation & Context

The previous UI had several inconsistencies and bugs that affected the user experience. The new UI is more modern, professional, and easier to use. The night theme feature is a great addition for users who prefer to work in a dark environment.

## Related Issues

N/A

## How Has This Been Tested?

- [ ] Unit tests
- [ ] Integration tests
- [x] Manual testing
- [ ] Other (please specify below)

I have manually tested the changes in the following browsers:

*   Chrome
*   Firefox
*   Edge

## Screenshots / Media

N/A

## Implementation Details

*   **UI Enhancements:**
    *   Updated the `styles.css` file to use the "Poppins" font and a new color scheme.
    *   Added animations and transitions to buttons, cards, and navigation links.
*   **Bug Fixes:**
    *   Consolidated all styles into a single `styles.css` file to resolve conflicting styles.
    *   Removed the `styles/challenges.css`, `styles/themes.css`, and `submit-challenge/styles.css` files.
*   **Features:**
    *   Added a new `.night-theme` class to the `styles.css` file.
    *   Updated the `scripts/theme.js` file to toggle the `.night-theme` class on the body when the theme toggle button is clicked.

## Checklist

- [x] My code follows the project’s coding style and conventions
- [x] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have updated documentation where necessary
- [ ] I have added tests that prove my fix/feature works
- [ ] All new and existing tests pass
- [ ] Reviewer(s) assigned

## Additional Context

N/A
