window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Authorize a broker operation from trusted peer evidence and an application-owned least-privilege policy.",
  codeExamples: [
    {
      title: "Constrain operations by authenticated peer and role",
      language: "cpp",
      blurb: "The caller cannot construct peer evidence; the adapter obtains it from SO_PEERCRED and the broker combines it with an exact operation policy.",
      code: String.raw`#ifndef _GNU_SOURCE
#define _GNU_SOURCE
#endif

#include <sys/socket.h>
#include <unistd.h>

#include <cstdint>
#include <optional>
#include <set>
#include <utility>

enum class BrokerOperation { read_document, write_document, open_network };

class AuthenticatedPeerEvidence {
public:
    static std::optional<AuthenticatedPeerEvidence> from_socket(
        int connected_socket
    ) noexcept {
        if (connected_socket < 0) return std::nullopt;
        struct ucred credentials {};
        socklen_t size = sizeof(credentials);
        if (::getsockopt(connected_socket, SOL_SOCKET, SO_PEERCRED,
                         &credentials, &size) != 0 ||
            size != sizeof(credentials)) {
            return std::nullopt;
        }
        return AuthenticatedPeerEvidence{
            static_cast<std::uint32_t>(credentials.uid)
        };
    }

    std::uint32_t operating_system_uid() const noexcept { return uid_; }

private:
    explicit AuthenticatedPeerEvidence(std::uint32_t uid) : uid_(uid) {}
    std::uint32_t uid_;
};

class BrokerPolicy {
public:
    BrokerPolicy(std::uint32_t service_uid,
                 std::set<BrokerOperation> operations)
        : service_uid_(service_uid), operations_(std::move(operations)) {}

    bool allows(const AuthenticatedPeerEvidence& peer,
                BrokerOperation operation) const noexcept {
        return peer.operating_system_uid() == service_uid_ &&
               operations_.contains(operation);
    }

private:
    std::uint32_t service_uid_;
    std::set<BrokerOperation> operations_;
};`
    },
    {
      title: "Verify least-privilege broker decisions",
      language: "cpp",
      blurb: "A real connected peer receives one documented operation, while another operation and a non-socket descriptor are denied.",
      code: String.raw`int test_broker_least_privilege() {
    int sockets[2]{};
    if (::socketpair(AF_UNIX, SOCK_STREAM | SOCK_CLOEXEC, 0, sockets) != 0) {
        return 1;
    }
    const auto peer = AuthenticatedPeerEvidence::from_socket(sockets[0]);
    BrokerPolicy policy{static_cast<std::uint32_t>(::geteuid()),
                        {BrokerOperation::read_document}};
    if (!peer || !policy.allows(*peer, BrokerOperation::read_document)) {
        (void)::close(sockets[0]);
        (void)::close(sockets[1]);
        return 2;
    }
    if (policy.allows(*peer, BrokerOperation::open_network)) return 3;
    int pipe_descriptors[2]{};
    if (::pipe(pipe_descriptors) != 0) return 4;
    const bool rejected =
        !AuthenticatedPeerEvidence::from_socket(pipe_descriptors[0]);
    (void)::close(pipe_descriptors[0]);
    (void)::close(pipe_descriptors[1]);
    (void)::close(sockets[0]);
    (void)::close(sockets[1]);
    return rejected ? 0 : 5;
}`
    }
  ]
};
