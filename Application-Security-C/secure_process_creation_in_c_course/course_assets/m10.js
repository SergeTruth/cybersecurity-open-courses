window.COURSE_MODULE = {
  "title": "Course Summary: Launch Intentionally",
  "graphicAlt": "Intentional launching joins program selection, arguments, context, authority and lifecycle management.",
  "narration": "The main lesson of this course is to launch intentionally. Process creation is a boundary where program selection, arguments, environment, descriptors, privileges, resource limits, and lifecycle decisions all come together. Hidden assumptions in any of those areas can make the launcher fragile.\n\nUse direct review questions. Which program is being launched? Is the program path explicit and trusted? Are arguments passed as structured values? Is shell interpretation avoided unless specifically justified? What environment and working directory are inherited?\n\nThen review inherited resources and execution context. Which descriptors or handles are inherited? What identity does the child use? What resource limits apply? What happens if startup fails, the child exits unsuccessfully, output is incomplete, or the process exceeds its timeout?\n\nFinally, make the behavior repeatable. Test argument construction, path resolution, environment handling, permissions, timeouts, cleanup, and error reporting. A secure process launcher is not one magic API call; it is a maintainable contract for what runs, with what context, and under what limits.",
  "narrationPoints": [
    "Process creation is a boundary where program selection, arguments, environment, descriptors, privileges, resource limits, and lifecycle decisions all come together.",
    "What happens if startup fails, the child exits unsuccessfully, output is incomplete, or the process exceeds its timeout?",
    "What identity does the child use?",
    "A secure process launcher is not one magic API call; it is a maintainable contract for what runs, with what context, and under what limits.",
    "What environment and working directory are inherited?"
  ]
};
