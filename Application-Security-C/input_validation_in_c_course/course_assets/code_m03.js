window.COURSE_CODE_MODULE = {
  "title": "Validation Strategy: Accept Known Good",
  "codeIntro": "Compare a narrow denylist with a field-specific allowlist for configuration keys.",
  "codeExamples": [
    {
      "title": "Vulnerable: deny a few dangerous characters",
      "language": "c",
      "blurb": "Blocking slashes still admits forms that are outside the configuration-key grammar.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <string.h>\n\nstatic bool key_not_denied(const char *key)\n{\n    size_t length = 0;\n\n    if (key == NULL) {\n        return false;\n    }\n    length = strlen(key);\n    if (length == 0 || length > 12) {\n        return false;\n    }\n\n    /* IMPORTANT DEFECT: a short denylist does not define valid syntax. */\n    return strchr(key, '/') == NULL && strchr(key, '\\\\') == NULL;\n}\n\nint main(void)\n{\n    assert(key_not_denied(\"server-port\"));\n    assert(!key_not_denied(\"../secret\"));\n\n    /* TEST: whitespace is invalid grammar, but the denylist accepts it. */\n    assert(key_not_denied(\"server port\"));\n    return 0;\n}\n"
    },
    {
      "title": "Safer: allow only the documented key grammar",
      "language": "c",
      "blurb": "The validator accepts a lowercase letter followed only by lowercase letters, digits, or hyphens, up to twelve bytes.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n\nstatic bool is_lower_ascii(char ch)\n{\n    return ch >= 'a' && ch <= 'z';\n}\n\nstatic bool valid_config_key(const char *key)\n{\n    size_t index = 0;\n\n    if (key == NULL || !is_lower_ascii(key[0])) {\n        return false;\n    }\n\n    /* IMPORTANT FIX: this loop is the complete accepted grammar. */\n    for (index = 1; key[index] != '\\0'; ++index) {\n        const char ch = key[index];\n        const bool allowed = is_lower_ascii(ch) ||\n                             (ch >= '0' && ch <= '9') || ch == '-';\n        if (index >= 12 || !allowed) {\n            return false;\n        }\n    }\n    return true;\n}\n\nint main(void)\n{\n    assert(valid_config_key(\"server-port\"));\n    assert(valid_config_key(\"worker-2\"));\n\n    /* TEST: ambiguous and out-of-contract forms are rejected. */\n    assert(!valid_config_key(\"server port\"));\n    assert(!valid_config_key(\"Server-port\"));\n    assert(!valid_config_key(\"-server\"));\n    assert(!valid_config_key(\"abcdefghijklz\"));\n    return 0;\n}\n"
    }
  ]
};
