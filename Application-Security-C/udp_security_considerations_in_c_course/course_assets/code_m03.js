window.COURSE_CODE_MODULE = {
  "title": "Binding, Listening, and Endpoint Exposure",
  "codeIntro": "Bind UDP sockets to an explicit address and make wider exposure a reviewed policy decision. This POSIX regression uses an ephemeral loopback port so it can run without external network access.",
  "codeExamples": [
    {
      "title": "Bind an explicitly approved UDP endpoint",
      "language": "c",
      "blurb": "The helper rejects wildcard, broadcast, and multicast bind addresses. Loopback is allowed by default; a specific external unicast address requires explicit approval.",
      "code": String.raw`#define _POSIX_C_SOURCE 200809L
#include <arpa/inet.h>
#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <sys/socket.h>
#include <unistd.h>

static bool bind_address_allowed(struct in_addr address,
                                 bool external_approved)
{
    uint32_t host_address = ntohl(address.s_addr);

    if (host_address == INADDR_ANY || host_address == INADDR_BROADCAST ||
        IN_MULTICAST(host_address)) {
        return false;
    }
    if ((host_address & UINT32_C(0xff000000)) ==
        UINT32_C(0x7f000000)) {
        return true;
    }
    return external_approved;
}

static bool bind_udp_endpoint(const char *address_text,
                              uint16_t requested_port,
                              bool external_approved,
                              int *socket_out,
                              uint16_t *bound_port_out)
{
    struct sockaddr_in endpoint = {0};
    struct sockaddr_in bound = {0};
    socklen_t bound_size = (socklen_t)sizeof bound;
    int socket_fd = -1;

    if (address_text == NULL || socket_out == NULL ||
        bound_port_out == NULL ||
        inet_pton(AF_INET, address_text, &endpoint.sin_addr) != 1 ||
        !bind_address_allowed(endpoint.sin_addr, external_approved)) {
        return false;
    }

    endpoint.sin_family = AF_INET;
    endpoint.sin_port = htons(requested_port);
    socket_fd = socket(AF_INET, SOCK_DGRAM, 0);
    if (socket_fd < 0 ||
        bind(socket_fd, (const struct sockaddr *)&endpoint,
             (socklen_t)sizeof endpoint) != 0 ||
        getsockname(socket_fd, (struct sockaddr *)&bound,
                    &bound_size) != 0) {
        if (socket_fd >= 0) {
            (void)close(socket_fd);
        }
        return false;
    }

    *socket_out = socket_fd;
    *bound_port_out = ntohs(bound.sin_port);
    return true;
}

int main(void)
{
    int socket_fd = -1;
    uint16_t bound_port = 0U;

    /* TEST: broad and non-approved external exposure is rejected. */
    assert(!bind_udp_endpoint("0.0.0.0", 9000U, false,
                              &socket_fd, &bound_port));
    assert(!bind_udp_endpoint("192.0.2.10", 9000U, false,
                              &socket_fd, &bound_port));

    /* TEST: loopback binding succeeds; port zero is test-only ephemeral use. */
    assert(bind_udp_endpoint("127.0.0.1", 0U, false,
                             &socket_fd, &bound_port));
    assert(socket_fd >= 0 && bound_port != 0U);
    assert(close(socket_fd) == 0);
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
source_file="${'$'}{1:-udp_m03.c}"
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
