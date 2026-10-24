window.COURSE_CODE_MODULE = {
  "title": "Detection, Testing, and Review Practices: code example",
  "codeIntro": "A focused regression application exercises normal teardown, cancellation, and repeated cleanup; a companion command runs it with strict warnings and runtime sanitizers.",
  "codeExamples": [
    {
      "title": "Lifetime regression tests for queued work",
      "language": "c",
      "blurb": "Assertions encode the invariant that queued work is cancelled before its request payload is released.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdlib.h>

struct request {
    unsigned char *payload;
    size_t length;
    bool work_queued;
};

static bool request_start(struct request *request, size_t length)
{
    if (request == NULL || length == 0u || request->payload != NULL) {
        return false;
    }
    request->payload = malloc(length);
    if (request->payload == NULL) {
        return false;
    }
    request->length = length;
    request->work_queued = true;
    return true;
}

static void request_cancel_work(struct request *request)
{
    if (request != NULL) {
        request->work_queued = false;
    }
}

static void request_cleanup(struct request *request)
{
    if (request == NULL) {
        return;
    }
    /* IMPORTANT FIX: cancel every future user before releasing its context. */
    request_cancel_work(request);
    free(request->payload);
    request->payload = NULL;
    request->length = 0u;
}

static bool request_can_dispatch(const struct request *request)
{
    return request != NULL && request->work_queued && request->payload != NULL;
}

int main(void)
{
    struct request request = {NULL, 0u, false};

    assert(!request_start(NULL, 8u));
    assert(!request_start(&request, 0u));
    assert(request_start(&request, 8u));
    assert(request_can_dispatch(&request));
    assert(!request_start(&request, 4u));

    request_cleanup(&request);
    /* TEST: teardown makes later dispatch impossible and repeated cleanup safe. */
    assert(!request.work_queued);
    assert(request.payload == NULL);
    assert(request.length == 0u);
    assert(!request_can_dispatch(&request));
    request_cleanup(&request);

    assert(request_start(&request, 1u));
    request_cancel_work(&request);
    assert(!request_can_dispatch(&request));
    request_cleanup(&request);
    return 0;
}
`
    },
    {
      "title": "Build and run a lifetime test with sanitizers",
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
if [[ "${'$'}{SANITIZE:-1}" == "1" ]]; then
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
