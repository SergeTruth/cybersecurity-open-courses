window.COURSE_CODE_MODULE = {
  "title": "Review, Testing, Logging, and Auditability",
  "codeIntro": "Privilege tests should cover denied and failed outcomes while audit records use stable categories instead of sensitive command or configuration data.",
  "codeExamples": [
    {
      "title": "Test bounded privilege audit events",
      "language": "c",
      "blurb": "The audit API records the security transition and outcome through fixed categories that are straightforward to assert and review.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <string.h>

enum privilege_event {
    EVENT_STARTUP_REJECTED,
    EVENT_REDUCTION_SUCCEEDED,
    EVENT_OPERATION_DENIED,
    EVENT_CHILD_FAILED
};

static const char *event_name(enum privilege_event event)
{
    switch (event) {
    case EVENT_STARTUP_REJECTED:
        return "startup_rejected";
    case EVENT_REDUCTION_SUCCEEDED:
        return "reduction_succeeded";
    case EVENT_OPERATION_DENIED:
        return "operation_denied";
    case EVENT_CHILD_FAILED:
        return "child_failed";
    default:
        return NULL;
    }
}

static bool record_privilege_event(char *output, size_t capacity,
                                   enum privilege_event event, bool success)
{
    const char *category = event_name(event);
    const char *outcome = success ? "success" : "failure";
    int written = 0;

    if (output == NULL || capacity == 0 || category == NULL) {
        return false;
    }

    /* IMPORTANT FIX: audit text is bounded and category-driven. */
    written = snprintf(output, capacity, "privilege event=%s result=%s",
                       category, outcome);
    return written >= 0 && (size_t)written < capacity;
}

int main(void)
{
    char event[80] = {0};

    assert(record_privilege_event(event, sizeof event,
                                  EVENT_OPERATION_DENIED, false));
    assert(strcmp(event,
                  "privilege event=operation_denied result=failure") == 0);

    /* TEST: success, denial, and invalid-category paths are explicit. */
    assert(record_privilege_event(event, sizeof event,
                                  EVENT_REDUCTION_SUCCEEDED, true));
    assert(strstr(event, "result=success") != NULL);
    assert(!record_privilege_event(event, sizeof event,
                                   (enum privilege_event)99, false));
    return 0;
}
`
    },
    {
      "title": "Build and run the exact privilege-event tests",
      "language": "bash",
      "blurb": "Save the C listing to SOURCE.c and pass that path to this Bash script. It uses a fresh temporary build/run directory, stops on compilation failure, and makes enabled sanitizer findings fatal. CC selects the compiler; SANITIZE=1 enables supported AddressSanitizer/UndefinedBehaviorSanitizer checks (SANITIZE=0 disables them). No caller-owned output is overwritten.",
      "code": String.raw`#!/usr/bin/env bash
set -euo pipefail

compiler="${'$'}{CC:-clang}"
source_file="${'$'}{1:?usage: $0 SOURCE.c}"
if [[ "$#" -gt 1 ]]; then
    printf 'usage: %s SOURCE.c\n' "$0" >&2
    exit 2
fi
# Resolve the source before entering the disposable test directory.
source_file="$(cd -- "$(dirname -- "$source_file")" && pwd -P)/$(basename -- "$source_file")"
if [[ ! -f "$source_file" ]]; then
    printf 'test source is not a regular file\n' >&2
    exit 2
fi
temp_parent="$(cd -- "${'$'}{TMPDIR:-/tmp}" && pwd -P)"
work_dir="$(mktemp -d "$temp_parent/c02-tests.XXXXXXXXXX")"
work_dir="$(cd -- "$work_dir" && pwd -P)"
# Validate the exact, newly created cleanup target before installing the trap.
if [[ "$work_dir" != "$temp_parent"/c02-tests.* || "$work_dir" == "$temp_parent" ]]; then
    printf 'unexpected temporary directory\n' >&2
    exit 2
fi
trap 'rm -rf -- "$work_dir"' EXIT
output_file="$work_dir/course-test"
platform_flags=()
case "$(uname -s)" in
    MINGW*|MSYS*|CYGWIN*)
        # Use the standard C APIs with the Microsoft CRT; retain other warnings.
        platform_flags=(-D_CRT_SECURE_NO_WARNINGS)
        ;;
esac
sanitizer_flags=()
if [[ "${'$'}{SANITIZE:-0}" == "1" ]]; then
    sanitizer_flags=(-fsanitize=address,undefined -fno-sanitize-recover=all
                     -fno-omit-frame-pointer)
fi

"$compiler" -std=c17 -Wall -Wextra -Wpedantic -Wconversion -Wshadow \
    -Werror "${'$'}{platform_flags[@]}" "${'$'}{sanitizer_flags[@]}" "$source_file" -o "$output_file"
# Run only this successful build. Fixtures stay inside the temporary directory.
(cd -- "$work_dir" && "$output_file")
`
    }
  ]
};
