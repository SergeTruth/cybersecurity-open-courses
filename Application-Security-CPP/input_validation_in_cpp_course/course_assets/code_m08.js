window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Stage decoding, structural validation, and domain authorization so fuzz tests can target each boundary independently.",
  "codeExamples": [
    {
      "title": "Compose a three-stage request validation pipeline",
      "language": "cpp",
      "blurb": "Each stage returns a typed failure code instead of throwing or continuing with partially trusted data.",
      "code": "#include <utility>\n#include <string>\n#include <variant>\n\nenum class ValidationError { bad_encoding, bad_shape, forbidden_action };\nstruct ValidRequest { std::string action; };\nusing ValidationResult = std::variant<ValidRequest, ValidationError>;\n\nValidationResult validate_request(std::string bytes) {\n    for (const char raw : bytes) {\n        const auto ch = static_cast<unsigned char>(raw);\n        if (ch > 0x7fU ||\n            (ch < 0x20U && ch != static_cast<unsigned char>('\\t'))) {\n            return ValidationError::bad_encoding;\n        }\n    }\n    if (!bytes.starts_with(\"action=\") || bytes.size() > 64) {\n        return ValidationError::bad_shape;\n    }\n    std::string action = bytes.substr(7);\n    if (action != \"read\" && action != \"list\") {\n        return ValidationError::forbidden_action;\n    }\n    return ValidRequest{std::move(action)};\n}"
    },
    {
      "title": "Regression: a compact corpus covers every stage",
      "language": "cpp",
      "blurb": "Explicit result checks remain active in optimized and release builds.",
      "code": "int test_validation_pipeline() {\n    if (!std::holds_alternative<ValidRequest>(validate_request(\"action=read\"))) return 1;\n    if (std::get<ValidationError>(validate_request(\"verb=read\")) !=\n        ValidationError::bad_shape) return 2;\n    if (std::get<ValidationError>(validate_request(\"action=delete\")) !=\n        ValidationError::forbidden_action) return 3;\n    const std::string malformed{\"action=\\xC0\\xAF\", 9};\n    if (std::get<ValidationError>(validate_request(malformed)) !=\n        ValidationError::bad_encoding) return 4;\n    return 0;\n}"
    }
  ]
};
