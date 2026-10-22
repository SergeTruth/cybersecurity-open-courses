window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-e0e684b5c9",
  "questions": {
    "q01": {
      "options": {
        "A": "C input APIs do not automatically enforce every application format and safety requirement.",
        "B": "Explicit size, representation, arithmetic, lifetime, and termination rules are needed before external values affect sensitive operations.",
        "C": "Native C code can still contain invalid reads, writes, and object-lifetime mistakes.",
        "D": "Files, arguments, devices, and networks can supply malformed or attacker-influenced data."
      }
    },
    "q02": {
      "options": {
        "A": "Local sources can also cross identities and trust assumptions and need validation.",
        "B": "Data from scripts, configuration, and devices can be unsafe even without a form.",
        "C": "Each listed source can carry unexpected runtime values that must satisfy an explicit application contract.",
        "D": "Internet transport is not required for input to be malformed or less trusted."
      }
    },
    "q03": {
      "options": {
        "A": "A null-terminated string contract lets the function locate the end only while that terminator remains within valid accessible storage.",
        "B": "A zero byte marks termination rather than encrypting the preceding characters.",
        "C": "Termination does not establish valid content, encoding, or field meaning.",
        "D": "A terminated prefix can still be truncated and unacceptable for the intended use."
      }
    },
    "q04": {
      "options": {
        "A": "Authentication is distinct from an incorrect numeric endpoint or element bound.",
        "B": "Compiler optimization does not define the application logic defect called off-by-one.",
        "C": "An extra or missing element can break safety rather than provide secure parsing.",
        "D": "A one-element or one-byte boundary mistake can include an invalid endpoint or omit required storage such as a terminator."
      }
    },
    "q05": {
      "options": {
        "A": "Ignoring results can turn failed or incomplete input into apparently usable values.",
        "B": "Actual outcomes establish how much input arrived and whether the expected representation was obtained before further processing.",
        "C": "A function outcome does not prove that every allocation or size calculation is safe.",
        "D": "Successful input still needs valid bounds and application-specific value constraints."
      }
    },
    "q06": {
      "options": {
        "A": "Unbounded input can exceed the destination regardless of expected typical line length.",
        "B": "A pointer must designate valid storage before a function writes input through it.",
        "C": "Known capacity and checked input status bound the write; callers must also handle line completion and oversized input deliberately.",
        "D": "Ignoring newline and truncation can split one logical record into unintended later operations."
      }
    },
    "q07": {
      "options": {
        "A": "Successful conversion proves only part of the contract; actual counts and indexes must fit their intended object and policy ranges.",
        "B": "A parsed number can still be negative, excessive, or invalid for the current operation.",
        "C": "Width and signedness affect conversion, comparison, arithmetic, and representable ranges.",
        "D": "A valid number does not authorize the caller to use the referenced resource."
      }
    },
    "q08": {
      "options": {
        "A": "Arithmetic failures do not universally trap before the resulting value reaches the allocator.",
        "B": "Computed sizes affect executable memory behavior rather than comments alone.",
        "C": "Overflow changes numeric results and does not provide cryptographic protection.",
        "D": "A wrapped result can request too little storage while later code still copies or indexes the larger intended amount."
      }
    },
    "q09": {
      "options": {
        "A": "Copy functions do not define the filesystem boundary problem called path traversal.",
        "B": "Caller-controlled resolution can reach files outside the workflow's approved root unless scope is deliberately enforced.",
        "C": "A compiler need not warn about a runtime path that violates the application's access policy.",
        "D": "Traversal concerns filesystem name resolution rather than one network protocol."
      }
    },
    "q10": {
      "options": {
        "A": "A caller can rename a file without changing its actual byte format.",
        "B": "Content and structural checks remain necessary even when an extension is allowed.",
        "C": "Filename metadata can disagree with actual contents and therefore cannot establish safe interpretation alone.",
        "D": "Malformed bytes can appear under a conventional or expected filename suffix."
      }
    },
    "q11": {
      "options": {
        "A": "Declared counts and lengths must fit actual data, representable arithmetic, and safe processing limits before access or allocation.",
        "B": "A field inside a binary message is still externally supplied input.",
        "C": "The declared value must be checked rather than trusted as its own bound.",
        "D": "Binary data can be truncated, corrupted, inconsistent, or deliberately crafted."
      }
    },
    "q12": {
      "options": {
        "A": "Continuing after a required check fails can use state whose safety was never established.",
        "B": "Silently ignoring malformed input does not define a safe operation outcome.",
        "C": "Error handling is needed to preserve invariants and release resources on rejection.",
        "D": "Fail-closed handling prevents unvalidated input from causing the requested sensitive effect and leaves a defined safe state."
      }
    },
    "q13": {
      "options": {
        "A": "Valid examples omit the rejection and recovery paths exposed by malformed input.",
        "B": "Real input includes incomplete and excessive values, so tests need to verify bounded rejection and consistent failure state.",
        "C": "Testing invalid cases can reveal flaws before deployment rather than creating the underlying defect.",
        "D": "The C language does not make outside data well-formed automatically."
      }
    },
    "q14": {
      "options": {
        "A": "Business meaning needs explicit application assertions and is not universally inferred by sanitizers.",
        "B": "Authentication correctness is not established by ordinary memory instrumentation alone.",
        "C": "Instrumented execution exposes selected memory and language violations on the paths exercised by the tests.",
        "D": "Tools do not automatically identify every requirement the application should have specified."
      }
    },
    "q15": {
      "options": {
        "A": "Source-aware checks must establish safe lengths, values, interpretation, and state before external input controls memory or resources.",
        "B": "Copying bytes changes storage location rather than proving their meaning or authority.",
        "C": "String APIs still require valid source termination and accurate destination capacity.",
        "D": "A file can contain malformed or hostile data even when opening it succeeds."
      }
    }
  }
};
