window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-61282a3641",
  "questions": {
    "q01": {
      "options": {
        "A": "Upload features accept untrusted content and metadata while also exposing storage and processing resource boundaries.",
        "B": "Multipart parsing does not establish safe file contents, authorization, quarantine status, or readiness for publication.",
        "C": "Authenticated users can upload malicious content or target other tenants, so content and access checks remain necessary.",
        "D": "Client declarations can be inaccurate, and compressed or complex content can require disproportionate processing resources."
      }
    },
    "q02": {
      "options": {
        "A": "Creation permission does not automatically grant access to other objects, including objects within the same tenant.",
        "B": "Opaque identifiers reduce guessing but do not prove a caller has permission to retrieve an object.",
        "C": "Random storage keys can leak and must not substitute for object-specific download authorization.",
        "D": "Upload and retrieval operations require separate authorization decisions based on the subject, object, and permitted action."
      }
    },
    "q03": {
      "options": {
        "A": "Filename extensions and Content-Type values originate from the sender and must be checked against content evidence.",
        "B": "An attacker can choose matching false labels, so agreement between metadata fields does not prove actual format.",
        "C": "Multipart parsers generally parse the envelope and do not guarantee validation of every embedded file signature.",
        "D": "Authentication identifies the uploader but does not prevent that user from supplying misleading MIME metadata."
      }
    },
    "q04": {
      "options": {
        "A": "Sanitizing a name does not ensure uniqueness, prevent collisions, or create a trustworthy storage identity.",
        "B": "Unpredictable object names do not establish safe content or determine who may access the stored file.",
        "C": "Generated storage identities keep attacker-controlled display names from determining filesystem paths or retrieval locations.",
        "D": "Client folder segments can introduce traversal and isolation problems unless separated from trusted storage path construction."
      }
    },
    "q05": {
      "options": {
        "A": "Public static directories expose files before authorization and processing controls can establish that publication is permitted.",
        "B": "Nonpublic isolated storage lets the application control processing, authorization, and promotion before files become retrievable.",
        "C": "Non-executable files can still disclose sensitive content or carry active browser content when directly served.",
        "D": "An unrelated static handler may bypass upload-route authentication, so retrieval needs its own enforceable access controls."
      }
    },
    "q06": {
      "options": {
        "A": "Malware scans do not validate every possible downstream parser or guarantee that malformed content is harmless.",
        "B": "Timing out a scan request does not automatically terminate its process tree or release associated resources.",
        "C": "Scanner coverage is limited by signatures, analysis methods, timing, and the specific downstream processing context.",
        "D": "Scanning complements validation, isolation, and least privilege; it does not replace those independent protective controls."
      }
    },
    "q07": {
      "options": {
        "A": "Reduced privileges limit accessible resources but do not stop CPU, memory, disk, or time exhaustion.",
        "B": "HTTP timeout handling does not automatically cancel every parser, worker, descendant process, or queued task.",
        "C": "Small accepted files can produce large decoded content or output, so processing also needs resource bounds.",
        "D": "Restricted authority and bounded execution reduce the effects of malicious files, parser failures, and excessive workloads."
      }
    },
    "q08": {
      "options": {
        "A": "Metadata can reveal object identities, ownership, content descriptions, or existence even without exposing the full file.",
        "B": "Signed URLs convey retrieval capability and need appropriate expiry and access policy despite unpredictable object identifiers.",
        "C": "Error messages, metadata, and signed retrieval capabilities can disclose protected information or access beyond the file body.",
        "D": "Tenant membership does not establish permission to view every object's metadata or obtain its retrieval capability."
      }
    },
    "q09": {
      "options": {
        "A": "Content-Length is untrusted and may not reflect decoded content, staging overhead, or total storage consumption.",
        "B": "An unbounded waiting queue can exhaust memory and connections even when active worker concurrency is capped.",
        "C": "Failed operations can leave temporary files, partial objects, or process resources that require explicit cleanup.",
        "D": "Layered quotas, bounded queues, cleanup, and monitoring constrain consumption and reveal repeated or suspicious upload activity."
      }
    },
    "q10": {
      "options": {
        "A": "MIME allowlists provide only one signal and do not establish authorization, safe bytes, isolation, or controlled publication.",
        "B": "A complete workflow checks authority and content throughout intake, quarantine, processing, promotion, retrieval, and failure cleanup.",
        "C": "A clean scan does not grant any caller permission to retrieve another user's or tenant's object.",
        "D": "Monitoring detects problems but cannot substitute for preventive limits, isolation, or cleanup of failed operations."
      }
    }
  }
};
