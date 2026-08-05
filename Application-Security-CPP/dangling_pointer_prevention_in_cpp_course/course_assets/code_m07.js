window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply lifetime-safe API design to a concrete security boundary and a release-safe regression.",
  "codeExamples": [
    {
      "title": "Publish an immutable shared snapshot for retained access",
      "language": "cpp",
      "blurb": "Asynchronous callers retain ownership of the exact bytes they observe.",
      "code": "#include <cstddef>\n#include <memory>\n#include <stdexcept>\n#include <vector>\n\nclass PolicyBytes {\npublic:\n    explicit PolicyBytes(std::vector<std::byte> bytes)\n        : bytes_(validate(std::move(bytes))) {}\n\n    std::shared_ptr<const std::vector<std::byte>> snapshot() const noexcept {\n        return bytes_;\n    }\n\nprivate:\n    static std::shared_ptr<const std::vector<std::byte>> validate(\n        std::vector<std::byte> bytes) {\n        if (bytes.empty() || bytes.size() > 4096) {\n            throw std::length_error(\"policy bytes\");\n        }\n        return std::make_shared<const std::vector<std::byte>>(std::move(bytes));\n    }\n    std::shared_ptr<const std::vector<std::byte>> bytes_;\n};\n"
    },
    {
      "title": "Retain a snapshot independently of its publisher",
      "language": "cpp",
      "blurb": "The shared immutable result remains valid after the publishing object leaves scope.",
      "code": "int test_policy_snapshot_owns_retained_access() {\n    std::shared_ptr<const std::vector<std::byte>> retained;\n    {\n        PolicyBytes policy({std::byte{1}, std::byte{2}});\n        retained = policy.snapshot();\n    }\n    if (!retained || retained->size() != 2) return 1;\n    return (*retained)[1] == std::byte{2} ? 0 : 2;\n}\n"
    }
  ]
};
