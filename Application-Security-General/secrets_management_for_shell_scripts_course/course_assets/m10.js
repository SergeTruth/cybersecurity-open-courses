window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-88f2f57711",
  "questions": {
    "q1": {
      "options": {
        "A": "Many scripts need no administrator credential or locally stored password.",
        "B": "Local jobs and internal services also need appropriate credential governance.",
        "C": "Automated calls to protected resources need scoped confidential authentication material.",
        "D": "Scripts can use controlled runtime delivery and appropriately restricted local files."
      }
    },
    "q2": {
      "options": {
        "A": "Hardcoded strings can still run in noninteractive environments while exposing secrets.",
        "B": "Embedded values propagate into repository history, backups, and copied scripts.",
        "C": "Future readers can inspect the credential just like other script text.",
        "D": "A source literal does not expire automatically after the first execution."
      }
    },
    "q3": {
      "options": {
        "A": "Environment storage is not automatically encrypted for every consumer or diagnostic path.",
        "B": "Secret replacement can be performed regardless of whether source originally contained it.",
        "C": "Confidentiality depends on access value rather than a variable's chosen name.",
        "D": "Runtime arguments, files, environment, and diagnostics can expose values outside source."
      }
    },
    "q4": {
      "options": {
        "A": "Approved runtime retrieval avoids permanently distributing access material in script copies.",
        "B": "Extra child inheritance spreads secrets beyond the commands requiring them.",
        "C": "Last-minute pasting still risks editor history, accidental commits, and backup copies.",
        "D": "Shared documentation is not appropriate storage for reusable confidential credentials."
      }
    },
    "q5": {
      "options": {
        "A": "Printing unrelated credentials creates a broader disclosure during an ordinary configuration failure.",
        "B": "Reject missing required secret material before attempting the protected operation.",
        "C": "Shell history can retain confidential values beyond their intended operational lifetime.",
        "D": "A production fallback can grant unexpected authority after required configuration fails."
      }
    },
    "q6": {
      "options": {
        "A": "Child programs and CI tooling can still print environment-carried values.",
        "B": "CI systems can pass environment values and must protect them carefully.",
        "C": "Process and diagnostic access is not restricted only to the original author.",
        "D": "Inherited values can surface in child logs, errors, and environment captures."
      }
    },
    "q7": {
      "options": {
        "A": "Useful actions and outcomes can be logged without credential values.",
        "B": "Support bundles may be shared broadly and should exclude complete credentials.",
        "C": "Whole-environment dumps can disclose unrelated secrets and sensitive infrastructure settings.",
        "D": "Error messages should not contain tokens that callers or tools can replay."
      }
    },
    "q8": {
      "options": {
        "A": "Temporary storage does not universally guarantee encryption or cleanup after failures.",
        "B": "Automated jobs can read accessible temporary files like other filesystem data.",
        "C": "Leftover sensitive files can persist in backups and generated release material.",
        "D": "Shared writable locations can increase disclosure and file-substitution risk."
      }
    },
    "q9": {
      "options": {
        "A": "Distinct environments need separate scoped credentials rather than one broad shared identity.",
        "B": "Provide credentials only to the specific trusted stages requiring their authority.",
        "C": "Masking helps reduce accidental display but still requires careful secret handling.",
        "D": "Reusable pipeline structure does not justify exposing production credentials to every job."
      }
    },
    "q10": {
      "options": {
        "A": "Build permissions can be powerful and are not always intrinsically lower risk.",
        "B": "Runtime workloads can receive task-specific credentials or managed identities.",
        "C": "Build channels can preserve credentials in copied layers, artifacts, and caches.",
        "D": "Image builds do not guarantee removal of every sensitive input copy."
      }
    },
    "q11": {
      "options": {
        "A": "Replacing and revoking exposed access limits its continued usefulness to attackers.",
        "B": "Owners remain necessary to approve replacement and assess affected consumers.",
        "C": "Earlier logs can retain sensitive material even after the credential changes.",
        "D": "Rotation does not justify continued credential inclusion in source repositories."
      }
    },
    "q12": {
      "options": {
        "A": "Arguments can leak through process inspection and operational record capture.",
        "B": "Secret governance enables automation while restricting its access material appropriately.",
        "C": "Shared administrators combine unnecessary authority across unrelated automation tasks.",
        "D": "Keep access scoped and confidential with accountable review and safe replacement."
      }
    }
  }
};
