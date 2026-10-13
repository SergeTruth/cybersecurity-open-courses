window.COURSE_CODE_MODULE = {
  "title": "What Makes a String API Safer",
  "codeIntro": "Expose destination capacity, required size, termination behavior, and failure status in one reviewable contract.",
  "codeExamples": [
    {
      "title": "Return status and required size from a text copy",
      "language": "c",
      "blurb": "The API reports exact storage requirements, guarantees an empty terminated result after a capacity failure, and never hides truncation.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <string.h>

typedef enum {
    TEXT_OK,
    TEXT_INVALID_ARGUMENT,
    TEXT_NO_SPACE
} TextStatus;

typedef struct {
    TextStatus status;
    size_t required;
} TextResult;

static TextResult copy_text(char *destination, size_t capacity,
                            const char *source)
{
    size_t length = 0u;
    TextResult result = {TEXT_INVALID_ARGUMENT, 0u};

    if (destination == NULL || capacity == 0u || source == NULL) {
        return result;
    }
    while (source[length] != '\0') {
        if (length == SIZE_MAX - 1u) {
            return result;
        }
        length++;
    }
    result.required = length + 1u;

    /* IMPORTANT FIX: failure is explicit and still leaves valid empty text. */
    if (result.required > capacity) {
        destination[0] = '\0';
        result.status = TEXT_NO_SPACE;
        return result;
    }

    /* Source and destination may overlap, including an in-place copy. */
    memmove(destination, source, result.required);
    result.status = TEXT_OK;
    return result;
}

int main(void)
{
    char exact[5] = {0};
    char short_buffer[4] = "old";
    char overlap[16] = "four";
    TextResult result = copy_text(exact, sizeof exact, "four");

    /* TEST: exact fit includes the terminator and reports required storage. */
    assert(result.status == TEXT_OK);
    assert(result.required == sizeof exact);
    assert(strcmp(exact, "four") == 0);

    /* TEST: insufficient and invalid calls expose distinct failure states. */
    result = copy_text(short_buffer, sizeof short_buffer, "four");
    assert(result.status == TEXT_NO_SPACE && result.required == 5u);
    assert(short_buffer[0] == '\0');
    result = copy_text(NULL, 0u, "four");
    assert(result.status == TEXT_INVALID_ARGUMENT);
    result = copy_text(overlap + 1, sizeof overlap - 1u, overlap);
    assert(result.status == TEXT_OK && strcmp(overlap + 1, "four") == 0);
    result = copy_text(overlap, sizeof overlap, overlap + 1);
    assert(result.status == TEXT_OK && strcmp(overlap, "four") == 0);
    return 0;
}
`
    }
  ]
};
