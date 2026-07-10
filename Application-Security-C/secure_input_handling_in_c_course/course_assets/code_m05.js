window.COURSE_CODE_MODULE = {
  "title": "Code Example: Parse Numbers and Check Overflow",
  "codeExamples": [
    {
      "title": "Parse Numbers and Check Overflow",
      "language": "c",
      "code": "#include <errno.h>\n#include <limits.h>\n#include <stddef.h>\n#include <stdint.h>\n#include <stdlib.h>\n\nint parse_port(const char *text, unsigned short *port) {\n    char *end = NULL;\n    long value;\n\n    if (text == NULL || text[0] == '\\0') {\n        return -1;\n    }\n\n    errno = 0;\n    value = strtol(text, &end, 10);\n    if (errno != 0 || end == text || *end != '\\0') {\n        return -1;\n    }\n    if (value < 1 || value > 65535) {\n        return -1;\n    }\n\n    *port = (unsigned short)value;\n    return 0;\n}\n\nint checked_array_bytes(size_t count, size_t element_size, size_t *bytes) {\n    if (element_size != 0 && count > SIZE_MAX / element_size) {\n        return -1;\n    }\n    if (count > 1000000) {\n        return -1;\n    }\n\n    *bytes = count * element_size;\n    return 0;\n}"
    }
  ]
};
