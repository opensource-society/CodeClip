
document.addEventListener("DOMContentLoaded", () => {
  const host = document.getElementById("snippets");
  if (!host) return;

  // --- 1) Your Hello World snippet ---
  const snippet = {
    id: "hello-world",
    title: "Hello World (JavaScript)",
    lang: "JavaScript",
    code: `console.log("Hello World");`,
  };

  // --- 2) Render card ---
  host.innerHTML = `
    <article class="snippet-card border rounded p-3 mb-3 bg-white" data-id="${snippet.id}">
      <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
        <h5 class="m-0">
          ${escapeHtml(snippet.title)}
          <span class="badge bg-secondary ms-1">${escapeHtml(snippet.lang)}</span>
        </h5>
        <div class="snippet-actions d-inline-flex align-items-center gap-2">
          <button class="btn btn-primary btn-sm btn-copy" aria-label="Copy snippet to clipboard">📋 Copy</button>
          <span class="copy-toast text-success small" aria-live="polite" hidden>Copied!</span>
        </div>
      </div>
      <pre class="snippet-pre mb-0"><code class="snippet-code">${escapeHtml(snippet.code)}</code></pre>
    </article>
  `;

  // --- 3) Wire up the Copy button (with fallback + toast) ---
  host.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-copy");
    if (!btn) return;

    const card = btn.closest(".snippet-card");
    const codeNode = card?.querySelector(".snippet-code");
    const toast = card?.querySelector(".copy-toast");
    const text = codeNode?.innerText ?? "";

    copyTextToClipboard(text)
      .then(() => showToast(toast, "Copied!"))
      .catch(() => showToast(toast, "Copy failed"));
  });
});

/* ================= helpers ================= */

function escapeHtml(str = "") {
  return str.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }
  // Fallback for older browsers
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(ta);
  }
  return Promise.resolve();
}

function showToast(node, msg = "Copied!") {
  if (!node) return;
  node.textContent = msg;
  node.hidden = false;
  clearTimeout(node._t);
  node._t = setTimeout(() => (node.hidden = true), 1600);
}
