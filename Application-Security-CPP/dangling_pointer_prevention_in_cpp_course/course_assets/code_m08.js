window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply refactoring legacy lifetime bugs to a concrete security boundary and a release-safe regression.",
  "codeExamples": [
    {
      "title": "Replace a raw buffer view with an immutable owned snapshot",
      "language": "cpp",
      "blurb": "Size is checked before allocation and no pointer-like result can outlive its allocation.",
      "code": "#include <cstddef>\n#include <memory>\n#include <stdexcept>\n#include <vector>\n\nclass RefactoredPacket {\npublic:\n    explicit RefactoredPacket(std::size_t count)\n        : storage_(allocate(count)) {}\n\n    std::shared_ptr<const std::vector<std::byte>> retain() const noexcept {\n        return storage_;\n    }\n\nprivate:\n    static std::shared_ptr<const std::vector<std::byte>> allocate(\n        std::size_t count) {\n        if (count == 0 || count > 65536) {\n            throw std::length_error(\"packet size\");\n        }\n        return std::make_shared<const std::vector<std::byte>>(count);\n    }\n    std::shared_ptr<const std::vector<std::byte>> storage_;\n};\n"
    },
    {
      "title": "Reject extreme size before allocation and preserve retained ownership",
      "language": "cpp",
      "blurb": "The policy error is deterministic and a valid snapshot survives publisher destruction.",
      "code": "#include <limits>\n\nint test_refactored_packet_lifetime_contract() {\n    try {\n        RefactoredPacket invalid(std::numeric_limits<std::size_t>::max());\n        return 1;\n    } catch (const std::length_error&) {\n    }\n    auto retained = RefactoredPacket(8).retain();\n    return retained && retained->size() == 8 ? 0 : 2;\n}\n"
    }
  ]
};
