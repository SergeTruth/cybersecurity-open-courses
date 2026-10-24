window.COURSE_CODE_MODULE = {
  "title": "Reallocation and Resizing Risks: code example",
  "codeIntro": "A deterministic allocation-failure hook shows why realloc results and capacity metadata must be committed together.",
  "codeExamples": [
    {
      "title": "Vulnerable: overwrite the owner during resize",
      "language": "c",
      "blurb": "Direct assignment loses the only owning handle on failure, while an early metadata update falsely advertises the requested capacity.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdlib.h>

static void *test_realloc(void *memory, size_t size, bool fail)
{
    if (fail) {
        return NULL;
    }
    return realloc(memory, size);
}

static bool resize_vulnerable(unsigned char **data, size_t *capacity,
                              size_t requested, bool fail)
{
    if (data == NULL || capacity == NULL || requested == 0u) {
        return false;
    }

    *capacity = requested;
    /* IMPORTANT DEFECT: failure overwrites the only owner with NULL. */
    *data = test_realloc(*data, requested, fail);
    return *data != NULL;
}

int main(void)
{
    unsigned char *data = malloc(8u);
    unsigned char *saved_for_test = NULL;
    size_t capacity = 8u;

    assert(data != NULL);
    data[0] = 0x5au;
    saved_for_test = data;

    assert(!resize_vulnerable(&data, &capacity, 16u, true));
    /* TEST: the live allocation was lost and the capacity no longer matches it. */
    assert(data == NULL);
    assert(capacity == 16u);
    assert(saved_for_test[0] == 0x5au);

    free(saved_for_test);
    return 0;
}
`
    },
    {
      "title": "Safer: commit realloc with a temporary pointer",
      "language": "c",
      "blurb": "The old allocation and metadata remain intact on failure; both are updated only after a successful resize.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdlib.h>

static void *test_realloc(void *memory, size_t size, bool fail)
{
    if (fail) {
        return NULL;
    }
    return realloc(memory, size);
}

static bool resize_buffer(unsigned char **data, size_t *capacity,
                          size_t requested, bool fail)
{
    unsigned char *resized = NULL;

    if (data == NULL || capacity == NULL || requested == 0u ||
        requested > SIZE_MAX / sizeof **data) {
        return false;
    }
    if (requested <= *capacity) {
        return true;
    }

    resized = test_realloc(*data, requested, fail);
    if (resized == NULL) {
        return false;
    }

    /* IMPORTANT FIX: commit the new pointer and capacity only on success. */
    *data = resized;
    *capacity = requested;
    return true;
}

int main(void)
{
    unsigned char *data = malloc(8u);
    size_t capacity = 8u;

    assert(data != NULL);
    data[0] = 0x5au;

    /* TEST: injected failure preserves the old owner, data, and metadata. */
    assert(!resize_buffer(&data, &capacity, 16u, true));
    assert(data != NULL);
    assert(data[0] == 0x5au);
    assert(capacity == 8u);

    assert(resize_buffer(&data, &capacity, 16u, false));
    assert(data != NULL);
    assert(data[0] == 0x5au);
    assert(capacity == 16u);
    assert(!resize_buffer(NULL, &capacity, 32u, false));

    free(data);
    return 0;
}
`
    }
  ]
};
