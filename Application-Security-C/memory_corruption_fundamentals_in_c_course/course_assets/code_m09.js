window.COURSE_CODE_MODULE = {
  "title": "Detection, Tooling, and Review",
  "codeIntro": "A compact ring-buffer application turns invariants, full and empty boundaries, and wraparound behavior into executable regression tests.",
  "codeExamples": [
    {
      "title": "Boundary-focused ring-buffer regression tests",
      "language": "c",
      "blurb": "These are internal test assertions over a privately maintained ring. A defensive public API would use runtime rejection because NDEBUG removes assert checks.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n\nenum { RING_CAPACITY = 3 };\n\nstruct ring {\n    int values[RING_CAPACITY];\n    size_t head;\n    size_t count;\n};\n\nstatic bool ring_push(struct ring *queue, int value)\n{\n    size_t index = 0;\n\n    if (queue == NULL) {\n        return false;\n    }\n    /* IMPORTANT FIX: assertions expose internal memory invariants. */\n    assert(queue->head < RING_CAPACITY);\n    assert(queue->count <= RING_CAPACITY);\n    if (queue->count == RING_CAPACITY) {\n        return false;\n    }\n    index = (queue->head + queue->count) % RING_CAPACITY;\n    queue->values[index] = value;\n    queue->count += 1;\n    return true;\n}\n\nstatic bool ring_pop(struct ring *queue, int *result)\n{\n    if (queue == NULL || result == NULL || queue->count == 0) {\n        return false;\n    }\n    assert(queue->head < RING_CAPACITY);\n    assert(queue->count <= RING_CAPACITY);\n    *result = queue->values[queue->head];\n    queue->head = (queue->head + 1) % RING_CAPACITY;\n    queue->count -= 1;\n    return true;\n}\n\nint main(void)\n{\n    struct ring queue = {{0}, 0, 0};\n    int value = 0;\n\n    assert(!ring_pop(&queue, &value));\n    assert(ring_push(&queue, 10));\n    assert(ring_push(&queue, 20));\n    assert(ring_push(&queue, 30));\n    assert(!ring_push(&queue, 99));\n\n    /* TEST: remove, wrap, refill, and preserve FIFO order. */\n    assert(ring_pop(&queue, &value) && value == 10);\n    assert(ring_push(&queue, 40));\n    assert(ring_pop(&queue, &value) && value == 20);\n    assert(ring_pop(&queue, &value) && value == 30);\n    assert(ring_pop(&queue, &value) && value == 40);\n    assert(queue.count == 0);\n    return 0;\n}\n"
    },
    {
      "title": "Compile and run the exact regression application",
      "language": "bash",
      "blurb": "Pass the extracted C listing as the only argument; strict diagnostics are always enabled and sanitizers can be added when the toolchain supports them.",
      "code": "#!/usr/bin/env bash\nset -eu\n\nif [ \"$#\" -ne 1 ]; then\n    echo \"usage: $0 path-to-test-source.c\" >&2\n    exit 2\nfi\n\nsource_file=$1\ncompiler=${CC:-gcc}\ntemporary_directory=$(mktemp -d)\ntrap 'rm -rf \"$temporary_directory\"' EXIT\nexecutable=$temporary_directory/memory-tests\nextra_flags=()\n\nif [ \"${SANITIZE:-0}\" = 1 ]; then\n    extra_flags=(-fsanitize=address,undefined)\nfi\n\n# IMPORTANT FIX: warnings and optional sanitizers inspect the exact test source.\n\"$compiler\" -std=c17 -Wall -Wextra -Wpedantic -Wconversion -Wshadow \\\n    -Werror -Wno-unused-function \"${extra_flags[@]}\" \\\n    \"$source_file\" -o \"$executable\"\n\n# TEST: assertion or sanitizer failures produce a nonzero status.\n\"$executable\"\n"
    }
  ]
};
