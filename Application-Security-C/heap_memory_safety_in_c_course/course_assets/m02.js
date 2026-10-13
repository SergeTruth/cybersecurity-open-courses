window.COURSE_MODULE = {
  "title": "The Heap Allocation Mental Model",
  "graphicAlt": "An address points to a heap object whose owner, lifetime, bounds and initialization state must be tracked separately.",
  "narration": "A heap allocation creates storage for an object or sequence of objects with a defined size. The allocation function returns a pointer value that can designate the beginning of that storage. That pointer is useful, but it is not the whole safety story.\n\nA pointer value by itself does not prove ownership, lifetime, bounds, initialization state, or safe use. It does not automatically carry the number of bytes allocated, the number of elements that are valid, or the component responsible for freeing the object. Those facts must be tracked by the program.\n\nA heap object remains valid only for its lifetime. Its lifetime begins after successful allocation and appropriate construction or initialization for the intended use. Its lifetime ends when the owner releases it. Pointer values can continue to exist after that point, but they no longer designate a live object.\n\nThe allocator has a narrow responsibility: provide and reclaim dynamic storage according to its contract. The application owns the higher-level policy. It must decide who can read or write, how capacity is stored, whether aliases are allowed, how resizing works, and when cleanup happens.\n\nA useful mental model separates address from authority. Having a pointer value means code can name storage; it does not mean code is allowed to access it. Safe access depends on context, bounds, object state, lifetime, and the ownership contract that the surrounding API establishes.",
  "narrationPoints": [
    "The allocation function returns a pointer value that can designate the beginning of that storage.",
    "A pointer value by itself does not prove ownership, lifetime, bounds, initialization state, or safe use.",
    "Its lifetime begins after successful allocation and appropriate construction or initialization for the intended use.",
    "The allocator has a narrow responsibility: provide and reclaim dynamic storage according to its contract.",
    "Safe access depends on context, bounds, object state, lifetime, and the ownership contract that the surrounding API establishes."
  ]
};
