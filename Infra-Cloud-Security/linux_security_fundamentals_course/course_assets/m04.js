window.COURSE_MODULE = {
  "title": "Services, Processes, and Open Ports",
  "graphicAlt": "Conceptual visual of Linux services, processes, daemons, and exposed ports being reviewed.",
  "narration": "Linux systems run processes to perform work. Some processes are temporary, such as a command a user starts and then closes. Others are long-running services, often called daemons, that support login, scheduling, logging, networking, databases, web applications, monitoring, backups, or business applications. Services are normal, but every service deserves a reason to exist.\n\nSome services listen on network ports and accept connections. That exposure may be required, as with a web service on a web server or SSH on an administration path. But unnecessary listening services create management burden and potential risk. The issue is not only whether a port is open. Administrators should know what software owns the port, why it is reachable, which users or systems need it, how it is updated, and who is responsible for it.\n\nProcesses and services also include scheduled jobs, local agents, monitoring components, backup tools, and application workers. A defensive review asks what is running, whether it should start automatically, whether it runs with appropriate privilege, where it writes logs, and what would happen if it stopped. Unknown services are not automatically malicious, but they are operational unknowns that need ownership and documentation.\n\nChanges should be careful. Disabling a service without understanding dependencies can break applications, monitoring, remote access, or backups. A safer approach is to inventory services, confirm purpose with the owner, test in a non-production environment when possible, plan a change window for important systems, and keep a rollback path. Reducing exposure is valuable, but it should be done deliberately.",
  "narrationPoints": [
    "Services and processes perform system work.",
    "Listening services can expose network access.",
    "Unnecessary services increase risk and maintenance.",
    "Each service should have an owner and purpose.",
    "Service changes should be tested and reversible."
  ]
};
