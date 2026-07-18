window.COURSE_CODE_MODULE = {
  "title": "Root Causes: Size, Length, and Terminators: code example",
  "codeIntro": "The comparison makes current length, total capacity, appended length, and terminator space separate parts of the contract.",
  "codeExamples": [
    {
      "title": "Vulnerable: append forgets terminator space",
      "language": "c",
      "blurb": "The content exactly fills the logical capacity, so writing the required terminator crosses into a physical guard byte.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

static bool append_text(char *dst, size_t capacity, size_t current_length,
                        const char *src, size_t src_length)
{
    if (dst == NULL || src == NULL || current_length > capacity ||
        src_length > capacity - current_length) {
        return false;
    }

    memmove(dst + current_length, src, src_length);
    /* IMPORTANT DEFECT: content may already occupy all capacity. */
    dst[current_length + src_length] = '\0';
    return true;
}

int main(void)
{
    char storage[9] = { 'N', 'A', 'M', 'E', '?', '?', '?', '?', 'G' };

    /* TEST: logical capacity is 8; storage[8] is a guard byte. */
    assert(append_text(storage, 8u, 4u, "1234", 4u));
    assert(storage[8] == '\0');
    return 0;
}
`
    },
    {
      "title": "Safer: reserve one byte for termination",
      "language": "c",
      "blurb": "Subtraction-based checks reject overflow and require the complete result plus one terminator to fit.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

static bool append_text(char *dst, size_t capacity, size_t current_length,
                        const char *src, size_t src_length)
{
    if (dst == NULL || src == NULL || capacity == 0u ||
        current_length >= capacity) {
        return false;
    }
    /* IMPORTANT FIX: available content space excludes the terminator. */
    if (src_length > capacity - current_length - 1u) {
        return false;
    }

    memmove(dst + current_length, src, src_length);
    dst[current_length + src_length] = '\0';
    return true;
}

int main(void)
{
    char text[8] = "NAME";
    char overlap[8] = "ABC";

    assert(append_text(text, sizeof text, 4u, "123", 3u));
    assert(strcmp(text, "NAME123") == 0);
    /* TEST: four appended bytes would leave no terminator slot. */
    assert(!append_text(text, sizeof text, 4u, "1234", 4u));
    /* TEST: overlapping input and append destination remain defined. */
    assert(append_text(overlap, sizeof overlap, 1u, overlap, 3u));
    assert(strcmp(overlap, "AABC") == 0);
    return 0;
}
`
    }
  ]
};
