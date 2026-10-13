window.COURSE_CODE_MODULE = {
  "title": "Bounded Copying and Concatenation APIs",
  "codeIntro": "Compare an append call given the enclosing allocation size with one given the destination string's true logical capacity.",
  "codeExamples": [
    {
      "title": "Vulnerable: Append using the enclosing allocation size",
      "language": "c",
      "blurb": "The append stays inside physical storage but crosses the field's logical boundary because the caller supplied the wrong capacity.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

static bool append_component(char *destination, size_t supplied_capacity,
                             const char *suffix)
{
    size_t used = 0u;
    size_t added = 0u;

    if (destination == NULL || suffix == NULL || supplied_capacity == 0u) {
        return false;
    }
    used = strlen(destination);
    added = strlen(suffix);
    if (used >= supplied_capacity ||
        added > supplied_capacity - used - 1u) {
        return false;
    }

    /* IMPORTANT DEFECT: the API cannot detect an overstated field capacity. */
    memcpy(destination + used, suffix, added + 1u);
    return true;
}

int main(void)
{
    enum { LOGICAL_CAPACITY = 8, PHYSICAL_CAPACITY = 16 };
    unsigned char storage[PHYSICAL_CAPACITY];
    size_t i = 0u;

    memset(storage, 0xa5, sizeof storage);
    memcpy(storage, "acct", 5u);

    assert(append_component((char *)storage, sizeof storage, "-admin"));

    /* TEST: bytes beyond the declared logical field were changed safely. */
    assert(strcmp((char *)storage, "acct-admin") == 0);
    for (i = LOGICAL_CAPACITY; i < 11u; i++) {
        assert(storage[i] != 0xa5u);
    }
    return 0;
}
`
    },
    {
      "title": "Safer: Append only a complete suffix within logical capacity",
      "language": "c",
      "blurb": "The corrected API verifies that the existing destination terminates inside its declared field and rejects an append before modifying it unless the full result fits.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

static bool append_component(char *destination, size_t capacity,
                             const char *suffix)
{
    size_t used = 0u;
    size_t added = 0u;

    if (destination == NULL || suffix == NULL || capacity == 0u) {
        return false;
    }
    while (used < capacity && destination[used] != '\0') {
        used++;
    }
    if (used == capacity) {
        return false;
    }
    added = strlen(suffix);

    /* IMPORTANT FIX: remaining capacity includes the final terminator. */
    if (added > capacity - used - 1u) {
        return false;
    }
    /* A suffix may be a view of this destination, including self-append. */
    memmove(destination + used, suffix, added + 1u);
    return true;
}

int main(void)
{
    char field[8] = "acct";
    char overlap[16] = "hello";
    char unterminated[4] = {'a', 'b', 'c', 'd'};

    /* TEST: a complete suffix that fits is accepted. */
    assert(append_component(field, sizeof field, "-x"));
    assert(strcmp(field, "acct-x") == 0);

    /* TEST: an oversized append and invalid destination state are rejected. */
    assert(!append_component(field, sizeof field, "-admin"));
    assert(strcmp(field, "acct-x") == 0);
    assert(!append_component(unterminated, sizeof unterminated, "x"));
    assert(append_component(overlap, sizeof overlap, overlap));
    assert(strcmp(overlap, "hellohello") == 0);
    return 0;
}
`
    }
  ]
};
