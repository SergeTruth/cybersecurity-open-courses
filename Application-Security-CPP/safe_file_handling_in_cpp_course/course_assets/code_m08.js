window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Own descriptors with RAII and enforce the byte ceiling during reading so error and oversize paths still clean up.",
  codeExamples: [
    {
      title: "Read a descriptor under a hard byte limit",
      language: "cpp",
      blurb: "The reader handles interruption, stops at EOF, and rejects the first byte beyond the application-owned maximum.",
      code: String.raw`#include <unistd.h>

#include <array>
#include <cerrno>
#include <cstddef>
#include <optional>
#include <utility>
#include <vector>

class UniqueFd {
public:
    explicit UniqueFd(int fd = -1) noexcept : fd_(fd) {}
    ~UniqueFd() { if (fd_ >= 0) (void)::close(fd_); }
    UniqueFd(const UniqueFd&) = delete;
    UniqueFd& operator=(const UniqueFd&) = delete;
    UniqueFd(UniqueFd&& other) noexcept
        : fd_(std::exchange(other.fd_, -1)) {}
    UniqueFd& operator=(UniqueFd&& other) noexcept {
        if (this != &other) {
            if (fd_ >= 0) (void)::close(fd_);
            fd_ = std::exchange(other.fd_, -1);
        }
        return *this;
    }
    int get() const noexcept { return fd_; }
private:
    int fd_;
};

std::optional<std::vector<std::byte>> read_bounded(
    int fd, std::size_t maximum
) {
    if (fd < 0) return std::nullopt;
    std::vector<std::byte> result;
    std::array<std::byte, 256> chunk{};
    for (;;) {
        const ssize_t count = ::read(fd, chunk.data(), chunk.size());
        if (count == 0) return result;
        if (count < 0) {
            if (errno == EINTR) continue;
            return std::nullopt;
        }
        const auto amount = static_cast<std::size_t>(count);
        if (amount > maximum - result.size()) return std::nullopt;
        result.insert(result.end(), chunk.begin(), chunk.begin() + count);
    }
}`
    },
    {
      title: "Verify bounded reading and RAII closure",
      language: "cpp",
      blurb: "Pipe-backed tests prove a valid read succeeds and an oversized stream fails without manual descriptor cleanup.",
      code: String.raw`int test_bounded_raii_read() {
    int descriptors[2]{};
    if (::pipe(descriptors) != 0) return 1;
    UniqueFd input{descriptors[0]};
    UniqueFd output{descriptors[1]};
    if (::write(output.get(), "hello", 5) != 5) return 2;
    output = UniqueFd{};
    auto bytes = read_bounded(input.get(), 5);
    if (!bytes || bytes->size() != 5) return 3;

    int oversized[2]{};
    if (::pipe(oversized) != 0) return 4;
    UniqueFd large_input{oversized[0]};
    UniqueFd large_output{oversized[1]};
    if (::write(large_output.get(), "123456", 6) != 6) return 5;
    large_output = UniqueFd{};
    return read_bounded(large_input.get(), 5) ? 6 : 0;
}`
    }
  ]
};
