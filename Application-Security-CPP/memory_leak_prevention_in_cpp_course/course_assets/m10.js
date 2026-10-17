window.COURSE_MODULE = {
  "title": "Course Summary: A Leak Prevention Roadmap",
  "graphicAlt": "Summarize explicit ownership, RAII, bounded retention, matched custom cleanup and evidence.",
  "narration": "The leak prevention roadmap starts with explicit ownership and cleanup. Every resource should have an owner, a lifetime, and a release path. Borrowed access should remain temporary. Transfer and sharing should be visible in the API and type design.\n\nPrefer RAII, values, containers, and smart pointers. Values and containers reduce manual allocation. RAII makes cleanup follow object lifetime. unique_ptr expresses exclusive ownership. shared_ptr should represent real shared ownership, and weak_ptr should be used when observation should not extend lifetime.\n\nBreak cycles and limit unintended retention. Review parent-child structures, callbacks, observer lists, event systems, caches, queues, and registries. Define eviction, expiration, deregistration, backpressure, and shutdown behavior before retained state grows without a boundary.\n\nWrap custom resources in types that match their cleanup contracts. Document allocator, pool, and arena rules. Specialized lifecycle strategies can be valuable, but only when callers understand when resources are released and when objects become invalid.\n\nFinally, test, monitor, review, and revisit resource lifecycles. Use leak detection, lifecycle tests, shutdown tests, diagnostics, and CI checks. Treat ownership changes as carefully as logic changes. Leak prevention is a lifecycle discipline, not a final cleanup pass.\n\nWhen a team treats lifecycle design as normal engineering practice, leaks become easier to reason about and easier to prevent. The result is C++ software that stays predictable under real operating conditions.",
  "narrationPoints": [
    "The leak prevention roadmap starts with explicit ownership and cleanup.",
    "RAII makes cleanup follow object lifetime. unique_ptr expresses exclusive ownership. shared_ptr should represent real shared ownership, and weak_ptr should be used when observation should not extend lifetime.",
    "Review parent-child structures, callbacks, observer lists, event systems, caches, queues, and registries.",
    "Specialized lifecycle strategies can be valuable, but only when callers understand when resources are released and when objects become invalid.",
    "Finally, test, monitor, review, and revisit resource lifecycles.",
    "When a team treats lifecycle design as normal engineering practice, leaks become easier to reason about and easier to prevent."
  ]
};
