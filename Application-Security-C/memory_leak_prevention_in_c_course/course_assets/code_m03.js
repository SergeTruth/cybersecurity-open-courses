window.COURSE_CODE_MODULE={"title":"Losing the Last Reference","codeIntro":"Replacing the only owner must release or transfer the old allocation first.","codeExamples":[{"title":"Vulnerable: Overwrite the only owner","language":"c","blurb":"A tracked allocation shows that assigning a replacement abandons the old block.","code":`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>

static void *tracked_new(size_t size, size_t *live)
{
    void *p = NULL;
    if (size == 0U || live == NULL) return NULL;
    p = malloc(size);
    if (p != NULL) *live += 1U;
    return p;
}

static void tracked_delete(void **owner, size_t *live)
{
    if (owner != NULL && *owner != NULL && live != NULL) {
        free(*owner); *owner = NULL; assert(*live > 0U); *live -= 1U;
    }
}

static bool replace_buffer(void **owner, size_t size, size_t *live)
{
    void *replacement = tracked_new(size, live);
    if (owner == NULL || replacement == NULL) return false;
    /* IMPORTANT DEFECT: the old allocation is abandoned. */
    *owner = replacement;
    return true;
}

int main(void)
{
    size_t live = 0U;
    void *owner = tracked_new(8U, &live);
    void *cleanup_alias = owner;
    assert(owner != NULL && live == 1U);
    /* TEST: replacement leaves two live blocks but only one normal owner. */
    assert(replace_buffer(&owner, 16U, &live));
    assert(live == 2U && owner != cleanup_alias);
    tracked_delete(&owner, &live);
    tracked_delete(&cleanup_alias, &live);
    assert(live == 0U);
    puts("lost-reference defect demonstrated safely");
    return 0;
}
`},{"title":"Safer: Commit replacement without losing ownership","language":"c","blurb":"The replacement is acquired first, then the old owner is released before the pointer changes.","code":`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>

static void *tracked_new(size_t size, size_t *live)
{
    void *p = NULL;
    if (size == 0U || live == NULL) return NULL;
    p = malloc(size);
    if (p != NULL) *live += 1U;
    return p;
}

static void tracked_delete(void **owner, size_t *live)
{
    if (owner != NULL && *owner != NULL && live != NULL) {
        free(*owner); *owner = NULL; assert(*live > 0U); *live -= 1U;
    }
}

static bool replace_buffer(void **owner, size_t size, size_t *live)
{
    void *replacement = NULL;
    if (owner == NULL || *owner == NULL) return false;
    replacement = tracked_new(size, live);
    if (replacement == NULL) return false;
    /* IMPORTANT FIX: release the old owner before committing replacement. */
    tracked_delete(owner, live);
    *owner = replacement;
    return true;
}

int main(void)
{
    size_t live = 0U;
    void *owner = tracked_new(8U, &live);
    assert(owner != NULL && live == 1U);
    /* TEST: successful replacement keeps exactly one live allocation. */
    assert(replace_buffer(&owner, 16U, &live));
    assert(owner != NULL && live == 1U);
    assert(!replace_buffer(NULL, 16U, &live));
    tracked_delete(&owner, &live);
    assert(live == 0U);
    puts("owner replacement tests passed");
    return 0;
}
`} ]};
