window.COURSE_CODE_MODULE = {
  "title": "Least Privilege for File Access",
  "codeIntro": "Request only the access a configuration reader needs and let the stream mode enforce that intent.",
  "codeExamples": [
    {
      "title": "Open configuration data read-only",
      "language": "c",
      "blurb": "The reader uses binary read mode without create, truncate, append, or update privileges; tests cover readable and missing files.",
      "code": "#if !defined(_WIN32)\n#define _POSIX_C_SOURCE 200809L\n#endif\n#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#if defined(_WIN32)\n#include <direct.h>\n#include <io.h>\n#else\n#include <unistd.h>\n#endif\n\n/* Run in a trusted test workspace. Do not reuse or delete an existing dir. */\nstatic bool make_fixture_directory(char *path)\n{\n#if defined(_WIN32)\n    return _mktemp_s(path, strlen(path) + 1u) == 0 && _mkdir(path) == 0;\n#else\n    return mkdtemp(path) != NULL;\n#endif\n}\n\nstatic int remove_fixture_directory(const char *path)\n{\n#if defined(_WIN32)\n    return _rmdir(path);\n#else\n    return rmdir(path);\n#endif\n}\n\nstatic FILE *open_configuration(const char *path)\n{\n    if (path == NULL) {\n        return NULL;\n    }\n    /* IMPORTANT FIX: \"rb\" requests read access only. */\n    return fopen(path, \"rb\");\n}\n\nint main(void)\n{\n    char directory[] = \"permission-config-XXXXXX\";\n    char path[128];\n    char missing[128];\n    FILE *file;\n    int written;\n\n    assert(make_fixture_directory(directory));\n    written = snprintf(path, sizeof path, \"%s/config.tmp\", directory);\n    assert(written > 0 && (size_t)written < sizeof path);\n    written = snprintf(missing, sizeof missing, \"%s/missing.tmp\", directory);\n    assert(written > 0 && (size_t)written < sizeof missing);\n    file = fopen(path, \"wbx\");\n    assert(file != NULL);\n    assert(fputs(\"mode=safe\\n\", file) >= 0);\n    assert(fclose(file) == 0);\n\n    file = open_configuration(path);\n    assert(file != NULL);\n    assert(fgetc(file) == 'm');\n    assert(fclose(file) == 0);\n\n    /* TEST: the reader succeeds only when an existing file can be read. */\n    assert(open_configuration(missing) == NULL);\n    assert(remove(path) == 0);\n    assert(remove_fixture_directory(directory) == 0);\n    return 0;\n}\n"
    }
  ]
};
