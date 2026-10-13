window.COURSE_CODE_MODULE = {
  "title": "Length, Bounds, and Buffer Safety",
  "codeIntro": "A destination's logical capacity must include every byte the operation writes, including the string terminator.",
  "codeExamples": [
    {
      "title": "Vulnerable: compare data length to total capacity",
      "language": "c",
      "blurb": "Allowing data to equal capacity leaves no byte for the terminator and writes into a guard byte.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <string.h>\n\nstatic bool copy_label(char *destination, size_t capacity,\n                       const char *source, size_t source_length)\n{\n    if (destination == NULL || source == NULL || capacity == 0) {\n        return false;\n    }\n\n    /* IMPORTANT DEFECT: equality leaves no room for the terminator. */\n    if (source_length > capacity) {\n        return false;\n    }\n    memcpy(destination, source, source_length);\n    destination[source_length] = '\\0';\n    return true;\n}\n\nint main(void)\n{\n    char physical_storage[9] = {0};\n    const char exact_capacity[8] = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'};\n\n    physical_storage[8] = '#';\n    assert(copy_label(physical_storage, 8, exact_capacity,\n                      sizeof exact_capacity));\n\n    /* TEST: the write stays allocated but crosses the logical capacity. */\n    assert(physical_storage[8] == '\\0');\n    return 0;\n}\n"
    },
    {
      "title": "Safer: reserve capacity for the terminator",
      "language": "c",
      "blurb": "The complete operation is bounded before copying; a seven-byte label fits and an eight-byte label is rejected.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <string.h>\n\nstatic bool copy_label(char *destination, size_t capacity,\n                       const char *source, size_t source_length)\n{\n    if (destination == NULL || source == NULL || capacity == 0) {\n        return false;\n    }\n\n    /* IMPORTANT FIX: data plus one terminator must fit. */\n    if (source_length >= capacity) {\n        return false;\n    }\n    /* Length-delimited input may be a view of the destination. */\n    memmove(destination, source, source_length);\n    destination[source_length] = '\\0';\n    return true;\n}\n\nint main(void)\n{\n    char physical_storage[9] = {0};\n    const char fits[7] = {'A', 'B', 'C', 'D', 'E', 'F', 'G'};\n    const char too_long[8] = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'};\n\n    physical_storage[8] = '#';\n    assert(copy_label(physical_storage, 8, fits, sizeof fits));\n    assert(strcmp(physical_storage, \"ABCDEFG\") == 0);\n\n    /* TEST: the boundary input is rejected and the guard is unchanged. */\n    assert(!copy_label(physical_storage, 8, too_long, sizeof too_long));\n    assert(physical_storage[8] == '#');\n    /* TEST: overlapping slices preserve the complete source label. */\n    {\n        char overlap[16] = \"abcd\";\n        assert(copy_label(overlap + 1, sizeof overlap - 1u, overlap, 4u));\n        assert(strcmp(overlap + 1, \"abcd\") == 0);\n    }\n    return 0;\n}\n"
    }
  ]
};
