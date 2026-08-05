window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply container reallocation and iterator invalidation to a concrete security boundary and a release-safe regression.",
  "codeExamples": [
    {
      "title": "Retain a stable key instead of a vector iterator",
      "language": "cpp",
      "blurb": "The lookup reacquires an iterator after growth rather than dereferencing stale storage.",
      "code": "#include <optional>\n#include <string>\n#include <vector>\n\nstruct UserRecord { std::string id; std::string role; };\n\nstd::optional<std::string> role_after_growth(\n    std::vector<UserRecord>& users,\n    const std::string& retained_id,\n    UserRecord added) {\n    users.push_back(std::move(added));\n    for (const auto& user : users) {\n        if (user.id == retained_id) return user.role;\n    }\n    return std::nullopt;\n}\n"
    },
    {
      "title": "Force reallocation while preserving logical identity",
      "language": "cpp",
      "blurb": "The test reserves only one slot so retaining the original iterator would be unsafe.",
      "code": "int test_role_after_growth_reacquires_storage() {\n    std::vector<UserRecord> users;\n    users.reserve(1);\n    users.push_back({\"u1\", \"reader\"});\n    const auto role = role_after_growth(users, \"u1\", {\"u2\", \"writer\"});\n    return role && *role == \"reader\" ? 0 : 1;\n}\n"
    }
  ]
};
