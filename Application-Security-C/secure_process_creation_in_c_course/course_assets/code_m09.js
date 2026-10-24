window.COURSE_CODE_MODULE = {
  "title": "Review, Testing, and Tool Support: code example",
  "codeIntro": "A launch-contract test makes path trust, structured arguments, controlled context, handle policy, limits, and timeout expectations executable.",
  "codeExamples": [
    {
      "title": "Table-driven launch contract tests",
      "language": "c",
      "blurb": "The complete application checks a valid contract and focused failures for shell use, inherited environment, and missing timeout policy.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

struct launch_contract {
    bool trusted_absolute_path;
    bool structured_arguments;
    bool shell_requested;
    bool controlled_environment;
    bool controlled_directory;
    bool handles_allowlisted;
    bool limits_set;
    bool timeout_set;
};

static bool contract_valid(const struct launch_contract *contract)
{
    return contract != NULL && contract->trusted_absolute_path &&
           contract->structured_arguments && !contract->shell_requested &&
           contract->controlled_environment && contract->controlled_directory &&
           contract->handles_allowlisted && contract->limits_set &&
           contract->timeout_set;
}

int main(void)
{
    const struct launch_contract valid =
        { true, true, false, true, true, true, true, true };
    struct launch_contract candidate = valid;

    assert(contract_valid(&valid));
    /* TEST: each reviewed launch assumption remains mandatory. */
    candidate.shell_requested = true;
    assert(!contract_valid(&candidate));
    candidate = valid;
    candidate.controlled_environment = false;
    assert(!contract_valid(&candidate));
    candidate = valid;
    candidate.timeout_set = false;
    assert(!contract_valid(&candidate));
    return 0;
}
`
    },
    {
      "title": "Strict launch-contract build",
      "language": "bash",
      "blurb": "Using launch_contract_test.c as an illustrative filename for the test above, compile with strict diagnostics and run under ASan and UBSan.",
      "code": String.raw`cc -std=c17 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Werror \
  -fsanitize=address,undefined -fno-omit-frame-pointer \
  launch_contract_test.c -o launch_contract_test

ASAN_OPTIONS=detect_leaks=1:halt_on_error=1 \
UBSAN_OPTIONS=halt_on_error=1 \
  ./launch_contract_test`
    }
  ]
};
