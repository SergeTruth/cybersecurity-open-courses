window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The factory enforces the application ceiling before constructing owned dynamic storage.",
  "codeExamples": [
    {
      "title": "Validate allocation size before allocating",
      "language": "cpp",
      "blurb": "The factory enforces the application ceiling before constructing owned dynamic storage.",
      "code": "#include <cstddef>\n#include <memory>\n#include <optional>\n\nclass DynamicBlock {\npublic:\n    static std::optional<DynamicBlock> create(std::size_t size) {\n        if (size == 0 || size > 4096) return std::nullopt;\n        return DynamicBlock{size};\n    }\n    std::size_t size() const noexcept { return size_; }\nprivate:\n    explicit DynamicBlock(std::size_t size)\n        : data_(std::make_unique_for_overwrite<std::byte[]>(size)), size_(size) {}\n    std::unique_ptr<std::byte[]> data_;\n    std::size_t size_;\n};\n\nint main() {\n    if (DynamicBlock::create(static_cast<std::size_t>(-1))) return 1;\n    const auto block = DynamicBlock::create(256);\n    return block && block->size() == 256 ? 0 : 2;\n}\n"
    }
  ]
};
