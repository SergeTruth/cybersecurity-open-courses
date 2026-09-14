window.COURSE_MODULE = {
  "title": "Course Summary: A Secure Blazor Baseline",
  "graphicAlt": "A secure Blazor baseline understands render modes, authorizes and validates on the backend, treats client state as untrusted, reviews browser behavior, and operates safely.",
  "narration": "A secure Blazor baseline starts with render-mode awareness. Teams should understand which code runs on the server, which code runs in the browser, what data is sent to components, and where protected decisions are enforced. Browser-executed code can guide the experience, but it is not a trusted enforcement point.\n\nAuthenticate users explicitly and authorize protected data and state changes on the server or API. Components and routes can express intent, but the final decision belongs where data is served or where operations are performed. APIs called by Blazor clients must enforce their own identity and access rules.\n\nValidate input where changes are made. Client-side validation can improve usability, but trusted backends must enforce business rules, resource scope, request intent, file limits, and state-change requirements. Treat browser storage, component state, query strings, and hidden fields as convenience state rather than authority.\n\nHandle JavaScript interop and rendering with care. Preserve normal framework encoding where possible, review any markup rendering, and understand the browser-side dependencies that participate in the application. Do not let third-party code or convenience interop hide important data handling decisions.\n\nFinally, keep secrets, logs, errors, dependencies, and deployment settings production-safe. Secure Blazor applications are built by connecting component design to API design, identity, authorization, validation, browser state, rendering, logging, and operational readiness.",
  "narrationPoints": [
    "A secure Blazor baseline starts with render-mode awareness.",
    "Authenticate users explicitly and authorize protected data and state changes on the server or API.",
    "Validate input where changes are made.",
    "Handle JavaScript interop and rendering with care.",
    "Finally, keep secrets, logs, errors, dependencies, and deployment settings production-safe."
  ]
};
