window.COURSE_CODE_MODULE = {
  "title": "Storage Duration and Object Lifetime",
  "codeIntro": "When a result must outlive a function call, return explicitly owned storage instead of an address into an automatic object.",
  "codeExamples": [
    {
      "title": "Return an owned text result",
      "language": "c",
      "blurb": "The function allocates the result, publishes it only after initialization succeeds, and leaves the caller responsible for one matching release.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdint.h>\n#include <stdlib.h>\n#include <string.h>\n\nstruct owned_text {\n    char *data;\n    size_t length;\n};\n\nstatic bool make_owned_text(const char *source, size_t length,\n                            struct owned_text *result)\n{\n    char *copy = NULL;\n\n    if (source == NULL || result == NULL || result->data != NULL ||\n        length == SIZE_MAX) {\n        return false;\n    }\n    copy = malloc(length + 1);\n    if (copy == NULL) {\n        return false;\n    }\n    memcpy(copy, source, length);\n    copy[length] = '\\0';\n\n    /* IMPORTANT FIX: publish only fully initialized, caller-owned storage. */\n    result->data = copy;\n    result->length = length;\n    return true;\n}\n\nint main(void)\n{\n    const char local_source[] = \"sensor\";\n    struct owned_text text = {NULL, 0};\n\n    assert(make_owned_text(local_source, sizeof local_source - 1, &text));\n    assert(text.length == 6 && strcmp(text.data, \"sensor\") == 0);\n\n    free(text.data);\n    text.data = NULL;\n    text.length = 0;\n\n    /* TEST: impossible size arithmetic is rejected without ownership. */\n    assert(!make_owned_text(local_source, SIZE_MAX, &text));\n    assert(text.data == NULL && text.length == 0);\n    return 0;\n}\n"
    }
  ]
};
