window.COURSE_MODULE = {
  "title": "Integrity, Authenticity, Versioning, and Compatibility",
  "graphicAlt": "Control-flow diagram for Integrity, Authenticity, Versioning, and Compatibility, showing untrusted bytes, bounded parser, schema validator, typed data, and rejected object-construction path; labeled arrows identify parse, validation, and trust transitions and the point where unsafe input or behavior is rejected.",
  "narration": "Integrity protection helps determine whether serialized data changed unexpectedly or was tampered with. Authenticity helps determine whether it came from an expected source. At a high level, message authentication and digital signature concepts can provide evidence about source and modification. These controls are valuable, especially for messages, configuration, packages, and stored data that cross systems.\n\nIntegrity and authenticity do not replace validation, authorization, or safe parsing. Authentic data can still be malformed, stale, oversized, incompatible with the current schema, unauthorized for this operation, or unsafe for a powerful deserializer. Verification should happen before trust is increased, but verified data still needs normal security checks before use.\n\nVersioning is essential because serialized formats change over time. Producers and consumers may not update at the same moment. Fields may be added, renamed, removed, or interpreted differently. Schema versioning, migration logic, backward compatibility, and forward compatibility rules help systems evolve without silent confusion. Unknown fields and missing fields should be handled according to an intentional compatibility policy.\n\nReplay and freshness concerns also matter. A message may be valid and authentic, but too old for the current decision. Timestamps, sequence concepts, expiry windows, and storage freshness checks can help depending on the system. The key principle is that serialized data should be evaluated in operational context, not just parsed in isolation.",
  "narrationPoints": [
    "Integrity protection helps determine whether serialized data changed unexpectedly or was tampered with.",
    "Integrity and authenticity do not replace validation, authorization, or safe parsing.",
    "Versioning is essential because serialized formats change over time.",
    "Fields may be added, renamed, removed, or interpreted differently.",
    "A message may be valid and authentic, but too old for the current decision.",
    "Replay and freshness concerns also matter."
  ]
};
