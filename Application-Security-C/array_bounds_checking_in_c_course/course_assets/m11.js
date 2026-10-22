window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-a13462052f",
  "questions": {
    "q1": {
      "options": {
        "A": "Ordinary C pointers do not carry a hidden allocation-capacity contract.",
        "B": "The program must establish valid indexes and ranges because ordinary accesses do not receive universal automatic bounds checks.",
        "C": "Out-of-range access affects actual memory behavior rather than documentation alone.",
        "D": "An oversized index does not automatically resize a C array."
      }
    },
    "q2": {
      "options": {
        "A": "Sizeof a pointer reports pointer storage rather than the pointed-to allocation's original element count.",
        "B": "A function needs relevant bounds before accessing caller-supplied array storage.",
        "C": "Pointer decay loses the array-size information needed unless the interface separately supplies or establishes it.",
        "D": "C does not encode the element count in every ordinary pointer value."
      }
    },
    "q3": {
      "options": {
        "A": "Count describes usable contents while capacity describes the storage limit; both must use a documented common unit.",
        "B": "Current string length and available storage can differ, including required terminator space.",
        "C": "A partially filled buffer has fewer meaningful elements than its total capacity.",
        "D": "Either quantity can use bytes or elements if the interface defines and applies the unit consistently."
      }
    },
    "q4": {
      "options": {
        "A": "Zero-based indexing still needs a validated limit and sufficient storage.",
        "B": "Index count is beyond the final element when the valid range contains count elements.",
        "C": "For a nonempty array, the final element is count minus one; an empty range has no valid element indexes.",
        "D": "An inclusive comparison can allow one extra iteration rather than stop automatically."
      }
    },
    "q5": {
      "options": {
        "A": "A character buffer may contain binary or unterminated data rather than a valid C string.",
        "B": "String APIs need a terminator inside accessible storage or they may scan or write beyond the intended object.",
        "C": "Termination and destination capacity are separate conditions that both need checking.",
        "D": "Stack, static, and dynamic C strings all require appropriate termination."
      }
    },
    "q6": {
      "options": {
        "A": "Strlen receives a pointer without an independent intended buffer-capacity argument.",
        "B": "A string-length scan does not authenticate the input source or validate its meaning.",
        "C": "Without a valid in-bounds terminator, the scan can read beyond accessible storage while searching for zero.",
        "D": "Unterminated input does not have a defined safe zero-length result."
      }
    },
    "q7": {
      "options": {
        "A": "Reallocation does not repair pointer copies or interior pointers held elsewhere.",
        "B": "Failure of a nonzero resize request preserves the original allocation rather than freeing it automatically.",
        "C": "A temporary protects the original handle but does not track the resulting capacity.",
        "D": "For nonzero resizing, a temporary preserves the original owned allocation on failure; zero-size behavior needs explicit policy."
      }
    },
    "q8": {
      "options": {
        "A": "The allocator sees the computed value rather than the mathematical size the caller intended before overflow.",
        "B": "Unsigned size calculations can wrap and still produce an apparently valid allocation argument.",
        "C": "Growth often includes multiplication or addition that must remain representable.",
        "D": "Wrapped arithmetic can under-allocate storage while later code still uses the larger intended count."
      }
    },
    "q9": {
      "options": {
        "A": "Complementary runtime and static checks expose exercised bounds violations and suspicious assumptions for investigation and repair.",
        "B": "Tools need an intended interface contract and do not automatically define the correct one.",
        "C": "Application meaning and business limits require explicit program rules beyond generic analysis.",
        "D": "No finite test or analysis run establishes the absence of every production defect."
      }
    },
    "q10": {
      "options": {
        "A": "Documenting a count does not add hidden length metadata to an ordinary pointer.",
        "B": "Read, write, and append contracts identify which counts, capacities, units, and failure guarantees callers must respect.",
        "C": "Explicit contracts guide the checks required before memory access rather than remove them.",
        "D": "Truncation can corrupt meaning or state and needs operation-specific acceptance rules."
      }
    }
  }
};
