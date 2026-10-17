window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Validate allocation bounds and return owned byte snapshots whose lifetime is independent of the batch and any wrapper that contains it.",
  "codeExamples": [
    {
      "title": "Validate size before constructing an owning container",
      "language": "cpp",
      "blurb": "The constructor checks the allocation policy first, while bytes returns an owned vector instead of exposing storage through a temporary-sensitive view.",
      "code": "#include <cstddef>\n#include <stdexcept>\n#include <vector>\n\nclass PacketBatch {\npublic:\n    explicit PacketBatch(std::size_t count)\n        : bytes_(checked_size(count)) {}\n\n    std::size_t size() const noexcept {\n        return bytes_.size();\n    }\n\n    std::vector<std::byte> bytes() const {\n        return bytes_;\n    }\n\nprivate:\n    static std::size_t checked_size(std::size_t count) {\n        if (count == 0 || count > 4096) {\n            throw std::length_error(\"packet batch size\");\n        }\n        return count;\n    }\n\n    std::vector<std::byte> bytes_;\n};"
    },
    {
      "title": "Exercise ownership transfer and wrapper-safe access",
      "language": "cpp",
      "blurb": "Movement transfers the batch, an impossible size fails before allocation, and data copied from a temporary optional remains owned by the caller.",
      "code": "#include <limits>\n#include <optional>\n#include <utility>\n\nint test_packet_batch_ownership() {\n    PacketBatch source{12};\n    PacketBatch destination{std::move(source)};\n    if (destination.size() != 12) return 1;\n\n    auto owned = std::optional<PacketBatch>{\n        std::in_place, 128\n    }->bytes();\n    if (owned.size() != 128) return 2;\n\n    try {\n        PacketBatch invalid{\n            std::numeric_limits<std::size_t>::max()\n        };\n        (void)invalid;\n        return 3;\n    } catch (const std::length_error&) {\n    }\n    return 0;\n}"
    }
  ]
};
