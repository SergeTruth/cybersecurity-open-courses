window.COURSE_CODE_MODULE = {
  "title": "Code Example: Treat Every Source as Untrusted",
  "codeExamples": [
    {
      "title": "Treat Every Source as Untrusted",
      "language": "c",
      "code": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nenum app_mode {\n    MODE_READ_ONLY,\n    MODE_BATCH\n};\n\nint parse_mode_from_env(enum app_mode *mode) {\n    const char *value = getenv(\"APP_MODE\");\n\n    if (value == NULL || strcmp(value, \"read-only\") == 0) {\n        *mode = MODE_READ_ONLY;\n        return 0;\n    }\n    if (strcmp(value, \"batch\") == 0) {\n        *mode = MODE_BATCH;\n        return 0;\n    }\n\n    return -1;\n}\n\nint parse_input_name(const char *arg) {\n    if (arg == NULL || arg[0] == '\\0') {\n        return -1;\n    }\n    if (strchr(arg, '/') != NULL || strstr(arg, \"..\") != NULL) {\n        return -1;\n    }\n    if (strlen(arg) > 64) {\n        return -1;\n    }\n    return 0;\n}\n\nint main(int argc, char **argv) {\n    enum app_mode mode;\n\n    if (argc != 2 || parse_mode_from_env(&mode) != 0 || parse_input_name(argv[1]) != 0) {\n        fputs(\"invalid command-line or environment input\\n\", stderr);\n        return 1;\n    }\n\n    puts(mode == MODE_BATCH ? \"batch mode\" : \"read-only mode\");\n    return 0;\n}"
    }
  ]
};
