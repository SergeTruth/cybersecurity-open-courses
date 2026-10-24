window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply ownership and resource boundaries to a concrete security boundary and a release-safe regression.",
  "codeExamples": [
    {
      "title": "Return a move-only file handle with deterministic cleanup",
      "language": "cpp",
      "blurb": "The type makes ownership transfer explicit and prevents duplicate close operations.",
      "code": "#if defined(_WIN32)\n#define _CRT_SECURE_NO_WARNINGS\n#endif\n#include <cstdio>\n#include <stdexcept>\n#include <utility>\n\nclass FileHandle {\npublic:\n    explicit FileHandle(std::FILE* file) : file_(file) {\n        if (!file_) throw std::invalid_argument(\"null file\");\n    }\n    ~FileHandle() { if (file_) std::fclose(file_); }\n    FileHandle(const FileHandle&) = delete;\n    FileHandle& operator=(const FileHandle&) = delete;\n    FileHandle(FileHandle&& other) noexcept\n        : file_(std::exchange(other.file_, nullptr)) {}\n\n    std::FILE* get() const noexcept { return file_; }\n\nprivate:\n    std::FILE* file_;\n};\n"
    },
    {
      "title": "Verify a moved-from resource cannot still be used as owner",
      "language": "cpp",
      "blurb": "The explicit state check documents the API's post-move contract.",
      "code": "int test_file_handle_moves_unique_ownership() {\n    std::FILE* temporary = std::tmpfile();\n    if (!temporary) return 77;\n    FileHandle first(temporary);\n    FileHandle second(std::move(first));\n    if (first.get() != nullptr) return 1;\n    return second.get() == temporary ? 0 : 2;\n}\n"
    }
  ]
};
