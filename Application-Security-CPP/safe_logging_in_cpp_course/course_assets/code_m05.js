window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Neutralize control characters in untrusted text and preserve an explicit truncation marker under a byte ceiling.",
  codeExamples: [
    {
      title: "Encode untrusted text for line-oriented logs",
      language: "cpp",
      blurb: "Controls become visible escape sequences, and truncation happens before encoding so one input cannot expand without bound.",
      code: String.raw`#include <cstddef>
#include <string>
#include <string_view>

std::string encode_log_text(std::string_view input) {
    constexpr std::size_t maximum_input = 80;
    const bool truncated = input.size() > maximum_input;
    input = input.substr(0, maximum_input);
    std::string output;
    output.reserve(input.size() + 16);
    for (const unsigned char ch : input) {
        switch (ch) {
            case '\n': output += "\\n"; break;
            case '\r': output += "\\r"; break;
            case '\t': output += "\\t"; break;
            default:
                if (ch < 0x20 || ch == 0x7f) output += "?";
                else output.push_back(static_cast<char>(ch));
        }
    }
    if (truncated) output += "[truncated]";
    return output;
}`
    },
    {
      title: "Verify line-integrity encoding",
      language: "cpp",
      blurb: "Injected new records remain escaped text, and oversized input carries an explicit truncation signal.",
      code: String.raw`int test_log_text_integrity() {
    const auto encoded = encode_log_text("opened\nrole=admin\r\n");
    if (encoded.find('\n') != std::string::npos ||
        encoded.find('\r') != std::string::npos) return 1;
    if (encoded != "opened\\nrole=admin\\r\\n") return 2;
    const auto long_value = encode_log_text(std::string(100, 'x'));
    return long_value.ends_with("[truncated]") ? 0 : 3;
}`
    }
  ]
};
