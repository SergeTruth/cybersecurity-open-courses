window.COURSE_CODE_MODULE = {
  "title": "C++ Code Examples",
  "codeIntro": "",
  "codeExamples": [
    {
      "title": "Read a Line and Enforce the Policy Limit",
      "language": "cpp",
      "blurb": "",
      "code": "#include <cstddef>\n#include <istream>\n#include <optional>\n#include <string>\n#include <utility>\n\n// On rejection the caller must close/discard this record source; do not\n// resume parsing its leftover bytes as a new trusted record.\nstd::optional<std::string> read_required_line(\n    std::istream& input, std::size_t max_length\n) {\n    constexpr std::size_t hard_limit = 64 * 1024;\n    if (max_length == 0 || max_length > hard_limit) return std::nullopt;\n    std::string line;\n    char ch = 0;\n    while (input.get(ch)) {\n        if (ch == '\\n') return line.empty() ? std::nullopt\n                                            : std::optional{std::move(line)};\n        if (ch == '\\0' || line.size() == max_length) return std::nullopt;\n        line.push_back(ch);\n    }\n    if (input.bad() || !input.eof() || line.empty()) return std::nullopt;\n    return line;\n}"
    },
    {
      "title": "Reject Partial Parses and Trailing Data",
      "language": "cpp",
      "blurb": "",
      "code": "#include <optional>\n#include <sstream>\n#include <string>\n\nstruct UserLimit {\n    std::string name;\n    int limit;\n};\n\nstd::optional<UserLimit> parse_user_limit(const std::string& line) {\n    std::istringstream stream(line);\n    UserLimit parsed{};\n    std::string trailing;\n\n    if (!(stream >> parsed.name >> parsed.limit)) {\n        return std::nullopt;\n    }\n    if (stream >> trailing) {\n        return std::nullopt;\n    }\n    if (parsed.name.size() > 31 || parsed.limit < 1 || parsed.limit > 100) {\n        return std::nullopt;\n    }\n\n    return parsed;\n}"
    }
  ]
};
