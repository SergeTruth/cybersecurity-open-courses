window.COURSE_MODULE = {
  "title": "Environment and Working Directory Control",
  "graphicAlt": "Selected environment and explicit directories define the child execution context.",
  "narration": "A child process can inherit environment variables from the parent, and those variables can influence runtime behavior. They may affect configuration lookup, locale, temporary directory selection, logging, library behavior, proxy settings, and other assumptions. The parent should decide which environment is appropriate for the child.\n\nA minimal or controlled environment is often easier to review than inheriting everything. Some tools need a specific set of variables. Others can run with a deliberately small environment. The code should build that environment intentionally where practical and document why inherited values are allowed.\n\nLocale and encoding-related environment values can change parsing, comparison, formatting, and diagnostics. Temporary directory variables can influence where files are created. Configuration-related variables can change which files or services a helper uses. These are all process-launch decisions, not background details.\n\nThe working directory also matters. Relative paths used by the child are interpreted relative to its working directory. If the parent relies on a specific directory, it should set it explicitly or pass absolute paths where appropriate. A service or automation wrapper should not accidentally decide this for the child.\n\nReviewers should ask what the child inherits and why. If the launch uses the parent's environment and current directory unchanged, that should be an intentional choice. If the child needs constrained behavior, build the environment and working directory as part of the launch contract.",
  "narrationPoints": [
    "The parent should decide which environment is appropriate for the child.",
    "A minimal or controlled environment is often easier to review than inheriting everything.",
    "Locale and encoding-related environment values can change parsing, comparison, formatting, and diagnostics.",
    "Relative paths used by the child are interpreted relative to its working directory.",
    "If the launch uses the parent's environment and current directory unchanged, that should be an intentional choice."
  ]
};
