window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Check element counts and byte arithmetic before allocation, then return fully initialized objects.",
  codeExamples: [
    {
      title: "Construct a bounded initialized record array",
      language: "cpp",
      blurb: "The factory validates count, multiplication, and an application byte ceiling before vector construction.",
      code: String.raw`#include <cstddef>
#include <limits>
#include <optional>
#include <vector>

struct Record {
    unsigned id = 0;
    bool enabled = false;
};

std::optional<std::vector<Record>> make_records(std::size_t count) {
    constexpr std::size_t maximum_bytes = 64 * 1024;
    if (count == 0 ||
        count > std::numeric_limits<std::size_t>::max() / sizeof(Record) ||
        count * sizeof(Record) > maximum_bytes) {
        return std::nullopt;
    }
    return std::vector<Record>(count);
}`
    },
    {
      title: "Verify initialized construction and size rejection",
      language: "cpp",
      blurb: "The regression checks value initialization and proves oversized counts are rejected before vector allocation.",
      code: String.raw`int test_record_construction() {
    auto records = make_records(4);
    if (!records || records->size() != 4) return 1;
    if ((*records)[0].id != 0 || (*records)[0].enabled) return 2;
    if (make_records(0)) return 3;
    return make_records(std::numeric_limits<std::size_t>::max()) ? 4 : 0;
}`
    }
  ]
};
