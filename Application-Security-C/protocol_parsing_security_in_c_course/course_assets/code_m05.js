window.COURSE_CODE_MODULE = {
  "title": "Numeric Fields, Endianness, and Range Checks",
  "codeIntro": "Decode fixed-width protocol integers from bytes, then apply field-specific ranges before local code uses them.",
  "codeExamples": [
    {
      "title": "Decode and validate big-endian numeric fields",
      "language": "c",
      "blurb": "A six-byte settings record carries a 16-bit sensor count and 32-bit interval; both are decoded explicitly and range-checked before publication.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdint.h>\n\nstruct sampling_limits {\n    uint16_t sensor_count;\n    uint32_t interval_ms;\n};\n\nstatic bool decode_sampling_limits(const uint8_t *data, size_t length,\n                                   struct sampling_limits *result)\n{\n    struct sampling_limits decoded = {0u, 0u};\n\n    if (data == NULL || result == NULL || length != 6) {\n        return false;\n    }\n    decoded.sensor_count = (uint16_t)(((uint16_t)data[0] << 8) |\n                                      (uint16_t)data[1]);\n    decoded.interval_ms = ((uint32_t)data[2] << 24) |\n                          ((uint32_t)data[3] << 16) |\n                          ((uint32_t)data[4] << 8) |\n                          (uint32_t)data[5];\n\n    /* IMPORTANT FIX: byte order and local policy are both explicit. */\n    if (decoded.sensor_count < 1u || decoded.sensor_count > 32u ||\n        decoded.interval_ms < 100u || decoded.interval_ms > 60000u) {\n        return false;\n    }\n    *result = decoded;\n    return true;\n}\n\nint main(void)\n{\n    const uint8_t valid[] = {0u, 4u, 0u, 0u, 3u, 232u};\n    const uint8_t reversed_interval[] = {0u, 4u, 232u, 3u, 0u, 0u};\n    struct sampling_limits limits = {0u, 0u};\n\n    assert(decode_sampling_limits(valid, sizeof valid, &limits));\n    assert(limits.sensor_count == 4u && limits.interval_ms == 1000u);\n\n    /* TEST: wrong byte order and invalid record width are rejected. */\n    assert(!decode_sampling_limits(reversed_interval,\n                                   sizeof reversed_interval, &limits));\n    assert(!decode_sampling_limits(valid, 5, &limits));\n    return 0;\n}\n"
    }
  ]
};
