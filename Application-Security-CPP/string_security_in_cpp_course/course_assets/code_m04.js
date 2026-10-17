window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "from_chars reports both conversion status and the first unconsumed character.",
  "codeExamples": [
    {
      "title": "Parse a complete decimal token",
      "language": "cpp",
      "blurb": "from_chars reports both conversion status and the first unconsumed character.",
      "code": "#include <charconv>\n#include <optional>\n#include <string_view>\n\nstd::optional<int> parse_port(std::string_view text) noexcept {\n    if (text.empty() || text.size() > 5) return std::nullopt;\n    int port = 0;\n    const auto result = std::from_chars(text.data(), text.data() + text.size(), port);\n    if (result.ec != std::errc{} || result.ptr != text.data() + text.size()) return std::nullopt;\n    if (port < 1 || port > 65535) return std::nullopt;\n    return port;\n}\n\nint main() {\n    if (parse_port(\"443x\") || parse_port(\"0\")) return 1;\n    const auto port = parse_port(\"443\");\n    return port && *port == 443 ? 0 : 2;\n}\n"
    }
  ]
};
