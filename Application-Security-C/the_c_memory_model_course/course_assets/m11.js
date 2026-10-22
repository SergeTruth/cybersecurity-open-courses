window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-ab5ec2ba5c",
  "questions": {
    "q01": {
      "options": {
        "A": "Language-level object and access rules explain valid storage use and concurrent behavior beyond one machine's memory diagram.",
        "B": "One operating system's layout does not define every C object and concurrency rule.",
        "C": "Physical RAM capacity does not establish object lifetime, access type, or ordering.",
        "D": "Non-nullness alone does not prove that a pointer designates a valid accessible object."
      }
    },
    "q02": {
      "options": {
        "A": "Storage availability and object existence are related but safe use must also satisfy the object's actual language-defined lifetime and access rules.",
        "B": "The concepts apply beyond stack storage and are not universally interchangeable labels.",
        "C": "Automatic and dynamic objects have lifetimes just as static objects do.",
        "D": "Existing storage does not prove that every reference has valid type, bounds, and initialization."
      }
    },
    "q03": {
      "options": {
        "A": "Stored address bits do not extend object existence; references must not be used after their target lifetime ends.",
        "B": "Copying a pointer does not keep the referenced object alive permanently.",
        "C": "A non-null value can be stale, out of bounds, or otherwise invalid.",
        "D": "Pointer access must respect the lifetime of the object being designated."
      }
    },
    "q04": {
      "options": {
        "A": "Accesses must satisfy effective-type and alignment requirements; a pointer cast does not establish those conditions by itself.",
        "B": "Aliasing and type rules affect executable behavior rather than source indentation.",
        "C": "Casts can change pointer types without making the eventual access legal or aligned.",
        "D": "These rules also govern scalar, array, dynamically allocated, and structured storage."
      }
    },
    "q05": {
      "options": {
        "A": "Raw object bytes can include non-field padding and stale data, making bytewise decisions or disclosure different from deliberate field handling.",
        "B": "Padding is not a portable application field with a defined semantic value.",
        "C": "Uninitialized data does not supply a reliable portable application value.",
        "D": "Explicit serialization chooses valid fields and representation rather than copying every native storage byte."
      }
    },
    "q06": {
      "options": {
        "A": "A function receiving a decayed pointer generally needs separate size information to enforce valid array accesses.",
        "B": "Array elements are contiguous according to their type, but that does not encode the count in a pointer.",
        "C": "An ordinary pointer does not generally carry its originating array's full length.",
        "D": "The language does not require a runtime length header for every array."
      }
    },
    "q07": {
      "options": {
        "A": "Nonzero resize failure must preserve the original handle, while successful resizing can change storage and invalidate prior reference assumptions.",
        "B": "Independent pointer copies are not rewritten automatically when an allocation moves.",
        "C": "Resizing can end the old allocation's lifetime and require fresh references to the result.",
        "D": "New capacity is not automatically initialized to every application's required field invariants."
      }
    },
    "q08": {
      "options": {
        "A": "Code must respect sequencing rules and avoid undefined operations rather than rely on one observed evaluation result.",
        "B": "C does not generally specify left-to-right evaluation for every subexpression.",
        "C": "Undefined behavior does not have one mandatory portable fallback result.",
        "D": "Optimization need not preserve assumptions that contradict the language's required preconditions."
      }
    },
    "q09": {
      "options": {
        "A": "Conflicting non-atomic accesses without required synchronization can create a C data race and undefined behavior.",
        "B": "Volatile does not supply general atomicity or a complete inter-thread happens-before relationship.",
        "C": "Concurrent conflicting accesses are not automatically ordered into a safe sequence.",
        "D": "Mutex protocols can establish the synchronization needed to protect shared state."
      }
    },
    "q10": {
      "options": {
        "A": "A complete baseline ties valid objects and references to bounds, representation, initialization, lifetime, arithmetic, and concurrency contracts.",
        "B": "A printable nonzero address does not establish any of the object's required validity conditions.",
        "C": "Current behavior from one build does not prove a fragile assumption is portable or language-defined.",
        "D": "Missing ownership, initialization, and synchronization rules leave core memory-safety requirements unestablished."
      }
    }
  }
};
