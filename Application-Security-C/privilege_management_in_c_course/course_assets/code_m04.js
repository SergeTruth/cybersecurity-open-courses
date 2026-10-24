window.COURSE_CODE_MODULE = {
  "title": "Privileged Startup and Initialization",
  "codeIntro": "Privileged startup should pass one explicit gate covering trusted configuration, inherited environment, working-directory independence, expected handles, and identity state.",
  "codeExamples": [
    {
      "title": "Gate startup on trusted deployment assumptions",
      "language": "c",
      "blurb": "Normal initialization begins only when every inherited-state decision is explicit and the process identity matches deployment policy.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n\nstruct startup_evidence {\n    bool configuration_location_trusted;\n    bool configuration_permissions_trusted;\n    bool environment_allowlisted;\n    bool ignores_working_directory;\n    size_t expected_inherited_handles;\n    size_t actual_inherited_handles;\n    bool identity_matches_policy;\n};\n\nstatic bool startup_ready(const struct startup_evidence *evidence)\n{\n    if (evidence == NULL) {\n        return false;\n    }\n\n    /* IMPORTANT FIX: authority is unused until every startup invariant holds. */\n    return evidence->configuration_location_trusted &&\n           evidence->configuration_permissions_trusted &&\n           evidence->environment_allowlisted &&\n           evidence->ignores_working_directory &&\n           evidence->expected_inherited_handles ==\n               evidence->actual_inherited_handles &&\n           evidence->identity_matches_policy;\n}\n\nint main(void)\n{\n    struct startup_evidence evidence = {\n        true, true, true, true, 1, 1, true\n    };\n\n    assert(startup_ready(&evidence));\n\n    /* TEST: unsafe configuration and unexpected handles fail startup. */\n    evidence.configuration_permissions_trusted = false;\n    assert(!startup_ready(&evidence));\n    evidence.configuration_permissions_trusted = true;\n    evidence.actual_inherited_handles = 2;\n    assert(!startup_ready(&evidence));\n    evidence.actual_inherited_handles = 1;\n    evidence.environment_allowlisted = false;\n    assert(!startup_ready(&evidence));\n    return 0;\n}\n"
    }
  ]
};
