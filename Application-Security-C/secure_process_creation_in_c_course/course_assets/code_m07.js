window.COURSE_CODE_MODULE = {
  "title": "Privileges, Identity, and Resource Limits: code example",
  "codeIntro": "A launch policy should bind the child to a reviewed identity and finite time, memory, output, and process limits.",
  "codeExamples": [
    {
      "title": "Vulnerable: child inherits authority without limits",
      "language": "c",
      "blurb": "The launcher checks only that a program was selected, allowing root identity and unlimited resource values to pass unchanged.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

struct child_policy {
    const char *program;
    uint32_t user_id;
    size_t memory_limit;
    size_t output_limit;
    unsigned int timeout_seconds;
};

static bool policy_accepted(const struct child_policy *policy)
{
    /* IMPORTANT DEFECT: program presence substitutes for least privilege. */
    return policy != NULL && policy->program != NULL;
}

int main(void)
{
    const struct child_policy unlimited = { "/usr/bin/report", 0u, 0u, 0u, 0u };

    assert(policy_accepted(&unlimited));
    /* TEST: root identity and unbounded resources were accepted. */
    return 0;
}
`
    },
    {
      "title": "Safer: require least privilege and finite limits",
      "language": "c",
      "blurb": "The policy requires the dedicated service identity and constrains memory, output, and execution time before launch.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <string.h>

struct child_policy {
    const char *program;
    uint32_t user_id;
    size_t memory_limit;
    size_t output_limit;
    unsigned int timeout_seconds;
};

static bool policy_accepted(const struct child_policy *policy)
{
    if (policy == NULL || policy->program == NULL) {
        return false;
    }
    /* IMPORTANT FIX: identity and resource authority are explicit limits. */
    return strcmp(policy->program, "/usr/bin/report") == 0 &&
           policy->user_id == 2001u &&
           policy->memory_limit > 0u && policy->memory_limit <= 64u * 1024u * 1024u &&
           policy->output_limit > 0u && policy->output_limit <= 1024u * 1024u &&
           policy->timeout_seconds > 0u && policy->timeout_seconds <= 30u;
}

int main(void)
{
    const struct child_policy bounded =
        { "/usr/bin/report", 2001u, 32u * 1024u * 1024u, 65536u, 10u };
    const struct child_policy root_child =
        { "/usr/bin/report", 0u, 32u * 1024u * 1024u, 65536u, 10u };

    assert(policy_accepted(&bounded));
    /* TEST: a privileged identity fails despite otherwise valid limits. */
    assert(!policy_accepted(&root_child));
    return 0;
}
`
    }
  ]
};
