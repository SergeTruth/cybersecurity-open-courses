window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "An application-owned provider turns platform failures into explicit release-safe errors.",
  "codeExamples": [
    {
      "title": "Request random bytes through an approved provider boundary",
      "language": "cpp",
      "blurb": "The service does not retry with timestamps, counters, or standard-library PRNG engines.",
      "code": "#include <cstddef>\n#include <span>\n#include <stdexcept>\n#include <vector>\n\nclass ApprovedRandomProvider {\npublic:\n    virtual ~ApprovedRandomProvider() = default;\n    virtual bool fill(std::span<std::byte> output) noexcept = 0;\n};\n\nstd::vector<std::byte> require_random_bytes(ApprovedRandomProvider& provider, std::size_t count) {\n    if (count == 0 || count > 4096) throw std::length_error(\"random byte count rejected\");\n    std::vector<std::byte> output(count);\n    if (!provider.fill(output)) throw std::runtime_error(\"approved random source unavailable\");\n    return output;\n}\n"
    },
    {
      "title": "Prove provider failure does not trigger a weak fallback",
      "language": "cpp",
      "blurb": "The regression checks success, provider failure, and the application-owned byte ceiling.",
      "code": "class FixedProvider final : public ApprovedRandomProvider {\npublic:\n    explicit FixedProvider(bool available) : available_(available) {}\n    bool fill(std::span<std::byte> output) noexcept override {\n        if (!available_) return false;\n        for (auto& value : output) value = std::byte{0x31};\n        return true;\n    }\nprivate: bool available_;\n};\nint main() {\n    FixedProvider available(true);\n    if (require_random_bytes(available, 24).size() != 24) return 1;\n    FixedProvider unavailable(false);\n    try { (void)require_random_bytes(unavailable, 24); return 2; }\n    catch (const std::runtime_error&) {}\n    try { (void)require_random_bytes(available, 4097); return 3; }\n    catch (const std::length_error&) {}\n    return 0;\n}\n"
    }
  ]
};
