window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-4f28e4d51a",
  "questions": {
    "q1": {
      "options": {
        "A": "Size-aware APIs still depend on accurate capacity and valid inputs supplied by their callers.",
        "B": "A replacement must preserve or deliberately change the surrounding memory, ownership, and failure contracts rather than merely rename a call.",
        "C": "Different return and truncation behavior can change observable application results.",
        "D": "Review must inspect the new call's inputs and outcomes rather than only its name."
      }
    },
    "q2": {
      "options": {
        "A": "An unbounded interface can write without having enough information to enforce the destination's actual storage limit.",
        "B": "Stack, static, and dynamic destinations all have finite capacity.",
        "C": "Missing capacity information leaves safety dependent on assumptions enforced elsewhere and therefore warrants close review.",
        "D": "An API signature does not establish that external values were already validated."
      }
    },
    "q3": {
      "options": {
        "A": "A bounded write may still produce an incomplete value whose acceptability must follow the operation's policy.",
        "B": "Shortened paths or identifiers can refer to different objects or change security decisions.",
        "C": "APIs differ in whether they truncate, reject, and how they report the result.",
        "D": "Callers still need the actual destination capacity and correct size units."
      }
    },
    "q4": {
      "options": {
        "A": "A checked status cannot compensate for supplying an incorrect destination bound.",
        "B": "Constant formats can still produce oversized output or encounter formatting failures.",
        "C": "Result checks determine whether later code may use the complete intended output or must reject and recover.",
        "D": "Return values describe operational success and output completeness rather than presentation style alone."
      }
    },
    "q5": {
      "options": {
        "A": "An initial digit does not establish complete conversion or an acceptable final value.",
        "B": "Robust parsing verifies full consumption and representability before the value controls allocation, indexes, or policy.",
        "C": "Some conversions accept prefixes, so the caller must inspect errors and remaining input.",
        "D": "A destination's previous contents do not establish whether the new input is valid."
      }
    },
    "q6": {
      "options": {
        "A": "Different copy APIs have different overlap preconditions that callers must respect.",
        "B": "Meaningful string length excludes unused storage and often its terminating byte.",
        "C": "The exact source and destination ranges and overlap contract determine whether the operation is valid.",
        "D": "Byte-oriented routines do not automatically know the caller's intended element counts and allocation boundaries."
      }
    },
    "q7": {
      "options": {
        "A": "No delivery mechanism is universally safer without considering its trust and lifecycle controls.",
        "B": "Operating-system storage does not authenticate each value's source or allowed meaning.",
        "C": "Raw environment strings can contain invalid numbers, paths, modes, and unexpected behavior settings.",
        "D": "Inherited settings should be validated as input unless a documented boundary justifies specific stronger assumptions."
      }
    },
    "q8": {
      "options": {
        "A": "Repeating the old name does not establish a safe new use contract.",
        "B": "Silent fallback can conceal truncation, acquisition failure, or invalid output state.",
        "C": "A broad abstraction can hide important platform behavior rather than make obligations clear.",
        "D": "A narrow wrapper should expose capacities, transfer rules, result states, and the chosen rejection or truncation guarantees."
      }
    },
    "q9": {
      "options": {
        "A": "Changed semantics can reveal previously ignored failures and require deliberate caller updates and regression checks.",
        "B": "Renaming does not document how the caller must handle the new result contract.",
        "C": "Legacy tests often omit precisely the edge and failure paths a safer API exposes.",
        "D": "Equivalent-looking signatures do not guarantee identical behavior for every input or failure."
      }
    },
    "q10": {
      "options": {
        "A": "Flags identify candidate risks whose actual contract and reachable use still require assessment.",
        "B": "Layered checks and governed exceptions make migration behavior verifiable and prevent known unsafe patterns from quietly returning.",
        "C": "Tool output does not replace reasoning about actual sizes, ownership, and valid lifetimes.",
        "D": "Checks can guide incremental migration and catch regressions before the entire effort finishes."
      }
    }
  }
};
