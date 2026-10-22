window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-b4d2e84e44",
  "questions": {
    "q1": {
      "options": {
        "A": "Eventual deallocation does not establish valid bounds or lifetime at each earlier access.",
        "B": "Stable global addresses do not prevent invalid indexing, races, or ended subobject lifetimes.",
        "C": "Every memory access needs a live object and an appropriate valid range.",
        "D": "Lifetime and access bounds are central memory-safety obligations alongside resource cleanup."
      }
    },
    "q2": {
      "options": {
        "A": "Owners control lifetime responsibility, while borrowers access objects within the owner's validity guarantee.",
        "B": "Borrowers do not receive equivalent destruction authority merely by holding an access path.",
        "C": "Ownership concerns lifetime responsibility and is distinct from read or mutation permissions.",
        "D": "Ordinary borrowing does not keep the target alive after its owner destroys it."
      }
    },
    "q3": {
      "options": {
        "A": "RAII normally releases resources as owners end rather than always waiting for process exit.",
        "B": "Acquisition can fail partway, so successfully acquired resources still need cleanup ownership.",
        "C": "RAII provides cleanup but cannot automatically reconstruct or repair arbitrary failed operations.",
        "D": "Tying release to owner lifetime reduces missed cleanup on normal and exceptional paths."
      }
    },
    "q4": {
      "options": {
        "A": "shared_ptr represents deliberately shared lifetime responsibility rather than exclusive ownership.",
        "B": "unique_ptr provides a movable, noncopyable owner for exclusive dynamic lifetime responsibility.",
        "C": "weak_ptr observes shared ownership without keeping the target alive by itself.",
        "D": "span is a bounded view and does not own the elements it exposes."
      }
    },
    "q5": {
      "options": {
        "A": "Unchecked indexing does not automatically adjust an invalid index into the valid range.",
        "B": "Keeping size beside storage makes bounds reasoning easier than pointer-only interfaces.",
        "C": "Views borrow storage and can become invalid when their source owner is destroyed.",
        "D": "Requested subranges still need validation against the current available extent."
      }
    },
    "q6": {
      "options": {
        "A": "Const qualification does not make a reference dangling when its target remains valid.",
        "B": "A reference member or raw reference does not automatically create smart-pointer ownership.",
        "C": "Referencing or forwarding a reference does not by itself end its target's lifetime.",
        "D": "A reference dangles when its target no longer supports the intended object access."
      }
    },
    "q7": {
      "options": {
        "A": "An invalidated iterator is not merely slower; further operations may be undefined.",
        "B": "Container mutation can invalidate iterators according to the container's specific operation rules.",
        "C": "Continuing with an invalidated iterator can access stale storage or violate algorithm preconditions.",
        "D": "Invalidation does not generally replace an iterator with a detectable null value."
      }
    },
    "q8": {
      "options": {
        "A": "Indeterminate values can undermine decisions and may produce invalid or undefined behavior.",
        "B": "Uninitialized non-static automatic objects are not universally zero-initialized by C++.",
        "C": "Discarding a result does not generally legitimize reading an indeterminate value.",
        "D": "Automatic and dynamic storage both require the appropriate initialization before use."
      }
    },
    "q9": {
      "options": {
        "A": "Sanitizers find classes of exercised defects but do not certify all code defect-free.",
        "B": "Static analysis does not observe every actual runtime interleaving or replace concurrency testing.",
        "C": "Instrumentation and analysis expose different memory and undefined-behavior defects during development.",
        "D": "Diagnostic tools do not automatically repair unsafe operations in deployed binaries."
      }
    },
    "q10": {
      "options": {
        "A": "Map ownership and establish tests before blindly introducing shared ownership into legacy code.",
        "B": "Prioritize dangerous boundaries and improve contracts in small changes supported by tools.",
        "C": "Comments alone cannot enforce safe lifetime or bounds at a risky interface.",
        "D": "A large coordinated rewrite can expand regression risk and obscure individual ownership changes."
      }
    }
  }
};
