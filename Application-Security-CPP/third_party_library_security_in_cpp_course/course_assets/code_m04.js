window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The gate requires an exact lowercase SHA-256 digest supplied independently from the downloaded artifact.",
  "codeExamples": [
    {
      "title": "Bind acquisition to an approved digest",
      "language": "cpp",
      "blurb": "The gate requires an exact lowercase SHA-256 digest supplied independently from the downloaded artifact.",
      "code": "#include <string_view>\n\nbool lowercase_sha256(std::string_view digest) noexcept {\n    if (digest.size() != 64) return false;\n    for (const char ch : digest) if (!((ch >= '0' && ch <= '9') || (ch >= 'a' && ch <= 'f'))) return false;\n    return true;\n}\n\nbool approved_artifact(std::string_view observed, std::string_view reviewed) noexcept {\n    return lowercase_sha256(observed) && lowercase_sha256(reviewed) && observed == reviewed;\n}\n\nint main() {\n    constexpr auto reviewed = \"0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef\";\n    if (!approved_artifact(reviewed, reviewed)) return 1;\n    if (approved_artifact(\"0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdee\", reviewed)) return 2;\n    return approved_artifact(\"GG23456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef\", reviewed) ? 3 : 0;\n}\n"
    }
  ]
};
