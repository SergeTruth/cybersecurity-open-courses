window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-4d3274e7d4",
  "questions": {
    "q1": {
      "options": {
        "A": "RTIC helps organize execution but does not eliminate input validation, timing analysis, or resource review.",
        "B": "Structured tasks and resources still need bounded timing, valid hardware assumptions, controlled inputs, and secure lifecycle practices.",
        "C": "RTIC concerns embedded real-time systems rather than being limited to desktop application security.",
        "D": "A framework does not automatically establish safe hardware configuration, authorized updates, or protected debug access."
      }
    },
    "q2": {
      "options": {
        "A": "Source filenames alone do not reveal execution contexts, shared ownership, hardware effects, or trust boundaries.",
        "B": "Firmware size alone cannot establish task priority, shared-resource safety, input validation, or peripheral authority.",
        "C": "Mapping tasks, contexts, resources, inputs, trust boundaries, and hardware actions makes important security assumptions reviewable.",
        "D": "A practical architecture review should identify assets and controls rather than merely produce an attack list."
      }
    },
    "q3": {
      "options": {
        "A": "Unbounded execution and missed deadlines can deny service or prevent a device from performing required safe actions.",
        "B": "Timing determines responsiveness and safe progress, making it directly relevant to embedded reliability.",
        "C": "Priorities influence scheduling order and preemption rather than assigning every task an equal execution duration.",
        "D": "Priority choices do not establish that task inputs are structurally valid, authorized, or bounded."
      }
    },
    "q4": {
      "options": {
        "A": "Long critical sections can delay other work and directly affect real-time responsiveness and availability.",
        "B": "Narrow locks reduce contention and timing exposure but cannot prevent every possible task failure.",
        "C": "Excessive logging inside critical sections can extend exclusive access and introduce unpredictable delays.",
        "D": "Keeping exclusive access focused reduces blocking and makes timing assumptions easier to inspect and maintain."
      }
    },
    "q5": {
      "options": {
        "A": "DMA buffers still require valid sizes, content checks, and clear ownership throughout transfer and completion.",
        "B": "Hardware and software access must be coordinated so buffers remain valid and are not accessed incompatibly during transfers.",
        "C": "DMA moves data without automatically providing confidentiality or cryptographic protection for its contents.",
        "D": "DMA commonly accesses memory also used by software, making safe ownership transitions essential."
      }
    },
    "q6": {
      "options": {
        "A": "Heavy interrupt work can delay other processing and should not be presumed to improve availability.",
        "B": "Complex parsing and protocol state rules still require appropriate state-machine design and input validation.",
        "C": "Deferring substantial work can keep interrupt handling bounded and preserve responsiveness of time-critical device behavior.",
        "D": "Interrupts often report device input or transfer completion, so their handling remains an input boundary."
      }
    },
    "q7": {
      "options": {
        "A": "State machines express allowed transitions but still require validated fields, sizes, and authorization decisions.",
        "B": "Structurally parsed messages can remain unauthorized or inappropriate for the current device mode.",
        "C": "Protocol handling must check size, syntax, sequence, state consistency, and whether the requested action is permitted.",
        "D": "Parsed messages may directly control peripherals and state transitions, making their handling security-relevant."
      }
    },
    "q8": {
      "options": {
        "A": "Normal input tests alone do not define safe behavior when capacity, timing, or peripherals fail.",
        "B": "Resource pressure can occur through faults or hostile workloads and needs deliberate bounded failure behavior.",
        "C": "Watchdog interactions and recovery behavior should be reviewed rather than ignored during resource-pressure design.",
        "D": "Explicit handling of full queues, oversized data, timing failures, exhausted resources, and panics makes overload behavior predictable."
      }
    },
    "q9": {
      "options": {
        "A": "Diagnostic output can expose credentials, identities, internal state, and configuration beyond the intended device trust boundary.",
        "B": "Logs and debug channels can persist in products and affect confidentiality throughout deployment and maintenance.",
        "C": "Production removal of debug output must be verified rather than assumed for every build and deployment.",
        "D": "Diagnostic messages may contain sensitive values or operational details that require minimization and redaction."
      }
    },
    "q10": {
      "options": {
        "A": "Failed updates can interrupt service or disable deployed devices, so field recovery needs planning.",
        "B": "Updates can replace trusted firmware and require authenticity, integrity, version controls, and safe recovery policy.",
        "C": "Firmware updates can change executable behavior and device authority rather than only written documentation.",
        "D": "Rollback and recovery policy affect which firmware can run and whether failures leave devices usable and trustworthy."
      }
    },
    "q11": {
      "options": {
        "A": "Embedded builds still resolve crates and features that contribute compiled code or build-time behavior.",
        "B": "Dependency use adds trust assumptions and does not eliminate artifact provenance or release review.",
        "C": "Crates and features can introduce executable dependencies, build tooling, generated code, protocols, and platform assumptions.",
        "D": "Feature flags can alter which dependencies and code paths are compiled into firmware."
      }
    },
    "q12": {
      "options": {
        "A": "Undocumented hardware assumptions make it difficult to verify safe changes or diagnose field failures.",
        "B": "Convenience should not override requirements for bounded execution, controlled resources, and predictable failure behavior.",
        "C": "RTIC supports execution structure but does not replace product maintenance, update, debug, and release planning.",
        "D": "Secure RTIC firmware combines reviewed tasks and resources with bounded timing, validated interfaces, hardware contracts, and lifecycle controls."
      }
    }
  }
};
