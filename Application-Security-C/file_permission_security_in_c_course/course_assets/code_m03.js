window.COURSE_CODE_MODULE = {
  "title": "Creating Files with Safe Defaults",
  "codeIntro": "Reject pre-existing path entries and apply the platform's restrictive creation policy; on Windows, a security descriptor and ACL are still required for a true owner-only policy.",
  "codeExamples": [
    {
      "title": "Restrictive, exclusive file creation",
      "language": "c",
      "blurb": "The POSIX branch requests mode 0600 at creation. The Windows CRT branch requests read/write permission and prevents handle inheritance, but those flags do not replace a Windows owner-only ACL.",
      "code": `#if !defined(_WIN32)
#define _POSIX_C_SOURCE 200809L
#endif

#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#if defined(_WIN32)
#include <fcntl.h>
#include <io.h>
#include <direct.h>
#include <sys/stat.h>

static int create_private_file(const char *path)
{
    /* CRT mode flags are not a complete Windows ACL policy. Production code
       must create the file with an appropriate security descriptor. */
    return _open(path, _O_WRONLY | _O_CREAT | _O_EXCL |
                 _O_BINARY | _O_NOINHERIT, _S_IREAD | _S_IWRITE);
}

static int close_file(int descriptor)
{
    return _close(descriptor);
}
#else
#include <fcntl.h>
#include <sys/stat.h>
#include <unistd.h>

static int create_private_file(const char *path)
{
    return open(path, O_WRONLY | O_CREAT | O_EXCL,
                S_IRUSR | S_IWUSR);
}

static int close_file(int descriptor)
{
    return close(descriptor);
}
#endif

/* Test fixture only. POSIX uses a mode-0700 directory; Windows inherits the
   trusted test workspace ACL. Neither branch removes pre-existing entries. */
static bool make_fixture_directory(char *path)
{
#if defined(_WIN32)
    return _mktemp_s(path, strlen(path) + 1u) == 0 && _mkdir(path) == 0;
#else
    return mkdtemp(path) != NULL;
#endif
}

static int remove_fixture_directory(const char *path)
{
#if defined(_WIN32)
    return _rmdir(path);
#else
    return rmdir(path);
#endif
}

int main(void)
{
    char directory[] = "permission-private-XXXXXX";
    char path[128];
    int descriptor;
    int written;

    assert(make_fixture_directory(directory));
    written = snprintf(path, sizeof path, "%s/private.tmp", directory);
    assert(written > 0 && (size_t)written < sizeof path);
    /* IMPORTANT FIX: restrictive access and exclusivity apply at creation. */
    descriptor = create_private_file(path);
    assert(descriptor >= 0);

    /* TEST: an existing path is rejected instead of opened or replaced. */
    assert(create_private_file(path) < 0);
    assert(close_file(descriptor) == 0);
    assert(remove(path) == 0);
    assert(remove_fixture_directory(directory) == 0);
    return 0;
}
`
    }
  ]
};
