window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Serialize typed fields with explicit JSON escaping rather than concatenating untrusted values into a structured record.",
  codeExamples: [
    {
      title: "Escape a bounded JSON string field",
      language: "cpp",
      blurb: "The input must be valid UTF-8; quotes, backslashes, and JSON control bytes are escaped without corrupting non-ASCII characters, and the byte ceiling is enforced before output growth.",
      code: String.raw`#include <array>
#include <cstddef>
#include <optional>
#include <string>
#include <string_view>

bool valid_utf8(std::string_view input) noexcept {
    const auto byte = [&input](std::size_t index) {
        return static_cast<unsigned char>(input[index]);
    };
    const auto continuation = [&byte](std::size_t index) {
        return (byte(index) & 0xc0U) == 0x80U;
    };
    std::size_t index = 0;
    while (index < input.size()) {
        const unsigned char lead = byte(index);
        if (lead <= 0x7fU) {
            ++index;
        } else if (lead >= 0xc2U && lead <= 0xdfU) {
            if (index + 1 >= input.size() || !continuation(index + 1)) {
                return false;
            }
            index += 2;
        } else if (lead == 0xe0U) {
            if (index + 2 >= input.size() || byte(index + 1) < 0xa0U ||
                byte(index + 1) > 0xbfU || !continuation(index + 2)) {
                return false;
            }
            index += 3;
        } else if ((lead >= 0xe1U && lead <= 0xecU) ||
                   (lead >= 0xeeU && lead <= 0xefU)) {
            if (index + 2 >= input.size() || !continuation(index + 1) ||
                !continuation(index + 2)) return false;
            index += 3;
        } else if (lead == 0xedU) {
            if (index + 2 >= input.size() || byte(index + 1) < 0x80U ||
                byte(index + 1) > 0x9fU || !continuation(index + 2)) {
                return false;
            }
            index += 3;
        } else if (lead == 0xf0U) {
            if (index + 3 >= input.size() || byte(index + 1) < 0x90U ||
                byte(index + 1) > 0xbfU || !continuation(index + 2) ||
                !continuation(index + 3)) return false;
            index += 4;
        } else if (lead >= 0xf1U && lead <= 0xf3U) {
            if (index + 3 >= input.size() || !continuation(index + 1) ||
                !continuation(index + 2) || !continuation(index + 3)) {
                return false;
            }
            index += 4;
        } else if (lead == 0xf4U) {
            if (index + 3 >= input.size() || byte(index + 1) < 0x80U ||
                byte(index + 1) > 0x8fU || !continuation(index + 2) ||
                !continuation(index + 3)) return false;
            index += 4;
        } else {
            return false;
        }
    }
    return true;
}

std::optional<std::string> json_string(std::string_view input) {
    if (input.size() > 256 || !valid_utf8(input)) return std::nullopt;
    static constexpr char hex[] = "0123456789abcdef";
    std::string output{"\""};
    output.reserve(input.size() + 2);
    for (const unsigned char ch : input) {
        if (ch == '"' || ch == '\\') {
            output.push_back('\\');
            output.push_back(static_cast<char>(ch));
        } else if (ch < 0x20) {
            output += "\\u00";
            output.push_back(hex[ch >> 4]);
            output.push_back(hex[ch & 0x0f]);
        } else {
            output.push_back(static_cast<char>(ch));
        }
    }
    output.push_back('"');
    return output;
}

std::optional<std::string> structured_action(std::string_view action) {
    auto escaped = json_string(action);
    if (!escaped) return std::nullopt;
    return std::string{"{\"event\":\"admin_action\",\"action\":"} +
           *escaped + "}";
}`
    },
    {
      title: "Verify structured escaping",
      language: "cpp",
      blurb: "The result stays one valid record when the field contains quotes, a newline, and valid non-ASCII text; malformed UTF-8 is rejected.",
      code: String.raw`int test_structured_log_encoding() {
    auto record = structured_action("grant\"\nrole");
    if (!record) return 1;
    if (record->find("\\\"") == std::string::npos) return 2;
    if (record->find("\\u000a") == std::string::npos) return 3;
    if (record->find('\n') != std::string::npos) return 4;
    const std::string utf8{static_cast<char>(0xc3),
                           static_cast<char>(0xa9)};
    auto preserved = structured_action(utf8);
    if (!preserved || preserved->find(utf8) == std::string::npos) return 5;
    const std::string invalid_lead{static_cast<char>(0xff)};
    if (structured_action(invalid_lead)) return 6;
    const std::string overlong{static_cast<char>(0xc0),
                               static_cast<char>(0xaf)};
    if (structured_action(overlong)) return 7;
    const std::string surrogate{static_cast<char>(0xed),
                                static_cast<char>(0xa0),
                                static_cast<char>(0x80)};
    return structured_action(surrogate) ? 8 : 0;
}`
    }
  ]
};
