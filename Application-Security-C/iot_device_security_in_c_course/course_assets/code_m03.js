window.COURSE_CODE_MODULE = {
  "title": "Secure Firmware, Boot, and Startup State",
  "codeIntro": "Startup enters normal operation only when independently produced authorization, metadata, configuration, and rollback-policy evidence all agree.",
  "codeExamples": [
    {
      "title": "Choose a controlled startup path",
      "language": "c",
      "blurb": "The application does not implement boot cryptography; it consumes validated startup evidence and selects normal operation or recovery without trusting incomplete state.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdint.h>\n\nenum startup_path {\n    START_NORMAL,\n    START_RECOVERY\n};\n\nstruct startup_evidence {\n    bool firmware_authorized;\n    bool metadata_complete;\n    bool configuration_valid;\n    uint32_t image_version;\n    uint32_t minimum_version;\n};\n\nstatic enum startup_path choose_startup_path(\n    const struct startup_evidence *evidence)\n{\n    if (evidence == NULL) {\n        return START_RECOVERY;\n    }\n\n    /* IMPORTANT FIX: normal operation requires every startup invariant. */\n    if (!evidence->firmware_authorized ||\n        !evidence->metadata_complete ||\n        !evidence->configuration_valid ||\n        evidence->image_version < evidence->minimum_version) {\n        return START_RECOVERY;\n    }\n    return START_NORMAL;\n}\n\nint main(void)\n{\n    struct startup_evidence state = {true, true, true, 12u, 10u};\n\n    assert(choose_startup_path(&state) == START_NORMAL);\n\n    /* TEST: each failed trust decision selects controlled recovery. */\n    state.firmware_authorized = false;\n    assert(choose_startup_path(&state) == START_RECOVERY);\n    state.firmware_authorized = true;\n    state.configuration_valid = false;\n    assert(choose_startup_path(&state) == START_RECOVERY);\n    state.configuration_valid = true;\n    state.image_version = 9u;\n    assert(choose_startup_path(&state) == START_RECOVERY);\n    assert(choose_startup_path(NULL) == START_RECOVERY);\n    return 0;\n}\n"
    }
  ]
};
