window.COURSE_MODULE = {
  "title": "Executable Layout, PIE, ASLR, and Memory Permissions",
  "graphicAlt": "A position-independent executable loads at varied addresses with read-only relocation data and a non-executable stack enforced by linker metadata.",
  "narration": "Compiler and linker settings influence the final binary, not just the source code. Release hardening includes how the executable is laid out, which sections are writable or executable, how relocations are handled, and whether the operating system can apply its own protection mechanisms effectively.\n\nPosition-independent executables support address-space randomization by allowing the operating system to place the executable at varied locations. This is a release-build property that depends on compiler, linker, platform, and packaging choices. Teams should verify it in the delivered artifact, not only in the build script.\n\nMemory permission hardening aims to reduce unnecessary executable regions. For example, a stack or data region should not be executable unless a platform-specific design explicitly requires it. Linker options and platform defaults can influence these properties, so release review should include binary inspection.\n\nRelocation hardening concepts focus on making dynamic linking behavior less permissive after startup. The exact options vary across platforms and toolchains, but the security intent is consistent: reduce mutable runtime surfaces where the platform supports doing so.\n\nThe defensive lesson is verification. A CMake option, project property, or wiki entry is not enough. Review the compiler commands, linker commands, CI build logs, packaging process, and final binary properties. The artifact that ships is the thing that needs to match policy.",
  "narrationPoints": [
    "Compiler and linker settings influence the final binary, not just the source code.",
    "Position-independent executables support address-space randomization by allowing the operating system to place the executable at varied locations.",
    "Memory permission hardening aims to reduce unnecessary executable regions.",
    "Relocation hardening concepts focus on making dynamic linking behavior less permissive after startup.",
    "A CMake option, project property, or wiki entry is not enough.",
    "The artifact that ships is the thing that needs to match policy."
  ]
};
