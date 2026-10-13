window.COURSE_CODE_MODULE = {
  "title": "Text, Encoding, and Character Rules",
  "codeIntro": "Length-delimited text must be validated with the same byte interpretation that later code will use.",
  "codeExamples": [
    {
      "title": "Vulnerable: validate only the visible prefix",
      "language": "c",
      "blurb": "Stopping validation at an embedded null accepts trailing bytes that a length-aware consumer will still process.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <string.h>\n\nstatic bool valid_user_id(const unsigned char *bytes, size_t length)\n{\n    const unsigned char *zero = NULL;\n    size_t visible_length = length;\n    size_t index = 0;\n\n    if (bytes == NULL || length == 0 || length > 12) {\n        return false;\n    }\n    zero = memchr(bytes, 0, length);\n    if (zero != NULL) {\n        visible_length = (size_t)(zero - bytes);\n    }\n\n    /* IMPORTANT DEFECT: bytes after the first null are never checked. */\n    for (index = 0; index < visible_length; ++index) {\n        if (bytes[index] < (unsigned char)'a' ||\n            bytes[index] > (unsigned char)'z') {\n            return false;\n        }\n    }\n    return visible_length != 0;\n}\n\nint main(void)\n{\n    const unsigned char normal[] = {'a', 'l', 'i', 'c', 'e'};\n    const unsigned char split_view[] = {'a', 'd', 'm', 'i', 'n', 0, '#', 'x'};\n\n    assert(valid_user_id(normal, sizeof normal));\n\n    /* TEST: validation accepts bytes the length-aware consumer will see. */\n    assert(valid_user_id(split_view, sizeof split_view));\n    assert(split_view[6] == (unsigned char)'#');\n    return 0;\n}\n"
    },
    {
      "title": "Safer: validate every byte in the field",
      "language": "c",
      "blurb": "The contract defines the identifier as one to twelve lowercase ASCII letters and rejects nulls, controls, and punctuation anywhere in the field.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n\nstatic bool valid_user_id(const unsigned char *bytes, size_t length)\n{\n    size_t index = 0;\n\n    if (bytes == NULL || length == 0 || length > 12) {\n        return false;\n    }\n\n    /* IMPORTANT FIX: validate the entire length-delimited representation. */\n    for (index = 0; index < length; ++index) {\n        if (bytes[index] < (unsigned char)'a' ||\n            bytes[index] > (unsigned char)'z') {\n            return false;\n        }\n    }\n    return true;\n}\n\nint main(void)\n{\n    const unsigned char normal[] = {'a', 'l', 'i', 'c', 'e'};\n    const unsigned char split_view[] = {'a', 'd', 'm', 'i', 'n', 0, '#', 'x'};\n    const unsigned char control[] = {'b', 'o', 'b', '\\n'};\n\n    assert(valid_user_id(normal, sizeof normal));\n\n    /* TEST: embedded nulls and control characters are rejected. */\n    assert(!valid_user_id(split_view, sizeof split_view));\n    assert(!valid_user_id(control, sizeof control));\n    assert(!valid_user_id(normal, 0));\n    return 0;\n}\n"
    }
  ]
};
