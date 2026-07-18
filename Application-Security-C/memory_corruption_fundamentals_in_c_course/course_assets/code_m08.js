window.COURSE_CODE_MODULE = {
  "title": "Defensive Design Patterns",
  "codeIntro": "A buffer type keeps the storage pointer, current element count, and total capacity in one reviewable contract.",
  "codeExamples": [
    {
      "title": "Keep pointer, count, and capacity together",
      "language": "c",
      "blurb": "The append operation rejects inconsistent state and a full buffer before writing, then updates the count only after the byte is stored.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdint.h>\n\nstruct byte_buffer {\n    uint8_t *data;\n    size_t count;\n    size_t capacity;\n};\n\nstatic bool append_byte(struct byte_buffer *buffer, uint8_t value)\n{\n    if (buffer == NULL || buffer->data == NULL ||\n        buffer->count > buffer->capacity) {\n        return false;\n    }\n    if (buffer->count == buffer->capacity) {\n        return false;\n    }\n\n    /* IMPORTANT FIX: count is both the next index and committed length. */\n    buffer->data[buffer->count] = value;\n    buffer->count += 1;\n    return true;\n}\n\nint main(void)\n{\n    uint8_t storage[3] = {0};\n    struct byte_buffer output = {storage, 0, sizeof storage};\n\n    assert(append_byte(&output, 10u));\n    assert(append_byte(&output, 20u));\n    assert(append_byte(&output, 30u));\n    assert(output.count == 3 && storage[2] == 30u);\n\n    /* TEST: a full or internally inconsistent buffer is rejected. */\n    assert(!append_byte(&output, 40u));\n    assert(output.count == 3 && storage[2] == 30u);\n    output.count = 4;\n    assert(!append_byte(&output, 50u));\n    return 0;\n}\n"
    }
  ]
};
