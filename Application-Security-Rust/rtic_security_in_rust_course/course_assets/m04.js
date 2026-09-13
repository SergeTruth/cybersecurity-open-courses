window.COURSE_MODULE = {
  "title": "Shared Resources, Locks, and Critical Sections",
  "graphicAlt": "Only the shared-state update occurs inside exclusive access; preparation, logging, and slow I/O stay outside.",
  "narration": "RTIC helps structure access to shared resources, but shared state still deserves careful security and reliability review. A shared resource should exist for a clear reason. If many tasks need access, reviewers should understand why the state is shared and whether a narrower ownership model would be clearer.\n\nLock scope should be narrow. Exclusive access should protect the smallest operation that truly needs protection. If a critical section grows to include parsing, formatting, logging, communication, storage access, or slow peripheral activity, the code may be mixing data protection with unrelated work.\n\nSynchronization choices affect timing behavior, not only data correctness. A lock that is technically correct can still delay important work, create unexpected latency, or make degraded conditions harder to analyze. Priority and resource access should be reviewed together so timing impact is visible.\n\nDefensive firmware avoids hidden shared mutation and broad global state. It keeps shared resources close to the tasks that need them, documents why sharing is necessary, and limits the amount of work performed while exclusive access is held.\n\nReviewers should ask what invariant the resource protects, which tasks can access it, how long access lasts, whether slow operations occur inside the protected section, and what happens when a task is interrupted, delayed, or unable to complete its normal path.",
  "narrationPoints": [
    "RTIC helps structure access to shared resources.",
    "Lock scope should be narrow.",
    "Synchronization choices affect timing behavior.",
    "Defensive firmware avoids hidden shared mutation and broad.",
    "Reviewers should ask what invariant the resource protects.",
    "A shared resource should exist for a clear reason."
  ]
};
