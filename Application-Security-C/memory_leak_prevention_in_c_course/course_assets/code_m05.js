window.COURSE_CODE_MODULE={"title":"Ownership Contracts Across Functions","codeIntro":"Make consume, borrow, and return-owned operations visible in the API.","codeExamples":[{"title":"Transfer an owned message through a mailbox","language":"c","blurb":"Successful insertion clears the caller owner; borrowing is const; removal returns ownership for destruction.","code":`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>

typedef struct { int value; } message;
typedef struct { message *owned; } mailbox;

static bool mailbox_take(mailbox *box, message **owner)
{
    if (box == NULL || owner == NULL || *owner == NULL || box->owned != NULL) return false;
    /* IMPORTANT FIX: transfer ownership and invalidate the old owner together. */
    box->owned = *owner; *owner = NULL; return true;
}
static const message *mailbox_borrow(const mailbox *box)
{ return box == NULL ? NULL : box->owned; }
static message *mailbox_remove_owned(mailbox *box)
{ message *m = NULL; if (box != NULL) { m = box->owned; box->owned = NULL; } return m; }

int main(void)
{
    mailbox box = { NULL };
    message *owner = malloc(sizeof *owner);
    const message *borrowed = NULL;
    assert(owner != NULL); owner->value = 42;
    /* TEST: transfer, borrow, and returned ownership are unambiguous. */
    assert(mailbox_take(&box, &owner) && owner == NULL);
    borrowed = mailbox_borrow(&box); assert(borrowed != NULL && borrowed->value == 42);
    owner = mailbox_remove_owned(&box); assert(owner != NULL && mailbox_borrow(&box) == NULL);
    free(owner); owner = NULL;
    puts("ownership contract tests passed");
    return 0;
}
`} ]};
