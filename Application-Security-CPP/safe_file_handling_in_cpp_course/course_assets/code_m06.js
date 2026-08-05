window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Create a temporary file atomically, unlink its directory entry immediately, and retain access only through the owned descriptor.",
  codeExamples: [
    {
      title: "Create and own an anonymous private temporary file",
      language: "cpp",
      blurb: "mkstemp performs exclusive creation, immediate unlinking removes pathname replacement risk, and movement resets the source descriptor.",
      code: String.raw`#include <fcntl.h>
#include <sys/stat.h>
#include <unistd.h>

#include <optional>
#include <string>
#include <utility>
#include <vector>

class TemporaryFile {
public:
    static std::optional<TemporaryFile> create(
        const std::string& directory
    ) {
        if (directory.empty() || directory.find('\0') != std::string::npos) {
            return std::nullopt;
        }
        std::string pattern = directory + "/orders-XXXXXX";
        std::vector<char> writable(pattern.begin(), pattern.end());
        writable.push_back('\0');
        const int fd = ::mkstemp(writable.data());
        if (fd < 0) return std::nullopt;
        if (::fchmod(fd, 0600) != 0) {
            (void)::close(fd);
            (void)::unlink(writable.data());
            return std::nullopt;
        }
        if (::unlink(writable.data()) != 0) {
            (void)::close(fd);
            return std::nullopt;
        }
        return TemporaryFile{fd};
    }

    ~TemporaryFile() { reset(); }
    TemporaryFile(const TemporaryFile&) = delete;
    TemporaryFile& operator=(const TemporaryFile&) = delete;
    TemporaryFile(TemporaryFile&& other) noexcept
        : fd_(std::exchange(other.fd_, -1)) {}

    int descriptor() const noexcept { return fd_; }

private:
    explicit TemporaryFile(int fd) : fd_(fd) {}
    void reset() noexcept {
        if (fd_ >= 0) (void)::close(std::exchange(fd_, -1));
    }
    int fd_ = -1;
};`
    },
    {
      title: "Verify exclusive creation and anonymous lifetime",
      language: "cpp",
      blurb: "The created object has private permissions and zero directory links while the descriptor remains usable until scope exit.",
      code: String.raw`#include <array>

int test_private_temporary_file() {
    auto temporary = TemporaryFile::create("/tmp");
    if (!temporary) return 1;
    struct stat status {};
    if (::fstat(temporary->descriptor(), &status) != 0) return 2;
    if ((status.st_mode & 0777) != 0600 || status.st_nlink != 0) return 3;
    if (::write(temporary->descriptor(), "ok", 2) != 2) return 4;
    if (::lseek(temporary->descriptor(), 0, SEEK_SET) < 0) return 5;
    std::array<char, 2> bytes{};
    if (::read(temporary->descriptor(), bytes.data(), bytes.size()) != 2) {
        return 6;
    }
    return bytes == std::array<char, 2>{'o', 'k'} ? 0 : 7;
}`
    }
  ]
};
