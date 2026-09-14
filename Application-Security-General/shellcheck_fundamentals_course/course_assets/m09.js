window.COURSE_MODULE = {
  "title": "Course Summary: ShellCheck Review Checklist",
  "graphicAlt": "ShellCheck-assisted review reads findings, preserves arguments, handles failures, matches the runtime, and reviews exceptions with tests and judgment.",
  "narration": "ShellCheck fundamentals are best understood as a repeatable review habit. Run ShellCheck early and repeatedly. Read each finding in context. Understand the shell behavior behind the message before changing code. Fix root causes rather than only quieting warnings. When a finding points to unclear intent, use it as a chance to improve the script's design, documentation, or tests.\n\nPay close attention to quoting, word splitting, globbing, variables, conditionals, command substitutions, pipelines, and exit status. These are the areas where shell scripts often behave differently from what authors expect. Preserving argument boundaries, checking important results, and making control flow explicit can prevent many operational failures before they reach production.\n\nMatch the script to its intended interpreter. The shebang, shell syntax, and runtime environment should tell the same story. If a script uses Bash features, declare and run it as Bash. If it must be portable, write and test it for that requirement. Portability is not a slogan; it is an engineering decision that should match where the script will run.\n\nUse suppressions sparingly, document them clearly, and review them over time. Integrate ShellCheck into editor workflows, pull request review, and CI/CD so script quality improves before merge and before deployment. ShellCheck is not a substitute for judgment, runtime testing, or operational validation, but it is one of the easiest ways to raise the baseline quality of shell automation across a team.",
  "narrationPoints": [
    "ShellCheck fundamentals are best understood as a repeatable review habit.",
    "Pay close attention to quoting, word splitting, globbing, variables, conditionals, command substitutions, pipelines, and exit status.",
    "Match the script to its intended interpreter.",
    "Use suppressions sparingly, document them clearly, and review them over time."
  ]
};
