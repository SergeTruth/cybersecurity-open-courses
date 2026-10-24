window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply error handling and failure semantics to a concrete security boundary and a release-safe regression.",
  "codeExamples": [
    {
      "title": "Return a typed error without leaking storage details",
      "language": "cpp",
      "blurb": "The result distinguishes not-found, forbidden, and unavailable outcomes in the public contract.",
      "code": "#include <string>\n#include <variant>\n\nstruct Order { std::string id; };\nenum class OrderError { not_found, forbidden, unavailable };\nusing OrderResult = std::variant<Order, OrderError>;\n\nOrderResult authorize_order(bool exists,\n                            bool permitted,\n                            bool storage_available,\n                            std::string id) {\n    if (!storage_available) return OrderError::unavailable;\n    if (!exists) return OrderError::not_found;\n    if (!permitted) return OrderError::forbidden;\n    return Order{std::move(id)};\n}\n"
    },
    {
      "title": "Keep authorization failure separate from object absence",
      "language": "cpp",
      "blurb": "Callers can map the typed result to a deliberately chosen external response.",
      "code": "int test_order_result_preserves_failure_semantics() {\n    if (std::get<OrderError>(\n            authorize_order(false, false, true, \"x\")) !=\n        OrderError::not_found) return 1;\n    if (std::get<OrderError>(\n            authorize_order(true, false, true, \"x\")) !=\n        OrderError::forbidden) return 2;\n    return std::get<Order>(\n        authorize_order(true, true, true, \"x\")).id == \"x\" ? 0 : 3;\n}\n"
    }
  ]
};
