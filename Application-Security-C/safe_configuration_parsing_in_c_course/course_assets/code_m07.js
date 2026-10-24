window.COURSE_CODE_MODULE = {
  "title": "Paths, Resources, and Sensitive Settings: code example",
  "codeIntro": "A data-file setting can pass a typed lexical path policy when it is terminated, bounded, and free of disallowed syntax; that does not prove filesystem containment.",
  "codeExamples": [
    {
      "title": "Validate a lexical resource-path setting",
      "language": "c",
      "blurb": "Diagnostics expose only a category. Production access must resolve from a trusted directory handle with an explicit symlink, mount, and check/use race policy.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

#define MAX_RESOURCE_PATH 32u

enum path_error {
    PATH_OK,
    PATH_EMPTY,
    PATH_TOO_LONG,
    PATH_OUTSIDE_SCOPE,
    PATH_BAD_CHARACTER
};

struct resource_path {
    char value[MAX_RESOURCE_PATH + 1u];
};

static bool validate_data_path(const char *text, size_t extent,
                               struct resource_path *output,
                               enum path_error *error)
{
    const char *terminator = NULL;
    size_t length = 0u;
    size_t index = 0u;

    if (text == NULL || output == NULL || error == NULL || extent == 0u) {
        return false;
    }
    terminator = memchr(text, '\0', extent);
    if (terminator == NULL) {
        *error = PATH_TOO_LONG;
        return false;
    }
    length = (size_t)(terminator - text);
    if (length == 0u) {
        *error = PATH_EMPTY;
        return false;
    }
    if (length > MAX_RESOURCE_PATH) {
        *error = PATH_TOO_LONG;
        return false;
    }
    if (length < 6u || memcmp(text, "data/", 5u) != 0 ||
        strstr(text, "../") != NULL || strstr(text, "/..") != NULL) {
        *error = PATH_OUTSIDE_SCOPE;
        return false;
    }
    for (index = 0u; index < length; index++) {
        if (text[index] == '\\' || text[index] == ':' ||
            (unsigned char)text[index] < 0x20u) {
            *error = PATH_BAD_CHARACTER;
            return false;
        }
    }

    /* LEXICAL CHECK ONLY: copy the validated candidate setting. Actual
       containment requires directory-anchored platform file operations. */
    memmove(output->value, text, length + 1u);
    *error = PATH_OK;
    return true;
}

static const char *path_error_category(enum path_error error)
{
    switch (error) {
        case PATH_EMPTY: return "empty";
        case PATH_TOO_LONG: return "length";
        case PATH_OUTSIDE_SCOPE: return "scope";
        case PATH_BAD_CHARACTER: return "character";
        case PATH_OK: return "none";
        default: return "unknown";
    }
}

int main(void)
{
    const char accepted[] = "data/cache.db";
    const char traversal[] = "data/../secret.key";
    struct resource_path path = {{0}};
    enum path_error error = PATH_OK;

    assert(validate_data_path(accepted, sizeof accepted, &path, &error));
    assert(strcmp(path.value, accepted) == 0 && error == PATH_OK);
    assert(!validate_data_path(traversal, sizeof traversal, &path, &error));
    /* TEST: diagnostics reveal the category, not the rejected path value. */
    assert(strcmp(path_error_category(error), "scope") == 0);
    assert(strcmp(path.value, accepted) == 0);
    assert(validate_data_path(path.value, sizeof path.value, &path, &error));
    assert(strcmp(path.value, accepted) == 0);
    return 0;
}
`
    }
  ]
};
