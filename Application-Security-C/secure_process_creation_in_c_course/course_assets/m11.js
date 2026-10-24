window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-3f1a142765",
  "questions": {
    "q01": {
      "options": {
        "A": "Children can inherit existing access and influence the parent through outputs, resource consumption, and lifecycle outcomes.",
        "B": "Launch policy determines which privileges, environment settings, and open resources cross into the child process.",
        "C": "The operating system does not know the application's permitted meaning for every argument or requested operation.",
        "D": "Related processes can execute with different identities and trust assumptions even when created from a shared initial image."
      }
    },
    "q02": {
      "options": {
        "A": "Structured direct execution preserves separate arguments instead of requiring them to be reinterpreted from one shell command string.",
        "B": "Removing the shell does not establish that the selected executable path and its ownership are trustworthy.",
        "C": "Environment construction and descriptor inheritance still require explicit policy with direct execution.",
        "D": "Avoiding an unnecessary shell removes one interpreter while retaining separate argument boundaries for the selected program."
      }
    },
    "q03": {
      "options": {
        "A": "Search order can select an attacker-controlled or unintended program when directories or path settings are unsafe.",
        "B": "Working-directory and path-resolution rules can affect program selection depending on the execution API and supplied path.",
        "C": "An absolute pathname can still refer to replaceable content, so directory ownership and executable trust remain relevant.",
        "D": "Explicit selection reduces ambiguity, while trusted locations and appropriate platform checks address which executable is actually launched."
      }
    },
    "q04": {
      "options": {
        "A": "Combining values into one string can introduce quoting ambiguity and unintended interpreter behavior.",
        "B": "Administrator-provided configuration can still be malformed, unsafe, or inappropriate for the selected child's argument contract.",
        "C": "Separate validated arguments preserve intended boundaries and let policy constrain each value before the child interprets it.",
        "D": "Executable selection and argument validity are distinct policy decisions; allowing one to redefine the other can bypass restrictions."
      }
    },
    "q05": {
      "options": {
        "A": "Inherited variables can change loading, parsing, configuration, and filesystem behavior, making the environment part of the launch contract.",
        "B": "Many launch paths inherit the parent's environment unless the application supplies or constrains a replacement.",
        "C": "Environment settings can affect executable behavior far beyond presentation and display text.",
        "D": "A safe minimal environment is not guaranteed by every creation API and must be established deliberately."
      }
    },
    "q06": {
      "options": {
        "A": "Inherited descriptors can retain their existing access rights rather than becoming universally read-only.",
        "B": "Descriptor inheritance can transfer an already-open resource without a new pathname lookup.",
        "C": "Open resources can carry authority the child was never intended to receive, including access unavailable through ordinary pathname permissions.",
        "D": "Inheritance does not authenticate the child or establish that every subsequent use of the resource is permitted."
      }
    },
    "q07": {
      "options": {
        "A": "Giving all parent permissions expands the authority exposed by a child defect or compromise.",
        "B": "Task-specific identities, grants, inherited resources, and limits reduce the effects a child can cause beyond its intended operation.",
        "C": "Reduced authority does not guarantee timely exit, successful completion, or correct resource cleanup.",
        "D": "Unnecessary descriptors expose extra resources and should not be passed merely to avoid deciding which ones are needed."
      }
    },
    "q08": {
      "options": {
        "A": "Creation success starts a lifecycle that still requires status handling, timeout policy, resource cleanup, and appropriate child reaping.",
        "B": "A successful launch does not establish that the child executed the task successfully or even reached its intended operation.",
        "C": "Exit status can identify task failure and inform whether the parent may safely continue.",
        "D": "The parent must implement the platform's applicable supervision and recovery policy rather than assume all lifecycle work is automatic."
      }
    },
    "q09": {
      "options": {
        "A": "A deadline constrains duration but does not validate the child's outputs or authorize their use.",
        "B": "A monitored timeout bounds how long a stalled child can hold up the workflow before the parent follows its recovery policy.",
        "C": "Expiry still needs termination or cancellation policy, status collection, cleanup, and an appropriate error outcome.",
        "D": "A timeout defines a failure boundary; it cannot guarantee completion under every load and failure condition."
      }
    },
    "q10": {
      "options": {
        "A": "Compilation does not establish valid runtime selection, arguments, inheritance, authority, or recovery behavior.",
        "B": "Arguments and inherited state can substantially change what an otherwise approved executable does.",
        "C": "Reviewing the complete launch and lifecycle contract exposes unintended executable choices, inherited authority, and unsafe failure paths.",
        "D": "Failure and cleanup behavior should be designed and reviewed as part of the launch boundary, not deferred entirely."
      }
    },
    "q11": {
      "options": {
        "A": "A finite test suite cannot make arbitrary future shell strings safe across all inputs and environments.",
        "B": "Static analysis cannot generally establish the meaning of every runtime configuration and argument value.",
        "C": "Sanitizers check selected runtime defects rather than prove identical deployment context or correct launch policy.",
        "D": "Tools supply evidence about implementation behavior, while an explicit contract defines the program, inputs, authority, and lifecycle being checked."
      }
    },
    "q12": {
      "options": {
        "A": "Intentional launch policy covers both what the child executes and the authority, context, and failure behavior it receives.",
        "B": "A shell interpreter adds parsing and selection behavior that still needs careful policy rather than providing safe defaults automatically.",
        "C": "Replacing the executable image does not inherently remove every inherited descriptor, environment value, or privilege.",
        "D": "The creation call begins supervision; exit handling and cleanup are needed to complete the operation safely."
      }
    }
  }
};
