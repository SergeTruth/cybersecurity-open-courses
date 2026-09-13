window.COURSE_MODULE = {
  "title": "Build Scripts, Procedural Macros, and Native Dependencies",
  "graphicAlt": "Build scripts, macros, and native integrations execute within the build trust boundary; runner secrets should be limited.",
  "narration": "Cargo builds can execute code before the final application runs. Build scripts, procedural macros, code generators, native library discovery, and platform-specific compilation steps may all run on a developer workstation or CI/CD runner. That makes build-time behavior part of the trust boundary, not a harmless implementation detail.\n\nA build.rs script can inspect environment variables, locate native libraries, generate files, set compiler flags, or communicate information to Cargo. Many build scripts are legitimate and useful, especially for platform integration. The security point is that they should be visible, necessary, and reviewed with the same seriousness as other trusted code.\n\nProcedural macros and code generators also affect what gets compiled. They can create code that reviewers may not see directly in the source file being edited. Teams should understand which macros are central to their build, whether generated code is inspectable when needed, and whether macro dependencies introduce additional maintenance or policy concerns.\n\nNative dependencies add another layer. They may depend on platform libraries, link behavior, toolchains, headers, or system packages. This can affect portability, reproducibility, licensing, vulnerability management, and incident response. A Rust artifact is easier to govern when native assumptions are documented and tested in the expected environments.\n\nCI/CD context matters because build-time code runs where secrets and credentials may be present. Runners should not expose unnecessary registry tokens, deployment credentials, or sensitive environment values to general build steps. Secure Cargo workflows treat build-time execution as trusted work and design the pipeline so only the right secrets are available at the right stage.",
  "narrationPoints": [
    "Cargo builds can execute code.",
    "Procedural macros and code generators also affect what gets.",
    "Native dependencies add another layer.",
    "CI/CD context matters because build-time code runs.",
    "The security point is that they should be visible.",
    "Runners should not expose unnecessary registry tokens."
  ]
};
