window.COURSE_MODULE = {
  "title": "File System and Timeline Analysis",
  "graphicAlt": "Blank placeholder graphic for Linux filesystem and timeline analysis",
  "narration": "File system analysis helps analysts understand what changed on disk and when. File metadata can include ownership, permissions, size, paths, and timestamps. Linux files commonly have modified, accessed, and changed times, often called MAC times. Modified time usually reflects content changes. Accessed time may reflect reads, though mount options can reduce its reliability. Changed time reflects metadata changes such as permissions or ownership.\n\nPermissions and ownership can reveal whether files are accessible to unexpected users or groups. Hidden files, dot directories, recently modified files, unusual executable permissions, files in temporary locations, and files outside package-managed paths can all be worth review. None of these signals is conclusive alone. They are leads that need context.\n\nDeleted file considerations depend on collection method, filesystem, system activity, and timing. Sometimes full disk images or snapshots preserve more context than a live targeted collection. In other cases, operational urgency or cloud architecture may limit what can be collected. The analyst should document the collection method and explain how it affects confidence and limitations.\n\nTimelines become powerful when filesystem metadata is combined with logs and other evidence. A service file change, followed by an authentication event, followed by a process start, followed by network connections, tells a stronger story than any single event. Good timelines separate observed facts from interpretation and identify gaps, uncertainty, time zone issues, and possible clock differences.",
  "narrationPoints": [
    "File system analysis helps analysts understand what changed on disk and when.",
    "Permissions and ownership can reveal whether files are accessible to unexpected users or groups.",
    "Deleted file considerations depend on collection method, filesystem, system activity, and timing.",
    "Timelines become powerful when filesystem metadata is combined with logs and other evidence.",
    "The example exporter is specifically a modification-time timeline, not a complete MACB timeline; preserve that limitation when correlating its records.",
    "Use escaped machine-readable paths, integer nanosecond timestamps, numeric ownership, explicit incident windows, and documented timezone and clock assumptions.",
    "Record device IDs and mount topology, report every pruned cross-device directory, and never silently discard a regular file solely because its device differs."
  ]
};
