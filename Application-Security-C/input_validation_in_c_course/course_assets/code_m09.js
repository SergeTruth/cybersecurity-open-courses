window.COURSE_CODE_MODULE = {
  "title": "Review, Testing, and Tool Support",
  "codeIntro": "Turn a binary-message contract into boundary and malformed-input regression tests, then compile and run those exact tests with strict diagnostics.",
  "codeExamples": [
    {
      "title": "Boundary and malformed-message regression tests",
      "language": "c",
      "blurb": "The test application covers empty input, short headers, both payload boundaries, inconsistent lengths, unsupported versions, and reserved flags.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdint.h>\n\nstatic bool valid_message(const uint8_t *data, size_t length)\n{\n    const size_t header_length = 4;\n    size_t payload_length = 0;\n\n    if (data == NULL || length < header_length) {\n        return false;\n    }\n    if (data[0] != 1u || data[1] != 0u) {\n        return false;\n    }\n    payload_length = ((size_t)data[2] << 8) | (size_t)data[3];\n\n    /* IMPORTANT FIX: check the policy bound and exact structure. */\n    if (payload_length > 16 || payload_length != length - header_length) {\n        return false;\n    }\n    return true;\n}\n\nint main(void)\n{\n    const uint8_t empty_payload[] = {1u, 0u, 0u, 0u};\n    const uint8_t one_byte[] = {1u, 0u, 0u, 1u, 0xa5u};\n    const uint8_t max_payload[20] = {1u, 0u, 0u, 16u};\n    const uint8_t too_large[21] = {1u, 0u, 0u, 17u};\n    const uint8_t short_header[] = {1u, 0u, 0u};\n    const uint8_t truncated[] = {1u, 0u, 0u, 2u, 0xa5u};\n    const uint8_t trailing[] = {1u, 0u, 0u, 0u, 0xa5u};\n    const uint8_t bad_version[] = {2u, 0u, 0u, 0u};\n    const uint8_t reserved_flag[] = {1u, 1u, 0u, 0u};\n\n    assert(valid_message(empty_payload, sizeof empty_payload));\n    assert(valid_message(one_byte, sizeof one_byte));\n    assert(valid_message(max_payload, sizeof max_payload));\n\n    /* TEST: every important rejection boundary has a regression check. */\n    assert(!valid_message(NULL, 0));\n    assert(!valid_message(short_header, sizeof short_header));\n    assert(!valid_message(too_large, sizeof too_large));\n    assert(!valid_message(truncated, sizeof truncated));\n    assert(!valid_message(trailing, sizeof trailing));\n    assert(!valid_message(bad_version, sizeof bad_version));\n    assert(!valid_message(reserved_flag, sizeof reserved_flag));\n    return 0;\n}\n"
    },
    {
      "title": "Build and run the exact regression test application",
      "language": "bash",
      "blurb": "Pass the extracted C listing as the only argument; the script treats warnings as errors, optionally enables AddressSanitizer and UndefinedBehaviorSanitizer, and runs the resulting tests.",
      "code": "#!/usr/bin/env bash\nset -eu\n\nif [ \"$#\" -ne 1 ]; then\n    echo \"usage: $0 path-to-test-source.c\" >&2\n    exit 2\nfi\n\nsource_file=$1\ncompiler=${CC:-gcc}\ntemporary_directory=$(mktemp -d)\ntrap 'rm -rf \"$temporary_directory\"' EXIT\nexecutable=$temporary_directory/validation-tests\nextra_flags=()\n\nif [ \"${SANITIZE:-0}\" = 1 ]; then\n    extra_flags=(-fsanitize=address,undefined -fno-sanitize-recover=all)\nfi\n\n# IMPORTANT FIX: strict diagnostics apply to the exact source under test.\n\"$compiler\" -std=c17 -Wall -Wextra -Wpedantic -Wconversion -Wshadow \\\n    -Werror -Wno-unused-function \"${extra_flags[@]}\" \\\n    \"$source_file\" -o \"$executable\"\n\n# TEST: assertion failures make this command return a failure status.\n\"$executable\"\n"
    }
  ]
};
