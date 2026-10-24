window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-b9d31183f4",
  "questions": {
    "q01": {
      "options": {
        "A": "Runtime instrumentation observes executed paths; it cannot prove that unexecuted code is safe.",
        "B": "Sanitizers require instrumentation and runtime support, with behavior and overhead that differ from ordinary release builds.",
        "C": "Instrumented tests expose memory errors and undefined operations on paths they execute, producing diagnostic evidence for investigation.",
        "D": "Reports still require interpretation, and defects outside exercised paths remain reasons to retain code review."
      }
    },
    "q02": {
      "options": {
        "A": "ASan instruments memory accesses to identify bounds violations and many accesses to freed allocations.",
        "B": "Cryptographic algorithm selection is a design and configuration issue outside ASan's memory-access checks.",
        "C": "Race detection requires appropriate concurrency analysis, such as ThreadSanitizer; ASan is not a race-freedom proof.",
        "D": "ASan checks memory access safety, rather than proving the mathematical correctness of every integer conversion."
      }
    },
    "q03": {
      "options": {
        "A": "UBSan checks selected undefined operations during execution; heap-leak reporting is a different diagnostic capability.",
        "B": "UBSan instruments selected language-level checks, including signed overflow, invalid shifts, and alignment violations.",
        "C": "Detecting an undefined operation does not change the C++ language contract or make that operation safe.",
        "D": "Authorization depends on application policy, while UBSan checks selected violations of language semantics."
      }
    },
    "q04": {
      "options": {
        "A": "Diagnostic builds can use settings chosen for useful instrumentation and stack traces; exact release-setting identity is not required.",
        "B": "Release hardening and separate diagnostic builds serve complementary purposes and can coexist.",
        "C": "The sanitizers discussed support instrumented C++ programs; separate builds are needed for operational reasons.",
        "D": "Instrumentation consumes resources and changes diagnostics and execution behavior, so dedicated test builds often suit deployment needs better."
      }
    },
    "q05": {
      "options": {
        "A": "Application access and lifetime frames can identify the cause; the final library frame alone may only show where damage surfaced.",
        "B": "A reported address identifies an affected access, not proof that the allocator caused the defect.",
        "C": "Allocation and free stacks establish object lifetime and can explain why a later read accesses invalid storage.",
        "D": "The error category, failing access, lifetime stacks, and relevant application frames together help locate the first contract violation."
      }
    },
    "q06": {
      "options": {
        "A": "Suppressing an unexplained application defect hides evidence while leaving the unsafe operation in place.",
        "B": "Continuing after memory corruption can compound damage; catching the diagnostic does not repair the violated contract.",
        "C": "Repairing the underlying contract removes the cause, and a regression test checks that the same trigger remains handled.",
        "D": "A larger allocation can conceal one symptom while leaving incorrect length calculations or ownership assumptions unresolved."
      }
    },
    "q07": {
      "options": {
        "A": "Unexpected sanitizer failures are defect evidence; accepting them silently makes the CI check ineffective.",
        "B": "Representative instrumented tests and failing checks turn sanitizer findings into actionable, repeatable CI evidence.",
        "C": "CI can retain reports and stack traces as artifacts so findings can be reproduced and investigated.",
        "D": "A smoke test exercises limited behavior and does not replace deliberate coverage of boundaries and error paths."
      }
    },
    "q08": {
      "options": {
        "A": "Application-owned defects should be investigated and fixed rather than routinely hidden by suppressions.",
        "B": "A narrow, owned exception limits hidden findings and allows reviewers to revisit unavoidable external or tooling issues.",
        "C": "Broad suppressions can conceal unrelated defects; precise signatures and documented ownership reduce that blind spot.",
        "D": "A suppression changes reporting, not whether the C++ operation has defined behavior."
      }
    },
    "q09": {
      "options": {
        "A": "Coverage limits exist across optimization settings; disabling optimization does not exercise missing paths or dependencies.",
        "B": "A clean run describes the inputs and schedules tested, not all possible executions.",
        "C": "Detection depends on executed instrumentation and the checks each sanitizer supports, leaving coverage and dependency gaps.",
        "D": "Uninstrumented dependencies can contain accesses that lack the checks present in instrumented application objects."
      }
    },
    "q10": {
      "options": {
        "A": "Reproduction, root-cause repair, regression tests, and reviewed exceptions make findings sustainable engineering feedback.",
        "B": "Waiting for an incident loses the chance to detect exercised defects during normal development.",
        "C": "The last frame can show a symptom; investigation should trace the first violated ownership, bounds, or arithmetic contract.",
        "D": "Different sanitizers reveal different defect classes, so complementary configurations can strengthen the evidence."
      }
    }
  }
};
