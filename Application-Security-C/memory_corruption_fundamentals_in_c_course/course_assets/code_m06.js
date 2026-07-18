window.COURSE_CODE_MODULE = {
  "title": "Strings, Terminators, and Copying Risks",
  "codeIntro": "A fixed-width character field is not a C string unless a terminator is found inside its logical extent.",
  "codeExamples": [
    {
      "title": "Vulnerable: call strlen before proving termination",
      "language": "c",
      "blurb": "The field has four logical bytes, but strlen continues into physically allocated guard bytes before the later length check rejects it.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <string.h>\n\nstatic bool measure_fixed_name(const char *field, size_t field_capacity,\n                               size_t *name_length)\n{\n    if (field == NULL || name_length == NULL || field_capacity == 0) {\n        return false;\n    }\n\n    /* IMPORTANT DEFECT: strlen has no knowledge of the logical capacity. */\n    *name_length = strlen(field);\n    return *name_length < field_capacity;\n}\n\nint main(void)\n{\n    const char physical_field[6] = {'A', 'B', 'C', 'D', 'X', '\\0'};\n    size_t length = 0;\n\n    assert(!measure_fixed_name(physical_field, 4, &length));\n\n    /* TEST: strlen remained allocated but read the guard byte at index four. */\n    assert(length == 5);\n    return 0;\n}\n"
    },
    {
      "title": "Safer: search for a terminator within the field",
      "language": "c",
      "blurb": "memchr is bounded by the fixed-width record; a missing terminator is rejected and a valid in-field terminator yields an explicit length.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <string.h>\n\nstatic bool measure_fixed_name(const char *field, size_t field_capacity,\n                               size_t *name_length)\n{\n    const char *terminator = NULL;\n\n    if (field == NULL || name_length == NULL || field_capacity == 0) {\n        return false;\n    }\n\n    /* IMPORTANT FIX: terminator discovery is confined to the valid field. */\n    terminator = memchr(field, '\\0', field_capacity);\n    if (terminator == NULL) {\n        return false;\n    }\n    *name_length = (size_t)(terminator - field);\n    return true;\n}\n\nint main(void)\n{\n    const char unterminated[6] = {'A', 'B', 'C', 'D', 'X', '\\0'};\n    const char valid[4] = {'A', 'B', '\\0', 'Z'};\n    size_t length = 99;\n\n    assert(measure_fixed_name(valid, sizeof valid, &length));\n    assert(length == 2);\n\n    /* TEST: no terminator in the logical field is rejected. */\n    length = 99;\n    assert(!measure_fixed_name(unterminated, 4, &length));\n    assert(length == 99);\n    return 0;\n}\n"
    }
  ]
};
