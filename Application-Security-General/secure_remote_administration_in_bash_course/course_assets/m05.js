window.COURSE_MODULE = {
  "title": "Safe Remote Command Execution",
  "graphicAlt": "Validated operands reach a fixed remote action across the host boundary, and its result returns for explicit checking.",
  "narration": "Remote command execution has extra complexity because there may be local Bash interpretation and remote environment interpretation. A value can be processed locally before the remote side receives it, and then interpreted again according to the remote command or shell behavior.\n\nSecure scripts avoid arbitrary remote command text. A safer design uses fixed remote actions, controlled scripts, validated operands, and clear argument boundaries. The remote side should expose known behavior when possible, rather than accepting open-ended instructions from a local wrapper.\n\nValues that affect remote commands should be validated before use. Host labels, service names, file paths, modes, and environment names should have supported shapes and meanings. Quoting and structured argument handling help preserve accepted values as data rather than accidental syntax.\n\nThe script should check connection results and remote command results before continuing. A connection failure, host trust failure, authentication failure, remote command failure, timeout, or unexpected output should not be reported as success simply because the local script reached the next line.\n\nTimeouts and retry limits matter for unattended remote administration. A hung remote command can block a maintenance window. Repeated retries can amplify a problem. Clear failure messages help operators distinguish connectivity, authorization, and remote execution issues.\n\nThe goal is a remote action that can be reviewed and trusted. Known remote behaviors with validated inputs are easier to operate than a general-purpose remote shell hidden inside a Bash automation script.",
  "narrationPoints": [
    "Remote command execution has extra complexity because there may be local Bash interpretation and remote environment interpretation.",
    "A safer design uses fixed remote actions, controlled scripts, validated operands, and clear argument boundaries.",
    "Values that affect remote commands should be validated before use.",
    "The script should check connection results and remote command results before continuing.",
    "Timeouts and retry limits matter for unattended remote administration.",
    "The goal is a remote action that can be reviewed and trusted."
  ]
};
