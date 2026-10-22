window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-ace2f9654d",
  "questions": {
    "q01": {
      "options": {
        "A": "Filesystem operations can disclose confidential data and modify persistent application or system state.",
        "B": "Filesystem APIs can access private resources available to the process identity.",
        "C": "Node.js does not universally confine all filesystem access to an application storage sandbox.",
        "D": "Shared process authority can cross tenant and user boundaries without application permission checks."
      }
    },
    "q02": {
      "options": {
        "A": "Filesystem functions can consume user-derived strings unless the application deliberately restricts them.",
        "B": "Encoding changes representation without proving approved location or resource permission.",
        "C": "Validate both containment and resource access before user input selects a file operation.",
        "D": "A path string does not encode the requesting user's complete access policy."
      }
    },
    "q03": {
      "options": {
        "A": "Normalized syntax does not prove the actual object's location, identity, or allowed recipient.",
        "B": "Normalization transforms a path representation and does not delete suspicious targets.",
        "C": "Lexically normalized paths can still traverse links to other filesystem locations.",
        "D": "The requested object's owner must be checked through trusted application state."
      }
    },
    "q04": {
      "options": {
        "A": "A generated identifier cannot establish whether uploaded bytes are safe to process.",
        "B": "Opaque keys reduce guessability but do not replace private-download authorization.",
        "C": "Random-looking names do not make confidential stored content appropriate for public disclosure.",
        "D": "Server-generated identifiers prevent client display names from directly choosing storage paths."
      }
    },
    "q05": {
      "options": {
        "A": "A familiar suffix can be attached to unrelated, malformed, or hostile bytes.",
        "B": "Treat names and declared types as hints alongside actual content and workflow validation.",
        "C": "Client-provided MIME metadata is not authoritative evidence of safe uploaded content.",
        "D": "Matching two attacker-influenced labels does not establish the actual stored file format."
      }
    },
    "q06": {
      "options": {
        "A": "Use trusted creation and cleanup policies to prevent collisions, leftover data, and disclosure.",
        "B": "Predictable names in shared storage can be raced even during short retention periods.",
        "C": "Closing a file does not necessarily unlink its directory entry or securely overwrite its bytes.",
        "D": "Process lifetime and expected cleanup do not eliminate earlier exposure or substitution opportunities."
      }
    },
    "q07": {
      "options": {
        "A": "Production identities and shared service storage also need restricted filesystem permissions.",
        "B": "Application checks and operating-system restrictions provide complementary layers of control.",
        "C": "Explicit permissions constrain which identities can read, create, or modify filesystem objects.",
        "D": "Non-root processes can still create overly permissive files within their available authority."
      }
    },
    "q08": {
      "options": {
        "A": "A declared Content-Length can be absent or inconsistent and does not prove actual processed size.",
        "B": "Bound actual transferred work and reliably release partial files and handles after failures.",
        "C": "Backpressure moderates flow without automatically removing incomplete output on rejection.",
        "D": "Whole-file buffering can exhaust memory long before normal process termination occurs."
      }
    },
    "q09": {
      "options": {
        "A": "Knowing a file key does not prove that its presenter may retrieve private contents.",
        "B": "Check the current subject's permission for the particular stored business object on every request.",
        "C": "One tenant can contain records private to different users, cases, and workflows.",
        "D": "A signed key grants whatever capability was issued and requires appropriate authorization before issuance."
      }
    },
    "q10": {
      "options": {
        "A": "A pattern check alone cannot enforce ownership, actual resolution, lifecycle, or resource budgets.",
        "B": "Content scanning does not provide access permissions or cleanup and capacity guarantees.",
        "C": "Successful cases do not exercise escapes, unauthorized objects, interrupted writes, or race conditions.",
        "D": "Review actual targets, trusted identity, content, permissions, limits, failures, and operational evidence together."
      }
    }
  }
};
