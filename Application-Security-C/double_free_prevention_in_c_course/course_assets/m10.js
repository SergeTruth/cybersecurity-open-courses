window.COURSE_MODULE = {
  "title": "Course Summary: One Owner, One Cleanup Path",
  "graphicAlt": "Bullet summary graphic for Course Summary: One Owner, One Cleanup Path.",
  "narration": "The central rule of double-free prevention is simple to say and important to enforce: one allocation should have one clear owner, one valid lifetime, one cleanup authority, and predictable behavior across success, failure, transfer, and teardown.\n\nApply that rule through review questions. Who owns this allocation? Has ownership been transferred? Which path frees it? Could another path free it again? Are borrowed aliases still being used after cleanup? What happens if construction fails halfway through?\n\nDestroy behavior should be documented. Compound objects should free only the members they own. Containers should state whether insertion transfers ownership. APIs should describe returned objects, output parameters, caller-owned buffers, and failure state without forcing callers to guess.\n\nFinally, validate the contract with tools and tests. Exercise failure paths, partial construction, transfer cases, optional members, and cleanup routines. Sanitizers and debug allocators can reveal mistakes, but the durable prevention is explicit ownership, clear lifetimes, predictable cleanup paths, and reviewable API contracts.",
  "narrationPoints": [
    "The central rule of double-free prevention is simple to say and important to enforce: one allocation should have one clear owner.",
    "Are borrowed aliases still being used after cleanup.",
    "APIs should describe returned objects, output parameters, caller-owned buffers, and failure state without forcing callers to guess.",
    "Exercise failure paths, partial construction, transfer cases, optional members, and cleanup routines.",
    "Sanitizers and debug allocators can reveal mistakes, but the durable prevention is explicit ownership, clear lifetimes."
  ]
};
