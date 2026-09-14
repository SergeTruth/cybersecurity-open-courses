window.COURSE_MODULE = {
  "title": "Suppressions, Exceptions, and Review Discipline",
  "graphicAlt": "Blanket ignores hide useful findings; a narrow documented exception preserves signal and is reviewed when assumptions change.",
  "narration": "There are times when a ShellCheck finding does not require a code change. A script might intentionally rely on a specific shell behavior, use a controlled input pattern, or preserve compatibility with an existing environment. That does not mean every warning should be ignored. It means exceptions should be handled with discipline so the tool remains useful.\n\nA defensible suppression is narrow, documented, and close to the code it affects. The explanation should tell a reviewer why the behavior is intentional and why it is acceptable in this context. A future maintainer should not have to guess whether the team understood the warning or simply wanted the pipeline to pass. The more sensitive or production-critical the script is, the more important that explanation becomes.\n\nBlanket ignores weaken the process. If a repository disables broad classes of findings without review, future problems may be hidden alongside the original exception. The signal from ShellCheck becomes less useful, and teams gradually stop trusting the lint result. Suppression should preserve signal by quieting only the specific warning that has been reviewed and accepted.\n\nAccepted findings should be revisited over time. A suppression that was reasonable for a legacy migration may no longer be needed after the script is refactored. A controlled input assumption may become invalid when the script is reused in a new context. Review discipline keeps exceptions from becoming permanent blind spots and helps ShellCheck remain a practical aid rather than a noisy obstacle.",
  "narrationPoints": [
    "There are times when a ShellCheck finding does not require a code change.",
    "A defensible suppression is narrow, documented, and close to the code it affects.",
    "Blanket ignores weaken the process.",
    "Accepted findings should be revisited over time."
  ]
};
