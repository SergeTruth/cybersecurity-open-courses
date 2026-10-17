window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "A relative temporary name is validated before any descriptor-relative no-follow open.",
  "codeExamples": [
    {
      "title": "Validate one safe relative temporary filename",
      "language": "cpp",
      "blurb": "The filename contract rejects path separators, dot names, control characters, and unbounded input.",
      "code": "#include <optional>\n#include <string>\n#include <string_view>\n\nconstexpr bool ascii_temp_leaf_char(unsigned char ch) noexcept {\n    return (ch >= 'A' && ch <= 'Z') ||\n           (ch >= 'a' && ch <= 'z') ||\n           (ch >= '0' && ch <= '9') ||\n           ch == '-' || ch == '_';\n}\n\nstatic_assert(!ascii_temp_leaf_char(0xe9));\n\nstd::optional<std::string> safe_temp_leaf(std::string_view name) {\n    if (name.empty() || name.size() > 64 || name == \".\" || name == \"..\") return std::nullopt;\n    if (name.front() == '.' || name.back() == '.') return std::nullopt;\n    for (char raw : name) {\n        const auto ch = static_cast<unsigned char>(raw);\n        if (!ascii_temp_leaf_char(ch)) return std::nullopt;\n    }\n    return std::string(name);\n}\n\n#if !defined(_WIN32)\n#include <fcntl.h>\nint open_private_temp_at(int directory_fd, std::string_view leaf) {\n    auto safe = safe_temp_leaf(leaf);\n    if (!safe) return -1;\n    return ::openat(directory_fd, safe->c_str(), O_CREAT | O_EXCL | O_RDWR | O_CLOEXEC | O_NOFOLLOW, 0600);\n}\n#endif\n"
    },
    {
      "title": "Reject traversal-shaped and alternate-separator names",
      "language": "cpp",
      "blurb": "The portable regression checks the leaf contract; platform integration tests exercise the descriptor-relative open.",
      "code": "int main() {\n    auto valid = safe_temp_leaf(\"orders-7_tmp\");\n    if (!valid || *valid != \"orders-7_tmp\") return 1;\n    if (safe_temp_leaf(\"../orders\")) return 2;\n    if (safe_temp_leaf(\"subdir/orders\")) return 3;\n    if (safe_temp_leaf(\"subdir\\\\orders\")) return 4;\n    if (safe_temp_leaf(\"orders\\nadmin\")) return 5;\n    const std::string high_byte(1, static_cast<char>(0xe9));\n    if (safe_temp_leaf(high_byte)) return 6;\n    return 0;\n}\n"
    }
  ]
};
