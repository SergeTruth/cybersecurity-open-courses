window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Fuzzing, Testing, Observability, and Review to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Fuzz the exact-frame parser",
      "language": "cpp",
      "blurb": "The harness asserts no trailing-data path is accepted by exercising arbitrary byte sequences under sanitizers.",
      "code": "#include <cstddef>\n#include <cstdint>\n#include <span>\n\nbool parse_protocol_frame(std::span<const std::uint8_t>) noexcept;\n\nextern \"C\" int LLVMFuzzerTestOneInput(\n    const std::uint8_t* data, std::size_t size) {\n    (void)parse_protocol_frame({data, size});\n    return 0;\n}\n"
    },
    {
      "title": "Record bounded rejection categories rather than payloads",
      "language": "cpp",
      "blurb": "A closed enumeration controls metric cardinality and avoids copying attacker-controlled frame contents into logs.",
      "code": "#include <string_view>\n\nenum class RejectReason {\n    truncated, trailing_data, unsupported_version,\n    authentication_failed, replayed, resource_limit\n};\n\nstd::string_view metric_name(RejectReason reason) noexcept {\n    switch (reason) {\n        case RejectReason::truncated: return \"binary_truncated\";\n        case RejectReason::trailing_data: return \"binary_trailing_data\";\n        case RejectReason::unsupported_version: return \"binary_version\";\n        case RejectReason::authentication_failed: return \"binary_auth\";\n        case RejectReason::replayed: return \"binary_replay\";\n        case RejectReason::resource_limit: return \"binary_resource\";\n    }\n    return \"binary_unknown\";\n}\n"
    }
  ]
};
