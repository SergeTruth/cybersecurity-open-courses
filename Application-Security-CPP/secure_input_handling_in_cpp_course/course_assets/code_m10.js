window.COURSE_CODE_MODULE = {
  "title": "C++ Code Examples",
  "codeIntro": "",
  "codeExamples": [
    {
      "title": "Parse an Integer Token with from_chars",
      "language": "cpp",
      "blurb": "",
      "code": "#include <charconv>\n#include <optional>\n#include <string_view>\n#include <system_error>\n\nstd::optional<unsigned short> parse_port(std::string_view text) {\n    unsigned int value = 0;\n    const char* first = text.data();\n    const char* last = first + text.size();\n    auto [ptr, ec] = std::from_chars(first, last, value);\n\n    if (ec != std::errc{} || ptr != last) {\n        return std::nullopt;\n    }\n    if (value < 1 || value > 65535) {\n        return std::nullopt;\n    }\n\n    return static_cast<unsigned short>(value);\n}"
    },
    {
      "title": "Check Size Math Before Allocation",
      "language": "cpp",
      "blurb": "",
      "code": "#include <cstddef>\n#include <limits>\n#include <optional>\n#include <vector>\n\nstruct Record {\n    unsigned int id;\n    unsigned int flags;\n};\n\nstd::optional<std::vector<Record>> allocate_records(std::size_t count) {\n    constexpr std::size_t max_records = 100000;\n    constexpr std::size_t max_bytes = 8 * 1024 * 1024;\n\n    if (count > max_records) {\n        return std::nullopt;\n    }\n    if (count > std::numeric_limits<std::size_t>::max() / sizeof(Record)) {\n        return std::nullopt;\n    }\n    if (count * sizeof(Record) > max_bytes) {\n        return std::nullopt;\n    }\n\n    return std::vector<Record>(count);\n}"
    }
  ]
};
