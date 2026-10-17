window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "Private state prevents construction bypasses, while bounded identifiers are returned by value so temporary factory results cannot leak references.",
  "codeExamples": [
    {
      "title": "Construct domain objects with owned, lifetime-safe accessors",
      "language": "cpp",
      "blurb": "Private state prevents construction bypasses, while bounded identifiers are returned by value so temporary factory results cannot leak references.",
      "code": "#include <utility>\n#include <charconv>\n#include <optional>\n#include <string>\n#include <string_view>\n\nclass Order {\npublic:\n    static std::optional<Order> create(std::string_view id, std::string_view cents_text) {\n        if (id.empty() || id.size() > 24) return std::nullopt;\n        int cents = 0;\n        const auto parsed = std::from_chars(cents_text.data(), cents_text.data() + cents_text.size(), cents);\n        if (parsed.ec != std::errc{} || parsed.ptr != cents_text.data() + cents_text.size() || cents < 0) {\n            return std::nullopt;\n        }\n        return Order{std::string{id}, cents};\n    }\n\n    std::string id() const { return id_; }\n    int cents() const noexcept { return cents_; }\n\nprivate:\n    Order(std::string id, int cents) : id_(std::move(id)), cents_(cents) {}\n    std::string id_;\n    int cents_;\n};\n\nint main() {\n    if (Order::create(\"order-7\", \"12x\")) return 1;\n    const auto order = Order::create(\"order-7\", \"1200\");\n    if (!order || order->cents() != 1200) return 2;\n    const std::string owned_id = Order::create(\"temporary\", \"5\")->id();\n    return owned_id == \"temporary\" ? 0 : 3;\n}\n"
    }
  ]
};
