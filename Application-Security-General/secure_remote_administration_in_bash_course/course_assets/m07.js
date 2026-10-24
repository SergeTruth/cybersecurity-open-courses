window.COURSE_MODULE = {
  "title": "Multi-Host Automation and Concurrency",
  "graphicAlt": "A confirmed target set progresses through a canary and bounded batches, with separate success, skip and failure results.",
  "narration": "Multi-host administration increases both usefulness and blast radius. A script may run the same action across a host group, region, environment, or inventory file. That can save time, but it can also spread a mistake quickly.\n\nThe script should confirm the target set before execution. Operators should know which hosts are included, which are excluded, and why. For unattended jobs, logs should record the selected scope in a safe high-level way.\n\nConcurrency controls matter. Running too many remote actions at once can overload services, exhaust connections, hide failures in noisy output, or make rollback harder. Rate limits and batches help maintain control and make results easier to inspect.\n\nPartial failure handling should be explicit. Some hosts may be unreachable, already updated, missing prerequisites, or in a different state. The script should distinguish full success, partial success, expected skips, and failures that require operator attention.\n\nIdempotent and rerunnable behavior reduces recovery stress. A well-designed remote action can be safely repeated or resumed without compounding the problem. Where high-impact changes are involved, staged rollout or canary-style execution helps detect issues before every target is affected.\n\nThe goal is controlled progress, not maximum speed. Remote administration should prioritize safe scope, understandable results, and recovery paths over the fastest possible fan-out.",
  "narrationPoints": [
    "Multi-host administration increases both usefulness and blast radius.",
    "The script should confirm the target set before execution.",
    "Running too many remote actions at once can overload services, exhaust connections, hide failures in noisy output, or make rollback harder.",
    "Some hosts may be unreachable, already updated, missing prerequisites, or in a different state.",
    "A well-designed remote action can be safely repeated or resumed without compounding the problem.",
    "The goal is controlled progress, not maximum speed."
  ]
};
