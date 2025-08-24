document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('challengeForm');

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Stop form from submitting
    let isValid = true;
    clearErrors();

    // Validate title
    const title = document.getElementById('title');
    if (title.value.trim() === '') {
      showError(title, 'Title is required');
      isValid = false;
    }

    // Validate description
    const description = document.getElementById('description');
    if (description.value.trim() === '') {
      showError(description, 'Description is required');
      isValid = false;
    }

    // Validate difficulty
    const difficulty = document.getElementById('difficulty');
    if (difficulty.value === '') {
      showError(difficulty, 'Please select a difficulty level');
      isValid = false;
    }

    // Validate test cases
    const testCases = document.querySelectorAll('.test-case');
    testCases.forEach((tc, index) => {
      if (tc.value.trim() === '') {
        showError(tc, `Test case ${index + 1} cannot be empty`);
        isValid = false;
      }
    });

    // Validate solution
    const solution = document.getElementById('solution');
    if (solution.value.trim() === '') {
      showError(solution, 'Sample solution is required');
      isValid = false;
    }

    if (isValid) {
      alert('Challenge submitted successfully!');
      form.reset(); // Clear the form
    }
  });

  function showError(inputElement, message) {
    let error = document.createElement('div');
    error.className = 'error-message';
    error.innerText = message;
    inputElement.parentNode.appendChild(error);
    inputElement.style.borderColor = 'red';
  }

  function clearErrors() {
    document.querySelectorAll('.error-message').forEach((e) => e.remove());
    document.querySelectorAll('input, textarea, select').forEach((el) => {
      el.style.borderColor = '#ccc';
    });
  }
});

document.getElementById('downloadCode').addEventListener('click', () => {
  const code = document.querySelector('#codeEditor').value; // Adjust selector if needed
  const blob = new Blob([code], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);

  // Optional: name the file based on selected language
  const language = document.querySelector('#languageSelect').value || 'code';
  const extension = getFileExtension(language);
  link.download = `my_code.${extension}`;

  link.click();
});

function getFileExtension(language) {
  // Map language names to common extensions
  const extensions = {
    'javascript': 'js',
    'python': 'py',
    'java': 'java',
    'c': 'c',
    'cpp': 'cpp'
    // Add more languages if needed
  };
  const key = language.toLowerCase();
  return extensions[key] || 'txt';
}
