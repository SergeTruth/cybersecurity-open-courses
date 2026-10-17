window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Cross-platform code declares the security capabilities required from each temporary-file adapter.",
  "codeExamples": [
    {
      "title": "Validate a platform temporary-file capability profile",
      "language": "cpp",
      "blurb": "The application requires exclusive creation, no-follow behavior, private permissions, handle cleanup, and close-on-exec inheritance control.",
      "code": "#include <string>\n\nstruct TempPlatformCapabilities {\n    std::string adapter;\n    bool exclusive_create;\n    bool rejects_links;\n    bool private_permissions;\n    bool handle_bound_cleanup;\n    bool prevents_child_inheritance;\n};\n\nbool approved_temp_adapter(const TempPlatformCapabilities& capabilities) noexcept {\n    const bool known = capabilities.adapter == \"windows-createfile-v2\" ||\n                       capabilities.adapter == \"posix-openat-v2\";\n    return known && capabilities.exclusive_create && capabilities.rejects_links &&\n           capabilities.private_permissions && capabilities.handle_bound_cleanup &&\n           capabilities.prevents_child_inheritance;\n}\n"
    },
    {
      "title": "Reject incomplete and unknown platform adapters",
      "language": "cpp",
      "blurb": "The positive case prevents an always-false gate while individual negative cases document required semantics.",
      "code": "int main() {\n    TempPlatformCapabilities valid{\"posix-openat-v2\", true, true, true, true, true};\n    if (!approved_temp_adapter(valid)) return 1;\n    valid.rejects_links = false;\n    if (approved_temp_adapter(valid)) return 2;\n    valid.rejects_links = true; valid.adapter = \"std-fstream\";\n    if (approved_temp_adapter(valid)) return 3;\n    return 0;\n}\n"
    }
  ]
};
