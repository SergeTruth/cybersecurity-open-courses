window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-2423b85fdc",
  "questions": {
    "q1": {
      "options": {
        "A": "Binary fields can be just as malformed or attacker-controlled as text fields.",
        "B": "Encoded sizes and decisions can direct allocation and memory access, so their representation and meaning require validation.",
        "C": "Trusted objects should be constructed only after their required invariants have been established.",
        "D": "Binary representation does not imply encryption or trustworthy content."
      }
    },
    "q2": {
      "options": {
        "A": "A documented format establishes the field, structure, and rejection rules the implementation must enforce.",
        "B": "Field names do not tell the compiler the wire format's widths, byte order, or alignment.",
        "C": "Silently repairing arbitrary bytes can introduce ambiguous or unintended interpretations.",
        "D": "Filesystem delivery does not establish conformity with an application's binary protocol."
      }
    },
    "q3": {
      "options": {
        "A": "Missing bytes are not established as received or valid zero-valued fields.",
        "B": "Actual received length must cover required fields; incomplete input must be rejected or retained as incomplete under an explicit framing contract.",
        "C": "Allocated capacity does not establish how many bytes were actually supplied.",
        "D": "Casting incomplete storage can read unavailable fields and introduce alignment or representation errors."
      }
    },
    "q4": {
      "options": {
        "A": "A pointer type does not constrain every input-derived length or offset.",
        "B": "Binary encodings can store integers directly rather than textual digits.",
        "C": "Input-derived ranges must fit remaining data, safe arithmetic, and application resource limits before use.",
        "D": "Validation belongs in the parser before sensitive use rather than in assessment material."
      }
    },
    "q5": {
      "options": {
        "A": "A valid start offset does not prove the remaining field length fits; the whole range needs an overflow-safe check.",
        "B": "The range can extend beyond the buffer even when its first byte is inside it.",
        "C": "A magic value identifies a format but does not establish every subsequent bound.",
        "D": "Byte order changes numeric decoding rather than proving that a range fits."
      }
    },
    "q6": {
      "options": {
        "A": "Unchecked narrowing can lose values and reinterpret sign or magnitude before validation.",
        "B": "A decoded count can exceed safe bounds or overflow a later allocation expression.",
        "C": "Explicit representation decoding and range checks keep file assumptions separate from host layout and permitted operational values.",
        "D": "Native layout and endianness can differ from the format's specified representation."
      }
    },
    "q7": {
      "options": {
        "A": "The producer's format specification does not force the receiving compiler's struct representation.",
        "B": "C structs can contain integers; their native representation still needs compatibility checks.",
        "C": "Portable parsing can decode bytes explicitly without casting them to native structs.",
        "D": "Padding, alignment, widths, and host ABI assumptions can make a direct cast inconsistent with the supplied bytes."
      }
    },
    "q8": {
      "options": {
        "A": "Diagnostic presentation does not establish relationships between parsed fields.",
        "B": "Filename length does not validate the contents or structural relationships of a binary record.",
        "C": "A checksum does not replace validation of lengths, offsets, and structural consistency.",
        "D": "Comparing declared counts with the bounded record region validates a relationship between fields rather than each field alone."
      }
    },
    "q9": {
      "options": {
        "A": "Rejecting the candidate and releasing acquired resources prevents invalid partial data from appearing as a trusted successful result.",
        "B": "One decoded field does not establish that the required full message is valid.",
        "C": "Unsupported flags need an explicit policy rather than silent reinterpretation.",
        "D": "Guessed defaults can conceal malformed required data and produce unsafe application state."
      }
    },
    "q10": {
      "options": {
        "A": "Finite checks cannot establish that every possible input is valid or harmless.",
        "B": "Tooling can find missing checks but cannot replace runtime enforcement of actual input limits.",
        "C": "Independent techniques reveal different parsing, arithmetic, memory, and contract defects before deployment.",
        "D": "Binary parsers also benefit from malformed-input generation and memory instrumentation."
      }
    }
  }
};
