window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Make retention and access decisions from application-owned policy rather than from fields supplied with a log record.",
  codeExamples: [
    {
      title: "Apply trusted retention and access policy",
      language: "cpp",
      blurb: "Sensitivity selects a fixed retention period, and only approved operational roles may read restricted records.",
      code: String.raw`#include <chrono>
#include <optional>

enum class LogSensitivity { operational, restricted };
enum class LogRole { operator_role, auditor, developer };

struct LogGovernanceDecision {
    std::chrono::days retention;
    bool readable;
};

std::optional<LogGovernanceDecision> govern_log(
    LogSensitivity sensitivity, LogRole role
) noexcept {
    if (role != LogRole::operator_role && role != LogRole::auditor &&
        role != LogRole::developer) return std::nullopt;
    if (sensitivity == LogSensitivity::operational) {
        return LogGovernanceDecision{std::chrono::days{30}, true};
    }
    if (sensitivity != LogSensitivity::restricted) return std::nullopt;
    const bool readable = role == LogRole::operator_role ||
                          role == LogRole::auditor;
    return LogGovernanceDecision{std::chrono::days{7}, readable};
}`
    },
    {
      title: "Verify restricted access and retention",
      language: "cpp",
      blurb: "The regression covers both an authorized auditor and an unauthorized developer without accepting caller-selected retention values.",
      code: String.raw`int test_log_governance() {
    auto auditor = govern_log(LogSensitivity::restricted, LogRole::auditor);
    auto developer = govern_log(LogSensitivity::restricted, LogRole::developer);
    if (!auditor || !auditor->readable || auditor->retention.count() != 7) {
        return 1;
    }
    if (!developer || developer->readable) return 2;
    auto operational = govern_log(LogSensitivity::operational,
                                  LogRole::developer);
    if (!operational || operational->retention.count() != 30) return 3;
    if (govern_log(static_cast<LogSensitivity>(99), LogRole::auditor)) {
        return 4;
    }
    return govern_log(LogSensitivity::operational,
                      static_cast<LogRole>(99)) ? 5 : 0;
}`
    }
  ]
};
