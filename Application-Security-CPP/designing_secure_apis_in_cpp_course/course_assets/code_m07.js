window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply capability-based least privilege to a concrete security boundary and a release-safe regression.",
  "codeExamples": [
    {
      "title": "Require an unforgeable capability for destructive access",
      "language": "cpp",
      "blurb": "Only the authorization service can construct a delete capability for a specific tenant and order.",
      "code": "#include <optional>\n#include <string>\n#include <utility>\n\nclass DeleteCapability {\npublic:\n    const std::string& tenant() const noexcept { return tenant_; }\n    const std::string& order() const noexcept { return order_; }\n\nprivate:\n    friend class AuthorizationService;\n    DeleteCapability(std::string tenant, std::string order)\n        : tenant_(std::move(tenant)), order_(std::move(order)) {}\n    std::string tenant_;\n    std::string order_;\n};\n\nclass AuthorizationService {\npublic:\n    std::optional<DeleteCapability> authorize_delete(\n        bool permitted, std::string tenant, std::string order) const {\n        if (!permitted || tenant.empty() || order.empty()) return std::nullopt;\n        return DeleteCapability(std::move(tenant), std::move(order));\n    }\n};\n\nbool delete_order(const DeleteCapability& capability,\n                  const std::string& tenant,\n                  const std::string& order) {\n    return capability.tenant() == tenant && capability.order() == order;\n}\n"
    },
    {
      "title": "Bind the capability to both tenant and protected object",
      "language": "cpp",
      "blurb": "A valid capability for one order cannot authorize a sibling object.",
      "code": "int test_delete_capability_is_object_scoped() {\n    AuthorizationService authorization;\n    auto capability =\n        authorization.authorize_delete(true, \"tenant-a\", \"order-1\");\n    if (!capability) return 1;\n    if (!delete_order(*capability, \"tenant-a\", \"order-1\")) return 2;\n    if (delete_order(*capability, \"tenant-a\", \"order-2\")) return 3;\n    return delete_order(*capability, \"tenant-b\", \"order-1\") ? 4 : 0;\n}\n"
    }
  ]
};
