window.COURSE_CODE_MODULE = {
  "title": "C++ Code Examples",
  "codeIntro": "",
  "codeExamples": [
    {
      "title": "Copy to a C API Buffer Without Truncation",
      "language": "cpp",
      "blurb": "",
      "code": "#include <array>\n#include <cstring>\n#include <optional>\n#include <string_view>\n\nstd::optional<std::array<char, 32>> make_c_api_name(std::string_view input) {\n    std::array<char, 32> buffer{};\n\n    if (input.empty() || input.size() >= buffer.size()) {\n        return std::nullopt;\n    }\n    if (input.find('\\0') != std::string_view::npos) {\n        return std::nullopt;\n    }\n\n    std::memcpy(buffer.data(), input.data(), input.size());\n    buffer[input.size()] = '\\0';\n    return buffer;\n}"
    },
    {
      "title": "Keep string_view Tied to Owned Storage",
      "language": "cpp",
      "blurb": "",
      "code": "#include <optional>\n#include <string>\n#include <string_view>\n\nclass ParsedToken {\npublic:\n    static std::optional<ParsedToken> create(std::string raw) {\n        if (raw.empty() || raw.size() > 80) {\n            return std::nullopt;\n        }\n        return ParsedToken(std::move(raw));\n    }\n\n    std::string_view view() const {\n        return storage_;\n    }\n\nprivate:\n    explicit ParsedToken(std::string raw) : storage_(std::move(raw)) {}\n\n    std::string storage_;\n};"
    }
  ]
};
