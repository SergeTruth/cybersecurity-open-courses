window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Project only approved component fields into a sharing record so internal paths and supplier contact details do not leave the governance boundary.",
  codeExamples: [
    {
      title: "Create a privacy-minimized sharing record",
      language: "cpp",
      blurb: "The public record contains only a canonically validated package identity and approved license; private build and contact fields have no output field.",
      code: String.raw`#include <cstddef>
#include <optional>
#include <string>
#include <string_view>

struct InternalComponentRecord {
    std::string purl;
    std::string license;
    std::string build_path;
    std::string supplier_contact;
};

struct SharedComponentRecord {
    std::string purl;
    std::string license;
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

std::optional<SharedComponentRecord> make_shared_record(
    const InternalComponentRecord& internal
) {
    const bool approved_license = internal.license == "MIT" ||
                                  internal.license == "Apache-2.0";
    if (!valid_supported_purl(internal.purl) || !approved_license) {
        return std::nullopt;
    }
    return SharedComponentRecord{internal.purl, internal.license};
}`
    },
    {
      title: "Verify sharing-data minimization",
      language: "cpp",
      blurb: "The shared representation preserves required identity while making sensitive internal fields structurally unavailable.",
      code: String.raw`int test_sbom_sharing_record() {
    InternalComponentRecord internal{
        "pkg:github/acme/orders@1", "MIT",
        "/private/build/agent-7", "maintainer@example.test"
    };
    auto shared = make_shared_record(internal);
    if (!shared || shared->purl != internal.purl || shared->license != "MIT") {
        return 1;
    }
    const std::string serialized = shared->purl + "|" + shared->license;
    if (serialized.find("/private/") != std::string::npos) return 2;
    if (serialized.find("example.test") != std::string::npos) return 3;
    internal.license = "MIT\nforged-field=true";
    if (make_shared_record(internal)) return 4;
    internal.license = "MIT";
    internal.purl = "pkg:/name@1";
    if (make_shared_record(internal)) return 5;
    internal.purl = "pkg:github/acme/name@1%zz";
    if (make_shared_record(internal)) return 6;
    internal.purl = "pkg:generic/acme/name@build%3A1";
    return make_shared_record(internal) ? 0 : 7;
}`
    }
  ]
};
