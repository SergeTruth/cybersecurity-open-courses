window.COURSE_MODULE = {
  "title": "Course Summary and Key Takeaways",
  "graphicAlt": "Blank placeholder graphic for module 9",
  "narration": "Injection happens when untrusted input is interpreted as instructions or structure in the wrong context. JavaScript applications face this risk in many places because they interact with databases, document stores, shells, template engines, browsers, parsers, URLs, headers, file paths, and downstream APIs. The variety of contexts is what makes injection prevention a design discipline rather than a single trick.\n\nThe most important habit is data flow awareness. Know where untrusted data enters, how it is transformed, where it is stored, and which sensitive sinks it reaches. Client-side validation can improve usability, but server-side validation, safe construction, and context-aware output handling are still required. A value that is safe in one context may be unsafe in another.\n\nStrong prevention combines several controls. Use parameterized queries for SQL. Validate object shape and allowlisted fields for document queries. Avoid string-built shell commands. Keep user content separate from templates and executable logic. Use safe DOM APIs and context-aware encoding for browser rendering. Apply least privilege so one mistake does not become a system-wide failure.\n\nTesting and review keep these controls alive. Security-focused unit and integration tests, schema tests, negative tests, dependency review, static analysis, and code review all help identify risky paths. Documentation helps future developers understand why a particular sink needs a particular control.\n\nThe goal is not memorizing payloads. The goal is designing JavaScript applications where untrusted data cannot change command meaning. When developers keep data as data, choose safe APIs, validate intent, and encode for the correct context, injection risk drops dramatically.",
  "narrationPoints": [
    "Injection happens when untrusted input is interpreted as instructions or structure in the wrong context.",
    "The most important habit is data flow awareness.",
    "Strong prevention combines several controls.",
    "Testing and review keep these controls alive.",
    "The goal is not memorizing payloads."
  ]
};
