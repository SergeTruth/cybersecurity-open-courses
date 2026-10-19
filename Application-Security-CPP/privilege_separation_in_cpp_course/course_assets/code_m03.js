window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "C++20. Compile each module independently with its paired test. This interface models an API shape, not OS privilege separation; deployment must place the core and broker in separate restricted processes with authenticated IPC. Client validation does not replace broker-side authorization.",
  "codeExamples": [
    {
      "title": "Expose only approved broker operations to the core",
      "language": "cpp",
      "blurb": "The core can request a named order through an injected interface but has no API for arbitrary paths or elevated operations.",
      "code": "#include <optional>\n#include <string>\n#include <string_view>\n\nclass OrderBroker {\npublic:\n    virtual ~OrderBroker() = default;\n    virtual std::optional<std::string> read_order(\n        std::string_view order_id\n    ) = 0;\n};\n\nclass LowPrivilegeCore {\npublic:\n    explicit LowPrivilegeCore(OrderBroker& broker)\n        : broker_(broker) {}\n\n    std::optional<std::string> load(\n        std::string_view order_id\n    ) {\n        if (order_id.empty() || order_id.size() > 32 ||\n            order_id.find_first_not_of(\n                \"abcdefghijklmnopqrstuvwxyz\"\n                \"ABCDEFGHIJKLMNOPQRSTUVWXYZ\"\n                \"0123456789-_\"\n            ) != std::string_view::npos) {\n            return std::nullopt;\n        }\n        return broker_.read_order(order_id);\n    }\n\nprivate:\n    OrderBroker& broker_;\n};"
    },
    {
      "title": "Verify the core cannot pass arbitrary resource names",
      "language": "cpp",
      "blurb": "Approved identifiers reach the broker, while path-like input is rejected before crossing the privilege boundary.",
      "code": "class RecordingOrderBroker final : public OrderBroker {\npublic:\n    std::optional<std::string> read_order(\n        std::string_view order_id\n    ) override {\n        last_id = std::string{order_id};\n        return \"approved\";\n    }\n\n    std::string last_id;\n};\n\nint test_low_privilege_core_boundary() {\n    RecordingOrderBroker broker;\n    LowPrivilegeCore core{broker};\n    if (core.load(\"../secrets\")) return 1;\n    if (!broker.last_id.empty()) return 2;\n    if (core.load(\"order-17\") != \"approved\") return 3;\n    return broker.last_id == \"order-17\" ? 0 : 4;\n}"
    }
  ]
};
