window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-872aa7ba7a",
  "questions": {
    "q1": {
      "options": {
        "A": "The compiler checks type rules but does not infer every application-specific numeric limit or meaning.",
        "B": "Numeric values shape resource use, access boundaries, identifiers, and decisions where mistakes can affect security.",
        "C": "Safe Rust still needs correct sizes, ranges, conversions, and resource limits without any unsafe blocks.",
        "D": "Integers commonly control indexing, allocation, protocol processing, and business operations rather than only display formatting."
      }
    },
    "q2": {
      "options": {
        "A": "Integer types describe representation and range, not which editor should be used for a source file.",
        "B": "Conversions can still fail or lose information when the target type cannot represent the source value.",
        "C": "Deliberate types expose expected ranges, signedness, and platform assumptions to implementers and reviewers.",
        "D": "Choosing a numeric type does not guarantee that external text can always be parsed into it."
      }
    },
    "q3": {
      "options": {
        "A": "usize is suited to collection indexes and memory sizes because its width matches the target's address size.",
        "B": "usize is unsigned and cannot represent negative offsets or signed differences directly.",
        "C": "Domain identifiers need an intentional range and stable representation rather than automatically using pointer-sized integers.",
        "D": "Protocol fields often require fixed-width representations, while usize is primarily suited to in-memory sizing and indexing."
      }
    },
    "q4": {
      "options": {
        "A": "Rust supports integer arithmetic, with several APIs for choosing explicit overflow and result behavior.",
        "B": "Overflow behavior can depend on checks and APIs, so builds and operations should not be assumed identical.",
        "C": "Arithmetic semantics affect executable results, bounds, and decisions rather than merely descriptive comments.",
        "D": "Checked, wrapping, saturating, and overflow-reporting operations implement different policies that must match domain requirements."
      }
    },
    "q5": {
      "options": {
        "A": "Silent modular wraparound describes wrapping behavior rather than checked arithmetic's explicit failure result.",
        "B": "Checked arithmetic reports an unrepresentable result so callers can reject or otherwise handle the calculation safely.",
        "C": "Checked numeric operations retain numeric results when successful instead of automatically converting them to text.",
        "D": "Saturating arithmetic clamps at bounds, whereas checked arithmetic signals that a valid result is unavailable."
      }
    },
    "q6": {
      "options": {
        "A": "Numeric as casts apply to integer conversions and other cases beyond text encodings.",
        "B": "A cast changes representation without automatically validating the numeric rules required by an external protocol.",
        "C": "Casts can truncate or alter signed interpretation, so their validity depends on the source range and intended meaning.",
        "D": "Casts can be intentional, but each conversion needs review rather than a universal prohibition."
      }
    },
    "q7": {
      "options": {
        "A": "TryFrom supports fallible conversions across many types, including integers with different representable ranges.",
        "B": "Fallible conversions expose range failures rather than deliberately removing checks to force a value through.",
        "C": "TryFrom makes unsupported numeric conversions explicit, letting callers handle failure instead of silently losing information.",
        "D": "The destination type determines representation; TryFrom does not convert every integer into a pointer-sized value."
      }
    },
    "q8": {
      "options": {
        "A": "External lengths and counts can influence allocation calculations and therefore require bounds and arithmetic checks.",
        "B": "Safe Rust does not choose appropriate application memory budgets or business-specific limits on accepted sizes.",
        "C": "Allocation formulas should be reviewed and tested during design and development before resource failures reach production.",
        "D": "Oversized or incorrect calculations can exhaust resources and invalidate assumptions passed to low-level or external interfaces."
      }
    },
    "q9": {
      "options": {
        "A": "A number can parse correctly while violating domain ranges, units, consistency rules, or operation-specific policy.",
        "B": "Parsing into a primitive number does not automatically establish the invariants of a domain-specific type.",
        "C": "Numeric inputs also need semantic validation of limits, relationships, units, and business permissions.",
        "D": "Parsing checks representation and type range rather than every business rule applying to the resulting value."
      }
    },
    "q10": {
      "options": {
        "A": "Domain types can use signed or unsigned representations according to the concept being modeled.",
        "B": "Numeric newtypes and validated constructors make units, identifiers, and required invariants visible in the type model.",
        "C": "Constructors are useful places to enforce the invariants a numeric domain type promises.",
        "D": "Distinct domain types can prevent accidental mixing of unrelated identifiers instead of encouraging unrestricted interchange."
      }
    },
    "q11": {
      "options": {
        "A": "Foreign interfaces and wire formats may define widths that differ from the current platform's Rust types.",
        "B": "Cargo metadata does not enforce endianness, units, numeric ranges, or foreign ABI conversion contracts.",
        "C": "Explicit contracts reconcile internal numbers with external width, sign, byte order, units, and conversion requirements.",
        "D": "Protocols and FFI frequently carry numeric values whose interpretation must be agreed by both sides."
      }
    },
    "q12": {
      "options": {
        "A": "Successful parsing does not establish that a number is semantically valid for the requested operation.",
        "B": "Forcing values through casts can hide range failures and change meaning rather than prove numeric correctness.",
        "C": "Integers are essential; security comes from deliberate representation and checked boundaries rather than avoiding them entirely.",
        "D": "Explicit meaning, range, conversions, arithmetic policy, and tested boundary assumptions make numeric behavior reviewable and reliable."
      }
    }
  }
};
