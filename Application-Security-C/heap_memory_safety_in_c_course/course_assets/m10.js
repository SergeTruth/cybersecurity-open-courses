window.COURSE_MODULE = {
  "title": "Course Summary: A Safer Heap Workflow",
  "graphicAlt": "Checked sizing, initialization with ownership, tracked state transitions and single release are supported by contract review and failure-path testing.",
  "narration": "A safer heap workflow starts with intention. Allocate only after validating sizes, initialize objects before use, and define the owner before returning or sharing a pointer. A pointer value should travel with the context needed to use it safely.\n\nTrack bounds, ownership, and lifetime together. Keep capacity and current length consistent. Make ownership transfer explicit. Treat resizing and cleanup as state transitions that can invalidate aliases and change what future code may do.\n\nClean up predictably on every path. Success, failure, partial initialization, early returns, and shutdown should all have understandable release behavior. Free each allocation exactly once through the correct owner, and do not use memory after its lifetime ends.\n\nFinally, validate behavior with reviews and tools. Ask who owns this heap object, how long it remains valid, what bounds apply, what happens on allocation failure, whether cleanup is correct on every path, and whether tests and diagnostics exercise realistic behavior.",
  "narrationPoints": [
    "A pointer value should travel with the context needed to use it safely.",
    "Allocate only after validating sizes, initialize objects before use, and define the owner before returning or sharing a pointer.",
    "Treat resizing and cleanup as state transitions that can invalidate aliases and change what future code may do.",
    "Free each allocation exactly once through the correct owner, and do not use memory after its lifetime ends.",
    "Ask who owns this heap object, how long it remains valid, what bounds apply, what happens on allocation failure."
  ]
};
