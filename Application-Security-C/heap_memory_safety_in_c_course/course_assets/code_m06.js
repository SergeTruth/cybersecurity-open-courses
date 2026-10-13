window.COURSE_CODE_MODULE = {
  "title": "Freeing, Cleanup Paths, and Double-Free Prevention",
  "codeIntro": "A teardown helper should accept documented partial states, release each owned field once, and invalidate the caller's owner.",
  "codeExamples": [
    {
      "title": "Destroy complete and partial records safely",
      "language": "c",
      "blurb": "One owner-aware helper handles partial initialization and makes repeated local cleanup a harmless no-op.",
      "code": `#include <assert.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char *name;
    uint8_t *content;
    size_t content_length;
} record;

static void record_destroy(record **owner)
{
    record *item = NULL;

    if (owner == NULL || *owner == NULL) {
        return;
    }
    item = *owner;

    /* IMPORTANT FIX: release exactly the fields owned by this partial state. */
    free(item->content);
    item->content = NULL;
    item->content_length = 0U;
    free(item->name);
    item->name = NULL;
    free(item);
    *owner = NULL;
}

int main(void)
{
    record *partial = calloc(1U, sizeof *partial);
    record *complete = calloc(1U, sizeof *complete);

    assert(partial != NULL && complete != NULL);
    partial->name = malloc(sizeof "draft");
    assert(partial->name != NULL);
    (void)memcpy(partial->name, "draft", sizeof "draft");

    complete->name = malloc(sizeof "ready");
    complete->content = malloc(3U);
    assert(complete->name != NULL && complete->content != NULL);
    (void)memcpy(complete->name, "ready", sizeof "ready");
    complete->content[0] = 0x20U;
    complete->content[1] = 0x00U;
    complete->content[2] = 0x21U;
    complete->content_length = 3U;

    /* TEST: partial and complete states both have one visible release point. */
    record_destroy(&partial);
    record_destroy(&complete);
    assert(partial == NULL && complete == NULL);

    /* TEST: repeated local cleanup cannot free either object twice. */
    record_destroy(&partial);
    record_destroy(&complete);

    puts("centralized teardown tests passed");
    return 0;
}
`
    }
  ]
};
