window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-c04e96335c",
  "questions": {
    "q01": {
      "options": {
        "A": "Rust has a strong type system, but runtime input still needs application-specific constraints.",
        "B": "Memory safety addresses memory misuse; it does not establish business meaning, valid formats, or permission to act.",
        "C": "JSON deserialization checks representation and cannot automatically enforce every domain rule.",
        "D": "Memory-safe code can still make incorrect authorization or business decisions."
      }
    },
    "q02": {
      "options": {
        "A": "A trust boundary marks where data enters a context with different trust assumptions and validation needs.",
        "B": "A Cargo feature selects build behavior, rather than defining every runtime transition between trust contexts.",
        "C": "Optimization controls generated code and does not determine the trustworthiness of incoming data.",
        "D": "A crate version identifies a dependency release, rather than a runtime data trust transition."
      }
    },
    "q03": {
      "options": {
        "A": "Result expresses success or failure; it does not encrypt the input it carries.",
        "B": "Validation errors and caller permissions are distinct concerns that both need appropriate handling.",
        "C": "Malformed data still arrives; Result gives the application a way to reject it explicitly.",
        "D": "Result preserves the difference between a validated value and a specific error that callers must handle."
      }
    },
    "q04": {
      "options": {
        "A": "Wrapping a string alone does not validate it; the construction path must enforce the type's invariants.",
        "B": "A domain wrapper still needs tests that exercise its validation and permitted construction paths.",
        "C": "A validated newtype can encode domain invariants so downstream code can require a value that has passed checks.",
        "D": "A newtype adds a distinct type boundary rather than turning type checking off."
      }
    },
    "q05": {
      "options": {
        "A": "TryFrom models a conversion that may fail, allowing validation failures to be returned explicitly.",
        "B": "A conversion trait does not establish encryption for network transport.",
        "C": "Password hashing requires a suitable cryptographic operation, not merely a type conversion.",
        "D": "Compression changes data size and is separate from a fallible conversion contract."
      }
    },
    "q06": {
      "options": {
        "A": "Deserialization does not establish the caller's identity or permission to use the decoded values.",
        "B": "A parser can reject malformed syntax while still accepting values that violate domain constraints.",
        "C": "Fitting a serialized shape does not prove the values satisfy ranges, relationships, or security policy.",
        "D": "Domain rules still need enforcement after or during the construction of validated types."
      }
    },
    "q07": {
      "options": {
        "A": "Ignoring unknown fields can hide mistakes or unsupported behavior rather than guarantee safe compatibility.",
        "B": "Unexpected fields can expose a mismatch with the supported request contract and deserve an intentional handling policy.",
        "C": "JSON objects can contain arbitrary field names even when the Rust model recognizes only some of them.",
        "D": "Unknown fields are input to assess; they do not supply schema or domain validation."
      }
    },
    "q08": {
      "options": {
        "A": "Transport checks establish request representation, while domain checks establish the values and relationships the application permits.",
        "B": "A well-formed request can still violate business constraints that require domain validation.",
        "C": "Request-shape checks do not establish whether a caller may perform an operation.",
        "D": "Separating responsibilities improves clarity but still requires correct rules and tests."
      }
    },
    "q09": {
      "options": {
        "A": "Arithmetic checks do not establish the identity of the caller supplying numeric input.",
        "B": "A non-overflowing value may still violate range, quota, or business constraints.",
        "C": "Overflow can change actual sizes and offsets, not just how numbers are displayed.",
        "D": "Checked operations let the application reject overflow instead of using an unintended size, count, or offset."
      }
    },
    "q10": {
      "options": {
        "A": "Input must map to a supported variant and satisfy any domain restrictions on when that variant is permitted.",
        "B": "An arbitrary numeric representation does not establish that the value is a supported or allowed variant.",
        "C": "Enum validation constrains behavior while logs provide operational evidence; their roles are different.",
        "D": "External text or numbers can select variants, so the conversion boundary needs an explicit policy."
      }
    },
    "q11": {
      "options": {
        "A": "Dependency updates concern supply-chain changes rather than a path escaping its intended directory.",
        "B": "A password reset is an identity workflow, not the filesystem boundary described here.",
        "C": "Path traversal occurs when caller-influenced paths reach files outside the application's intended directory boundary.",
        "D": "This risk concerns application file access and may exist without a compiler warning."
      }
    },
    "q12": {
      "options": {
        "A": "A filename suffix can be changed without changing the underlying bytes or format.",
        "B": "Caller-controlled extensions may misrepresent content, so upload validation must inspect more than the filename.",
        "C": "File structure and content checks remain necessary even when an extension is allowed.",
        "D": "A malformed file can retain the expected extension and still fail safe processing."
      }
    },
    "q13": {
      "options": {
        "A": "Binary data can originate from untrusted peers or files and must be checked before use.",
        "B": "A claimed length must be compared with remaining data and safe limits rather than trusted as a bound.",
        "C": "Memory safety does not prevent parse errors, excessive allocations, panics, or invalid protocol semantics.",
        "D": "Length checks prevent declared sizes from overrunning the message structure or exceeding safe processing limits."
      }
    },
    "q14": {
      "options": {
        "A": "Generated tests complement review; they do not establish that every design and implementation choice is safe.",
        "B": "Property-based tests explore varied inputs against stated invariants, helping reveal edge cases missed by handpicked examples.",
        "C": "Generating test inputs does not encrypt them or provide a data-confidentiality control.",
        "D": "Test generation finds counterexamples during development; production validation must still reject invalid requests."
      }
    },
    "q15": {
      "options": {
        "A": "Deserialization alone does not enforce every business, range, or authorization rule.",
        "B": "Unwrap can panic on invalid input; memory safety does not make those failures acceptable request handling.",
        "C": "Explicit parsing, constrained domain types, recoverable errors, and tests make the trust transition deliberate and checkable.",
        "D": "Clients are caller-controlled, so validation must also run at trusted application boundaries."
      }
    }
  }
};
