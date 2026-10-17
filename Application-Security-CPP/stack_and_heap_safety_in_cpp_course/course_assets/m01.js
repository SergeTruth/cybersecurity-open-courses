window.COURSE_MODULE = {
  "title": "Stack, Heap, and Memory Safety Basics",
  "graphicAlt": "Automatic and dynamic storage both require valid lifetimes, preserved bounds and explicit ownership.",
  "narration": "Stack and heap safety is a practical memory-safety discipline. C++ gives engineers direct control over storage duration, object lifetime, ownership, and performance. That control is one reason C++ is useful in systems, services, engines, and infrastructure. It is also why memory decisions must be explicit enough for maintainers to review.\n\nAutomatic storage, often described as stack storage, is commonly used for local objects whose lifetime follows scope. Dynamic storage, often described as heap storage, is used when an object needs a size, lifetime, or ownership model that is not tied to one simple scope. Neither choice is automatically safe or unsafe. A stack buffer can still be accessed out of bounds. A heap object can be managed safely through clear ownership and RAII. The real questions are whether the object exists, whether access stays within bounds, and who is responsible for cleanup.\n\nMemory safety depends on connecting these decisions. Lifetime tells us when an object is valid. Bounds tell us which memory belongs to it. Ownership tells us who releases or transfers it. Interfaces tell reviewers whether access is owning, borrowed, short-lived, or shared. When those answers are hidden, defects such as stale pointers, leaks, double cleanup, and invalid buffer access become harder to catch.\n\nSafer C++ is not about banning the heap or avoiding every low-level construct. It is about making memory assumptions visible, bounded, and maintainable so performance and control do not come at the expense of reliability or security.",
  "narrationPoints": [
    "C++ gives engineers direct control over storage duration, object lifetime, ownership, and performance.",
    "Dynamic storage, often described as heap storage, is used when an object needs a size, lifetime, or ownership model that is not tied to one simple scope.",
    "The real questions are whether the object exists, whether access stays within bounds, and who is responsible for cleanup.",
    "Automatic storage, often described as stack storage, is commonly used for local objects whose lifetime follows scope.",
    "Bounds tell us which memory belongs to it.",
    "Safer C++ is not about banning the heap or avoiding every low-level construct."
  ]
};
