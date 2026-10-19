window.COURSE_CODE_MODULE = {
  "title": "Measurement, Testing, and Tool Support",
  "codeIntro": "Measure current and peak heap use, force a specific allocation to fail, and run the regression probe with strict warnings and sanitizers.",
  "codeExamples": [
    {
      "title": "Track heap peaks and injected failure",
      "language": "c",
      "blurb": "A small tracker records live blocks, current bytes, peak bytes, and a deterministic failure point without hiding ownership cleanup.",
      "code": `/* Test checks are active even with -DNDEBUG; each expression runs once. */
#define CHECK(condition) do { if (!(condition)) { \\
    (void)fprintf(stderr, "check failed: %s at line %d\\n", \\
                  #condition, __LINE__); return 1; \\
} } while (0)
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

#define TRACKED_BLOCKS 4U

typedef struct {
    void *pointer;
    size_t size;
} tracked_block;

typedef struct {
    tracked_block blocks[TRACKED_BLOCKS];
    size_t calls;
    size_t fail_on_call;
    size_t current_bytes;
    size_t peak_bytes;
} memory_tracker;

static void *tracked_allocate(memory_tracker *tracker, size_t size)
{
    size_t i = 0U;
    void *block = NULL;

    if (tracker == NULL || size == 0U ||
        size > SIZE_MAX - tracker->current_bytes || tracker->calls == SIZE_MAX) {
        return NULL;
    }
    tracker->calls += 1U;
    if (tracker->calls == tracker->fail_on_call) {
        return NULL;
    }
    for (i = 0U; i < TRACKED_BLOCKS; ++i) {
        if (tracker->blocks[i].pointer == NULL) {
            block = malloc(size);
            if (block == NULL) {
                return NULL;
            }
            tracker->blocks[i].pointer = block;
            tracker->blocks[i].size = size;
            tracker->current_bytes += size;
            if (tracker->current_bytes > tracker->peak_bytes) {
                tracker->peak_bytes = tracker->current_bytes;
            }
            return block;
        }
    }
    return NULL;
}

static bool tracked_release(memory_tracker *tracker, void **owner)
{
    size_t i = 0U;

    if (tracker == NULL || owner == NULL || *owner == NULL) {
        return false;
    }
    for (i = 0U; i < TRACKED_BLOCKS; ++i) {
        if (tracker->blocks[i].pointer == *owner) {
            free(*owner);
            *owner = NULL;
            tracker->current_bytes -= tracker->blocks[i].size;
            tracker->blocks[i].pointer = NULL;
            tracker->blocks[i].size = 0U;
            return true;
        }
    }
    return false;
}

int main(void)
{
    memory_tracker tracker = { { { NULL, 0U } }, 0U, 0U, 0U, 0U };
    void *first = tracked_allocate(&tracker, 8U);
    void *second = tracked_allocate(&tracker, 12U);
    void *third = NULL;

    /* TEST: the tracker reports current and peak release-build behavior. */
    CHECK(first != NULL && second != NULL);
    CHECK(tracker.current_bytes == 20U && tracker.peak_bytes == 20U);
    CHECK(tracked_release(&tracker, &first));
    CHECK(tracker.current_bytes == 12U);
    third = tracked_allocate(&tracker, 4U);
    CHECK(third != NULL && tracker.current_bytes == 16U);
    CHECK(tracker.peak_bytes == 20U);

    /* IMPORTANT FIX: force the next allocation failure and verify safe state. */
    tracker.fail_on_call = tracker.calls + 1U;
    CHECK(tracked_allocate(&tracker, 6U) == NULL);
    CHECK(tracker.current_bytes == 16U && tracker.peak_bytes == 20U);

    CHECK(tracked_release(&tracker, &second));
    CHECK(tracked_release(&tracker, &third));
    CHECK(tracker.current_bytes == 0U);

    puts("memory measurement probe passed");
    return 0;
}
`
    },
    {
      "title": "Build and run the measurement probe",
      "language": "bash",
      "blurb": "Compile the exact tracker with the course warning policy plus AddressSanitizer and UndefinedBehaviorSanitizer, then execute checks that remain active with NDEBUG. The toolchain must support the selected sanitizers.",
      "code": `set -eu

gcc -std=c17 -O2 -DNDEBUG -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Werror \\
  -fsanitize=address,undefined -fno-omit-frame-pointer \\
  memory_probe.c -o memory_probe

ASAN_OPTIONS=detect_leaks=1 ./memory_probe
`
    }
  ]
};
