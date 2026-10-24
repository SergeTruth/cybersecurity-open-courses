window.COURSE_CODE_MODULE = {
  "title": "Broadcast, Multicast, and Discovery Traffic",
  "codeIntro": "Discovery sockets need an explicit multicast group, interface, TTL, membership operation, broadcast policy, message contract, and response budget. This example injects setsockopt so those decisions can be regression-tested without joining a live network.",
  "codeExamples": [
    {
      "title": "Configure and validate scoped multicast discovery",
      "language": "c",
      "blurb": "The policy permits only an administratively scoped discovery group, a named interface address, TTL 1, disabled broadcast, explicit membership, and a response no larger than the request.",
      "code": String.raw`#define _DEFAULT_SOURCE
#include <arpa/inet.h>
#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <sys/socket.h>
#include <netinet/in.h>

typedef int (*set_option_fn)(int, int, int,
                             const void *, socklen_t);

struct discovery_config {
    struct in_addr group;
    struct in_addr interface_address;
    unsigned char ttl;
    size_t maximum_request;
    size_t maximum_response;
};

static bool discovery_config_valid(const struct discovery_config *config)
{
    uint32_t group;
    uint32_t interface_address;

    if (config == NULL) {
        return false;
    }
    group = ntohl(config->group.s_addr);
    interface_address = ntohl(config->interface_address.s_addr);

    /* This service reserves 239.255.0.0/16 for local discovery. */
    return (group & UINT32_C(0xffff0000)) == UINT32_C(0xefff0000) &&
           interface_address != INADDR_ANY &&
           interface_address != INADDR_BROADCAST &&
           !IN_MULTICAST(interface_address) && config->ttl == 1U &&
           config->maximum_request >= 6U &&
           config->maximum_request <= 256U &&
           config->maximum_response <= config->maximum_request;
}

static bool apply_discovery_socket_policy(
    int socket_fd, const struct discovery_config *config,
    set_option_fn set_option)
{
    struct ip_mreq membership;
    int broadcast_enabled = 0;

    if (socket_fd < 0 || !discovery_config_valid(config) ||
        set_option == NULL) {
        return false;
    }

    membership.imr_multiaddr = config->group;
    membership.imr_interface = config->interface_address;
    return set_option(socket_fd, SOL_SOCKET, SO_BROADCAST,
                      &broadcast_enabled,
                      (socklen_t)sizeof broadcast_enabled) == 0 &&
           set_option(socket_fd, IPPROTO_IP, IP_MULTICAST_IF,
                      &config->interface_address,
                      (socklen_t)sizeof config->interface_address) == 0 &&
           set_option(socket_fd, IPPROTO_IP, IP_MULTICAST_TTL,
                      &config->ttl,
                      (socklen_t)sizeof config->ttl) == 0 &&
           set_option(socket_fd, IPPROTO_IP, IP_ADD_MEMBERSHIP,
                      &membership,
                      (socklen_t)sizeof membership) == 0;
}

static bool validate_discovery_request(
    const struct discovery_config *config,
    const uint8_t *datagram, size_t datagram_length,
    size_t *response_budget)
{
    size_t declared_length;

    if (!discovery_config_valid(config) || datagram == NULL ||
        response_budget == NULL || datagram_length < 6U ||
        datagram_length > config->maximum_request) {
        return false;
    }

    declared_length = ((size_t)datagram[2] << 8U) | datagram[3];
    if (datagram[0] != 1U || datagram[1] != 1U ||
        declared_length != datagram_length ||
        (datagram[4] == 0U && datagram[5] == 0U)) {
        return false;
    }

    *response_budget = datagram_length < config->maximum_response
        ? datagram_length : config->maximum_response;
    return true;
}

static unsigned int observed_options;
static struct in_addr expected_group;
static struct in_addr expected_interface_address;

static int recording_setsockopt(int socket_fd, int level, int option,
                                const void *value, socklen_t value_length)
{
    (void)socket_fd;
    if (value == NULL || value_length == 0U) {
        return -1;
    }
    if (level == SOL_SOCKET && option == SO_BROADCAST) {
        if (value_length != (socklen_t)sizeof(int) ||
            *(const int *)value != 0) {
            return -1;
        }
        observed_options |= 1U;
    } else if (level == IPPROTO_IP && option == IP_MULTICAST_IF) {
        const struct in_addr *interface_address = value;

        if (value_length != (socklen_t)sizeof(*interface_address) ||
            interface_address->s_addr != expected_interface_address.s_addr) {
            return -1;
        }
        observed_options |= 2U;
    } else if (level == IPPROTO_IP && option == IP_MULTICAST_TTL) {
        if (value_length != (socklen_t)sizeof(unsigned char) ||
            *(const unsigned char *)value != 1U) {
            return -1;
        }
        observed_options |= 4U;
    } else if (level == IPPROTO_IP && option == IP_ADD_MEMBERSHIP) {
        const struct ip_mreq *membership = value;

        if (value_length != (socklen_t)sizeof(*membership) ||
            membership->imr_multiaddr.s_addr != expected_group.s_addr ||
            membership->imr_interface.s_addr !=
                expected_interface_address.s_addr) {
            return -1;
        }
        observed_options |= 8U;
    } else {
        return -1;
    }
    return 0;
}

int main(void)
{
    struct discovery_config config = {
        {0}, {0}, 1U, 64U, 64U
    };
    const uint8_t request[] = {1U, 1U, 0U, 6U, 0x12U, 0x34U};
    size_t response_budget = 0U;

    config.group.s_addr = htonl(UINT32_C(0xefff0001));
    config.interface_address.s_addr = htonl(UINT32_C(0xc0000201));
    expected_group = config.group;
    expected_interface_address = config.interface_address;
    assert(apply_discovery_socket_policy(3, &config,
                                         recording_setsockopt));
    assert(observed_options == 15U);
    assert(validate_discovery_request(&config, request,
                                      sizeof request, &response_budget));
    assert(response_budget == sizeof request);

    /* TEST: broadcast, excessive TTL, and malformed discovery are rejected. */
    config.group.s_addr = htonl(INADDR_BROADCAST);
    assert(!discovery_config_valid(&config));
    config.group.s_addr = htonl(UINT32_C(0xefff0001));
    config.ttl = 5U;
    assert(!discovery_config_valid(&config));
    config.ttl = 1U;
    assert(!validate_discovery_request(&config, request,
                                       sizeof request - 1U,
                                       &response_budget));
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
source_file="${'$'}{1:-udp_m08.c}"
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
