window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The small key-value decoder enforces one occurrence of every required field and rejects extra names.",
  "codeExamples": [
    {
      "title": "Reject duplicate and unknown fields",
      "language": "cpp",
      "blurb": "The small key-value decoder enforces one occurrence of every required field and rejects extra names.",
      "code": "#include <cstddef>\n#include <map>\n#include <optional>\n#include <string>\n#include <string_view>\n\nstd::optional<std::map<std::string, std::string>> parse_fields(std::string_view input) {\n    constexpr std::size_t maximum_input = 128;\n    constexpr std::size_t maximum_id = 24;\n    constexpr std::size_t maximum_role = 16;\n    if (input.empty() || input.size() > maximum_input) return std::nullopt;\n    std::map<std::string, std::string> fields;\n    while (!input.empty()) {\n        const auto end = input.find(';');\n        const auto item = input.substr(0, end);\n        const auto separator = item.find('=');\n        if (separator == std::string_view::npos || separator == 0) return std::nullopt;\n        const auto key = item.substr(0, separator);\n        const auto value = item.substr(separator + 1);\n        if (value.empty()) return std::nullopt;\n        const std::size_t maximum_value = key == \"id\" ? maximum_id : key == \"role\" ? maximum_role : 0;\n        if (maximum_value == 0 || value.size() > maximum_value) return std::nullopt;\n        if (!fields.emplace(std::string{key}, std::string{value}).second) return std::nullopt;\n        if (end == std::string_view::npos) break;\n        input.remove_prefix(end + 1);\n    }\n    if (!fields.contains(\"id\") || !fields.contains(\"role\")) return std::nullopt;\n    return fields;\n}\n\nint main() {\n    if (!parse_fields(\"id=42;role=reader\")) return 1;\n    if (parse_fields(\"id=42;id=43;role=reader\")) return 2;\n    if (parse_fields(\"id=42;role=reader;admin=true\")) return 3;\n    if (parse_fields(\"id=;role=reader\")) return 4;\n    const std::string oversized = \"id=\" + std::string(120, 'a') + \";role=reader\";\n    return parse_fields(oversized) ? 5 : 0;\n}\n"
    }
  ]
};
