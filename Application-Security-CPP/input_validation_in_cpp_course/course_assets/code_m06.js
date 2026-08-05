window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Reject duplicate and unknown fields while converting a small wire representation into a closed application schema.",
  "codeExamples": [
    {
      "title": "Parse unique configuration fields into a typed object",
      "language": "cpp",
      "blurb": "The parser consumes structured pairs, so duplicate names cannot silently overwrite earlier security values.",
      "code": "#include <charconv>\n#include <map>\n#include <optional>\n#include <string>\n#include <vector>\n\nstruct UploadPolicy {\n    bool enabled;\n    unsigned maximum_files;\n};\n\nstd::optional<UploadPolicy> parse_upload_policy(\n    const std::vector<std::pair<std::string, std::string>>& fields\n) {\n    std::map<std::string, std::string> unique;\n    for (const auto& field : fields) {\n        if (field.first != \"enabled\" && field.first != \"maximum_files\") {\n            return std::nullopt;\n        }\n        if (!unique.insert(field).second) return std::nullopt;\n    }\n    if (unique.size() != 2) return std::nullopt;\n    bool enabled;\n    if (unique[\"enabled\"] == \"true\") enabled = true;\n    else if (unique[\"enabled\"] == \"false\") enabled = false;\n    else return std::nullopt;\n    unsigned maximum = 0;\n    const auto& text = unique[\"maximum_files\"];\n    const auto [end, error] = std::from_chars(\n        text.data(), text.data() + text.size(), maximum\n    );\n    if (error != std::errc{} || end != text.data() + text.size() ||\n        maximum == 0 || maximum > 20) return std::nullopt;\n    return UploadPolicy{enabled, maximum};\n}"
    },
    {
      "title": "Regression: duplicates and extension fields are invalid",
      "language": "cpp",
      "blurb": "The accepted structure contains exactly the two reviewed fields.",
      "code": "int test_upload_policy() {\n    if (!parse_upload_policy({{\"enabled\", \"true\"}, {\"maximum_files\", \"4\"}})) return 1;\n    if (parse_upload_policy({\n        {\"enabled\", \"true\"}, {\"enabled\", \"false\"}, {\"maximum_files\", \"4\"}\n    })) return 2;\n    if (parse_upload_policy({\n        {\"enabled\", \"true\"}, {\"maximum_files\", \"4\"}, {\"admin\", \"true\"}\n    })) return 3;\n    return 0;\n}"
    }
  ]
};
