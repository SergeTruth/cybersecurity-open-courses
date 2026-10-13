window.COURSE_CODE_MODULE={"title":"Long-Running Programs and Leak Impact","codeIntro":"Steady-state work must return to its baseline after every iteration, not merely clean up at shutdown.","codeExamples":[{"title":"Verify repeated work returns to baseline","language":"c","blurb":"A connection workload tracks live and peak objects across one thousand operations and releases per-request state immediately.","code":`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>

typedef struct { size_t live; size_t peak; } lifecycle;
static bool process_request(lifecycle *state)
{
    void *request=NULL;
    if(state==NULL)return false;
    request=malloc(32U);if(request==NULL)return false;
    state->live+=1U;if(state->live>state->peak)state->peak=state->live;
    /* IMPORTANT FIX: release per-request ownership before returning. */
    free(request);state->live-=1U;return true;
}
int main(void)
{
    lifecycle state={0U,0U};size_t i=0U;
    /* TEST: repeated steady-state work never accumulates live objects. */
    for(i=0U;i<1000U;++i){assert(process_request(&state));assert(state.live==0U);}
    assert(state.peak==1U);assert(!process_request(NULL));
    puts("steady-state lifecycle tests passed");return 0;
}
`} ]};
