window.COURSE_CODE_MODULE = {
  "title": "Source Addresses and Trust Decisions",
  "codeIntro": "Use source addresses only for routing and coarse admission policy, never as proof of peer identity. Authentication belongs in an approved secure transport or message-authentication mechanism.",
  "codeExamples": [
    {
      "title": "Apply a source routing policy without treating it as identity",
      "language": "c",
      "blurb": "The policy checks address family, subnet, and service port. Its name and return type deliberately describe eligibility, not authentication.",
      "code": String.raw`#define _POSIX_C_SOURCE 200809L
#include <arpa/inet.h>
#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <sys/socket.h>

struct source_policy {
    uint32_t network_host_order;
    uint32_t mask_host_order;
    uint16_t port_host_order;
};

static bool mask_is_contiguous(uint32_t mask)
{
    uint32_t inverse = ~mask;

    return (inverse & (inverse + 1U)) == 0U;
}

static bool source_is_routing_eligible(
    const struct sockaddr_in *source,
    const struct source_policy *policy)
{
    uint32_t source_address;

    if (source == NULL || policy == NULL ||
        source->sin_family != AF_INET ||
        !mask_is_contiguous(policy->mask_host_order)) {
        return false;
    }

    source_address = ntohl(source->sin_addr.s_addr);
    return ntohs(source->sin_port) == policy->port_host_order &&
           (source_address & policy->mask_host_order) ==
           (policy->network_host_order & policy->mask_host_order);
}

int main(void)
{
    const struct source_policy policy = {
        UINT32_C(0xc0000200), UINT32_C(0xffffff00), 9000U
    };
    struct sockaddr_in source = {0};

    source.sin_family = AF_INET;
    source.sin_addr.s_addr = htonl(UINT32_C(0xc000022c));
    source.sin_port = htons(9000U);
    assert(source_is_routing_eligible(&source, &policy));

    /* TEST: the same address on an unapproved port is not eligible. */
    source.sin_port = htons(9001U);
    assert(!source_is_routing_eligible(&source, &policy));

    /* TEST: an address outside the allowed subnet is not eligible. */
    source.sin_port = htons(9000U);
    source.sin_addr.s_addr = htonl(UINT32_C(0xc6336401));
    assert(!source_is_routing_eligible(&source, &policy));

    /* A passing source policy is still not cryptographic authentication. */
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
source_file="${'$'}{1:-udp_m04.c}"
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
