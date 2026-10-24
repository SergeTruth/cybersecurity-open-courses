window.COURSE_CODE_MODULE = {
  "title": "Arguments, Quoting, and Shell Avoidance: code example",
  "codeIntro": "Direct process creation keeps program identity, option names, and untrusted values as separate structured arguments.",
  "codeExamples": [
    {
      "title": "Vulnerable: untrusted value becomes shell syntax",
      "language": "c",
      "blurb": "The wrapper concatenates a report name into one command string, allowing a separator in data to introduce another shell command.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <string.h>

static bool build_command(char *dst, size_t capacity, const char *report)
{
    int written;

    if (dst == NULL || report == NULL || capacity == 0u) {
        return false;
    }
    /* IMPORTANT DEFECT: data and shell grammar share one string. */
    written = snprintf(dst, capacity, "/usr/bin/report --name %s", report);
    return written >= 0 && (size_t)written < capacity;
}

int main(void)
{
    char command[96];

    assert(build_command(command, sizeof command, "weekly; shutdown"));
    /* TEST: the command text now contains a second shell operation. */
    assert(strstr(command, "; shutdown") != NULL);
    return 0;
}
`
    },
    {
      "title": "Safer: preserve an explicit argument vector",
      "language": "c",
      "blurb": "The process request stores the trusted program and each argument separately, so shell punctuation remains ordinary argument data.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

struct process_request {
    const char *program;
    const char *arguments[3];
    size_t argument_count;
};

static bool request_valid(const struct process_request *request)
{
    if (request == NULL || request->program == NULL ||
        request->argument_count != 2u) {
        return false;
    }
    /* IMPORTANT FIX: no shell parser receives assembled command text. */
    return strcmp(request->program, "/usr/bin/report") == 0 &&
           request->arguments[0] != NULL &&
           strcmp(request->arguments[0], "--name") == 0 &&
           request->arguments[1] != NULL;
}

int main(void)
{
    const struct process_request request =
        { "/usr/bin/report", { "--name", "weekly; shutdown", NULL }, 2u };

    assert(request_valid(&request));
    /* TEST: punctuation remains entirely inside argument value two. */
    assert(strcmp(request.arguments[1], "weekly; shutdown") == 0);
    return 0;
}
`
    }
  ]
};
