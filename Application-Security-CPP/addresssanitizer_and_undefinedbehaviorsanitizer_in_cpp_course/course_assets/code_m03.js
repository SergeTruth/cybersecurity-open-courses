window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply UndefinedBehaviorSanitizer Fundamentals to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Trigger a controlled signed-overflow report",
      "language": "cpp",
      "blurb": "The deliberately defective test gives UBSan one deterministic signed overflow to report; it is not production code.",
      "code": "#include <cstdint>\n#include <limits>\n\nint main() {\n    volatile std::int32_t input = std::numeric_limits<std::int32_t>::max();\n    volatile std::int32_t result = input + 1; // Expected UBSan failure.\n    (void)result;\n}\n"
    },
    {
      "title": "Avoid misaligned typed access by copying bytes",
      "language": "cpp",
      "blurb": "Byte storage may have any alignment, so the corrected parser copies into an aligned integer object before applying byte order.",
      "code": "#include <array>\n#include <cstdint>\n#include <cstring>\n#include <cstddef>\n\nstd::uint32_t read_u32(const std::array<std::byte, 5>& input) {\n    std::uint32_t value = 0;\n    std::memcpy(&value, input.data() + 1, sizeof value);\n    return value;\n}\n\nint main() {\n    const std::array<std::byte, 5> input{};\n    return read_u32(input) == 0 ? 0 : 1;\n}\n"
    }
  ]
};
