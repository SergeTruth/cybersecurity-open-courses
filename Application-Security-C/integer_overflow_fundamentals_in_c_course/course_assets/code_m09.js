window.COURSE_CODE_MODULE = {
  "title": "Tooling, Testing, and Code Review",
  "codeIntro": "Turn numeric boundaries into a repeatable regression probe, then build it with strict conversion warnings and undefined-behavior instrumentation.",
  "codeExamples": [
    {
      "title": "Decimal parser boundary probe",
      "language": "c",
      "blurb": "The parser checks each multiply-by-ten and digit addition, with tests at zero, the exact maximum, one above it, and malformed input.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>

static bool parse_u32_decimal(const char *text, size_t length, uint32_t *value)
{
    size_t i = 0U;
    uint32_t result = 0U;

    if (text == NULL || value == NULL || length == 0U) {
        return false;
    }
    for (i = 0U; i < length; ++i) {
        uint32_t digit = 0U;

        if (text[i] < '0' || text[i] > '9') {
            return false;
        }
        digit = (uint32_t)(text[i] - '0');
        if (result > (UINT32_MAX - digit) / 10U) {
            return false;
        }
        result = result * 10U + digit;
    }

    /* IMPORTANT FIX: publish only after every digit passed its boundary check. */
    *value = result;
    return true;
}

int main(void)
{
    uint32_t value = UINT32_C(77);

    /* TEST: zero and the exact uint32 maximum parse successfully. */
    assert(parse_u32_decimal("0", sizeof "0" - 1U, &value));
    assert(value == 0U);
    assert(parse_u32_decimal("4294967295", sizeof "4294967295" - 1U,
                             &value));
    assert(value == UINT32_MAX);

    /* TEST: maximum-plus-one, signs, letters, and empty input reject. */
    assert(!parse_u32_decimal("4294967296", sizeof "4294967296" - 1U,
                              &value));
    assert(!parse_u32_decimal("-1", sizeof "-1" - 1U, &value));
    assert(!parse_u32_decimal("12x", sizeof "12x" - 1U, &value));
    assert(!parse_u32_decimal("", 0U, &value));

    puts("numeric boundary probe passed");
    return 0;
}
`
    },
    {
      "title": "Build the boundary probe with tooling",
      "language": "bash",
      "blurb": "Compile the exact probe with the course warning policy and UndefinedBehaviorSanitizer, then execute its boundary assertions.",
      "code": `set -eu

gcc -std=c17 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Werror \
  -fsanitize=undefined -fno-sanitize-recover=undefined \
  integer_probe.c -o integer_probe

./integer_probe
`
    }
  ]
};
