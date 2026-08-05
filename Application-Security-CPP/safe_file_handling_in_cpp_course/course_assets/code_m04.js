window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Parse bounded text with an exact schema instead of treating a familiar file as trusted input.",
  codeExamples: [
    {
      title: "Parse exactly two bounded CSV fields",
      language: "cpp",
      blurb: "The parser rejects missing or extra fields, embedded controls, oversized values, and trailing records.",
      code: String.raw`#include <algorithm>
#include <cstddef>
#include <optional>
#include <sstream>
#include <string>
#include <utility>

struct ContactRow {
    std::string name;
    std::string email;
};

bool printable_field(const std::string& value, std::size_t maximum) {
    return !value.empty() && value.size() <= maximum &&
           std::all_of(value.begin(), value.end(), [](unsigned char ch) {
               return ch >= 0x20 && ch != 0x7f;
           });
}

std::optional<ContactRow> parse_contact_row(const std::string& input) {
    if (input.size() > 256 || input.find('\n') != std::string::npos ||
        input.find('\r') != std::string::npos) return std::nullopt;
    std::istringstream stream{input};
    std::string name;
    std::string email;
    std::string extra;
    if (!std::getline(stream, name, ',') ||
        !std::getline(stream, email, ',') ||
        std::getline(stream, extra, ',')) return std::nullopt;
    if (!printable_field(name, 80) || !printable_field(email, 120) ||
        email.find('@') == std::string::npos) return std::nullopt;
    return ContactRow{std::move(name), std::move(email)};
}`
    },
    {
      title: "Verify exact field-count and control rejection",
      language: "cpp",
      blurb: "Positive and negative cases cover valid data, an overflow field, a missing field, and newline injection.",
      code: String.raw`int test_contact_parser() {
    auto valid = parse_contact_row("alice,a@example.com");
    if (!valid || valid->name != "alice") return 1;
    if (parse_contact_row("alice,a@example.com,admin")) return 2;
    if (parse_contact_row("alice")) return 3;
    return parse_contact_row("alice,a@example.com\nadmin") ? 4 : 0;
}`
    }
  ]
};
