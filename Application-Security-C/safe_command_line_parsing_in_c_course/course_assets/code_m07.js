window.COURSE_CODE_MODULE = {
  "title": "String Length, Encoding, and Buffer Safety",
  "codeIntro": "Compare silent fixed-buffer truncation with an all-or-nothing label import under an explicit character policy.",
  "codeExamples": [
    {
      "title": "Vulnerable: Silently truncate a command-line label",
      "language": "c",
      "blurb": "The copy stays within memory, but two distinct long labels collapse to the same internal value and can select the wrong resource.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

static bool store_label(const char *source, char *destination, size_t capacity)
{
    size_t i = 0u;

    if (source == NULL || destination == NULL || capacity == 0u) {
        return false;
    }

    /* IMPORTANT DEFECT: excess input is silently discarded. */
    while (i + 1u < capacity && source[i] != '\0') {
        destination[i] = source[i];
        i++;
    }
    destination[i] = '\0';
    return true;
}

int main(void)
{
    char first[8] = {0};
    char second[8] = {0};

    assert(store_label("release-a", first, sizeof first));
    assert(store_label("release-b", second, sizeof second));

    /* TEST: distinct labels are incorrectly stored as the same value. */
    assert(strcmp(first, "release") == 0);
    assert(strcmp(first, second) == 0);
    return 0;
}
`
    },
    {
      "title": "Safer: Reject labels that do not fit the contract",
      "language": "c",
      "blurb": "The corrected import validates the complete source length and a documented ASCII label alphabet before modifying the destination.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

static bool allowed_label_byte(char ch)
{
    return (ch >= 'a' && ch <= 'z') ||
           (ch >= 'A' && ch <= 'Z') ||
           (ch >= '0' && ch <= '9') || ch == '_' || ch == '-';
}

static bool store_label(const char *source, char *destination, size_t capacity)
{
    size_t length = 0u;

    if (source == NULL || destination == NULL || capacity == 0u) {
        return false;
    }
    while (source[length] != '\0') {
        if (length >= capacity - 1u || !allowed_label_byte(source[length])) {
            return false;
        }
        length++;
    }

    /* IMPORTANT FIX: copy only after the entire value satisfies the contract. */
    memmove(destination, source, length + 1u);
    return true;
}

int main(void)
{
    char label[8] = "keep";

    /* TEST: the maximum fitting ASCII label is accepted. */
    assert(store_label("job-123", label, sizeof label));
    assert(strcmp(label, "job-123") == 0);

    /* TEST: long or unsupported input is rejected without truncation. */
    assert(!store_label("release-a", label, sizeof label));
    assert(strcmp(label, "job-123") == 0);
    assert(!store_label("bad label", label, sizeof label));
    assert(strcmp(label, "job-123") == 0);
    {
        char overlap[16] = "job-123";
        assert(store_label(overlap, overlap + 1, sizeof overlap - 1u));
        assert(strcmp(overlap + 1, "job-123") == 0);
    }
    return 0;
}
`
    }
  ]
};
