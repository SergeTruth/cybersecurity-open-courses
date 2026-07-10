window.COURSE_CODE_MODULE = {
  "title": "Code Example: Bounded Line Read and Exact Parse",
  "codeExamples": [
    {
      "title": "Bounded Line Read and Exact Parse",
      "language": "c",
      "code": "#include <stdio.h>\n#include <string.h>\n\n#define LINE_CAP 80\n#define NAME_CAP 32\n\nstatic void drain_line(FILE *stream) {\n    int ch;\n    while ((ch = fgetc(stream)) != '\\n' && ch != EOF) {\n    }\n}\n\nint read_name_and_age(FILE *stream, char name[NAME_CAP], int *age) {\n    char line[LINE_CAP];\n    char extra;\n    size_t length;\n\n    if (fgets(line, sizeof(line), stream) == NULL) {\n        return -1;\n    }\n\n    length = strlen(line);\n    if (length == 0) {\n        return -1;\n    }\n    if (line[length - 1] != '\\n') {\n        drain_line(stream);\n        return -1;\n    }\n    line[length - 1] = '\\0';\n\n    if (sscanf(line, \"%31[A-Za-z] %d %c\", name, age, &extra) != 2) {\n        return -1;\n    }\n    if (*age < 13 || *age > 120) {\n        return -1;\n    }\n\n    return 0;\n}"
    }
  ]
};
