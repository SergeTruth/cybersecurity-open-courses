window.COURSE_MODULE = {
  "title": "Safer API and Class Design",
  "graphicAlt": "API diagram showing immutable shared snapshots handed to asynchronous consumers so each retained view keeps its storage alive.",
  "narration": "Dangling pointer prevention is often an API and class design problem. A function or constructor that accepts a pointer, reference, view, or callback is also accepting a lifetime relationship. The signature should make that relationship as obvious as practical.\n\nAvoid storing borrowed pointers or references by default. If a class stores an observer to an external object, the owner must outlive the observing class or the observer must have a way to verify availability before use. That relationship should be documented, tested, and visible in the member type or constructor contract.\n\nMember variables should distinguish ownership from observation. Values and RAII members own their state directly. std::unique_ptr expresses exclusive dynamic ownership. std::shared_ptr expresses shared ownership when the design truly requires it. std::weak_ptr, handles, identifiers, and raw non-owning observers can express observation when paired with a clear owner.\n\nStable handles or registries can be useful when objects need identity across moves, container mutation, or subsystem boundaries. A handle should have defined validity rules and failure behavior. It should not merely hide a raw pointer behind a different name.\n\nMake lifetime assumptions testable and reviewable. A reader should be able to tell whether a function stores access beyond the call, whether a class owns its dependencies, and what happens when the owner goes away. When those answers are not visible, the design deserves another pass before implementation spreads the ambiguity.",
  "narrationPoints": [
    "Dangling pointer prevention is often an API and class design problem.",
    "Avoid storing borrowed pointers or references by default.",
    "That relationship should be documented, tested, and visible in the member type or constructor contract.",
    "Stable handles or registries can be useful when objects need identity across moves, container mutation, or subsystem boundaries.",
    "It should not merely hide a raw pointer behind a different name.",
    "When those answers are not visible, the design deserves another pass before implementation spreads the ambiguity."
  ]
};
