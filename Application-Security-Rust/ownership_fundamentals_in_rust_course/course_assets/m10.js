window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-4bea838c62",
  "questions": {
    "q1": {
      "options": {
        "A": "Ownership describes value responsibility and cleanup rather than naming conventions for sensitive variables.",
        "B": "Ownership determines responsibility for a value, constrains access, and associates its lifecycle with cleanup.",
        "C": "Values need not be globally shared; Rust supports local ownership and temporary borrowing.",
        "D": "Rust's ownership system ordinarily controls cleanup without requiring a tracing garbage collector for values."
      }
    },
    "q2": {
      "options": {
        "A": "Ownership enables compile-time checking rather than disabling it in pursuit of runtime speed.",
        "B": "Ownership rules apply to local application values as well as values supplied by dependencies.",
        "C": "Compile-time ownership and access checks support predictable cleanup without ordinary garbage-collection requirements.",
        "D": "Ownership of a program value does not establish an external user's permission to perform an application action."
      }
    },
    "q3": {
      "options": {
        "A": "Assigning a non-Copy value normally moves ownership, making the previous owning binding unavailable for continued use.",
        "B": "A move transfers responsibility to another binding rather than immediately destroying the transferred value.",
        "C": "Assignment does not implicitly create independent owning copies of a non-Copy resource.",
        "D": "Moving a value and borrowing a shared reference are different operations with different ownership effects."
      }
    },
    "q4": {
      "options": {
        "A": "Copy permits implicit duplication, while Clone invokes explicit behavior that may perform more substantial work.",
        "B": "Copy and Clone apply according to type semantics rather than whether data comes from networks or files.",
        "C": "Copy need not allocate, while Clone may allocate depending on the value's implementation.",
        "D": "Copy values duplicate implicitly; Clone is explicit and can involve deeper copying, allocation, or shared-owner bookkeeping."
      }
    },
    "q5": {
      "options": {
        "A": "Reading through a borrow avoids moving ownership merely to let a function inspect a value.",
        "B": "Borrowing provides reference-based access while responsibility for ownership remains with the original owner.",
        "C": "A borrowed value can remain locally owned and does not become a global variable.",
        "D": "Borrowing does not create two independent owners that may both destroy the same resource."
      }
    },
    "q6": {
      "options": {
        "A": "A shared reference temporarily borrows access rather than permanently transferring ownership to the recipient.",
        "B": "Borrowing cannot automatically extend the actual lifetime of the underlying owner or its storage.",
        "C": "Ordinary shared reference access permits reading borrowed data without granting unrestricted mutation or ownership.",
        "D": "Exclusive mutation is represented by a mutable reference, not an ordinary shared reference."
      }
    },
    "q7": {
      "options": {
        "A": "Shared readers cannot freely mutate the same data through ordinary references while conflicting access remains active.",
        "B": "A mutable borrow requests exclusive access rather than requiring the referenced value to be copied.",
        "C": "Exclusive mutable access prevents conflicting ordinary references from accessing the same borrowed data simultaneously.",
        "D": "Mutable borrows can be local and temporary, with duration limited by their valid use."
      }
    },
    "q8": {
      "options": {
        "A": "Lifetime annotations cannot make local owners or temporary values persist forever after their actual destruction.",
        "B": "Cargo versions describe package releases, while lifetimes describe valid reference relationships within programs.",
        "C": "Lifetimes are checked validity relationships rather than fixed-duration runtime timers attached to values.",
        "D": "Borrowed access remains valid only while the referenced data and required ownership relationships remain valid."
      }
    },
    "q9": {
      "options": {
        "A": "Parameter and return types reveal whether an API takes ownership, borrows, requests mutation, or produces owned results.",
        "B": "Ownership-aware signatures can return values, including owned data or references with valid lifetime relationships.",
        "C": "Passing arguments does not implicitly clone every value; movement, borrowing, and Copy depend on type and signature.",
        "D": "Build configuration selects the target architecture, while signatures communicate value and access relationships."
      }
    },
    "q10": {
      "options": {
        "A": "Both String and &str are useful in tests and production according to ownership and borrowing needs.",
        "B": "String owns its growable text allocation, while &str borrows a view of valid UTF-8 text.",
        "C": "String can own mutable text, while &str does not itself own or grant mutable access to the characters.",
        "D": "Their key distinction is owned growable storage versus borrowed string-slice access to existing text."
      }
    },
    "q11": {
      "options": {
        "A": "Cloning may be appropriate, but it is not universally safer or clearer than valid borrowing.",
        "B": "Function signatures can accept borrowed or moved values without requiring an explicit clone first.",
        "C": "Unnecessary copying can conceal uncertain ownership responsibilities and impose allocation or processing costs.",
        "D": "Cloning changes available ownership relationships without changing the compiler's borrowing and lifetime rules."
      }
    },
    "q12": {
      "options": {
        "A": "Clear ownership often favors limited sharing and mutation rather than making every value globally mutable.",
        "B": "Compiler feedback helps reveal conflicting access and should guide design rather than be bypassed reflexively.",
        "C": "References support efficient safe access when ownership and permitted borrowing duration are well defined.",
        "D": "Ownership fundamentals support explicit value responsibility, valid access, predictable resource cleanup, and understandable data movement."
      }
    }
  }
};
