window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The storage API accepts only lvalues and copies the selected value into owned state.",
  "codeExamples": [
    {
      "title": "Prevent forwarding references from retaining temporaries",
      "language": "cpp",
      "blurb": "The storage API accepts only lvalues and copies the selected value into owned state.",
      "code": "#include <concepts>\n#include <string>\n#include <type_traits>\n\nclass LabelStore {\npublic:\n    template<class Text>\n        requires std::same_as<std::remove_cvref_t<Text>, std::string> && std::is_lvalue_reference_v<Text&&> &&\n                 std::assignable_from<std::string&, Text&&>\n    void remember(Text&& text) { value_ = text; }\n    std::string value() const { return value_; }\nprivate:\n    std::string value_;\n};\n\ntemplate<class T>\nconcept Rememberable = requires(LabelStore& store, T&& value) { store.remember(static_cast<T&&>(value)); };\nstatic_assert(Rememberable<std::string&>);\nstatic_assert(Rememberable<const std::string&>);\nstatic_assert(!Rememberable<volatile std::string&>);\nstatic_assert(!Rememberable<std::string>);\n\nLabelStore make_store() {\n    std::string label = \"owned\";\n    LabelStore store;\n    store.remember(label);\n    return store;\n}\n\nint main() {\n    const std::string saved = make_store().value();\n    return saved == \"owned\" ? 0 : 1;\n}\n"
    }
  ]
};
