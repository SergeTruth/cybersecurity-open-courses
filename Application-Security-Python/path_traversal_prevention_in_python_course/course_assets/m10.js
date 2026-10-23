window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-40ce816b09",
  "questions": {
    "q01": {
      "options": {
        "A": "Slash formatting alone does not constrain resolved filesystem access.",
        "B": "Containment prevents attacker selected paths escaping approved storage locations.",
        "C": "File extensions do not restrict which directory gets accessed.",
        "D": "Other encodings, absolute paths, and links require additional safeguards."
      }
    },
    "q02": {
      "options": {
        "A": "Operating systems interpret path segments rather than enforce application containment.",
        "B": "Path objects model paths without automatically enforcing storage boundaries.",
        "C": "Unchecked paths can target sensitive files outside intended locations.",
        "D": "Path wrapping does not validate containment, permissions, or authorization."
      }
    },
    "q03": {
      "options": {
        "A": "Allowing callers to replace the base defeats its trust boundary.",
        "B": "The working directory alone does not define approved storage.",
        "C": "The application must establish its trusted root independently of callers.",
        "D": "A trusted root defines the approved filesystem access boundary."
      }
    },
    "q04": {
      "options": {
        "A": "Absolute paths and traversal retain dangerous meaning without suitable checks.",
        "B": "Special components can redirect concatenated paths outside approved locations.",
        "C": "Prefixing input does not neutralize separators or traversal semantics.",
        "D": "Text prefixes alone do not guarantee resolved filesystem containment."
      }
    },
    "q05": {
      "options": {
        "A": "Canonicalization resolves path meaning before checking the intended boundary.",
        "B": "Lowercasing is not equivalent to resolving filesystem path semantics.",
        "C": "Removing dots can corrupt names without securely resolving paths.",
        "D": "Extension comparisons do not establish canonical filesystem path meaning."
      }
    },
    "q06": {
      "options": {
        "A": "Similar textual prefixes can represent different sibling storage directories.",
        "B": "Matching extensions do not establish directory containment or authorization.",
        "C": "Validate the resolved destination against the trusted storage root.",
        "D": "Textual prefix checks can accept misleading sibling directory names."
      }
    },
    "q07": {
      "options": {
        "A": "Opaque identifiers support authorized lookup without exposing internal path structure.",
        "B": "Opaque identifiers need not encrypt paths or change filesystem resolution.",
        "C": "Authorization is still required when looking up stored objects.",
        "D": "Unpredictability does not replace authorization for each requested file."
      }
    },
    "q08": {
      "options": {
        "A": "Display names may be safely presented with appropriate contextual handling.",
        "B": "Storage names must not preserve attacker controlled directory separators.",
        "C": "Removing slashes alone misses other dangerous filesystem naming behavior.",
        "D": "Application controlled storage names prevent display text from defining paths."
      }
    },
    "q09": {
      "options": {
        "A": "Authorize the specific object before exposing its contents to callers.",
        "B": "Filename character checks do not prove permission to download.",
        "C": "Existence in storage does not establish the caller's access rights.",
        "D": "Authenticated users may still lack permission for particular files."
      }
    },
    "q10": {
      "options": {
        "A": "Tenant membership and individual subject identity are different security concepts.",
        "B": "Tenant filtering does not grant every member every object permission.",
        "C": "Individual object permissions remain necessary within a tenant boundary.",
        "D": "Tenant isolation complements authorization for each requested file object."
      }
    },
    "q11": {
      "options": {
        "A": "Archive entries may escape extraction roots unless checked appropriately.",
        "B": "Expanded sizes and member counts can exhaust storage resources.",
        "C": "Extraction safety requires explicit handling of paths, links, and limits.",
        "D": "Archive contents require containment, link handling, and resource limits."
      }
    },
    "q12": {
      "options": {
        "A": "Symbolic links redirect filesystem resolution rather than behave like ordinary data.",
        "B": "Filesystem changes can race between validation and subsequent opening.",
        "C": "Links can redirect approved looking paths to unintended destinations.",
        "D": "Resolving once does not prevent later filesystem substitution races."
      }
    },
    "q13": {
      "options": {
        "A": "Timestamps can be guessed or collided with in shared directories.",
        "B": "Secure creation, restrictive permissions, and cleanup reduce temporary storage risks.",
        "C": "Temporary files may persist and expose contents without reliable cleanup.",
        "D": "Predictable identifiers do not provide safe exclusive temporary creation."
      }
    },
    "q14": {
      "options": {
        "A": "Reviewed helpers support safer responses when configured and authorized correctly.",
        "B": "Filesystem existence alone does not prove the requester's authorization.",
        "C": "Helpers do not universally make arbitrary caller supplied paths safe.",
        "D": "Authorization remains necessary even when using framework serving helpers."
      }
    },
    "q15": {
      "options": {
        "A": "Bounded outcome metadata and opaque identifiers can support safe investigation.",
        "B": "Exclude secrets, private contents, and unnecessary filesystem detail from logs.",
        "C": "Full paths can expose unnecessary sensitive deployment and user details.",
        "D": "Rejected contents can contain sensitive data and should not be logged."
      }
    },
    "q16": {
      "options": {
        "A": "Combine containment with authorization, safe APIs, and tested filesystem handling.",
        "B": "Removing one traversal spelling misses alternative paths and filesystem semantics.",
        "C": "Path resolution alone cannot eliminate later filesystem substitution races.",
        "D": "Race resistant access requires controls beyond one earlier resolution."
      }
    }
  }
};
