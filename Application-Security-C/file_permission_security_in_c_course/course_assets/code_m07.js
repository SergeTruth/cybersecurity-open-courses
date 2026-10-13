window.COURSE_CODE_MODULE = {
  "title": "Checking and Changing Permissions Safely",
  "codeIntro": "A small object-identity model shows why path checks can become stale and why permission changes should use a stable open reference.",
  "codeExamples": [
    {
      "title": "Vulnerable: check and change through a replaceable path",
      "language": "c",
      "blurb": "The path names a private report during validation, but replacement before the change causes the operation to affect a different object.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

struct file_object {
    size_t object_id;
    unsigned int permission_bits;
};

struct path_entry {
    struct file_object *current;
};

static bool path_is_private(const struct path_entry *path)
{
    return path != NULL && path->current != NULL &&
           path->current->permission_bits == 0600U;
}

static bool change_by_path(struct path_entry *path, unsigned int new_bits)
{
    if (path == NULL || path->current == NULL) {
        return false;
    }
    /* IMPORTANT DEFECT: the path may now identify a different object. */
    path->current->permission_bits = new_bits;
    return true;
}

int main(void)
{
    struct file_object report = {1U, 0600U};
    struct file_object replacement = {2U, 0666U};
    struct path_entry path = {&report};

    assert(path_is_private(&path));
    path.current = &replacement; /* Simulate replacement after the check. */
    assert(change_by_path(&path, 0640U));

    /* TEST: the checked report was not the object that was changed. */
    assert(report.permission_bits == 0600U);
    assert(replacement.permission_bits == 0640U);
    return 0;
}
`
    },
    {
      "title": "Safer: change permissions through a stable reference",
      "language": "c",
      "blurb": "An open reference retains object identity even if the directory entry is replaced before the permission operation.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

struct file_object {
    size_t object_id;
    unsigned int permission_bits;
};

struct path_entry {
    struct file_object *current;
};

struct open_reference {
    struct file_object *object;
};

static bool open_stable_reference(const struct path_entry *path,
                                  struct open_reference *reference)
{
    if (path == NULL || path->current == NULL || reference == NULL) {
        return false;
    }
    reference->object = path->current;
    return true;
}

static bool change_by_reference(struct open_reference *reference,
                                unsigned int new_bits)
{
    if (reference == NULL || reference->object == NULL) {
        return false;
    }
    /* IMPORTANT FIX: the permission change targets the opened object. */
    reference->object->permission_bits = new_bits;
    return true;
}

int main(void)
{
    struct file_object report = {1U, 0640U};
    struct file_object replacement = {2U, 0666U};
    struct path_entry path = {&report};
    struct open_reference reference = {NULL};

    assert(open_stable_reference(&path, &reference));
    path.current = &replacement; /* The path can change independently. */
    assert(change_by_reference(&reference, 0600U));

    /* TEST: the opened report changes and the replacement remains untouched. */
    assert(reference.object->object_id == 1U);
    assert(report.permission_bits == 0600U);
    assert(replacement.permission_bits == 0666U);
    assert(!change_by_reference(NULL, 0600U));
    return 0;
}
`
    }
  ]
};
