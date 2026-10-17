window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The accumulator is immovable and publishes a complete owned message only when its declared size still matches the buffered bytes.",
  "codeExamples": [
    {
      "title": "Frame network input without partial or moved-from acceptance",
      "language": "cpp",
      "blurb": "The accumulator is immovable and publishes a complete owned message only when its declared size still matches the buffered bytes.",
      "code": "#include <utility>\n#include <cstddef>\n#include <optional>\n#include <span>\n#include <type_traits>\n#include <vector>\n\nclass FrameAccumulator {\npublic:\n    explicit FrameAccumulator(std::size_t expected) : expected_(expected) {}\n    FrameAccumulator(const FrameAccumulator&) = delete;\n    FrameAccumulator& operator=(const FrameAccumulator&) = delete;\n    FrameAccumulator(FrameAccumulator&&) = delete;\n    FrameAccumulator& operator=(FrameAccumulator&&) = delete;\n\n    bool append(std::span<const std::byte> chunk) {\n        if (complete_ || finished_) {\n            return false;\n        }\n        if (expected_ == 0 || expected_ > 64 ||\n            bytes_.size() > expected_ || chunk.size() > expected_ - bytes_.size()) {\n            return false;\n        }\n        bytes_.insert(bytes_.end(), chunk.begin(), chunk.end());\n        complete_ = bytes_.size() == expected_;\n        return true;\n    }\n\n    std::optional<std::vector<std::byte>> finish() {\n        if (finished_) return std::nullopt;\n        if (!complete_ || bytes_.size() != expected_) return std::nullopt;\n        finished_ = true;\n        return std::move(bytes_);\n    }\n\nprivate:\n    std::size_t expected_;\n    bool complete_ = false;\n    bool finished_ = false;\n    std::vector<std::byte> bytes_;\n};\n\nstatic_assert(!std::is_copy_constructible_v<FrameAccumulator>);\nstatic_assert(!std::is_move_constructible_v<FrameAccumulator>);\n\nint main() {\n    const std::byte first[]{std::byte{1}, std::byte{2}};\n    const std::byte second[]{std::byte{3}};\n    FrameAccumulator frame{3};\n    if (!frame.append(first) || frame.finish()) return 1;\n    if (!frame.append(second)) return 2;\n    const auto body = frame.finish();\n    if (!body || body->size() != 3) return 3;\n    return 0;\n}\n"
    }
  ]
};
