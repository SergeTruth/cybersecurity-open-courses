window.COURSE_CODE_MODULE = {
  "title": "Tooling, Testing, and Review Practices: code example",
  "codeIntro": "Boundary assertions make the range contract executable, while strict warnings and sanitizers add mechanical checks around it.",
  "codeExamples": [
    {
      "title": "Boundary tests for complete ranges",
      "language": "c",
      "blurb": "This self-contained test covers empty and exact ranges, overrun cases, and near-SIZE_MAX inputs without relying on unchecked addition.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

static bool range_is_valid(size_t length, size_t offset, size_t width)
{
    /* IMPORTANT CHECK: subtraction occurs only after offset is in range. */
    return offset <= length && width <= length - offset;
}

int main(void)
{
    /* TESTS: empty, exact-fit, overrun, and overflow-adjacent boundaries. */
    assert(range_is_valid(0u, 0u, 0u));
    assert(range_is_valid(8u, 3u, 5u));
    assert(!range_is_valid(8u, 3u, 6u));
    assert(!range_is_valid(8u, 9u, 0u));
    assert(!range_is_valid(8u, 7u, 2u));
    assert(range_is_valid(SIZE_MAX, SIZE_MAX - 1u, 1u));
    assert(!range_is_valid(SIZE_MAX, SIZE_MAX - 1u, 2u));
    return 0;
}
`
    },
    {
      "title": "Strict build and sanitizer run",
      "language": "bash",
      "blurb": "Using bounds_test.c and bounds_test as illustrative filenames for the test above, compile with strict diagnostics and run under ASan and UBSan.",
      "code": String.raw`cc -std=c17 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Werror \
  -fsanitize=address,undefined -fno-omit-frame-pointer \
  bounds_test.c -o bounds_test

ASAN_OPTIONS=detect_leaks=1:halt_on_error=1 \
UBSAN_OPTIONS=halt_on_error=1 \
  ./bounds_test`
    }
  ]
};
