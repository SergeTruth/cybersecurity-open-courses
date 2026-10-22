window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-b2bdd2f113",
  "questions": {
    "q01": {
      "options": {
        "A": "A nonzero but overstated size can still authorize writes beyond the real destination object.",
        "B": "Library guarantees depend on correct inputs and explicit handling of the function's size, lifetime, and outcome requirements.",
        "C": "Approved implementations still expose specific failure and ownership semantics that callers must follow.",
        "D": "A safe-looking name does not establish correct size arguments or result handling at the call site."
      }
    },
    "q02": {
      "options": {
        "A": "Capacity includes unused available storage, while current string length describes meaningful characters before the terminator.",
        "B": "Extra allocated writable space remains capacity even before an append uses it.",
        "C": "Strlen finds content length and does not report the destination allocation's writable capacity.",
        "D": "Stack allocation does not make populated length equal total buffer storage."
      }
    },
    "q03": {
      "options": {
        "A": "A reputation or naming convention does not define all valid inputs and failure outcomes.",
        "B": "Terminated but incomplete output can still violate meaning, and returned storage still needs ownership rules.",
        "C": "Declarations alone may not explain post-failure state or the project's acceptance policy.",
        "D": "An explicit contract tells callers what they must supply and what they can rely on after every result."
      }
    },
    "q04": {
      "options": {
        "A": "Different uses have different completeness requirements; a terminated prefix can still be an invalid path or protocol value.",
        "B": "Some APIs return required length on truncation, so nonnegative status alone does not prove complete storage.",
        "C": "Incomplete output can change identity or semantics and must follow a deliberate use-specific rejection policy.",
        "D": "Growth must remain within resource policy and use validated size calculations rather than retry indefinitely."
      }
    },
    "q05": {
      "options": {
        "A": "Returned storage may be caller-owned or borrowed depending on the actual library contract.",
        "B": "A pointer alone does not establish which invariants remain after a growth failure.",
        "C": "Dynamic strings still need bounded growth, known ownership, checked allocation, and appropriate release on all exits.",
        "D": "Allocator success does not establish that the application should accept an arbitrarily large value."
      }
    },
    "q06": {
      "options": {
        "A": "For snprintf, a nonnegative required-length result can still indicate that the supplied capacity was insufficient.",
        "B": "Interpreting the exact return contract distinguishes complete output from failure, required growth, or truncation.",
        "C": "Readable terminated bytes do not establish that incomplete output is acceptable for the intended use.",
        "D": "Inspecting one byte cannot universally distinguish all failures and completeness states described by the API."
      }
    },
    "q07": {
      "options": {
        "A": "A portable policy needs to account for availability and semantic differences across actual target environments.",
        "B": "Matching names can hide differences in guarantees, parameters, error reporting, and implementation support.",
        "C": "Successful target compilation does not prove identical runtime truncation and failure behavior.",
        "D": "A wrapper should establish deliberate consistent project semantics or make unavoidable differences explicit."
      }
    },
    "q08": {
      "options": {
        "A": "Similar parameters do not guarantee equivalent return, failure, or termination behavior.",
        "B": "Post-rollout policy decisions can leave changed identifiers and incomplete outputs already in use.",
        "C": "A library's reputation does not establish that legacy assumptions satisfy its actual interface.",
        "D": "Migration must review each caller's expected behavior where the replacement has different guarantees or obligations."
      }
    },
    "q09": {
      "options": {
        "A": "Representative and boundary cases should check results and post-failure invariants as well as visible string contents.",
        "B": "Ordinary success omits the truncation, invalid-input, and partial-acquisition paths most likely to expose contract mismatches.",
        "C": "Memory instrumentation does not establish the project's intended handling of incomplete or failed string operations.",
        "D": "Status and metadata determine whether output is trustworthy and whether object invariants remain consistent."
      }
    },
    "q10": {
      "options": {
        "A": "A clean analysis run covers selected checks and executions rather than every possible caller behavior.",
        "B": "A diagnostic cannot choose the business policy for incomplete values and low-memory failures.",
        "C": "Widely used libraries can still be misused and need boundary and failure-path tests.",
        "D": "Tools expose implementation evidence while clear contracts and targeted tests establish acceptable operation behavior."
      }
    },
    "q11": {
      "options": {
        "A": "Appending a value does not universally transfer ownership of the source string.",
        "B": "Later growth can invalidate interior references even if an earlier append succeeded.",
        "C": "Builder review must establish storage ownership, growth limits, failure invariants, and how callers obtain valid complete results.",
        "D": "Callers need documented validity and result semantics rather than only a final address."
      }
    },
    "q12": {
      "options": {
        "A": "One approved API still needs consistent caller obligations and explicit project-wide behavior conventions.",
        "B": "A safe library is useful when callers follow documented contracts, check outcomes, and verify edge and failure behavior.",
        "C": "Termination cannot compensate for incorrect capacities or silently ignored incomplete results.",
        "D": "Removing names is only mechanical progress; safe semantics and tests are needed to complete the migration."
      }
    }
  }
};
