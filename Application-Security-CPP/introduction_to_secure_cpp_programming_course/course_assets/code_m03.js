window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Validate an extent before allocation and return an owning value whose storage cannot dangle when a temporary owner is destroyed.",
  "codeExamples": [
    {
      "title": "Return owned bytes after validating the requested extent",
      "language": "cpp",
      "blurb": "The allocation occurs only after policy validation, and the result owns its storage instead of exposing a span into another object.",
      "code": "#include <cstddef>\n#include <optional>\n#include <vector>\n\nclass OwnedBytes {\npublic:\n    static std::optional<OwnedBytes> create(std::size_t count) {\n        if (count == 0 || count > 4096) return std::nullopt;\n        return OwnedBytes{count};\n    }\n    std::size_t size() const noexcept { return bytes_.size(); }\n    std::byte& at(std::size_t index) { return bytes_.at(index); }\nprivate:\n    explicit OwnedBytes(std::size_t count) : bytes_(count) {}\n    std::vector<std::byte> bytes_;\n};"
    },
    {
      "title": "Regression: the returned value owns its lifetime",
      "language": "cpp",
      "blurb": "The original use-after-free shape is impossible because no untracked span escapes a unique owner.",
      "code": "int test_owned_bytes() {\n    if (OwnedBytes::create(0)) return 1;\n    if (OwnedBytes::create(4097)) return 2;\n    auto bytes = OwnedBytes::create(8);\n    if (!bytes || bytes->size() != 8) return 3;\n    bytes->at(0) = std::byte{7};\n    if (bytes->at(0) != std::byte{7}) return 4;\n    return 0;\n}"
    }
  ]
};
