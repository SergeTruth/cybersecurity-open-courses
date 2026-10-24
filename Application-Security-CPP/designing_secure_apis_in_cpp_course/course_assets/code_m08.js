window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply secure API version negotiation to a concrete security boundary and a release-safe regression.",
  "codeExamples": [
    {
      "title": "Negotiate only reviewed protocol versions and capabilities",
      "language": "cpp",
      "blurb": "Compatibility does not silently enable a capability absent from either peer's approved set.",
      "code": "#include <algorithm>\n#include <iterator>\n#include <optional>\n#include <set>\n#include <string>\n\nstruct ApiOffer {\n    unsigned int minimum_version;\n    unsigned int maximum_version;\n    std::set<std::string> capabilities;\n};\nstruct ApiAgreement {\n    unsigned int version;\n    std::set<std::string> capabilities;\n};\n\nstd::optional<ApiAgreement> negotiate(const ApiOffer& server,\n                                      const ApiOffer& client) {\n    const auto minimum = std::max(server.minimum_version,\n                                  client.minimum_version);\n    const auto maximum = std::min(server.maximum_version,\n                                  client.maximum_version);\n    if (minimum > maximum) return std::nullopt;\n    std::set<std::string> shared;\n    std::set_intersection(\n        server.capabilities.begin(), server.capabilities.end(),\n        client.capabilities.begin(), client.capabilities.end(),\n        std::inserter(shared, shared.end()));\n    return ApiAgreement{maximum, std::move(shared)};\n}\n"
    },
    {
      "title": "Reject incompatible versions and intersect capabilities",
      "language": "cpp",
      "blurb": "The test makes downgrade and capability behavior explicit without relying on an absent CMake fixture.",
      "code": "int test_api_negotiation_is_fail_closed() {\n    const ApiOffer server{2, 3, {\"read\", \"delete\"}};\n    const ApiOffer client{3, 4, {\"read\", \"export\"}};\n    const auto agreed = negotiate(server, client);\n    if (!agreed || agreed->version != 3) return 1;\n    if (agreed->capabilities != std::set<std::string>{\"read\"}) return 2;\n    return negotiate(server, ApiOffer{4, 5, {\"read\"}}) ? 3 : 0;\n}\n"
    }
  ]
};
