window.COURSE_MODULE = {
  "title": "Why Secure Remote Administration Matters",
  "graphicAlt": "Approved targets, scoped identity, known actions and recorded outcomes define a controlled remote administration workflow.",
  "narration": "Bash is often used as operational glue for remote administration. A script can connect to hosts, collect diagnostics, transfer files, restart services, update configuration, run maintenance tasks, trigger deployment steps, or verify system state. Those actions may be routine, but they can still affect production systems and business operations.\n\nRemote administration is high impact because the script is acting beyond the local machine. A wrong target, overpowered identity, unverified host, unsafe remote command, broad cleanup step, or silent failure can change real services, files, configuration, or deployment state.\n\nSecure remote administration is not about avoiding Bash. It is about making remote actions authorized, intentional, scoped, observable, and reviewable. A reviewer should be able to see what systems are in scope, which identity is used, what action is allowed, and what evidence will show the result.\n\nThe safest designs treat remote administration as a controlled workflow rather than a loose collection of commands. Authorization boundaries, host verification, target validation, least privilege, failure handling, and logging are part of the script design from the beginning.\n\nThroughout this course, the focus is defensive and practical. We will look at administrative scope, identities, host trust, remote command boundaries, file transfer and remote state, multi-host execution, logging, monitoring, and review practices that make Bash-based administration safer to operate.",
  "narrationPoints": [
    "Bash is often used as operational glue for remote administration.",
    "Remote administration is high impact because the script is acting beyond the local machine.",
    "Secure remote administration is not about avoiding Bash.",
    "The safest designs treat remote administration as a controlled workflow rather than a loose collection of commands.",
    "Throughout this course, the focus is defensive and practical.",
    "A script can connect to hosts, collect diagnostics, transfer files, restart services, update configuration, run maintenance tasks, trigger deployment steps, or verify system state."
  ]
};
