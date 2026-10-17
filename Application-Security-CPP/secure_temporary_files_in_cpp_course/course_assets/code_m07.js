window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Failure handling distinguishes precommit failure from committed-but-not-durable output.",
  "codeExamples": [
    {
      "title": "Report precise temporary replacement outcomes",
      "language": "cpp",
      "blurb": "Rename success dominates the result, even for inconsistent observations. If writing or syncing was not confirmed, the replacement exists but its content or durability needs reconciliation; do not assume rollback or blindly retry.",
      "code": "enum class ReplacementResult {\n    failed_before_commit,\n    replaced_content_or_durability_unconfirmed,\n    replaced_and_durable\n};\n\nReplacementResult replacement_result(\n    bool file_written_and_synced,\n    bool rename_succeeded,\n    bool directory_sync_succeeded\n) noexcept {\n    // A successful rename cannot be reported as a pre-commit failure.\n    if (!rename_succeeded) return ReplacementResult::failed_before_commit;\n    if (!file_written_and_synced || !directory_sync_succeeded) {\n        return ReplacementResult::replaced_content_or_durability_unconfirmed;\n    }\n    return ReplacementResult::replaced_and_durable;\n}\n"
    },
    {
      "title": "Exercise every commit and durability state",
      "language": "cpp",
      "blurb": "All eight combinations are checked, including a reported rename after an unconfirmed write. None of the committed combinations is labeled a pre-commit failure.",
      "code": "int main() {\n    for (int bits = 0; bits < 8; ++bits) {\n        const bool written = (bits & 1) != 0;\n        const bool renamed = (bits & 2) != 0;\n        const bool synced = (bits & 4) != 0;\n        const auto expected = !renamed ? ReplacementResult::failed_before_commit :\n            written && synced ? ReplacementResult::replaced_and_durable :\n            ReplacementResult::replaced_content_or_durability_unconfirmed;\n        if (replacement_result(written, renamed, synced) != expected) return bits + 1;\n    }\n    return 0;\n}\n"
    }
  ]
};
