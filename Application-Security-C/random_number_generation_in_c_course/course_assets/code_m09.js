window.COURSE_CODE_MODULE = {
  "title": "Testing, Review, and Operational Practices",
  "codeIntro": "Configuration must make deterministic test randomness and production platform randomness mutually exclusive.",
  "codeExamples": [
    {
      "title": "Test production and deterministic source separation",
      "language": "c",
      "blurb": "Test profiles require an explicit fixed seed, while production rejects any fixed-seed configuration and selects only the platform source.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

enum run_profile {
    PROFILE_TEST,
    PROFILE_PRODUCTION
};

enum selected_source {
    SOURCE_DETERMINISTIC_TEST,
    SOURCE_PLATFORM_SECURITY
};

static bool select_random_source(enum run_profile profile,
                                 bool fixed_seed_configured,
                                 enum selected_source *result)
{
    if (result == NULL) {
        return false;
    }
    if (profile == PROFILE_TEST) {
        if (!fixed_seed_configured) {
            return false;
        }
        *result = SOURCE_DETERMINISTIC_TEST;
        return true;
    }
    if (profile == PROFILE_PRODUCTION) {
        /* IMPORTANT FIX: fixed seeds are invalid production configuration. */
        if (fixed_seed_configured) {
            return false;
        }
        *result = SOURCE_PLATFORM_SECURITY;
        return true;
    }
    return false;
}

int main(void)
{
    enum selected_source source = SOURCE_DETERMINISTIC_TEST;

    assert(select_random_source(PROFILE_TEST, true, &source));
    assert(source == SOURCE_DETERMINISTIC_TEST);
    assert(select_random_source(PROFILE_PRODUCTION, false, &source));
    assert(source == SOURCE_PLATFORM_SECURITY);

    /* TEST: production determinism and implicit test seeds are rejected. */
    assert(!select_random_source(PROFILE_PRODUCTION, true, &source));
    assert(!select_random_source(PROFILE_TEST, false, &source));
    return 0;
}
`
    },
    {
      "title": "Build and run the exact source-selection tests",
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
