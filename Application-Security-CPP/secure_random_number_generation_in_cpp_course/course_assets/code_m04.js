window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Bounded values use rejection sampling over a CSPRNG byte source.",
  "codeExamples": [
    {
      "title": "Map random 32-bit values without modulo bias",
      "language": "cpp",
      "blurb": "Values above the largest evenly divisible range are discarded before modulo reduction.",
      "code": "#include <array>\n#include <cstddef>\n#include <cstdint>\n#include <limits>\n#include <optional>\n#include <span>\n\nclass RandomBytes {\npublic:\n    virtual ~RandomBytes() = default;\n    virtual bool fill(std::span<std::byte> output) = 0;\n};\n\nstd::optional<std::uint32_t> secure_uniform(RandomBytes& random, std::uint32_t upper_exclusive) {\n    if (upper_exclusive == 0) return std::nullopt;\n    const std::uint32_t threshold = static_cast<std::uint32_t>(-upper_exclusive) % upper_exclusive;\n    for (unsigned attempt = 0; attempt < 128; ++attempt) {\n        std::array<std::byte, 4> raw{};\n        if (!random.fill(raw)) return std::nullopt;\n        std::uint32_t value = 0;\n        for (std::byte byte : raw) value = (value << 8) | std::to_integer<std::uint32_t>(byte);\n        if (value >= threshold) return value % upper_exclusive;\n    }\n    return std::nullopt;\n}\n"
    },
    {
      "title": "Exercise rejection and source failure paths",
      "language": "cpp",
      "blurb": "A scripted source makes the boundary behavior deterministic without weakening the production adapter.",
      "code": "#include <deque>\n#include <utility>\n\nclass ScriptedRandom final : public RandomBytes {\npublic:\n    explicit ScriptedRandom(std::deque<std::uint32_t> values) : values_(std::move(values)) {}\n    bool fill(std::span<std::byte> output) override {\n        if (values_.empty() || output.size() != 4) return false;\n        auto value = values_.front(); values_.pop_front();\n        for (int index = 3; index >= 0; --index) { output[index] = static_cast<std::byte>(value & 0xff); value >>= 8; }\n        return true;\n    }\nprivate: std::deque<std::uint32_t> values_;\n};\nint main() {\n    ScriptedRandom random({1, 17});\n    auto value = secure_uniform(random, 10);\n    if (!value || *value != 7) return 1;\n    ScriptedRandom failed({});\n    if (secure_uniform(failed, 10) || secure_uniform(random, 0)) return 2;\n    return 0;\n}\n"
    }
  ]
};
