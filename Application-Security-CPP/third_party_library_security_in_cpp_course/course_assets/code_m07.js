window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The wrapper maps closed status values and never exposes the third-party buffer or error details directly.",
  "codeExamples": [
    {
      "title": "Translate library results at one boundary",
      "language": "cpp",
      "blurb": "The wrapper maps closed status values and never exposes the third-party buffer or error details directly.",
      "code": "#include <optional>\n#include <string>\n\nenum class VendorStatus { ok, missing, malformed, internal };\nstruct VendorResult { VendorStatus status; std::string value; };\nenum class LookupError { not_found, invalid_response, unavailable };\n\nstd::optional<LookupError> validate_vendor_result(const VendorResult& result) noexcept {\n    switch (result.status) {\n        case VendorStatus::ok: return result.value.empty() ? std::optional{LookupError::invalid_response} : std::nullopt;\n        case VendorStatus::missing: return LookupError::not_found;\n        case VendorStatus::malformed: return LookupError::invalid_response;\n        case VendorStatus::internal: return LookupError::unavailable;\n    }\n    return LookupError::unavailable;\n}\n\nint main() {\n    if (validate_vendor_result({VendorStatus::ok, \"value\"})) return 1;\n    if (validate_vendor_result({VendorStatus::ok, \"\"}) != LookupError::invalid_response) return 2;\n    return validate_vendor_result({VendorStatus::internal, \"secret\"}) == LookupError::unavailable ? 0 : 3;\n}\n"
    }
  ]
};
