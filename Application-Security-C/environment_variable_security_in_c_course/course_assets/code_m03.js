window.COURSE_CODE_MODULE = {
  "title": "Trust Boundaries and Privileged Contexts",
  "codeIntro": "Compare ambient authorization with a design that treats the environment as a request and verifies authority separately.",
  "codeExamples": [
    {
      "title": "Vulnerable: environment value grants privilege",
      "language": "c",
      "blurb": "A key-rotation utility mistakes an inherited request flag for proof that the caller is authorized.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

static bool rotation_allowed(const char *rotate_env)
{
    if (rotate_env == NULL) {
        return false;
    }
    /* IMPORTANT DEFECT: ambient process state is used as authorization. */
    return strcmp(rotate_env, "1") == 0;
}

int main(void)
{
    const char *untrusted_environment = "1";

    /* TEST: a low-trust value alone enables the privileged operation. */
    assert(rotation_allowed(untrusted_environment));
    assert(!rotation_allowed(NULL));
    assert(!rotation_allowed("0"));
    return 0;
}
`
    },
    {
      "title": "Safer: authorize independently of the environment",
      "language": "c",
      "blurb": "The environment may request rotation, but a verified identity must authorize it and malformed requests are rejected.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

static bool rotation_decision(const char *rotate_env,
                              bool verified_operator,
                              bool *allowed)
{
    bool requested;

    if (rotate_env == NULL || allowed == NULL) {
        return false;
    }
    if (strcmp(rotate_env, "0") == 0) {
        requested = false;
    } else if (strcmp(rotate_env, "1") == 0) {
        requested = true;
    } else {
        return false;
    }

    /* IMPORTANT FIX: a request never substitutes for verified authority. */
    *allowed = requested && verified_operator;
    return true;
}

int main(void)
{
    bool allowed = true;

    /* TEST: an unverified caller cannot authorize key rotation. */
    assert(rotation_decision("1", false, &allowed));
    assert(!allowed);
    assert(rotation_decision("1", true, &allowed));
    assert(allowed);
    assert(rotation_decision("0", true, &allowed));
    assert(!allowed);
    assert(!rotation_decision("yes", true, &allowed));
    assert(!rotation_decision(NULL, true, &allowed));
    return 0;
}
`
    }
  ]
};
