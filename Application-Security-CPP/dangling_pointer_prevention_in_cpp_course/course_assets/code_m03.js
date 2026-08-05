window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply safe borrowed access to a concrete security boundary and a release-safe regression.",
  "codeExamples": [
    {
      "title": "Validate byte count before creating owned storage",
      "language": "cpp",
      "blurb": "The constructor delegates only after the size policy succeeds and exposes an owned copy, not an escaping span.",
      "code": "#include <cstddef>\n#include <stdexcept>\n#include <utility>\n#include <vector>\n\nclass OwnedByteBuffer {\npublic:\n    explicit OwnedByteBuffer(std::size_t count)\n        : bytes_(validated_storage(count)) {}\n\n    std::vector<std::byte> copy() const { return bytes_; }\n\nprivate:\n    static std::vector<std::byte> validated_storage(std::size_t count) {\n        if (count == 0 || count > 1024 * 1024) {\n            throw std::length_error(\"byte buffer size\");\n        }\n        return std::vector<std::byte>(count);\n    }\n    std::vector<std::byte> bytes_;\n};\n"
    },
    {
      "title": "Keep retained bytes valid after the owner is destroyed",
      "language": "cpp",
      "blurb": "The returned vector owns its allocation and remains safe beyond the buffer's scope.",
      "code": "int test_owned_byte_buffer_copy_survives_owner() {\n    std::vector<std::byte> retained;\n    {\n        OwnedByteBuffer owner(4);\n        retained = owner.copy();\n    }\n    if (retained.size() != 4) return 1;\n    retained[0] = std::byte{7};\n    return retained[0] == std::byte{7} ? 0 : 2;\n}\n"
    }
  ]
};
