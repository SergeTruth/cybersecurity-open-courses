window.COURSE_CODE_MODULE = {
  "title": "Error Handling and Safe Failure",
  "codeIntro": "Compare updating a trusted object during parsing with validating temporary decoded fields and committing only after the whole message succeeds.",
  "codeExamples": [
    {
      "title": "Vulnerable: update trusted output during validation",
      "language": "c",
      "blurb": "An invalid threshold is rejected, but the earlier mode field has already changed the trusted settings object.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdint.h>\n\nstruct trusted_settings {\n    uint8_t mode;\n    uint8_t threshold;\n};\n\nstatic bool parse_settings(const uint8_t *data, size_t length,\n                           struct trusted_settings *result)\n{\n    if (data == NULL || result == NULL || length != 2 || data[0] > 2u) {\n        return false;\n    }\n    result->mode = data[0];\n\n    /* IMPORTANT DEFECT: trusted output changes before validation completes. */\n    if (data[1] > 100u) {\n        return false;\n    }\n    result->threshold = data[1];\n    return true;\n}\n\nint main(void)\n{\n    const uint8_t invalid[] = {2u, 255u};\n    struct trusted_settings settings = {0u, 0u};\n\n    assert(!parse_settings(invalid, sizeof invalid, &settings));\n\n    /* TEST: rejection still changed part of the trusted representation. */\n    assert(settings.mode == 2u && settings.threshold == 0u);\n    return 0;\n}\n"
    },
    {
      "title": "Safer: publish only a fully validated representation",
      "language": "c",
      "blurb": "Decoded fields remain temporary until the complete message passes, so failure leaves the previous trusted object untouched.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdint.h>\n\nstruct trusted_settings {\n    uint8_t mode;\n    uint8_t threshold;\n};\n\nstatic bool parse_settings(const uint8_t *data, size_t length,\n                           struct trusted_settings *result)\n{\n    struct trusted_settings decoded = {0u, 0u};\n\n    if (data == NULL || result == NULL || length != 2) {\n        return false;\n    }\n    decoded.mode = data[0];\n    decoded.threshold = data[1];\n    if (decoded.mode > 2u || decoded.threshold > 100u) {\n        return false;\n    }\n\n    /* IMPORTANT FIX: commit only the completely trusted representation. */\n    *result = decoded;\n    return true;\n}\n\nint main(void)\n{\n    const uint8_t invalid[] = {2u, 255u};\n    const uint8_t valid[] = {1u, 75u};\n    struct trusted_settings settings = {0u, 50u};\n\n    assert(!parse_settings(invalid, sizeof invalid, &settings));\n    assert(settings.mode == 0u && settings.threshold == 50u);\n    assert(parse_settings(valid, sizeof valid, &settings));\n\n    /* TEST: success publishes both validated fields together. */\n    assert(settings.mode == 1u && settings.threshold == 75u);\n    return 0;\n}\n"
    }
  ]
};
