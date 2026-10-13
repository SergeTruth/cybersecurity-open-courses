window.COURSE_CODE_MODULE = {
  "title": "Testing, Review, and Operational Controls",
  "codeIntro": "Enforce a small documented environment contract at startup and keep its accepted and rejected cases visible as regression tests.",
  "codeExamples": [
    {
      "title": "Startup environment-policy regression application",
      "language": "c",
      "blurb": "The audit accepts documented application variables, ignores unrelated operating-system entries, and rejects obsolete or unknown application settings.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

static bool supported_application_name(const char *name)
{
    return name != NULL &&
           (strcmp(name, "APP_MODE") == 0 ||
            strcmp(name, "APP_RETRY_LIMIT") == 0);
}

static bool validate_environment_names(const char *const *names,
                                       size_t name_count)
{
    size_t index;

    if (names == NULL) {
        return false;
    }
    for (index = 0U; index < name_count; index++) {
        if (names[index] == NULL || names[index][0] == '\\0') {
            return false;
        }
        if (strncmp(names[index], "APP_", 4U) == 0 &&
            !supported_application_name(names[index])) {
            /* IMPORTANT FIX: unsupported application settings stop startup. */
            return false;
        }
    }
    return true;
}

int main(void)
{
    static const char *const documented[] = {
        "PATH", "APP_MODE", "APP_RETRY_LIMIT"
    };
    static const char *const obsolete[] = {
        "PATH", "APP_MODE", "APP_OLD_DEBUG"
    };
    static const char *const malformed[] = {"PATH", ""};

    assert(validate_environment_names(documented, 3U));
    /* TEST: obsolete, unknown, and malformed names fail predictably. */
    assert(!validate_environment_names(obsolete, 3U));
    assert(!validate_environment_names(malformed, 2U));
    assert(!validate_environment_names(NULL, 0U));
    return 0;
}
`
    },
    {
      "title": "Strict build and regression run",
      "language": "bash",
      "blurb": "Compile the exact regression application shown above with strict diagnostics, then execute every assertion.",
      "code": `set -eu
cc="\${CC:-gcc}"
"$cc" -std=c17 -Wall -Wextra -Wpedantic -Wconversion -Wshadow \\
  -Werror -Wno-unused-function example.c -o example
./example
`
    }
  ]
};
