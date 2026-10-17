window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Permission evidence is checked independently from filename generation.",
  "codeExamples": [
    {
      "title": "Validate temporary-file ownership and permissions",
      "language": "cpp",
      "blurb": "The policy rejects nonregular objects, unexpected owners, special bits, and group or world access.",
      "code": "#include <cstddef>\n#include <cstdint>\n\nstruct TempFileMetadata {\n    bool regular_file;\n    std::uint32_t owner_id;\n    std::uint32_t mode;\n    std::uint32_t link_count;\n    std::size_t bytes;\n};\n\nbool approved_temp_metadata(\n    const TempFileMetadata& metadata,\n    std::uint32_t expected_owner,\n    std::size_t byte_limit\n) noexcept {\n    if (!metadata.regular_file || metadata.owner_id != expected_owner) return false;\n    if ((metadata.mode & 07777u) != 0600u || metadata.link_count != 1) return false;\n    return metadata.bytes <= byte_limit;\n}\n"
    },
    {
      "title": "Reject special bits, hard links, and oversized content",
      "language": "cpp",
      "blurb": "The regression makes each filesystem property part of the acceptance decision.",
      "code": "int main() {\n    TempFileMetadata valid{true, 1001, 0600, 1, 4096};\n    if (!approved_temp_metadata(valid, 1001, 4096)) return 1;\n    valid.mode = 04600;\n    if (approved_temp_metadata(valid, 1001, 4096)) return 2;\n    valid.mode = 0600; valid.link_count = 2;\n    if (approved_temp_metadata(valid, 1001, 4096)) return 3;\n    valid.link_count = 1; valid.bytes = 4097;\n    if (approved_temp_metadata(valid, 1001, 4096)) return 4;\n    return 0;\n}\n"
    }
  ]
};
