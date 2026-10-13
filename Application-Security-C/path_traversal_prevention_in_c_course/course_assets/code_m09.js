window.COURSE_CODE_MODULE = {
  "title": "Logging, Testing, and Review Practices",
  "codeIntro": "Diagnostics can record a bounded rejection category and input length without copying sensitive path text or internal roots.",
  "codeExamples": [
    {
      "title": "Test privacy-aware path rejection events",
      "language": "c",
      "blurb": "The diagnostic API accepts only a stable reason and bounded length, making raw filenames and directory layouts impossible to log through this interface.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdio.h>\n#include <string.h>\n\nenum rejection_reason {\n    REJECT_EMPTY,\n    REJECT_TOO_LONG,\n    REJECT_SEPARATOR,\n    REJECT_ABSOLUTE\n};\n\nstatic const char *reason_name(enum rejection_reason reason)\n{\n    switch (reason) {\n    case REJECT_EMPTY:\n        return \"empty\";\n    case REJECT_TOO_LONG:\n        return \"too_long\";\n    case REJECT_SEPARATOR:\n        return \"separator\";\n    case REJECT_ABSOLUTE:\n        return \"absolute\";\n    default:\n        return NULL;\n    }\n}\n\nstatic bool record_rejection(char *output, size_t capacity,\n                             enum rejection_reason reason,\n                             size_t input_length)\n{\n    const char *category = reason_name(reason);\n    int written = 0;\n\n    if (output == NULL || capacity == 0 || category == NULL ||\n        input_length > 4096) {\n        return false;\n    }\n\n    /* IMPORTANT FIX: logs receive metadata, not raw path contents. */\n    written = snprintf(output, capacity, \"path_rejected reason=%s length=%zu\",\n                       category, input_length);\n    return written >= 0 && (size_t)written < capacity;\n}\n\nint main(void)\n{\n    char event[64] = {0};\n\n    assert(record_rejection(event, sizeof event, REJECT_SEPARATOR, 12));\n    assert(strcmp(event, \"path_rejected reason=separator length=12\") == 0);\n\n    /* TEST: invalid categories and excessive lengths fail closed. */\n    assert(!record_rejection(event, sizeof event,\n                             (enum rejection_reason)99, 12));\n    assert(!record_rejection(event, sizeof event, REJECT_TOO_LONG, 4097));\n    return 0;\n}\n"
    },
    {
      "title": "Build and run the exact rejection tests",
      "language": "bash",
      "blurb": "Pass the extracted C listing as the only argument; the script enables strict diagnostics and runs the assertion-based rejection tests.",
      "code": "#!/usr/bin/env bash\nset -eu\n\nif [ \"$#\" -ne 1 ]; then\n    echo \"usage: $0 path-to-test-source.c\" >&2\n    exit 2\nfi\n\nsource_file=$1\ncompiler=${CC:-gcc}\ntemporary_directory=$(mktemp -d)\ntrap 'rm -rf \"$temporary_directory\"' EXIT\nexecutable=$temporary_directory/path-policy-tests\n\n# IMPORTANT FIX: strict diagnostics apply to the exact source under review.\n\"$compiler\" -std=c17 -Wall -Wextra -Wpedantic -Wconversion -Wshadow \\\n    -Werror -Wno-unused-function \"$source_file\" -o \"$executable\"\n\n# TEST: any failed assertion produces a nonzero status.\n\"$executable\"\n"
    }
  ]
};
