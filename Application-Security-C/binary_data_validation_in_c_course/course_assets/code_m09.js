window.COURSE_CODE_MODULE = {
  "title": "Testing, Fuzzing, and Review Practices: code example",
  "codeIntro": "A self-contained corpus test makes rejection rules executable, then a mutation loop exercises combinations around a known-valid frame.",
  "codeExamples": [
    {
      "title": "Boundary corpus and deterministic mutations",
      "language": "c",
      "blurb": "The complete test application covers empty, truncated, inconsistent, and unsupported inputs before mutating every byte of a valid seed.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

static bool validate_frame(const uint8_t *data, size_t length)
{
    size_t payload_length;

    if (data == NULL || length < 4u || data[0] != 'B' ||
        data[1] != 'D' || data[2] != 1u) {
        return false;
    }
    payload_length = data[3];
    return payload_length == length - 4u;
}

struct test_case {
    const uint8_t *data;
    size_t length;
    bool expected;
};

int main(void)
{
    const uint8_t short_header[] = { 'B', 'D', 1u };
    const uint8_t valid[] = { 'B', 'D', 1u, 2u, 'O', 'K' };
    const uint8_t truncated[] = { 'B', 'D', 1u, 3u, 'O', 'K' };
    const uint8_t unsupported[] = { 'B', 'D', 2u, 2u, 'O', 'K' };
    const struct test_case corpus[] = {
        { NULL, 0u, false },
        { short_header, sizeof short_header, false },
        { valid, sizeof valid, true },
        { truncated, sizeof truncated, false },
        { unsupported, sizeof unsupported, false }
    };
    uint8_t mutation[] = { 'B', 'D', 1u, 2u, 'O', 'K' };
    size_t index;

    /* TEST: known samples preserve intentional accept/reject behavior. */
    for (index = 0u; index < sizeof corpus / sizeof corpus[0]; index++) {
        assert(validate_frame(corpus[index].data, corpus[index].length) ==
               corpus[index].expected);
    }
    /* TEST: mutate every byte; sanitizers watch for unsafe behavior. */
    for (index = 0u; index < sizeof mutation; index++) {
        mutation[index] ^= 0xffu;
        (void)validate_frame(mutation, sizeof mutation);
        mutation[index] ^= 0xffu;
    }
    return 0;
}
`
    },
    {
      "title": "Strict sanitizer build and test run",
      "language": "bash",
      "blurb": "Using binary_validation_test.c as an illustrative filename for the test above, compile with strict diagnostics and run it under ASan and UBSan.",
      "code": String.raw`cc -std=c17 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Werror \
  -fsanitize=address,undefined -fno-omit-frame-pointer \
  binary_validation_test.c -o binary_validation_test

ASAN_OPTIONS=detect_leaks=1:halt_on_error=1 \
UBSAN_OPTIONS=halt_on_error=1 \
  ./binary_validation_test`
    }
  ]
};
