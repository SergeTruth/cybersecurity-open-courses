window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Represent expected validation failures explicitly and reserve exceptions for failures the local operation cannot handle.",
  "codeExamples": [
    {
      "title": "Return a typed result from an order boundary",
      "language": "cpp",
      "blurb": "The caller must handle invalid input and capacity exhaustion as distinct outcomes.",
      "code": "#include <charconv>\n#include <string>\n#include <string_view>\n#include <variant>\n\nstruct AcceptedQuantity { unsigned value; };\nenum class QuantityError { malformed, outside_policy };\nusing QuantityResult = std::variant<AcceptedQuantity, QuantityError>;\n\nQuantityResult validate_quantity(std::string_view text) {\n    unsigned value = 0;\n    const auto [end, error] =\n        std::from_chars(text.data(), text.data() + text.size(), value);\n    if (error != std::errc{} || end != text.data() + text.size()) {\n        return QuantityError::malformed;\n    }\n    if (value == 0 || value > 1000) return QuantityError::outside_policy;\n    return AcceptedQuantity{value};\n}"
    },
    {
      "title": "Regression: each safe-failure outcome is distinguishable",
      "language": "cpp",
      "blurb": "No missing header or assertion controls whether the checks compile.",
      "code": "int test_quantity_result() {\n    if (std::get<AcceptedQuantity>(validate_quantity(\"7\")).value != 7) return 1;\n    if (std::get<QuantityError>(validate_quantity(\"7x\")) !=\n        QuantityError::malformed) return 2;\n    if (std::get<QuantityError>(validate_quantity(\"0\")) !=\n        QuantityError::outside_policy) return 3;\n    return 0;\n}"
    }
  ]
};
