window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "An enum selects reviewed behavior instead of allowing arbitrary specializations to alter validation.",
  "codeExamples": [
    {
      "title": "Keep customization inside a closed policy set",
      "language": "cpp",
      "blurb": "A constrained enum selects exactly two reviewed policies; unnamed enum values are rejected during compilation.",
      "code": "#include <cstddef>\n#include <span>\n\nenum class PayloadPolicy { compact, standard };\n\ntemplate<PayloadPolicy Policy>\n    requires (Policy == PayloadPolicy::compact || Policy == PayloadPolicy::standard)\nbool valid_payload(std::span<const std::byte> payload) noexcept {\n    constexpr std::size_t maximum = Policy == PayloadPolicy::compact ? 64 : 1024;\n    return !payload.empty() && payload.size() <= maximum;\n}\n\ntemplate<PayloadPolicy Policy>\nconcept SupportedPolicy = requires(std::span<const std::byte> bytes) {\n    valid_payload<Policy>(bytes);\n};\nstatic_assert(SupportedPolicy<PayloadPolicy::compact>);\nstatic_assert(SupportedPolicy<PayloadPolicy::standard>);\nstatic_assert(!SupportedPolicy<static_cast<PayloadPolicy>(99)>);\n\nint main() {\n    const std::byte small[]{std::byte{1}};\n    std::byte large[65]{};\n    if (!valid_payload<PayloadPolicy::compact>(small)) return 1;\n    if (valid_payload<PayloadPolicy::compact>(large)) return 2;\n    return valid_payload<PayloadPolicy::standard>(large) ? 0 : 3;\n}\n"
    }
  ]
};
