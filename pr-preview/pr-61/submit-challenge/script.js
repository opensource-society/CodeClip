const form = document.getElementById('challengeForm');
const testCasesDiv = document.getElementById('testCases');
const addBtn = document.getElementById('addTestCase');
const preview = document.getElementById('preview');

addBtn.addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'test-case';
  input.placeholder = `Test Case ${testCasesDiv.children.length + 1}`;
  input.required = true;
  testCasesDiv.appendChild(input);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const difficulty = document.getElementById('difficulty').value;
  const solution = document.getElementById('solution').value.trim();

  const testCases = Array.from(document.querySelectorAll('.test-case'))
    .map(input => input.value.trim())
    .filter(Boolean);

  preview.innerHTML = `
    <h3>Preview</h3>
    <p><strong>Title:</strong> ${title}</p>
    <p><strong>Difficulty:</strong> ${difficulty}</p>
    <p><strong>Description:</strong><br>${description.replace(/\n/g, "<br>")}</p>
    <p><strong>Test Cases:</strong><ul>${testCases.map(tc => `<li>${tc}</li>`).join('')}</ul></p>
    <p><strong>Sample Solution:</strong><br><pre>${solution}</pre></p>
  `;
});
