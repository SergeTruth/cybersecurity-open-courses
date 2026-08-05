window.COURSE_MODULE = {
  "title": "Safe Iteration While Modifying Containers",
  "graphicAlt": "Erase-loop diagram showing the returned successor reused after removal while nonremoved elements advance once, correctly handling adjacent expired sessions.",
  "narration": "Many iterator bugs appear when code modifies a container while traversing it. The code may erase an element and then increment an iterator that no longer refers to a valid position. It may insert into a vector and accidentally cause reallocation. It may remove the first or last element and forget that the loop boundary has changed.\n\nSafe mutation logic should make iterator validity visible. Erase operations often return an iterator to the next valid position. When the container contract provides that return value, use it instead of incrementing the invalidated iterator. Keep the loop structure simple enough that a reviewer can tell which iterator is valid after each branch.\n\nSometimes the best solution is two-phase processing. First traverse the container and collect decisions, keys, indexes, or work items. Then apply modifications in a separate step. This can be clearer than mixing traversal, filtering, insertion, erasure, logging, and side effects inside one complicated loop.\n\nTests should cover the cases where mutation code usually breaks: empty containers, one-element containers, removal of the first element, removal of the last element, repeated removal, no-op traversal, and insertion that forces capacity growth. Boundary tests are not busywork. They are how iterator assumptions become visible.\n\nIn defensive C++ review, ask whether every mutation path leaves the next iterator state well defined. If the answer requires a long explanation, the code may need a clearer structure.",
  "narrationPoints": [
    "Many iterator bugs appear when code modifies a container while traversing it.",
    "When the container contract provides that return value, use it instead of incrementing the invalidated iterator.",
    "Safe mutation logic should make iterator validity visible.",
    "First traverse the container and collect decisions, keys, indexes, or work items.",
    "Tests should cover the cases where mutation code usually breaks: empty containers, one-element containers, removal of the first element, removal of the last element, repeated removal, no-op traversal, and insertion that forces capacity growth.",
    "In defensive C++ review, ask whether every mutation path leaves the next iterator state well defined."
  ]
};
