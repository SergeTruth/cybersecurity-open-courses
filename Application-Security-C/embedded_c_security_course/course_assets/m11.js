window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-eb13855887",
  "questions": {
    "q01": {
      "options": {
        "A": "Source rules do not by themselves protect update authorization, hardware access, and maintenance workflows.",
        "B": "Embedded security spans code, device interfaces, credentials, deployment, and reliable behavior throughout the product lifecycle.",
        "C": "Physical, manufacturing, and peripheral authority can affect device security as directly as network input.",
        "D": "Early boundaries and recovery choices shape which later controls and tests are possible."
      }
    },
    "q02": {
      "options": {
        "A": "An enclosure does not universally prevent physical or debug access throughout a device's lifetime.",
        "B": "Maintenance can exercise powerful data and firmware operations that need explicit authorization assumptions.",
        "C": "Every listed access path can cross an authority boundary or invalidate assumptions about how the device is used.",
        "D": "Hardware limits alone do not identify the authority exercised by support and release processes."
      }
    },
    "q03": {
      "options": {
        "A": "A fixed buffer still has finite capacity and can be overrun by incorrect hardware or input lengths.",
        "B": "Memory-mapped access does not establish safe object initialization, device state, or pointer-use rules.",
        "C": "A status result does not prove callers supplied the correct capacity and ownership contract.",
        "D": "Low-level code must explicitly establish valid storage, lengths, ownership, initialization, and cleanup across hardware interfaces."
      }
    },
    "q04": {
      "options": {
        "A": "Every channel can supply malformed or unexpected values whose representation and meaning need checks before use.",
        "B": "Local sensor and bus data can violate range, freshness, format, or trust assumptions.",
        "C": "Persisted values can become invalid after corruption, configuration changes, or firmware evolution.",
        "D": "Different protocols require their own structural and semantic limits before sensitive processing."
      }
    },
    "q05": {
      "options": {
        "A": "A mutable reference hash cannot alone establish firmware authority or a safe rollback policy.",
        "B": "Secure boot needs protected verification authority and enforced stage policy, including a tested response when validation fails.",
        "C": "Signature success does not establish supported versions, intended device scope, or valid recovery metadata.",
        "D": "Continuing after verification failure can execute code whose authorization was never established."
      }
    },
    "q06": {
      "options": {
        "A": "A binary available to an attacker can reveal embedded secrets despite controlled distribution assumptions.",
        "B": "Obfuscation does not provide the same key isolation as a protected non-exportable backend.",
        "C": "A shared factory credential can expose many devices and may be difficult to replace safely after compromise.",
        "D": "Embedded secrets spread through artifacts and devices, complicating independent replacement and lifecycle control."
      }
    },
    "q07": {
      "options": {
        "A": "An undocumented electrical path can remain usable independently of the visible menu.",
        "B": "Physical access does not automatically authorize manufacturing or privileged maintenance commands.",
        "C": "Diagnostic and factory capabilities can expose sensitive state or powerful operations outside normal application boundaries.",
        "D": "A usage log records access but does not justify unnecessarily broad production authority."
      }
    },
    "q08": {
      "options": {
        "A": "Buffers and hardware state need explicit ownership, bounds, and synchronization before another context reads or modifies them.",
        "B": "A valid length does not prevent concurrent hardware mutation or premature buffer reuse.",
        "C": "Volatile does not implement every cache-coherency, atomicity, ordering, or ownership requirement.",
        "D": "Delayed checks cannot prevent unsafe effects caused when the application consumes invalid peripheral data first."
      }
    },
    "q09": {
      "options": {
        "A": "Rare interruption and power-loss states can invalidate assumptions not exercised by one update failure.",
        "B": "Target timing, memory layout, and peripherals can differ materially from a host-only simulation.",
        "C": "Recovery behavior needs execution evidence, including repeated resets and partial-state failures where feasible.",
        "D": "Boundary and interrupted-lifecycle tests reveal faults hidden by ordinary steady-state operation."
      }
    },
    "q10": {
      "options": {
        "A": "Clean code tools do not verify every production boot, fuse, configuration, and deployment decision.",
        "B": "Hardware tests cover selected executions and do not replace an explicit threat and trust model.",
        "C": "Complementary evidence links code and dependency quality with actual target configuration and lifecycle failure behavior.",
        "D": "Inventory supports dependency response, while ownership and field monitoring remain needed for updates and incidents."
      }
    }
  }
};
