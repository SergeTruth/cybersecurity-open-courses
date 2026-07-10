window.COURSE_MODULE = {
  "title": "Testing and Secure Development",
  "graphicAlt": "Blank placeholder graphic for module 8, Testing and Secure Development.",
  "narration": "Secure development starts with requirements and design, not just testing at the end. Threat modeling helps teams reason about what can go wrong before implementation choices become expensive to change. Abuse-case thinking asks how a feature could be misused: can a user skip a step, change an object ID, upload an unexpected file, replay a request, or trigger a workflow out of order? These questions turn security into concrete engineering constraints.\n\nDifferent testing techniques reveal different issues. Secure code review can find logic flaws, missing authorization checks, unsafe API usage, and weak assumptions. SAST reviews source or compiled code without running the application and can scale across repositories. DAST tests a running application from the outside and can reveal behavior that only appears in deployment. Dependency scanning looks for vulnerable components. Manual testing ties findings back to business logic, roles, and context. None of these techniques replaces the others.\n\nFixing root causes matters more than treating symptoms. If many endpoints miss authorization checks, the durable fix may be a shared policy pattern and tests, not one patched route. If input validation differs across controllers, the better answer may be a common validation layer. If dependency updates repeatedly break builds, the process may need ownership and upgrade windows. Mature teams document security requirements, add regression tests for fixed issues, monitor production behavior, and feed lessons learned back into design and development.",
  "narrationPoints": [
    "Secure development starts with requirements and design, not just testing at the end.",
    "Different testing techniques reveal different issues.",
    "Fixing root causes matters more than treating symptoms."
  ]
};
