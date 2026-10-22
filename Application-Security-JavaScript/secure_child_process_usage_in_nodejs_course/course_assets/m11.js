window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-6969e6e806",
  "questions": {
    "q01": {
      "options": {
        "A": "A child process can inherit credentials, permissions, environment values, and other meaningful application authority.",
        "B": "Child processes operate with real system authority and can access resources or expose sensitive output.",
        "C": "Ordinary process separation does not automatically sandbox filesystem access or restrict outbound network connections.",
        "D": "Node starts requested programs without determining whether their arguments or intended actions are secure."
      }
    },
    "q02": {
      "options": {
        "A": "Wrappers still execute external programs and must handle their parsing rules, privileges, and resource lifecycle.",
        "B": "Avoiding external execution also removes security-sensitive boundaries involving shells, arguments, privileges, and cleanup.",
        "C": "Suitable libraries remove several external execution concerns, though their own inputs and behavior still need review.",
        "D": "Operating systems enforce permissions but do not validate the application-level safety of each requested action."
      }
    },
    "q03": {
      "options": {
        "A": "A shell parses command strings, allowing externally influenced characters to introduce unintended command structure.",
        "B": "Interpolated text can become syntax instead of remaining a single literal argument to the intended tool.",
        "C": "Escaping depends on the shell, platform, and parser layers; one universal escaping pass is unreliable.",
        "D": "Fixing the executable name does not prevent injected shell syntax elsewhere in the command string."
      }
    },
    "q04": {
      "options": {
        "A": "An argument array prevents shell parsing but the executable can still interpret option-like operands.",
        "B": "Separate executable and argument fields make the execution boundary clearer without requiring shell-string parsing.",
        "C": "Child tools still recognize their own options, so structured arguments do not eliminate argument injection.",
        "D": "Shell avoidance addresses parsing; deadlines, environment controls, cleanup, and tool-specific validation remain necessary."
      }
    },
    "q05": {
      "options": {
        "A": "Even with a fixed executable, attacker-controlled arguments can select dangerous options or alter tool behavior.",
        "B": "The double-dash convention works only when the selected tool explicitly supports that option terminator.",
        "C": "A trusted executable may interpret untrusted operands as options that change destinations, configuration, or authority.",
        "D": "Many programs interpret filenames beginning with option prefixes or special formats as behavioral instructions."
      }
    },
    "q06": {
      "options": {
        "A": "Children commonly inherit the parent's environment and working directory unless the caller deliberately restricts them.",
        "B": "Environment and directory choices affect program resolution, configuration, locale, accessible files, and exposed credentials.",
        "C": "Absolute executable paths address discovery but do not neutralize environment-dependent configuration or working-directory effects.",
        "D": "PATH and deployment context can differ substantially across services, containers, tests, and scheduled jobs."
      }
    },
    "q07": {
      "options": {
        "A": "Both output streams may contain sensitive data that needs bounded collection, redaction, and safe presentation.",
        "B": "Developer-oriented diagnostics can reveal secrets and internals when copied directly into user-facing responses.",
        "C": "Standard output can include echoed input, file contents, credentials, or other sensitive processing results.",
        "D": "Delaying reads can fill operating-system pipe buffers and block a child before it exits."
      }
    },
    "q08": {
      "options": {
        "A": "Cancelling a request does not automatically terminate its child processes or their descendants.",
        "B": "Output limits bound captured output but do not independently limit CPU, memory, or execution duration.",
        "C": "Promise rejection does not automatically remove temporary files, terminate children, or release other external resources.",
        "D": "Explicit lifecycle controls limit abandoned execution, resource exhaustion, and partially created resources after failures."
      }
    },
    "q09": {
      "options": {
        "A": "Reduced permissions and effective isolation constrain the resources and services reachable by a compromised child.",
        "B": "Unprivileged processes can still send malicious output or access resources permitted to their execution identity.",
        "C": "Containers and namespaces provide boundaries but do not replace validation, authorization, output handling, or lifecycle limits.",
        "D": "Network restrictions leave local files, resource consumption, output channels, and other privilege boundaries requiring protection."
      }
    },
    "q10": {
      "options": {
        "A": "Disabling the shell removes one parsing risk but leaves arguments, privileges, streams, and lifecycle controls unresolved.",
        "B": "Process behavior spans multiple failure paths that require focused tests beyond one successful unit-test scenario.",
        "C": "Restricted logs can still leak credentials or sensitive output, so telemetry requires minimization and redaction.",
        "D": "A complete review covers execution inputs, effective authority, output, resource bounds, cleanup, isolation, and safe observability."
      }
    }
  }
};
