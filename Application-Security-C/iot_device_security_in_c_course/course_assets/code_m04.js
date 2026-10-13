window.COURSE_CODE_MODULE = {
  "title": "Memory Safety and Input Parsing in C",
  "codeIntro": "Narrow protocol fields must not replace full-width bounds checks on the buffers that actually receive input.",
  "codeExamples": [
    {
      "title": "Vulnerable: narrow a received length before checking it",
      "language": "c",
      "blurb": "Converting 256 to an eight-bit length produces zero, so the check passes before a 256-byte copy crosses the command buffer's logical boundary.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdint.h>\n#include <string.h>\n\nstatic bool receive_command(uint8_t *destination, size_t capacity,\n                            const uint8_t *input, size_t input_length)\n{\n    uint8_t protocol_length = 0;\n\n    if (destination == NULL || input == NULL) {\n        return false;\n    }\n    protocol_length = (uint8_t)input_length;\n\n    /* IMPORTANT DEFECT: the narrowing conversion happens before the check. */\n    if ((size_t)protocol_length > capacity) {\n        return false;\n    }\n    memcpy(destination, input, input_length);\n    return true;\n}\n\nint main(void)\n{\n    uint8_t source[256];\n    uint8_t physical_storage[257];\n\n    (void)memset(source, 'A', sizeof source);\n    (void)memset(physical_storage, 0, sizeof physical_storage);\n    physical_storage[8] = (uint8_t)'#';\n\n    assert(receive_command(physical_storage, 8, source, sizeof source));\n\n    /* TEST: the copy remains allocated but overwrites the logical guard. */\n    assert(physical_storage[8] == (uint8_t)'A');\n    return 0;\n}\n"
    },
    {
      "title": "Safer: check the full-width length before copying",
      "language": "c",
      "blurb": "The implementation compares size_t values against the product's command capacity and rejects oversized input before any copy.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdint.h>\n#include <string.h>\n\nstatic bool receive_command(uint8_t *destination, size_t capacity,\n                            const uint8_t *input, size_t input_length)\n{\n    if (destination == NULL || input == NULL) {\n        return false;\n    }\n\n    /* IMPORTANT FIX: validate the exact size that controls memcpy. */\n    if (input_length > capacity) {\n        return false;\n    }\n    /* Overlap is allowed for in-place command-buffer processing. */\n    memmove(destination, input, input_length);\n    return true;\n}\n\nint main(void)\n{\n    const uint8_t short_command[] = {'S', 'T', 'A', 'T'};\n    uint8_t oversized[256];\n    uint8_t physical_storage[257] = {0};\n\n    (void)memset(oversized, 'A', sizeof oversized);\n    physical_storage[8] = (uint8_t)'#';\n\n    assert(receive_command(physical_storage, 8, short_command,\n                           sizeof short_command));\n    assert(memcmp(physical_storage, \"STAT\", sizeof short_command) == 0);\n\n    /* TEST: oversized input is rejected without changing the guard. */\n    assert(!receive_command(physical_storage, 8, oversized,\n                            sizeof oversized));\n    assert(physical_storage[8] == (uint8_t)'#');\n    /* TEST: overlapping command-buffer views are supported. */\n    {\n        uint8_t overlap[8] = {1, 2, 3};\n        assert(receive_command(overlap + 1, sizeof overlap - 1u, overlap, 3u));\n        assert(overlap[1] == 1 && overlap[2] == 2 && overlap[3] == 3);\n    }\n    return 0;\n}\n"
    }
  ]
};
