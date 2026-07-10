window.COURSE_CODE_MODULE = {
  "title": "Code Example: Validate Before Copying",
  "codeExamples": [
    {
      "title": "Validate Before Copying",
      "language": "c",
      "code": "#include <ctype.h>\n#include <stdio.h>\n#include <string.h>\n\n#define USERNAME_CAP 32\n\nstatic int bounded_length(const char *text, size_t limit, size_t *length) {\n    for (size_t i = 0; i < limit; i++) {\n        if (text[i] == '\\0') {\n            *length = i;\n            return 0;\n        }\n    }\n    return -1;\n}\n\nstatic int valid_username_char(unsigned char ch) {\n    return isalnum(ch) || ch == '_' || ch == '-';\n}\n\nint copy_valid_username(char dest[USERNAME_CAP], const char *input) {\n    size_t length;\n\n    if (input == NULL) {\n        return -1;\n    }\n\n    if (bounded_length(input, USERNAME_CAP, &length) != 0 || length == 0) {\n        return -1;\n    }\n\n    for (size_t i = 0; i < length; i++) {\n        if (!valid_username_char((unsigned char)input[i])) {\n            return -1;\n        }\n    }\n\n    memcpy(dest, input, length + 1);\n    return 0;\n}\n\nint main(int argc, char **argv) {\n    char username[USERNAME_CAP];\n\n    if (argc != 2 || copy_valid_username(username, argv[1]) != 0) {\n        fputs(\"usage: program <1-31 safe username>\\n\", stderr);\n        return 1;\n    }\n\n    printf(\"accepted username: %s\\n\", username);\n    return 0;\n}"
    }
  ]
};
