window.COURSE_CODE_MODULE = {
  "title": "C++ Code Examples",
  "codeIntro": "",
  "codeExamples": [
    {
      "title": "Select Approved Content Without Reopening Paths",
      "language": "cpp",
      "blurb": "",
      "code": "#include <cstddef>\n#include <map>\n#include <optional>\n#include <stdexcept>\n#include <string>\n#include <string_view>\n#include <utility>\n\n// Bootstrap receives reviewed content from a trusted deployment artifact,\n// not paths or bytes supplied by a request. Configurations here are public\n// application configuration, not per-user secrets. Filesystem ingestion is\n// outside this example: use immutable artifacts or an OS-enforced reader.\n// This catalog deliberately does NOT provide live filesystem access.\nclass ApprovedConfigCatalog {\npublic:\n    explicit ApprovedConfigCatalog(std::map<std::string, std::string> approved) {\n        if (approved.size() > 64) throw std::length_error(\"config count\");\n        std::size_t total = 0;\n        for (const auto& [name, content] : approved) {\n            if (!valid_name(name) || content.size() > 64 * 1024)\n                throw std::invalid_argument(\"config policy\");\n            total += content.size();\n            if (total > 1024 * 1024) throw std::length_error(\"config bytes\");\n        }\n        content_ = std::move(approved);\n    }\n\n    std::optional<std::string> read(std::string_view name) const {\n        if (!valid_name(name)) return std::nullopt;\n        const auto item = content_.find(std::string{name});\n        if (item == content_.end()) return std::nullopt;\n        return item->second; // owned, bounded copy; never reopen a pathname\n    }\n\nprivate:\n    static bool valid_name(std::string_view name) {\n        if (name.size() < 6 || name.size() > 64 ||\n            name.substr(name.size() - 5) != \".json\") return false;\n        for (char ch : name.substr(0, name.size() - 5)) {\n            if (!(ch >= 'a' && ch <= 'z') && !(ch >= '0' && ch <= '9') &&\n                ch != '_' && ch != '-') return false;\n        }\n        return true;\n    }\n    std::map<std::string, std::string> content_;\n};"
    },
    {
      "title": "Check Binary Header Lengths Against Available Data",
      "language": "cpp",
      "blurb": "",
      "code": "#include <cstddef>\n#include <cstdint>\n#include <optional>\n#include <string>\n#include <vector>\n\nstruct Packet {\n    std::uint16_t type;\n    std::vector<std::uint8_t> payload;\n};\n\nstd::uint32_t read_u32_le(const std::vector<std::uint8_t>& bytes, std::size_t offset) {\n    return static_cast<std::uint32_t>(bytes[offset]) |\n           (static_cast<std::uint32_t>(bytes[offset + 1]) << 8) |\n           (static_cast<std::uint32_t>(bytes[offset + 2]) << 16) |\n           (static_cast<std::uint32_t>(bytes[offset + 3]) << 24);\n}\n\nstd::optional<Packet> parse_packet(const std::vector<std::uint8_t>& bytes) {\n    constexpr std::size_t header_size = 10;\n    constexpr std::size_t max_payload = 4096;\n\n    if (bytes.size() < header_size) {\n        return std::nullopt;\n    }\n    if (std::string(reinterpret_cast<const char*>(bytes.data()), 4) != \"PKT1\") {\n        return std::nullopt;\n    }\n\n    const std::uint16_t type = static_cast<std::uint16_t>(bytes[4] | (bytes[5] << 8));\n    const std::uint32_t length = read_u32_le(bytes, 6);\n\n    if (length > max_payload || bytes.size() - header_size != length) {\n        return std::nullopt;\n    }\n\n    return Packet{type, std::vector<std::uint8_t>(bytes.begin() + header_size, bytes.end())};\n}"
    }
  ]
};
