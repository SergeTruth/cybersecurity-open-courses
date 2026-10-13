window.COURSE_CODE_MODULE = {
  "title": "Validating Environment Values",
  "codeIntro": "Parse a numeric setting according to its meaning, with an exact grammar and practical operational limits.",
  "codeExamples": [
    {
      "title": "Bounded decimal retry-limit parser",
      "language": "c",
      "blurb": "The parser accepts only decimal digits from 1 through 10 and explicitly rejects missing, empty, malformed, and out-of-range values.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

static bool parse_retry_limit(const char *value, size_t *out)
{
    size_t parsed = 0U;
    size_t index = 0U;

    if (value == NULL || out == NULL || value[0] == '\\0') {
        return false;
    }
    while (value[index] != '\\0') {
        size_t digit;

        if (index == 2U || value[index] < '0' || value[index] > '9') {
            return false;
        }
        digit = (size_t)(value[index] - '0');
        if (parsed > (SIZE_MAX - digit) / 10U) {
            return false;
        }
        parsed = parsed * 10U + digit;
        index++;
    }
    if (parsed < 1U || parsed > 10U) {
        return false;
    }
    /* IMPORTANT FIX: publish only a fully parsed, in-range value. */
    *out = parsed;
    return true;
}

int main(void)
{
    size_t retries = 7U;

    assert(parse_retry_limit("1", &retries) && retries == 1U);
    assert(parse_retry_limit("10", &retries) && retries == 10U);

    /* TEST: malformed and boundary violations leave the old value intact. */
    assert(!parse_retry_limit(NULL, &retries) && retries == 10U);
    assert(!parse_retry_limit("", &retries) && retries == 10U);
    assert(!parse_retry_limit("0", &retries) && retries == 10U);
    assert(!parse_retry_limit("11", &retries) && retries == 10U);
    assert(!parse_retry_limit("2x", &retries) && retries == 10U);
    assert(!parse_retry_limit("100", &retries) && retries == 10U);
    return 0;
}
`
    }
  ]
};
