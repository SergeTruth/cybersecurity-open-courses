window.COURSE_MODULE = {
  "title": "Files, Network Messages, and Storage Boundaries",
  "graphicAlt": "Files, network messages and stored records require distinct boundary checks before common serialized-content validation.",
  "narration": "The boundary around serialized data changes the risk. A file parser must handle missing files, truncated files, stale versions, partial writes, path assumptions, and metadata confusion. File names, extensions, directory locations, and timestamps can provide context, but they are not a substitute for validating the serialized content itself.\n\nA network parser has different concerns. It must handle framing, partial I/O, timeouts, retransmission, oversized messages, peers that disconnect, and messages that arrive out of order for the application protocol. The parser should know when a complete message has arrived before it attempts to interpret fields or make state changes.\n\nStorage boundaries also matter. Database records, cache entries, queue messages, and telemetry blobs may be old, partially migrated, or created by a previous version of the system. A cache hit should not automatically mean the data is current and safe. Compatibility rules and validation still apply when data comes from infrastructure the application usually trusts.\n\nLogs and telemetry may contain sensitive serialized fields that require redaction or minimization. Boundary assumptions should be documented: what data is covered by validation, what is covered by integrity checks, what is encrypted, and which compatibility rules apply. Clear boundaries make audits and incident response much easier.\n\nThe same serialized format may appear in more than one boundary over time. A file format may later be sent over a network, or a cache entry may become a queue message. Review assumptions whenever the boundary changes.",
  "narrationPoints": [
    "A file parser must handle missing files, truncated files, stale versions, partial writes, path assumptions, and metadata confusion.",
    "The parser should know when a complete message has arrived before it attempts to interpret fields or make state changes.",
    "A cache hit should not automatically mean the data is current and safe.",
    "Boundary assumptions should be documented: what data is covered by validation, what is covered by integrity checks, what is encrypted, and which compatibility rules apply.",
    "The same serialized format may appear in more than one boundary over time.",
    "A file format may later be sent over a network, or a cache entry may become a queue message."
  ]
};
