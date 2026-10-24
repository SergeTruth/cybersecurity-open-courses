window.COURSE_MODULE = {
  "title": "Secure REST API Foundations",
  "graphicAlt": "An explicit route contract identifies caller, purpose, input, output and failure behavior across API boundaries.",
  "narration": "A REST API is often the front door to a product's data, workflows, and integrations. It receives requests from browsers, mobile apps, partner systems, background jobs, and internal tools. Every route represents a business action, a data read, or a state change that deserves clear ownership and clear expectations.\n\nSecure API work starts by identifying the trust boundaries. A request may cross a client, a gateway, application middleware, route handlers, service code, databases, queues, caches, and third-party systems. Each boundary raises the same core questions: who is calling, what are they allowed to do, what input is trusted, what output is appropriate, and what evidence should be logged.\n\nSecurity is not a single package added after the API is finished. It is the combined result of route design, validation, authentication, authorization, output shaping, error handling, operational controls, and review. A route with a clear purpose and a clear data contract is easier to secure than a route that accepts broad input and returns whatever the database happens to contain.\n\nFor TypeScript teams, the practical goal is to make safe behavior the default path. Use consistent patterns, narrow interfaces, runtime validation, explicit policy checks, and repeatable tests. When teams can explain each endpoint's caller, purpose, input, output, and failure behavior, the API becomes easier to maintain and safer to operate.\n\nThis foundation also helps teams respond to change. New clients, new fields, new integrations, and new deployment environments are easier to evaluate when the API already has documented contracts and clear boundaries. Security review becomes part of normal engineering instead of a late surprise.",
  "narrationPoints": [
    "A REST API is often the front door to a product's data, workflows, and integrations.",
    "Secure API work starts by identifying the trust boundaries.",
    "Security is not a single package added after the API is finished.",
    "For TypeScript teams, the practical goal is to make safe behavior the default path.",
    "This foundation also helps teams respond to change."
  ]
};
