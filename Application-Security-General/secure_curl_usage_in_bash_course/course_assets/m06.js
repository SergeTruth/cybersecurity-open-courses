window.COURSE_MODULE = {
  "title": "Methods, Payloads, and API Safety",
  "graphicAlt": "Read-only and state-changing request lanes make intent, payload checks and environment selection explicit.",
  "narration": "Not every curl request is a harmless read. A script may create tickets, trigger deployments, approve workflows, upload artifacts, modify settings, rotate configuration, or delete records through an API. That makes HTTP method choice and payload design operationally important.\n\nScripts should distinguish read-only requests from state-changing requests. A status check and a production deployment trigger should not have the same validation threshold. High-impact actions should require stronger endpoint validation, clearer intent, and safer failure behavior.\n\nRequest bodies should be built safely. Payloads should match the content type the API expects, and values inside the payload should be validated according to the workflow. A malformed body can cause failure, but a subtly wrong body can cause a state change in the wrong environment or with the wrong parameters.\n\nEnvironment separation matters. Development, staging, and production endpoints should be distinct and intentionally selected. A script should not make it easy for a routine test run to send a state-changing request to production because of a loose environment variable or default.\n\nWhere an API and workflow support it, dry-run, preview, or approval steps can reduce risk. The script should make intent clear before sending a request that changes server-side state, and it should log high-level outcomes without exposing sensitive payload details.",
  "narrationPoints": [
    "Not every curl request is a harmless read.",
    "Scripts should distinguish read-only requests from state-changing requests.",
    "Payloads should match the content type the API expects, and values inside the payload should be validated according to the workflow.",
    "Development, staging, and production endpoints should be distinct and intentionally selected.",
    "Where an API and workflow support it, dry-run, preview, or approval steps can reduce risk.",
    "A script may create tickets, trigger deployments, approve workflows, upload artifacts, modify settings, rotate configuration, or delete records through an API."
  ]
};
