window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Render Browser Content Safely",
  "codeExamples": [
    {
      "title": "Prefer textContent for User Text",
      "language": "javascript",
      "code": `function renderComment(container, comment) {
  const article = document.createElement("article");
  const author = document.createElement("strong");
  const body = document.createElement("p");
  author.textContent = comment.authorName;
  body.textContent = comment.body;
  article.append(author, body);
  container.append(article);
}
`
    },
    {
      "title": "Allow Only Approved HTTPS Destinations",
      "language": "javascript",
      "code": `const APPROVED_ORIGINS = new Set([
  "https://example.com",
  "https://profiles.example.com",
]);

function safeExternalUrl(value) {
  if (typeof value !== "string") throw new Error("URL must be a string");
  const url = new URL(value, "https://example.com");
  if (url.username !== "" || url.password !== "" ||
      !APPROVED_ORIGINS.has(url.origin)) {
    throw new Error("URL destination is not approved");
  }
  return url.href;
}

function renderProfileLink(anchor, rawUrl) {
  anchor.href = safeExternalUrl(rawUrl);
  anchor.rel = "noopener noreferrer";
  anchor.textContent = "Profile";
}
`
    },
    {
      "title": "Centralize Raw HTML Escape Hatches",
      "language": "javascript",
      "code": `import DOMPurify from "dompurify";

function sanitizeArticleHtml(sanitizer, rawHtml) {
  if (typeof rawHtml !== "string" || typeof sanitizer?.sanitize !== "function") {
    throw new Error("invalid sanitizer input");
  }
  return sanitizer.sanitize(rawHtml, {
    ALLOWED_TAGS: ["p", "strong", "em", "ul", "ol", "li", "a"],
    ALLOWED_ATTR: ["href", "title"],
  });
}

function renderTrustedMarkup(container, rawHtml) {
  container.innerHTML = sanitizeArticleHtml(DOMPurify, rawHtml);
}
`
    }
  ]
};
