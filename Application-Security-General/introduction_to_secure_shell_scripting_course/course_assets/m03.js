window.COURSE_MODULE = {
  "title": "Safe Handling of Input and Arguments",
  "graphicAlt": "Draft visual summarizing safe handling of input and arguments.",
  "narration": "Shell scripts receive input from more places than people first expect. Command-line arguments, environment variables, configuration files, filenames, standard input, command output, scheduled jobs, and other automation can all influence behavior. A script does not need to be public-facing to receive uncontrolled input. A filename created by another process or an environment variable set by a CI job can still surprise the script.\n\nDefensive scripts define what they expect before they use it. A mode might be limited to start, stop, or status. An environment name might be limited to dev, test, or prod. A path might need to exist and be a directory under an approved base. A number might need to be within a safe range. Specific validation is more useful than vague cleanup because it documents the intended behavior.\n\nAvoid building commands by concatenating unchecked strings. Filenames should be handled as data, not as code. When passing filenames to tools that support it, using -- can stop option parsing so a filename that begins with a dash is not mistaken for a flag. Arguments should be passed as arguments, not reinterpreted by another shell unless there is a carefully reviewed reason.\n\nClear rejection is part of usability. If input does not match the expected shape, the script should fail with a message that helps the operator fix the problem without exposing secrets or internal details. A script that rejects surprising input early is easier to trust than a script that tries to guess what the caller meant and keeps going.",
  "narrationPoints": [
    "Shell scripts receive input from more places than people first expect.",
    "Command-line arguments, environment variables, configuration files, filenames, standard input, command output, scheduled jobs, and other automation can all influence behavior.",
    "A script does not need to be public-facing to receive uncontrolled input.",
    "A filename created by another process or an environment variable set by a CI job can still surprise the script.",
    "Defensive scripts define what they expect before they use it.",
    "A mode might be limited to start, stop, or status."
  ]
};
