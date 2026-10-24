window.COURSE_CODE_MODULE = {
  "title": "Framing, Boundaries, and Message Structure",
  "codeIntro": "A complete length prefix is only a claim; the parser must prove the declared payload is present before dispatching or reading it.",
  "codeExamples": [
    {
      "title": "Vulnerable: trust a complete header as a complete frame",
      "language": "c",
      "blurb": "The checksum loop trusts the declared payload length and consumes a guard byte beyond the logical message while remaining inside the physical test allocation.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdint.h>\n\nstatic bool payload_checksum(const uint8_t *frame, size_t frame_length,\n                             uint8_t *result)\n{\n    size_t index = 0;\n    size_t declared_length = 0;\n    uint8_t sum = 0;\n\n    if (frame == NULL || result == NULL || frame_length < 2) {\n        return false;\n    }\n    declared_length = ((size_t)frame[0] << 8) | (size_t)frame[1];\n\n    /* IMPORTANT DEFECT: declared length is never compared with available bytes. */\n    for (index = 0; index < declared_length; ++index) {\n        sum = (uint8_t)(sum + frame[2 + index]);\n    }\n    *result = sum;\n    return true;\n}\n\nint main(void)\n{\n    const uint8_t physical_frame[5] = {0u, 3u, 1u, 2u, 128u};\n    uint8_t sum = 0;\n\n    assert(payload_checksum(physical_frame, 4, &sum));\n\n    /* TEST: the third payload byte came from the logical guard. */\n    assert(sum == 131u);\n    return 0;\n}\n"
    },
    {
      "title": "Safer: require the complete declared frame",
      "language": "c",
      "blurb": "The parser bounds the declared payload and requires exact agreement with the bytes present before reading payload data.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdint.h>\n\nstatic bool payload_checksum(const uint8_t *frame, size_t frame_length,\n                             uint8_t *result)\n{\n    size_t index = 0;\n    size_t declared_length = 0;\n    uint8_t sum = 0;\n\n    if (frame == NULL || result == NULL || frame_length < 2) {\n        return false;\n    }\n    declared_length = ((size_t)frame[0] << 8) | (size_t)frame[1];\n\n    /* IMPORTANT FIX: policy and actual frame boundaries must both agree. */\n    if (declared_length > 8 || declared_length != frame_length - 2) {\n        return false;\n    }\n    for (index = 0; index < declared_length; ++index) {\n        sum = (uint8_t)(sum + frame[2 + index]);\n    }\n    *result = sum;\n    return true;\n}\n\nint main(void)\n{\n    const uint8_t incomplete[5] = {0u, 3u, 1u, 2u, 128u};\n    const uint8_t complete[] = {0u, 2u, 1u, 2u};\n    uint8_t sum = 99u;\n\n    assert(!payload_checksum(incomplete, 4, &sum));\n    assert(sum == 99u);\n    assert(payload_checksum(complete, sizeof complete, &sum));\n\n    /* TEST: only the complete two-byte payload contributes to the result. */\n    assert(sum == 3u);\n    return 0;\n}\n"
    }
  ]
};
