window.COURSE_MODULE = {
  "title": "Secure Data Handling and Output Design",
  "graphicAlt": "Explicit response mapping exposes only needed fields while response limits and safe errors control additional exposure.",
  "narration": "API responses are part of the security boundary. A route should return only the data the caller truly needs for the intended task. Internal records often contain fields that are not appropriate for an API response: internal notes, flags, relationship identifiers, operational metadata, or sensitive values that support server-side decisions.\n\nTypeScript can help separate internal models from response models. A database entity or ORM object is rarely the safest public contract. A data transfer object, response schema, or explicit mapper can filter fields, normalize names, and make response behavior reviewable. This also reduces accidental exposure when internal models grow over time.\n\nError handling should be useful without revealing sensitive internals. Clients need stable status codes and clear messages, but they usually do not need stack traces, raw database errors, dependency details, or secret values. Logs can capture safe diagnostic context, such as request identifiers and high-level error categories, while keeping sensitive data out of durable records.\n\nPagination, filtering, sorting, and caching also shape exposure. Limits help avoid overly large responses and unexpected resource use. Filter and sort parameters should be validated against allowed fields. Cache behavior should match the sensitivity of the data. Secure output design is about controlling what leaves the API, not merely formatting JSON neatly.\n\nResponse contracts should be versioned and reviewed like request contracts. Adding one field may seem harmless, but it can change what clients store, display, or forward. A deliberate response model makes those changes visible before they become part of a public API promise.",
  "narrationPoints": [
    "API responses are part of the security boundary.",
    "TypeScript can help separate internal models from response models.",
    "Error handling should be useful without revealing sensitive internals.",
    "Pagination, filtering, sorting, and caching also shape exposure.",
    "Response contracts should be versioned and reviewed like request contracts."
  ]
};
