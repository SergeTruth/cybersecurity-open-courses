window.COURSE_CODE_MODULE = {
  "title": "Code Example: A Complete Validation Pattern",
  "codeExamples": [
    {
      "title": "A Complete Validation Pattern",
      "language": "c",
      "code": "#include <errno.h>\n#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n#define LINE_CAP 128\n#define NAME_CAP 32\n\nstruct request {\n    char name[NAME_CAP];\n    int count;\n};\n\nint parse_request_line(const char *line, struct request *request) {\n    char name[NAME_CAP];\n    char count_text[16];\n    char extra;\n    char *end = NULL;\n    long count;\n\n    if (line == NULL || request == NULL) {\n        return -1;\n    }\n    if (sscanf(line, \"%31[A-Za-z0-9_-] %15[0-9] %c\", name, count_text, &extra) != 2) {\n        return -1;\n    }\n\n    errno = 0;\n    count = strtol(count_text, &end, 10);\n    if (errno != 0 || end == count_text || *end != '\\0' || count < 1 || count > 100) {\n        return -1;\n    }\n\n    memcpy(request->name, name, strlen(name) + 1);\n    request->count = (int)count;\n    return 0;\n}\n\nint read_request(FILE *stream, struct request *request) {\n    char line[LINE_CAP];\n    size_t length;\n\n    if (fgets(line, sizeof(line), stream) == NULL) {\n        return -1;\n    }\n    length = strlen(line);\n    if (length == 0 || line[length - 1] != '\\n') {\n        return -1;\n    }\n    line[length - 1] = '\\0';\n\n    return parse_request_line(line, request);\n}"
    }
  ]
};
