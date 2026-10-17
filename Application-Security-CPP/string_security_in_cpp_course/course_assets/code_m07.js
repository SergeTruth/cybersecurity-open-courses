window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The owner bounds secret length, deletes copying, and overwrites its fixed storage during destruction.",
  "codeExamples": [
    {
      "title": "Keep secrets in a wiping move-only buffer",
      "language": "cpp",
      "blurb": "The owner bounds secret length, deletes copying, and overwrites its fixed storage during destruction.",
      "code": "#include <algorithm>\n#include <array>\n#include <cstddef>\n#include <memory>\n#include <span>\n\nclass SecretBytes {\npublic:\n    static std::unique_ptr<SecretBytes> create(std::span<const std::byte> input) {\n        if (input.empty() || input.size() > 32) return {};\n        return std::unique_ptr<SecretBytes>{new SecretBytes{input}};\n    }\n    SecretBytes(const SecretBytes&) = delete;\n    SecretBytes& operator=(const SecretBytes&) = delete;\n    SecretBytes(SecretBytes&&) = delete;\n    ~SecretBytes() noexcept { volatile std::byte* p = bytes_.data(); for (std::size_t i = 0; i < bytes_.size(); ++i) p[i] = std::byte{0}; }\n    std::size_t size() const noexcept { return size_; }\nprivate:\n    explicit SecretBytes(std::span<const std::byte> input) : size_(input.size()) { std::ranges::copy(input, bytes_.begin()); }\n    std::array<std::byte, 32> bytes_{};\n    std::size_t size_ = 0;\n};\n\nint main() {\n    const std::byte value[]{std::byte{1}, std::byte{2}};\n    auto secret = SecretBytes::create(value);\n    if (!secret || secret->size() != 2) return 1;\n    return SecretBytes::create({}) ? 2 : 0;\n}\n"
    }
  ]
};
