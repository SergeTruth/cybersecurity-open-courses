window.COURSE_MODULE = {
  "title": "std::weak_ptr and Safe Observation",
  "graphicAlt": "A weak observation becomes temporary shared ownership only when lock succeeds; expiration is handled as a normal outcome.",
  "narration": "std::weak_ptr is a non-owning observer for objects managed by std::shared_ptr . It allows code to remember that an object may exist without extending that object's lifetime. This is useful when a component needs to refer to a shared object, but should not be responsible for keeping it alive.\n\nThe central operation is lock() . Locking a weak pointer attempts to create a temporary shared_ptr . If the object still exists, the returned shared pointer keeps it alive for the duration of that use. If the object no longer exists, locking returns an empty result, and the code must handle that condition cleanly. Defensive designs treat expiration as a normal outcome, not an exceptional surprise.\n\nWeak observation helps break cycles. For example, a parent may own children while children observe the parent weakly, or a callback registry may hold weak references so targets can be destroyed without waiting for the registry to release strong ownership. The precise design varies, but the principle is stable: observation should not accidentally become retention.\n\nA weak pointer is not a substitute for ownership design. It only makes sense in a shared ownership system, and it still requires clear behavior when the observed object is gone. Review whether weak references are locked only for short operations, whether expired observations are handled consistently, and whether the surrounding API explains who owns the real lifetime.",
  "narrationPoints": [
    "std::weak_ptr is a non-owning observer for objects managed by std::shared_ptr .",
    "If the object still exists, the returned shared pointer keeps it alive for the duration of that use.",
    "If the object no longer exists, locking returns an empty result, and the code must handle that condition cleanly.",
    "The precise design varies, but the principle is stable: observation should not accidentally become retention.",
    "Review whether weak references are locked only for short operations, whether expired observations are handled consistently, and whether the surrounding API explains who owns the real lifetime.",
    "A weak pointer is not a substitute for ownership design."
  ]
};
