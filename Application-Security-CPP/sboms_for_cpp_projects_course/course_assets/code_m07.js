window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Compare generated component identities with the reviewed dependency set and reject duplicates as well as missing or unexpected components.",
  codeExamples: [
    {
      title: "Detect SBOM dependency drift",
      language: "cpp",
      blurb: "The checker validates every identity with the canonical supported PURL parser, proves uniqueness, then requires exact equality with the reviewed set.",
      code: String.raw`#include <cstddef>
#include <set>
#include <string>
#include <string_view>
#include <vector>

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

bool sbom_matches_reviewed_dependencies(
    const std::set<std::string>& reviewed,
    const std::vector<std::string>& generated
) {
    std::set<std::string> generated_set;
    for (const auto& purl : generated) {
        if (!valid_supported_purl(purl) || !generated_set.insert(purl).second) {
            return false;
        }
    }
    return generated_set == reviewed;
}`
    },
    {
      title: "Verify missing, unexpected, and duplicate drift",
      language: "cpp",
      blurb: "Exact reviewed evidence passes; every common drift form produces a distinct negative case.",
      code: String.raw`int test_sbom_drift() {
    const std::string a{"pkg:github/acme/a@1"};
    const std::string b{"pkg:github/acme/b@2"};
    const std::set<std::string> reviewed{a, b};
    if (!sbom_matches_reviewed_dependencies(reviewed, {a, b})) return 1;
    if (sbom_matches_reviewed_dependencies(reviewed, {a})) return 2;
    if (sbom_matches_reviewed_dependencies(reviewed, {a, b, b})) return 3;
    const std::string c{"pkg:github/acme/c@3"};
    if (sbom_matches_reviewed_dependencies(reviewed, {a, b, c})) return 4;
    const std::string empty_type{"pkg:/name@1"};
    if (sbom_matches_reviewed_dependencies({empty_type}, {empty_type})) {
        return 5;
    }
    const std::string malformed{"pkg:github/acme/name@1%zz"};
    if (sbom_matches_reviewed_dependencies({malformed}, {malformed})) {
        return 6;
    }
    const std::string encoded{"pkg:generic/acme/name@build%3A1"};
    return sbom_matches_reviewed_dependencies({encoded}, {encoded}) ? 0 : 7;
}`
    }
  ]
};
