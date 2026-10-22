window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-87f85010cd",
  "questions": {
    "q01": {
      "options": {
        "A": "Language safeguards complement application validation, permissions, configuration, dependency, and operational controls.",
        "B": "Go applications commonly receive external requests, files, configuration, and service data.",
        "C": "Static types cannot prove every runtime value satisfies application security rules.",
        "D": "Third-party code still brings provenance, maintenance, and vulnerability obligations."
      }
    },
    "q02": {
      "options": {
        "A": "Validate external representation and meaning before converting it into trusted internal state.",
        "B": "A representable typed value can still violate domain or authorization requirements.",
        "C": "Decoding does not establish acceptable resource usage or valid business meaning.",
        "D": "A familiar client can be outdated, modified, or send unexpected values."
      }
    },
    "q03": {
      "options": {
        "A": "Check the request contract and authority before producing controlled data or state changes.",
        "B": "Large mixed handlers can hide boundaries and make sensitive behavior harder to review.",
        "C": "Public stack traces can disclose internal paths, dependencies, and confidential state.",
        "D": "Cancellation and deadlines help stop work after its request is no longer useful."
      }
    },
    "q04": {
      "options": {
        "A": "Enforce sensitive permissions at the trusted server boundary independently of client display behavior.",
        "B": "Clients can bypass or alter their own interface and request checks.",
        "C": "A route name identifies a capability without proving permission to use it.",
        "D": "A verified identity still needs action and resource-specific access decisions."
      }
    },
    "q05": {
      "options": {
        "A": "Use structured database APIs and validate values before sensitive storage or downstream processing.",
        "B": "Concatenating untrusted values into SQL can change its intended executable structure.",
        "C": "User-controlled filenames should not directly choose arbitrary server storage paths.",
        "D": "Deserialized types still need semantic, range, and resource-policy checks."
      }
    },
    "q06": {
      "options": {
        "A": "Maintain valid state on failure and expose only safe useful error information.",
        "B": "Raw internal errors may disclose credentials, database details, or implementation assumptions.",
        "C": "Ignored partial failures can leave state inconsistent and mislead subsequent operations.",
        "D": "Secret logging creates reusable access material in diagnostic infrastructure."
      }
    },
    "q07": {
      "options": {
        "A": "Operational records can become secondary exposure paths for credentials and private data.",
        "B": "Logs are commonly stored, indexed, copied, and retained across operational systems.",
        "C": "Requests and exceptions can contain confidential values unless recording is controlled.",
        "D": "Observability does not enforce which caller may access a protected resource."
      }
    },
    "q08": {
      "options": {
        "A": "Owned work needs deadlines, cancellation, cleanup, and a coordinated completion or shutdown protocol.",
        "B": "Untracked goroutines may outlive their request and retain resources indefinitely.",
        "C": "Shared mutable state still needs appropriate synchronization and invariant protection.",
        "D": "Unbounded operation duration can exhaust connections, memory, and downstream capacity."
      }
    },
    "q09": {
      "options": {
        "A": "Maintain dependency ownership, repeatable builds, verified changes, and a practical security-update process.",
        "B": "Unreviewed packages can introduce unnecessary or untrusted executable behavior.",
        "C": "Transitive packages also contribute code and maintenance obligations to the shipped application.",
        "D": "Build settings and CI credentials determine trusted executable output and release authority."
      }
    },
    "q10": {
      "options": {
        "A": "Coordinate trusted input, permissions, bounded work, secret handling, dependencies, and behavior tests.",
        "B": "Compilation does not establish correct runtime policy, limits, or failure handling.",
        "C": "Client-controlled code cannot enforce the server's authoritative security decisions.",
        "D": "Documented security assumptions help reviewers assess changes and ongoing maintenance."
      }
    }
  }
};
