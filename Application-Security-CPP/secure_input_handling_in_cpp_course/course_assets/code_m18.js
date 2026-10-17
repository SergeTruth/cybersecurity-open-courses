window.COURSE_CODE_MODULE = {
  "title": "C++ Code Examples",
  "codeIntro": "",
  "codeExamples": [
    {
      "title": "Parse Raw Text into a Trusted Request Object",
      "language": "cpp",
      "blurb": "",
      "code": "#include <algorithm>\n#include <charconv>\n#include <cctype>\n#include <optional>\n#include <sstream>\n#include <string>\n#include <string_view>\n#include <system_error>\n\nstruct Request {\n    std::string name;\n    unsigned int count;\n};\n\nbool safe_name(std::string_view name) {\n    if (name.empty() || name.size() > 31) {\n        return false;\n    }\n    return std::all_of(name.begin(), name.end(), [](char ch) {\n        unsigned char value = static_cast<unsigned char>(ch);\n        return std::isalnum(value) || ch == '_' || ch == '-';\n    });\n}\n\nstd::optional<unsigned int> parse_count(std::string_view text) {\n    unsigned int value = 0;\n    auto [ptr, ec] = std::from_chars(text.data(), text.data() + text.size(), value);\n    if (ec != std::errc{} || ptr != text.data() + text.size() || value < 1 || value > 100) {\n        return std::nullopt;\n    }\n    return value;\n}\n\nstd::optional<Request> parse_request_line(const std::string& line) {\n    std::istringstream stream(line);\n    std::string name;\n    std::string count_text;\n    std::string trailing;\n\n    if (!(stream >> name >> count_text) || (stream >> trailing)) {\n        return std::nullopt;\n    }\n    if (!safe_name(name)) {\n        return std::nullopt;\n    }\n\n    auto count = parse_count(count_text);\n    if (!count) {\n        return std::nullopt;\n    }\n\n    return Request{name, *count};\n}"
    },
    {
      "title": "Keep Later Code Behind the Validated Type",
      "language": "cpp",
      "blurb": "",
      "code": "#include <iostream>\n#include <optional>\n#include <string>\n\nbool process_request(const Request& request) {\n    for (unsigned int i = 0; i < request.count; ++i) {\n        std::cout << \"processing \" << request.name << '\\n';\n    }\n    return true;\n}\n\nbool handle_raw_line(const std::string& raw_line) {\n    auto request = parse_request_line(raw_line);\n    if (!request) {\n        return false;\n    }\n\n    return process_request(*request);\n}"
    }
  ]
};
