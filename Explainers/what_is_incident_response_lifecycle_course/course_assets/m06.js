window.COURSE_MODULE = {
  "title": "Eradicate: Removing the Cause",
  "graphicAlt": "Conceptual visual of eradication removing root cause across systems, accounts, configurations, and process gaps.",
  "narration": "Eradication focuses on removing the cause of the incident, not just quieting the visible symptom. If containment is about limiting harm now, eradication is about preventing the same issue from continuing or returning. The root cause might be a vulnerable system, an unsafe configuration, an exposed credential, unauthorized access, a malicious artifact, a weak process, or a gap in ownership. The right fix depends on the analysis. Sometimes eradication means patching and validating a system. Sometimes it means rebuilding a host, removing unauthorized access, correcting cloud permissions, disabling an unsafe setting, or changing a process that allowed the problem to happen. This work should be authorized and tracked because eradication often touches production systems. Verification matters: the team should confirm that the cause was addressed and that the environment no longer shows the same behavior. Incomplete eradication creates recurrence risk. A clean-looking dashboard is not enough if the underlying path remains open. Good eradication produces evidence of the fix, the validation performed, and any residual risk that still needs ownership. Eradication also depends on knowing when a visible symptom is only a symptom. Resetting one account may not be enough if the access path remains open. Removing one artifact may not be enough if the vulnerable configuration remains. The response team should look for the condition that allowed the incident to happen or continue.",
  "narrationPoints": [
    "Eradication removes the active cause of the incident.",
    "Root cause matters, not just visible symptoms.",
    "Fixes may involve systems, accounts, configurations, or process gaps.",
    "Eradication should be verified.",
    "Incomplete eradication can lead to recurrence."
  ]
};
