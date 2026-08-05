window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "A move-only secret buffer wipes its allocation and exposes values only through owned snapshots or by-value inspection.",
  "codeExamples": [
    {
      "title": "Own and clear mutable secret bytes without borrowed views",
      "language": "cpp",
      "blurb": "The buffer cannot be copied, moved-from objects stay empty, and no public API can retain a span into its allocation.",
      "code": "#include <cstddef>\n#include <optional>\n#include <span>\n#include <utility>\n#include <vector>\n#if defined(_WIN32)\n#define WIN32_LEAN_AND_MEAN\n#include <windows.h>\n#endif\n\nvoid wipe_bytes(std::span<std::byte> bytes) noexcept {\n#if defined(_WIN32)\n    if (!bytes.empty()) SecureZeroMemory(bytes.data(), bytes.size());\n#else\n    volatile std::byte* cursor = bytes.data();\n    for (std::size_t i = 0; i < bytes.size(); ++i) cursor[i] = std::byte{0};\n#endif\n}\n\nclass SecretBuffer {\npublic:\n    explicit SecretBuffer(std::vector<std::byte> bytes)\n        : bytes_(std::move(bytes)) {}\n\n    SecretBuffer(const SecretBuffer&) = delete;\n    SecretBuffer& operator=(const SecretBuffer&) = delete;\n\n    SecretBuffer(SecretBuffer&& other) noexcept\n        : bytes_(std::move(other.bytes_)) {\n        other.bytes_.clear();\n    }\n\n    SecretBuffer& operator=(SecretBuffer&& other) noexcept {\n        if (this != &other) {\n            wipe_bytes(bytes_);\n            bytes_ = std::move(other.bytes_);\n            other.bytes_.clear();\n        }\n        return *this;\n    }\n\n    ~SecretBuffer() { wipe_bytes(bytes_); }\n\n    std::size_t size() const noexcept { return bytes_.size(); }\n    bool empty() const noexcept { return bytes_.empty(); }\n\n    std::optional<std::byte> byte_at(std::size_t index) const noexcept {\n        if (index >= bytes_.size()) return std::nullopt;\n        return bytes_[index];\n    }\n\n    SecretBuffer owned_snapshot() const {\n        return SecretBuffer(bytes_);\n    }\n\nprivate:\n    std::vector<std::byte> bytes_;\n};\n"
    },
    {
      "title": "Verify movement and wrapper-safe owned snapshots",
      "language": "cpp",
      "blurb": "The regression keeps every inspected byte owned after a temporary optional wrapper has been destroyed.",
      "code": "#include <type_traits>\n\nstatic_assert(!std::is_copy_constructible_v<SecretBuffer>);\nstatic_assert(std::is_nothrow_move_constructible_v<SecretBuffer>);\n\nint main() {\n    SecretBuffer first(std::vector<std::byte>{std::byte{1}, std::byte{2}});\n    SecretBuffer second(std::move(first));\n    if (second.size() != 2 || second.byte_at(0) != std::byte{1}) return 1;\n    if (!first.empty()) return 2;\n\n    auto snapshot = std::optional<SecretBuffer>{\n        std::in_place,\n        std::vector<std::byte>{std::byte{0x41}, std::byte{0x42}}\n    }->owned_snapshot();\n    if (snapshot.size() != 2 || snapshot.byte_at(0) != std::byte{0x41}) return 3;\n    if (snapshot.byte_at(2).has_value()) return 4;\n    return 0;\n}\n"
    }
  ]
};
