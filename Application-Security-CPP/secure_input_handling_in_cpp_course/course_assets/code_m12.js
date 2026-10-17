window.COURSE_CODE_MODULE = {
  "title": "C++ Code Examples",
  "codeIntro": "",
  "codeExamples": [
    {
      "title": "Validate Indexes Before Container Access",
      "language": "cpp",
      "blurb": "",
      "code": "#include <cstddef>\n#include <optional>\n#include <string>\n#include <vector>\n\nstruct Account {\n    std::string name;\n    bool enabled;\n};\n\nstd::optional<Account> get_account(const std::vector<Account>& accounts, std::size_t index) {\n    if (index >= accounts.size()) {\n        return std::nullopt;\n    }\n\n    return accounts[index];\n}"
    },
    {
      "title": "Reject Input That Would Grow Containers Too Far",
      "language": "cpp",
      "blurb": "",
      "code": "#include <cstddef>\n#include <optional>\n#include <string>\n#include <utility>\n#include <vector>\n\nstruct LogRecord {\n    std::string user;\n    std::string action;\n};\n\nbool append_limited(std::vector<LogRecord>& records, LogRecord next) {\n    constexpr std::size_t max_records = 5000;\n    constexpr std::size_t max_field_length = 80;\n\n    if (records.size() >= max_records) {\n        return false;\n    }\n    if (next.user.empty() || next.user.size() > max_field_length ||\n        next.action.empty() || next.action.size() > max_field_length) {\n        return false;\n    }\n\n    records.push_back(std::move(next));\n    return true;\n}"
    },
    {
      "title": "Limit Nesting Before Recursive Parsing",
      "language": "cpp",
      "blurb": "",
      "code": "#include <array>\n#include <cstddef>\n#include <string_view>\n\n// Bounded structural preflight, NOT a complete JSON validator. Feed accepted\n// input to a strict JSON parser and schema validator with the same limits.\nbool nesting_depth_allowed(std::string_view text) {\n    constexpr std::size_t max_bytes = 64 * 1024;\n    constexpr std::size_t max_depth = 20;\n    if (text.empty() || text.size() > max_bytes) return false;\n    std::array<char, max_depth> closers{};\n    std::size_t depth = 0;\n    bool in_string = false;\n    bool escaped = false;\n    for (unsigned char ch : text) {\n        if (in_string) {\n            if (ch < 0x20) return false;\n            if (escaped) escaped = false;\n            else if (ch == '\\\\') escaped = true;\n            else if (ch == '\"') in_string = false;\n        } else if (ch == '\"') {\n            in_string = true;\n        } else if (ch == '{' || ch == '[') {\n            if (depth == max_depth) return false;\n            closers[depth++] = ch == '{' ? '}' : ']';\n        } else if (ch == '}' || ch == ']') {\n            if (depth == 0 || closers[depth - 1] != ch) return false;\n            --depth;\n        }\n    }\n    return !in_string && !escaped && depth == 0;\n}"
    }
  ]
};
