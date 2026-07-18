window.COURSE_CODE_MODULE = {
  "title": "Detecting Double-Free Risks",
  "codeIntro": "Turn the ownership contract into regression assertions, then compile and run that exact test program with strict diagnostics.",
  "codeExamples": [
    {
      "title": "Cleanup regression application",
      "language": "c",
      "blurb": "The tests cover successful construction, partial-construction failure, and a repeated cleanup attempt while counting real releases.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdlib.h>

struct response {
    unsigned char *body;
    size_t body_len;
};

static size_t completed_destroys = 0U;

static bool response_destroy(struct response **slot)
{
    if (slot == NULL || *slot == NULL) {
        return false;
    }
    free((*slot)->body);
    free(*slot);
    *slot = NULL;
    completed_destroys++;
    return true;
}

static bool response_create(size_t body_len, bool fail_after_object,
                            struct response **out)
{
    struct response *response;

    if (out == NULL || *out != NULL || body_len == 0U) {
        return false;
    }
    response = calloc(1U, sizeof *response);
    if (response == NULL) {
        return false;
    }
    if (fail_after_object) {
        /* TEST: exercise the partial-construction cleanup branch. */
        (void)response_destroy(&response);
        return false;
    }
    response->body = calloc(body_len, 1U);
    if (response->body == NULL) {
        (void)response_destroy(&response);
        return false;
    }
    response->body_len = body_len;
    *out = response;
    return true;
}

int main(void)
{
    struct response *response = NULL;
    struct response *existing;

    assert(!response_create(16U, true, &response));
    assert(response == NULL && completed_destroys == 1U);

    assert(response_create(16U, false, &response));
    assert(response != NULL && response->body_len == 16U);
    existing = response;
    /* TEST: a nonempty owner slot is rejected without losing its object. */
    assert(!response_create(8U, false, &response));
    assert(response == existing && response->body_len == 16U);
    assert(completed_destroys == 1U);
    assert(response_destroy(&response));
    assert(response == NULL && completed_destroys == 2U);

    /* IMPORTANT FIX: the contract rejects a second release attempt. */
    assert(!response_destroy(&response));
    assert(completed_destroys == 2U);
    return 0;
}
`
    },
    {
      "title": "Strict build and regression run",
      "language": "bash",
      "blurb": "Assertions check the cleanup contract while AddressSanitizer, LeakSanitizer, and UndefinedBehaviorSanitizer check the same paths for hidden memory errors.",
      "code": `set -eu
cc="\${CC:-gcc}"
"$cc" -std=c17 -Wall -Wextra -Wpedantic -Wconversion -Wshadow \\
  -Werror -Wno-unused-function \\
  -fsanitize=address,undefined -fno-omit-frame-pointer \\
  example.c -o example
ASAN_OPTIONS=detect_leaks=1:halt_on_error=1 \\
UBSAN_OPTIONS=halt_on_error=1 \\
./example
`
    }
  ]
};
