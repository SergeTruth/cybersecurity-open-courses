window.COURSE_MODULE = {
  "title": "Why Secure Shell Scripting Matters",
  "graphicAlt": "Draft visual summarizing why secure shell scripting matters.",
  "narration": "Shell scripts often begin as small helpers. Someone writes a few commands to rotate a log, copy a file, restart a service, clean a directory, or call a cloud tool. Over time, that helper gets scheduled, added to a deployment job, run by an administrator, or copied into a production runbook. The script may still look small, but it may now touch critical files, credentials, services, or customer data.\n\nSecure shell scripting is not about being afraid of automation. It is about respecting what automation can reach. A script can run with elevated permissions, inherit environment variables, depend on the current directory, read files with surprising names, or call external tools whose behavior changes across systems. A tiny quoting mistake, unchecked input, or missing error check can create a large operational surprise when the script runs under pressure.\n\nScripts also become invisible dependencies. People remember the application code, but forget the shell wrapper that prepares backups, deploys artifacts, syncs data, or updates configuration. Future maintainers need scripts that are readable and predictable. Clear names, explicit preconditions, careful input handling, and useful error messages make a script safer because the next operator can understand what it is about to do.\n\nThe defensive mindset is simple: assume inputs can be surprising, environments can change, and failures will happen at the worst possible time. A secure script validates what it expects, quotes values that should remain single arguments, checks important results, protects secrets, controls paths, and logs enough to support operations. The goal is safer automation, not unnecessary complexity.",
  "narrationPoints": [
    "Shell scripts often begin as small helpers.",
    "Someone writes a few commands to rotate a log, copy a file, restart a service, clean a directory, or call a cloud tool.",
    "Over time, that helper gets scheduled, added to a deployment job, run by an administrator, or copied into a production runbook.",
    "The script may still look small, but it may now touch critical files, credentials, services, or customer data.",
    "Secure shell scripting is not about being afraid of automation.",
    "It is about respecting what automation can reach."
  ]
};
