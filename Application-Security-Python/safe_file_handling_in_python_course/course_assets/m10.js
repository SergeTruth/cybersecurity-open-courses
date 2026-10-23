window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-60f35b9257",
  "questions": {
    "q01": {
      "options": {
        "A": "Lowercasing names does not address content, permissions, or access.",
        "B": "File safety covers the entire lifecycle from receipt through deletion.",
        "C": "Working directory storage does not establish appropriate access boundaries.",
        "D": "Name normalization alone cannot secure storage, processing, or serving."
      }
    },
    "q02": {
      "options": {
        "A": "Multipart filenames are client input rather than authenticated security assertions.",
        "B": "Filenames can influence storage paths when applications trust them.",
        "C": "User controlled names can have unsafe meanings in different contexts.",
        "D": "Multipart transport preserves text without proving its trustworthiness or safety."
      }
    },
    "q03": {
      "options": {
        "A": "Caller selected roots undermine the intended trusted storage boundary.",
        "B": "Application controlled roots constrain the intended locations of file operations.",
        "C": "A fallback directory does not define a secure storage boundary.",
        "D": "Uploaders must not choose unrestricted trusted filesystem storage roots."
      }
    },
    "q04": {
      "options": {
        "A": "Ordinary file opening does not verify extensions against content bytes.",
        "B": "Extensions do not determine the caller's object access permissions.",
        "C": "Attackers can rename files without changing their actual contents.",
        "D": "Filesystems generally do not guarantee extension and content agreement."
      }
    },
    "q05": {
      "options": {
        "A": "Opaque server names separate physical storage from untrusted display metadata.",
        "B": "Removing slashes alone misses other unsafe names and path behavior.",
        "C": "Client timestamps are predictable and do not guarantee safe uniqueness.",
        "D": "Separator removal alone cannot establish safe storage names universally."
      }
    },
    "q06": {
      "options": {
        "A": "Executable directories do not automatically sanitize uploaded file contents.",
        "B": "Isolated nonexecutable storage prevents uploads becoming executable application modules.",
        "C": "Directory placement does not automatically make uploads safely read-only.",
        "D": "Executable application directories can turn uploaded content into code."
      }
    },
    "q07": {
      "options": {
        "A": "Restrict each workload to its required filesystem operations only.",
        "B": "Administrator privileges expand the damage possible after application compromise.",
        "C": "Different directories may require different read and write permissions.",
        "D": "Broad privileges increase exposure rather than safely resolving access failures."
      }
    },
    "q08": {
      "options": {
        "A": "Temporary storage does not universally guarantee privacy or unpredictable names.",
        "B": "Short lifetimes do not prevent disclosure of sensitive file contents.",
        "C": "Temporary contents remain sensitive throughout creation, use, and cleanup.",
        "D": "Temporary files can persist or be accessed by unintended principals."
      }
    },
    "q09": {
      "options": {
        "A": "Separate existence checks introduce races with other filesystem actors.",
        "B": "Public storage can expose contents before cleanup ever occurs.",
        "C": "Use secure creation APIs with restrictive permissions and reliable cleanup.",
        "D": "Existence checks cannot prevent another actor creating that name first."
      }
    },
    "q10": {
      "options": {
        "A": "Writing data to disk does not establish its trustworthiness.",
        "B": "Nonexecutable formats can still exploit parsers or exhaust resources.",
        "C": "Successful storage does not validate contents for later processing.",
        "D": "Validate and bound file input before passing it to parsers."
      }
    },
    "q11": {
      "options": {
        "A": "Deserialization does not inherently authorize reconstructed objects or their behavior.",
        "B": "Signing keys stored alongside code may not provide trustworthy provenance.",
        "C": "Key placement alone cannot establish safe pickle contents or use.",
        "D": "Object reconstruction may trigger behavior determined by dangerous serialized content."
      }
    },
    "q12": {
      "options": {
        "A": "Archive extraction does not universally guarantee safe member containment.",
        "B": "Compressed size does not bound paths, links, or expanded content.",
        "C": "Path containment and expansion limits need deliberate extraction controls.",
        "D": "Review member paths, links, metadata, counts, and expansion limits."
      }
    },
    "q13": {
      "options": {
        "A": "Exclude private file data and secrets from operational diagnostic records.",
        "B": "Initial bytes and full paths may expose sensitive content unnecessarily.",
        "C": "Parser exceptions may contain secrets requiring review and redaction.",
        "D": "Reproduction needs do not justify unrestricted sensitive file content logging."
      }
    },
    "q14": {
      "options": {
        "A": "Storage ownership does not authorize every authenticated user for every file.",
        "B": "Unpredictable names supplement rather than replace object authorization decisions.",
        "C": "Verify the requester's permission for the particular file before serving.",
        "D": "Name unpredictability does not grant permission to whoever discovers it."
      }
    },
    "q15": {
      "options": {
        "A": "Ordinary successful reads do not exercise adversarial filesystem behavior.",
        "B": "Default settings and one valid example omit important failure paths.",
        "C": "Exercise boundaries, invalid inputs, permissions, parser failures, and cleanup behavior.",
        "D": "One happy path does not test authorization or unsafe inputs."
      }
    },
    "q16": {
      "options": {
        "A": "Bounded operations and explicit controls protect the complete file lifecycle.",
        "B": "Extension validation alone leaves content, authorization, and path risks unresolved.",
        "C": "Private permissions do not validate content or requester object rights.",
        "D": "Extensions cannot secure upload contents or subsequent file serving."
      }
    }
  }
};
