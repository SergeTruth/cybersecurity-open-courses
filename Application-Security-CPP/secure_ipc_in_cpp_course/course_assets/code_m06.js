window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Transferred descriptors use a move-only owner with a stateless noexcept cleanup function.",
  "codeExamples": [
    {
      "title": "Own a received IPC descriptor exactly once",
      "language": "cpp",
      "blurb": "The wrapper stores no borrowed cleanup object, rejects invalid adoption, and invokes a process-lifetime cleanup function at most once.",
      "code": "#include <optional>\n#include <utility>\n\nusing DescriptorClose = void (*)(int) noexcept;\n\nclass ReceivedDescriptor {\npublic:\n    static std::optional<ReceivedDescriptor> adopt(\n        int descriptor,\n        DescriptorClose close_descriptor\n    ) noexcept {\n        if (descriptor < 0 || close_descriptor == nullptr) return std::nullopt;\n        return ReceivedDescriptor(descriptor, close_descriptor);\n    }\n\n    ReceivedDescriptor(const ReceivedDescriptor&) = delete;\n    ReceivedDescriptor& operator=(const ReceivedDescriptor&) = delete;\n\n    ReceivedDescriptor(ReceivedDescriptor&& other) noexcept\n        : descriptor_(std::exchange(other.descriptor_, -1)),\n          close_descriptor_(other.close_descriptor_) {}\n\n    ReceivedDescriptor& operator=(ReceivedDescriptor&& other) noexcept {\n        if (this != &other) {\n            reset();\n            descriptor_ = std::exchange(other.descriptor_, -1);\n            close_descriptor_ = other.close_descriptor_;\n        }\n        return *this;\n    }\n\n    ~ReceivedDescriptor() { reset(); }\n\n    int get() const noexcept { return descriptor_; }\n    int release() noexcept { return std::exchange(descriptor_, -1); }\n\n    void reset() noexcept {\n        const int descriptor = std::exchange(descriptor_, -1);\n        if (descriptor >= 0) close_descriptor_(descriptor);\n    }\n\nprivate:\n    ReceivedDescriptor(int descriptor, DescriptorClose close_descriptor) noexcept\n        : descriptor_(descriptor), close_descriptor_(close_descriptor) {}\n\n    int descriptor_ = -1;\n    DescriptorClose close_descriptor_ = nullptr;\n};\n"
    },
    {
      "title": "Verify adoption, movement, and release",
      "language": "cpp",
      "blurb": "The regression proves cleanup needs no external owner and released descriptors remain the caller's responsibility.",
      "code": "int closes = 0;\nvoid close_test_descriptor(int) noexcept { ++closes; }\n\nint main() {\n    {\n        auto first = ReceivedDescriptor::adopt(7, close_test_descriptor);\n        if (!first) return 1;\n        ReceivedDescriptor second(std::move(*first));\n        if (first->get() != -1 || second.get() != 7) return 2;\n    }\n    if (closes != 1) return 3;\n\n    {\n        auto released = ReceivedDescriptor::adopt(8, close_test_descriptor);\n        if (!released || released->release() != 8) return 4;\n    }\n    if (closes != 1) return 5;\n    if (ReceivedDescriptor::adopt(-1, close_test_descriptor)) return 6;\n    if (ReceivedDescriptor::adopt(9, nullptr)) return 7;\n    return 0;\n}\n"
    }
  ]
};
