window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-8df2687459",
  "questions": {
    "q01": {
      "options": {
        "A": "Scheduling and configured regions do not universally contain memory defects or establish complete task isolation.",
        "B": "Application validation, memory handling, authority, and lifecycle remain responsibilities alongside scheduler configuration.",
        "C": "Missing a deadline does not safely reject every malformed input or prevent memory corruption.",
        "D": "Native defects can affect hardware interactions, shared resources, and timing-sensitive behavior with consequences beyond one task."
      }
    },
    "q02": {
      "options": {
        "A": "A component boundary becomes a trust boundary when data or authority assumptions change, not solely because a queue exists.",
        "B": "Crossings between tasks, peripherals, interfaces, and privilege contexts require explicit assumptions about data validity and permitted actions.",
        "C": "Reviewed drivers do not make every peripheral value or privileged request trustworthy.",
        "D": "Priority determines scheduling preference rather than whether another task's supplied data is valid or authorized."
      }
    },
    "q03": {
      "options": {
        "A": "Speculative recovery access gives tasks more authority than their current responsibility requires.",
        "B": "Combining all application logic under supervisor authority exposes more code to elevated privileges.",
        "C": "Narrow task grants limit the resources and effects exposed by a defect in that task.",
        "D": "Memory separation does not automatically authorize unrestricted peripheral access across another security boundary."
      }
    },
    "q04": {
      "options": {
        "A": "Stack exhaustion can corrupt memory or terminate tasks, so sizing must address actual workloads and platform protection limits.",
        "B": "Average use can miss worst-case call depth, interrupt interaction, and rare failure paths.",
        "C": "Overflow containment depends on platform protections; corruption can affect other state as well as task availability.",
        "D": "Dynamic allocation support does not guarantee that a task stack grows safely at runtime."
      }
    },
    "q05": {
      "options": {
        "A": "Allocator serialization does not remove failure, fragmentation, lifetime, or timing constraints.",
        "B": "Fragmentation can cause allocation failure and denial of service; logging does not prevent those effects.",
        "C": "Heap availability does not define which task owns an allocation or who releases it.",
        "D": "Explicit allocation policy makes failure, consumption, ownership, and cleanup behavior predictable under constrained runtime conditions."
      }
    },
    "q06": {
      "options": {
        "A": "Sending a pointer through a queue does not inherently define an ownership transfer.",
        "B": "After transfer, sender access needs an explicit retained-borrow protocol rather than an assumed acknowledgment window.",
        "C": "Buffer contracts must establish who may access or mutate the bytes, within which bounds and lifetime, and who releases them.",
        "D": "A message's type may not establish the actual allocation capacity or validity of a pointed-to buffer."
      }
    },
    "q07": {
      "options": {
        "A": "High priority does not make blocking, unsafe reentry, or long-running interrupt work acceptable.",
        "B": "Interrupt-context restrictions protect timing and shared-state consistency, so complex processing should move to an appropriate task context.",
        "C": "Short execution time does not establish that an ordinary task API is permitted in interrupt context.",
        "D": "Changing shared objects before establishing safe coordination can expose inconsistent state to interrupted or concurrent code."
      }
    },
    "q08": {
      "options": {
        "A": "A successful device read does not establish that the value is current, well-formed, or within safe application limits.",
        "B": "Driver success reports transport or device-operation status, not every application freshness and semantic requirement.",
        "C": "Local buses and sensors can still produce invalid or unexpectedly influenced data.",
        "D": "Universal clamping can conceal faults or produce unsafe control decisions; rejection and fallback need explicit policy."
      }
    },
    "q09": {
      "options": {
        "A": "Secure boot governs startup code authorization rather than validating every later application request.",
        "B": "A firmware signature does not automatically authenticate persistent configuration or prevent every rollback scenario.",
        "C": "Secure boot checks help restrict startup to firmware or software authorized by the device's configured trust policy.",
        "D": "Production debug interfaces can expose authority and data even when authorized firmware is running."
      }
    },
    "q10": {
      "options": {
        "A": "Unnecessary debug capabilities can expose memory, state, and privileged operations outside normal application controls.",
        "B": "Obscurity or connector placement does not establish authorization for retained debug commands.",
        "C": "Read-only diagnostics can disclose credentials, personal data, or security-sensitive configuration.",
        "D": "Logging and physical proximity do not by themselves justify leaving powerful factory features enabled."
      }
    },
    "q11": {
      "options": {
        "A": "Full unvalidated inputs can contain secrets or uncontrolled data and create both disclosure and resource risks.",
        "B": "Diagnostics must limit sensitive content and consumption so logging does not undermine confidentiality or real-time behavior.",
        "C": "Small log volume does not make the secrets inside those records safe to disclose.",
        "D": "Fault handling can still have deadlines and shared-system effects, so blocking diagnostics need deliberate bounds."
      }
    },
    "q12": {
      "options": {
        "A": "Boot and scheduling protections omit application memory, communication, privilege, and failure-handling requirements.",
        "B": "Safe data handling does not justify excessive task grants or exposed production debug authority.",
        "C": "Runtime checks complement secure startup and lifecycle controls rather than make them unnecessary.",
        "D": "A complete RTOS policy combines authority boundaries, bounded memory and communication behavior, interrupt discipline, configuration, and tested failures."
      }
    }
  }
};
