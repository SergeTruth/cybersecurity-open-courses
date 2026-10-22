window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-c6facd41d6",
  "questions": {
    "q1": {
      "options": {
        "A": "Incorrect comments can hide defects but do not themselves perform an invalid memory operation.",
        "B": "Violating an object's access, extent, lifetime, or representation contract can expose or alter unintended storage and program state.",
        "C": "A correctly owned allocation followed by one valid release is normal resource management.",
        "D": "Address presentation does not determine whether a memory access respects object rules."
      }
    },
    "q2": {
      "options": {
        "A": "An ordinary pointer does not expose the full allocation's capacity as portable metadata.",
        "B": "An address can remain stored after the referenced object's lifetime ends.",
        "C": "Safe access needs explicit size, lifetime, ownership, and mutability assumptions beyond the reference value alone.",
        "D": "Pointers can refer to array elements, provided accesses respect the valid object range."
      }
    },
    "q3": {
      "options": {
        "A": "Different storage durations determine when an object exists, while dynamic ownership must arrange its eventual release.",
        "B": "Returning from a function does not automatically free every heap object it allocated.",
        "C": "Block-lifetime, program-lifetime, and explicitly managed allocation lifetimes differ materially.",
        "D": "A pointer returned to an expired automatic object does not preserve its validity."
      }
    },
    "q4": {
      "options": {
        "A": "Cleanup can end an object's lifetime and invalidate all its retained references.",
        "B": "Lifetime rules determine valid execution rather than merely naming or commenting style.",
        "C": "An old address does not authorize access after the object it designated has ceased to exist.",
        "D": "Assignment stores a reference without extending the target's lifetime indefinitely."
      }
    },
    "q5": {
      "options": {
        "A": "Out-of-bounds operations can disclose data, corrupt state, or invoke undefined behavior.",
        "B": "Invalid reads can expose unintended contents, while invalid writes can change unrelated objects and state.",
        "C": "An oversized write does not request a larger allocation automatically.",
        "D": "Both read and write operations need valid ranges and accessible live storage."
      }
    },
    "q6": {
      "options": {
        "A": "Newly allocated storage need not already contain meaningful application data.",
        "B": "Appending and copying need available destination capacity as well as current content length.",
        "C": "Count tracks populated content while capacity limits storage; operations must maintain their relationship in consistent units.",
        "D": "These quantities can use bytes or elements according to the interface, not fixed opposing meanings."
      }
    },
    "q7": {
      "options": {
        "A": "Strlen receives a pointer without a separate intended-capacity argument.",
        "B": "A character array can hold unterminated data rather than a valid string.",
        "C": "A terminator does not establish how much additional data a destination can hold.",
        "D": "String APIs can continue scanning or writing unless the program ensures valid termination and sufficient bounds."
      }
    },
    "q8": {
      "options": {
        "A": "An allocator sees the already computed byte value and cannot infer an overflowed original expression.",
        "B": "Finite integer representations can overflow or wrap during size calculations.",
        "C": "Incorrect results can influence allocation, indexing, and copying before any printed output.",
        "D": "Under-allocation from invalid arithmetic makes later accesses exceed the storage actually acquired."
      }
    },
    "q9": {
      "options": {
        "A": "A transfer contract identifies which component retains authority to access, resize, or release the resource.",
        "B": "Observing a pointer does not make a component its owner.",
        "C": "Dynamic resources especially need clear release and borrowing responsibilities.",
        "D": "Documentation guides cleanup implementation rather than releasing resources itself."
      }
    },
    "q10": {
      "options": {
        "A": "Unexercised paths and unsupported checks can leave defects after a clean run.",
        "B": "Independent checks expose different symptoms and assumptions, making early investigation and regression prevention more effective.",
        "C": "Tools need intended bounds and ownership rules to assess correct use.",
        "D": "These checks are useful in development and CI before production failures occur."
      }
    }
  }
};
