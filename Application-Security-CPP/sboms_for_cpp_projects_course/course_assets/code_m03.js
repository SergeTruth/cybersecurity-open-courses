window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Validate component identity as structured package evidence rather than with a permissive catch-all regular expression.",
  codeExamples: [
    {
      title: "Parse a bounded package URL identity",
      language: "cpp",
      blurb: "The canonical parser requires a supported type, nonempty path segments and version, valid percent encoding, bounded text, and no unsupported qualifiers or fragments.",
      code: String.raw`#include <cstddef>
#include <optional>
#include <string>
#include <string_view>

struct ComponentIdentity {
    std::string type;
    std::string name;
    std::string version;
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

std::optional<ComponentIdentity> parse_package_url(std::string_view purl) {
    if (purl.size() < 8 || purl.size() > 256 || !purl.starts_with("pkg:")) {
        return std::nullopt;
    }
    const auto slash = purl.find('/', 4);
    const auto at = purl.rfind('@');
    if (slash == std::string_view::npos || slash == 4 ||
        at == std::string_view::npos || at <= slash + 1 ||
        at + 1 >= purl.size() || purl.find('@', slash + 1) != at ||
        purl.find_first_of("?#", slash + 1) != std::string_view::npos) {
        return std::nullopt;
    }
    const auto type = purl.substr(4, slash - 4);
    if (type != "github" && type != "conan" && type != "generic") {
        return std::nullopt;
    }
    const auto name = purl.substr(slash + 1, at - slash - 1);
    const auto version = purl.substr(at + 1);
    if (!valid_purl_component(name, true) ||
        !valid_purl_component(version, false)) return std::nullopt;
    return ComponentIdentity{
        std::string{type}, std::string{name}, std::string{version}};
}`
    },
    {
      title: "Verify valid and malformed identities",
      language: "cpp",
      blurb: "A supported PURL is decomposed correctly, while missing versions, ambiguous separators, malformed encodings, empty segments, and unknown types are rejected.",
      code: String.raw`int test_package_url_identity() {
    auto identity = parse_package_url("pkg:github/acme/orders@1.2.3");
    if (!identity || identity->name != "acme/orders" ||
        identity->version != "1.2.3") return 1;
    if (parse_package_url("pkg:github/acme/orders")) return 2;
    if (parse_package_url("pkg:github/acme/my orders@1")) return 3;
    if (parse_package_url("pkg:unknown/acme/orders@1")) return 4;
    if (parse_package_url("pkg:github/acme/orders@1@2")) return 5;
    if (parse_package_url("pkg:github/acme/orders@1%zz")) return 6;
    if (parse_package_url("pkg:github/acme//orders@1")) return 7;
    if (parse_package_url("pkg:github/acme/orders@1?arch=x86")) return 8;
    std::string controlled{"pkg:github/acme/orders@1"};
    controlled.push_back('\x1f');
    if (parse_package_url(controlled)) return 9;
    auto encoded = parse_package_url(
        "pkg:generic/acme/orders@build%3A1");
    return encoded && encoded->version == "build%3A1" ? 0 : 10;
}`
    }
  ]
};
