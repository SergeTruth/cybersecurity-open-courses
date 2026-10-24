window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-3a83f836e0",
  "questions": {
    "q01": {
      "options": {
        "A": "AI can examine many kinds of source code; its limitations concern reliability and missing security context.",
        "B": "Human reviewers must verify the evidence and consequences because plausible AI findings and fixes can still be wrong.",
        "C": "Tools support secure review, but their outputs need contextual evaluation and accountable decisions.",
        "D": "Node.js routes, dependencies, data flows, and configuration all present security decisions that warrant review."
      }
    },
    "q02": {
      "options": {
        "A": "Scope and context identify the code paths, trust boundaries, and deployment assumptions that a useful review must examine.",
        "B": "Context guides investigation; findings still need evidence from the implementation or its behavior.",
        "C": "Even a well-scoped prompt cannot guarantee complete vulnerability detection.",
        "D": "Tests help verify behavior and proposed fixes; supplying context does not replace that evidence."
      }
    },
    "q03": {
      "options": {
        "A": "Production environment files can contain live credentials and should be sanitized before sharing.",
        "B": "Raw customer payloads can disclose personal or confidential data; sanitized examples can preserve the relevant structure.",
        "C": "Unreviewed output can repeat sensitive material or unsupported claims when copied into a ticket.",
        "D": "Removing live secrets and customer data reduces disclosure while preserving the code structure needed to reason about risk."
      }
    },
    "q04": {
      "options": {
        "A": "Middleware order controls which checks run before a handler, so it affects access and processing behavior.",
        "B": "A package manifest does not establish that authentication and authorization middleware protect a route.",
        "C": "A handler's effective protections depend on the middleware that actually executes before it and the errors handled afterward.",
        "D": "Authentication middleware must execute on the relevant path before a protected handler can rely on its identity result."
      }
    },
    "q05": {
      "options": {
        "A": "Knowing the caller's identity does not establish permission for a particular operation, tenant, or object.",
        "B": "Authentication establishes identity used by security decisions, rather than serving only as a logging aid.",
        "C": "Authorization must be enforced by trusted server-side code, where protected operations and data are accessed.",
        "D": "A valid login does not grant access to other users' objects or actions outside the caller's permissions."
      }
    },
    "q06": {
      "options": {
        "A": "A proposed finding needs validation against the actual object lookup and permission checks before approval.",
        "B": "Tracing identifiers into data access can reveal where ownership, tenant scope, or action permissions are missing.",
        "C": "Tenant boundaries remain required regardless of whether AI helps inspect their enforcement.",
        "D": "Clients can be modified or bypassed, so their checks cannot substitute for server-side authorization."
      }
    },
    "q07": {
      "options": {
        "A": "Restricting response fields does not establish the caller's identity or permission to access the endpoint.",
        "B": "Server-side validation is needed because attackers can bypass frontend restrictions.",
        "C": "Input validation and response filtering address different boundaries; a valid request can still receive sensitive internal data.",
        "D": "Database objects can contain internal, private, or secret fields that should not be serialized into public responses."
      }
    },
    "q08": {
      "options": {
        "A": "Dependencies and configuration can change execution and security boundaries without a large application-code diff.",
        "B": "Package tooling does not automatically validate every security consequence of dependency or configuration changes.",
        "C": "Install scripts, resolved versions, credentials, and runtime settings can all affect production behavior.",
        "D": "These changes can alter trusted code, execution settings, and secret exposure, so they belong in the review scope."
      }
    },
    "q09": {
      "options": {
        "A": "A finding is actionable when its claim can be checked against code, reachable data flow, configuration, or observed behavior.",
        "B": "Confident language is not evidence that the alleged path exists or is exploitable.",
        "C": "AI approval does not replace the human responsibility to validate and accept a security change.",
        "D": "A vague assurance provides no inspectable evidence about the boundaries and behaviors actually reviewed."
      }
    },
    "q10": {
      "options": {
        "A": "A broad prompt omits the targeted context and validation needed to make findings dependable.",
        "B": "Targeted assistance, normal engineering checks, validated findings, and human approval combine discovery with accountable verification.",
        "C": "AI review can miss defects, so tests and other CI checks remain necessary evidence.",
        "D": "Comments alone do not establish that a finding or fix was verified and approved by an accountable reviewer."
      }
    }
  }
};
