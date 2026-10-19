window.COURSE_MODULE = {
  "title": "What Defensive C# Programming Means",
  "graphicAlt": "Explicit boundaries turn invalid input, dependency failures and timing changes into predictable, reviewable behavior.",
  "narration": "Defensive C sharp programming is a normal engineering discipline. It is not paranoia, and it is not overengineering. It is the practice of writing code that behaves predictably when input is invalid, dependencies fail, data is missing, timing changes, or earlier assumptions turn out to be wrong.\n\nA defensive program makes assumptions visible. If a value must be present, the code should say so through types, validation, or a clear failure path. If a caller is not allowed to mutate internal state, the API should avoid exposing that state directly. If a downstream service may fail, the boundary should define what the application does next.\n\nThis discipline connects security, reliability, and maintainability. Many security defects begin as ordinary engineering ambiguity: unclear ownership, unvalidated input, swallowed exceptions, loose strings standing in for important states, or hidden configuration behavior. Defensive code reduces those ambiguities before they become production problems.\n\nC sharp gives developers useful tools: nullable reference types, records, readonly properties, exceptions, generics, async patterns, analyzers, and mature .NET libraries. Those tools help when they are used deliberately. They do not remove the need to decide what states are valid, what inputs are trusted, and what failures are expected.\n\nThe goal is code that future maintainers can safely read, test, and change. Defensive safeguards are most valuable when they are clear, consistent, and ordinary enough to survive day-to-day development rather than existing only as special-case patches after something goes wrong.",
  "narrationPoints": [
    "Defensive C sharp programming is a normal engineering discipline.",
    "If a downstream service may fail, the boundary should define what the application does next.",
    "Many security defects begin as ordinary engineering ambiguity: unclear ownership, unvalidated input, swallowed exceptions.",
    "C sharp gives developers useful tools: nullable reference types, records, readonly properties, exceptions, generics.",
    "Defensive safeguards are most valuable when they are clear, consistent."
  ]
};
