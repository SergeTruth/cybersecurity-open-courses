window.COURSE_CODE_MODULE = {
  "title": "Code Example: Allowlisted File Names",
  "codeExamples": [
    {
      "title": "Allowlisted File Names",
      "language": "c",
      "code": "#include <ctype.h>\n#include <stdio.h>\n#include <string.h>\n\n#define BASE_DIR \"uploads\"\n#define PATH_CAP 128\n#define MAX_FILE_BYTES 1048576L\n\nstatic int safe_file_name(const char *name) {\n    size_t length;\n\n    if (name == NULL) {\n        return 0;\n    }\n    length = strlen(name);\n    if (length == 0 || length > 64) {\n        return 0;\n    }\n    if (strstr(name, \"..\") != NULL || strchr(name, '/') != NULL || strchr(name, '\\\\') != NULL) {\n        return 0;\n    }\n    if (length < 4 || strcmp(name + length - 4, \".cfg\") != 0) {\n        return 0;\n    }\n\n    for (size_t i = 0; i < length; i++) {\n        unsigned char ch = (unsigned char)name[i];\n        if (!isalnum(ch) && ch != '_' && ch != '-' && ch != '.') {\n            return 0;\n        }\n    }\n    return 1;\n}\n\nint open_valid_config(const char *name, FILE **out) {\n    char path[PATH_CAP];\n    int written;\n    FILE *file;\n\n    if (!safe_file_name(name)) {\n        return -1;\n    }\n\n    written = snprintf(path, sizeof(path), \"%s/%s\", BASE_DIR, name);\n    if (written < 0 || (size_t)written >= sizeof(path)) {\n        return -1;\n    }\n\n    file = fopen(path, \"rb\");\n    if (file == NULL) {\n        return -1;\n    }\n    if (fseek(file, 0, SEEK_END) != 0 || ftell(file) > MAX_FILE_BYTES) {\n        fclose(file);\n        return -1;\n    }\n    rewind(file);\n\n    *out = file;\n    return 0;\n}"
    }
  ]
};
