window.COURSE_MODULE = {
  "title": "Safety Contracts and Documentation",
  "graphicAlt": "Preconditions, maintained invariants, caller obligations, and current documentation provide reviewable evidence for an unsafe operation.",
  "narration": "Unsafe code should come with a safety contract. The contract explains what must be true before the unsafe operation runs, what invariants the code maintains, what callers are responsible for, and what future maintainers must not break. This is not paperwork for its own sake. It is the evidence that makes unsafe code reviewable.\n\nA useful safety comment is not a decorative note that says, this is safe. It explains why the unsafe operation is valid under specific conditions. It may identify the owner of a buffer, the lifetime relationship being preserved, the source of an alignment guarantee, the reason a pointer is non-null, or the synchronization that protects shared state.\n\nDocumentation should identify trusted inputs, ownership expectations, lifetime assumptions, thread assumptions, layout assumptions, and error behavior. If a caller must pass a value created only through a particular constructor, say so. If an external function must not retain a pointer after the call, document that expectation. If a type representation must match an external ABI, make that assumption visible.\n\nSafety documentation also needs to stay current. Unsafe code can become risky when surrounding code changes and the old comment no longer describes the real conditions. Reviewers should treat stale safety comments as a warning sign, because outdated documentation can be worse than no documentation: it creates confidence where the evidence has drifted.\n\nWithout safety contracts, unsafe code becomes tribal knowledge, and tribal knowledge ages badly. People leave, APIs change, dependencies update, and platform assumptions shift. Documentation turns hidden reasoning into shared engineering evidence that can be reviewed, tested, and maintained.",
  "narrationPoints": [
    "Unsafe code should come with a safety contract.",
    "A useful safety comment is not a decorative note that says.",
    "Documentation should identify trusted inputs.",
    "Safety documentation also needs to stay current.",
    "Without safety contracts.",
    "If a caller must pass a value created only through."
  ]
};
