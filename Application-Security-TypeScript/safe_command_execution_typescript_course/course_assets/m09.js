window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-d7972921ee",
  "questions": {
    "q1": {
      "options": {
        "A": "Node can launch string commands; the risk is that a shell parses externally influenced text as program syntax.",
        "B": "Command-string interpolation lets request data alter shell structure rather than remain a constrained operand.",
        "C": "String-based execution can be asynchronous, so synchronous behavior is not the defining injection risk.",
        "D": "TypeScript does not automatically strip quotes or make an interpolated shell command safe."
      }
    },
    "q2": {
      "options": {
        "A": "Argument arrays do not authorize every option understood by the selected target utility.",
        "B": "A fixed executable can still contain vulnerabilities or be misused through unsafe operands and configuration.",
        "C": "Child processes normally retain relevant operating-system authority unless the launch environment explicitly restricts it.",
        "D": "Avoiding a shell preserves explicit executable and argument boundaries instead of interpreting one constructed shell program."
      }
    },
    "q3": {
      "options": {
        "A": "Enabling a shell introduces shell-language interpretation and requires review of the full command and every external influence.",
        "B": "A shell interprets its own grammar rather than validating each value against the target program's allowed operations.",
        "C": "shell:true does not automatically choose an unprivileged identity or limit child filesystem access.",
        "D": "Windows and POSIX shell syntax differ, so enabling a shell does not make quoting rules interchangeable."
      }
    },
    "q4": {
      "options": {
        "A": "Direct launch APIs ordinarily pass separate arguments without automatically turning them into a shell program.",
        "B": "Operating systems can pass externally influenced arguments, making application and utility-specific restrictions necessary.",
        "C": "Shell-free arguments can still select dangerous utility flags, configuration sources, destinations, plugins, or execution modes.",
        "D": "Runtime arrays preserve order; their existence does not establish that their contents are approved operands."
      }
    },
    "q5": {
      "options": {
        "A": "Adding shell interpretation introduces another parser instead of establishing the utility's intended operand semantics.",
        "B": "Use the utility's supported operand convention or a controlled path that cannot be mistaken for an option.",
        "C": "Separate argument boundaries do not prevent the selected utility from interpreting a leading hyphen as an option.",
        "D": "Space escaping does not address the utility's option grammar and may be inappropriate for direct argument APIs."
      }
    },
    "q6": {
      "options": {
        "A": "An explicit operation-to-executable mapping limits the client to approved tools without granting arbitrary executable selection.",
        "B": "A familiar substring in a filename does not establish that the program is trusted or implements the intended operation.",
        "C": "A client-controlled PATH can redirect executable discovery to an attacker-selected program.",
        "D": "File extensions do not establish a program's identity, provenance, allowed behavior, or suitability for execution."
      }
    },
    "q7": {
      "options": {
        "A": "Environment and cwd can affect configuration, credentials, plugin loading, path interpretation, and execution before output is produced.",
        "B": "Direct execution commonly inherits context unless the caller explicitly supplies a constrained environment and working directory.",
        "C": "Absolute executable paths address discovery but do not neutralize environment or working-directory effects on the tool.",
        "D": "Child behavior can depend on inherited credentials, search paths, relative files, profiles, configuration, and plugins."
      }
    },
    "q8": {
      "options": {
        "A": "Resource limits do not establish that an argument or requested target-program action is authorized.",
        "B": "Limits bound resource use but do not prove that the external utility's result is correct.",
        "C": "Execution deadlines, concurrency bounds, and output caps reduce denial-of-service risk from stalled or excessive work.",
        "D": "Input size and workload validation remain necessary even when execution also has operational limits."
      }
    },
    "q9": {
      "options": {
        "A": "Restricted authority limits the resources a compromised or misused child can reach beyond its intended task.",
        "B": "Least privilege does not change how the tool parses its arguments or remove option-injection risks.",
        "C": "Child and descendant termination needs explicit lifecycle handling rather than being guaranteed by reduced privilege.",
        "D": "A low-privilege tool can still perform unauthorized actions within its grants, so option review remains necessary."
      }
    },
    "q10": {
      "options": {
        "A": "Metacharacter searches miss shell-free option abuse, executable selection, environment influence, privileges, and resource exhaustion.",
        "B": "Trace all launch paths through wrappers to their effective program, inputs, context, authority, and resource controls.",
        "C": "Wrapper names are labels, not evidence that their implementation preserves safe execution boundaries.",
        "D": "Shell-free launches still need review of target options, path provenance, child authority, output, and lifecycle behavior."
      }
    }
  }
};
