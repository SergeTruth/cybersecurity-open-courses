window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-8b9888461f",
  "questions": {
    "q01": {
      "options": {
        "A": "Out-of-bounds reads can disclose secrets, and writes can alter control data.",
        "B": "Raw subscripts and pointer operations generally do not perform automatic bounds checks.",
        "C": "Heap storage, container elements, and borrowed ranges also require bounds safety.",
        "D": "An access outside the live range can disclose or corrupt neighboring storage."
      }
    },
    "q02": {
      "options": {
        "A": "Non-nullness says nothing about allocation size or whether storage remains live.",
        "B": "Safe use also needs the extent, ownership contract, and valid lifetime interval.",
        "C": "Derived pointer values do not carry a recoverable array length automatically.",
        "D": "Virtual-memory mappings describe pages rather than individual C++ object boundaries."
      }
    },
    "q03": {
      "options": {
        "A": "Array decay changes the expression to a pointer without copying its elements.",
        "B": "The resulting pointer type retains the element type but loses array extent.",
        "C": "Losing the element count makes pointer-only function contracts harder to verify.",
        "D": "The pointer permits indexing, including invalid indexes unless callers enforce bounds."
      }
    },
    "q04": {
      "options": {
        "A": "These types expose bounds, but unchecked subscripting does not universally validate them.",
        "B": "A span borrows storage and cannot extend the underlying owner's lifetime.",
        "C": "Vector reallocation can still invalidate existing pointers, references, and iterators.",
        "D": "Keeping size with data makes range checks and API contracts easier to express."
      }
    },
    "q05": {
      "options": {
        "A": "Explicit counters and endpoints often fail at empty or final-element boundaries.",
        "B": "For a nonempty array the last valid index is count minus one.",
        "C": "Range-based loops traverse their range without an automatic extra final iteration.",
        "D": "Half-open ranges simplify empty cases; inclusive bounds still require careful validation."
      }
    },
    "q06": {
      "options": {
        "A": "Even a small length can exceed storage when the starting offset is late.",
        "B": "Check start against size and length against the remaining size before access.",
        "C": "Unsigned addition can wrap, making a sum-based bounds check accept invalid ranges.",
        "D": "Positive length does not establish a valid starting address or available extent."
      }
    },
    "q07": {
      "options": {
        "A": "A parsed integer must still satisfy sign, representation, and actual range constraints.",
        "B": "Casting negative values to size_t can produce very large unsigned values.",
        "C": "Validate external values before conversion, arithmetic, allocation, or indexing consumes them.",
        "D": "A checksum does not establish trustworthy lengths or agreement with available bytes."
      }
    },
    "q08": {
      "options": {
        "A": "A pointer alone cannot establish accessible extent or an adequate output capacity.",
        "B": "Iterators can become invalid, so APIs must explain their lifetime and invalidation rules.",
        "C": "Expected output size is not a substitute for an explicit verified capacity.",
        "D": "Explicit units, ranges, owners, capacities, and failures give callers enforceable obligations."
      }
    },
    "q09": {
      "options": {
        "A": "Sanitizers check executed operations rather than proving every possible access safe.",
        "B": "Empty ranges are common edge cases that reveal underflow and endpoint mistakes.",
        "C": "Instrumentation and edge tests detect exercised defects and guard against their return.",
        "D": "Warnings cannot replace execution tests for dynamically computed indexes and sizes."
      }
    },
    "q10": {
      "options": {
        "A": "Bounded adapters and regression tests support gradual migration while checking observable behavior.",
        "B": "An adapter can validate pointer-and-length contracts without requiring a complete rewrite.",
        "C": "Regression coverage helps distinguish intended behavior from defects during incremental changes.",
        "D": "Parameter names do not enforce any range, lifetime, or capacity requirement."
      }
    }
  }
};
