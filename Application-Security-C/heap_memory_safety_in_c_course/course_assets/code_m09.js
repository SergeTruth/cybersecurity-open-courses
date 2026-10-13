window.COURSE_CODE_MODULE = {
  "title": "Detecting Heap Memory Defects",
  "codeIntro": "Run focused heap-lifecycle assertions under compiler warnings and sanitizers so regressions become repeatable failures.",
  "codeExamples": [
    {
      "title": "Heap lifecycle regression probe",
      "language": "c",
      "blurb": "A small linked-list application exercises multiple allocations, traversal, and centralized release for instrumentation to observe.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdint.h>\n#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct node {\n    int value;\n    struct node *next;\n} node;\n\nstatic bool list_push(node **head, int value)\n{\n    node *item = NULL;\n\n    if (head == NULL) {\n        return false;\n    }\n    item = malloc(sizeof *item);\n    if (item == NULL) {\n        return false;\n    }\n    item->value = value;\n    item->next = *head;\n    *head = item;\n    return true;\n}\n\nstatic bool list_sum(const node *head, int64_t *sum)\n{\n    int64_t result = 0;\n\n    if (sum == NULL) {\n        return false;\n    }\n    while (head != NULL) {\n        const int64_t current = (int64_t)head->value;\n\n        if ((current > 0 && result > INT64_MAX - current) ||\n            (current < 0 && result < INT64_MIN - current)) {\n            return false;\n        }\n        result += current;\n        head = head->next;\n    }\n    *sum = result;\n    return true;\n}\n\nstatic void list_clear(node **head)\n{\n    if (head != NULL) {\n        while (*head != NULL) {\n            node *released = *head;\n            *head = released->next;\n            free(released);\n        }\n    }\n}\n\nint main(void)\n{\n    node *head = NULL;\n    int64_t sum = 0;\n\n    /* TEST: instrumentation observes allocation, traversal, and cleanup. */\n    assert(list_push(&head, 10));\n    assert(list_push(&head, 20));\n    assert(list_push(&head, 30));\n    assert(list_sum(head, &sum) && sum == 60);\n    list_clear(&head);\n    assert(head == NULL);\n\n    /* IMPORTANT FIX: keep this regression path enabled in instrumented tests. */\n    assert(!list_push(NULL, 40));\n    assert(!list_sum(head, NULL));\n\n    puts(\"heap regression probe passed\");\n    return 0;\n}\n"
    },
    {
      "title": "Build and run with sanitizers",
      "language": "bash",
      "blurb": "Compile the exact C probe with strict warnings plus AddressSanitizer and UndefinedBehaviorSanitizer, then enable leak reporting for the run.",
      "code": "set -eu\n\ngcc -std=c17 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Werror   -fsanitize=address,undefined -fno-sanitize-recover=all -fno-omit-frame-pointer   heap_probe.c -o heap_probe\n\nASAN_OPTIONS=detect_leaks=1 ./heap_probe\n"
    }
  ]
};
