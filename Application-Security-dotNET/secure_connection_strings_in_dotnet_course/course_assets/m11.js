window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-6b5597339c",
  "questions": {
    "q1": {
      "options": {
        "A": "Applications consume connection strings for real access rather than using them only as comments.",
        "B": "Connection strings can expose credentials, internal endpoints, database names, and provider trust settings.",
        "C": "Connection details influence production data access and the identity used for it.",
        "D": "Even passwordless connection details can reveal sensitive infrastructure and trust assumptions."
      }
    },
    "q2": {
      "options": {
        "A": "Applications commonly read configuration files, which can contain confidential access material.",
        "B": "Precedence determines chosen values and does not eliminate disclosure of stored secrets.",
        "C": "Configuration providers combine values without automatically supplying a complete secret-protection system.",
        "D": "Deployment tooling, operators, applications, and copied artifacts can also read configuration files."
      }
    },
    "q3": {
      "options": {
        "A": "Local Secret Manager is a development convenience rather than encrypted managed production storage.",
        "B": "Production secret services supply different access and lifecycle capabilities than local user secrets.",
        "C": "The facility is not intended to publish production credentials to application consumers.",
        "D": "Storing a connection string does not automatically restrict its database identity's permissions."
      }
    },
    "q4": {
      "options": {
        "A": "A responsible owner is needed to manage credential replacement and retirement.",
        "B": "Unrestricted operator access expands the number of parties able to reuse credentials.",
        "C": "Govern who can retrieve secrets and how retrieval, availability, rotation, and response are maintained.",
        "D": "Embedding secrets in artifacts distributes copies beyond the intended runtime access boundary."
      }
    },
    "q5": {
      "options": {
        "A": "Identity-based connections still need the correct database roles and resource permissions.",
        "B": "Removing distributed static passwords reduces the number of copied credentials applications must protect.",
        "C": "Workload identities can avoid handing production credentials to each developer.",
        "D": "Passwordless access still needs audit, operational monitoring, and least-privilege review."
      }
    },
    "q6": {
      "options": {
        "A": "A protected credential can still be overprivileged when used against the database.",
        "B": "Hosted production databases need least privilege just as local database instances do.",
        "C": "Restrict database authority so leaked or misused access has a smaller potential impact.",
        "D": "Ordinary runtime operations should not automatically receive administrator-level database permissions."
      }
    },
    "q7": {
      "options": {
        "A": "Design-time tooling should not universally depend on broadly distributed production credentials.",
        "B": "Migration tooling still needs database connectivity and appropriate access configuration.",
        "C": "Runtime data access often needs fewer privileges than schema migration operations.",
        "D": "Separate schema-change authority from routine access when their privilege requirements differ."
      }
    },
    "q8": {
      "options": {
        "A": "Logs and traces are routinely retained and copied across diagnostic systems.",
        "B": "Exceptions and provider diagnostics can include connection details unless carefully controlled.",
        "C": "Full configuration dumps can expose secrets and do not inherently improve security.",
        "D": "Connection-string disclosure through diagnostics spreads access material beyond approved secret consumers."
      }
    },
    "q9": {
      "options": {
        "A": "Prepare replacement and revocation so exposed or stale credentials can be retired safely.",
        "B": "Lifecycle planning reduces exposure duration but cannot guarantee no credential is ever disclosed.",
        "C": "Production credentials need rotation and response planning beyond sample-file maintenance.",
        "D": "An inventory is needed to know which workloads and resources a credential affects."
      }
    },
    "q10": {
      "options": {
        "A": "Broad permissions and complete connection logging increase authority and disclosure risk.",
        "B": "Coordinate secret storage, environment separation, identity, provider settings, permissions, and lifecycle controls.",
        "C": "Shared production passwords in ordinary configuration spread access beyond a controlled secret store.",
        "D": "Local defaults require deployment-specific review before protecting production data access."
      }
    }
  }
};
