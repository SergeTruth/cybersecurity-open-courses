window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Create unique staging data inside a trusted directory, commit it atomically, and distinguish replacement from confirmed directory durability.",
  codeExamples: [
    {
      title: "Replace a file with an explicit commit result",
      language: "cpp",
      blurb: "Bounded stack names and unique O_EXCL staging avoid allocation and collisions, while the result distinguishes pre-commit failure from unconfirmed post-commit durability.",
      code: String.raw`#include <fcntl.h>
#include <unistd.h>

#include <algorithm>
#include <array>
#include <atomic>
#include <cerrno>
#include <cstddef>
#include <cstdio>
#include <cstdint>
#include <string_view>

bool replacement_basename(std::string_view name) noexcept {
    constexpr std::size_t maximum_name_size = 255;
    return !name.empty() && name.size() <= maximum_name_size &&
           name != "." && name != ".." &&
           name.find('/') == std::string_view::npos &&
           name.find('\\') == std::string_view::npos &&
           name.find('\0') == std::string_view::npos;
}

bool write_all(int fd, std::string_view bytes) noexcept {
    while (!bytes.empty()) {
        const ssize_t written = ::write(fd, bytes.data(), bytes.size());
        if (written < 0 && errno == EINTR) continue;
        if (written <= 0) return false;
        bytes.remove_prefix(static_cast<std::size_t>(written));
    }
    return true;
}

enum class ReplaceResult {
    failed_before_commit,
    replaced_durability_unconfirmed,
    replaced_and_durable
};

ReplaceResult replace_file_at(int directory_fd,
                              std::string_view target,
                              std::string_view contents) noexcept {
    if (!replacement_basename(target) || contents.size() > 64 * 1024) {
        return ReplaceResult::failed_before_commit;
    }
    std::array<char, 256> target_name{};
    std::copy(target.begin(), target.end(), target_name.begin());
    static std::atomic_uint64_t sequence{0};
    std::array<char, 96> staging_name{};
    int fd = -1;
    for (unsigned attempt = 0; attempt < 32; ++attempt) {
        const auto identifier = sequence.fetch_add(
            1, std::memory_order_relaxed);
        const int length = std::snprintf(
            staging_name.data(), staging_name.size(),
            ".orders-replacement-%lld-%llu",
            static_cast<long long>(::getpid()),
            static_cast<unsigned long long>(identifier));
        if (length < 0 ||
            static_cast<std::size_t>(length) >= staging_name.size()) {
            return ReplaceResult::failed_before_commit;
        }
        fd = ::openat(directory_fd, staging_name.data(),
            O_WRONLY | O_CREAT | O_EXCL | O_CLOEXEC | O_NOFOLLOW, 0600);
        if (fd >= 0) break;
        if (errno != EEXIST) return ReplaceResult::failed_before_commit;
    }
    if (fd < 0) return ReplaceResult::failed_before_commit;
    bool ok = write_all(fd, contents) && ::fsync(fd) == 0;
    if (::close(fd) != 0) ok = false;
    if (!ok) {
        (void)::unlinkat(directory_fd, staging_name.data(), 0);
        return ReplaceResult::failed_before_commit;
    }
    if (::renameat(directory_fd, staging_name.data(),
                   directory_fd, target_name.data()) != 0) {
        (void)::unlinkat(directory_fd, staging_name.data(), 0);
        return ReplaceResult::failed_before_commit;
    }
    return ::fsync(directory_fd) == 0
        ? ReplaceResult::replaced_and_durable
        : ReplaceResult::replaced_durability_unconfirmed;
}`
    },
    {
      title: "Verify a complete atomic replacement",
      language: "cpp",
      blurb: "The regression requires a durable commit, reads back the exact bytes, and rejects traversal and oversized targets before any commit.",
      code: String.raw`#include <array>
#include <cstdlib>

int test_atomic_replacement() {
    std::array<char, 32> pattern{"/tmp/c05-write-XXXXXX"};
    char* directory = ::mkdtemp(pattern.data());
    if (!directory) return 1;
    const int dirfd = ::open(directory, O_RDONLY | O_DIRECTORY | O_CLOEXEC);
    if (dirfd < 0) return 2;
    if (replace_file_at(dirfd, "orders.txt", "committed") !=
        ReplaceResult::replaced_and_durable) return 3;
    if (replace_file_at(dirfd, "../outside", "bad") !=
        ReplaceResult::failed_before_commit) return 4;
    std::array<char, 256> oversized{};
    oversized.fill('x');
    if (replace_file_at(
            dirfd,
            std::string_view{oversized.data(), oversized.size()},
            "bad") != ReplaceResult::failed_before_commit) return 5;
    const int result = ::openat(dirfd, "orders.txt",
                                O_RDONLY | O_CLOEXEC | O_NOFOLLOW);
    if (result < 0) return 6;
    std::array<char, 16> bytes{};
    const ssize_t count = ::read(result, bytes.data(), bytes.size());
    (void)::close(result);
    (void)::unlinkat(dirfd, "orders.txt", 0);
    (void)::close(dirfd);
    (void)::rmdir(directory);
    return count == 9 && std::string_view{bytes.data(), 9} == "committed"
        ? 0 : 7;
}`
    }
  ]
};
