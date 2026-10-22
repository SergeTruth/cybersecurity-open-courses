window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-595bb12701",
  "questions": {
    "q1": {
      "options": {
        "A": "Environment values still need validation before they select filesystem targets.",
        "B": "Comments do not enforce which paths a script may read or modify.",
        "C": "Path arguments determine the files and directories affected by script operations.",
        "D": "Paths can direct actual reads, overwrites, deletions, and data disclosure."
      }
    },
    "q2": {
      "options": {
        "A": "A warning does not make arbitrary paths fit the approved operation boundary.",
        "B": "Archive names still need validation against the intended extraction destination.",
        "C": "Approved location and permitted object type are separate checks.",
        "D": "The base establishes the allowed filesystem scope for script actions."
      }
    },
    "q3": {
      "options": {
        "A": "Internal paths can influence destructive or confidential filesystem operations.",
        "B": "Stale or externally influenced values remain risky despite their internal origin.",
        "C": "Internal values may come from older state or other components.",
        "D": "Command-line and automation boundaries also need meaningful path validation."
      }
    },
    "q4": {
      "options": {
        "A": "The working directory does not automatically document prior validation decisions.",
        "B": "Relative lookup can escape intended assumptions about the launching location.",
        "C": "Relative paths resolve according to the script's effective working directory.",
        "D": "Working directory changes where operations act rather than prohibit every write."
      }
    },
    "q5": {
      "options": {
        "A": "An extension does not establish where the filesystem resolves a path.",
        "B": "Verify resolved containment using filesystem path boundaries rather than appearance alone.",
        "C": "Path length does not prove the target lies inside approved storage.",
        "D": "Operator recollection cannot replace explicit validation of the actual target."
      }
    },
    "q6": {
      "options": {
        "A": "Symlink resolution still needs to respect the approved base boundary.",
        "B": "Command-line filesystem operations follow links according to their own semantics.",
        "C": "A link can redirect access into a different and less trusted location.",
        "D": "An apparently contained path can resolve outside the approved directory through links."
      }
    },
    "q7": {
      "options": {
        "A": "Unexpected directories, links, devices, or other object types can change operation behavior.",
        "B": "Correct type does not establish authorized location, ownership, or lifetime.",
        "C": "Commands can handle directories, regular files, and devices very differently.",
        "D": "Regular files and directories also need type checks before sensitive operations."
      }
    },
    "q8": {
      "options": {
        "A": "Untrusted input should not freely choose arbitrary output storage locations.",
        "B": "Check destination scope and existing-target policy before writing or replacing files.",
        "C": "Silent overwrite can destroy unrelated data beyond the intended operation.",
        "D": "Temporary output also needs trusted location and deliberate permissions."
      }
    },
    "q9": {
      "options": {
        "A": "Archive tools need configured safeguards rather than assumed destination validation.",
        "B": "Member paths can influence where extracted content is written.",
        "C": "Archives commonly store names and directory paths for their members.",
        "D": "Validate every member because its path can escape intended extraction storage."
      }
    },
    "q10": {
      "options": {
        "A": "Inspect the actual intended targets before broad copy, extraction, or deletion.",
        "B": "A preview does not repair an operation whose allowed scope remains unclear.",
        "C": "Dry runs should exercise target checks rather than disable them.",
        "D": "Later operations can still fail or encounter changed filesystem state."
      }
    },
    "q11": {
      "options": {
        "A": "Approved action names and validation outcomes can support safe operational diagnosis.",
        "B": "Operators can receive useful bounded guidance without confidential path details.",
        "C": "Exclude credentials and unnecessary sensitive filesystem information from routine diagnostics.",
        "D": "Clear error categories can aid recovery without exposing confidential values."
      }
    },
    "q12": {
      "options": {
        "A": "Reject escaping targets and constrain access to the approved resolved filesystem scope.",
        "B": "Longer filenames do not establish valid ownership or contained resolution.",
        "C": "File operations can be supported safely through explicit bounded contracts.",
        "D": "Automation does not justify accessing arbitrary filesystem locations without validation."
      }
    }
  }
};
