window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-0d5a2dfe66",
  "questions": {
    "q01": {
      "options": {
        "A": "CMake can change linked libraries and installed files, not just compiler presentation.",
        "B": "Configuration choices continue to determine link inputs, tests, packaging, and installation after compilation starts.",
        "C": "Build rules affect shipped binaries and dependencies, so review must extend beyond documentation and editor files.",
        "D": "Build configuration shapes the actual code, dependencies, and artifacts that reach users, making it part of the security boundary."
      }
    },
    "q02": {
      "options": {
        "A": "Hidden global influence makes affected targets harder to identify and review.",
        "B": "Directory settings can still interact with dependency-provided properties and target behavior.",
        "C": "Target-scoped properties make it clearer which artifacts inherit an option, definition, path, or dependency.",
        "D": "Transitive usage requirements can propagate settings between targets and still need review."
      }
    },
    "q03": {
      "options": {
        "A": "Reviewed presets make expected build choices explicit and repeatable across developer and CI environments.",
        "B": "Presets organize configuration but cannot erase differences in compiler, SDK, or platform behavior.",
        "C": "Safe defaults should guide supported combinations rather than silently permitting unreviewed ones.",
        "D": "Automation can supply cache overrides, so their validity and effect still need checking."
      }
    },
    "q04": {
      "options": {
        "A": "Hardening support and semantics differ between compilers, linkers, platforms, and build profiles.",
        "B": "Intentional scoping and verification establish which targets receive protections and whether final artifacts contain them.",
        "C": "Relying on individual requests can leave normal or CI builds without expected protections.",
        "D": "A successful build does not prove the intended protection was enabled in the resulting binary."
      }
    },
    "q05": {
      "options": {
        "A": "Origin, exact selection, integrity expectations, and policy records help establish what dependency code enters the build.",
        "B": "The same package name can resolve to different versions with different behavior and risk.",
        "C": "A trusted network path does not establish that downloaded content matches the approved component.",
        "D": "Compatible APIs do not establish that a new source has acceptable provenance or integrity."
      }
    },
    "q06": {
      "options": {
        "A": "Environment variables and persisted cache entries can change CMake's configuration choices.",
        "B": "Compiler selection changes code generation and artifact properties, not only diagnostics.",
        "C": "A reused cache can retain settings from a different toolchain or configuration and change the build result.",
        "D": "Toolchain, environment, and cache inputs can redirect compilers, SDKs, dependencies, and features, so they affect build trust."
      }
    },
    "q07": {
      "options": {
        "A": "Declaring an output filename does not establish the provenance or safety of the tool and inputs producing it.",
        "B": "Explicit provenance and dependencies let reviewers reproduce generated output and identify the inputs that can influence it.",
        "C": "Undeclared local inputs make behavior difficult to reproduce and can hide environment-dependent build influence.",
        "D": "A trusted generator can still produce unsafe or unintended output from unconstrained inputs."
      }
    },
    "q08": {
      "options": {
        "A": "Install destinations and search paths can affect which libraries execute on users' systems.",
        "B": "RPATH can remain in deployed binaries and influence runtime library selection.",
        "C": "The installed files and runtime search rules determine what is shipped and which library implementations are loaded.",
        "D": "Successful targets do not automatically define a safe package; install rules and final contents need inspection."
      }
    },
    "q09": {
      "options": {
        "A": "Unreviewed developer cache values can conceal configuration drift and undermine a clean CI baseline.",
        "B": "Different supported profiles can select different flags, dependencies, or features and need appropriate verification.",
        "C": "Compilation success alone does not establish artifact contents, hardening, or runtime search behavior.",
        "D": "CI can check supported configurations and their resulting evidence, catching dependency and build-policy drift before release."
      }
    },
    "q10": {
      "options": {
        "A": "Build-file changes can alter shipped behavior even when application source is unchanged.",
        "B": "Build rules decide what reaches compilation, testing, linking, and packaging, so they can change security guarantees.",
        "C": "CMake also defines tests, installation, and packaging behavior beyond compilation.",
        "D": "Security-sensitive build changes can compile successfully; review should not wait for a compiler failure."
      }
    }
  }
};
