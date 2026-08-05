window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Bind configuration is parsed into a validated address object with an explicit exposure policy.",
  "codeExamples": [
    {
      "title": "Validate an IPv4 bind address and service port",
      "language": "cpp",
      "blurb": "The parser is the only constructor; it accepts loopback by default and requires explicit policy for external exposure.",
      "code": "#include <array>\n#include <charconv>\n#include <cstddef>\n#include <cstdint>\n#include <optional>\n#include <string_view>\n\nclass BindAddress {\npublic:\n    std::array<unsigned char, 4> octets() const noexcept {\n        return octets_;\n    }\n    std::uint16_t port() const noexcept { return port_; }\nprivate:\n    BindAddress(\n        std::array<unsigned char, 4> octets,\n        std::uint16_t port\n    ) noexcept : octets_(octets), port_(port) {}\n    friend std::optional<BindAddress> parse_bind_address(\n        std::string_view,\n        std::uint32_t,\n        bool\n    );\n    std::array<unsigned char, 4> octets_;\n    std::uint16_t port_;\n};\n\nstd::optional<BindAddress> parse_bind_address(\n    std::string_view address,\n    std::uint32_t port,\n    bool allow_external\n) {\n    if (port < 1024 || port > 65535) return std::nullopt;\n    std::array<unsigned char, 4> octets{};\n    for (std::size_t index = 0; index < octets.size(); ++index) {\n        const auto separator = address.find('.');\n        auto part = separator == address.npos\n            ? address\n            : address.substr(0, separator);\n        unsigned value = 0;\n        auto [end, error] = std::from_chars(\n            part.data(),\n            part.data() + part.size(),\n            value\n        );\n        if (part.empty() || error != std::errc{} ||\n            end != part.data() + part.size() || value > 255) {\n            return std::nullopt;\n        }\n        octets[index] = static_cast<unsigned char>(value);\n        if (index < 3) {\n            if (separator == address.npos) return std::nullopt;\n            address.remove_prefix(separator + 1);\n        } else if (separator != address.npos) {\n            return std::nullopt;\n        }\n    }\n    const bool loopback = octets[0] == 127;\n    if (!allow_external && !loopback) return std::nullopt;\n    return BindAddress(\n        octets,\n        static_cast<std::uint16_t>(port)\n    );\n}\n"
    },
    {
      "title": "Reject accidental external exposure and malformed addresses",
      "language": "cpp",
      "blurb": "The regression proves direct construction is unavailable and rejects accidental exposure, privileged ports, and malformed addresses.",
      "code": "#include <type_traits>\n\nstatic_assert(!std::is_aggregate_v<BindAddress>);\nstatic_assert(!std::is_constructible_v<\n    BindAddress,\n    std::array<unsigned char, 4>,\n    std::uint16_t\n>);\n\nint main() {\n    auto local = parse_bind_address(\"127.0.0.1\", 8443, false);\n    if (!local || local->port() != 8443) return 1;\n    if (parse_bind_address(\"0.0.0.0\", 8443, false)) return 2;\n    if (!parse_bind_address(\"0.0.0.0\", 8443, true)) return 3;\n    if (parse_bind_address(\"127.0.0.1junk\", 8443, false)) return 4;\n    if (parse_bind_address(\"127.0.0.1\", 1, false)) return 5;\n    return 0;\n}\n"
    }
  ]
};
