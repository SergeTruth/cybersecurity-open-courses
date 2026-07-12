window.COURSE_CODE_MODULE = {
  "title": "Code Example: Boundary Tests for Rejection",
  "codeExamples": [
    {
      "title": "Boundary Tests for Rejection",
      "language": "c",
      "code": String.raw`#include <assert.h>
#include <errno.h>
#include <stdlib.h>

static int canonical_count_text(const char *text)
{
    size_t index;

    if (text == NULL || text[0] < '1' || text[0] > '9') {
        return 0;
    }
    for (index = 1U; text[index] != '\0'; index++) {
        if (text[index] < '0' || text[index] > '9') {
            return 0;
        }
    }
    return 1;
}

int parse_count(const char *text, int *count)
{
    char *end = NULL;
    long value;

    if (count == NULL || !canonical_count_text(text)) {
        return -1;
    }

    errno = 0;
    value = strtol(text, &end, 10);
    if (errno != 0 || end == text || *end != '\0' ||
        value < 1L || value > 100L) {
        return -1;
    }

    *count = (int)value;
    return 0;
}

static void expect_rejected_unchanged(const char *text)
{
    int value = 77;

    assert(parse_count(text, &value) != 0);
    assert(value == 77);
}

/* These tests must be compiled without NDEBUG so assert remains active. */
static void test_parse_count(void)
{
    int value = 0;

    assert(parse_count("1", &value) == 0 && value == 1);
    assert(parse_count("100", &value) == 0 && value == 100);

    expect_rejected_unchanged("0");
    expect_rejected_unchanged("101");
    expect_rejected_unchanged("-1");
    expect_rejected_unchanged("12x");
    expect_rejected_unchanged("");
    expect_rejected_unchanged(" 1");
    expect_rejected_unchanged("+1");
    expect_rejected_unchanged("999999999999999999999999999999999999");
    expect_rejected_unchanged(NULL);
    assert(parse_count("1", NULL) != 0);
}

int main(void)
{
    test_parse_count();
    return 0;
}
`
    }
  ]
};
