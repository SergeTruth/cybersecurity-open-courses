window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-4b00f8bd01",
  "questions": {
    "q01": {
      "options": {
        "A": "Firmware developers implement input, memory, credential, and update behavior with direct security consequences.",
        "B": "Long-lived device code controls valuable hardware and identity and must handle external data safely throughout deployment.",
        "C": "Field threats and vulnerabilities can evolve long after manufacturing and initial release.",
        "D": "Offline devices still process local and persisted data and can expose identity or maintenance authority."
      }
    },
    "q02": {
      "options": {
        "A": "An interface alone does not imply a trust change; analysis must identify actual changes in authority and assumptions.",
        "B": "Stored state, peripherals, and privileged drivers can cross important boundaries without network traffic.",
        "C": "A call graph can omit physical provisioning and maintenance authority outside ordinary function flow.",
        "D": "Firmware boundaries occur where data or authority changes between components, device state, hardware, and external actors."
      }
    },
    "q03": {
      "options": {
        "A": "Validation before execution helps ensure the device starts code authorized by its protected boot policy.",
        "B": "Executing first and verifying later allows unvalidated firmware to act before the trust check.",
        "C": "A nearby checksum can be replaced with the image and does not alone establish authorized origin.",
        "D": "Verified code still needs to validate the configuration and persisted data it consumes."
      }
    },
    "q04": {
      "options": {
        "A": "Unexamined defaults can silently activate a state that validation never established as safe.",
        "B": "Devices need a predictable rejection and recovery contract before field failures occur.",
        "C": "Explicit failure states prevent invalid firmware or metadata from silently becoming an unsafe operating configuration.",
        "D": "Repeated reset is not a universal recovery policy for every damaged firmware or persistent-state condition."
      }
    },
    "q05": {
      "options": {
        "A": "Fixed storage still needs ownership, bounds, initialization, and lifetime rules.",
        "B": "Memory limits and allocation behavior influence both whether the device remains available and whether accesses remain valid.",
        "C": "Restarting after fragmentation does not undo unsafe partial state or establish acceptable availability.",
        "D": "Rare call depths and interrupt interactions can exceed assumptions based only on average stack use."
      }
    },
    "q06": {
      "options": {
        "A": "Peripheral transport success does not prove that values satisfy freshness, structure, and safe operating constraints.",
        "B": "A driver result does not establish the application's range and state requirements.",
        "C": "A checksum can detect some corruption without validating sensor meaning or authorization-sensitive state.",
        "D": "Length checks and clipping require a broader policy for malformed, stale, and semantically invalid values."
      }
    },
    "q07": {
      "options": {
        "A": "A recovered product-wide credential can affect every device accepting the same secret.",
        "B": "Device-identity secrets can authorize access or impersonation and still need replacement planning.",
        "C": "Restricted build access does not prevent later extraction or copies from distributed firmware artifacts.",
        "D": "Hardcoded material can spread across devices and releases, making containment and independent rotation difficult."
      }
    },
    "q08": {
      "options": {
        "A": "Validation after activation can allow untrusted code to execute before rejection.",
        "B": "Previously signed firmware can still violate the current rollback, vulnerability, or compatibility policy.",
        "C": "A complete update contract verifies permitted content and versions and supports safe interruption, recovery, and activation.",
        "D": "Interrupted storage and power loss are central update failure paths rather than unrelated concerns."
      }
    },
    "q09": {
      "options": {
        "A": "Production debug capabilities can expose secrets and privileged control paths beyond the intended field interface.",
        "B": "Hidden connectors and undocumented commands do not establish an access-control boundary.",
        "C": "Factory features can expose additional authority even when built from familiar source files.",
        "D": "Read-only access can still disclose keys, memory state, and sensitive configuration."
      }
    },
    "q10": {
      "options": {
        "A": "Memory dumps can expose credentials and personal information and need a justified collection and handling policy.",
        "B": "Raw external frames can contain secrets, uncontrolled formatting, and excessive volume.",
        "C": "Bounded storage does not make the data inside it safe to disclose.",
        "D": "Safe diagnostics limit sensitive content and resource effects so evidence collection does not create another device failure or leak."
      }
    },
    "q11": {
      "options": {
        "A": "Security behavior includes hardware state, reset, interruption, and rejection rather than only valid unit-test cases.",
        "B": "Different settings can expose debug authority or altered protections despite shared source files.",
        "C": "Tests should exercise invalid state and lifecycle transitions and verify the actual shipped configuration's protections.",
        "D": "Numeric extremes alone omit damaged storage and interrupted-update conditions that can break startup invariants."
      }
    },
    "q12": {
      "options": {
        "A": "Authenticated startup does not guarantee safe runtime memory, inputs, secrets, or diagnostics.",
        "B": "Firmware security coordinates authorized code and updates with safe runtime behavior, controlled maintenance access, and verified recovery.",
        "C": "Platform features do not define undocumented application trust and permission assumptions.",
        "D": "Availability policy must not silently accept operation when safety-relevant validity cannot be established."
      }
    }
  }
};
