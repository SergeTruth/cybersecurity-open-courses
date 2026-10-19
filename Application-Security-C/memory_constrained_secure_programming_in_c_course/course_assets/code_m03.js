window.COURSE_CODE_MODULE = {
  "title": "Static Allocation and Fixed Buffers",
  "codeIntro": "A visible fixed capacity still needs an explicit policy: security-sensitive commands should reject loss of meaning rather than truncate silently.",
  "codeExamples": [
    {
      "title": "Vulnerable: Silently truncate the command",
      "language": "c",
      "blurb": "The fixed buffer is never overrun, but shortening a longer command changes its meaning while the function still reports success.",
      "code": `/* Test checks are active even with -DNDEBUG; each expression runs once. */
#define CHECK(condition) do { if (!(condition)) { \\
    (void)fprintf(stderr, "check failed: %s at line %d\\n", \\
                  #condition, __LINE__); return 1; \\
} } while (0)
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <string.h>

static bool store_command(char *output, size_t capacity,
                          const char *input, size_t input_length)
{
    size_t copied = 0U;

    if (output == NULL || input == NULL || capacity == 0U) {
        return false;
    }
    copied = input_length < capacity - 1U ? input_length : capacity - 1U;

    /* IMPORTANT DEFECT: semantic truncation is reported as success. */
    (void)memcpy(output, input, copied);
    output[copied] = 0;
    return true;
}

int main(void)
{
    char command[6] = { 0 };

    CHECK(store_command(command, sizeof command,
                         "ERASE_ALL", sizeof "ERASE_ALL" - 1U));

    /* TEST: a different valid-looking command is silently produced. */
    CHECK(strcmp(command, "ERASE") == 0);
    CHECK(strcmp(command, "ERASE_ALL") != 0);

    puts("semantic truncation defect demonstrated");
    return 0;
}
`
    },
    {
      "title": "Safer: Reject commands that do not fit",
      "language": "c",
      "blurb": "The owner of the fixed buffer accepts the exact maximum, preserves termination, and rejects oversize or embedded-NUL commands without changing prior state.",
      "code": `/* Test checks are active even with -DNDEBUG; each expression runs once. */
#define CHECK(condition) do { if (!(condition)) { \\
    (void)fprintf(stderr, "check failed: %s at line %d\\n", \\
                  #condition, __LINE__); return 1; \\
} } while (0)
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <string.h>

static bool store_command(char *output, size_t capacity,
                          const char *input, size_t input_length)
{
    if (output == NULL || input == NULL || capacity == 0U ||
        input_length >= capacity || memchr(input, 0, input_length) != NULL) {
        return false;
    }

    /* Reject embedded terminators; memmove also permits in-place normalization. */
    (void)memmove(output, input, input_length);
    output[input_length] = 0;
    return true;
}

int main(void)
{
    char command[6] = "ready";

    /* TEST: the exact five-character maximum is accepted and terminated. */
    CHECK(store_command(command, sizeof command,
                         "RESET", sizeof "RESET" - 1U));
    CHECK(strcmp(command, "RESET") == 0);
    CHECK(command[5] == 0);

    /* TEST: an oversized command rejects without replacing safe state. */
    CHECK(!store_command(command, sizeof command,
                          "ERASE_ALL", sizeof "ERASE_ALL" - 1U));
    CHECK(strcmp(command, "RESET") == 0);
    CHECK(!store_command(command, 0U, "", 0U));

    /* TEST: embedded NUL rejects without changing the previous command. */
    {
        const char hidden[] = { 'G', 'O', 0, 'X' };
        CHECK(!store_command(command, sizeof command, hidden, sizeof hidden));
        CHECK(strcmp(command, "RESET") == 0);
        CHECK(store_command(command, sizeof command, command, 5U));
        CHECK(strcmp(command, "RESET") == 0);
    }

    puts("fixed command buffer tests passed");
    return 0;
}
`
    }
  ]
};
