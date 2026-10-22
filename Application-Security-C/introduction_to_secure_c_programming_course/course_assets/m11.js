window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-9edea64679",
  "questions": {
    "q1": {
      "options": {
        "A": "Identifier length does not establish correct bounds, ownership, or input handling.",
        "B": "Direct control over storage and resources makes explicit contracts essential to prevent defects from becoming security failures.",
        "C": "Successful compilation does not validate every runtime input or resource state.",
        "D": "Ordinary C execution does not universally check pointer validity and array bounds."
      }
    },
    "q2": {
      "options": {
        "A": "An ordinary pointer does not identify its owner or cleanup responsibility automatically.",
        "B": "Deallocation through one variable does not rewrite independent pointer copies elsewhere.",
        "C": "Clear ownership and lifetime rules prevent resources from being leaked, released repeatedly, or accessed after they expire.",
        "D": "Automatic local objects generally cease to be valid when their declaring block's lifetime ends."
      }
    },
    "q3": {
      "options": {
        "A": "Capacity and termination must be enforced explicitly because ordinary operations do not supply universal runtime protection.",
        "B": "String functions rely on an in-bounds null terminator and can fail without one.",
        "C": "A C string pointer does not generally include destination-capacity metadata.",
        "D": "Untrusted inputs can exceed a fixed destination's available storage."
      }
    },
    "q4": {
      "options": {
        "A": "Valid input can still encounter resource failures requiring cleanup and error handling.",
        "B": "File and socket contents can originate from untrusted or malformed sources.",
        "C": "Outside values can direct memory, filesystem, state, and resource operations whose preconditions must hold before use.",
        "D": "Copying itself needs safe bounds; delaying validation can cause effects before rejection."
      }
    },
    "q5": {
      "options": {
        "A": "Formatting functions interpret conversion directives rather than ignore their syntax.",
        "B": "Fixed application-controlled formats keep untrusted strings as values instead of allowing them to select formatting operations.",
        "C": "Format directives can affect argument interpretation and memory behavior rather than typography alone.",
        "D": "Giving untrusted data control of format syntax expands its ability to influence execution."
      }
    },
    "q6": {
      "options": {
        "A": "Numeric lengths and counts directly determine allocations, indexes, and copy ranges.",
        "B": "Sign and width changes can invalidate comparisons and representation assumptions.",
        "C": "Incorrect arithmetic can allocate less storage than later code believes is available and defeat intended bounds checks.",
        "D": "Overflow does not universally trap or stop execution before a computed size is used."
      }
    },
    "q7": {
      "options": {
        "A": "Cleanup diagnostics should avoid disclosing secret-bearing memory and unnecessary internal details.",
        "B": "Errors can already have acquired resources and need partial-state cleanup.",
        "C": "C does not automatically release every file or heap allocation after an ordinary function call.",
        "D": "Explicit failure cleanup releases only owned valid resources and preserves a defined state after incomplete operations."
      }
    },
    "q8": {
      "options": {
        "A": "Undefined behavior has no required identical result across compilers, builds, or architectures.",
        "B": "Undefined execution can affect actual program behavior rather than source documentation alone.",
        "C": "Optimizers may assume undefined operations do not occur and need not preserve a programmer's expected fallback.",
        "D": "Once a language requirement is violated, code cannot rely on the usual intended execution guarantees."
      }
    },
    "q9": {
      "options": {
        "A": "Complementary diagnostics expose likely defects and exercised failures without establishing universal correctness.",
        "B": "A clean application run does not prove every dependency and untested path is safe.",
        "C": "Warnings and instrumented tests can find defects during development and CI.",
        "D": "Tools support intended contracts that still need design and code review."
      }
    },
    "q10": {
      "options": {
        "A": "Untracked storage extent and lifetime leave later memory operations without reliable preconditions.",
        "B": "A baseline coordinates trust, memory, arithmetic, formatting, resource lifecycle, and verification rather than relying on one feature.",
        "C": "Happy-path success omits malformed input, boundary conditions, and partial-failure behavior.",
        "D": "Raw diagnostic content can expose private data and access invalid storage during errors."
      }
    }
  }
};
