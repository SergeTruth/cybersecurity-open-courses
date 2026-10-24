window.COURSE_CODE_MODULE = {
  "title": "Seeding and Entropy Sources",
  "codeIntro": "Security-sensitive generation starts only when the approved platform source reports readiness; low-entropy fallback requests fail closed.",
  "codeExamples": [
    {
      "title": "Require an approved, ready entropy source",
      "language": "c",
      "blurb": "The startup decision distinguishes platform readiness from clock, process-ID, counter, or application-mixing fallback attempts.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n\nstruct entropy_status {\n    bool approved_platform_source;\n    bool source_ready;\n    bool predictable_fallback_requested;\n};\n\nstatic bool authorize_secret_generation(const struct entropy_status *status)\n{\n    if (status == NULL) {\n        return false;\n    }\n\n    /* IMPORTANT FIX: unavailable entropy is an error, never a fallback seed. */\n    return status->approved_platform_source && status->source_ready &&\n           !status->predictable_fallback_requested;\n}\n\nint main(void)\n{\n    struct entropy_status status = {true, true, false};\n\n    assert(authorize_secret_generation(&status));\n\n    /* TEST: unavailable sources and predictable fallback both fail closed. */\n    status.source_ready = false;\n    assert(!authorize_secret_generation(&status));\n    status.source_ready = true;\n    status.predictable_fallback_requested = true;\n    assert(!authorize_secret_generation(&status));\n    status.predictable_fallback_requested = false;\n    status.approved_platform_source = false;\n    assert(!authorize_secret_generation(&status));\n    return 0;\n}\n"
    }
  ]
};
