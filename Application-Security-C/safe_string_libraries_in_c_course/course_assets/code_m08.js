window.COURSE_CODE_MODULE = {
  "title": "Migration from Unsafe String Usage",
  "codeIntro": "Migrate by call-site purpose: preserve intentional display shortening while rejecting any truncation of identity-bearing fields.",
  "codeExamples": [
    {
      "title": "Choose migration semantics by field purpose",
      "language": "c",
      "blurb": "One reviewed adapter documents two intentionally different outcomes instead of applying a blind mechanical replacement to every legacy copy.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

typedef enum {
    DISPLAY_TEXT,
    IDENTITY_FIELD
} FieldPurpose;

static bool migrate_text(FieldPurpose purpose, const char *source,
                         char *destination, size_t capacity)
{
    size_t length = 0u;

    if (source == NULL || destination == NULL || capacity == 0u) {
        return false;
    }
    if (purpose != DISPLAY_TEXT && purpose != IDENTITY_FIELD) {
        return false;
    }
    length = strlen(source);
    if (length < capacity) {
        memmove(destination, source, length + 1u);
        return true;
    }

    /* IMPORTANT FIX: truncation policy follows the inventoried call-site role. */
    if (purpose == IDENTITY_FIELD || capacity < 4u) {
        return false;
    }

    memmove(destination, source, capacity - 4u);
    memcpy(destination + capacity - 4u, "...", 4u);
    return true;
}

int main(void)
{
    char identity[8] = {0};
    char display[8] = {0};
    char overlap[16] = "team-01";

    /* TEST: an exact identity fits, but a longer one is rejected unchanged. */
    assert(migrate_text(IDENTITY_FIELD, "team-01", identity,
                        sizeof identity));
    assert(!migrate_text(IDENTITY_FIELD, "team-012", identity,
                         sizeof identity));
    assert(strcmp(identity, "team-01") == 0);

    /* TEST: display-only shortening is explicit and marked with an ellipsis. */
    assert(migrate_text(DISPLAY_TEXT, "long display text", display,
                        sizeof display));
    assert(strcmp(display, "long...") == 0);
    assert(!migrate_text(DISPLAY_TEXT, "long", display, 3u));
    assert(!migrate_text((FieldPurpose)99, "too-long-identity", identity,
                         sizeof identity));
    assert(strcmp(identity, "team-01") == 0);
    assert(migrate_text(IDENTITY_FIELD, overlap, overlap + 1,
                        sizeof overlap - 1u));
    assert(strcmp(overlap + 1, "team-01") == 0);
    assert(migrate_text(DISPLAY_TEXT, overlap + 1, overlap, 6u));
    assert(strcmp(overlap, "te...") == 0);
    return 0;
}
`
    }
  ]
};
