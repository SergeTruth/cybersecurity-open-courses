window.COURSE_CODE_MODULE = {
  "title": "C++ Code Examples",
  "codeIntro": "",
  "codeExamples": [
    {
      "title": "Create a Validated Value at the Boundary",
      "language": "cpp",
      "blurb": "",
      "code": "#include <algorithm>\n#include <cctype>\n#include <cstddef>\n#include <optional>\n#include <string>\n#include <string_view>\n\nstruct LoginName {\n    std::string value;\n};\n\nbool is_login_name_char(unsigned char ch) {\n    return std::isalnum(ch) || ch == '_' || ch == '-';\n}\n\nstd::optional<LoginName> parse_login_name(std::string_view raw) {\n    constexpr std::size_t max_name = 31;\n\n    if (raw.empty() || raw.size() > max_name) {\n        return std::nullopt;\n    }\n\n    const bool safe = std::all_of(raw.begin(), raw.end(), [](char ch) {\n        return is_login_name_char(static_cast<unsigned char>(ch));\n    });\n\n    if (!safe) {\n        return std::nullopt;\n    }\n\n    return LoginName{std::string(raw)};\n}"
    },
    {
      "title": "Use Only Verified Fields Downstream",
      "language": "cpp",
      "blurb": "",
      "code": "#include <charconv>\n#include <cstddef>\n#include <optional>\n#include <string_view>\n#include <system_error>\n\nstruct PageRequest {\n    std::size_t page;\n    std::size_t page_size;\n};\n\nstd::optional<std::size_t> parse_size(std::string_view text, std::size_t min, std::size_t max) {\n    std::size_t value = 0;\n    const char* first = text.data();\n    const char* last = first + text.size();\n    auto [ptr, ec] = std::from_chars(first, last, value);\n\n    if (ec != std::errc{} || ptr != last || value < min || value > max) {\n        return std::nullopt;\n    }\n\n    return value;\n}\n\nstd::optional<PageRequest> parse_page_request(std::string_view page, std::string_view page_size) {\n    auto parsed_page = parse_size(page, 1, 10000);\n    auto parsed_size = parse_size(page_size, 1, 100);\n\n    if (!parsed_page || !parsed_size) {\n        return std::nullopt;\n    }\n\n    return PageRequest{*parsed_page, *parsed_size};\n}"
    }
  ]
};
