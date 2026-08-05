window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Versioned verifier records support controlled migration without accepting unknown algorithms.",
  "codeExamples": [
    {
      "title": "Choose a migration action from authenticated digest metadata",
      "language": "cpp",
      "blurb": "Owning metadata distinguishes accepted, rehash-required, and rejected records without borrowing parser storage.",
      "code": "#include <cstdint>\n#include <string>\n\nenum class HashMigrationDecision { accept, accept_and_rehash, reject };\n\nstruct StoredHashMetadata {\n    std::string algorithm;\n    std::uint32_t parameters_version;\n};\n\nHashMigrationDecision migration_decision(const StoredHashMetadata& record) noexcept {\n    if (record.algorithm == \"argon2id\" && record.parameters_version == 3) {\n        return HashMigrationDecision::accept;\n    }\n    if (record.algorithm == \"argon2id\" && record.parameters_version == 2) {\n        return HashMigrationDecision::accept_and_rehash;\n    }\n    return HashMigrationDecision::reject;\n}\n"
    },
    {
      "title": "Exercise current, legacy, and unknown metadata",
      "language": "cpp",
      "blurb": "The regression proves metadata remains valid after local parser storage is destroyed and covers legacy and unknown records.",
      "code": "#include <utility>\n\nStoredHashMetadata make_legacy_metadata() {\n    std::string local_algorithm = \"argon2id\";\n    return StoredHashMetadata{std::move(local_algorithm), 2};\n}\n\nint main() {\n    if (migration_decision({\"argon2id\", 3}) != HashMigrationDecision::accept) return 1;\n    auto legacy = make_legacy_metadata();\n    if (migration_decision(legacy) != HashMigrationDecision::accept_and_rehash) return 2;\n    if (migration_decision({\"sha1\", 1}) != HashMigrationDecision::reject) return 3;\n    if (migration_decision({\"argon2id\", 99}) != HashMigrationDecision::reject) return 4;\n    return 0;\n}\n"
    }
  ]
};
