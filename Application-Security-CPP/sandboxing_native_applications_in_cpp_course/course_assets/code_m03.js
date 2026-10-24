window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Create broker capability material directly from the operating system CSPRNG instead of a deterministic standard-library engine.",
  codeExamples: [
    {
      title: "Generate a capability token from getrandom",
      language: "cpp",
      blurb: "The POSIX/Linux adapter retries interruption, requires every byte, and exposes no public constructor for arbitrary token bytes.",
      code: String.raw`#include <sys/random.h>

#include <array>
#include <cerrno>
#include <cstddef>
#include <optional>

class BrokerCapability {
public:
    static std::optional<BrokerCapability> create() noexcept {
        std::array<std::byte, 32> bytes{};
        std::size_t offset = 0;
        while (offset < bytes.size()) {
            const ssize_t count = ::getrandom(
                bytes.data() + offset, bytes.size() - offset, 0
            );
            if (count < 0) {
                if (errno == EINTR) continue;
                return std::nullopt;
            }
            if (count == 0) return std::nullopt;
            offset += static_cast<std::size_t>(count);
        }
        return BrokerCapability{bytes};
    }

    bool equals(const BrokerCapability& other) const noexcept {
        unsigned difference = 0;
        for (std::size_t index = 0; index < bytes_.size(); ++index) {
            difference |= std::to_integer<unsigned>(bytes_[index] ^
                                                     other.bytes_[index]);
        }
        return difference == 0;
    }

private:
    explicit BrokerCapability(std::array<std::byte, 32> bytes)
        : bytes_(bytes) {}
    std::array<std::byte, 32> bytes_;
};`
    },
    {
      title: "Verify OS-backed capability creation",
      language: "cpp",
      blurb: "Creation must succeed and equality must recognize the same opaque capability without exposing its bytes.",
      code: String.raw`int test_broker_capability() {
    auto capability = BrokerCapability::create();
    if (!capability || !capability->equals(*capability)) return 1;
    return 0;
}`
    }
  ]
};
