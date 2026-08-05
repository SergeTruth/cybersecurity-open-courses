window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply temporary objects and view lifetimes to a concrete security boundary and a release-safe regression.",
  "codeExamples": [
    {
      "title": "Copy validated text instead of retaining a temporary view",
      "language": "cpp",
      "blurb": "The class owns its canonical name and rejects construction that would store an unbounded borrow.",
      "code": "#include <stdexcept>\n#include <string>\n#include <string_view>\n\nclass ComponentName {\npublic:\n    explicit ComponentName(std::string_view value) : value_(copy(value)) {}\n    const std::string& value() const noexcept { return value_; }\n\nprivate:\n    static std::string copy(std::string_view value) {\n        if (value.empty() || value.size() > 64) {\n            throw std::invalid_argument(\"component name\");\n        }\n        return std::string(value);\n    }\n    std::string value_;\n};\n"
    },
    {
      "title": "Construct safely from a temporary string",
      "language": "cpp",
      "blurb": "The stored value remains owned after the temporary passed to string_view has been destroyed.",
      "code": "int test_component_name_owns_temporary_text() {\n    ComponentName name(std::string(\"renderer\"));\n    return name.value() == \"renderer\" ? 0 : 1;\n}\n"
    }
  ]
};
