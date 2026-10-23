window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-0460201a9c",
  "questions": {
    "q1": {
      "options": {
        "A": "A public documentation link normally conveys no privileged authentication capability.",
        "B": "The service's TLS private key can authenticate it and requires protection.",
        "C": "A non sensitive flag name does not reveal a privileged credential.",
        "D": "Public region identifiers locate services rather than authorize access to them."
      }
    },
    "q2": {
      "options": {
        "A": "Go can compile string literals, including sensitive values embedded in source.",
        "B": "Private repositories can have backups and copied histories retaining committed secrets.",
        "C": "Hardcoding does not prevent environment variables; it creates additional exposed copies.",
        "D": "History, clones, build artifacts, and logs can retain committed credentials."
      }
    },
    "q3": {
      "options": {
        "A": "LookupEnv returns a presence flag distinguishing absence from an empty value.",
        "B": "Reading environment values does not rotate credentials at their provider.",
        "C": "LookupEnv retrieves text and does not encrypt the environment's contents.",
        "D": "Process inspection risks remain despite distinguishing missing and empty settings."
      }
    },
    "q4": {
      "options": {
        "A": "Printing a credential can spread it into retained operational logs.",
        "B": "A default password can permit unsafe startup with unintended shared credentials.",
        "C": "Identify the missing configuration name without disclosing its sensitive value.",
        "D": "Missing credentials should not cause production authentication to be disabled."
      }
    },
    "q5": {
      "options": {
        "A": "Full connection strings can disclose database passwords and sensitive endpoint details.",
        "B": "An alias and bounded error category support troubleshooting without exposing credentials.",
        "C": "Dumping the environment may disclose several unrelated credentials and tokens.",
        "D": "Panic output containing complete configuration can preserve sensitive values in diagnostics."
      }
    },
    "q6": {
      "options": {
        "A": "A provider interface isolates SDK dependencies and enables fake provider tests.",
        "B": "Managed secret responses can contain sensitive values that should not be printed.",
        "C": "Secret retrieval still needs appropriate cancellation and bounded waiting behavior.",
        "D": "Provider interfaces do not prevent credential expiry, revocation, or rotation."
      }
    },
    "q7": {
      "options": {
        "A": "Global exposure gives unrelated packages access beyond their actual requirements.",
        "B": "Passing full configuration unnecessarily exposes credentials to unrelated application components.",
        "C": "Every service should not inherit credentials for tasks it never performs.",
        "D": "Restrict credential delivery to components whose functions actually require it."
      }
    },
    "q8": {
      "options": {
        "A": "Cached credentials remain secrets and do not become public identifiers.",
        "B": "Caching can support rotation when refresh and invalidation are designed appropriately.",
        "C": "A cache lowers retrieval latency but can retain outdated or revoked credentials.",
        "D": "Audit records remain useful for retrieval, refresh, and access decisions."
      }
    },
    "q9": {
      "options": {
        "A": "Fake providers and nonworking values avoid exposing real production credentials during tests.",
        "B": "Copying production tokens into tests creates additional usable credential exposure.",
        "C": "Real customer credentials are unnecessary for ordinary isolated unit tests.",
        "D": "Golden fixtures can be retained and shared, so unredacted secrets can spread."
      }
    },
    "q10": {
      "options": {
        "A": "Deleting a line leaves older commits and copied credentials potentially usable.",
        "B": "Revoke or rotate the exposed value and investigate retained copies and misuse.",
        "C": "Printing a live secret creates further exposure instead of containing it.",
        "D": "Moving branches does not revoke the credential or remove existing copies."
      }
    }
  }
};
