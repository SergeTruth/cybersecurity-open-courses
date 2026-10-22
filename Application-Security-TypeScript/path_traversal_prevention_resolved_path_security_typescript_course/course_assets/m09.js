window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-5d1ccb5219",
  "questions": {
    "q1": {
      "options": {
        "A": "path.join can process external strings; the issue is whether the resulting target is actually contained.",
        "B": "Joining and normalization construct a candidate path without proving that the authorized root contains its final target.",
        "C": "Asynchronous filesystem APIs can use joined paths, but they do not automatically authorize those paths.",
        "D": "The authorized storage root should be controlled explicitly and need not equal the process working directory."
      }
    },
    "q2": {
      "options": {
        "A": "Node does not universally remove every traversal representation before an application's checks run.",
        "B": "Parent-directory semantics matter across operating systems, though separator and root behavior differ by platform.",
        "C": "A literal parent-substring filter does not reject every absolute or otherwise escaping path representation.",
        "D": "Secure containment requires consistent decoding, platform-aware path interpretation, and checks of the candidate and actual filesystem target."
      }
    },
    "q3": {
      "options": {
        "A": "resolve produces a normalized absolute lexical path that still needs containment, filesystem, and authorization checks.",
        "B": "Constructing an absolute path does not establish whether the requester may access its represented object.",
        "C": "Lexical path resolution does not follow all links or prevent the filesystem from changing afterward.",
        "D": "An absolute later component can replace the earlier root, so containment cannot be inferred from the call alone."
      }
    },
    "q4": {
      "options": {
        "A": "String prefix comparison does not automatically decode URLs or interpret path components.",
        "B": "Strings can be compared, but character prefixes alone do not establish filesystem ancestry.",
        "C": "A sibling directory can share the root's character prefix without being inside its directory boundary.",
        "D": "Prefix comparison does not follow links or establish where the filesystem will resolve the path."
      }
    },
    "q5": {
      "options": {
        "A": "path.relative performs lexical path computation without opening the target or reading its permissions.",
        "B": "A relative representation exposes parent escapes, incompatible roots, and root equality for explicit policy handling.",
        "C": "Path operations follow platform semantics and do not universally normalize every filesystem into case-insensitive comparison.",
        "D": "Lexical containment does not establish the caller's ownership, tenant membership, or permission to perform an operation."
      }
    },
    "q6": {
      "options": {
        "A": "Opaque IDs let the server choose storage locations, while object and action permissions still govern access.",
        "B": "Replacing paths with IDs does not remove symbolic links or unsafe directory entries from storage.",
        "C": "The server may still need filesystem access after resolving an attachment's record and internal storage mapping.",
        "D": "Identifier unpredictability reduces guessing but does not authorize a caller who learns a valid attachment ID."
      }
    },
    "q7": {
      "options": {
        "A": "Server filesystem APIs interpret server-side paths rather than automatically applying the browser's operating system.",
        "B": "path.relative compares filesystem paths and does not rewrite their components as URL segments.",
        "C": "Root equality needs an explicit allow-or-reject rule but does not change the requested operation's type.",
        "D": "Filesystem links and reparse mechanisms can redirect a lexically contained candidate to an external target."
      }
    },
    "q8": {
      "options": {
        "A": "realpath generally requires an existing target and does not authorize a future upload destination.",
        "B": "realpath follows filesystem path resolution rather than validating URL encoding or query parameters.",
        "C": "Canonicalizing an existing target reveals linked destinations, but later changes can still create a check-use race.",
        "D": "Canonicalization does not replace object permissions, restrictive filesystem access, or operation-specific controls."
      }
    },
    "q9": {
      "options": {
        "A": "Keep the client name as untrusted metadata and choose a controlled server-generated storage identity and destination.",
        "B": "Removing spaces does not eliminate traversal, absolute paths, reserved names, collisions, or platform-specific filename behavior.",
        "C": "An allowed extension does not authorize a storage path or establish that the underlying file is safe.",
        "D": "Public web-root storage can bypass controlled retrieval and expose unprocessed or unauthorized uploaded content."
      }
    },
    "q10": {
      "options": {
        "A": "Filesystem permissions restrict accessible resources rather than rejecting every syntactically absolute input path.",
        "B": "Reduced permissions limit the damage possible when an application check, race defense, library, or access decision fails.",
        "C": "Least privilege does not remove symbolic links or make lexical and canonical representations universally identical.",
        "D": "Recursive operations and extraction still need explicit scope, path, link, and failure-handling review."
      }
    }
  }
};
