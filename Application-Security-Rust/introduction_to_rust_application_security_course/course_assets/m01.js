window.COURSE_MODULE = {
  "title": "Why Rust Application Security Matters",
  "graphicAlt": "Layered application stack separates Rust memory safety from input validation, access control, secrets, and operational security.",
  "narration": "Rust gives developers strong tools for building safer software. Ownership, borrowing, lifetimes, and the type system reduce many classes of memory-safety errors that have historically affected systems software. That is a meaningful security advantage, especially for services, command-line tools, libraries, and backend components that need performance and reliability.\n\nMemory safety, however, is not the same as complete application security. Rust does not automatically prevent broken access control, weak authentication, insecure business logic, sensitive data exposure, unsafe configuration, or poor operational behavior. A Rust service can still trust the wrong input, expose the wrong data, log secrets, accept a risky dependency, or deploy with a dangerous default.\n\nSecure Rust development uses the language's strengths while still engineering the whole application carefully. Teams need clear boundaries for input, explicit error behavior, dependency governance, secret handling, concurrency design, logging discipline, testing, release review, and operational monitoring. The compiler can help with important classes of mistakes, but it does not replace threat-aware design or review.\n\nThis course introduces the practical habits that help teams build Rust applications that are safer in design, implementation, dependency management, release, and operation. The focus is defensive and engineering-focused: reduce ambiguity, keep risky boundaries small, make behavior testable, protect sensitive data, and maintain visibility after the application is deployed.",
  "narrationPoints": [
    "Rust gives developers strong tools for building safer.",
    "Memory safety, however, is not the same as complete.",
    "Secure Rust development uses the language's strengths.",
    "This course introduces the practical habits that help teams.",
    "The compiler can help with important classes of mistakes.",
    "A Rust service can still trust the wrong input."
  ]
};
