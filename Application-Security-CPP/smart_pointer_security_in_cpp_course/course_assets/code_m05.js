window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The callback obtains a temporary shared owner and fails closed after the subject expires.",
  "codeExamples": [
    {
      "title": "Lock weak observations for one operation",
      "language": "cpp",
      "blurb": "The callback obtains a temporary shared owner and fails closed after the subject expires.",
      "code": "#include <memory>\n#include <string>\n#include <utility>\n\nclass Subject {\npublic:\n    explicit Subject(std::string value) : value_(std::move(value)) {}\n    std::string value() const { return value_; }\nprivate:\n    std::string value_;\n};\n\nclass Observer {\npublic:\n    explicit Observer(const std::shared_ptr<Subject>& subject) : subject_(subject) {}\n    std::string read() const {\n        const auto locked = subject_.lock();\n        return locked ? locked->value() : \"unavailable\";\n    }\nprivate:\n    std::weak_ptr<Subject> subject_;\n};\n\nint main() {\n    const std::string temporary_value = std::make_shared<Subject>(\"temporary\")->value();\n    if (temporary_value != \"temporary\") return 1;\n    auto subject = std::make_shared<Subject>(\"ready\");\n    Observer observer{subject};\n    if (observer.read() != \"ready\") return 2;\n    subject.reset();\n    return observer.read() == \"unavailable\" ? 0 : 3;\n}\n"
    }
  ]
};
