window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The validated type admits only reviewed protocol versions, verification requirements, and approved ports.",
  "codeExamples": [
    {
      "title": "Build TLS settings from a closed policy",
      "language": "cpp",
      "blurb": "The validated type admits only reviewed protocol versions, verification requirements, and approved ports.",
      "code": "#include <optional>\n\nclass TlsSettings {\npublic:\n    static std::optional<TlsSettings> create(unsigned minimum_version, bool verify_peer,\n                                             bool verify_hostname, unsigned port) noexcept {\n        if (minimum_version != 13 || !verify_peer || !verify_hostname || port != 443) {\n            return std::nullopt;\n        }\n        return TlsSettings{minimum_version};\n    }\n    unsigned minimum_version() const noexcept { return minimum_version_; }\nprivate:\n    explicit TlsSettings(unsigned version) : minimum_version_(version) {}\n    unsigned minimum_version_;\n};\n\nint main() {\n    if (TlsSettings::create(12, true, true, 443)) return 1;\n    if (TlsSettings::create(14, true, true, 443)) return 2;\n    if (TlsSettings::create(999, true, true, 443)) return 3;\n    if (TlsSettings::create(13, false, true, 443)) return 4;\n    if (TlsSettings::create(13, true, false, 443)) return 5;\n    if (TlsSettings::create(13, true, true, 8443)) return 6;\n    const auto settings = TlsSettings::create(13, true, true, 443);\n    return settings && settings->minimum_version() == 13 ? 0 : 7;\n}\n"
    }
  ]
};
