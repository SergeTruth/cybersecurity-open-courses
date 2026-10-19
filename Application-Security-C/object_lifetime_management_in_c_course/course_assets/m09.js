window.COURSE_MODULE = {
  "title": "Cleanup, Destruction, and Failure Paths",
  "graphicAlt": "Construction progress limits teardown to acquired owned resources, with explicit failure and repeated-cleanup contracts.",
  "narration": "Cleanup and destruction are lifetime transitions. They are not just housekeeping at the end of a function. A destroy routine may release memory, close resources, invalidate members, clear ownership, and make future use of an object invalid. That transition should be deliberate and documented.\n\nDestroy functions should free only resources owned by the object or component they are destroying. They should not release borrowed data or memory owned by another layer. If a destroy function also clears pointers, unregisters callbacks, or detaches from containers, those side effects should be part of the contract.\n\nPartial initialization needs selective teardown. If construction fails after some members have been initialized, cleanup should release those members and leave uninitialized members alone. This is easiest when fields start in known states and construction progress is tracked clearly.\n\nError paths should leave predictable state. A failed function should define whether output pointers are unchanged, null, partially initialized, or caller-owned. It should not leave callers guessing which cleanup function to call or whether an object escaped before failure.\n\nRepeated cleanup behavior must be documented. Some cleanup helpers are intentionally safe to call more than once. Others are valid only for live objects and must not be repeated. Either design can be acceptable when stated clearly, implemented consistently, and tested in the paths the API promises to support.",
  "narrationPoints": [
    "A destroy routine may release memory, close resources, invalidate members, clear ownership, and make future use of an object invalid.",
    "Destroy functions should free only resources owned by the object or component they are destroying.",
    "If construction fails after some members have been initialized, cleanup should release those members and leave uninitialized members alone.",
    "A failed function should define whether output pointers are unchanged, null, partially initialized.",
    "Either design can be acceptable when stated clearly, implemented consistently, and tested in the paths the API promises to support."
  ]
};
