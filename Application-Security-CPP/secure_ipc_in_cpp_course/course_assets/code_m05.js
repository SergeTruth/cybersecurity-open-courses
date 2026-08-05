window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "A bounded TLV reader validates each field before allocation or interpretation.",
  "codeExamples": [
    {
      "title": "Parse a small IPC metadata map under resource limits",
      "language": "cpp",
      "blurb": "The parser bounds field count, key length, value length, and the exact remaining bytes.",
      "code": "#include <cstddef>\n#include <map>\n#include <optional>\n#include <span>\n#include <string>\n#include <utility>\n\nstd::optional<std::map<std::string, std::string>> parse_ipc_metadata(\n    std::span<const std::byte> bytes\n) {\n    std::map<std::string, std::string> fields;\n    std::size_t offset = 0;\n    while (offset < bytes.size()) {\n        if (fields.size() == 8 || bytes.size() - offset < 2) return std::nullopt;\n        const std::size_t key_size = std::to_integer<unsigned>(bytes[offset++]);\n        const std::size_t value_size = std::to_integer<unsigned>(bytes[offset++]);\n        if (key_size == 0 || key_size > 16 || value_size > 64 ||\n            key_size + value_size > bytes.size() - offset) return std::nullopt;\n        std::string key(reinterpret_cast<const char*>(bytes.data() + offset), key_size);\n        offset += key_size;\n        std::string value(reinterpret_cast<const char*>(bytes.data() + offset), value_size);\n        offset += value_size;\n        if (!fields.emplace(std::move(key), std::move(value)).second) return std::nullopt;\n    }\n    return fields;\n}\n"
    },
    {
      "title": "Reject duplicate and truncated TLV fields",
      "language": "cpp",
      "blurb": "The regression verifies one valid field and two malformed serializations.",
      "code": "#include <array>\n\nint main() {\n    std::array<std::byte, 5> valid{std::byte{1}, std::byte{2}, std::byte{'k'}, std::byte{'o'}, std::byte{'k'}};\n    auto fields = parse_ipc_metadata(valid);\n    if (!fields || fields->at(\"k\") != \"ok\") return 1;\n    std::array<std::byte, 4> truncated{std::byte{1}, std::byte{3}, std::byte{'k'}, std::byte{'x'}};\n    if (parse_ipc_metadata(truncated)) return 2;\n    std::array<std::byte, 8> duplicate{std::byte{1}, std::byte{1}, std::byte{'k'}, std::byte{'1'},\n                                       std::byte{1}, std::byte{1}, std::byte{'k'}, std::byte{'2'}};\n    if (parse_ipc_metadata(duplicate)) return 3;\n    return 0;\n}\n"
    }
  ]
};
