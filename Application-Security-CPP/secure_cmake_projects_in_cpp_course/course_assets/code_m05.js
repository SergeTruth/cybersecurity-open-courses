window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Validate an exact dependency lock entry before CMake is allowed to fetch or configure third-party source.",
  codeExamples: [
    {
      title: "Validate pinned dependency evidence",
      language: "cpp",
      blurb: "The policy requires an approved HTTPS origin, an exact semantic version, and a canonical SHA-256 digest.",
      code: String.raw`#include <algorithm>
#include <regex>
#include <set>
#include <string>

struct DependencyLock {
    std::string name;
    std::string source_url;
    std::string version;
    std::string sha256;
};

bool valid_dependency_lock(
    const DependencyLock& dependency,
    const std::set<std::string>& approved_origins
) {
    static const std::regex exact_version{R"([0-9]+\.[0-9]+\.[0-9]+)"};
    const auto path = dependency.source_url.find('/', 8);
    const std::string origin = path == std::string::npos
        ? dependency.source_url : dependency.source_url.substr(0, path);
    const bool digest_ok = dependency.sha256.size() == 64 &&
        std::all_of(dependency.sha256.begin(), dependency.sha256.end(),
                    [](char ch) {
                        return (ch >= '0' && ch <= '9') ||
                               (ch >= 'a' && ch <= 'f');
                    });
    const bool name_ok = !dependency.name.empty() &&
        dependency.name.size() <= 64 &&
        std::all_of(dependency.name.begin(), dependency.name.end(),
                    [](unsigned char ch) {
                        return (ch >= 'a' && ch <= 'z') ||
                               (ch >= 'A' && ch <= 'Z') ||
                               (ch >= '0' && ch <= '9') ||
                               ch == '-' || ch == '_' || ch == '.';
                    });
    const bool url_ok = dependency.source_url.size() <= 512 &&
           dependency.source_url.starts_with("https://") &&
           path != std::string::npos && path + 1 < dependency.source_url.size() &&
           dependency.source_url.find_first_of(" \t\r\n?#%") ==
               std::string::npos &&
           approved_origins.contains(origin) &&
           std::regex_match(dependency.version, exact_version);
    return name_ok && url_ok && digest_ok;
}`
    },
    {
      title: "Verify exact pinning and approved origin",
      language: "cpp",
      blurb: "An exact reviewed lock passes, while a version range and an unapproved lookalike origin fail.",
      code: String.raw`int test_dependency_lock() {
    const std::set<std::string> origins{"https://deps.example.com"};
    DependencyLock lock{"fmt", "https://deps.example.com/fmt.tar.gz",
                        "11.0.2", std::string(64, 'a')};
    if (!valid_dependency_lock(lock, origins)) return 1;
    lock.version = ">=11";
    if (valid_dependency_lock(lock, origins)) return 2;
    lock.version = "11.0.2";
    lock.source_url = "https://deps.example.com.attacker.test/fmt.tar.gz";
    if (valid_dependency_lock(lock, origins)) return 3;
    lock.source_url = "https://deps.example.com/fmt%zz.tar.gz";
    return valid_dependency_lock(lock, origins) ? 4 : 0;
}`
    }
  ]
};
