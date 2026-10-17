window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The template invokes an application-owned policy object rather than discovering an attacker-controlled overload.",
  "codeExamples": [
    {
      "title": "Avoid security decisions through unqualified ADL calls",
      "language": "cpp",
      "blurb": "A trusted caller selects the application-owned policy instead of using ADL. The exception specification covers both calling the policy and converting its result to Boolean.",
      "code": "#include <string_view>\n\nstruct IdentifierPolicy {\n    bool operator()(std::string_view value) const noexcept {\n        if (value.empty() || value.size() > 16) return false;\n        for (char ch : value) if (!((ch >= 'a' && ch <= 'z') || ch == '-')) return false;\n        return true;\n    }\n};\n\ntemplate<class Policy>\n    requires requires(const Policy& policy, std::string_view value) {\n        static_cast<bool>(policy(value));\n    }\nbool validate_identifier(std::string_view value, const Policy& policy)\n    noexcept(noexcept(static_cast<bool>(policy(value)))) {\n    return static_cast<bool>(policy(value));\n}\n\nint main() {\n    const IdentifierPolicy policy;\n    if (!validate_identifier(\"order-read\", policy)) return 1;\n    return validate_identifier(\"../../admin\", policy) ? 2 : 0;\n}\n"
    }
  ]
};
