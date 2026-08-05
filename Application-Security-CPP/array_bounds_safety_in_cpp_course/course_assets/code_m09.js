window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Sanitizers, and Build-Time Defenses to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Pin boundary behavior with explicit exit-code tests",
      "language": "cpp",
      "blurb": "The regression executes empty, exact-end, and rejected over-end subranges even when NDEBUG disables the standard assertion macro.",
      "code": "#include <array>\n#include <cstddef>\n#include <optional>\n#include <span>\n\ntemplate<class T>\nstd::optional<std::span<T>> slice(\n    std::span<T> all,\n    std::size_t at,\n    std::size_t count) {\n    if (at > all.size() || count > all.size() - at) return std::nullopt;\n    return all.subspan(at, count);\n}\n\nint main() {\n    std::array<int, 3> values{1, 2, 3};\n    if (!slice<int>(values, 0, 0).has_value()) return 1;\n    if (!slice<int>(values, 3, 0).has_value()) return 2;\n    if (slice<int>(values, 3, 1).has_value()) return 3;\n    return 0;\n}\n"
    },
    {
      "title": "Exercise a span consumer with libFuzzer",
      "language": "cpp",
      "blurb": "The harness supplies arbitrary bytes and makes the bounded parser independently compilable as a fuzz target.",
      "code": "#include <cstddef>\n#include <cstdint>\n#include <span>\n\nstd::uint64_t checksum(std::span<const std::uint8_t> bytes) {\n    std::uint64_t value = 0;\n    for (std::uint8_t byte : bytes) value = (value * 131) ^ byte;\n    return value;\n}\n\nextern \"C\" int LLVMFuzzerTestOneInput(\n    const std::uint8_t* data, std::size_t size) {\n    volatile auto value = checksum({data, size});\n    (void)value;\n    return 0;\n}\n"
    }
  ]
};
