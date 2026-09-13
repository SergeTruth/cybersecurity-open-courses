window.COURSE_MODULE = {
  "title": "Async, Threads, and Long-Lived Tasks",
  "graphicAlt": "An owned message lets a task outlive its caller, while shutdown and cleanup remain explicit.",
  "narration": "Async tasks and threads make ownership visible because work can outlive the stack frame that started it. A reference that is valid inside a local function may not be valid inside a task that continues later. Rust often requires owned data, cloned handles, or shared ownership when work crosses execution boundaries.\n\nThis requirement protects against stale references. If a task might continue after the caller returns, borrowed stack data may not live long enough. The compiler pushes the design toward ownership transfer, shared ownership, or a narrower task scope. That pressure is useful because background work needs a clear lifecycle.\n\nLong-lived tasks should have cancellation behavior, shutdown behavior, and cleanup paths. A task that owns a resource should release it predictably. A task that shares state should use appropriate synchronization. A task that registers callbacks should define how those callbacks are removed or invalidated during shutdown.\n\nShared state across threads or async tasks needs deliberate synchronization design. `Arc` can keep data alive across boundaries, but shared mutation still needs a safe access pattern. The question is not only whether the data lives long enough, but also whether concurrent readers and writers are coordinated correctly.\n\nDefensive Rust avoids hiding lifecycle problems with broad global state or unnecessary shared ownership. It makes task ownership explicit. It passes owned messages where that is clearer. It uses weak references for non-owning relationships. It treats cancellation, cleanup, and shutdown as normal parts of the API.",
  "narrationPoints": [
    "Async tasks and threads make ownership visible.",
    "This requirement protects against stale references.",
    "Long-lived tasks should have cancellation behavior.",
    "Shared state across threads or async tasks needs deliberate.",
    "Defensive Rust avoids hiding lifecycle problems with broad.",
    "The compiler pushes the design toward ownership transfer."
  ]
};
