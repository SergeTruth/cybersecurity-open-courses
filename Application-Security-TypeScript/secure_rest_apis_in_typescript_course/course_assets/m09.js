window.COURSE_MODULE = {
  "title": "Course Summary: Building APIs That Hold Up",
  "graphicAlt": "Explicit contracts, runtime validation, identity and permission checks, output shaping and ongoing tests maintain API security.",
  "narration": "A secure REST API is built from repeatable decisions. Define the route contract, validate untrusted input, authenticate the caller, authorize the action and object, shape the response, log responsibly, and test both accepted and rejected behavior. Each step reduces ambiguity before the API reaches production.\n\nTypeScript helps when it describes safe states clearly. It works best with strict compiler settings, runtime schemas, safe narrowing, and response models that separate internal data from public output. Types should make reviewed behavior easier to see, not hide uncertainty behind broad assertions.\n\nAuthentication, authorization, output control, middleware, telemetry, and delivery governance are connected. A token check without object policy is incomplete. Validation without safe output design still leaves exposure risk. Logging without sensitivity rules can create new problems. Testing without production monitoring leaves teams blind to drift.\n\nThe practical roadmap is straightforward: know the boundary, make the contract explicit, enforce the contract at runtime, check identity and permission on the server, return only what is needed, set defensive operational limits, and keep the pattern alive through review and CI. Durable API security is a lifecycle habit, not a single feature.\n\nWhen this roadmap is applied consistently, teams spend less time guessing and more time improving. New routes can follow known patterns. Old routes can be audited against the same expectations. Production signals can be connected back to design decisions, tests, and ownership.",
  "narrationPoints": [
    "A secure REST API is built from repeatable decisions.",
    "TypeScript helps when it describes safe states clearly.",
    "Authentication, authorization, output control, middleware, telemetry, and delivery governance are connected.",
    "The practical roadmap is straightforward: know the boundary, make the contract explicit, enforce the contract at runtime, check identity and...",
    "When this roadmap is applied consistently, teams spend less time guessing and more time improving."
  ]
};
