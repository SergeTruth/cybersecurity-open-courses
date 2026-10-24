window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Ownership, Lifetime, and Resource Management to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Wrap an operating-system handle in move-only RAII",
      "language": "cpp",
      "blurb": "Acquisition and release use one owner whose destructor covers both normal and exceptional paths.",
      "code": "#include <unistd.h>\n#include <utility>\n\nclass FileDescriptor {\n    int value_ = -1;\npublic:\n    explicit FileDescriptor(int value = -1) noexcept : value_(value) {}\n    ~FileDescriptor() { if (value_ >= 0) ::close(value_); }\n    FileDescriptor(const FileDescriptor&) = delete;\n    FileDescriptor& operator=(const FileDescriptor&) = delete;\n    FileDescriptor(FileDescriptor&& other) noexcept\n        : value_(std::exchange(other.value_, -1)) {}\n    int get() const noexcept { return value_; }\n};\n"
    },
    {
      "title": "Expose an opaque resource through a C facade",
      "language": "cpp",
      "blurb": "The public boundary offers paired create and destroy functions while the C++ implementation retains layout and ownership.",
      "code": "#include <memory>\n\nstruct orders_context;\nstruct orders_context { std::unique_ptr<int> state = std::make_unique<int>(1); };\n\nextern \"C\" orders_context* orders_context_create() noexcept {\n    try { return new orders_context; }\n    catch (...) { return nullptr; }\n}\n\nextern \"C\" void orders_context_destroy(orders_context* context) noexcept {\n    delete context;\n}\n"
    }
  ]
};
