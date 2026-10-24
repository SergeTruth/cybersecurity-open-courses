window.COURSE_MODULE = {
  "title": "Course Summary: A Secure CMake Roadmap",
  "graphicAlt": "Scoped targets, approved profiles, controlled inputs and inspected outputs connect source intent to release evidence.",
  "narration": "A secure CMake roadmap begins with clarity. Use target-based design so settings are close to the libraries, executables, tests, and tools they affect. Avoid unnecessary global state. Scope public, private, and interface properties deliberately so downstream users inherit only what they should. Structure the project so build boundaries are visible to reviewers.\n\nNext, make safe configurations easy to use. Define approved presets, documented options, and clear build profiles. Centralize compiler, linker, warning, sanitizer, and hardening policy in reviewable CMake logic. Make unsupported combinations fail early. Confirm through logs and artifact checks that release builds received the intended settings.\n\nThen control the inputs and outputs. Pin and review dependencies. Document toolchains, sysroots, SDKs, cache variables, and environment assumptions. Treat generated code, custom commands, and build-time scripts as security-relevant work. Review install rules, RPATH behavior, package metadata, debug artifacts, and final archive contents before delivery.\n\nFinally, make governance routine. CI should exercise approved profiles, inspect artifacts, preserve evidence, and report drift as a defect. CMake changes should receive the same seriousness as source changes because they can alter what ships. Build security is application security: it connects the code the team wrote to the binary the user receives.",
  "narrationPoints": [
    "Use target-based design so settings are close to the libraries, executables, tests, and tools they affect.",
    "Scope public, private, and interface properties deliberately so downstream users inherit only what they should.",
    "Centralize compiler, linker, warning, sanitizer, and hardening policy in reviewable CMake logic.",
    "Review install rules, RPATH behavior, package metadata, debug artifacts, and final archive contents before delivery.",
    "Build security is application security: it connects the code the team wrote to the binary the user receives.",
    "CMake changes should receive the same seriousness as source changes because they can alter what ships."
  ]
};
