window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "TLS configuration validates the peer name and a fail-closed protocol policy before connection.",
  "codeExamples": [
    {
      "title": "Validate an application-owned TLS client policy",
      "language": "cpp",
      "blurb": "The policy requires TLS 1.3, certificate and hostname verification, SNI, and the approved service name.",
      "code": "#include <string>\n\nstruct TlsClientPolicy {\n    std::string minimum_version;\n    bool verify_certificate;\n    bool verify_hostname;\n    bool send_sni;\n    std::string expected_hostname;\n};\n\nbool approved_tls_policy(const TlsClientPolicy& policy) noexcept {\n    return policy.minimum_version == \"TLS1.3\" && policy.verify_certificate &&\n           policy.verify_hostname && policy.send_sni &&\n           policy.expected_hostname == \"api.orders.example\";\n}\n"
    },
    {
      "title": "Reject hostname and verification downgrades",
      "language": "cpp",
      "blurb": "The positive case and independent negative cases prevent an always-false policy check from passing.",
      "code": "int main() {\n    TlsClientPolicy valid{\"TLS1.3\", true, true, true, \"api.orders.example\"};\n    if (!approved_tls_policy(valid)) return 1;\n    valid.verify_hostname = false;\n    if (approved_tls_policy(valid)) return 2;\n    valid.verify_hostname = true; valid.expected_hostname = \"orders.example\";\n    if (approved_tls_policy(valid)) return 3;\n    valid.expected_hostname = \"api.orders.example\"; valid.minimum_version = \"TLS1.2\";\n    if (approved_tls_policy(valid)) return 4;\n    return 0;\n}\n"
    }
  ]
};
