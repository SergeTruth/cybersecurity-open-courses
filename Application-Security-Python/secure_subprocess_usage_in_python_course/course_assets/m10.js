window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-7267ece85d",
  "questions": {
    "q01": {
      "options": {
        "A": "Subprocess launches programs and manages their streams and lifecycle.",
        "B": "Subprocess need not invoke a shell or parse shell command text.",
        "C": "Existing Python APIs may avoid unnecessary external program execution.",
        "D": "Full environment inheritance is optional and may expose unnecessary secrets."
      }
    },
    "q02": {
      "options": {
        "A": "External programs do not inherit Python's validation guarantees after execution.",
        "B": "Process creation crosses filesystem, operating system, environment, and privilege boundaries.",
        "C": "Direct children still cross execution boundaries without shell interpretation.",
        "D": "Programs can discover accessible files and inherited secrets without full paths."
      }
    },
    "q03": {
      "options": {
        "A": "Quoting remains context dependent and retains unnecessary shell parsing risks.",
        "B": "Callers should not freely select arbitrary executables for execution.",
        "C": "Fix the executable and separate arguments while avoiding shell parsing.",
        "D": "A list with shell enabled does not universally disable shell interpretation."
      }
    },
    "q04": {
      "options": {
        "A": "Shell parsing does not validate the target program's intended options.",
        "B": "POSIX shells also interpret metacharacters and command control syntax.",
        "C": "Quoting rules vary across platforms and nested interpretation contexts.",
        "D": "Shells can interpret expansions, redirections, and chaining beyond intended data."
      }
    },
    "q05": {
      "options": {
        "A": "Stripping characters does not establish the approved command operation.",
        "B": "Argument arrays do not prevent a program interpreting malicious options.",
        "C": "Arbitrary flags can enable unintended behavior in otherwise fixed executables.",
        "D": "Map supported choices into reviewed fixed executable and argument structures."
      }
    },
    "q06": {
      "options": {
        "A": "Allowlisting does not prove executables bug free or resource bounded.",
        "B": "Approved executables still need controlled input files and environments.",
        "C": "Allowlists define the limited supported program operations and options.",
        "D": "Metacharacter denylists cannot define every program's safe operation set."
      }
    },
    "q07": {
      "options": {
        "A": "Executable lookup may include externally influenced or writable PATH locations.",
        "B": "Ambiguous lookup can select a different program than intended.",
        "C": "Absolute paths still require review of links and write permissions.",
        "D": "Later environment construction does not retroactively secure earlier executable resolution."
      }
    },
    "q08": {
      "options": {
        "A": "Changing working directory does not sandbox absolute access or inherited descriptors.",
        "B": "Prior resolution alone does not eliminate filesystem substitution races.",
        "C": "Controlled working directories reduce ambiguity in relative file resolution.",
        "D": "Working directory controls complement file validation and least privilege."
      }
    },
    "q09": {
      "options": {
        "A": "Secret naming patterns do not identify every dangerous inherited variable.",
        "B": "Children may inherit unnecessary secrets and behavior changing configuration.",
        "C": "Caller influenced PATH and proxy settings can change child behavior.",
        "D": "Structured arguments do not remove risks from inherited process environments."
      }
    },
    "q10": {
      "options": {
        "A": "Direct execution does not universally hide arguments from operating system inspection.",
        "B": "Base64 encoding remains reversible when arguments enter diagnostic records.",
        "C": "Input channels need context appropriate protection rather than blanket argv assumptions.",
        "D": "Arguments may expose credentials through process listings and diagnostic tooling."
      }
    },
    "q11": {
      "options": {
        "A": "Timeout handling does not universally reap or terminate every descendant.",
        "B": "Silent processes still consume execution slots, memory, and other resources.",
        "C": "Execution deadlines help prevent indefinite child runtime and resource retention.",
        "D": "Termination requests require appropriate waiting and confirmation of lifecycle completion."
      }
    },
    "q12": {
      "options": {
        "A": "Public errors should omit raw commands, secrets, and sensitive child output.",
        "B": "Child error streams may reveal secrets and internal implementation details.",
        "C": "Full argument lists can disclose secrets even with environment redaction.",
        "D": "Recognizable output does not justify ignoring failed exit status automatically."
      }
    },
    "q13": {
      "options": {
        "A": "The parent account may grant more privileges than a child needs.",
        "B": "Shell avoidance does not constrain operating system identities or descriptors.",
        "C": "Working directory changes do not limit CPU, network, or inherited privileges.",
        "D": "Restrict child permissions and resources to the approved task requirements."
      }
    },
    "q14": {
      "options": {
        "A": "Bound output volume and handle sensitive child data before exposing it.",
        "B": "Unlimited buffering can exhaust memory before later retention decisions.",
        "C": "Complete error streams can disclose secrets and unnecessary internal details.",
        "D": "Fixed executables can still return malformed or unexpected output data."
      }
    },
    "q15": {
      "options": {
        "A": "Exercise rejected inputs and failure paths alongside permitted process operations.",
        "B": "Application code must verify lifecycle controls and cleanup assumptions too.",
        "C": "Mocks cannot alone prove real process group and resource behavior.",
        "D": "Test actual argument and state boundaries rather than only rendered commands."
      }
    },
    "q16": {
      "options": {
        "A": "Structured arguments leave executable and inherited state controls necessary.",
        "B": "Secure subprocess use combines fixed structure, state controls, and bounded lifecycle.",
        "C": "Quoting and denylists cannot replace provenance, privilege, or lifecycle controls.",
        "D": "Fixed executables still need controlled parent state and resource limits."
      }
    }
  }
};
