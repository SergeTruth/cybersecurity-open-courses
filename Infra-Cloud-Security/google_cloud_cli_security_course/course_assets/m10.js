window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-675fd7f0b9",
  "questions": {
    "q1": {
      "options": {
        "A": "CLI scripts authenticate with cloud identities whose permissions govern API actions.",
        "B": "Google Cloud CLI can change real infrastructure, access permissions, and production data.",
        "C": "Authorized CLI operations can modify production resources and affect service availability.",
        "D": "Cloud CLI commands reach remote APIs beyond local terminal settings."
      }
    },
    "q2": {
      "options": {
        "A": "An accidentally active project may direct operations to an unintended environment.",
        "B": "Target validation should constrain changes rather than automatically affect every project.",
        "C": "Explicit project and location checks reduce changes against unintended targets.",
        "D": "Scripts need to know their target before performing consequential operations."
      }
    },
    "q3": {
      "options": {
        "A": "Active configurations can retain an unintended account, project, region, or zone.",
        "B": "Configuration selection does not verify whether assigned permissions remain appropriate.",
        "C": "An active configuration can use an unnecessarily powerful cloud identity.",
        "D": "Selected configuration does not ensure output fields are interpreted correctly."
      }
    },
    "q4": {
      "options": {
        "A": "Unused powerful service accounts create unnecessary access paths and ownership problems.",
        "B": "Shared Owner access exceeds the permissions most automation tasks require.",
        "C": "Reporting jobs generally do not need authority to deploy or modify resources.",
        "D": "Job specific identities and roles restrict automation to its intended environment."
      }
    },
    "q5": {
      "options": {
        "A": "Temporary identity mechanisms still require scripts to validate their project targets.",
        "B": "These mechanisms can reduce reliance on persistent service account key files.",
        "C": "Identity mechanisms authenticate access but do not approve production changes.",
        "D": "Tokens and identity credentials remain sensitive and should not be logged."
      }
    },
    "q6": {
      "options": {
        "A": "Debug traces may be retained or accessible outside their intended audience.",
        "B": "Tokens can remain usable after a command until expiry or revocation.",
        "C": "Copied or retained logs can expose credentials to additional people and systems.",
        "D": "Storing a key in a log does not make it safe."
      }
    },
    "q7": {
      "options": {
        "A": "Unvalidated command selection can let untrusted input change the operation performed.",
        "B": "Reparsing large command strings creates avoidable quoting and interpretation hazards.",
        "C": "Fixed commands, quoted arguments, validation, arrays, and failure checks constrain execution.",
        "D": "Ignoring failures can cause later actions to rely on invalid assumptions."
      }
    },
    "q8": {
      "options": {
        "A": "Structured JSON still needs validation of expected fields and values.",
        "B": "JSON parsing processes output but does not restrict API authorization.",
        "C": "JSON responses can include sensitive resource details or operational data.",
        "D": "Automation must validate decision fields before using them in subsequent actions."
      }
    },
    "q9": {
      "options": {
        "A": "These operations can rapidly affect access, confidentiality, availability, or recoverability.",
        "B": "High impact changes need suitable review and protection from unintended execution.",
        "C": "Many sensitive cloud API actions can appear in configured audit records.",
        "D": "Running a command from Bash does not reduce its cloud impact."
      }
    },
    "q10": {
      "options": {
        "A": "Exposing production credentials to every job increases unauthorized access opportunities.",
        "B": "Less trusted triggers may execute unreviewed changes and must be isolated.",
        "C": "A low trust trigger does not establish production readiness or approval.",
        "D": "Pipeline jobs can call Google Cloud APIs using their available credentials."
      }
    },
    "q11": {
      "options": {
        "A": "Safe identity and target context helps operators understand actions and results.",
        "B": "Non sensitive failure details support troubleshooting without disclosing protected data.",
        "C": "Logs should exclude tokens, keys, secrets, private data, and unnecessary sensitive responses.",
        "D": "Operational status is useful when it avoids credentials and protected information."
      }
    },
    "q12": {
      "options": {
        "A": "High impact actions need review consistent with their operational risk.",
        "B": "Operators need clear target visibility to avoid unintended project changes.",
        "C": "Broad Owner access gives most scripts unnecessary authority and compromise impact.",
        "D": "Secure automation combines explicit targets, limited access, protection, review, and visibility."
      }
    }
  }
};
