window.COURSE_CODE_MODULE = {
  "title": "Network Services and Protocol Security",
  "codeIntro": "A valid frame and an established connection do not authorize a state-changing device operation.",
  "codeExamples": [
    {
      "title": "Vulnerable: trust every connected peer equally",
      "language": "c",
      "blurb": "The frame has valid syntax, but the handler changes output state without checking peer authentication or action-specific permission.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdint.h>\n\nstruct session {\n    bool connected;\n    bool authenticated;\n    bool control_allowed;\n    bool output_on;\n};\n\nstatic bool apply_output_frame(struct session *session,\n                               const uint8_t *frame, size_t length)\n{\n    if (session == NULL || frame == NULL || length != 3 ||\n        frame[0] != 1u || frame[1] != 2u || frame[2] > 1u) {\n        return false;\n    }\n\n    /* IMPORTANT DEFECT: connection state is treated as authorization. */\n    if (!session->connected) {\n        return false;\n    }\n    session->output_on = frame[2] == 1u;\n    return true;\n}\n\nint main(void)\n{\n    const uint8_t turn_on[] = {1u, 2u, 1u};\n    struct session peer = {true, false, false, false};\n\n    assert(apply_output_frame(&peer, turn_on, sizeof turn_on));\n\n    /* TEST: an unauthenticated peer changed a physical output. */\n    assert(peer.output_on);\n    return 0;\n}\n"
    },
    {
      "title": "Safer: authorize the operation in the current session",
      "language": "c",
      "blurb": "The handler validates exact framing, session authentication, and control permission before changing device state.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdint.h>\n\nstruct session {\n    bool connected;\n    bool authenticated;\n    bool control_allowed;\n    bool output_on;\n};\n\nstatic bool apply_output_frame(struct session *session,\n                               const uint8_t *frame, size_t length)\n{\n    if (session == NULL || frame == NULL || length != 3 ||\n        frame[0] != 1u || frame[1] != 2u || frame[2] > 1u) {\n        return false;\n    }\n\n    /* IMPORTANT FIX: syntax, identity, permission, and state all gate use. */\n    if (!session->connected || !session->authenticated ||\n        !session->control_allowed) {\n        return false;\n    }\n    session->output_on = frame[2] == 1u;\n    return true;\n}\n\nint main(void)\n{\n    const uint8_t turn_on[] = {1u, 2u, 1u};\n    const uint8_t bad_version[] = {2u, 2u, 1u};\n    struct session peer = {true, false, false, false};\n\n    assert(!apply_output_frame(&peer, turn_on, sizeof turn_on));\n    assert(!peer.output_on);\n    peer.authenticated = true;\n    peer.control_allowed = true;\n    assert(apply_output_frame(&peer, turn_on, sizeof turn_on));\n    assert(peer.output_on);\n\n    /* TEST: malformed and out-of-state messages fail closed. */\n    assert(!apply_output_frame(&peer, bad_version, sizeof bad_version));\n    assert(!apply_output_frame(&peer, turn_on, 2));\n    return 0;\n}\n"
    }
  ]
};
