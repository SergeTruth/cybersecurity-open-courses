window.COURSE_CODE_MODULE = {
  "title": "Code Example: Boundary Tests for Rejection",
  "codeExamples": [
    {
      "title": "Boundary Tests for Rejection",
      "language": "c",
      "code": "#include <assert.h>\n#include <errno.h>\n#include <stdlib.h>\n\nint parse_count(const char *text, int *count) {\n    char *end = NULL;\n    long value;\n\n    if (text == NULL || text[0] == '\\0') {\n        return -1;\n    }\n\n    errno = 0;\n    value = strtol(text, &end, 10);\n    if (errno != 0 || end == text || *end != '\\0') {\n        return -1;\n    }\n    if (value < 1 || value > 100) {\n        return -1;\n    }\n\n    *count = (int)value;\n    return 0;\n}\n\nstatic void test_parse_count(void) {\n    int value = 0;\n\n    assert(parse_count(\"1\", &value) == 0 && value == 1);\n    assert(parse_count(\"100\", &value) == 0 && value == 100);\n\n    assert(parse_count(\"0\", &value) != 0);\n    assert(parse_count(\"101\", &value) != 0);\n    assert(parse_count(\"-1\", &value) != 0);\n    assert(parse_count(\"12x\", &value) != 0);\n    assert(parse_count(\"\", &value) != 0);\n}\n\nint main(void) {\n    test_parse_count();\n    return 0;\n}"
    }
  ]
};
