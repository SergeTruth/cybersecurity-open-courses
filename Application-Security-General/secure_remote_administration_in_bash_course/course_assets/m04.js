window.COURSE_MODULE = {
  "title": "Host Trust, Connectivity, and Target Selection",
  "graphicAlt": "An approved inventory selects the target, and managed host verification confirms its identity before administration.",
  "narration": "Remote administration depends on connecting to the right system. Host verification helps confirm server identity, and known-hosts management gives automation a way to detect unexpected changes. Bypassing trust checks may make a script easier to run, but it weakens a boundary the workflow depends on.\n\nTarget selection should be deliberate. A script may accept hostnames, inventory groups, environment names, regions, labels, or patterns. A typo, broad match, stale inventory, or unexpected expansion can turn a small maintenance task into a much larger action.\n\nApproved inventories and allowlists make target scope reviewable. Instead of letting free-form input decide destinations, a script can map validated labels to known systems or groups. This also makes it easier to separate development, staging, and production targets.\n\nHigh-impact work should report intended target scope before action. Operators need a chance to see which hosts are included, which environment is selected, and whether the action matches the planned change. For unattended workflows, logs should capture the same high-level target evidence.\n\nBastions and jump hosts can centralize remote access and monitoring. They also become critical controls. Their access rules, logs, keys, and forwarding behavior should be reviewed because many administrative workflows may depend on them.\n\nConnectivity checks should not bypass trust. A script can test reachability, host identity, and authorization in a controlled way without weakening verification or silently falling back to a less trusted path.",
  "narrationPoints": [
    "Remote administration depends on connecting to the right system.",
    "A script may accept hostnames, inventory groups, environment names, regions, labels, or patterns.",
    "Approved inventories and allowlists make target scope reviewable.",
    "High-impact work should report intended target scope before action.",
    "Bastions and jump hosts can centralize remote access and monitoring.",
    "A script can test reachability, host identity, and authorization in a controlled way without weakening verification or silently falling back to a less trusted path."
  ]
};
