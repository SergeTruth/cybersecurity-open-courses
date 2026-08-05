window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Use domain types to prevent callers from mixing counts, byte sizes, and monetary amounts that share the same primitive representation.",
  "codeExamples": [
    {
      "title": "Represent byte counts as a validated domain type",
      "language": "cpp",
      "blurb": "The only constructor is a checked factory, and addition preserves the application ceiling.",
      "code": "#include <array>\n#include <cstddef>\n#include <optional>\n\nclass ByteCount {\npublic:\n    static std::optional<ByteCount> from(std::size_t value) {\n        if (value > maximum) return std::nullopt;\n        return ByteCount{value};\n    }\n    std::size_t value() const noexcept { return value_; }\n    std::optional<ByteCount> plus(ByteCount other) const {\n        if (other.value_ > maximum - value_) return std::nullopt;\n        return ByteCount{value_ + other.value_};\n    }\nprivate:\n    static constexpr std::size_t maximum = 16 * 1024 * 1024;\n    explicit ByteCount(std::size_t value) : value_(value) {}\n    std::size_t value_;\n};"
    },
    {
      "title": "Regression: the type carries its invariant through composition",
      "language": "cpp",
      "blurb": "Callers cannot construct or add an out-of-policy byte count.",
      "code": "int test_byte_count_type() {\n    const auto first = ByteCount::from(1024);\n    const auto second = ByteCount::from(2048);\n    if (!first || !second) return 1;\n    const auto sum = first->plus(*second);\n    if (!sum || sum->value() != 3072) return 2;\n    if (ByteCount::from(17 * 1024 * 1024)) return 3;\n    return 0;\n}"
    }
  ]
};
