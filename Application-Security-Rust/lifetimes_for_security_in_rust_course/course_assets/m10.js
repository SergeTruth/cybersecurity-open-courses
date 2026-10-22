window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-b9e1ce9cbe",
  "questions": {
    "q1": {
      "options": {
        "A": "Cargo publication policy governs registry workflows rather than the validity duration of references.",
        "B": "A lifetime describes when borrowed access remains valid relative to the storage it references.",
        "C": "Lifetimes participate in ownership checks rather than providing a way to bypass them.",
        "D": "Lifetimes are checked relationships, not runtime timers that count down for every value."
      }
    },
    "q2": {
      "options": {
        "A": "Lifetime checking does not relocate every value into storage lasting for the whole program.",
        "B": "Lifetimes complement ownership and borrowing rules rather than replacing those rules entirely.",
        "C": "Checking reference validity prevents ordinary safe code from retaining usable references after borrowed storage expires.",
        "D": "Lifetime checks concern access validity and do not encrypt or conceal the underlying data."
      }
    },
    "q3": {
      "options": {
        "A": "Annotations describe relationships that actual storage and borrow usage must satisfy without extending the data's existence.",
        "B": "Adding an annotation does not relocate borrowed data into globally owned storage.",
        "C": "Local values still end their lifetimes according to actual ownership and scope, regardless of annotations.",
        "D": "Annotations constrain valid reference relationships and are not merely formatting instructions for diagnostics."
      }
    },
    "q4": {
      "options": {
        "A": "Rust functions can return many types, including references whose underlying data remains valid.",
        "B": "Temporary values may be read while valid; the problem is returning access that outlasts them.",
        "C": "Valid returned references may point to ordinary data rather than specifically to network resources.",
        "D": "A reference to a destroyed local value would be dangling, so such a return cannot be valid."
      }
    },
    "q5": {
      "options": {
        "A": "Accepting references does not prevent returning a valid borrowed result tied to an appropriate surviving owner.",
        "B": "Returning ownership gives the caller independent responsibility when no surviving owner can support a borrowed result.",
        "C": "Borrowed results are useful only when the required data remains valid for their permitted use.",
        "D": "Owned returns are a normal safe design choice and do not require unsafe functions."
      }
    },
    "q6": {
      "options": {
        "A": "Borrowed fields need validity relationships regardless of whether the containing struct is stored on stack or heap.",
        "B": "A struct can combine owned fields and borrowed fields when its lifetime requirements are satisfied.",
        "C": "The struct's usable lifetime must respect the validity of the data its fields reference.",
        "D": "Crate publication has no bearing on the lifetime relationship between a struct and its borrowed fields."
      }
    },
    "q7": {
      "options": {
        "A": "Borrowed fields do not forbid returned values, but returned structures must satisfy the appropriate lifetime relationships.",
        "B": "Borrowed fields remain compiler checked and introduce constraints that callers must meet.",
        "C": "Callers must preserve the referenced data long enough for all uses of the borrowing structure.",
        "D": "Borrowed fields may hold shared references and do not automatically make the referenced data mutable."
      }
    },
    "q8": {
      "options": {
        "A": "Narrow borrow scopes still follow ownership rules and simply reduce how long access restrictions remain active.",
        "B": "Shortening a borrow does not automatically overwrite or erase sensitive bytes in storage.",
        "C": "Private and public code both benefit from clear, limited borrow scopes and understandable access responsibilities.",
        "D": "Limiting borrows to their actual needs reduces conflicting access and makes lifetime reasoning more local."
      }
    },
    "q9": {
      "options": {
        "A": "Tasks and threads can continue independently, so captured data must remain valid across execution boundaries.",
        "B": "Concurrent execution may occur while borrowed values exist; valid lifetimes and synchronization govern permitted access.",
        "C": "References are not automatically promoted to static lifetime when passed to async or threaded code.",
        "D": "Tasks and threads can own data, which is often useful when work outlives its creating stack frame."
      }
    },
    "q10": {
      "options": {
        "A": "Unsafe code can interact with borrowed data and must preserve the validity assumptions safe references require.",
        "B": "Raw-pointer and foreign-code contracts may bypass automatic lifetime tracking and need explicit verification of data validity.",
        "C": "Foreign code is not automatically checked by Rust's borrow checker for every pointer it receives or retains.",
        "D": "External allocation and cleanup can follow different lifecycles that must be coordinated with Rust ownership."
      }
    },
    "q11": {
      "options": {
        "A": "Author identity does not establish how long referenced storage remains valid or who controls cleanup.",
        "B": "A safety contract should justify valid access rather than instruct callers to bypass lifetime checks.",
        "C": "Clear ownership, deallocation authority, validity duration, and callback retention rules explain when borrowed access remains safe.",
        "D": "Tests and review still need to verify that implementations actually preserve the documented lifetime contract."
      }
    },
    "q12": {
      "options": {
        "A": "Comments support code review but cannot replace checking actual ownership, access, and cleanup behavior.",
        "B": "Lifetime annotations cannot make a local temporary survive after its owner is destroyed.",
        "C": "References are useful safe tools when their ownership relationships and valid durations are clear.",
        "D": "Understanding lifetimes helps design valid borrowed access, clear ownership, sound APIs, and auditable external boundaries."
      }
    }
  }
};
