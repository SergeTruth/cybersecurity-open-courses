window.COURSE_MODULE = {
  "title": "HTML Encoding",
  "narration": "HTML encoding is used when data is rendered as text in an HTML body context. Special characters such as less-than, greater-than, ampersand, and sometimes quotes are represented so the browser displays them as text instead of treating them as markup. If a user enters text that looks like a tag, HTML encoding should make the browser show the characters rather than create an element. That distinction is the heart of output encoding.\n\nModern frameworks often auto-escape template output in common HTML text contexts. This is valuable because it makes safe behavior the default for ordinary variable insertion. However, auto-escaping is not a reason to stop thinking. Developers can accidentally bypass it by using raw HTML helpers, unsafe template directives, manual string concatenation, direct DOM assignment to dangerous properties, or server-rendered content that the framework does not understand. Auto-escaping helps most when developers stay inside the safe patterns it provides.\n\nHTML encoding is not the same as sanitizing rich HTML. If the application allows users to submit formatted content, such as markdown or rich text, the system may need a sanitizer that permits a controlled subset of tags and attributes. That is a separate design decision and should use mature libraries with conservative configuration. For ordinary text, prefer encoding and safe template insertion. For rich content, sanitize before rendering and still review the final context carefully.",
  "graphicAlt": "Ordinary text uses safe escaped templates; permitted rich content requires sanitization and raw-rendering bypass review.",
  "narrationPoints": [
    "HTML encoding is used when data is rendered as text in an HTML body context.",
    "Modern frameworks often auto-escape template output in common HTML text contexts.",
    "HTML encoding is not the same as sanitizing rich HTML."
  ]
};
