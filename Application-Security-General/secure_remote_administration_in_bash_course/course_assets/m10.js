window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-6efe028a3a",
  "questions": {
    "q1": {
      "options": {
        "A": "Encrypted transport does not determine whether the remote command and resulting state change are safe.",
        "B": "A local script can initiate remote mutations even without modifying its own files.",
        "C": "Remote administration exercises identities and commands capable of changing production resources, so scope and effects require control.",
        "D": "Server identity verification does not authorize a particular operator or requested administrative action."
      }
    },
    "q2": {
      "options": {
        "A": "Local SSH configuration can contain hosts outside the workflow's approved administration scope.",
        "B": "Potential administrator needs do not justify granting every command to the current job.",
        "C": "Names and prompts do not define permitted targets, authority, or expected effects.",
        "D": "Explicit targets, responsible operators, and intended outcomes define what the automation is authorized to do."
      }
    },
    "q3": {
      "options": {
        "A": "Separated environments and identities prevent lower-trust jobs and mistakes from automatically reaching production authority.",
        "B": "An authenticated test server and an authenticated production server still have different operational risk and access policy.",
        "C": "A hostname identifies a target but does not enforce who may administer it.",
        "D": "Directory organization alone does not restrict a shared credential's production access."
      }
    },
    "q4": {
      "options": {
        "A": "An agent's available keys can grant broader authority than the specific job requires.",
        "B": "Shared credentials obscure which person or job exercised the recorded authority.",
        "C": "Named ownership and narrow grants make remote actions attributable and limit the effects of compromise.",
        "D": "Caller-controlled connection options can redirect identity selection beyond the script's approved policy."
      }
    },
    "q5": {
      "options": {
        "A": "Broad credentials do not establish that the selected host is within the authorized scope.",
        "B": "Sharing one credential makes independent attribution, revocation, and incident containment harder across its users.",
        "C": "More dependents increase coordination and disruption when a shared key must be replaced urgently.",
        "D": "A shared authentication credential does not uniquely identify the individual operator or job."
      }
    },
    "q6": {
      "options": {
        "A": "Inventory membership requires separate target authorization rather than being established by the server key alone.",
        "B": "Authenticating the server does not decide whether the remote command is an approved business operation.",
        "C": "Server verification does not establish the privilege scope of the remote login account.",
        "D": "Checking the server's trusted identity helps ensure credentials and commands reach the intended remote system."
      }
    },
    "q7": {
      "options": {
        "A": "DNS resolution demonstrates reachability, not authorization to administer the resolved host.",
        "B": "Explicit target and group validation prevents accidental wildcards or caller input from expanding the approved host set.",
        "C": "Known-host records establish server-key trust rather than an administration allowlist for every recorded host.",
        "D": "A syntactically valid host does not authorize selection of unrelated inventory groups."
      }
    },
    "q8": {
      "options": {
        "A": "Local expansion and remote command interpretation introduce separate boundaries that need deliberate data handling.",
        "B": "A local quoting decision does not automatically preserve the same meaning through remote parsing.",
        "C": "SSH authenticates and transports commands rather than enforcing the application's intended remote argument schema.",
        "D": "Remote shell command processing can reinterpret values rather than receive an unchanged local argument array."
      }
    },
    "q9": {
      "options": {
        "A": "A failed or incomplete operation may produce no useful stderr, so postconditions still need checking.",
        "B": "Connection and command status do not universally establish that the intended target state was reached.",
        "C": "Post-change checks distinguish the requested action from verified results and make incomplete changes visible.",
        "D": "A request log records intent but does not establish that the expected change occurred."
      }
    },
    "q10": {
      "options": {
        "A": "Parallel execution can spread the same mistake more quickly across a larger host set.",
        "B": "Bounded concurrency and staged rollout limit how many systems can be affected before a defect is detected.",
        "C": "Completion order does not establish equivalent results or consistent state across hosts.",
        "D": "Retries can repeat a partially completed remote mutation unless its lifecycle and idempotency are controlled."
      }
    },
    "q11": {
      "options": {
        "A": "Safe records identify targets and outcomes without retaining credentials or unnecessarily sensitive remote payloads.",
        "B": "Attribution can use identities and safe action metadata without storing every secret-bearing output byte.",
        "C": "Failed privileged operations can still expose credentials and sensitive diagnostics requiring redaction.",
        "D": "Restricted logs can be retained, exported, or accessed later and should not contain private keys."
      }
    },
    "q12": {
      "options": {
        "A": "Fast rollout without target and outcome controls increases the potential scope of a mistake.",
        "B": "Arbitrary shell fragments let callers redefine execution beyond the intended administration contract.",
        "C": "A universal identity weakens environment separation and expands compromise impact.",
        "D": "Authorized targets, limited identities, checked outcomes, and safe records keep remote changes controlled and reviewable."
      }
    }
  }
};
