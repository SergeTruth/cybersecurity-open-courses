window.COURSE_CODE_MODULE = {
  "title": "Directories, Shared Locations, and Cleanup",
  "codeIntro": "Cleanup uses an already-open managed-directory descriptor so an approved basename cannot be resolved relative to the process working directory.",
  "codeExamples": [
    {
      "title": "Constrain removal to an owned directory entry",
      "language": "c",
      "blurb": "The cleanup helper rejects unowned files, traversal, nested paths, and unexpected suffixes before unlinkat binds removal to the managed directory.",
      "code": `#define _POSIX_C_SOURCE 200809L
#include <assert.h>
#include <stdbool.h>
#include <fcntl.h>
#include <stddef.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <unistd.h>

struct managed_entry {
    const char *name;
    bool owned_by_workflow;
};

static bool managed_temporary_name(const char *name)
{
    size_t length = 0U;

    if (name == NULL || name[0] == '\\0') {
        return false;
    }
    while (name[length] != '\\0') {
        if (length == 63U || name[length] == '/' || name[length] == '\\\\') {
            return false;
        }
        length++;
    }
    return length > 4U && name[length - 4U] == '.' &&
           name[length - 3U] == 't' && name[length - 2U] == 'm' &&
           name[length - 1U] == 'p';
}

static bool remove_managed_entry(int directory_fd,
                                 const struct managed_entry *entry)
{
    if (directory_fd < 0 || entry == NULL || !entry->owned_by_workflow ||
        !managed_temporary_name(entry->name)) {
        return false;
    }
    /* IMPORTANT FIX: unlinkat resolves the name under the open directory. */
    return unlinkat(directory_fd, entry->name, 0) == 0;
}

int main(void)
{
    char directory_path[] = "permission-managed-XXXXXX";
    static const char entry_name[] = "managed-output.tmp";
    struct managed_entry entry = {entry_name, false};
    struct managed_entry traversal = {"../outside.tmp", true};
    int directory_fd;
    int file_fd;

    assert(mkdtemp(directory_path) != NULL);
    directory_fd = open(directory_path, O_RDONLY);
    assert(directory_fd >= 0);
    file_fd = openat(directory_fd, entry_name,
                     O_WRONLY | O_CREAT | O_EXCL, 0600);
    assert(file_fd >= 0);
    assert(close(file_fd) == 0);

    /* TEST: ownership and directory boundaries are both enforced. */
    assert(!remove_managed_entry(directory_fd, &entry));
    assert(!remove_managed_entry(directory_fd, &traversal));
    entry.owned_by_workflow = true;
    assert(remove_managed_entry(directory_fd, &entry));
    assert(!remove_managed_entry(directory_fd, &entry));
    assert(close(directory_fd) == 0);
    assert(rmdir(directory_path) == 0);
    return 0;
}
`
    }
  ]
};
