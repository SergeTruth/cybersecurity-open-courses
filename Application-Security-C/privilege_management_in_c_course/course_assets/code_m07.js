window.COURSE_CODE_MODULE = {
  "title": "Filesystem, Environment, and Inherited State",
  "codeIntro": "Startup should inventory inherited resources, close unexpected ones, and disable inheritance for the resources it intentionally keeps.",
  "codeExamples": [
    {
      "title": "Sanitize inherited stream state at startup",
      "language": "c",
      "blurb": "The application keeps one launcher-approved stream, marks it non-inheritable in policy state, and closes an unexpected stream before ordinary work. Close failures are reported after clearing ownership and attempting the remaining cleanup; the inheritance flag is only a policy model, not an OS setting.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>

struct inherited_stream {
    FILE *stream;
    bool expected;
    bool inheritable;
};

static bool sanitize_inherited_streams(struct inherited_stream *entries,
                                       size_t count)
{
    size_t index = 0;
    bool ok = true;

    if (entries == NULL && count != 0) {
        return false;
    }
    for (index = 0; index < count; ++index) {
        if (entries[index].stream == NULL) {
            continue;
        }
        if (!entries[index].expected) {
            FILE *owned = entries[index].stream;
            /* fclose consumes the stream even when flushing/closing fails. */
            entries[index].stream = NULL;
            if (fclose(owned) != 0) {
                ok = false;
            }
        }
        /* IMPORTANT FIX: retained resources are not propagated again. */
        entries[index].inheritable = false;
    }
    return ok;
}

int main(void)
{
    struct inherited_stream entries[2] = {
        {NULL, true, true},
        {NULL, false, true}
    };

    entries[0].stream = tmpfile();
    entries[1].stream = tmpfile();
    assert(entries[0].stream != NULL && entries[1].stream != NULL);
    assert(sanitize_inherited_streams(entries, 2));

    /* TEST: unexpected access is closed and retained access cannot propagate. */
    assert(entries[0].stream != NULL && !entries[0].inheritable);
    assert(entries[1].stream == NULL && !entries[1].inheritable);
    assert(fclose(entries[0].stream) == 0);
    entries[0].stream = NULL;
    assert(sanitize_inherited_streams(entries, 2));
    return 0;
}
`
    }
  ]
};
