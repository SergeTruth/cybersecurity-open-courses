window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-5bc87e287c",
  "questions": {
    "q1": {
      "options": {
        "A": "Unused-variable warnings do not define a write beyond a memory object's capacity.",
        "B": "A buffer overflow writes outside the destination object's permitted storage, potentially corrupting adjacent memory or state.",
        "C": "Comments do not cause an ordinary buffer to exceed its storage bounds.",
        "D": "C does not automatically expand an array when a write exceeds its capacity."
      }
    },
    "q2": {
      "options": {
        "A": "A pointer alone does not generally identify the capacity of the referenced allocation.",
        "B": "Binary data and other memory operations need bounds information just as strings do.",
        "C": "Interfaces must separately preserve the size information needed to check accesses after pointer conversion and function calls.",
        "D": "Decay changes the type information available to code rather than increasing storage."
      }
    },
    "q3": {
      "options": {
        "A": "Length tracks meaningful contents, while capacity bounds storage; safe writes must account for both in consistent units.",
        "B": "A string can occupy only part of the buffer reserved for it.",
        "C": "A partially populated array demonstrates that length can be smaller than capacity.",
        "D": "Content length applies to dynamic and static storage as well as stack buffers."
      }
    },
    "q4": {
      "options": {
        "A": "Integer arrays do not define the ordinary null-terminated C string contract.",
        "B": "C string APIs rely on a terminating zero within valid accessible storage.",
        "C": "The destination must reserve storage for both the intended characters and their terminating null byte.",
        "D": "A declaration does not automatically add runtime capacity beyond the specified object."
      }
    },
    "q5": {
      "options": {
        "A": "Heap storage is bounded by the allocation actually obtained and its valid lifetime.",
        "B": "Every storage duration has object bounds, so safe access still needs correct sizes and valid lifetimes.",
        "C": "Stack allocation does not automatically attach capacity metadata to every pointer call.",
        "D": "A global or static object can still be overwritten beyond its declared extent."
      }
    },
    "q6": {
      "options": {
        "A": "Different APIs interpret their size arguments differently, requiring contract-specific review.",
        "B": "Truncated data can change identifiers, paths, and later program decisions.",
        "C": "A size-taking API still depends on correct bounds and explicit handling of partial output, errors, and termination.",
        "D": "A size parameter can be incorrect or misunderstood and does not make misuse impossible."
      }
    },
    "q7": {
      "options": {
        "A": "The allocator cannot reconstruct the caller's intended size after arithmetic has wrapped.",
        "B": "Lengths and counts directly control allocation, indexing, and copying operations.",
        "C": "Signedness and narrowing can alter values and invalidate later bounds assumptions.",
        "D": "Invalid arithmetic can create storage or limits smaller than subsequent processing assumes."
      }
    },
    "q8": {
      "options": {
        "A": "Hiding lengths makes it harder for callers to establish safe access.",
        "B": "Explicit interfaces still need tests exercising boundaries and failure behavior.",
        "C": "Global storage does not supply a correct buffer capacity or ownership contract.",
        "D": "Inspectable size and lifetime contracts let callers enforce the actual operation's limits before writing."
      }
    },
    "q9": {
      "options": {
        "A": "Complementary checks reveal likely defects and exercised boundary failures without claiming universal correctness.",
        "B": "A clean run does not establish correct use of every dependency on every input.",
        "C": "Development and CI can identify defects before they cause a production incident.",
        "D": "Tools supply evidence while design and review still establish the intended memory contracts."
      }
    },
    "q10": {
      "options": {
        "A": "Ignoring truncation can accept incomplete values and undermine program invariants.",
        "B": "Safe buffers require coordinated input, arithmetic, capacity, lifetime, API, error, and verification controls.",
        "C": "A fixed allocation does not guarantee that every external value will fit.",
        "D": "Raw memory diagnostics can disclose secrets and access invalid storage rather than safely explain an error."
      }
    }
  }
};
