window.COURSE_MODULE = {
  "title": "File System and Timeline Analysis",
  "graphicAlt": "Blank placeholder graphic for Windows file system and timeline analysis",
  "narration": "File system analysis helps analysts understand when files were created, modified, accessed, moved, or deleted. NTFS, at a high level, stores metadata that can support timeline reconstruction. Timestamps are useful, but they require caution. Different actions update different timestamps, and tools, synchronization software, system processes, and investigator activity can all affect them.\n\nExecution traces can provide clues about programs that ran. Prefetch, when enabled, is commonly associated with program execution traces. Amcache and Shimcache, at a high level, may provide information related to program presence or execution-related activity depending on the system and interpretation. These artifacts can be valuable, but they should not be treated as perfect proof in isolation.\n\nLink files, jump lists, recent file artifacts, and recycle bin records can help reconstruct user and file interaction. They may show file paths, access patterns, timestamps, volume information, or references to removable media and network locations. Deleted file considerations depend on collection method, disk activity, system settings, and whether the evidence was preserved quickly enough.\n\nTimelines bring these pieces together. A useful Windows timeline may combine event logs, registry timestamps, file metadata, Prefetch, Amcache, Shimcache, link files, browser history, EDR telemetry, and application logs. The analyst should separate observed facts from interpretation, note time zone issues, and identify gaps. The goal is a clear sequence that can withstand review.",
  "narrationPoints": [
    "File system analysis helps analysts understand when files were created, modified, accessed, moved, or deleted.",
    "Execution traces can provide clues about programs that ran.",
    "Link files, jump lists, recent file artifacts, and recycle bin records can help reconstruct user and file interaction.",
    "Timelines bring these pieces together.",
    "The mounted-filesystem inventory streams rows incrementally, while every offline source is first bound to the run's recorded root, volume, and disk."
  ]
};
