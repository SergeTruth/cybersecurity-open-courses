window.COURSE_MODULE = {
  "title": "Child Processes and Signal-Driven Events",
  "graphicAlt": "Child notifications wake normal code to collect status and clean associated resources.",
  "narration": "Programs that create child processes must also manage child lifecycle. On POSIX-style systems, child status notifications can inform the parent that a child has changed state. That notification is useful, but it should not turn the signal handler into a full process-management routine.\n\nA defensive design keeps child notification handling light. The handler can request that normal code check child status, or it can notify an event loop through a safe mechanism. Mainline code can then perform waits, update internal state, restart planned work if appropriate, release resources, and write logs using ordinary program logic.\n\nAvoiding unreaped child processes is a maintainability and operations concern. A parent that starts children should have a clear plan for tracking them, observing completion, handling errors, and cleaning up associated resources. This plan should work during normal operation and during shutdown.\n\nCoordination with event loops, worker pools, or supervisors should be explicit. Reviewers should ask where children are created, where status is collected, what happens during shutdown, and how timeouts or failed starts are reported. Predictable lifecycle management reduces surprises without putting unsafe work in the handler.",
  "narrationPoints": [
    "Programs that create child processes must also manage child lifecycle.",
    "The handler can request that normal code check child status, or it can notify an event loop through a safe mechanism.",
    "Avoiding unreaped child processes is a maintainability and operations concern.",
    "Reviewers should ask where children are created, where status is collected, what happens during shutdown, and how timeouts or failed starts are reported.",
    "Coordination with event loops, worker pools, or supervisors should be explicit."
  ]
};
