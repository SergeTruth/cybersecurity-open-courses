window.COURSE_MODULE = {
  "title": "Secure File, Path, and Process Operations",
  "graphicAlt": "Draft visual summarizing secure file, path, and process operations.",
  "narration": "A large portion of shell risk appears around files, paths, directories, and external commands. Scripts may assume they are running from a trusted current directory, rely on relative paths, use a PATH value controlled by the environment, overwrite files unexpectedly, or follow symlinks without realizing it. Defensive scripts control their working assumptions instead of inheriting them silently.\n\nUse known paths and quote path variables. When a path must come from input, validate what it is expected to be before using it. Check whether an expected path is a regular file, directory, or other type when that distinction matters. Be aware that filenames can contain spaces and other characters that make sloppy scripts behave differently. Where supported, -- can help separate options from filenames.\n\nTemporary files should be created with safe patterns, usually through tools such as mktemp or platform mechanisms that generate unpredictable names. Avoid predictable temporary filenames and broad temporary directories without cleanup. Symlinks and unexpected file types deserve caution, especially when a script runs with elevated permissions or writes output that other processes will trust.\n\nWhen calling external commands, pass arguments directly instead of building a string that another shell must reinterpret. Avoid unnecessary nested shells. Prefer explicit command paths when the environment is sensitive, or set a controlled PATH at the beginning of the script. Process execution should be boring and predictable: known command, known arguments, known working directory, and known failure behavior.",
  "narrationPoints": [
    "A large portion of shell risk appears around files, paths, directories, and external commands.",
    "Scripts may assume they are running from a trusted current directory, rely on relative paths, use a PATH value controlled by the environment, overwrite.",
    "Defensive scripts control their working assumptions instead of inheriting them silently.",
    "Use known paths and quote path variables.",
    "When a path must come from input, validate what it is expected to be before using it.",
    "Check whether an expected path is a regular file, directory, or other type when that distinction matters."
  ]
};
