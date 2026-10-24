window.COURSE_CODE_MODULE = {
  "title": "Binding, Listening, and Endpoint Exposure: code example",
  "codeIntro": "Compare a convenience bind that broadens reachability with an explicit deployment policy that permits only the intended interface and service identity.",
  "codeExamples": [
    {
      "title": "Vulnerable: convenience binding exposes every interface",
      "language": "c",
      "blurb": "The service records a loopback-only intent but selects the all-interfaces address anyway, silently expanding its network boundary.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

enum bind_scope {
    BIND_LOOPBACK,
    BIND_PRIVATE,
    BIND_ANY
};

struct endpoint_plan {
    enum bind_scope intended_scope;
    enum bind_scope selected_scope;
};

static struct endpoint_plan plan_endpoint(enum bind_scope intended)
{
    struct endpoint_plan plan = { intended, BIND_ANY };

    /* IMPORTANT DEFECT: convenience overrides the documented exposure. */
    return plan;
}

int main(void)
{
    const struct endpoint_plan plan = plan_endpoint(BIND_LOOPBACK);

    /* TEST: local-only intent becomes reachable on every interface. */
    assert(plan.intended_scope == BIND_LOOPBACK);
    assert(plan.selected_scope == BIND_ANY);
    assert(plan.selected_scope != plan.intended_scope);
    return 0;
}
`
    },
    {
      "title": "Safer: enforce the reviewed endpoint plan",
      "language": "c",
      "blurb": "Binding proceeds only when the requested scope matches the deployment policy and the process uses the configured nonprivileged service identity.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

enum bind_scope {
    BIND_LOOPBACK,
    BIND_PRIVATE,
    BIND_ANY
};

struct endpoint_policy {
    enum bind_scope allowed_scope;
    size_t service_user_id;
};

static bool authorize_bind(const struct endpoint_policy *policy,
                           enum bind_scope requested_scope,
                           size_t process_user_id)
{
    if (policy == NULL) {
        return false;
    }

    /* IMPORTANT FIX: exposure and process identity must match policy. */
    return requested_scope == policy->allowed_scope &&
           process_user_id == policy->service_user_id &&
           process_user_id != 0u;
}

int main(void)
{
    const struct endpoint_policy policy = { BIND_LOOPBACK, 1001u };

    /* TEST: the reviewed local endpoint is accepted. */
    assert(authorize_bind(&policy, BIND_LOOPBACK, 1001u));

    /* TEST: broader exposure and a privileged identity are rejected. */
    assert(!authorize_bind(&policy, BIND_ANY, 1001u));
    assert(!authorize_bind(&policy, BIND_LOOPBACK, 0u));
    assert(!authorize_bind(NULL, BIND_LOOPBACK, 1001u));
    return 0;
}
`
    }
  ]
};
