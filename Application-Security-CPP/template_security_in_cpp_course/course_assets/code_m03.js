window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The concept admits contiguous byte ranges and rejects unrelated element types at compile time.",
  "codeExamples": [
    {
      "title": "Constrain byte-oriented templates explicitly",
      "language": "cpp",
      "blurb": "The concept matches the contiguous, sized range operations used by the body, including native arrays. Views require an lvalue owner; range-operation exceptions propagate.",
      "code": "#include <array>\n#include <concepts>\n#include <cstddef>\n#include <ranges>\n#include <span>\n#include <type_traits>\n\ntemplate<class Range>\nconcept ByteRange = std::ranges::contiguous_range<Range> &&\n    std::ranges::sized_range<Range> &&\n    std::same_as<std::remove_cv_t<std::ranges::range_value_t<Range>>, std::byte> &&\n    requires(Range& range) {\n        std::span<const std::byte>{std::ranges::data(range), std::ranges::size(range)};\n    };\n\ntemplate<ByteRange Range>\nstd::span<const std::byte> bytes_of(Range& range) {\n    return {std::ranges::data(range), std::ranges::size(range)};\n}\n\ntemplate<class Range>\nconcept BytesViewable = requires(Range&& range) { bytes_of(static_cast<Range&&>(range)); };\n\nstatic_assert(BytesViewable<std::byte (&)[4]>);\nstatic_assert(BytesViewable<const std::byte (&)[4]>);\nstatic_assert(BytesViewable<std::array<std::byte, 4>&>);\nstatic_assert(BytesViewable<const std::array<std::byte, 4>&>);\nstatic_assert(!BytesViewable<std::array<std::byte, 4>>);\nstatic_assert(!BytesViewable<std::array<int, 4>&>);\nstatic_assert(!BytesViewable<volatile std::byte (&)[4]>);\n\nint main() {\n    const std::array<std::byte, 2> bytes{std::byte{1}, std::byte{2}};\n    std::byte native[3]{};\n    if (bytes_of(native).size() != 3) return 2;\n    return bytes_of(bytes).size() == 2 ? 0 : 1;\n}\n"
    }
  ]
};
