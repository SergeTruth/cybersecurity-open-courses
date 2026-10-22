window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-36eed74e14",
  "questions": {
    "q1": {
      "options": {
        "A": "Rust cannot verify every hardware side effect, electrical assumption, or device deployment condition.",
        "B": "Device security combines firmware behavior with physical interfaces, resource constraints, maintenance, and the full product lifecycle.",
        "C": "Firmware requires secure design during development, provisioning, deployment, updates, field use, and retirement.",
        "D": "Embedded devices receive external commands, sensor data, network frames, and other potentially untrusted inputs."
      }
    },
    "q2": {
      "options": {
        "A": "Memory safety reduces certain defects but cannot prevent all hardware faults, misuse, or operational failures.",
        "B": "Update authorization and debug access policies require deliberate product decisions beyond memory-safety checks.",
        "C": "Hardware, input, secrets, updates, debugging, resources, and release practices each require additional security controls.",
        "D": "Compiler checks do not prove that every register setting matches the hardware datasheet's requirements."
      }
    },
    "q3": {
      "options": {
        "A": "Threat modeling identifies what needs protection, how it is exposed, and which trust assumptions need controls.",
        "B": "Identifying driver threats does not prove that every implementation satisfies its hardware safety obligations.",
        "C": "Threat modeling guides tests and controls rather than replacing verification of firmware behavior.",
        "D": "Devices also have assets, interfaces, attackers, and lifecycle risks that benefit from threat modeling."
      }
    },
    "q4": {
      "options": {
        "A": "no_std removes the standard-library dependency but does not guarantee the absence of unsafe operations.",
        "B": "Firmware can process external input without std by using suitable parsers and explicit resource management.",
        "C": "Constrained systems still need careful stack, buffer, allocation, and processing-limit review.",
        "D": "Without standard-library facilities, memory use, dependencies, error handling, and resource bounds often need more explicit design."
      }
    },
    "q5": {
      "options": {
        "A": "Hardware abstractions can be sound; review checks their assumptions rather than presuming every generated implementation is wrong.",
        "B": "Register effects and peripheral interactions can depend on hardware assumptions outside the compiler's checked model.",
        "C": "Hardware abstractions implement actual device access and can directly change runtime behavior and peripheral state.",
        "D": "Abstractions may interact with clocks and interrupts, so those relationships remain part of the safety review."
      }
    },
    "q6": {
      "options": {
        "A": "Ownership inconvenience does not justify unsafe access without a valid hardware and memory safety argument.",
        "B": "The compiler does not verify all hardware side effects or automatically establish register-access preconditions.",
        "C": "Small documented unsafe boundaries should enforce hardware invariants through safe interfaces and focused verification.",
        "D": "Hiding unsafe access in large undocumented modules makes its invariants harder to review and maintain."
      }
    },
    "q7": {
      "options": {
        "A": "Interrupt and DMA lifecycles still require explicit coordination, cancellation, completion, and cleanup behavior.",
        "B": "Hardware-delivered data may remain malformed or unauthorized and still requires validation by appropriate software boundaries.",
        "C": "Asynchronous hardware access can overlap software activity, requiring explicit ownership, timing, synchronization, and buffer validity rules.",
        "D": "DMA and interrupts can affect buffers outside ordinary sequential control flow, making ownership particularly important."
      }
    },
    "q8": {
      "options": {
        "A": "Successful parsing establishes structural validity, while command authorization requires a separate policy decision.",
        "B": "Protocol fields can select operations, sizes, destinations, and state changes that directly affect firmware behavior.",
        "C": "Well-formed messages may still be unauthorized, oversized in effect, or inappropriate for the current device state.",
        "D": "Firmware must validate structure, bounds, consistency, authorization, and state before acting on external messages."
      }
    },
    "q9": {
      "options": {
        "A": "Embedded secrets need controlled provisioning, redacted diagnostics, and clear replacement rather than hard-coded or exposed values.",
        "B": "Clear ownership helps teams understand where sensitive values flow and which code may access them.",
        "C": "Redaction reduces accidental disclosure through diagnostic channels and should be part of secret handling.",
        "D": "Documented provisioning and replacement support secure deployment and recovery when credentials must change."
      }
    },
    "q10": {
      "options": {
        "A": "Firmware updates can replace trusted device behavior and therefore directly affect the product's trust boundary.",
        "B": "Update design must establish authenticity, integrity, version policy, safe recovery, and appropriate rollback behavior.",
        "C": "Updates may change privileged firmware, device policy, and data processing far beyond interface wording.",
        "D": "Interrupted or invalid updates can disable devices, so recovery behavior needs deliberate planning and testing."
      }
    },
    "q11": {
      "options": {
        "A": "Fully open debug interfaces may grant privileged device access that conflicts with the product's security requirements.",
        "B": "Debug paths may persist in shipped products or field-service workflows and need lifecycle-aware controls.",
        "C": "Powerful maintenance capabilities should be limited according to threats, support requirements, lifecycle stage, and operational policy.",
        "D": "Debug and maintenance access are important attack paths that belong in the device's threat model."
      }
    },
    "q12": {
      "options": {
        "A": "Unrestricted hardware access removes protective abstractions and expands manual validity and privilege obligations.",
        "B": "Field deployment and maintenance affect device trust and cannot be excluded from firmware security design.",
        "C": "Rust's language guarantees complement rather than eliminate product threat modeling and lifecycle security planning.",
        "D": "Secure firmware combines bounded software behavior with reviewed hardware, interfaces, secrets, updates, debug controls, and releases."
      }
    }
  }
};
