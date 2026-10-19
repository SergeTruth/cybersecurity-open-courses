window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "C++20. This validates a requested capability policy only; it does not install a sandbox. A platform-specific launcher must apply and verify OS restrictions before running untrusted code.",
  "codeExamples": [
    {
      "title": "Require the parser's minimal capability set",
      "language": "cpp",
      "blurb": "The profile must permit input reads and memory allocation while explicitly excluding network, process creation, and filesystem writes.",
      "code": "#include <set>\n\nenum class Capability {\n    read_input,\n    allocate_memory,\n    network,\n    create_process,\n    write_files\n};\n\nstruct SandboxProfile {\n    std::set<Capability> allowed;\n};\n\nbool approved_parser_sandbox(\n    const SandboxProfile& profile\n) noexcept {\n    return profile.allowed.size() == 2 &&\n        profile.allowed.contains(Capability::read_input) &&\n        profile.allowed.contains(Capability::allocate_memory);\n}"
    },
    {
      "title": "Reject sandbox profiles with excess authority",
      "language": "cpp",
      "blurb": "The exact minimal profile passes; adding network access or omitting a required capability fails before launch.",
      "code": "int test_parser_sandbox_profile() {\n    SandboxProfile minimal{{\n        Capability::read_input,\n        Capability::allocate_memory\n    }};\n    if (!approved_parser_sandbox(minimal)) return 1;\n    minimal.allowed.insert(Capability::network);\n    if (approved_parser_sandbox(minimal)) return 2;\n    if (approved_parser_sandbox(\n        SandboxProfile{{Capability::read_input}}\n    )) return 3;\n    return 0;\n}"
    }
  ]
};
