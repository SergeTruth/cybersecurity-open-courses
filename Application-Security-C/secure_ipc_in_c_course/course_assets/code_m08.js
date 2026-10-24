window.COURSE_CODE_MODULE = {
  "title": "Secrets, Handles, and Descriptor Hygiene: code example",
  "codeIntro": "A helper process should receive an explicit handle allowlist rather than inheriting every channel and privileged object from its parent.",
  "codeExamples": [
    {
      "title": "Vulnerable: child inherits every parent handle",
      "language": "c",
      "blurb": "The launch preparation copies all parent handles, including an administrative channel the helper never needs.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <string.h>

enum handle_purpose { HANDLE_REQUEST_PIPE, HANDLE_ADMIN_CHANNEL, HANDLE_LOG };
struct handle { uint32_t value; enum handle_purpose purpose; };

static bool prepare_child(const struct handle *parent, size_t count,
                          struct handle *child, size_t capacity,
                          size_t *child_count)
{
    if (parent == NULL || child == NULL || child_count == NULL ||
        count > capacity || count > SIZE_MAX / sizeof *child) {
        return false;
    }
    /* IMPORTANT DEFECT: inheritance copies every reachable capability. */
    memmove(child, parent, count * sizeof *child);
    *child_count = count;
    return true;
}

int main(void)
{
    const struct handle parent[] =
        { { 10u, HANDLE_REQUEST_PIPE }, { 99u, HANDLE_ADMIN_CHANNEL } };
    struct handle child[2];
    size_t child_count = 0u;

    assert(prepare_child(parent, 2u, child, 2u, &child_count));
    /* TEST: the helper inherited an unnecessary admin capability. */
    assert(child_count == 2u && child[1].purpose == HANDLE_ADMIN_CHANNEL);
    return 0;
}
`
    },
    {
      "title": "Safer: pass only allowlisted child handles",
      "language": "c",
      "blurb": "The launch boundary selects only the request pipe, making the child's capabilities and resulting ownership visible.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

enum handle_purpose { HANDLE_REQUEST_PIPE, HANDLE_ADMIN_CHANNEL, HANDLE_LOG };
struct handle { uint32_t value; enum handle_purpose purpose; };

static bool prepare_child(const struct handle *parent, size_t count,
                          struct handle *child, size_t capacity,
                          size_t *child_count)
{
    size_t index;

    if (parent == NULL || child == NULL || child_count == NULL) {
        return false;
    }
    *child_count = 0u;
    for (index = 0u; index < count; index++) {
        if (parent[index].purpose == HANDLE_REQUEST_PIPE) {
            if (*child_count >= capacity) {
                return false;
            }
            /* IMPORTANT FIX: only an approved capability crosses launch. */
            child[*child_count] = parent[index];
            (*child_count)++;
        }
    }
    return true;
}

int main(void)
{
    const struct handle parent[] = {
        { 10u, HANDLE_REQUEST_PIPE },
        { 99u, HANDLE_ADMIN_CHANNEL },
        { 20u, HANDLE_LOG }
    };
    struct handle child[1];
    size_t child_count = 0u;

    assert(prepare_child(parent, 3u, child, 1u, &child_count));
    /* TEST: the helper receives only its one required request channel. */
    assert(child_count == 1u && child[0].value == 10u);
    assert(child[0].purpose == HANDLE_REQUEST_PIPE);
    return 0;
}
`
    }
  ]
};
