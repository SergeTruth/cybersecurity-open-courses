window.COURSE_MODULE = {
  "title": "Tool-Calling and Action-Control Patterns",
  "graphicAlt": "Illustration for a lesson on tool-calling and action-control patterns.",
  "narration": "Tool calling and function calling let an agent request capabilities from Python code or connected services. A tool may search documents, send email, create tickets, update calendars, query databases, read files, call APIs, inspect code, browse approved resources, or operate workflow systems. Tools are where model output can turn into real effects. That makes the tool layer one of the most important places to enforce security.\n\nA secure tool design starts with allowlists and structure. The application should define which tools exist, which users or agent modes may use them, what actions are allowed, and what arguments are expected. Structured arguments make validation possible. Before execution, the tool wrapper should validate identifiers, tenant context, destination, size, type, format, operation, and business intent. The model should not be able to invent new tools or pass arbitrary free-form instructions to sensitive capabilities.\n\nRead-only tools and write-capable tools require different controls. Read-only tools can still leak data, but write-capable tools can change systems, send messages, modify records, trigger workflows, create cost, or affect external services. High-impact tools should use scoped credentials, policy checks, approval gates, dry-run or preview modes, rate limits, quotas, and durable audit trails. The user should understand what action is about to occur before it happens.\n\nModel output should not directly become a sensitive action. The application should check authorization, validate tool arguments, enforce policy, record the decision, and require human approval where impact warrants it. A safe agent may propose a ticket update, draft an email, or prepare a database change, but the execution path should remain explicit. This pattern keeps automation fast for low-risk work and deliberate for actions that could affect people, money, access, data, or operations.",
  "narrationPoints": [
    "Tool calling and function calling let an agent request.",
    "A secure tool design starts with allowlists and structure.",
    "Read-only tools and write-capable tools require different.",
    "Model output should not directly become a sensitive action.",
    "Before execution, the tool wrapper should validate.",
    "The model should not be able to invent new tools or pass."
  ]
};
