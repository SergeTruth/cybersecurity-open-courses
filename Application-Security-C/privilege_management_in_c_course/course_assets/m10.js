window.COURSE_MODULE = {
  "title": "Course Summary: Make Privilege Explicit",
  "graphicAlt": "Three main stages: document current authority, constrain operations/inherited state, verify reductions and failures. Foundation is focused review/testing, redacted outcome logs support feedback loop.",
  "narration": "The main takeaway from this course is to make privilege explicit. A secure C program should not depend on hidden assumptions about who launched it, what directory it started in, which files it can access, which environment values it inherited, or whether a privilege change probably worked. Those facts should be designed, checked, and reviewed.\n\nAsk practical questions early. What privilege does this code have? Why does it need that privilege? Can the privileged section be smaller? What state comes from the environment? What files, descriptors, or handles are accessible? Which child processes are created, and what do they inherit? These questions turn authority from an accident into an engineering contract.\n\nThen ask what changes over time. When are privileges reduced? Are return values checked? Is the resulting state verified? What happens on failure? Does cleanup use trusted paths and predictable ownership? Are logs useful without exposing secrets or operational detail that does not belong there?\n\nFinally, validate the design repeatedly. Use code review, focused tests, platform diagnostics, static analysis, compiler warnings, sanitizers, and operational logging. None of those controls is sufficient alone, but together they help teams build privileged C software that is understandable, maintainable, and safer to operate.",
  "narrationPoints": [
    "A secure C program should not depend on hidden assumptions about who launched it, what directory it started in.",
    "The main takeaway from this course is to make privilege explicit.",
    "Which child processes are created, and what do they inherit.",
    "Does cleanup use trusted paths and predictable ownership.",
    "None of those controls is sufficient alone, but together they help teams build privileged C software that is understandable, maintainable."
  ]
};
