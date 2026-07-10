window.COURSE_CODE_MODULE = {
  "title": "Code Example: Preserve Capacity and Termination",
  "codeExamples": [
    {
      "title": "Preserve Capacity and Termination",
      "language": "c",
      "code": "#include <stdio.h>\n#include <string.h>\n\nstatic int bounded_length(const char *text, size_t limit, size_t *length) {\n    for (size_t i = 0; i < limit; i++) {\n        if (text[i] == '\\0') {\n            *length = i;\n            return 0;\n        }\n    }\n    return -1;\n}\n\nint copy_complete_string(char *dest, size_t dest_cap, const char *source) {\n    size_t source_len;\n\n    if (dest == NULL || source == NULL || dest_cap == 0) {\n        return -1;\n    }\n\n    if (bounded_length(source, dest_cap, &source_len) != 0) {\n        return -1;\n    }\n\n    memcpy(dest, source, source_len + 1);\n    return 0;\n}\n\nint build_label(char *dest, size_t dest_cap, const char *name) {\n    int written;\n\n    if (dest == NULL || name == NULL || dest_cap == 0) {\n        return -1;\n    }\n\n    written = snprintf(dest, dest_cap, \"user:%s\", name);\n    if (written < 0 || (size_t)written >= dest_cap) {\n        return -1;\n    }\n\n    return 0;\n}\n\nint main(void) {\n    char name[16];\n    char label[24];\n\n    if (copy_complete_string(name, sizeof(name), \"alice\") != 0 ||\n        build_label(label, sizeof(label), name) != 0) {\n        fputs(\"input was too long or invalid\\n\", stderr);\n        return 1;\n    }\n\n    puts(label);\n    return 0;\n}"
    }
  ]
};
