window.COURSE_CODE_MODULE = {
  "title": "Testing, Review, and Operational Validation",
  "codeIntro": "Turn the deployed private-file permission contract into executable regression checks and a strict build workflow.",
  "codeExamples": [
    {
      "title": "Permission-drift regression application",
      "language": "c",
      "blurb": "The policy accepts exactly owner read/write access and rejects group sharing, public access, execution, and special permission bits.",
      "code": `#include <assert.h>
#include <stdbool.h>

static bool private_data_mode(unsigned int permission_bits)
{
    /* IMPORTANT FIX: include special bits when checking the exact policy. */
    return (permission_bits & 07777U) == 0600U;
}

int main(void)
{
    assert(private_data_mode(0600U));

    /* TEST: common permission drift is rejected explicitly. */
    assert(!private_data_mode(0640U));
    assert(!private_data_mode(0666U));
    assert(!private_data_mode(0700U));
    assert(!private_data_mode(04600U));
    assert(!private_data_mode(0000U));
    return 0;
}
`
    },
    {
      "title": "Strict build and regression run",
      "language": "bash",
      "blurb": "Compile the exact permission-policy application shown above with strict diagnostics, then run every assertion.",
      "code": `set -eu
cc="\${CC:-gcc}"
"$cc" -std=c17 -Wall -Wextra -Wpedantic -Wconversion -Wshadow \\
  -Werror -Wno-unused-function example.c -o example
./example
`
    }
  ]
};
