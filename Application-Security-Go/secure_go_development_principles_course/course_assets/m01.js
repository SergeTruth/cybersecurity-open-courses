window.COURSE_MODULE = {
  "title": "Secure Go Development Foundations",
  "graphicAlt": "Go supports reviewable code, while explicit trust boundaries, validation, authorization, bounded runtime behavior, tests, delivery and operations establish security.",
  "narration": "Secure Go development is a discipline, not a single package or checklist. Go gives teams useful advantages: simple syntax, readable control flow, a strong standard library, explicit error returns, garbage collection, and a service-friendly runtime. Those qualities make code easier to review and maintain, which can support security work.\n\nThe limits matter just as much. Untrusted input remains untrusted even when the code is written in Go. Concurrency can still be wrong. Resource exhaustion can still affect availability. Configuration can still expose risky behavior. A clean-looking handler can still return too much data, ignore an important error, or trust a value that should have been verified.\n\nSecure Go starts by naming trust boundaries. Users, API clients, other services, files, message queues, environment variables, databases, networks, dependencies, build systems, and operators can all influence application behavior. The code should make it clear where data enters, where it is validated, where authority is checked, and what happens when something fails.\n\nGo's style works well with defensive design. Small interfaces, concrete types, explicit conversions, short functions, predictable errors, and understandable control flow make assumptions easier to inspect. A reviewer should be able to follow the path from input to decision to output without hunting through hidden framework behavior.\n\nThe broader habit is consistency. Code, tests, builds, deployment settings, monitoring, and operations should reinforce the same security expectations. When safe behavior is ordinary and visible, Go's simplicity becomes a practical advantage. Teams should be able to explain not only what the program does, but which assumptions keep that behavior safe.",
  "narrationPoints": [
    "Secure Go development is a discipline, not a single package or checklist.",
    "The limits matter just as much.",
    "Secure Go starts by naming trust boundaries.",
    "Go's style works well with defensive design.",
    "The broader habit is consistency."
  ]
};
