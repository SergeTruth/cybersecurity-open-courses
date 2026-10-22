window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-d274fa308f",
  "questions": {
    "q1": {
      "options": {
        "A": "Borrow checking verifies reference validity and access rules; it does not encrypt stored memory.",
        "B": "Compile-time checks enforce reference validity, borrowing permissions, mutation rules, and relationships between lifetimes.",
        "C": "APIs still need deliberate ownership and access design for compiler checks to support clear contracts.",
        "D": "Registry publication is a Cargo workflow, unrelated to verifying reference access and lifetimes."
      }
    },
    "q2": {
      "options": {
        "A": "References generally cannot outlive their owners because accessing destroyed data would create dangling references.",
        "B": "Memory safety checks do not determine whether business permissions or authorization policies are correct.",
        "C": "Rejecting invalid references and conflicting access before execution prevents important classes of memory errors.",
        "D": "The borrow checker enforces ownership rules rather than disabling them for development speed."
      }
    },
    "q3": {
      "options": {
        "A": "A shared reference ordinarily permits reading without transferring ownership or granting unrestricted mutation.",
        "B": "Borrowing provides temporary access while the original owner retains responsibility for the value.",
        "C": "Exclusive mutation is associated with a mutable reference rather than an ordinary shared reference.",
        "D": "Creating a shared reference does not implicitly clone or duplicate the underlying value."
      }
    },
    "q4": {
      "options": {
        "A": "Mutable borrowing works with local owners and does not require globally owned data.",
        "B": "Overlapping mutable references to the same data would violate the required exclusive access.",
        "C": "Ordinary shared access cannot remain active while conflicting exclusive mutation occurs through another reference.",
        "D": "A mutable borrow grants exclusive access to its borrowed data for the relevant borrow duration."
      }
    },
    "q5": {
      "options": {
        "A": "Collections can be mutated when access follows Rust's ownership and borrowing rules.",
        "B": "Restricting conflicting access prevents readers from observing invalidated data or unexpected concurrent mutation.",
        "C": "Borrowing restrictions apply to access relationships regardless of whether storage uses stack or heap allocation.",
        "D": "Function parameter naming does not determine the validity of overlapping shared and mutable access."
      }
    },
    "q6": {
      "options": {
        "A": "Non-lexical lifetimes are compiler analysis of borrow usage, not runtime reference counting.",
        "B": "Cargo package versioning does not determine when a reference's borrow is considered active.",
        "C": "A borrow may end after its last use, permitting later operations within the same enclosing block.",
        "D": "This analysis refines borrow duration while continuing to enforce lifetime and ownership requirements."
      }
    },
    "q7": {
      "options": {
        "A": "Lifetime annotations express reference relationships while ownership and borrowing checks remain enforced.",
        "B": "An annotation cannot extend a local variable's actual storage duration or prevent its destruction.",
        "C": "Annotations describe how references relate to valid underlying storage without extending that storage's existence.",
        "D": "Lifetime annotations describe borrowed access rather than converting borrowed data into independently owned values."
      }
    },
    "q8": {
      "options": {
        "A": "An &T parameter borrows access rather than requiring the caller to surrender ownership.",
        "B": "Exclusive mutation ordinarily requires &mut T, whereas &T communicates shared borrowed access.",
        "C": "Passing a shared reference does not require or automatically perform cloning of the referenced value.",
        "D": "The function can read borrowed data while responsibility for ownership remains with the caller."
      }
    },
    "q9": {
      "options": {
        "A": "An &mut T parameter requests exclusive mutable access under the applicable borrowing rules.",
        "B": "Mutable references remain subject to borrow scopes and cannot ignore conflicting access.",
        "C": "Registry publication has no relationship to the meaning of a mutable-reference function parameter.",
        "D": "An exclusively mutable reference communicates permission beyond ordinary shared read-only access to the value."
      }
    },
    "q10": {
      "options": {
        "A": "Collection iteration may borrow rather than consume values; it does not consume all program state.",
        "B": "Active element references can conflict with mutations that change or invalidate the collection's storage.",
        "C": "Collections support references, provided their operations respect ownership, lifetimes, and access restrictions.",
        "D": "Accessing a collection does not automatically clone every element or resolve conflicting borrows."
      }
    },
    "q11": {
      "options": {
        "A": "Deploying an old artifact does not resolve the ownership defect identified in the current source.",
        "B": "Global mutable state complicates access and synchronization instead of clarifying the original borrowing relationship.",
        "C": "Tracing ownership and borrow usage often reveals a refactoring that makes access responsibilities clearer.",
        "D": "Cloning may be appropriate, but automatic cloning can hide design problems and introduce unnecessary copying."
      }
    },
    "q12": {
      "options": {
        "A": "Safe reference design gives borrows appropriate lifetimes rather than making every reference permanent.",
        "B": "Functions, structs, and collections are useful tools for expressing clear ownership and access relationships.",
        "C": "Compiler feedback identifies constraints that should inform design rather than be bypassed reflexively.",
        "D": "Understanding borrowing helps express valid references, deliberate mutation, clear ownership, and understandable data flow."
      }
    }
  }
};
