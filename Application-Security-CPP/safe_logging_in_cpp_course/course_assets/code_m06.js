window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Translate exceptions into a stable diagnostic category without copying exception text or sensitive inputs into user-visible output.",
  codeExamples: [
    {
      title: "Map failures at a diagnostic boundary",
      language: "cpp",
      blurb: "The mapper exposes a fixed public message and an allowlisted internal category rather than exception.what().",
      code: String.raw`#include <exception>
#include <stdexcept>
#include <string_view>

enum class DiagnosticCategory { invalid_input, capacity, unexpected };

struct Diagnostic {
    DiagnosticCategory category;
    std::string_view public_message;
};

Diagnostic classify_failure(const std::exception& error) noexcept {
    if (dynamic_cast<const std::invalid_argument*>(&error)) {
        return {DiagnosticCategory::invalid_input, "request rejected"};
    }
    if (dynamic_cast<const std::length_error*>(&error) ||
        dynamic_cast<const std::bad_alloc*>(&error)) {
        return {DiagnosticCategory::capacity, "service unavailable"};
    }
    return {DiagnosticCategory::unexpected, "operation failed"};
}`
    },
    {
      title: "Verify exception text does not cross the boundary",
      language: "cpp",
      blurb: "Sensitive exception contents do not appear in either the public message or the bounded diagnostic category.",
      code: String.raw`#include <string>

int test_diagnostic_boundary() {
    const std::invalid_argument error{"token=super-secret"};
    const auto diagnostic = classify_failure(error);
    if (diagnostic.category != DiagnosticCategory::invalid_input) return 1;
    if (diagnostic.public_message != "request rejected") return 2;
    return diagnostic.public_message.find("secret") == std::string_view::npos
        ? 0 : 3;
}`
    }
  ]
};
