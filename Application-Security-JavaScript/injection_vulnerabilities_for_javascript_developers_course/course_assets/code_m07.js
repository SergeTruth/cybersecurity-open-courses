window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Render Browser Content Safely",
  "codeExamples": [
    {
      "title": "Prefer textContent for User Text",
      "language": "javascript",
      "code": "function renderComment(container, comment) {\n  const article = document.createElement(\"article\");\n  const author = document.createElement(\"strong\");\n  const body = document.createElement(\"p\");\n\n  author.textContent = comment.authorName;\n  body.textContent = comment.body;\n\n  article.append(author, body);\n  container.append(article);\n}"
    },
    {
      "title": "Validate URLs Before Assigning href",
      "language": "javascript",
      "code": "const ALLOWED_PROTOCOLS = new Set([\"https:\"]);\n\nfunction safeExternalUrl(value) {\n  const url = new URL(value, \"https://example.com\");\n  if (!ALLOWED_PROTOCOLS.has(url.protocol)) {\n    throw new Error(\"unsupported URL protocol\");\n  }\n  return url.href;\n}\n\nfunction renderProfileLink(anchor, rawUrl) {\n  anchor.href = safeExternalUrl(rawUrl);\n  anchor.rel = \"noopener noreferrer\";\n  anchor.textContent = \"Profile\";\n}"
    },
    {
      "title": "Centralize Raw HTML Escape Hatches",
      "language": "javascript",
      "code": "import DOMPurify from \"dompurify\";\n\nfunction renderTrustedMarkup(container, rawHtml) {\n  const cleanHtml = DOMPurify.sanitize(rawHtml, {\n    ALLOWED_TAGS: [\"p\", \"strong\", \"em\", \"ul\", \"ol\", \"li\", \"a\"],\n    ALLOWED_ATTR: [\"href\", \"title\"],\n  });\n\n  container.innerHTML = cleanHtml;\n}"
    }
  ]
};
