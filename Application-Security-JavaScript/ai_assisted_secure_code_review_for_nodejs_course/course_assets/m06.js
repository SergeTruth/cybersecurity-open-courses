window.COURSE_MODULE = {
  "title": "Input Handling, Data Access, and Output Safety",
  "graphicAlt": "Validation and constrained data access lead to deliberate field selection and a minimal response.",
  "narration": "Many review failures come from trusting shape, type, ownership, or caller intent too early. Node.js services receive data through req.body, req.query, req.params, headers, cookies, uploaded files, webhooks, queues, and third-party callbacks. AI can help compare accepted input against schemas, controller expectations, and business rules. The reviewer should confirm that validation happens before business logic and that validation includes type, size, range, allowed values, and required relationships where relevant.\n\nInput review should connect directly to data access. Ask the assistant to trace how untrusted values reach database queries, ORM calls, search filters, file paths, message publishing, or outbound requests. Review for unsafe object merging, mass assignment, excessive update fields, missing tenant conditions, parameterization mistakes, type coercion surprises, and file handling gaps. AI may identify a suspicious flow, but the reviewer should validate it against actual code paths, framework behavior, and tests.\n\nOutput safety matters as much as input safety. A handler can validate input correctly and still return too much data, expose internal fields, leak stack traces, include secret values, or shape errors inconsistently. Ask AI to compare response objects against what the client actually needs and to identify raw database objects or debug details returned directly. Secure review should confirm both sides of the flow: what the application accepts and what it sends back.",
  "narrationPoints": [
    "Many review failures come from trusting shape.",
    "Input review should connect directly to data access.",
    "Output safety matters as much as input safety.",
    "Review for unsafe object merging.",
    "AI may identify a suspicious flow.",
    "Secure review should confirm both sides of the flow: what."
  ]
};
