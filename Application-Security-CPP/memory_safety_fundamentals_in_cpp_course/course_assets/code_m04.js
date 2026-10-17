window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Use shared ownership only for the owning direction; weak reverse links prevent cycles and expose expiration.",
  "codeExamples": [
    {
      "title": "Keep an editor's document reference non-owning",
      "language": "cpp",
      "blurb": "The weak relationship does not retain the document, and title returns an owned string that cannot dangle from a temporary document.",
      "code": "#include <memory>\n#include <optional>\n#include <string>\n#include <utility>\n\nclass Document {\npublic:\n    explicit Document(std::string title)\n        : title_(std::move(title)) {}\n\n    std::string title() const {\n        return title_;\n    }\n\nprivate:\n    std::string title_;\n};\n\nclass Editor {\npublic:\n    explicit Editor(const std::shared_ptr<Document>& document)\n        : document_(document) {}\n\n    std::optional<std::string> document_title() const {\n        auto document = document_.lock();\n        if (!document) return std::nullopt;\n        return document->title();\n    }\n\nprivate:\n    std::weak_ptr<Document> document_;\n};"
    },
    {
      "title": "Fail closed after the owner expires",
      "language": "cpp",
      "blurb": "The observer reports absence after document destruction instead of retaining or dereferencing a stale object.",
      "code": "int test_weak_document_observer() {\n    auto document = std::make_shared<Document>(\"orders\");\n    Editor editor{document};\n    if (editor.document_title() != \"orders\") return 1;\n    document.reset();\n    if (editor.document_title()) return 2;\n    return 0;\n}"
    }
  ]
};
