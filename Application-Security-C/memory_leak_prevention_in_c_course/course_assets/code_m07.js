window.COURSE_CODE_MODULE={"title":"Reallocation and Allocation Failure","codeIntro":"A temporary pointer and delayed metadata update keep the old allocation owned when resizing fails.","codeExamples":[{"title":"Preserve a buffer across resize failure","language":"c","blurb":"An injected realloc-style failure leaves pointer, capacity, and data unchanged; a real resize then commits both fields.","code":`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

typedef void *(*resizer)(void *, size_t);
typedef struct { uint8_t *data; size_t capacity; } buffer;
static void *fail_resize(void *p,size_t n){(void)p;(void)n;return NULL;}
static void *real_resize(void *p,size_t n){return realloc(p,n);}
static bool reserve(buffer *b,size_t needed,resizer resize)
{
    uint8_t *temporary=NULL;
    if(b==NULL||resize==NULL||needed==0U)return false;
    if(needed<=b->capacity)return true;
    /* IMPORTANT FIX: keep the original owner until success is known. */
    temporary=resize(b->data,needed);if(temporary==NULL)return false;
    b->data=temporary;b->capacity=needed;return true;
}
int main(void)
{
    buffer b={malloc(4U),4U};uint8_t *original=b.data;
    assert(b.data!=NULL);b.data[0]=0x5aU;
    /* TEST: failure preserves ownership and metadata. */
    assert(!reserve(&b,8U,fail_resize));assert(b.data==original&&b.capacity==4U&&b.data[0]==0x5aU);
    assert(reserve(&b,8U,real_resize));assert(b.data!=NULL&&b.capacity==8U&&b.data[0]==0x5aU);
    free(b.data);b.data=NULL;b.capacity=0U;
    puts("failure-safe realloc tests passed");return 0;
}
`} ]};
