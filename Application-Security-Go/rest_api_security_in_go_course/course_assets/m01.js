window.COURSE_MODULE = {
  "title": "REST APIs as Security Boundaries",
  "graphicAlt": "External clients cross a REST route boundary where input is checked, actions are authorized, state changes are controlled, and responses are shaped.",
  "narration": "A REST API route is a security boundary because it sits between outside requests and trusted application behavior. A Go API may receive calls from browsers, mobile apps, internal services, automation, partner systems, or scheduled jobs. Even when an API is called internal, its handlers still accept data, identity context, headers, parameters, and workflow instructions from outside the handler's immediate control.\n\nEach route becomes part of the system's security model. A handler parses input, chooses status codes, loads records, enforces authorization, calls business logic, writes state, and shapes the response. A small mistake in that path can expose too much data, mutate the wrong object, leak a sensitive value through an error, or let one tenant's request influence another tenant's data.\n\nGo helps by keeping control flow direct. The standard HTTP library is clear, errors are explicit, and handlers can be small enough to review. But Go does not automatically decide which caller may act, which fields are safe, which requests are too large, which logs need redaction, or which defaults belong in production.\n\nA secure REST API makes safe behavior explicit. Inputs are validated before sensitive use. Authorization happens on the server and close to the protected action. Responses return only intended data. Failures are predictable. Logging supports investigation without becoming a second exposure path.\n\nThe practical goal is maintainability. A reviewer should understand what the route trusts, what it rejects, what it changes, and what it returns. Security improves when handlers are predictable under both normal use and failure.",
  "narrationPoints": [
    "A REST API route is a security boundary because it sits between outside requests and trusted application behavior.",
    "Each route becomes part of the system's security model.",
    "Go helps by keeping control flow direct.",
    "A secure REST API makes safe behavior explicit.",
    "The practical goal is maintainability."
  ]
};
