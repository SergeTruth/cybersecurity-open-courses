window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-c2fd381e4e",
  "questions": {
    "q1": {
      "options": {
        "A": "Storing an address as an integer does not establish bounds, ownership, or lifetime.",
        "B": "Safe address-based access needs explicit ownership, lifetime, nullability, and extent contracts.",
        "C": "Nullability alone cannot establish whether a non-null pointer remains live and in bounds.",
        "D": "Pointers can safely borrow scoped targets without owning them for the entire process."
      }
    },
    "q2": {
      "options": {
        "A": "Numeric addresses do not describe who owns storage or when access remains valid.",
        "B": "Raw pointers can borrow or own under a contract; smart pointers commonly express ownership.",
        "C": "The last pointer used does not acquire deletion authority by that fact alone.",
        "D": "A documented pointer role distinguishes destruction responsibility from temporary access and observation."
      }
    },
    "q3": {
      "options": {
        "A": "Optional absence is often more clearly represented by a nullable pointer or explicit optional type.",
        "B": "Ownership transfer needs an explicit owning interface rather than an ordinary reference parameter.",
        "C": "A reference communicates that a valid required argument must be supplied.",
        "D": "A reference does not permit arithmetic outside the valid bounds of its object."
      }
    },
    "q4": {
      "options": {
        "A": "Const placement distinguishes mutation of the pointer value from mutation through the pointer.",
        "B": "Const through one access path does not prevent mutation through other permitted aliases.",
        "C": "Const qualification establishes neither non-nullness nor the target's continued valid lifetime.",
        "D": "Const specifies mutation restrictions and does not by itself express ownership transfer."
      }
    },
    "q5": {
      "options": {
        "A": "A null pointer designates no object and is distinct from a stale non-null address.",
        "B": "Const qualification restricts mutation without ending the pointed-to object's lifetime.",
        "C": "After object lifetime ends, retained addresses can dangle despite remaining non-null.",
        "D": "A moved-from unique_ptr becomes empty rather than retaining ownership of a dangling target."
      }
    },
    "q6": {
      "options": {
        "A": "Scanning memory cannot reliably discover the allocation extent and may access invalid storage.",
        "B": "Pairing an address with an extent makes the permitted access range explicit.",
        "C": "Constructing a span still relies on a valid pointer-and-extent precondition.",
        "D": "Span-style APIs communicate range information rather than merely shortening indexing syntax."
      }
    },
    "q7": {
      "options": {
        "A": "release relinquishes ownership permanently until another owner explicitly accepts the returned pointer.",
        "B": "Raw observers do not become shared owners when unique_ptr releases its target.",
        "C": "The now-empty unique_ptr no longer destroys the released object on scope exit.",
        "D": "Review release as an ownership handoff with an identified recipient and matching cleanup."
      }
    },
    "q8": {
      "options": {
        "A": "A dedicated boundary wrapper can encode the C API's ownership and matching release operation.",
        "B": "Unrestricted raw pointer exposure spreads cleanup obligations and makes inconsistent use easier.",
        "C": "Using delete for a C resource can violate its required release contract.",
        "D": "Function naming is not a substitute for the library's documented ownership semantics."
      }
    },
    "q9": {
      "options": {
        "A": "Copyable callback storage does not preserve the lifetime of raw pointer targets.",
        "B": "Deferred work may retain access beyond the original owner's promised lifetime interval.",
        "C": "Scheduling a task does not automatically convert a borrowed pointer into shared ownership.",
        "D": "Capturing a pointer copies its address rather than copying or owning the pointee."
      }
    },
    "q10": {
      "options": {
        "A": "Address stability does not establish continued object lifetime or deletion responsibility.",
        "B": "Converting to void* removes type information without improving the underlying access contract.",
        "C": "Review each boundary's ownership, lifetime, nullability, and allowed range together.",
        "D": "A null check cannot prove a non-null pointer is live or its range is valid."
      }
    }
  }
};
