window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-f5fbff6802",
  "questions": {
    "q1": {
      "options": {
        "A": "Logging a byte slice does not define a buffer overflow or its memory boundary failure.",
        "B": "Access beyond an intended buffer boundary can read or modify memory outside the valid region.",
        "C": "Cargo manages packages and builds; buffer overflows concern invalid memory access rather than package resolution.",
        "D": "Safe vector resizing maintains allocation invariants instead of permitting access outside the valid buffer."
      }
    },
    "q2": {
      "options": {
        "A": "Safe access remains bounds checked in release builds unless the compiler can prove the check unnecessary.",
        "B": "Arbitrary bytes are not automatically valid UTF-8 and require explicit validation before text use.",
        "C": "Safe APIs combine checked bounds with ownership and borrowing rules to prevent invalid memory access.",
        "D": "Raw pointers shift validity obligations to manual review rather than being required for ordinary buffers."
      }
    },
    "q3": {
      "options": {
        "A": "A bounds-related panic stops invalid safe access, whereas corruption involves unintended memory reads or writes.",
        "B": "Returning an error reports failure without inherently accessing or modifying memory outside its valid bounds.",
        "C": "A panic does not by itself prove that an attacker modified unrelated or external memory.",
        "D": "Safe Rust can panic, including when direct indexing uses an invalid collection index."
      }
    },
    "q4": {
      "options": {
        "A": "Checked access returns absence or failure for invalid indexes; it does not validate text encoding.",
        "B": "Format validation remains necessary even when buffer access uses checked indexing operations.",
        "C": "Checked access allows invalid input to be rejected rather than guaranteeing every parser accepts it.",
        "D": "Explicitly handling missing elements makes uncertain indexes recoverable without relying on an indexing panic."
      }
    },
    "q5": {
      "options": {
        "A": "Iterators remain governed by Rust's ownership and borrowing rules while exposing collection traversal.",
        "B": "Iterator traversal reduces manual index calculations and the boundary mistakes those calculations can introduce.",
        "C": "Safe iterators do not grant permission to read or write outside valid collection bounds.",
        "D": "Iteration can use shared or mutable access as appropriate; it does not make collections mutable automatically."
      }
    },
    "q6": {
      "options": {
        "A": "Rust supports safe parsing of bytes when code checks structure, lengths, and encoding requirements.",
        "B": "Byte slices can represent text, binary protocols, file contents, and many other data formats.",
        "C": "Raw bytes require an appropriate decoding or validation step before text-specific operations are assumed valid.",
        "D": "Byte slices and strings may describe the same bytes; their lengths have no universal ordering."
      }
    },
    "q7": {
      "options": {
        "A": "Length matters to safe indexing, iteration, parsing, validation, and resource decisions as well as unsafe code.",
        "B": "A vector can reserve capacity beyond its initialized elements, so length and capacity may differ.",
        "C": "Length identifies initialized elements, while capacity describes available allocation space rather than valid readable elements.",
        "D": "Capacity is an allocation measure, not the count of valid Unicode characters in a string."
      }
    },
    "q8": {
      "options": {
        "A": "Safe types do not transform arbitrarily large external input into fixed-size static data.",
        "B": "Standard collections can grow significantly; applications must define and enforce appropriate input and allocation limits.",
        "C": "Resource exhaustion depends on accepted workload and limits rather than whether Cargo launches the build.",
        "D": "Large or complex inputs can exhaust memory, CPU, or time without violating memory-safety rules."
      }
    },
    "q9": {
      "options": {
        "A": "Unsafe and external boundaries require explicit checks of pointer validity, allocation size, lengths, and ownership assumptions.",
        "B": "Language guarantees do not automatically verify unsafe implementations or contracts implemented by external code.",
        "C": "Both String and &str provide safe text abstractions; risk depends on unsafe or incorrectly implemented boundaries.",
        "D": "Safe iterators ordinarily reduce manual bounds risks rather than being the only place overflows can occur."
      }
    },
    "q10": {
      "options": {
        "A": "Removing required length checks can allow unsafe operations to violate their valid buffer bounds.",
        "B": "A sound safe wrapper enforces the preconditions needed to protect buffer lengths, ownership, and valid access.",
        "C": "Undocumented raw-pointer contracts make correct use harder and cannot justify an unrestricted safe interface.",
        "D": "Allocation and deallocation ownership must be explicit rather than left for callers to guess."
      }
    },
    "q11": {
      "options": {
        "A": "One successful input does not exercise truncation, invalid lengths, empty buffers, or other boundary conditions.",
        "B": "Parser boundaries are precisely where malformed lengths and incomplete data need careful verification.",
        "C": "Diverse malformed and boundary inputs test rejection, bounds handling, encoding checks, and predictable failure behavior.",
        "D": "Boundary tests should run during development and release checks instead of waiting until after deployment."
      }
    },
    "q12": {
      "options": {
        "A": "Expected invalid input should normally produce controlled errors rather than routinely triggering panic behavior.",
        "B": "The compiler does not infer parser semantics or enforce every application's business validation requirement.",
        "C": "Replacing safe abstractions with raw pointers expands manual safety obligations instead of eliminating buffer risks.",
        "D": "Combining safe access, validated input, resource bounds, focused unsafe review, and tests protects buffer boundaries."
      }
    }
  }
};
