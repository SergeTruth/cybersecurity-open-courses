window.COURSE_MODULE = {
  "title": "Avoiding Check-Then-Use Mistakes",
  "graphicAlt": "A descriptor-first workflow validates and uses one opened object rather than repeating path lookup.",
  "narration": "A check-then-use mistake happens when code makes a decision about a path and later uses the same path as if the decision still describes the object. Filesystem state can change between the check and the operation, especially in directories that are shared or otherwise modifiable.\n\nDefensive design reduces the gap between decision and operation. Validate close to the operation, avoid unnecessary repeated path resolution, and prefer workflows where the program opens or creates the object safely and then validates the object it actually has.\n\nThis is not only about hostile input. Ordinary maintenance can create the same risk: a cleanup job runs at the same time, a deployment rotates directories, another component replaces a file, or a test changes the working tree. If the program relies on stale path assumptions, it becomes fragile.\n\nThe review question is whether the validated thing is the same thing the program later uses. If validation looks at one path resolution and the operation relies on a later path resolution, reviewers should ask whether a descriptor-first or directory-relative workflow would make the contract clearer.",
  "narrationPoints": [
    "Filesystem state can change between the check and the operation, especially in directories that are shared or otherwise modifiable.",
    "Validate close to the operation, avoid unnecessary repeated path resolution, and prefer workflows where the program opens or creates the object safely and then validates the object it actually has.",
    "Ordinary maintenance can create the same risk: a cleanup job runs at the same time, a deployment rotates directories, another component replaces a file, or a test changes the working tree.",
    "The review question is whether the validated thing is the same thing the program later uses.",
    "If validation looks at one path resolution and the operation relies on a later path resolution, reviewers should ask whether a descriptor-first or directory-relative workflow would make the contract clearer."
  ]
};
