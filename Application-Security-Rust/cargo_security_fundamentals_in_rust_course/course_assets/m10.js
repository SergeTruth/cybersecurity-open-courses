window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-908e9b9fe8",
  "questions": {
    "q1": {
      "options": {
        "A": "Cargo resolves and builds dependencies but does not guarantee their suitability for a project's production requirements.",
        "B": "Dependencies, features, build execution, packaging, and release authority all influence the trustworthiness of shipped software.",
        "C": "Private and unpublished projects also build dependencies and rely on supply-chain inputs.",
        "D": "Safe Rust projects still face malicious dependencies, compromised build environments, and publishing credential exposure."
      }
    },
    "q2": {
      "options": {
        "A": "These files describe package configuration and dependency resolution rather than storing compiled artifacts or source code.",
        "B": "Neither file is an advisory database or a credential granting permission to publish packages.",
        "C": "Cargo.toml declares requirements and configuration, while Cargo.lock records the dependency versions actually resolved.",
        "D": "Both files affect build workflows beyond tests and publication, including ordinary development and release builds."
      }
    },
    "q3": {
      "options": {
        "A": "Indirect dependencies contribute trusted code and behavior even when selected through another dependency.",
        "B": "Transitive crates may participate in application behavior and build execution beyond documentation generation.",
        "C": "Transitive dependencies can be compiled into outputs or run as part of the build process.",
        "D": "Compiler safety checks do not establish compliance with project licensing, maintenance, or dependency policies."
      }
    },
    "q4": {
      "options": {
        "A": "Crates differ in maintenance practices, ownership, release controls, update cadence, and dependency choices.",
        "B": "Adding a crate changes dependencies but does not inherently disable review of lockfile changes.",
        "C": "Crate code and build behavior can influence generated files and the software shipped to production.",
        "D": "Selecting a dependency extends trust to its implementation, maintainers, releases, features, and dependency graph."
      }
    },
    "q5": {
      "options": {
        "A": "Freezing forever leaves known issues unresolved and prevents necessary compatibility or security updates.",
        "B": "Updates can reduce known risk while also changing behavior, dependencies, and enabled feature interactions.",
        "C": "Updated dependencies still require tests and review of their effects on the application.",
        "D": "Dependency updates may change executable code, build behavior, compatibility, and transitive dependencies."
      }
    },
    "q6": {
      "options": {
        "A": "Features influence dependency resolution and compilation in workspaces and must be reviewed in that context.",
        "B": "Feature review and vulnerability advisory review address different dependency risks and complement each other.",
        "C": "Enabled features can expand the compiled code, dependency graph, and externally exposed behavior.",
        "D": "Cargo feature flags control conditional functionality rather than merely changing terminal output appearance."
      }
    },
    "q7": {
      "options": {
        "A": "Build scripts and procedural macros are especially relevant when trusted dependencies introduce build-time execution.",
        "B": "CI builds can execute build scripts and procedural macros with the build environment's available authority.",
        "C": "Build-time code can inspect its environment and affect generated code, linked libraries, and release outputs.",
        "D": "Their outputs can directly influence compilation and the behavior of the resulting artifact."
      }
    },
    "q8": {
      "options": {
        "A": "Registry tokens can convey package access or publication authority and must be handled as credentials.",
        "B": "Committing tokens distributes usable credentials through repository history, clones, and other retained copies.",
        "C": "Token use concerns registry authentication and authorization rather than formatting package configuration files.",
        "D": "A leaked token may enable unauthorized publishing or private-package access within its assigned permissions."
      }
    },
    "q9": {
      "options": {
        "A": "Advisory and policy checks surface known problems and enforce explicit dependency requirements or documented exceptions.",
        "B": "Running checks before release can prevent known unacceptable dependencies from entering shipped artifacts.",
        "C": "Automated checks provide evidence but do not replace contextual review of dependency changes and exceptions.",
        "D": "Known-issue checks cannot guarantee the absence of unknown vulnerabilities or future dependency problems."
      }
    },
    "q10": {
      "options": {
        "A": "Component inventories do not grant registry access or authorize publication of release artifacts.",
        "B": "Recording shipped components supports exposure analysis and faster investigation when dependency issues are discovered.",
        "C": "Inventories should include direct dependencies as well as relevant transitive components and build context.",
        "D": "An SBOM provides visibility rather than automatically preventing or repairing every dependency vulnerability."
      }
    },
    "q11": {
      "options": {
        "A": "Stable non-sensitive identifiers and safe check summaries support troubleshooting without unnecessarily exposing credentials.",
        "B": "Sanitized artifact identifiers are generally appropriate when they do not disclose sensitive deployment details.",
        "C": "Logs should minimize and redact credentials, private package information, and sensitive configuration or output.",
        "D": "Non-sensitive test summaries provide useful evidence without inherently revealing secrets or private package details."
      }
    },
    "q12": {
      "options": {
        "A": "Memory safety does not establish trusted dependencies, protected credentials, or secure build and release workflows.",
        "B": "Automatic publication without appropriate controls can distribute unreviewed, incorrect, or compromised release artifacts.",
        "C": "Dependencies should be selected and governed deliberately rather than universally prohibited regardless of project needs.",
        "D": "The goal is reviewable builds and controlled releases with visibility into dependencies and supply-chain assumptions."
      }
    }
  }
};
