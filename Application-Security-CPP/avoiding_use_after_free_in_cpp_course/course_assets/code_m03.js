window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Raw Pointers, References, and Borrowed Access to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Validate size before allocation and return an owned snapshot",
      "language": "cpp",
      "blurb": "The size check is evaluated before make_unique, and callers receive copied bytes rather than an untracked span into unique ownership.",
      "code": "#include <cstddef>\n#include <memory>\n#include <stdexcept>\n#include <vector>\n\nclass ByteOwner {\n    static std::size_t checked(std::size_t count) {\n        if (count == 0 || count > 76) throw std::length_error(\"invalid byte count\");\n        return count;\n    }\n    std::size_t size_;\n    std::unique_ptr<std::byte[]> bytes_;\npublic:\n    explicit ByteOwner(std::size_t count)\n        : size_(checked(count)), bytes_(std::make_unique<std::byte[]>(size_)) {}\n\n    std::vector<std::byte> snapshot() const {\n        return {bytes_.get(), bytes_.get() + size_};\n    }\n};\n"
    },
    {
      "title": "Return shared immutable ownership for long-lived access",
      "language": "cpp",
      "blurb": "The caller receives an owning reference to the immutable vector instead of a separate view that could outlive its owner.",
      "code": "#include <cstddef>\n#include <memory>\n#include <vector>\n#include <utility>\n\nclass ByteStore {\n    std::shared_ptr<const std::vector<std::byte>> owner_;\npublic:\n    explicit ByteStore(std::vector<std::byte> bytes)\n        : owner_(std::make_shared<const std::vector<std::byte>>(std::move(bytes))) {}\n    std::shared_ptr<const std::vector<std::byte>> snapshot() const noexcept {\n        return owner_;\n    }\n};\n"
    }
  ]
};
