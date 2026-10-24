window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply input validation and data shape to a concrete security boundary and a release-safe regression.",
  "codeExamples": [
    {
      "title": "Construct a command only after validating every field",
      "language": "cpp",
      "blurb": "The validated type cannot represent an empty tenant, an unknown action, or an oversized note.",
      "code": "#include <optional>\n#include <string>\n#include <string_view>\n\nenum class Action { read, update };\nstruct ValidatedCommand {\n    std::string tenant;\n    Action action;\n    std::string note;\n};\n\nstd::optional<ValidatedCommand> make_command(\n    std::string_view tenant,\n    std::string_view action,\n    std::string_view note) {\n    if (tenant.empty() || tenant.size() > 36 || note.size() > 200) {\n        return std::nullopt;\n    }\n    Action parsed;\n    if (action == \"read\") parsed = Action::read;\n    else if (action == \"update\") parsed = Action::update;\n    else return std::nullopt;\n    return ValidatedCommand{\n        std::string(tenant), parsed, std::string(note)};\n}\n"
    },
    {
      "title": "Reject extra semantic values instead of coercing them",
      "language": "cpp",
      "blurb": "An unknown action never falls through to the more privileged update operation.",
      "code": "int test_make_command_rejects_unknown_action() {\n    if (!make_command(\"tenant-1\", \"read\", \"status\")) return 1;\n    if (make_command(\"tenant-1\", \"delete\", \"status\")) return 2;\n    if (make_command(\"\", \"read\", \"status\")) return 3;\n    return 0;\n}\n"
    }
  ]
};
