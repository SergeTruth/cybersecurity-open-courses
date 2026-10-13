window.COURSE_CODE_MODULE = {
  "title": "Ownership, Groups, and Trust Boundaries",
  "codeIntro": "Trust sensitive input only after its collected metadata matches the documented owner, group, type, and sharing policy.",
  "codeExamples": [
    {
      "title": "Evaluate file metadata against an ownership policy",
      "language": "c",
      "blurb": "A familiar path is insufficient: this sensitive-file policy requires the expected owner and group, a regular object, and exactly mode 0640.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

enum object_kind {
    OBJECT_REGULAR,
    OBJECT_DIRECTORY,
    OBJECT_SYMBOLIC_LINK
};

struct file_metadata {
    size_t owner_id;
    size_t group_id;
    unsigned int permission_bits;
    enum object_kind kind;
};

static bool metadata_matches_policy(const struct file_metadata *metadata,
                                    size_t expected_owner,
                                    size_t expected_group)
{
    if (metadata == NULL || metadata->kind != OBJECT_REGULAR) {
        return false;
    }
    if (metadata->owner_id != expected_owner ||
        metadata->group_id != expected_group) {
        return false;
    }
    /* IMPORTANT FIX: the documented sensitive-file policy is exactly 0640. */
    return metadata->permission_bits == 0640U;
}

int main(void)
{
    struct file_metadata metadata = {1001U, 2001U, 0640U, OBJECT_REGULAR};

    assert(metadata_matches_policy(&metadata, 1001U, 2001U));

    /* TEST: a familiar file is rejected when any trust fact changes. */
    metadata.owner_id = 1002U;
    assert(!metadata_matches_policy(&metadata, 1001U, 2001U));
    metadata.owner_id = 1001U;
    metadata.permission_bits = 0660U;
    assert(!metadata_matches_policy(&metadata, 1001U, 2001U));
    metadata.permission_bits = 0644U;
    assert(!metadata_matches_policy(&metadata, 1001U, 2001U));
    metadata.permission_bits = 0744U;
    assert(!metadata_matches_policy(&metadata, 1001U, 2001U));
    metadata.permission_bits = 0640U;
    metadata.kind = OBJECT_SYMBOLIC_LINK;
    assert(!metadata_matches_policy(&metadata, 1001U, 2001U));
    return 0;
}
`
    }
  ]
};
