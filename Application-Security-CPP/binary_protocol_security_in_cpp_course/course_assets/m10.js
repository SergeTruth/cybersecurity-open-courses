window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-115796b8c3",
  "questions": {
    "q01": {
      "options": {
        "A": "Fixed-width representations still permit malicious lengths, invalid values, and inconsistent fields.",
        "B": "Byte ordering standardizes representation without validating framing or application control flow.",
        "C": "Checksums detect certain changes but do not establish user authorization for commands.",
        "D": "Untrusted bytes influence allocation, indexing, and state unless each boundary is validated."
      }
    },
    "q02": {
      "options": {
        "A": "Stream reads may return partial frames or several frames in one call.",
        "B": "Check completeness and resource policy before allocating from an untrusted declared length.",
        "C": "A framing contract must establish completeness and explicitly handle any remaining bytes.",
        "D": "Ignoring trailing bytes can conceal extra commands or violate the protocol's framing contract."
      }
    },
    "q03": {
      "options": {
        "A": "Validate the length's representation, arithmetic, consistency, and budget before using resources.",
        "B": "Allocation failure is not a reliable or affordable input-validation mechanism.",
        "C": "Wire widths and host container limits can differ, requiring explicit conversion checks.",
        "D": "A checksum does not prove that requested resource consumption is acceptable."
      }
    },
    "q04": {
      "options": {
        "A": "Enough bytes alone do not establish alignment, object lifetime, or representation compatibility.",
        "B": "Packing changes layout but does not make every unaligned access portable.",
        "C": "Decode fields explicitly to avoid assuming native object layout matches the wire format.",
        "D": "reinterpret_cast changes the access type without performing byte-order conversion automatically."
      }
    },
    "q05": {
      "options": {
        "A": "Nonzero values can still exceed valid offsets, counts, or application policy limits.",
        "B": "Correct decoding needs representation checks and validation against the field's actual meaning.",
        "C": "Fixed-width types still have finite ranges and can overflow in later arithmetic.",
        "D": "Copying bytes into aligned storage does not validate their semantics or range."
      }
    },
    "q06": {
      "options": {
        "A": "Explicit supported versions prevent the same bytes being interpreted under incompatible rules.",
        "B": "Different versions can share lengths while assigning different meanings to their fields.",
        "C": "Unknown versions may introduce unvalidated semantics and should follow an explicit policy.",
        "D": "Version negotiation identifies a format and does not authenticate a peer."
      }
    },
    "q07": {
      "options": {
        "A": "Successful decoding says nothing about sender identity or permission to request an operation.",
        "B": "A valid schema describes structure rather than authority or authenticated identity.",
        "C": "Length validation protects parsing but cannot replace authentication or authorization checks.",
        "D": "After structural parsing, verify integrity, identity, permitted state, and requested authority."
      }
    },
    "q08": {
      "options": {
        "A": "Repeated reinterpretation can create ambiguity and attacker-controlled processing cost.",
        "B": "Bounded deterministic rejection limits denial-of-service exposure and unnecessary information disclosure.",
        "C": "Full payload logging can expose secrets and allow attackers to exhaust log storage.",
        "D": "Allocating from unvalidated counts consumes resources before confirming the data exists."
      }
    },
    "q09": {
      "options": {
        "A": "Random input exploration cannot establish whether authorization rules match intended policy.",
        "B": "Fuzzed malformed inputs reveal parser defects, and retained failures become regression cases.",
        "C": "Keep resource limits in the harness to test realistic bounded rejection behavior.",
        "D": "A corpus supplements specifications but cannot define every valid protocol rule."
      }
    },
    "q10": {
      "options": {
        "A": "Happy-path decoding leaves malformed lengths, invalid states, and resource exhaustion unexplored.",
        "B": "Encoding format alone does not demonstrate that this parser enforces its contracts.",
        "C": "Review the complete path from untrusted fields through decisions and resource consumption.",
        "D": "Exceptions can report failure but do not guarantee bounds, authorization, or affordable parsing."
      }
    }
  }
};
