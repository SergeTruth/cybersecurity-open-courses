window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-23938a6816",
  "questions": {
    "q01": {
      "options": {
        "A": "Adjacent writes can disclose or alter sensitive data and influence control flow.",
        "B": "Container ownership does not automatically bounds-check unrelated raw-pointer operations.",
        "C": "Writing past a buffer can damage neighboring objects and compromise process behavior.",
        "D": "Binary buffers and arrays of other element types also require overflow prevention."
      }
    },
    "q02": {
      "options": {
        "A": "Non-nullness establishes neither capacity nor permission to write a particular number of bytes.",
        "B": "Pointer arithmetic does not automatically enforce the owning object's storage boundary.",
        "C": "Safe buffer use needs explicit bounds and a valid ownership and lifetime contract.",
        "D": "The operating system generally checks mapped pages rather than C++ allocation boundaries."
      }
    },
    "q03": {
      "options": {
        "A": "A terminator marks text length and does not encode the allocation's capacity.",
        "B": "Network reads return bytes and do not generally append text terminators automatically.",
        "C": "An unbounded terminator search can read beyond accessible storage before finding zero.",
        "D": "A terminator is useful only when located inside the buffer's validated accessible extent."
      }
    },
    "q04": {
      "options": {
        "A": "Storage and extent-aware abstractions make validation obligations visible at each operation.",
        "B": "A span borrows its source and does not keep that source alive.",
        "C": "std::string stores characters without guaranteeing the external data's encoding is valid.",
        "D": "Vector insertion can reallocate its storage and invalidate existing element references."
      }
    },
    "q05": {
      "options": {
        "A": "A comment cannot establish actual capacity or enforce the caller's storage contract.",
        "B": "Explicit result and failure reporting helps callers handle partial output safely.",
        "C": "Transformations may expand data, so output capacity must be independently established.",
        "D": "A useful contract covers extent, units, lifetime, overlap, and observable failure behavior."
      }
    },
    "q06": {
      "options": {
        "A": "Rejecting afterward cannot undo corruption or safely restore overwritten neighboring objects.",
        "B": "Reject invalid lengths and arithmetic before they influence memory allocation or access.",
        "C": "Parsing an integer does not prove it fits the destination's available space.",
        "D": "A successful allocation can still exceed acceptable resource budgets or represent inconsistent data."
      }
    },
    "q07": {
      "options": {
        "A": "A wrapped size can allocate less storage than a subsequent operation requires.",
        "B": "Defined unsigned wrapping still breaks size calculations and can lead to memory corruption.",
        "C": "Nonzero operands can still produce a product beyond the integer type's range.",
        "D": "Widening after evaluation cannot recover high bits already lost by overflow."
      }
    },
    "q08": {
      "options": {
        "A": "Instrumentation reports invalid accesses and does not make overrun operations safe.",
        "B": "Sanitizer findings on exercised paths identify defects that can become regression tests.",
        "C": "A clean run only covers the operations and input lengths actually exercised.",
        "D": "Development instrumentation supplements rather than replaces production bounds checks and contracts."
      }
    },
    "q09": {
      "options": {
        "A": "Stack protection targets certain stack corruption and does not cover every buffer.",
        "B": "PIE supports relocation and does not validate array indexes or pointer arithmetic.",
        "C": "Mitigations can reduce exploitation opportunities while the unsafe write remains a defect.",
        "D": "Non-executable memory does not prevent data corruption or reuse of existing control flow."
      }
    },
    "q10": {
      "options": {
        "A": "Relinking or packaging can change protections, so command lines alone are insufficient.",
        "B": "A sanitizer configuration differs from the deployed release and its protection settings.",
        "C": "One object cannot establish protection coverage for all linked libraries and final output.",
        "D": "Inspect the actual shipped artifact and retain results from boundary-focused testing."
      }
    }
  }
};
