window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-acbaf9b9c5",
  "questions": {
    "q1": {
      "options": {
        "A": "Security must continue through deployment, maintenance, updates, diagnostics, recovery, and retirement beyond initial manufacture.",
        "B": "Firmware trust depends on coordinated code, hardware assumptions, build inputs, deployment controls, updates, and ongoing maintenance.",
        "C": "A language can reduce certain defect classes without establishing the entire product's security lifecycle.",
        "D": "Compilation does not settle release integrity, provisioning, update recovery, field access, or maintenance requirements."
      }
    },
    "q2": {
      "options": {
        "A": "Memory safety cannot prevent every device fault, hardware issue, misuse, or operational failure in the field.",
        "B": "Release controls require engineering decisions about provenance, approvals, artifact identity, deployment, and recovery.",
        "C": "Hardware behavior, validation, updates, debugging, secrets, resource limits, and releases need controls beyond memory safety.",
        "D": "Protocol structure, state transitions, and operation permissions must be explicitly validated rather than inferred automatically."
      }
    },
    "q3": {
      "options": {
        "A": "Early asset and boundary definitions convert assumptions into concrete requirements that can guide implementation, testing, and maintenance.",
        "B": "Defining boundaries identifies dependency trust needs but does not prove all dependencies are safe.",
        "C": "Requirements guide review and verification rather than replacing inspection of the code that implements them.",
        "D": "Asset and boundary decisions matter before deployment, throughout field use, and during product retirement."
      }
    },
    "q4": {
      "options": {
        "A": "no_std does not prohibit unsafe code or prove that every low-level operation is sound.",
        "B": "Safe abstractions can be designed and used without std when they fit the platform's available facilities.",
        "C": "Stack depth, buffer sizes, and memory consumption still need explicit review in constrained firmware.",
        "D": "Limited runtime facilities make deliberate memory, dependency, allocation, panic, and resource-limit choices especially important."
      }
    },
    "q5": {
      "options": {
        "A": "Hardware abstractions implement device access and therefore directly affect register state, peripherals, and runtime behavior.",
        "B": "Hardware effects and peripheral interactions can depend on assumptions beyond the compiler's model of reference safety.",
        "C": "Register-access abstractions change device behavior rather than only formatting source files.",
        "D": "Abstractions can encode assumptions, but their correctness against the hardware contract still needs verification."
      }
    },
    "q6": {
      "options": {
        "A": "Low-level operations need visible safety arguments because reviewers must understand the assumptions that justify them.",
        "B": "Compilation cannot prove every hardware precondition, so comments explaining invariants remain useful and often essential.",
        "C": "Small documented unsafe regions should expose safe APIs that preserve the hardware and memory invariants they depend on.",
        "D": "Broad unsafe use obscures ownership design and increases the manual safety obligations across the codebase."
      }
    },
    "q7": {
      "options": {
        "A": "Release evidence connects an update to controlled inputs and production processes that support firmware trust.",
        "B": "Filenames alone do not establish artifact identity, authenticity, compatibility, integrity, or update authorization.",
        "C": "Safe updates also require controlled states, version policy, interruption recovery, rollback rules, and accountable artifact handling.",
        "D": "Recovery from partial or failed writes is a central part of update state and lifecycle design."
      }
    },
    "q8": {
      "options": {
        "A": "Successful parsing does not establish that a message is authorized or valid for the current device state.",
        "B": "Device inputs cross boundaries from potentially untrusted physical, network, or maintenance interfaces into firmware behavior.",
        "C": "State-machine validation applies to firmware commands and hardware operations as well as user interfaces.",
        "D": "Firmware must reject malformed, oversized, out-of-sequence, unauthorized, and state-inappropriate messages before performing sensitive actions."
      }
    },
    "q9": {
      "options": {
        "A": "Hard-coded or exposed credentials and missing replacement plans create preventable disclosure and recovery problems.",
        "B": "Replacement and revocation plans help restore trust when credentials are exposed or no longer appropriate.",
        "C": "Diagnostic redaction reduces unnecessary disclosure of credentials and other protected values through support channels.",
        "D": "Documented provisioning clarifies how secrets enter devices and who controls their secure installation."
      }
    },
    "q10": {
      "options": {
        "A": "Debug and maintenance paths can grant powerful device access and are directly relevant to product security.",
        "B": "Access should reflect device threats, support requirements, lifecycle stages, and explicit operational authorization policy.",
        "C": "Permanently open production access can expose sensitive state, firmware modification, or other privileged device capabilities.",
        "D": "Debug interfaces can exist as physical ports, protocols, or firmware services rather than merely comments."
      }
    },
    "q11": {
      "options": {
        "A": "Production firmware can contain crates, generated code, and other build outputs that influence deployed behavior.",
        "B": "Traceability helps connect a shipped artifact to reviewed source, dependencies, toolchains, configuration, and release evidence.",
        "C": "The trusted firmware includes its dependency graph, build-time code, toolchain inputs, configuration, and final artifacts.",
        "D": "Features can activate code, dependencies, integrations, or protocols that change the deployed firmware's behavior."
      }
    },
    "q12": {
      "options": {
        "A": "Informal assumptions are difficult to validate, preserve during changes, and investigate when device behavior fails.",
        "B": "Secure release evidence helps establish which reviewed inputs produced the actual firmware shipped to devices.",
        "C": "Rust's guarantees complement lifecycle planning rather than replacing provisioning, updates, maintenance, and retirement controls.",
        "D": "Dependable firmware requires explicit and tested assumptions across memory, hardware, inputs, updates, secrets, debug access, and releases."
      }
    }
  }
};
