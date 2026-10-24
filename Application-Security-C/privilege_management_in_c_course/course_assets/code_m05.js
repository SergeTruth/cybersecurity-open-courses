window.COURSE_CODE_MODULE = {
  "title": "Dropping and Reducing Privileges",
  "codeIntro": "Compare continuing after an unchecked reduction attempt with a fail-closed transition that also verifies the resulting authority state.",
  "codeExamples": [
    {
      "title": "Vulnerable: enable ordinary processing after any attempt",
      "language": "c",
      "blurb": "The runtime enters its untrusted phase even when the platform change failed and the process remains elevated.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n\nstruct runtime_state {\n    bool elevated;\n    bool ordinary_processing_enabled;\n};\n\nstatic bool enter_unprivileged_phase(struct runtime_state *state,\n                                     bool change_succeeded,\n                                     bool verification_succeeded)\n{\n    if (state == NULL) {\n        return false;\n    }\n    (void)verification_succeeded;\n    if (change_succeeded) {\n        state->elevated = false;\n    }\n\n    /* IMPORTANT DEFECT: processing starts regardless of reduction outcome. */\n    state->ordinary_processing_enabled = true;\n    return true;\n}\n\nint main(void)\n{\n    struct runtime_state runtime = {true, false};\n\n    assert(enter_unprivileged_phase(&runtime, false, false));\n\n    /* TEST: untrusted processing is enabled while authority remains elevated. */\n    assert(runtime.elevated);\n    assert(runtime.ordinary_processing_enabled);\n    return 0;\n}\n"
    },
    {
      "title": "Safer: require reduction and verification",
      "language": "c",
      "blurb": "The transition fails closed unless both the platform change and its independent verification succeed.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n\nstruct runtime_state {\n    bool elevated;\n    bool ordinary_processing_enabled;\n};\n\nstatic bool enter_unprivileged_phase(struct runtime_state *state,\n                                     bool change_succeeded,\n                                     bool verification_succeeded)\n{\n    if (state == NULL || !state->elevated || !change_succeeded ||\n        !verification_succeeded) {\n        return false;\n    }\n\n    /* IMPORTANT FIX: publish the point of no return only after verification. */\n    state->elevated = false;\n    state->ordinary_processing_enabled = true;\n    return true;\n}\n\nint main(void)\n{\n    struct runtime_state runtime = {true, false};\n\n    assert(!enter_unprivileged_phase(&runtime, false, false));\n    assert(runtime.elevated && !runtime.ordinary_processing_enabled);\n    assert(!enter_unprivileged_phase(&runtime, true, false));\n    assert(runtime.elevated && !runtime.ordinary_processing_enabled);\n    assert(enter_unprivileged_phase(&runtime, true, true));\n\n    /* TEST: success makes elevated authority unavailable to later code. */\n    assert(!runtime.elevated && runtime.ordinary_processing_enabled);\n    assert(!enter_unprivileged_phase(&runtime, true, true));\n    return 0;\n}\n"
    }
  ]
};
