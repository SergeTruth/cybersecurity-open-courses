window.COURSE_MODULE = {
  "title": "Why Error Handling and Logging Matter",
  "narration": "Error handling controls how an application behaves when something goes wrong. That includes invalid input, unavailable dependencies, authorization failures, database errors, timeouts, misconfiguration, and unexpected runtime conditions. Secure error handling does not mean hiding every problem. It means responding predictably, preserving the security posture of the application, and giving the right audience the right amount of information.\n\nLogging creates records that help operators, developers, security teams, and auditors understand what happened. Good logs make routine support easier and incident response faster. They show important events, outcomes, actors, resources, and timing. Poor logs do the opposite. They can hide failures, make investigations slow, expose sensitive information, or create noisy records that nobody trusts. A system can fail securely and still be difficult to operate if its logs are vague or inconsistent.\n\nThe challenge is balance. Users need clear messages that help them recover without exposing internals. Developers and operators need diagnostics that explain what failed. Security teams need evidence that supports detection and investigation. Privacy and compliance obligations limit what should be collected and how long it should be kept. Secure error handling and secure logging sit at the intersection of usability, diagnostics, security, privacy, and accountability.",
  "graphicAlt": "A failed operation produces safe user feedback and protected diagnostic and investigation records with data minimization.",
  "narrationPoints": [
    "Error handling controls how an application behaves when something goes wrong.",
    "Logging creates records that help operators, developers, security teams, and auditors understand what happened.",
    "The challenge is balance."
  ]
};
