window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-d60475b88f",
  "questions": {
    "q1": {
      "options": {
        "A": "Memory APIs consume computed sizes and do not automatically recover the intended mathematical result.",
        "B": "Matching allocator types does not prevent unsigned wraparound or unsafe derived indexes.",
        "C": "A hidden incorrect count can still corrupt memory or bypass a safety decision.",
        "D": "Wrong arithmetic can invalidate the bounds and policy assumptions used by allocations, loops, and parsers."
      }
    },
    "q2": {
      "options": {
        "A": "Width, rank, and signedness influence conversions, comparison, and which results an expression can represent.",
        "B": "Integer promotions do not guarantee a type wide enough for every mathematical result.",
        "C": "Unsigned values still wrap and can compare unexpectedly against signed quantities.",
        "D": "Malformed and boundary values can exceed assumptions based only on typical production inputs."
      }
    },
    "q3": {
      "options": {
        "A": "Signed overflow does not generally have the defined modulo behavior of unsigned arithmetic.",
        "B": "A defined wrapped result can still be an unsafe size, count, or security limit.",
        "C": "The language distinguishes undefined signed overflow from defined unsigned wrapping, and neither should violate the application's numeric contract.",
        "D": "An operation that already invoked signed-overflow undefined behavior cannot be made reliable by a later comparison."
      }
    },
    "q4": {
      "options": {
        "A": "A cast requests conversion rather than a universal range-validation failure.",
        "B": "The original value must satisfy representability and application limits before narrowing or sign changes can lose its meaning.",
        "C": "A truncated or reinterpreted result can hide that the original input did not fit.",
        "D": "One toolchain's warning result does not establish correctness under every supported width and conversion rule."
      }
    },
    "q5": {
      "options": {
        "A": "Malloc sees the final computed byte count rather than reconstructing an earlier element multiplication.",
        "B": "Individually representable operands can overflow when multiplied or combined with header space.",
        "C": "A non-null allocation cannot prove that the requested arithmetic reflected the intended size.",
        "D": "Checking the full expression before use prevents a small wrapped allocation from being treated as a larger object."
      }
    },
    "q6": {
      "options": {
        "A": "A converted number can still exceed the collection or application limit it will control.",
        "B": "Unsigned counters can wrap and produce incorrect termination or indexing behavior.",
        "C": "Each derived range must account for signs, endpoint conventions, overflow, and untrusted counts before indexing.",
        "D": "Initial validation does not automatically constrain later additions, multiplications, and derived offsets."
      }
    },
    "q7": {
      "options": {
        "A": "Divisors, signed extrema, and shift widths need preconditions that prevent invalid or unrepresentable operations.",
        "B": "Portable C does not universally make an oversized shift count safe by masking it.",
        "C": "The minimum signed value divided by negative one is not representable in the same signed type.",
        "D": "Negative-operand behavior needs explicit language-version and platform assumptions rather than an unexamined portability claim."
      }
    },
    "q8": {
      "options": {
        "A": "Testing after an undefined operation is too late; the check must itself be valid for the expression and type.",
        "B": "Checked operations or safe preconditions establish whether a result may be used without losing the intended range.",
        "C": "A wider type can still be insufficient or exceed a lower application policy limit.",
        "D": "Failure or saturation needs an explicit status and policy rather than silent acceptance of an unintended value."
      }
    },
    "q9": {
      "options": {
        "A": "A clean exercised run does not prove numeric invariants for untested inputs.",
        "B": "Diagnostics cannot replace application-specific range and signedness reasoning.",
        "C": "Checks provide defect evidence while explicit contracts and review establish the arithmetic assumptions the application requires.",
        "D": "Operand combinations and boundaries near intermediate operations need cases beyond isolated type extrema."
      }
    },
    "q10": {
      "options": {
        "A": "A coordinated baseline checks representations, operations, bounds, and policy before arithmetic results control sensitive behavior.",
        "B": "Defined unsigned wrapping can still under-allocate memory or defeat intended limits.",
        "C": "Casting away warnings does not establish that an internal calculation or conversion is valid.",
        "D": "Shifts, division, conversions, and business constraints also require enforceable runtime preconditions where inputs vary."
      }
    }
  }
};
