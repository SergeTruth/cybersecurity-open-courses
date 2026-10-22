window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-301527fa6c",
  "questions": {
    "q1": {
      "options": {
        "A": "Paths, contents, metadata, and permissions connect external filesystem state to application decisions.",
        "B": "File streams do not automatically normalize or validate external content semantics.",
        "C": "Compiler types do not establish filesystem ownership or the identity of a path target.",
        "D": "Opening successfully does not prove the target and its contents are application-controlled."
      }
    },
    "q2": {
      "options": {
        "A": "An approved directory can still contain malformed, stale, or attacker-influenced file data.",
        "B": "Content parsing does not establish authority to access an untrusted requested directory.",
        "C": "A lexical path check cannot validate the file's separate content schema.",
        "D": "Location authorization and content validity protect different parts of the same operation."
      }
    },
    "q3": {
      "options": {
        "A": "Independent prefix checks can disagree and fail to capture actual filesystem resolution.",
        "B": "Explicit allowed locations establish a reviewable policy for reading, writing, and temporary storage.",
        "C": "Allowed location does not prove the trustworthiness of each existing file beneath it.",
        "D": "Central policy does not guarantee that every subsequent open failure is recoverable."
      }
    },
    "q4": {
      "options": {
        "A": "Read-write access grants unnecessary authority when the operation only needs reading.",
        "B": "Truncating an existing writable file can destroy data beyond the intended operation.",
        "C": "Use only the access and creation behavior required by the specific operation.",
        "D": "A universal overwrite mode can damage existing files and exceed required permissions."
      }
    },
    "q5": {
      "options": {
        "A": "A bounded file size does not identify or authorize its producer.",
        "B": "Size limits bound resources but do not validate structure or field meaning.",
        "C": "Streaming still needs limits on total bytes, work, and processing time.",
        "D": "Rejecting oversized inputs before loading reduces memory and processing exhaustion risk."
      }
    },
    "q6": {
      "options": {
        "A": "Failures can occur after partial changes, so define recovery and publication semantics explicitly.",
        "B": "A successful initial write does not establish that later flush or close will succeed.",
        "C": "Blind retries can duplicate data or overwrite an already partially changed destination.",
        "D": "Close failures may report delayed output errors relevant to persistence and correctness."
      }
    },
    "q7": {
      "options": {
        "A": "A check-then-create sequence with a predictable name permits substitution races.",
        "B": "Shared writable locations require deliberate permissions and exclusive creation rather than assumed cooperation.",
        "C": "Exclusive creation avoids name collisions, and scoped ownership provides cleanup on exit paths.",
        "D": "Retaining failed temporary data can expose secrets or cause stale output reuse."
      }
    },
    "q8": {
      "options": {
        "A": "Canonical text alone cannot prevent the filesystem from changing before a later open.",
        "B": "Path checks and later access can resolve to different objects after concurrent changes.",
        "C": "Pre-open metadata may describe a different object than the one eventually opened.",
        "D": "Normalized separators do not unify all platform-specific symlink and filesystem semantics."
      }
    },
    "q9": {
      "options": {
        "A": "A scoped file owner closes its handle across normal and exceptional exits.",
        "B": "Handle cleanup does not by itself guarantee that buffered data reached durable storage.",
        "C": "RAII manages resources and does not establish authorization for an opened path.",
        "D": "Destructors cannot generally report every close failure directly to the original operation's caller."
      }
    },
    "q10": {
      "options": {
        "A": "Tests must cover supported filesystem behavior rather than assuming all path semantics are portable.",
        "B": "Full paths and contents can contain secrets and should follow a bounded logging policy.",
        "C": "Future filesystem changes still matter even after a comprehensive earlier test run.",
        "D": "Controlled diagnostics and edge tests support safe investigation without unnecessary information exposure."
      }
    }
  }
};
