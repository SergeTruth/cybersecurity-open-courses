window.COURSE_MODULE = {
  "title": "Shared State, Ownership, and Correctness Contracts",
  "graphicAlt": "An ownership diagram assigns shared data, locks, operation permissions, returned-value lifetimes, and shutdown responsibility to a concurrent structure.",
  "narration": "A concurrent data structure needs a correctness contract before it needs a clever implementation. The contract answers simple questions that become urgent under load: who owns the structure, which threads may read it, which threads may modify it, and what a caller is allowed to keep after an operation returns. If the contract is vague, each caller fills in the blanks differently. One caller may assume a reference remains valid. Another may assume a lookup and erase cannot interleave. A third may combine operations that were only designed to be safe one at a time.\n\nOwnership boundaries are especially important. Sometimes a structure owns every object it stores. Sometimes it only indexes objects owned elsewhere. Sometimes it returns shared ownership, snapshots, or short-lived views. Each model can be valid, but it must be documented and enforced by the API. A design that returns a pointer to internal state also transfers responsibility to the caller. That may be acceptable only when the caller receives a scoped guard, a shared ownership handle, or another mechanism that makes the lifetime rule visible.\n\nInvariants often span more than one field. A container may be paired with a size counter, a map may be paired with a reverse index, and a cache may be paired with timestamps and eviction metadata. Protecting only the obvious container is not enough if related fields can change separately. The contract should identify which lock, ownership rule, or synchronization boundary protects each invariant. Good tests and code review then have something concrete to verify. Defensive design turns concurrency from a set of private assumptions into a shared engineering agreement.",
  "narrationPoints": [
    "A concurrent data structure needs a correctness contract before it needs a clever implementation.",
    "Another may assume a lookup and erase cannot interleave.",
    "Sometimes a structure owns every object it stores.",
    "A design that returns a pointer to internal state also transfers responsibility to the caller.",
    "Protecting only the obvious container is not enough if related fields can change separately.",
    "Defensive design turns concurrency from a set of private assumptions into a shared engineering agreement."
  ]
};
