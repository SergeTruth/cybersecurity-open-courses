window.COURSE_CODE_MODULE = {
  "title": "Resource Limits and Denial-of-Service Resistance: code example",
  "codeIntro": "A service budget must constrain both each peer request and the total memory already reserved by active IPC work.",
  "codeExamples": [
    {
      "title": "Vulnerable: every declared request is reserved",
      "language": "c",
      "blurb": "The accounting accepts peer-controlled sizes without a per-request or service-wide limit, allowing reserved work to exceed capacity.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

static bool reserve_request(size_t *in_use, size_t declared_size)
{
    if (in_use == NULL || declared_size > SIZE_MAX - *in_use) {
        return false;
    }
    /* IMPORTANT DEFECT: arithmetic safety is not an availability policy. */
    *in_use += declared_size;
    return true;
}

int main(void)
{
    size_t in_use = 900u;

    assert(reserve_request(&in_use, 500u));
    /* TEST: a 1024-byte service budget was exceeded without rejection. */
    assert(in_use == 1400u);
    return 0;
}
`
    },
    {
      "title": "Safer: enforce request and service budgets",
      "language": "c",
      "blurb": "The budget rejects oversized work before accounting, supports backpressure, and releases exactly the bytes owned by completed requests.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

struct service_budget {
    size_t in_use;
    size_t maximum;
    size_t per_request;
};

static bool reserve_request(struct service_budget *budget, size_t amount)
{
    if (budget == NULL || budget->in_use > budget->maximum ||
        amount > budget->per_request || amount > budget->maximum - budget->in_use) {
        return false;
    }
    /* IMPORTANT FIX: policy is enforced before resource ownership changes. */
    budget->in_use += amount;
    return true;
}

static bool release_request(struct service_budget *budget, size_t amount)
{
    if (budget == NULL || amount > budget->in_use) {
        return false;
    }
    budget->in_use -= amount;
    return true;
}

int main(void)
{
    struct service_budget budget = { 700u, 1024u, 256u };

    assert(reserve_request(&budget, 200u));
    assert(!reserve_request(&budget, 300u));
    assert(!reserve_request(&budget, 200u));
    /* TEST: cleanup restores capacity for later bounded work. */
    assert(release_request(&budget, 200u));
    assert(budget.in_use == 700u);
    return 0;
}
`
    }
  ]
};
