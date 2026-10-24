window.COURSE_CODE_MODULE = {
  "title": "Testing, Fuzzing, Logging, and Review",
  "codeIntro": "A self-contained TLV parser and malformed-input corpus make empty, truncated, duplicate, unknown, and valid cases executable under strict tools.",
  "codeExamples": [
    {
      "title": "Corpus-style tests for a TLV parser",
      "language": "c",
      "blurb": "The parser uses remaining-length checks, bounds each value, rejects duplicate or unsupported tags, and requires the primary field.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdint.h>\n\nstatic bool valid_tlv_message(const uint8_t *data, size_t length)\n{\n    size_t offset = 0;\n    bool saw_primary = false;\n    bool saw_secondary = false;\n\n    if (data == NULL || length == 0) {\n        return false;\n    }\n    while (offset < length) {\n        uint8_t tag = 0;\n        size_t value_length = 0;\n\n        /* IMPORTANT FIX: prove header and value extents before advancing. */\n        if (length - offset < 2) {\n            return false;\n        }\n        tag = data[offset];\n        value_length = data[offset + 1];\n        offset += 2;\n        if (value_length > 4 || value_length > length - offset) {\n            return false;\n        }\n        if (tag == 1u && !saw_primary) {\n            saw_primary = true;\n        } else if (tag == 2u && !saw_secondary) {\n            saw_secondary = true;\n        } else {\n            return false;\n        }\n        offset += value_length;\n    }\n    return saw_primary;\n}\n\nint main(void)\n{\n    const uint8_t valid[] = {1u, 1u, 7u, 2u, 2u, 8u, 9u};\n    const uint8_t truncated[] = {1u, 2u, 7u};\n    const uint8_t duplicate[] = {1u, 1u, 7u, 1u, 1u, 8u};\n    const uint8_t unknown[] = {9u, 1u, 7u};\n\n    assert(valid_tlv_message(valid, sizeof valid));\n\n    /* TEST: the malformed corpus exercises distinct rejection paths. */\n    assert(!valid_tlv_message(NULL, 0));\n    assert(!valid_tlv_message(truncated, sizeof truncated));\n    assert(!valid_tlv_message(duplicate, sizeof duplicate));\n    assert(!valid_tlv_message(unknown, sizeof unknown));\n    return 0;\n}\n"
    },
    {
      "title": "Build and run the exact parser corpus",
      "language": "bash",
      "blurb": "Pass the extracted C listing as the only argument; strict diagnostics are always enabled and sanitizers can be added when supported.",
      "code": "#!/usr/bin/env bash\nset -eu\n\nif [ \"$#\" -ne 1 ]; then\n    echo \"usage: $0 path-to-test-source.c\" >&2\n    exit 2\nfi\n\nsource_file=$1\ncompiler=${CC:-gcc}\ntemporary_directory=$(mktemp -d)\ntrap 'rm -rf \"$temporary_directory\"' EXIT\nexecutable=$temporary_directory/parser-corpus\nextra_flags=()\n\nif [ \"${SANITIZE:-0}\" = 1 ]; then\n    extra_flags=(-fsanitize=address,undefined)\nfi\n\n# IMPORTANT FIX: diagnostics inspect the exact parser and corpus source.\n\"$compiler\" -std=c17 -Wall -Wextra -Wpedantic -Wconversion -Wshadow \\\n    -Werror -Wno-unused-function \"${extra_flags[@]}\" \\\n    \"$source_file\" -o \"$executable\"\n\n# TEST: warnings, sanitizer findings, and assertions return nonzero.\n\"$executable\"\n"
    }
  ]
};
