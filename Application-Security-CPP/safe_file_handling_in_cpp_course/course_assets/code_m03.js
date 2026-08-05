window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "On POSIX systems, open a validated basename relative to an already trusted directory descriptor and reject symlinks on the opened object.",
  codeExamples: [
    {
      title: "Open a bounded regular file beneath a directory descriptor",
      language: "cpp",
      blurb: "A bounded stack copy supplies openat with a stable name without allocation, O_NOFOLLOW rejects a final symlink, and fstat verifies the object actually opened.",
      code: String.raw`#include <fcntl.h>
#include <sys/stat.h>
#include <unistd.h>

#include <algorithm>
#include <array>
#include <cstddef>
#include <cstdint>
#include <optional>
#include <string_view>

bool plain_basename(std::string_view name) noexcept {
    constexpr std::size_t maximum_name_size = 255;
    return !name.empty() && name.size() <= maximum_name_size &&
           name != "." && name != ".." &&
           name.find('/') == std::string_view::npos &&
           name.find('\\') == std::string_view::npos &&
           name.find('\0') == std::string_view::npos;
}

std::optional<int> open_regular_beneath(
    int directory_fd, std::string_view name, std::size_t maximum_size
) noexcept {
    if (directory_fd < 0 || !plain_basename(name)) return std::nullopt;
    std::array<char, 256> stable{};
    std::copy(name.begin(), name.end(), stable.begin());
    const int fd = ::openat(directory_fd, stable.data(),
                            O_RDONLY | O_CLOEXEC | O_NOFOLLOW);
    if (fd < 0) return std::nullopt;
    struct stat status {};
    if (::fstat(fd, &status) != 0 || !S_ISREG(status.st_mode) ||
        status.st_size < 0 ||
        static_cast<std::uintmax_t>(status.st_size) > maximum_size) {
        (void)::close(fd);
        return std::nullopt;
    }
    return fd;
}`
    },
    {
      title: "Verify regular-file acceptance and symlink rejection",
      language: "cpp",
      blurb: "The regression opens a real file through the trusted directory, rejects a symlink to an outside file, and rejects an oversized basename without allocating.",
      code: String.raw`#include <array>
#include <cstdlib>

int test_open_regular_beneath() {
    std::array<char, 32> pattern{"/tmp/c05-open-XXXXXX"};
    char* directory = ::mkdtemp(pattern.data());
    if (!directory) return 1;
    const int dirfd = ::open(directory, O_RDONLY | O_DIRECTORY | O_CLOEXEC);
    if (dirfd < 0) return 2;
    const int created = ::openat(dirfd, "data.txt",
        O_WRONLY | O_CREAT | O_EXCL | O_CLOEXEC, 0600);
    if (created < 0 || ::write(created, "ok", 2) != 2) return 3;
    (void)::close(created);

    auto opened = open_regular_beneath(dirfd, "data.txt", 16);
    if (!opened) return 4;
    (void)::close(*opened);
    if (::symlinkat("/etc/passwd", dirfd, "outside") != 0) return 5;
    if (open_regular_beneath(dirfd, "outside", 4096)) return 6;
    std::array<char, 256> oversized{};
    oversized.fill('x');
    if (open_regular_beneath(
            dirfd,
            std::string_view{oversized.data(), oversized.size()},
            16)) return 7;

    (void)::unlinkat(dirfd, "outside", 0);
    (void)::unlinkat(dirfd, "data.txt", 0);
    (void)::close(dirfd);
    return ::rmdir(directory) == 0 ? 0 : 8;
}`
    }
  ]
};
