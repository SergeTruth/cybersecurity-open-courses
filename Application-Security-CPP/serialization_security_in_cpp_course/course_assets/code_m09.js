window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The standalone regression executes boundary cases and fails if any malformed frame is accepted.",
  "codeExamples": [
    {
      "title": "Run a deterministic malformed-input corpus",
      "language": "cpp",
      "blurb": "The standalone regression executes boundary cases and fails if any malformed frame is accepted.",
      "code": "#include <array>\n#include <cstddef>\n#include <span>\n\nbool valid_tlv(std::span<const std::byte> input) noexcept {\n    if (input.size() < 2) return false;\n    const auto length = std::to_integer<unsigned>(input[1]);\n    return length <= 16 && input.size() == length + 2;\n}\n\nint main() {\n    const std::array<std::byte, 2> empty_payload{std::byte{1}, std::byte{0}};\n    const std::array<std::byte, 3> truncated{std::byte{1}, std::byte{2}, std::byte{9}};\n    const std::array<std::byte, 2> oversized{std::byte{1}, std::byte{17}};\n    if (!valid_tlv(empty_payload)) return 1;\n    if (valid_tlv(truncated)) return 2;\n    return valid_tlv(oversized) ? 3 : 0;\n}\n"
    }
  ]
};
