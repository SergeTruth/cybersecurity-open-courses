window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-9fb94b65ca",
  "questions": {
    "q1": {
      "options": {
        "A": "CLI automation uses cloud identities and credentials with real access permissions.",
        "B": "Scripts can exercise cloud authority over resources, identities, networks, stored data, and production operations.",
        "C": "Shell-based commands can affect production when their effective identity has the required permissions.",
        "D": "AWS CLI interacts with remote cloud services rather than only reading local files."
      }
    },
    "q2": {
      "options": {
        "A": "An accidental default can select an unintended account or environment for a change.",
        "B": "Region validation should restrict the intended target rather than broadcast changes everywhere.",
        "C": "Explicit identity and location checks reduce the chance of changing the wrong account, region, or environment.",
        "D": "Operators need to know the actual account before performing privileged actions."
      }
    },
    "q3": {
      "options": {
        "A": "Inherited profiles can select unintended accounts, roles, credentials, or deployment environments.",
        "B": "A profile is credential configuration rather than proof that its IAM permissions are appropriate.",
        "C": "Default credentials can be highly privileged and should not be assumed narrowly scoped.",
        "D": "Output still needs validation before subsequent logic relies on returned identifiers or state."
      }
    },
    "q4": {
      "options": {
        "A": "Unused elevated roles preserve unnecessary authority and should have a managed lifecycle.",
        "B": "Shared administrator credentials broaden exposure and weaken per-job accountability.",
        "C": "Inventory tasks should not receive write privileges they do not need.",
        "D": "Job-specific scoped identities limit both the intended actions and the consequences of misuse."
      }
    },
    "q5": {
      "options": {
        "A": "Short credential lifetimes do not establish that the script selected the correct target.",
        "B": "Temporary sessions limit how long copied credentials remain usable and support explicit access constraints.",
        "C": "Credentials remain bound to their granted identity and permissions rather than every cloud account.",
        "D": "Printing working session credentials creates unnecessary access opportunities through retained diagnostic systems."
      }
    },
    "q6": {
      "options": {
        "A": "Debug channels can be retained, exported, aggregated, or read by unintended people.",
        "B": "Completed commands do not necessarily expire the credentials that authorized them.",
        "C": "Logs can spread usable credentials to many readers and copies beyond the original execution environment.",
        "D": "Recording a credential does not change its effective permissions to read-only access."
      }
    },
    "q7": {
      "options": {
        "A": "Arbitrary service and operation selection gives input excessive authority over cloud actions.",
        "B": "Reparsing constructed commands can turn externally influenced data into unintended shell syntax.",
        "C": "Fixed operations, proper argument handling, validated inputs, and checked results make command effects more predictable.",
        "D": "Continuing after failed commands can create inconsistent state or conceal incomplete changes."
      }
    },
    "q8": {
      "options": {
        "A": "Well-formed JSON can still contain unexpected, missing, stale, or semantically invalid values.",
        "B": "Parsing returned fields does not restrict the permissions granted to the automation identity.",
        "C": "Structured responses can include private resource names, policies, identifiers, or other sensitive details.",
        "D": "Deliberate parsing checks the exact fields later logic will use to select resources or decide actions."
      }
    },
    "q9": {
      "options": {
        "A": "High-impact changes can alter access, expose data, interrupt services, or remove recovery paths quickly.",
        "B": "Consequential operations should follow applicable review and release controls instead of automatically bypassing them.",
        "C": "Cloud actions may be audited, so visibility should be verified rather than assumed absent.",
        "D": "Bash execution does not make a destructive or privilege-changing operation harmless."
      }
    },
    "q10": {
      "options": {
        "A": "Exposing production authority to every job increases the impact of compromised or unreviewed code.",
        "B": "Low-trust triggers can execute less-reviewed changes and should not inherit credentials authorizing privileged production work.",
        "C": "Trigger provenance and review state matter rather than a universal assumption of production suitability.",
        "D": "Pipelines can call cloud APIs and alter resources when they obtain sufficient authority."
      }
    },
    "q11": {
      "options": {
        "A": "Approved high-level identity and target metadata can support accountable execution without disclosing credential values.",
        "B": "Bounded non-sensitive error context helps diagnosis while avoiding unnecessary exposure of raw responses.",
        "C": "Credentials and sensitive resource content should be minimized or redacted before reaching retained automation logs.",
        "D": "Safe progress and result messages help operators understand outcomes without revealing secrets."
      }
    },
    "q12": {
      "options": {
        "A": "Sensitive operations need review proportional to their actual effects and operational context.",
        "B": "Clear account and region visibility helps users confirm the intended execution target.",
        "C": "Universal administrator access grants many scripts unnecessary capabilities and increases potential damage.",
        "D": "Secure automation makes targets, authority, inputs, effects, results, and recovery expectations explicit and manageable."
      }
    }
  }
};
