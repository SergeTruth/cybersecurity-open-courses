window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply type-safe parameters and return values to a concrete security boundary and a release-safe regression.",
  "codeExamples": [
    {
      "title": "Separate tenant and user identifiers with strong types",
      "language": "cpp",
      "blurb": "Callers cannot accidentally swap same-shaped identifiers at compile time.",
      "code": "#include <optional>\n#include <string>\n#include <utility>\n\nstruct TenantId { std::string value; };\nstruct UserId { std::string value; };\nstruct UserRecord {\n    TenantId tenant;\n    UserId user;\n    std::string display_name;\n};\n\nstd::optional<UserRecord> find_user(TenantId tenant, UserId user);\n\nbool same_identity(const UserRecord& record,\n                   const TenantId& tenant,\n                   const UserId& user) {\n    return record.tenant.value == tenant.value &&\n           record.user.value == user.value;\n}\n"
    },
    {
      "title": "Keep tenant and object identity distinct in the contract",
      "language": "cpp",
      "blurb": "The test demonstrates that a matching user in another tenant is not the same protected object.",
      "code": "int test_strong_identity_includes_tenant() {\n    const UserRecord record{{\"tenant-a\"}, {\"user-1\"}, \"Alice\"};\n    if (!same_identity(record, TenantId{\"tenant-a\"}, UserId{\"user-1\"})) {\n        return 1;\n    }\n    return same_identity(record, TenantId{\"tenant-b\"}, UserId{\"user-1\"})\n        ? 2 : 0;\n}\n"
    }
  ]
};
