window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-25441c6924",
  "questions": {
    "q01": {
      "options": {
        "A": "C++ abstractions do not automatically validate every input or enforce application policy.",
        "B": "Unsafe conversions, parsing, lifetimes, and resource consumption remain possible in C++ code.",
        "C": "C++ applications commonly consume external data from many local and network sources.",
        "D": "Input-handling vulnerabilities affect C++ as well as C and other languages."
      }
    },
    "q02": {
      "options": {
        "A": "Local files and process configuration can also carry untrusted or malformed data.",
        "B": "Keyboard input is only one of many externally influenced input sources.",
        "C": "Treat every listed external source according to its trust boundary and validation contract.",
        "D": "Known users can still supply malformed input or have compromised accounts."
      }
    },
    "q03": {
      "options": {
        "A": "string_view borrows its source and does not own memory indefinitely.",
        "B": "string_view describes bytes without validating their encoding or application meaning.",
        "C": "An empty string_view is representable and still needs appropriate consumer behavior.",
        "D": "Retaining a view beyond its source lifetime can leave dangling borrowed access."
      }
    },
    "q04": {
      "options": {
        "A": "Check success and complete consumption because extraction can fail or stop before input ends.",
        "B": "Stream extraction can fail on malformed, missing, or out-of-range values.",
        "C": "Streams commonly report failure through state flags unless exception behavior is configured.",
        "D": "A successful parse still needs range, semantic, and application-policy validation."
      }
    },
    "q05": {
      "options": {
        "A": "A successfully parsed number can still exceed the application's permitted domain.",
        "B": "Validate numeric values against their intended size, index, count, or offset limits.",
        "C": "Signedness affects conversions and comparisons, particularly when negative input is involved.",
        "D": "Integer sizes and indexes also require explicit range checks before use."
      }
    },
    "q06": {
      "options": {
        "A": "Narrowing can discard information or reinterpret values outside the destination's valid range.",
        "B": "Numeric conversion does not encrypt the value or protect its confidentiality.",
        "C": "A cast does not automatically establish destination bounds or domain validity.",
        "D": "Narrowing changes numeric representation rather than interpreting a value as a file path."
      }
    },
    "q07": {
      "options": {
        "A": "Allocation limits address resource consumption rather than presentation or syntax highlighting.",
        "B": "Resource limits mitigate exhaustion but do not eliminate every application logic defect.",
        "C": "Bound untrusted allocation sizes to prevent excessive memory consumption and denial of service.",
        "D": "Limiting allocations does not establish identity or replace authentication checks."
      }
    },
    "q08": {
      "options": {
        "A": "Path traversal concerns unintended filesystem access rather than a container abstraction.",
        "B": "A compiler optimization does not define an application's allowed filesystem locations.",
        "C": "Logging formats are separate from resolving an attacker-influenced file access path.",
        "D": "Path traversal allows input to direct access beyond the intended filesystem boundary."
      }
    },
    "q09": {
      "options": {
        "A": "An extension is only part of a name and does not prove content type.",
        "B": "Names and extensions can misrepresent the bytes actually contained in a file.",
        "C": "A plausible extension does not prevent malformed or hostile file contents.",
        "D": "Content and schema validation remain necessary regardless of the file's extension."
      }
    },
    "q10": {
      "options": {
        "A": "Validate declared lengths against representation, available bytes, arithmetic, and resource policy.",
        "B": "Embedded fields remain untrusted even when they appear in a structured format.",
        "C": "Counts themselves must be checked before they drive bounds-sensitive iteration or allocation.",
        "D": "Structured messages can be truncated, corrupted, inconsistent, or intentionally hostile."
      }
    },
    "q11": {
      "options": {
        "A": "Continuing after a required failed check can execute an unauthorized or invalid operation.",
        "B": "Silently ignoring malformed data can leave unsafe or ambiguous application state.",
        "C": "Failing closed stops the protected operation safely when required validation cannot succeed.",
        "D": "Error handling is needed to reject safely and preserve a valid state."
      }
    },
    "q12": {
      "options": {
        "A": "RAII manages resources and does not automatically validate input syntax or meaning.",
        "B": "Resource cleanup does not determine whether a caller is authorized for an operation.",
        "C": "RAII supports cleanup around failures rather than preventing every exception from occurring.",
        "D": "A scoped owner releases resources with its lifetime, reducing missed cleanup paths."
      }
    },
    "q13": {
      "options": {
        "A": "Malformed tests exercise realistic failures from incomplete, oversized, corrupted, and hostile sources.",
        "B": "Valid examples do not establish safe rejection behavior for malformed inputs.",
        "C": "Controlled invalid-input tests help expose vulnerabilities before they reach deployed systems.",
        "D": "The language does not prevent external sources from supplying malformed data."
      }
    },
    "q14": {
      "options": {
        "A": "Sanitizers do not infer every intended business invariant or detect all logic flaws.",
        "B": "Instrumentation can expose exercised memory errors, undefined behavior, and boundary violations.",
        "C": "Tools cannot establish every requirement that was omitted from the application's specification.",
        "D": "Authentication policy errors generally require explicit policy tests and review beyond sanitizer checks."
      }
    },
    "q15": {
      "options": {
        "A": "std::string owns bytes without making their external content trustworthy or semantically valid.",
        "B": "Compilation does not prove runtime inputs satisfy application bounds and trust contracts.",
        "C": "Use abstractions alongside explicit trust, parsing, lifetime, bounds, and resource checks.",
        "D": "Local files can be stale, corrupted, replaced, or controlled by untrusted actors."
      }
    }
  }
};
