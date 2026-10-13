window.COURSE_CODE_MODULE = {
  "title": "Numeric Parsing and Range Checks",
  "codeIntro": "Successful conversion is not enough: the complete token and the field's policy range must both be valid.",
  "codeExamples": [
    {
      "title": "Vulnerable: accept a numeric prefix",
      "language": "c",
      "blurb": "The retry parser checks that some digits converted and that the value is in range, but silently accepts trailing text.",
      "code": "#include <assert.h>\n#include <errno.h>\n#include <stdbool.h>\n#include <stdlib.h>\n\nstatic bool parse_retry_limit(const char *text, unsigned int *result)\n{\n    char *end = NULL;\n    unsigned long value = 0;\n\n    if (text == NULL || result == NULL) {\n        return false;\n    }\n    errno = 0;\n    value = strtoul(text, &end, 10);\n\n    /* IMPORTANT DEFECT: characters after the numeric prefix are ignored. */\n    if (errno != 0 || end == text || value < 1ul || value > 10ul) {\n        return false;\n    }\n    *result = (unsigned int)value;\n    return true;\n}\n\nint main(void)\n{\n    unsigned int retries = 0;\n\n    assert(parse_retry_limit(\"3\", &retries) && retries == 3u);\n    assert(!parse_retry_limit(\"11\", &retries));\n\n    /* TEST: malformed input is misinterpreted as the number three. */\n    assert(parse_retry_limit(\"3attempts\", &retries));\n    assert(retries == 3u);\n    return 0;\n}\n"
    },
    {
      "title": "Safer: validate the token and policy range",
      "language": "c",
      "blurb": "The parser requires an ASCII decimal token, detects conversion errors, consumes all input, and enforces the retry limit of one through ten.",
      "code": "#include <assert.h>\n#include <errno.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdlib.h>\n\nstatic bool parse_retry_limit(const char *text, unsigned int *result)\n{\n    char *end = NULL;\n    unsigned long value = 0;\n    size_t index = 0;\n\n    if (text == NULL || result == NULL || text[0] == '\\0') {\n        return false;\n    }\n    for (index = 0; text[index] != '\\0'; ++index) {\n        if (text[index] < '0' || text[index] > '9') {\n            return false;\n        }\n    }\n\n    errno = 0;\n    value = strtoul(text, &end, 10);\n    /* IMPORTANT FIX: require full conversion and the field-specific range. */\n    if (errno != 0 || end == text || *end != '\\0' ||\n        value < 1ul || value > 10ul) {\n        return false;\n    }\n    *result = (unsigned int)value;\n    return true;\n}\n\nint main(void)\n{\n    unsigned int retries = 0;\n\n    assert(parse_retry_limit(\"1\", &retries) && retries == 1u);\n    assert(parse_retry_limit(\"10\", &retries) && retries == 10u);\n\n    /* TEST: malformed, signed, and out-of-range tokens are rejected. */\n    assert(!parse_retry_limit(\"3attempts\", &retries));\n    assert(!parse_retry_limit(\"+3\", &retries));\n    assert(!parse_retry_limit(\"0\", &retries));\n    assert(!parse_retry_limit(\"11\", &retries));\n    return 0;\n}\n"
    }
  ]
};
