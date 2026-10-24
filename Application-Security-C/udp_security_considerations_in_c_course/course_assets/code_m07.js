window.COURSE_CODE_MODULE = {
  "title": "Rate Limits, Amplification Risk, and Availability",
  "codeIntro": "A functional token bucket needs a monotonic time input, a refill rate, a capacity, and an explicit per-request cost. Response budgets should also prevent amplification.",
  "codeExamples": [
    {
      "title": "Refill and consume a monotonic-time token bucket",
      "language": "c",
      "blurb": "The bucket refills whole-second intervals, saturates at capacity, rejects time rollback, and charges a request before work begins.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

struct token_bucket {
    uint32_t tokens;
    uint32_t capacity;
    uint32_t refill_per_second;
    uint64_t last_refill_ms;
};

static bool bucket_is_valid(const struct token_bucket *bucket)
{
    return bucket != NULL && bucket->capacity != 0U &&
           bucket->refill_per_second != 0U &&
           bucket->tokens <= bucket->capacity;
}

static bool refill_bucket(struct token_bucket *bucket, uint64_t now_ms)
{
    uint64_t elapsed_ms;
    uint64_t intervals;
    uint32_t missing;
    uint64_t intervals_to_fill;

    if (!bucket_is_valid(bucket) || now_ms < bucket->last_refill_ms) {
        return false;
    }

    elapsed_ms = now_ms - bucket->last_refill_ms;
    intervals = elapsed_ms / UINT64_C(1000);
    if (intervals == 0U) {
        return true;
    }

    missing = bucket->capacity - bucket->tokens;
    intervals_to_fill =
        ((uint64_t)missing + bucket->refill_per_second - 1U) /
        bucket->refill_per_second;
    if (intervals >= intervals_to_fill) {
        bucket->tokens = bucket->capacity;
    } else {
        bucket->tokens +=
            (uint32_t)intervals * bucket->refill_per_second;
    }
    bucket->last_refill_ms += intervals * UINT64_C(1000);
    return true;
}

static bool allow_request(struct token_bucket *bucket,
                          uint64_t now_ms, uint32_t cost,
                          size_t request_bytes,
                          size_t proposed_response_bytes)
{
    if (!refill_bucket(bucket, now_ms) || cost == 0U ||
        cost > bucket->capacity || proposed_response_bytes > request_bytes ||
        bucket->tokens < cost) {
        return false;
    }
    bucket->tokens -= cost;
    return true;
}

int main(void)
{
    struct token_bucket bucket = {3U, 3U, 1U, UINT64_C(1000)};

    assert(allow_request(&bucket, UINT64_C(1000), 1U, 32U, 16U));
    assert(allow_request(&bucket, UINT64_C(1000), 2U, 32U, 32U));
    assert(!allow_request(&bucket, UINT64_C(1000), 1U, 32U, 16U));

    /* TEST: one full second refills one token; subsecond time does not. */
    assert(!allow_request(&bucket, UINT64_C(1999), 1U, 32U, 16U));
    assert(allow_request(&bucket, UINT64_C(2000), 1U, 32U, 16U));

    /* TEST: large time advances saturate, and time rollback is rejected. */
    assert(allow_request(&bucket, UINT64_C(10000), 3U, 64U, 64U));
    assert(!allow_request(&bucket, UINT64_C(9000), 1U, 64U, 32U));

    /* TEST: response amplification is rejected before consuming a token. */
    assert(!allow_request(&bucket, UINT64_C(11000), 1U, 8U, 64U));
    assert(bucket.tokens == 1U);
    return 0;
}
`
    },
    {
      "title": "Strict regression build",
      "language": "bash",
      "blurb": "Save the C listing to SOURCE.c and pass that path to this Bash script. It uses a fresh temporary build/run directory, stops on compilation failure, and makes enabled sanitizer findings fatal. CC selects the compiler; SANITIZE=1 enables supported AddressSanitizer/UndefinedBehaviorSanitizer checks (SANITIZE=0 disables them). No caller-owned output is overwritten.",
      "code": String.raw`#!/usr/bin/env bash
set -euo pipefail

compiler="${'$'}{CC:-clang}"
source_file="${'$'}{1:-udp_m07.c}"
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
