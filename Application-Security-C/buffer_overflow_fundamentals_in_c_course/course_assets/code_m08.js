window.COURSE_CODE_MODULE = {
  "title": "Compiler, Runtime, and Testing Support: code example",
  "codeIntro": "Boundary assertions exercise the same exact-fit and one-too-large decisions that strict warnings and sanitizers inspect mechanically.",
  "codeExamples": [
    {
      "title": "Self-contained buffer boundary tests",
      "language": "c",
      "blurb": "This complete test application covers an empty copy, exact fit, overlong input, null handling, and an unchanged guard byte.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

static bool copy_bytes(unsigned char *dst, size_t capacity,
                       const unsigned char *src, size_t length)
{
    if (dst == NULL || (src == NULL && length != 0u) || length > capacity) {
        return false;
    }
    if (length != 0u) {
        memmove(dst, src, length);
    }
    return true;
}

int main(void)
{
    const unsigned char source[] = { 1u, 2u, 3u, 4u, 5u };
    unsigned char storage[] = { 0u, 0u, 0u, 0u, 0xccu };
    unsigned char overlap[] = { 1u, 2u, 3u, 4u, 5u };

    /* TEST: empty input and exact capacity are accepted. */
    assert(copy_bytes(storage, 4u, NULL, 0u));
    assert(copy_bytes(storage, 4u, source, 4u));
    assert(storage[0] == 1u && storage[3] == 4u);
    /* TEST: one byte too many fails without changing the guard. */
    assert(!copy_bytes(storage, 4u, source, sizeof source));
    assert(!copy_bytes(NULL, 4u, source, 1u));
    assert(storage[4] == 0xccu);
    /* TEST: overlapping source and destination use defined movement. */
    assert(copy_bytes(overlap + 1u, 4u, overlap, 4u));
    assert(overlap[1] == 1u && overlap[4] == 4u);
    return 0;
}
`
    },
    {
      "title": "Strict warnings and sanitizer execution",
      "language": "bash",
      "blurb": "Using buffer_boundary_test.c as an illustrative filename for the test above, compile with strict diagnostics and run under ASan and UBSan.",
      "code": String.raw`cc -std=c17 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Werror \
  -fsanitize=address,undefined -fno-omit-frame-pointer \
  buffer_boundary_test.c -o buffer_boundary_test

ASAN_OPTIONS=detect_leaks=1:halt_on_error=1 \
UBSAN_OPTIONS=halt_on_error=1 \
  ./buffer_boundary_test`
    }
  ]
};
