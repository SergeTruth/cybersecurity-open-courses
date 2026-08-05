window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Legacy Boundaries and Ownership Transfer to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Adopt a legacy handle with its matching deleter",
      "language": "cpp",
      "blurb": "Ownership transfer happens once into a unique_ptr whose deleter calls the legacy release routine.",
      "code": "#include <memory>\n\nstruct legacy_order;\nextern \"C\" legacy_order* legacy_order_create();\nextern \"C\" void legacy_order_destroy(legacy_order*) noexcept;\n\nstruct LegacyOrderDeleter {\n    void operator()(legacy_order* value) const noexcept {\n        legacy_order_destroy(value);\n    }\n};\n\nusing UniqueLegacyOrder = std::unique_ptr<legacy_order, LegacyOrderDeleter>;\n\nUniqueLegacyOrder make_order() {\n    return UniqueLegacyOrder(legacy_order_create());\n}\n"
    },
    {
      "title": "Transfer a unique owner without exposing a dangling borrow",
      "language": "cpp",
      "blurb": "The queue receives the owner by value, and the caller cannot continue using the moved-from object as if it still owned storage.",
      "code": "#include <memory>\n#include <mutex>\n#include <queue>\n#include <utility>\n\nclass WorkQueue {\n    std::mutex mutex_;\n    std::queue<std::unique_ptr<int>> work_;\npublic:\n    void submit(std::unique_ptr<int> item) {\n        std::lock_guard lock(mutex_);\n        work_.push(std::move(item));\n    }\n};\n"
    }
  ]
};
