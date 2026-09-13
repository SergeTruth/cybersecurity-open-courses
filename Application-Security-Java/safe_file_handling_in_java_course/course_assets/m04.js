window.COURSE_MODULE = {
  "title": "Path Traversal Prevention and Storage Boundaries",
  "graphicAlt": "Separate storage-boundary and object-authorization gates stop paths outside the root and files belonging to another tenant.",
  "narration": "The core defensive idea is simple: the application chooses the storage root and the business object; user input must not be allowed to redirect the operation somewhere else. Treat user-controlled path segments as untrusted input. Avoid passing user-supplied paths directly to Java filesystem APIs. When dynamic selection is required, prefer application-controlled IDs mapped to metadata records over raw path input.\n\nWhen filesystem paths must be constructed, start from a fixed, application-controlled base directory. Resolve the candidate against that base and verify the final result remains inside the intended boundary before reading, writing, deleting, moving, or serving the file. Reject absolute paths, parent-directory movement, unexpected separators, empty names, reserved names, unsupported characters, and platform-specific surprises where appropriate. Keep the accepted input format narrow enough that reviewers can reason about it.\n\nBe careful with transformations that happen before the path check. URL decoding, repeated decoding, Unicode normalization, mixed separators, case handling, symbolic links, archive entries, and mounted volumes can change how a path behaves. Object storage keys have similar boundary problems even though they are not local filesystem paths. Prefixes, tenant IDs, object names, and generated keys should be controlled and validated before they influence storage behavior.\n\nPath-boundary checks must be paired with object-level authorization. A resolved path can be inside the correct base directory and still point to another user's report or another tenant's attachment. A storage key can be in the right bucket and still represent the wrong business object. Preventing traversal keeps the operation inside the storage area; authorization decides whether this caller may access this object.",
  "narrationPoints": [
    "The core defensive idea is simple: the application chooses.",
    "When filesystem paths must be constructed.",
    "Be careful with transformations that happen.",
    "Path-boundary checks must be paired with object-level.",
    "Avoid passing user-supplied paths directly to Java.",
    "Prefixes, tenant IDs, object names, and generated keys."
  ]
};
