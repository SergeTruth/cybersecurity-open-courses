window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Input Validation, Parsing, and Error Handling to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Parse a bounded decimal identifier with from_chars",
      "language": "cpp",
      "blurb": "The parser requires full consumption, rejects syntax errors, and enforces the library's semantic identifier range.",
      "code": "#include <charconv>\n#include <cstdint>\n#include <optional>\n#include <string_view>\n#include <system_error>\n\nstd::optional<std::uint32_t> parse_order_id(std::string_view text) {\n    std::uint32_t value = 0;\n    const auto result = std::from_chars(text.data(), text.data() + text.size(), value);\n    if (result.ec != std::errc{} || result.ptr != text.data() + text.size()) {\n        return std::nullopt;\n    }\n    if (value == 0 || value > 10'000'000) return std::nullopt;\n    return value;\n}\n"
    },
    {
      "title": "Return typed errors without exposing implementation details",
      "language": "cpp",
      "blurb": "The result distinguishes invalid input from unavailable state while keeping internal exception text out of the public contract.",
      "code": "#include <optional>\n\nenum class Error { invalid_argument, unavailable, internal };\n\ntemplate<class T>\nstruct Result {\n    std::optional<T> value;\n    std::optional<Error> error;\n};\n\nResult<int> validated_quantity(int quantity) noexcept {\n    if (quantity < 1 || quantity > 1000) {\n        return {{}, Error::invalid_argument};\n    }\n    return {quantity, {}};\n}\n"
    }
  ]
};
