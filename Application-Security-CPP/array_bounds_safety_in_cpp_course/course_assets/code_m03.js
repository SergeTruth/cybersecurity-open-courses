window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Prefer Containers and Bounded Views to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Use span to keep a bounded view at the API",
      "language": "cpp",
      "blurb": "The function receives both address and extent together and returns no borrowed element.",
      "code": "#include <cstdint>\n#include <span>\n\nstd::uint64_t sum_values(std::span<const std::uint32_t> values) {\n    std::uint64_t sum = 0;\n    for (std::uint32_t value : values) sum += value;\n    return sum;\n}\n"
    },
    {
      "title": "Choose owning containers by extent and lifetime",
      "language": "cpp",
      "blurb": "Fixed keys use std::array and variable records use std::vector; no pointer is separated from its size.",
      "code": "#include <array>\n#include <cstdint>\n#include <vector>\n#include <cstddef>\n\nstruct Batch {\n    std::array<std::byte, 16> request_id{};\n    std::vector<std::uint32_t> item_ids;\n};\n\nbool acceptable(const Batch& batch) {\n    return !batch.item_ids.empty() && batch.item_ids.size() <= 128;\n}\n"
    }
  ]
};
