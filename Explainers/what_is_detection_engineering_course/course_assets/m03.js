window.COURSE_MODULE = {
  "title": "The Detection Engineering Lifecycle",
  "graphicAlt": "Detection lifecycle showing proposal, design, test, deploy, tune, measure, review, and retire stages.",
  "narration": "Modern detection engineering treats detections as living assets. A detection is proposed, designed, tested, deployed, documented, measured, tuned, reviewed, and eventually retired when it no longer provides enough value.\n\nThe lifecycle begins with a reason for the detection. That reason may come from threat intelligence, a prior incident, a hunting hypothesis, a control requirement, a purple team exercise, or a known visibility gap.\n\nDesign work connects the reason to observable behavior and available telemetry. Engineers decide what fields are needed, how the logic should work, what context should be included, and how analysts should interpret the result.\n\nTesting and deployment help prevent avoidable mistakes. Teams validate that a detection fires when expected, avoids obvious noise where possible, and presents useful information to the people who will use it.\n\nMaintenance is the part that separates a durable program from a collection of old alerts. Environments change, log schemas change, business processes change, and threat patterns change. Mature teams review detections as part of normal operations.\n\nLifecycle management also clarifies ownership. Someone should know why a detection exists, which data it depends on, how it was validated, what response guidance applies, and when it should be reviewed again.\n\nRetirement is part of the lifecycle too. If a detection no longer maps to relevant systems, creates recurring noise, or depends on unavailable data, retiring or redesigning it may be healthier than keeping it for appearance.\n\nA healthy lifecycle creates evidence as well as alerts. Design notes, test results, review decisions, and tuning history help teams understand how the detection changed and why those changes were made.",
  "narrationPoints": [
    "Modern detection engineering treats detections as living assets.",
    "The lifecycle begins with a reason for the detection.",
    "Design work connects the reason to observable behavior and available telemetry.",
    "Testing and deployment help prevent avoidable mistakes.",
    "Maintenance is the part that separates a durable program from a collection of old alerts."
  ]
};
