window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Validate allocation policy before acquiring memory and define a moved-from owner as an empty, usable object.",
  codeExamples: [
    {
      title: "Create a bounded dynamic byte owner",
      language: "cpp",
      blurb: "The factory checks the count before allocation, movement leaves an empty source, and snapshots return owned bytes that survive temporary wrappers.",
      code: String.raw`#include <cstddef>
#include <memory>
#include <optional>
#include <utility>
#include <vector>

class DynamicBytes {
public:
    static std::optional<DynamicBytes> create(std::size_t count) {
        constexpr std::size_t maximum = 4096;
        if (count == 0 || count > maximum) return std::nullopt;
        return DynamicBytes{count};
    }

    DynamicBytes(DynamicBytes&& other) noexcept
        : bytes_(std::move(other.bytes_)),
          size_(std::exchange(other.size_, 0)) {}

    DynamicBytes& operator=(DynamicBytes&& other) noexcept {
        if (this != &other) {
            bytes_ = std::move(other.bytes_);
            size_ = std::exchange(other.size_, 0);
        }
        return *this;
    }

    DynamicBytes(const DynamicBytes&) = delete;
    DynamicBytes& operator=(const DynamicBytes&) = delete;

    std::size_t size() const noexcept { return size_; }

    bool write(std::size_t index, std::byte value) noexcept {
        if (index >= size_) return false;
        bytes_[index] = value;
        return true;
    }

    std::optional<std::byte> read(std::size_t index) const noexcept {
        if (index >= size_) return std::nullopt;
        return bytes_[index];
    }

    std::vector<std::byte> snapshot() const {
        if (size_ == 0) return {};
        return {bytes_.get(), bytes_.get() + size_};
    }

private:
    explicit DynamicBytes(std::size_t count)
        : bytes_(std::make_unique<std::byte[]>(count)), size_(count) {}
    std::unique_ptr<std::byte[]> bytes_;
    std::size_t size_ = 0;
};`
    },
    {
      title: "Verify limits and moved-from safety",
      language: "cpp",
      blurb: "The regression checks bounds and movement, then proves a snapshot obtained through a temporary optional remains independently owned.",
      code: String.raw`int test_dynamic_bytes_lifetime() {
    if (DynamicBytes::create(0) || DynamicBytes::create(4097)) return 1;
    auto created = DynamicBytes::create(16);
    if (!created || created->size() != 16) return 2;
    if (!created->write(0, std::byte{7}) ||
        created->read(0) != std::byte{7} || created->write(16, std::byte{1})) {
        return 3;
    }
    DynamicBytes moved{std::move(*created)};
    if (created->size() != 0 || created->read(0) || moved.size() != 16) {
        return 4;
    }
    const auto copied = moved.snapshot();
    if (copied.size() != 16 || copied[0] != std::byte{7}) return 5;

    const auto temporary_snapshot = DynamicBytes::create(1024)->snapshot();
    return temporary_snapshot.size() == 1024 ? 0 : 6;
}`
    }
  ]
};
