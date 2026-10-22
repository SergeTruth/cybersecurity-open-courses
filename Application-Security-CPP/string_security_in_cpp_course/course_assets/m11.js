window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-83fc989e6a",
  "questions": {
    "q1": {
      "options": {
        "A": "Text can affect parsing, paths, policy, diagnostics, and many interpreter boundaries.",
        "B": "Being text does not keep data inside a single trust boundary.",
        "C": "std::string owns storage without making externally supplied contents trustworthy.",
        "D": "String handling affects servers, command-line tools, and libraries as well as graphical interfaces."
      }
    },
    "q2": {
      "options": {
        "A": "A source terminator does not establish how much writable capacity a destination has.",
        "B": "A C string pointer does not inherently carry a separate validated length.",
        "C": "APIs expecting C strings may read beyond an unterminated array's valid bounds.",
        "D": "Terminator-based APIs search for zero, so it must occur within valid accessible storage."
      }
    },
    "q3": {
      "options": {
        "A": "Every view access requires the source storage and referenced range to remain valid.",
        "B": "string_view borrows characters rather than allocating an owned copy of them.",
        "C": "Creating a view does not generally extend its source object's lifetime.",
        "D": "Source reallocation can invalidate the view's stored pointer to previous storage."
      }
    },
    "q4": {
      "options": {
        "A": "Byte counts, character counts, size, and capacity have different meanings and units.",
        "B": "Allocated capacity does not establish a validated user-visible length or valid encoding.",
        "C": "Distinguish initialized elements, available storage, encoded bytes, and logical character measures.",
        "D": "The relationship between bytes and characters depends on the selected text encoding."
      }
    },
    "q5": {
      "options": {
        "A": "Configuration values can be externally controlled, malformed, or inconsistent with application policy.",
        "B": "Apply the length, encoding, syntax, and domain contract before relying on raw text.",
        "C": "Successful parsing still leaves semantic ranges and permitted values to validate.",
        "D": "Validate before paths, policy decisions, resource use, or dispatch as well as display."
      }
    },
    "q6": {
      "options": {
        "A": "Unicode representations and equivalence rules cannot be assumed identical to ASCII behavior.",
        "B": "Locale and canonical representation can change how text is compared or classified.",
        "C": "Encoding affects identity and policy comparisons beyond any particular filename use case.",
        "D": "Define normalization and comparison rules because equivalent text can have different bytes."
      }
    },
    "q7": {
      "options": {
        "A": "SQL, HTML, shells, and logs interpret different syntax and require context-specific handling.",
        "B": "Valid application input can still contain characters special to the output interpreter.",
        "C": "Manual separator concatenation can produce ambiguous output or allow injected structure.",
        "D": "Use the destination's structured API or encoding rules to keep values separate from syntax."
      }
    },
    "q8": {
      "options": {
        "A": "Storage in std::string does not make an access credential safe to log.",
        "B": "Each extra retained copy or log entry creates another possible disclosure point.",
        "C": "Copies can persist in buffers and diagnostics beyond the original secret's lifetime.",
        "D": "Secret protection applies to sensitive contents regardless of whether stored as bytes or text."
      }
    },
    "q9": {
      "options": {
        "A": "A wrapper should enforce boundary validation rather than merely hide unchecked legacy calls.",
        "B": "Legacy pointer interfaces may leave encoding, extent, and ownership obligations implicit.",
        "C": "Centralized wrappers can enforce consistent length, representation, ownership, and failure conventions.",
        "D": "Pointer-and-length arguments still require explicit units, lifetime, and capacity contracts."
      }
    },
    "q10": {
      "options": {
        "A": "Negative tests and review challenge assumptions about bounds, encoding, lifetime, and secret redaction.",
        "B": "Passing tests provide evidence for exercised cases rather than proving every string path safe.",
        "C": "Tests and review verify validation behavior without replacing runtime checks on external values.",
        "D": "String-focused testing should detect defects during development before a production incident occurs."
      }
    }
  }
};
