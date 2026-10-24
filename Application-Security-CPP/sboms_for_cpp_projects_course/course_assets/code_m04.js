window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Validate the SBOM document envelope, supported format, serial identity, and unique components before publishing it.",
  codeExamples: [
    {
      title: "Validate an SBOM document model",
      language: "cpp",
      blurb: "The document requires an approved format and version, a bounded serial identifier, and unique PURLs from the course's canonical supported subset.",
      code: String.raw`#include <cstddef>
#include <set>
#include <string>
#include <string_view>
#include <vector>

enum class SbomFormat { cyclonedx_1_5, spdx_2_3 };

struct SbomDocument {
    SbomFormat format;
    std::string serial;
    std::vector<std::string> component_purls;
};

int purl_hex_digit(char ch) noexcept {
    if (ch >= '0' && ch <= '9') return ch - '0';
    if (ch >= 'A' && ch <= 'F') return ch - 'A' + 10;
    return -1;
}

bool valid_purl_component(std::string_view value,
                          bool allow_slash) noexcept {
    if (value.empty()) return false;
    bool previous_slash = false;
    for (std::size_t index = 0; index < value.size(); ++index) {
        const unsigned char ch = value[index];
        if (ch == '/') {
            if (!allow_slash || index == 0 || index + 1 == value.size() ||
                previous_slash) return false;
            previous_slash = true;
            continue;
        }
        previous_slash = false;
        if (ch == '%') {
            if (index + 2 >= value.size()) return false;
            const int high = purl_hex_digit(value[index + 1]);
            const int low = purl_hex_digit(value[index + 2]);
            if (high < 0 || low < 0) return false;
            const unsigned decoded = static_cast<unsigned>(high * 16 + low);
            const bool unreserved =
                (decoded >= 'a' && decoded <= 'z') ||
                (decoded >= 'A' && decoded <= 'Z') ||
                (decoded >= '0' && decoded <= '9') ||
                decoded == '-' || decoded == '.' || decoded == '_' ||
                decoded == '~';
            if (decoded <= 0x20 || decoded >= 0x7f || unreserved ||
                decoded == '/' || decoded == '@' || decoded == '?' ||
                decoded == '#' || decoded == '%') return false;
            index += 2;
            continue;
        }
        const bool allowed =
            (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') ||
            (ch >= '0' && ch <= '9') || ch == '-' || ch == '.' ||
            ch == '_' || ch == '~' || ch == '+';
        if (!allowed) return false;
    }
    return true;
}

bool valid_supported_purl(const std::string& text) {
    const std::string_view purl{text};
    if (purl.size() < 8 || purl.size() > 256 ||
        !purl.starts_with("pkg:")) return false;
    const auto slash = purl.find('/', 4);
    const auto at = purl.rfind('@');
    if (slash == std::string_view::npos || slash == 4 ||
        at == std::string_view::npos || at <= slash + 1 ||
        at + 1 >= purl.size() || purl.find('@', slash + 1) != at ||
        purl.find_first_of("?#", slash + 1) != std::string_view::npos) {
        return false;
    }
    const auto type = purl.substr(4, slash - 4);
    if (type != "github" && type != "conan" && type != "generic") {
        return false;
    }
    return valid_purl_component(
               purl.substr(slash + 1, at - slash - 1), true) &&
           valid_purl_component(purl.substr(at + 1), false);
}

bool valid_sbom_document(const SbomDocument& document) {
    if ((document.format != SbomFormat::cyclonedx_1_5 &&
         document.format != SbomFormat::spdx_2_3) ||
        document.serial.empty() || document.serial.size() > 128 ||
        document.serial.find_first_of(" \t\r\n") != std::string::npos ||
        document.component_purls.empty() ||
        document.component_purls.size() > 10000) return false;
    std::set<std::string> unique;
    for (const auto& purl : document.component_purls) {
        if (!valid_supported_purl(purl) || !unique.insert(purl).second) {
            return false;
        }
    }
    return true;
}`
    },
    {
      title: "Verify document completeness and uniqueness",
      language: "cpp",
      blurb: "The positive case prevents an always-false validator, while duplicate and malformed components fail closed.",
      code: String.raw`int test_sbom_document() {
    SbomDocument valid{SbomFormat::cyclonedx_1_5, "urn:uuid:1234",
        {"pkg:github/acme/orders@1.2.3"}};
    if (!valid_sbom_document(valid)) return 1;
    valid.component_purls.push_back(valid.component_purls.front());
    if (valid_sbom_document(valid)) return 2;
    valid.component_purls = {"not-a-purl"};
    if (valid_sbom_document(valid)) return 3;
    valid.component_purls = {"pkg:/orders@1"};
    if (valid_sbom_document(valid)) return 4;
    valid.component_purls = {"pkg:github/acme/orders@1%zz"};
    if (valid_sbom_document(valid)) return 5;
    std::string controlled{"pkg:github/acme/orders@1"};
    controlled.push_back('\x1f');
    valid.component_purls = {controlled};
    if (valid_sbom_document(valid)) return 6;
    valid.component_purls = {"pkg:generic/acme/orders@build%3A1"};
    if (!valid_sbom_document(valid)) return 7;
    valid.component_purls = {"pkg:github/acme/orders@1.2.3"};
    valid.format = static_cast<SbomFormat>(99);
    return valid_sbom_document(valid) ? 8 : 0;
}`
    }
  ]
};
