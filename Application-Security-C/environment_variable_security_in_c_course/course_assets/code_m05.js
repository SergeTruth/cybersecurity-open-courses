window.COURSE_CODE_MODULE = {
  "title": "Paths, Search Order, and External Tools",
  "codeIntro": "Compare implicit current-directory search behavior with a policy that accepts only explicit absolute directories.",
  "codeExamples": [
    {
      "title": "Vulnerable: empty entry selects the current directory",
      "language": "c",
      "blurb": "A PATH-style parser gives an empty leading entry its conventional current-directory meaning, placing it first in helper lookup order.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

static bool first_search_directory(const char *search_path,
                                   char *out, size_t out_size)
{
    size_t length = 0U;

    if (search_path == NULL || out == NULL || out_size == 0U) {
        return false;
    }
    while (search_path[length] != '\\0' && search_path[length] != ':') {
        length++;
    }
    if (length == 0U) {
        if (out_size < 2U) {
            return false;
        }
        /* IMPORTANT DEFECT: an empty entry silently becomes current directory. */
        out[0] = '.';
        out[1] = '\\0';
        return true;
    }
    if (length >= out_size) {
        return false;
    }
    memcpy(out, search_path, length);
    out[length] = '\\0';
    return true;
}

int main(void)
{
    char directory[16];

    assert(first_search_directory(":/usr/bin:/bin",
                                  directory, sizeof directory));
    /* TEST: helper lookup would begin in an attacker-influenced directory. */
    assert(strcmp(directory, ".") == 0);
    assert(first_search_directory("/usr/bin:/bin",
                                  directory, sizeof directory));
    assert(strcmp(directory, "/usr/bin") == 0);
    return 0;
}
`
    },
    {
      "title": "Safer: require explicit absolute search entries",
      "language": "c",
      "blurb": "The validator rejects empty, relative, oversized, and trailing entries before search order can influence helper selection.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

static bool validate_search_path(const char *search_path)
{
    size_t index = 0U;
    size_t entry_length = 0U;

    if (search_path == NULL || search_path[0] == '\\0') {
        return false;
    }
    while (true) {
        char current = search_path[index];

        if (entry_length == 0U && current != '/') {
            return false;
        }
        if (current == ':' || current == '\\0') {
            if (entry_length == 0U || entry_length > 63U) {
                return false;
            }
            if (current == '\\0') {
                break;
            }
            entry_length = 0U;
        } else {
            entry_length++;
        }
        index++;
    }
    /* IMPORTANT FIX: every search location is explicit and absolute. */
    return true;
}

int main(void)
{
    assert(validate_search_path("/usr/bin:/bin"));
    assert(validate_search_path("/"));

    /* TEST: empty and relative entries are rejected, including boundaries. */
    assert(!validate_search_path(NULL));
    assert(!validate_search_path(""));
    assert(!validate_search_path(":/usr/bin"));
    assert(!validate_search_path("/usr/bin:"));
    assert(!validate_search_path("/usr/bin::/bin"));
    assert(!validate_search_path("tools:/usr/bin"));
    return 0;
}
`
    }
  ]
};
