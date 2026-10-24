window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The policy rejects networked build steps, bundled toolchains, and unexpected generated-code execution.",
  "codeExamples": [
    {
      "title": "Allow only reviewed build integrations",
      "language": "cpp",
      "blurb": "The policy rejects networked build steps, bundled toolchains, and unexpected generated-code execution.",
      "code": "#include <string>\n\nstruct BuildIntegration {\n    std::string mode;\n    bool network_access;\n    bool runs_generator;\n};\n\nbool approved_integration(const BuildIntegration& integration) noexcept {\n    const bool known_mode = integration.mode == \"system\" || integration.mode == \"vendored-reviewed\";\n    if (!known_mode || integration.network_access) return false;\n    return integration.mode != \"system\" || !integration.runs_generator;\n}\n\nint main() {\n    BuildIntegration stored{std::string{\"vendored-reviewed\"}, false, true};\n    if (!approved_integration(stored)) return 1;\n    if (approved_integration({std::string{\"system\"}, true, false})) return 2;\n    return approved_integration({std::string{\"unknown\"}, false, false}) ? 3 : 0;\n}\n"
    }
  ]
};
