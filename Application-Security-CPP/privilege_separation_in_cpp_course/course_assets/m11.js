window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-fca36233a7",
  "questions": {
    "q1": {
      "options": {
        "A": "Moving more parsers into the privileged helper enlarges the highly trusted attack surface.",
        "B": "Keep privileged code small instead of concentrating most functionality with broad authority.",
        "C": "Limiting ordinary components' authority reduces what their defects can directly compromise.",
        "D": "Unprivileged clients can still make malicious requests, so privileged boundaries need authentication."
      }
    },
    "q2": {
      "options": {
        "A": "Ordinary code should hold minimal authority and use narrowly authorized privileged operations.",
        "B": "Interface restrictions cannot fully compensate for unnecessary ambient authority throughout ordinary code.",
        "C": "External input must not be processed before required privilege reduction and boundary setup.",
        "D": "Administrative rights give ordinary defects broad authority despite command-name restrictions."
      }
    },
    "q3": {
      "options": {
        "A": "Using a system API does not necessarily require elevated access to protected resources.",
        "B": "Inferring authority from failures risks granting broad permissions without a deliberate resource model.",
        "C": "Names do not establish the actual resources and authority used at runtime.",
        "D": "Map resources and decisions early to identify the minimum authority each operation needs."
      }
    },
    "q4": {
      "options": {
        "A": "A broad approval can conceal sensitive suboperations requiring different validation and authorization.",
        "B": "Narrow operations make parameters, permissions, outcomes, and audit expectations easier to verify.",
        "C": "Arbitrary shell commands expose excessive privileged behavior and command-construction risk.",
        "D": "Reducing command scope also reduces the validation and authorization surface."
      }
    },
    "q5": {
      "options": {
        "A": "Local endpoints can receive requests from untrusted or compromised local processes.",
        "B": "Client validation can be bypassed, so the authority-holding component must validate independently.",
        "C": "The privileged receiver must establish request validity before using its authority.",
        "D": "Authentication identifies a peer but does not authorize every requested resource or parameter."
      }
    },
    "q6": {
      "options": {
        "A": "The component performing the privileged action must enforce its authorization decision.",
        "B": "User-interface checks can be bypassed by callers that send requests directly.",
        "C": "Authorization after an operation cannot undo an already unauthorized side effect.",
        "D": "A policy copy alone does not ensure the actual authority boundary enforces it."
      }
    },
    "q7": {
      "options": {
        "A": "A canonical path string does not bind a later open against concurrent filesystem changes.",
        "B": "Extensions do not establish trusted ownership, safe link resolution, or authorized target identity.",
        "C": "Client checks do not prevent filesystem changes before the helper's later open.",
        "D": "Privileged access must account for target identity, permissions, links, and platform-specific races."
      }
    },
    "q8": {
      "options": {
        "A": "Copying secrets into every client expands the trusted surface and potential disclosure.",
        "B": "Keep sensitive material within minimal trusted code and return only permitted results.",
        "C": "Raw handles can grant continuing authority beyond the originally authorized operation.",
        "D": "Request identifiers can support audit without recording the secret values themselves."
      }
    },
    "q9": {
      "options": {
        "A": "System-call restrictions do not express every application resource or business authorization rule.",
        "B": "Credentials, capabilities, and sandboxes can enforce concrete runtime access restrictions.",
        "C": "Platform mechanisms constrain authority and strengthen the application's least-privilege boundary.",
        "D": "Shared accounts and writable state can undermine isolation between otherwise separate services."
      }
    },
    "q10": {
      "options": {
        "A": "Denied requests, lifecycle changes, and policy evolution all require ongoing verification.",
        "B": "Denial paths can still leak information, consume resources, or mutate state incorrectly.",
        "C": "Monitoring complements tests and should not postpone boundary defect detection until deployment.",
        "D": "Authorization changes can alter the boundary even without changing message syntax."
      }
    }
  }
};
