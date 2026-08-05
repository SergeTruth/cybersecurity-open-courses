window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Use the transport library's parsed URL representation and one application-owned policy for every redirect hop.",
  "codeExamples": [
    {
      "title": "Approve parsed redirect destinations",
      "language": "cpp",
      "blurb": "Scheme, canonical host, effective port, credentials, proxy behavior, and redirect count are evaluated through one policy object.",
      "code": "\n#include <optional>\n#include <string>\n#include <utility>\n\nstruct ParsedDestination {\n    std::string scheme;\n    std::string canonical_host;\n    std::optional<unsigned short> explicit_port;\n    bool has_credentials;\n};\n\nstruct ConnectionPolicy {\n    bool use_environment_proxy = false;\n    unsigned maximum_redirects = 3;\n};\n\nbool approved_http_destination(\n    const ParsedDestination& destination\n) {\n    const unsigned short effective_port =\n        destination.explicit_port.value_or(443);\n    return destination.scheme == \"https\" &&\n        destination.canonical_host == \"api.example.com\" &&\n        effective_port == 443 &&\n        !destination.has_credentials;\n}\n\nstd::optional<ParsedDestination> follow_redirect(\n    const ParsedDestination& current,\n    ParsedDestination location,\n    unsigned redirects_used,\n    const ConnectionPolicy& policy\n) {\n    if (policy.use_environment_proxy ||\n        policy.maximum_redirects == 0 ||\n        redirects_used >= policy.maximum_redirects ||\n        !approved_http_destination(current) ||\n        !approved_http_destination(location)) {\n        return std::nullopt;\n    }\n    return location;\n}"
    },
    {
      "title": "Regression: parsed credentials, ports, hosts, proxies, and hop budgets fail",
      "language": "cpp",
      "blurb": "The test uses the same canonical fields the selected transport URL parser provides.",
      "code": "\nint test_redirect_policy() {\n    const ParsedDestination approved{\n        \"https\", \"api.example.com\", std::nullopt, false\n    };\n    const ConnectionPolicy policy{false, 3};\n    if (!follow_redirect(approved, approved, 0, policy)) return 1;\n    if (follow_redirect(\n        approved,\n        {\"https\", \"api.example.com.evil.test\", std::nullopt, false},\n        0, policy\n    )) return 2;\n    if (follow_redirect(\n        approved,\n        {\"https\", \"api.example.com\", 444, false},\n        0, policy\n    )) return 3;\n    if (follow_redirect(\n        approved,\n        {\"https\", \"api.example.com\", std::nullopt, true},\n        0, policy\n    )) return 4;\n    if (follow_redirect(approved, approved, 3, policy)) return 5;\n    if (follow_redirect(\n        approved, approved, 0, ConnectionPolicy{true, 3}\n    )) return 6;\n    return 0;\n}"
    }
  ]
};
