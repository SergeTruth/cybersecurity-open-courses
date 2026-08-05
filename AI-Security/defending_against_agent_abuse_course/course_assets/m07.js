window.COURSE_MODULE = {
  "title": "Testing and Continuous Validation",
  "narration": "Agent behavior should be tested before deployment and reevaluated after release. Models, prompts, tools, data sources, permissions, dependencies, and user workflows can change over time. Continuous validation helps teams identify configuration drift, unexpected behavior, weakening controls, and new risk conditions before those changes create an incident.\n\nTesting should cover instruction handling, permission boundaries, tool argument validation, data exposure, memory behavior, approval workflows, logging, failure modes, and safe shutdown. Teams should test both allowed and denied actions. A useful security result is not only that the agent completed a normal task, but that surrounding controls stopped an action that policy did not permit.\n\nDifferent test layers provide different evidence. Unit tests can verify policy and validation code. Integration tests can exercise tools and identity boundaries. Scenario tests can evaluate complete workflows with realistic but controlled data. Production monitoring and carefully governed evaluations can reveal drift that predeployment tests did not predict. Testing should remain authorized, defensive, and safely scoped.\n\nChanges should trigger appropriate retesting. Adding a tool, broadening a data source, changing a model, modifying an approval path, or expanding the user population can alter the threat model. Results should be recorded, reviewed by accountable owners, and connected to release decisions. Validation does not replace monitoring; the two capabilities reinforce each other.",
  "narrationPoints": [
    "Agent behavior should be tested before deployment and reevaluated after release.",
    "Testing should cover instruction handling, permission boundaries, tool argument validation, data exposure, memory behavior, approval workflows, logging, failure modes, and safe shutdown.",
    "Different test layers provide different evidence.",
    "Changes should trigger appropriate retesting."
  ],
  "graphicAlt": "Blank white placeholder image for the testing and continuous validation module."
};
