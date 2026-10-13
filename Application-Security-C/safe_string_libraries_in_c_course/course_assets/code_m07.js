window.COURSE_CODE_MODULE = {
  "title": "Portability and Platform Differences",
  "codeIntro": "Use a small ISO C wrapper with one documented contract instead of assuming similarly named platform length functions behave identically.",
  "codeExamples": [
    {
      "title": "Normalize bounded string-length behavior",
      "language": "c",
      "blurb": "The project wrapper reports whether termination occurred inside the supplied object and never silently treats unterminated bytes as a valid string.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

typedef enum {
    LENGTH_OK,
    LENGTH_UNTERMINATED,
    LENGTH_INVALID_ARGUMENT
} LengthStatus;

static LengthStatus bounded_string_length(const char *text, size_t capacity,
                                          size_t *length)
{
    size_t i = 0u;

    if (text == NULL || length == NULL) {
        return LENGTH_INVALID_ARGUMENT;
    }
    for (i = 0u; i < capacity; i++) {
        if (text[i] == '\0') {
            *length = i;
            return LENGTH_OK;
        }
    }

    /* IMPORTANT FIX: the portable wrapper exposes missing termination. */
    return LENGTH_UNTERMINATED;
}

int main(void)
{
    const char exact[] = {'a', 'b', 'c', '\0'};
    const char empty[] = {'\0'};
    const char raw_bytes[] = {'a', 'b', 'c', 'd'};
    size_t length = 99u;

    /* TEST: terminated empty and exact-boundary strings report their length. */
    assert(bounded_string_length(empty, sizeof empty, &length) == LENGTH_OK);
    assert(length == 0u);
    assert(bounded_string_length(exact, sizeof exact, &length) == LENGTH_OK);
    assert(length == 3u);

    /* TEST: bytes without a terminator and invalid pointers remain distinct. */
    assert(bounded_string_length(raw_bytes, sizeof raw_bytes, &length) ==
           LENGTH_UNTERMINATED);
    assert(bounded_string_length(NULL, 0u, &length) ==
           LENGTH_INVALID_ARGUMENT);
    return 0;
}
`
    }
  ]
};
