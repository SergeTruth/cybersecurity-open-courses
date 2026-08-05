window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Verify ownership, type, links, permissions, and size on the descriptor actually opened rather than on an earlier pathname lookup.",
  codeExamples: [
    {
      title: "Open and verify protected configuration metadata",
      language: "cpp",
      blurb: "A bounded stack copy avoids allocation, O_NOFOLLOW rejects the final symlink, and fstat applies metadata policy to the same descriptor returned to the caller.",
      code: String.raw`#include <fcntl.h>
#include <sys/stat.h>
#include <unistd.h>

#include <algorithm>
#include <array>
#include <cstddef>
#include <optional>
#include <string_view>

bool config_basename(std::string_view name) noexcept {
    constexpr std::size_t maximum_name_size = 255;
    return !name.empty() && name.size() <= maximum_name_size &&
           name != "." && name != ".." &&
           name.find('/') == std::string_view::npos &&
           name.find('\\') == std::string_view::npos &&
           name.find('\0') == std::string_view::npos;
}

std::optional<int> open_protected_config(
    int directory_fd, std::string_view name, uid_t expected_owner
) noexcept {
    if (!config_basename(name)) return std::nullopt;
    std::array<char, 256> stable{};
    std::copy(name.begin(), name.end(), stable.begin());
    const int fd = ::openat(directory_fd, stable.data(),
                            O_RDONLY | O_CLOEXEC | O_NOFOLLOW);
    if (fd < 0) return std::nullopt;
    struct stat status {};
    const bool approved = ::fstat(fd, &status) == 0 &&
        S_ISREG(status.st_mode) && status.st_uid == expected_owner &&
        status.st_nlink == 1 && (status.st_mode & 0077) == 0 &&
        status.st_size >= 0 && status.st_size <= 16 * 1024;
    if (!approved) {
        (void)::close(fd);
        return std::nullopt;
    }
    return fd;
}`
    },
    {
      title: "Verify metadata approval and symlink rejection",
      language: "cpp",
      blurb: "The test approves a private regular file and rejects both a symlink and an oversized basename before opening either one.",
      code: String.raw`#include <array>
#include <cstdlib>

int test_protected_config_metadata() {
    std::array<char, 32> pattern{"/tmp/c05-meta-XXXXXX"};
    char* directory = ::mkdtemp(pattern.data());
    if (!directory) return 1;
    const int dirfd = ::open(directory, O_RDONLY | O_DIRECTORY | O_CLOEXEC);
    if (dirfd < 0) return 2;
    const int created = ::openat(dirfd, "config", O_WRONLY | O_CREAT |
        O_EXCL | O_CLOEXEC, 0600);
    if (created < 0) return 3;
    (void)::close(created);
    auto approved = open_protected_config(dirfd, "config", ::geteuid());
    if (!approved) return 4;
    (void)::close(*approved);
    if (::symlinkat("config", dirfd, "config-link") != 0) return 5;
    if (open_protected_config(dirfd, "config-link", ::geteuid())) return 6;
    std::array<char, 256> oversized{};
    oversized.fill('x');
    if (open_protected_config(
            dirfd,
            std::string_view{oversized.data(), oversized.size()},
            ::geteuid())) return 7;
    (void)::unlinkat(dirfd, "config-link", 0);
    (void)::unlinkat(dirfd, "config", 0);
    (void)::close(dirfd);
    return ::rmdir(directory) == 0 ? 0 : 8;
}`
    }
  ]
};
