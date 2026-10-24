window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Keep vulnerability and license thresholds in trusted application policy rather than in the finding being evaluated.",
  codeExamples: [
    {
      title: "Evaluate findings against trusted release policy",
      language: "cpp",
      blurb: "Evidence supplies observed severity, remediation, and license; a separate policy defines accepted licenses and unresolved severity.",
      code: String.raw`#include <set>
#include <string>
#include <utility>

enum class Severity { low, medium, high, critical };

struct ComponentFinding {
    Severity severity;
    bool fixed;
    bool not_affected;
    std::string license;
};

class SbomRiskPolicy {
public:
    explicit SbomRiskPolicy(std::set<std::string> licenses)
        : approved_licenses_(std::move(licenses)) {}

    bool allows(const ComponentFinding& finding) const noexcept {
        if (!approved_licenses_.contains(finding.license)) return false;
        if (finding.severity != Severity::low &&
            finding.severity != Severity::medium &&
            finding.severity != Severity::high &&
            finding.severity != Severity::critical) return false;
        if (finding.fixed && finding.not_affected) return false;
        if (finding.fixed || finding.not_affected) return true;
        return finding.severity == Severity::low;
    }

private:
    std::set<std::string> approved_licenses_;
};`
    },
    {
      title: "Verify trusted policy decisions",
      language: "cpp",
      blurb: "The same evidence cannot select its own threshold, and an unapproved license remains blocked even when remediation is claimed.",
      code: String.raw`int test_sbom_risk_policy() {
    SbomRiskPolicy policy{{"MIT", "Apache-2.0"}};
    if (!policy.allows({Severity::low, false, false, "MIT"})) return 1;
    if (policy.allows({Severity::critical, false, false, "MIT"})) return 2;
    if (policy.allows({Severity::high, true, false, "Unknown"})) return 3;
    if (policy.allows({static_cast<Severity>(99), true, false, "MIT"})) {
        return 4;
    }
    return policy.allows({Severity::high, true, true, "MIT"}) ? 5 : 0;
}`
    }
  ]
};
