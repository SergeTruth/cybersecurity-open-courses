window.COURSE_MODULE = {
  "title": "Why Smart Pointer Security Matters",
  "graphicAlt": "Values, exclusive owners, shared owners and non-owning observers express distinct lifetime relationships that still require review.",
  "narration": "Smart pointers are one of the most important tools in modern C++ memory and resource safety. They reduce the need for manual new and delete , make ownership visible in type signatures, and support RAII-based cleanup when code leaves a scope through normal execution, early return, or exception. For security-minded engineering, that visibility matters. Reviewers can understand who owns an object, who may borrow it, and where cleanup should happen.\n\nSmart pointers are not magic. They do not prove that every lifetime is correct, that every resource is released at the intended time, or that every object is safe to access concurrently. A system can still leak memory, retain sensitive objects longer than needed, create stale observations, or build ownership cycles that prevent cleanup. Replacing raw pointers mechanically with smart pointers can even hide unclear ownership if the design questions are never answered.\n\nThe defensive goal is disciplined ownership design. Choose value ownership when an object can live directly as a member or local variable. Use exclusive ownership when one component controls lifetime. Use shared ownership only when multiple owners genuinely need to keep an object alive. Use weak observation when access should not extend lifetime. Smart pointer security is the habit of making those decisions explicit, testable, and reviewable.\n\nThroughout this course, treat smart pointers as one layer in secure C++ engineering. They work best with clear API contracts, simple resource ownership, consistent construction patterns, tests around cleanup paths, diagnostics, and code review that follows the ownership graph.",
  "narrationPoints": [
    "Reviewers can understand who owns an object, who may borrow it, and where cleanup should happen.",
    "A system can still leak memory, retain sensitive objects longer than needed, create stale observations, or build ownership cycles that prevent cleanup.",
    "Smart pointer security is the habit of making those decisions explicit, testable, and reviewable.",
    "Use shared ownership only when multiple owners genuinely need to keep an object alive.",
    "Choose value ownership when an object can live directly as a member or local variable.",
    "Throughout this course, treat smart pointers as one layer in secure C++ engineering."
  ]
};
