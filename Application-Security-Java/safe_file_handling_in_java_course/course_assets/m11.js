window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-f75880603b",
  "questions": {
    "q01": {
      "options": {
        "A": "File operations affect real data and authority beyond application formatting.",
        "B": "Reads, writes, downloads, processing, and deletion can cross important ownership and storage boundaries.",
        "C": "Java APIs do not automatically enforce every application's intended filesystem scope.",
        "D": "Exports, temporary storage, downloads, and background processing also need file-handling review."
      }
    },
    "q02": {
      "options": {
        "A": "Untrusted paths can select resources outside the authorized operation or storage boundary.",
        "B": "Authentication identifies a caller without authorizing every path that caller supplies.",
        "C": "Filesystem APIs can act on supplied paths unless application controls restrict them.",
        "D": "The operating system enforces its permissions rather than every application-specific ownership rule."
      }
    },
    "q03": {
      "options": {
        "A": "Normalizing a path does not prove the requested resource belongs to the tenant.",
        "B": "Path representation does not establish actual file type or safe content.",
        "C": "Check containment and permissions after normalization and account for the actual storage boundary.",
        "D": "Normalization is useful when combined with authorization and robust containment checks."
      }
    },
    "q04": {
      "options": {
        "A": "A generated name identifies storage without proving the uploaded bytes are safe.",
        "B": "Public access still requires deliberate publication and resource permission decisions.",
        "C": "Generated identifiers do not authorize any caller to read the associated object.",
        "D": "Server-controlled identities separate storage decisions from untrusted display names and reduce collisions."
      }
    },
    "q05": {
      "options": {
        "A": "Java and frameworks can inspect headers and names, but those values remain untrusted.",
        "B": "A declared type does not establish ownership or allowed access to the file.",
        "C": "Client-selected names and MIME declarations are hints needing corroborating content and workflow checks.",
        "D": "Header and extension checks do not automatically detect malware in a file."
      }
    },
    "q06": {
      "options": {
        "A": "Production workflows also need cleanup on success, failure, cancellation, and shutdown.",
        "B": "Temporary artifacts can leak, collide, exhaust capacity, or survive as incomplete outputs.",
        "C": "Temporary directories need explicit trust, permissions, naming, and retention policy.",
        "D": "Temporary storage is not universally private and may be exposed or retained."
      }
    },
    "q07": {
      "options": {
        "A": "Restricted process permissions limit which unrelated files a defect or compromise can affect.",
        "B": "Narrow filesystem permissions complement application-level path and ownership validation.",
        "C": "Source locations should not become writable merely because the process has permission.",
        "D": "Archive processing still needs destination checks, expansion ceilings, and controlled cleanup."
      }
    },
    "q08": {
      "options": {
        "A": "Exceptions can leave partially written files and open resources requiring deliberate cleanup.",
        "B": "Streaming changes buffering behavior without deciding whether the caller may access data.",
        "C": "Larger files can consume more resources and are not inherently safer inputs.",
        "D": "Bound memory, storage, duration, and downstream work while releasing resources reliably."
      }
    },
    "q09": {
      "options": {
        "A": "Download endpoints can expose private content even when the storage directory is correct.",
        "B": "An internal name is not itself proof of the requesting user's permission.",
        "C": "Content-Disposition affects browser presentation rather than the server's access decision.",
        "D": "Validate the selected file's actual owner, tenant, and workflow-specific sharing rules."
      }
    },
    "q10": {
      "options": {
        "A": "Display names alone do not cover storage, permission, processing, and cleanup risks.",
        "B": "One successful read does not validate file scope, bounded processing, or failures.",
        "C": "Review the full file lifecycle with authorization, resource limits, negative tests, and operational evidence.",
        "D": "Temporary files and archives can create important disclosure, traversal, and resource-exhaustion risks."
      }
    }
  }
};
