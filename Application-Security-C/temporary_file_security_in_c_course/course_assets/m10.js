window.COURSE_MODULE = {
  "title": "Course Summary: Treat Temporary Files as Owned Resources",
  "graphicAlt": "Trusted creation, restricted access, validated operations and defined cleanup are maintained through tests and review.",
  "narration": "The main lesson of this course is to treat temporary files as owned resources. Every temporary file should have a known purpose, a trusted location, a safe creation method, an owner, a permission model, a data-sensitivity decision, a lifetime, a cleanup path, and a validation strategy.\n\nUse practical review questions. Why does this temporary file exist? Where is it created? Is the directory trusted? Is creation atomic and unique? Who can read or write it? Does it contain sensitive data? When and how is it cleaned up?\n\nFailure behavior matters as much as the success path. What happens during partial writes, validation failure, retry, abnormal termination, or finalization errors? Does the program leave behind incomplete files, exposed content, or ambiguous state? Those questions should be answered before the code ships.\n\nFinally, validate the design with tests, tools, and review. Temporary-file security is not solved by one function or one directory. It comes from explicit contracts, platform-aware behavior, restrictive access, predictable cleanup, and maintenance habits that keep temporary resources under control.",
  "narrationPoints": [
    "Every temporary file should have a known purpose, a trusted location, a safe creation method, an owner, a permission model, a data-sensitivity decision, a lifetime, a cleanup path, and a validation strategy.",
    "The main lesson of this course is to treat temporary files as owned resources.",
    "What happens during partial writes, validation failure, retry, abnormal termination, or finalization errors?",
    "Failure behavior matters as much as the success path.",
    "Finally, validate the design with tests, tools, and review."
  ]
};
