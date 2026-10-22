window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-c394766034",
  "questions": {
    "q1": {
      "options": {
        "A": "Removing a few path tokens does not define which resources the application is authorized to access.",
        "B": "The security goal is to keep each workflow's file operations within its approved resource boundary under real filesystem resolution.",
        "C": "Relative paths can traverse outside the current directory and do not imply containment.",
        "D": "Both relative and absolute input can reach unintended objects when resolution is unconstrained."
      }
    },
    "q2": {
      "options": {
        "A": "Different workflows can need different permitted resources, and extensions do not establish containment.",
        "B": "Normalization cannot authorize an arbitrary user-selected base directory.",
        "C": "Workflow-specific roots state the intended filesystem scope against which candidate operations must be checked.",
        "D": "A service identity can still hold broader filesystem access than an individual workflow should exercise."
      }
    },
    "q3": {
      "options": {
        "A": "A narrow resource-name contract reduces how much path syntax and hierarchy a caller can control.",
        "B": "Token removal can miss alternate encodings, platform syntax, and filesystem redirection.",
        "C": "Permitting arbitrary relative directories can still expose resources beyond the intended simple-name workflow.",
        "D": "Naming, separators, reserved forms, and resolution rules can differ across supported platforms."
      }
    },
    "q4": {
      "options": {
        "A": "A denylist can miss new representations and unexpected parsing behavior.",
        "B": "Silent repair can change the requested object's meaning instead of rejecting ambiguity.",
        "C": "An explicit permitted name grammar makes the supported resource-selection behavior easier to test and enforce.",
        "D": "Filesystem acceptance does not establish the narrower naming policy of the application."
      }
    },
    "q5": {
      "options": {
        "A": "Normalization produces a representation; authorization and safe resolution must still establish the actual permitted object and scope.",
        "B": "Removing literal parent components does not cover every path interpretation or link effect.",
        "C": "A textual prefix can match a sibling name and does not prove component-level containment.",
        "D": "Existence and restrictive permissions do not authorize that object for the current workflow."
      }
    },
    "q6": {
      "options": {
        "A": "Prefix matching without directory boundaries can confuse the intended root with an unrelated sibling path.",
        "B": "Unauthorized reads can disclose protected data and require the same scope discipline as writes.",
        "C": "The resolved operation must stay within the approved root, with link and replacement behavior handled for the actual filesystem use.",
        "D": "Later platform resolution and namespace changes can invalidate assumptions about the original text."
      }
    },
    "q7": {
      "options": {
        "A": "A path can be replaced between the earlier check and the later open.",
        "B": "Ordinary rename and entry replacement can change object identity even without symbolic links.",
        "C": "File-content mode restrictions do not universally prevent a directory user from replacing its entry.",
        "D": "Changing namespace state can redirect later pathname use, so validation must address the object and operation actually acquired."
      }
    },
    "q8": {
      "options": {
        "A": "Broader storage grants increase the effects of a path mistake.",
        "B": "A dedicated account can still access resources outside the workflow's authorized scope.",
        "C": "Unintended reads can disclose secrets without modifying any file.",
        "D": "Minimal process and filesystem grants reduce the resources exposed if an application containment check fails."
      }
    },
    "q9": {
      "options": {
        "A": "External names identify requested content but must not independently dictate unrestricted filesystem destinations.",
        "B": "Preserved directory structure can carry traversal or unintended extraction scope.",
        "C": "Removing obvious traversal text does not prove safe containment under every encoding and filesystem rule.",
        "D": "Authenticity of a package does not authorize writing every path named by its entries."
      }
    },
    "q10": {
      "options": {
        "A": "Raw rejected paths can contain sensitive names or attacker-controlled log syntax and need limited handling.",
        "B": "Traceable flows and relevant negative tests check that external names remain constrained at actual file operations.",
        "C": "Links, replacement, encoding, and platform differences can expose gaps missed by successful examples.",
        "D": "Helper names do not establish that every caller uses them correctly before opening or deleting resources."
      }
    }
  }
};
