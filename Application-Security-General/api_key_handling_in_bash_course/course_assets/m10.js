window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-3c893b2d45",
  "questions": {
    "q1": {
      "options": {
        "A": "Credentials do not remove quoting and argument-boundary obligations in Bash.",
        "B": "Automation can disclose credentials through logs and child processes.",
        "C": "API keys can grant direct access to protected service resources.",
        "D": "Access-bearing keys are credentials rather than harmless diagnostic labels."
      }
    },
    "q2": {
      "options": {
        "A": "Embedded keys propagate into source history and copied build artifacts.",
        "B": "Hardcoding does not prevent reading other runtime environment variables.",
        "C": "Anyone obtaining a script copy may obtain its embedded credential.",
        "D": "Script execution does not automatically rotate a hardcoded service key."
      }
    },
    "q3": {
      "options": {
        "A": "Deleting current text does not erase every existing historical copy.",
        "B": "Historical repositories, backups, and diagnostics can retain the disclosed key.",
        "C": "Removing source text does not change the credential's cryptographic strength.",
        "D": "Removal helps prevent further copying while revocation addresses exposed credentials."
      }
    },
    "q4": {
      "options": {
        "A": "Approved runtime injection avoids permanently embedding credentials in script artifacts.",
        "B": "Unnecessary inheritance exposes credentials to additional subprocesses and diagnostics.",
        "C": "Pasting still risks committed copies, editor backups, and shell history.",
        "D": "A shared README distributes credentials beyond controlled runtime access."
      }
    },
    "q5": {
      "options": {
        "A": "Printing all credentials would create an additional serious disclosure path.",
        "B": "Shell history can retain confidential credential material beyond execution.",
        "C": "A default production credential grants unintended access after configuration failure.",
        "D": "Missing required credentials should stop the operation without secret disclosure."
      }
    },
    "q6": {
      "options": {
        "A": "Environment injection does not guarantee secret-safe handling by CI tooling.",
        "B": "Credentials still need appropriate permissions regardless of delivery channel.",
        "C": "Environment values can propagate to children and diagnostic capture systems.",
        "D": "Command-line programs can consume environment variables and expose their values."
      }
    },
    "q7": {
      "options": {
        "A": "Passing arguments does not automatically expire the underlying service credential.",
        "B": "Process inspection can reveal credentials embedded in command arguments.",
        "C": "API clients can accept arguments, but confidential values require safer delivery.",
        "D": "Bash does not automatically encrypt arguments supplied to external programs."
      }
    },
    "q8": {
      "options": {
        "A": "Failure headers can contain reusable credentials and need selective redaction.",
        "B": "Environment dumps can disclose credentials unrelated to the failing request.",
        "C": "Raw tokens in support logs grant access to additional readers.",
        "D": "Redaction preserves useful request context without recording reusable access credentials."
      }
    },
    "q9": {
      "options": {
        "A": "Other users may read credentials from overly permissive local files.",
        "B": "Readable secrets increase exposure rather than guarantee useful audit records.",
        "C": "Local files can contain fully reusable sensitive service credentials.",
        "D": "Restrictive permissions complement rather than replace credential rotation and revocation."
      }
    },
    "q10": {
      "options": {
        "A": "One reused production key spreads powerful access into weaker environments.",
        "B": "Environment separation does not make credential values appropriate for publication.",
        "C": "Test workloads should receive only their own required nonproduction authority.",
        "D": "Scoped credentials reduce exposure without preventing every possible API failure."
      }
    },
    "q11": {
      "options": {
        "A": "Rotation does not justify retaining reusable credentials in source history.",
        "B": "Old log copies remain sensitive even after credential replacement.",
        "C": "Exposure still requires investigation and appropriate incident-response follow-through.",
        "D": "Replacing and revoking keys limits continued use of exposed credentials."
      }
    },
    "q12": {
      "options": {
        "A": "Bash can call APIs safely with properly governed credential handling.",
        "B": "Limit authority and exposure while keeping usage observable and credentials replaceable.",
        "C": "Shared credentials weaken attribution and expand compromise across environments.",
        "D": "Command arguments can disclose keys through process inspection and diagnostics."
      }
    }
  }
};
