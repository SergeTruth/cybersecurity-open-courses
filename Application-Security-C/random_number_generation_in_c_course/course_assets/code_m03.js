window.COURSE_CODE_MODULE = {
  "title": "The Limits of rand and Similar APIs",
  "codeIntro": "Compare a repeatable rand-based token with a provider contract that refuses sources not approved for secrets.",
  "codeExamples": [
    {
      "title": "Vulnerable: derive an access token from rand",
      "language": "c",
      "blurb": "Resetting the small deterministic state with the same seed reproduces the complete token sequence.",
      "code": "#include <assert.h>\n#include <stddef.h>\n#include <stdint.h>\n#include <stdlib.h>\n#include <string.h>\n\nstatic void token_from_rand(unsigned int seed, uint8_t token[8])\n{\n    size_t index = 0;\n\n    srand(seed);\n    /* IMPORTANT DEFECT: rand output is deterministic and unsuitable for secrets. */\n    for (index = 0; index < 8; ++index) {\n        token[index] = (uint8_t)(rand() & 0xff);\n    }\n}\n\nint main(void)\n{\n    uint8_t first[8] = {0};\n    uint8_t second[8] = {0};\n\n    token_from_rand(7u, first);\n    token_from_rand(7u, second);\n\n    /* TEST: the same guessable seed reproduces the access token. */\n    assert(memcmp(first, second, sizeof first) == 0);\n    return 0;\n}\n"
    },
    {
      "title": "Safer: reject unapproved providers for secrets",
      "language": "c",
      "blurb": "A token wrapper requires an explicitly approved provider and the policy length; the deterministic provider is accepted only as a contract test double when marked accordingly.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdint.h>\n#include <string.h>\n\ntypedef bool (*fill_bytes_fn)(void *context, uint8_t *output, size_t length);\n\nstruct random_provider {\n    fill_bytes_fn fill;\n    void *context;\n    bool approved_for_secrets;\n};\n\nstatic bool fill_test_pattern(void *context, uint8_t *output, size_t length)\n{\n    size_t index = 0;\n    const uint8_t value = *(const uint8_t *)context;\n\n    for (index = 0; index < length; ++index) {\n        output[index] = value;\n    }\n    return true;\n}\n\nstatic bool create_access_token(const struct random_provider *provider,\n                                uint8_t *token, size_t length)\n{\n    if (provider == NULL || provider->fill == NULL || token == NULL ||\n        !provider->approved_for_secrets || length != 16) {\n        return false;\n    }\n\n    /* IMPORTANT FIX: secret generation cannot select a legacy source. */\n    return provider->fill(provider->context, token, length);\n}\n\nint main(void)\n{\n    uint8_t token[16] = {0};\n    uint8_t pattern = 0xa5u;\n    struct random_provider unapproved = {\n        fill_test_pattern, &pattern, false\n    };\n    struct random_provider approved_contract_double = {\n        fill_test_pattern, &pattern, true\n    };\n\n    assert(!create_access_token(&unapproved, token, sizeof token));\n    assert(create_access_token(&approved_contract_double, token, sizeof token));\n\n    /* TEST: policy rejects the weak source and enforces token length. */\n    assert(token[0] == 0xa5u && token[15] == 0xa5u);\n    assert(!create_access_token(&approved_contract_double, token, 8));\n    return 0;\n}\n"
    }
  ]
};
