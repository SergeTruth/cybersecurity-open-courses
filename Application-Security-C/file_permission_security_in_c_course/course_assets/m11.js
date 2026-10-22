window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-5e785b10b7",
  "questions": {
    "q1": {
      "options": {
        "A": "Permission and ownership policy governs access, while an acquired descriptor also carries the rights established at open.",
        "B": "Directory permissions influence namespace changes and are essential alongside file access modes.",
        "C": "Identity, file modes, directories, and platform access rules affect which actors can reach or change protected data.",
        "D": "Service identities and automated processes are also subject to relevant access-control policy."
      }
    },
    "q2": {
      "options": {
        "A": "Writing before restrictions apply can expose contents during a permissive creation interval.",
        "B": "Additional group access needs an explicit consumer requirement rather than generic recovery convenience.",
        "C": "Exclusive creation prevents one race but does not universally establish appropriate content permissions.",
        "D": "Appropriate initial permissions avoid exposing sensitive content while waiting for a later access reduction."
      }
    },
    "q3": {
      "options": {
        "A": "A later restriction can fail or leave an interval in which another actor acquires unintended access.",
        "B": "Nearby source statements do not make separate filesystem operations atomic or guarantee their success.",
        "C": "Creating an overly accessible object can still expose namespace and descriptor opportunities before data arrives.",
        "D": "A failed reduction must not be ignored if the resulting object violates the required access policy."
      }
    },
    "q4": {
      "options": {
        "A": "Read-write access grants more authority than an inspection-only operation requires.",
        "B": "Minimal requested rights reduce what a compromised or mistaken code path can do with the acquired object.",
        "C": "A shared broadly privileged identity increases the resources exposed by unrelated workflows.",
        "D": "Application intent does not replace limiting the actual rights granted by the filesystem."
      }
    },
    "q5": {
      "options": {
        "A": "Identical numeric modes do not universally produce identical access under differing ACL and platform rules.",
        "B": "Documented intent still needs comparison with process identity, ACLs, and effective deployment state.",
        "C": "Portable code must state its assumptions and verify effective access under each supported environment's permission model.",
        "D": "Creation success does not prove the final access policy matches every requested assumption."
      }
    },
    "q6": {
      "options": {
        "A": "Derived files can copy the same sensitive data into storage with different readers and retention.",
        "B": "A short intended lifetime does not prevent disclosure or persistence after failure.",
        "C": "Sensitive content may lack an obvious secret label and still need protection.",
        "D": "Restrictions on the original file do not automatically follow every derived cache or exported report."
      }
    },
    "q7": {
      "options": {
        "A": "Constructing a name does not establish who owns the object currently reached through it.",
        "B": "Group grants can determine which other processes can read data or modify directory entries.",
        "C": "Object type, group access, and effective modes can matter even when the numeric owner matches.",
        "D": "Explicit identity and group assumptions reveal who holds authority over the objects and directories used."
      }
    },
    "q8": {
      "options": {
        "A": "Restricted contents do not universally prevent another permitted directory user from manipulating the entry's name.",
        "B": "Directories govern name lookup and entry operations that can redirect creation, use, replacement, and cleanup.",
        "C": "A safe basename does not establish which object now occupies the entry being removed.",
        "D": "Namespace replacement and cleanup depend directly on directory access and ownership assumptions."
      }
    },
    "q9": {
      "options": {
        "A": "An unchanged string can resolve to a changed object after directory-entry replacement.",
        "B": "A correct earlier check can become stale before a later pathname operation.",
        "C": "Check-then-use gaps can redirect operations; object acquisition and validation must address the actual resource used.",
        "D": "A short interval is still an interval in which a relevant namespace change may occur."
      }
    },
    "q10": {
      "options": {
        "A": "Local helper tests cannot establish deployment-specific identities, groups, and ACL effects.",
        "B": "Recorded intended configuration can drift and needs appropriate runtime confirmation.",
        "C": "Later permission changes and name-based cleanup can also violate the intended access policy.",
        "D": "Combined implementation and deployment evidence checks that effective access matches the documented resource contract."
      }
    }
  }
};
