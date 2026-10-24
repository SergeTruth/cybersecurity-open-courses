window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-bff19a2a29",
  "questions": {
    "q01": {
      "options": {
        "A": "A broker remains a privileged boundary and must validate requests even when the worker validates its own input.",
        "B": "Broad recovery authority can let a compromised worker bypass the restrictions the sandbox is meant to enforce.",
        "C": "Sandboxing restricts effects; it does not automatically translate native memory defects into safe validation results.",
        "D": "The sandbox limits the resources and operations a misbehaving or compromised worker can reach, reducing its potential impact."
      }
    },
    "q02": {
      "options": {
        "A": "Protected assets and likely failure paths determine which capabilities need restriction and which broker boundaries require enforcement.",
        "B": "Choosing an API before identifying required protections can produce a policy that misses the actual threat boundary.",
        "C": "Program size does not determine which resources or privileges a component needs.",
        "D": "Locally written code can contain exploitable flaws and belongs in the threat model when it processes risky input."
      }
    },
    "q03": {
      "options": {
        "A": "Giving sensitive resources directly to workers expands their authority instead of keeping privileged operations behind a broker.",
        "B": "Separate channels do not create a privilege boundary when every process retains equivalent authority.",
        "C": "A restricted worker requests specific operations from a trusted broker that validates and authorizes each request before acting.",
        "D": "A well-formed request can still ask for an unauthorized resource or operation and must not be forwarded blindly."
      }
    },
    "q04": {
      "options": {
        "A": "Broad reads can expose secrets and private data even when write access is restricted.",
        "B": "A job-specific permission set limits what the worker can do beyond its intended task.",
        "C": "A linked dependency's capabilities do not establish that every capability is required by the worker's actual job.",
        "D": "Permissions for hypothetical future features expand current authority without a demonstrated operational need."
      }
    },
    "q05": {
      "options": {
        "A": "Build-time names alone do not identify the runtime resources and capabilities granted to the sandboxed worker.",
        "B": "Purely cosmetic resources do not cover the sensitive access categories that determine the worker's authority.",
        "C": "Arithmetic instruction names do not identify the files, services, devices, or credentials the worker can access.",
        "D": "These resource categories can expose data, credentials, devices, and external effects and therefore require explicit grant decisions."
      }
    },
    "q06": {
      "options": {
        "A": "IPC transport can deliver bytes without establishing the application's permitted request meaning.",
        "B": "Validation checks representation, while authorization determines whether the worker may request the operation.",
        "C": "The broker must treat worker messages as untrusted and check their structure, limits, and authority before privileged use.",
        "D": "Syntactic validity does not prove that the requested file, action, or credential is within the worker's grant."
      }
    },
    "q07": {
      "options": {
        "A": "Consumption limits do not establish the validity or authorization of a request.",
        "B": "Caps on time, memory, handles, storage, and CPU bound how much capacity a worker can consume.",
        "C": "Limits do not reveal every failure or abuse pattern, so operational monitoring remains useful.",
        "D": "Reaching a limit can cause termination or failure, and recovery behavior still needs deliberate design."
      }
    },
    "q08": {
      "options": {
        "A": "Denied permissions and abnormal worker behavior test containment and recovery paths that normal processing cannot establish.",
        "B": "Orderly success covers only a narrow part of the permission and failure contract.",
        "C": "Snapshots with enforcement disabled cannot demonstrate that the actual sandbox blocks prohibited behavior.",
        "D": "Trusted-input throughput does not exercise malformed IPC, permission denial, crashes, or resource-exhaustion boundaries."
      }
    },
    "q09": {
      "options": {
        "A": "New features can require or accidentally introduce access that the released policy did not anticipate.",
        "B": "Platform changes can affect enforcement details and need appropriate compatibility and security review.",
        "C": "Updated dependencies may request new resources or change execution behavior even when the process identity stays fixed.",
        "D": "Ongoing ownership and review keep grants aligned with the component's actual behavior as code and platforms change."
      }
    },
    "q10": {
      "options": {
        "A": "Delegating broker credentials can collapse the privilege separation between the restricted worker and the trusted broker.",
        "B": "Automatically broadening permissions after denial can turn policy enforcement into a route around the sandbox.",
        "C": "Reviewing necessary access, broker enforcement, and bounded failures tests both least privilege and the containment design.",
        "D": "Parsing establishes message structure, not permission for the broker to perform the represented action."
      }
    }
  }
};
