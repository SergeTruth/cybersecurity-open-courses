window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Represent filesystem, network, device, and UI permissions as separate capabilities instead of one broad sandbox escape hatch.",
  codeExamples: [
    {
      title: "Evaluate resource-specific sandbox permissions",
      language: "cpp",
      blurb: "Each request carries one typed resource and must match an application-owned set of exact capabilities.",
      code: String.raw`#include <set>
#include <string>
#include <utility>

enum class ResourceKind { filesystem, network, device, user_interface };

struct ResourceCapability {
    ResourceKind kind;
    std::string identifier;
    friend bool operator<(const ResourceCapability& left,
                          const ResourceCapability& right) noexcept {
        if (left.kind != right.kind) return left.kind < right.kind;
        return left.identifier < right.identifier;
    }
};

class SandboxPermissions {
public:
    explicit SandboxPermissions(std::set<ResourceCapability> allowed)
        : allowed_(std::move(allowed)) {}

    bool allows(const ResourceCapability& requested) const noexcept {
        return !requested.identifier.empty() && allowed_.contains(requested);
    }

private:
    std::set<ResourceCapability> allowed_;
};`
    },
    {
      title: "Verify resource boundaries remain separate",
      language: "cpp",
      blurb: "An approved document does not imply network, device, UI, or neighboring filesystem access.",
      code: String.raw`int test_resource_capabilities() {
    SandboxPermissions permissions{{
        {ResourceKind::filesystem, "documents/report.txt"},
        {ResourceKind::network, "api.example.com:443"}
    }};
    if (!permissions.allows({ResourceKind::filesystem,
                             "documents/report.txt"})) return 1;
    if (permissions.allows({ResourceKind::filesystem,
                            "documents/other.txt"})) return 2;
    return permissions.allows({ResourceKind::device, "camera"}) ? 3 : 0;
}`
    }
  ]
};
