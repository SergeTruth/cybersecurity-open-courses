window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-9f2cedba5a",
  "questions": {
    "q1": {
      "options": {
        "A": "Azure CLI uses identities whose granted roles determine which cloud operations are available.",
        "B": "Scripts can exercise real authority over deployed services, identities, private data, networks, and production workflows.",
        "C": "CLI requests can alter production whenever their selected identity and scope permit it.",
        "D": "The tool manages cloud resources rather than only change the local terminal's appearance."
      }
    },
    "q2": {
      "options": {
        "A": "Relying on a selected subscription without verification can apply changes to the wrong environment.",
        "B": "A safe script should constrain its intended subscription rather than automatically change every subscription.",
        "C": "Validated tenant and subscription context reduces the chance of operations reaching an unintended target.",
        "D": "Knowing the actual tenant is important when credentials can reach multiple environments."
      }
    },
    "q3": {
      "options": {
        "A": "Saved CLI state can point to an identity or subscription different from the script's intended target.",
        "B": "Existing account selection does not demonstrate that its grants have been reviewed or are appropriate.",
        "C": "A selected identity may hold broad roles and cannot be assumed least-privileged.",
        "D": "Account context does not validate the structure or meaning of later command output."
      }
    },
    "q4": {
      "options": {
        "A": "Unneeded elevated assignments retain authority that can be abused or accidentally exercised.",
        "B": "Shared broad Owner access exceeds the needs of many routine jobs.",
        "C": "Reports generally need narrower read access rather than authority to deploy arbitrary resources.",
        "D": "Scope roles and identities to the operations and environment actually required by the automation."
      }
    },
    "q5": {
      "options": {
        "A": "Federated or managed identity does not replace verification of the intended subscription and scope.",
        "B": "Supported identity mechanisms can avoid embedded permanent secrets while providing controllable runtime access.",
        "C": "Runtime authentication does not automatically approve every requested production side effect.",
        "D": "Identity tokens and related credentials should not be copied into retained diagnostic output."
      }
    },
    "q6": {
      "options": {
        "A": "Diagnostic systems can be aggregated or widely accessed and should not be assumed private.",
        "B": "A token can remain usable after a command completes and retains its sensitivity.",
        "C": "Retained debug records can distribute active credentials beyond the service and people that need them.",
        "D": "Log storage does not sanitize token authority or make disclosure safe."
      }
    },
    "q7": {
      "options": {
        "A": "Unvalidated command-group selection lets external input influence privileged operations too broadly.",
        "B": "Re-evaluating a constructed shell string creates additional interpretation risks.",
        "C": "Fixed command structure, safe arguments, validation, and explicit failure checks preserve clearer execution boundaries.",
        "D": "Ignored failures can leave partial updates or cause later commands to act on invalid assumptions."
      }
    },
    "q8": {
      "options": {
        "A": "Parsed JSON is not automatically valid for the specific resource or workflow decision.",
        "B": "Output handling does not restrict the effective RBAC grants of the caller.",
        "C": "Responses can include sensitive configuration, tenant details, identifiers, and private data.",
        "D": "Downstream actions need expected field types, values, and target relationships rather than arbitrary raw output."
      }
    },
    "q9": {
      "options": {
        "A": "Role, network, secret, encryption, storage, and deletion changes can affect confidentiality, access, availability, and recoverability.",
        "B": "Approval and change controls remain relevant for actions with consequential effects.",
        "C": "Audit availability needs verification rather than an assumption that CLI actions leave no records.",
        "D": "Shell invocation does not remove the consequences of changing sensitive cloud configuration."
      }
    },
    "q10": {
      "options": {
        "A": "Every-job access unnecessarily spreads production authority across different trust levels.",
        "B": "Unreviewed triggers may run attacker-controlled changes and should not gain privileged deployment credentials.",
        "C": "Production eligibility must follow actual workflow trust and review rather than trigger existence alone.",
        "D": "Authorized pipeline identities can create, modify, or delete Azure resources through APIs."
      }
    },
    "q11": {
      "options": {
        "A": "Approved high-level identity and scope metadata can make actions traceable without exposing credentials.",
        "B": "Useful bounded error context helps diagnosis when sensitive values have been excluded.",
        "C": "Tokens, secrets, private records, and excessive raw responses can create avoidable disclosure through logs.",
        "D": "Sanitized result messages provide operational evidence without inherently revealing protected values."
      }
    },
    "q12": {
      "options": {
        "A": "High-impact effects should remain subject to suitable review and controlled execution.",
        "B": "Visible tenant and subscription details help operators detect unintended target selection.",
        "C": "Broad Owner grants expand the damage possible from mistaken or compromised scripts.",
        "D": "Secure CLI operation combines clear targeting, restricted authority, protected credentials, reviewable changes, and useful observability."
      }
    }
  }
};
