window.COURSE_CODE_MODULE = {
  "title": "Environment and Working Directory Control: code example",
  "codeIntro": "The child environment and working directory are launch inputs that should be explicit, minimal, and independently reviewable.",
  "codeExamples": [
    {
      "title": "Vulnerable: child inherits ambient process context",
      "language": "c",
      "blurb": "The launch plan accepts proxy, temporary-directory, locale, and current-directory values without deciding whether the helper needs them.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

struct launch_context {
    const char *path;
    const char *temporary_directory;
    const char *locale;
    const char *working_directory;
};

static bool context_accepted(const struct launch_context *context)
{
    /* IMPORTANT DEFECT: inherited context is accepted without policy. */
    return context != NULL && context->working_directory != NULL;
}

int main(void)
{
    const struct launch_context inherited =
        { ".:/tmp/tools", "/tmp/public", "user-locale", "/untrusted/job" };

    assert(context_accepted(&inherited));
    /* TEST: search, temporary, locale, and relative-file behavior remain ambient. */
    assert(strstr(inherited.path, ".:") != NULL);
    return 0;
}
`
    },
    {
      "title": "Safer: require a controlled child context",
      "language": "c",
      "blurb": "The policy fixes a narrow search path, private temporary directory, deterministic locale, and reviewed working directory.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

struct launch_context {
    const char *path;
    const char *temporary_directory;
    const char *locale;
    const char *working_directory;
};

static bool context_accepted(const struct launch_context *context)
{
    if (context == NULL || context->path == NULL ||
        context->temporary_directory == NULL || context->locale == NULL ||
        context->working_directory == NULL) {
        return false;
    }
    /* IMPORTANT FIX: every context value belongs to the launch contract. */
    return strcmp(context->path, "/usr/bin") == 0 &&
           strcmp(context->temporary_directory, "/var/empty/app") == 0 &&
           strcmp(context->locale, "C") == 0 &&
           strcmp(context->working_directory, "/srv/app") == 0;
}

int main(void)
{
    const struct launch_context controlled =
        { "/usr/bin", "/var/empty/app", "C", "/srv/app" };
    const struct launch_context wrong_directory =
        { "/usr/bin", "/var/empty/app", "C", "/tmp" };

    assert(context_accepted(&controlled));
    /* TEST: a changed working directory cannot silently alter child behavior. */
    assert(!context_accepted(&wrong_directory));
    return 0;
}
`
    }
  ]
};
