window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Temporary cleanup is represented by a move-only handle plus an explicit publication state.",
  "codeExamples": [
    {
      "title": "Separate cleanup from successful artifact publication",
      "language": "cpp",
      "blurb": "A validated owner invokes a stateless noexcept cleanup function exactly once; publication changes only application disposition.",
      "code": "#include <optional>\n#include <utility>\n\nusing CloseHandle = void (*)(int) noexcept;\n\nclass TemporaryArtifact {\npublic:\n    static std::optional<TemporaryArtifact> adopt(\n        int handle,\n        CloseHandle close_handle\n    ) noexcept {\n        if (handle < 0 || close_handle == nullptr) return std::nullopt;\n        return TemporaryArtifact(handle, close_handle);\n    }\n    TemporaryArtifact(const TemporaryArtifact&) = delete;\n    TemporaryArtifact& operator=(const TemporaryArtifact&) = delete;\n    TemporaryArtifact(TemporaryArtifact&& other) noexcept\n        : handle_(std::exchange(other.handle_, -1)),\n          close_handle_(std::exchange(other.close_handle_, nullptr)),\n          published_(other.published_) {}\n    ~TemporaryArtifact() noexcept {\n        if (handle_ >= 0) close_handle_(handle_);\n    }\n    bool mark_published() noexcept {\n        if (handle_ < 0 || published_) return false;\n        published_ = true;\n        return true;\n    }\n    bool published() const noexcept { return published_; }\nprivate:\n    TemporaryArtifact(int handle, CloseHandle close_handle) noexcept\n        : handle_(handle), close_handle_(close_handle) {}\n    int handle_;\n    CloseHandle close_handle_;\n    bool published_ = false;\n};\n"
    },
    {
      "title": "Verify exactly-once handle cleanup across movement",
      "language": "cpp",
      "blurb": "The regression checks adoption, exactly-once cleanup across movement, and rejection of invalid cleanup contracts.",
      "code": "int closes = 0;\n\nvoid close_test_handle(int value) noexcept {\n    if (value == 9) ++closes;\n}\n\nint main() {\n    if (TemporaryArtifact::adopt(-1, close_test_handle)) return 1;\n    if (TemporaryArtifact::adopt(9, nullptr)) return 2;\n    {\n        auto first = TemporaryArtifact::adopt(9, close_test_handle);\n        if (!first) return 3;\n        TemporaryArtifact second(std::move(*first));\n        if (!second.mark_published() || !second.published()) return 4;\n        if (second.mark_published()) return 5;\n    }\n    if (closes != 1) return 6;\n    return 0;\n}\n"
    }
  ]
};
