window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-4f699c312a",
  "questions": {
    "q1": {
      "options": {
        "A": "Removing unused dependencies is a package-maintenance task rather than access after an object's lifetime ends.",
        "B": "Use-after-free occurs when code accesses an object or storage after its valid lifetime has ended.",
        "C": "Keeping callbacks alive without valid referenced data can create lifecycle problems rather than solve them.",
        "D": "Formatting a value does not normally end its ownership or make subsequent valid use unsafe."
      }
    },
    "q2": {
      "options": {
        "A": "Cleanup ends the validity of destroyed data; references cannot remain usable merely because cleanup occurred.",
        "B": "Raw pointers and foreign interfaces require explicit validity contracts rather than automatic blanket trust.",
        "C": "Ownership and lifetime checks ensure ordinary safe references remain valid while their borrowed data is accessible.",
        "D": "Resource-owning types still run cleanup; safety comes from preventing stale references rather than disabling destruction."
      }
    },
    "q3": {
      "options": {
        "A": "Moving a non-Copy value transfers ownership and prevents continued use through the previous owning binding.",
        "B": "An ownership move does not implicitly convert the value into a raw pointer.",
        "C": "A move transfers ownership instead of creating two independent owners of the same allocation.",
        "D": "Moved values retain their cleanup behavior under the destination owner rather than losing destruction entirely."
      }
    },
    "q4": {
      "options": {
        "A": "Drop performs cleanup and does not authorize access to values after their resources have been released.",
        "B": "References remain subject to lifetime rules regardless of whether the owning type implements Drop.",
        "C": "Cleanup behavior and error handling serve different purposes and both require deliberate application design.",
        "D": "Drop connects the end of ownership to cleanup of the resources that the value owns."
      }
    },
    "q5": {
      "options": {
        "A": "References can borrow non-global data when the owner remains valid for the caller's borrowing duration.",
        "B": "Safe returned references require underlying storage that remains alive throughout their permitted use.",
        "C": "The compiler checks returned reference relationships to reject references to data destroyed before use.",
        "D": "Returning a reference borrows existing storage and does not automatically allocate an independent owner."
      }
    },
    "q6": {
      "options": {
        "A": "Returning owned data is a normal safe API choice when independent lifetime is needed.",
        "B": "References require valid owners, so they are inappropriate when the borrowed storage will no longer exist.",
        "C": "Owned results let callers retain data when no surviving owner can support a valid borrowed result.",
        "D": "Copying cost alone does not decide the API; ownership duration and caller requirements are central."
      }
    },
    "q7": {
      "options": {
        "A": "Weak references do not keep the contained value alive after its final strong owner is gone.",
        "B": "Cloning a strong owner extends shared ownership rather than immediately destroying the shared value.",
        "C": "Shared data remains alive while strong owners exist and is destroyed when the final strong owner disappears.",
        "D": "Shared ownership still has cleanup rules, although cycles of strong ownership can prevent expected destruction."
      }
    },
    "q8": {
      "options": {
        "A": "Weak references observe shared ownership without keeping the contained value alive on their own.",
        "B": "Weak references use ownership-aware upgrade checks rather than bypassing Rust's validity rules for callbacks.",
        "C": "Ordinary stack variables do not require weak references to be accessed safely within valid lifetimes.",
        "D": "Upgrading a weak reference checks whether a live strong owner can still provide valid access."
      }
    },
    "q9": {
      "options": {
        "A": "Independent execution may continue beyond the creating stack frame, requiring owned data or appropriately scoped borrows.",
        "B": "Task or thread creation does not automatically cancel callbacks or settle their lifetime obligations.",
        "C": "Async tasks and threads can own captured data to keep it valid for their execution duration.",
        "D": "Execution may continue after the caller returns, so ordering cannot be assumed without synchronization or scope guarantees."
      }
    },
    "q10": {
      "options": {
        "A": "Safe iterators ordinarily maintain borrowing validity rather than uniquely introducing freed-memory access risks.",
        "B": "Raw pointers, foreign ownership, and callbacks can escape ordinary compiler-checked lifetimes and need explicit contracts.",
        "C": "Safe shared references remain lifetime checked; risk typically arises where manual or foreign contracts are unsound.",
        "D": "Rust cannot automatically verify every external library's memory behavior or callback lifetime agreement."
      }
    },
    "q11": {
      "options": {
        "A": "Operating-system names alone do not explain pointer ownership, cleanup responsibility, or callback lifetimes.",
        "B": "External boundaries require testing and review because assumptions are not fully verified by the Rust compiler.",
        "C": "Ownership, deallocation authority, pointer validity duration, and callback retention rules define the essential lifecycle contract.",
        "D": "A sound FFI contract preserves safe use rather than disabling ownership checks in ordinary Rust callers."
      }
    },
    "q12": {
      "options": {
        "A": "Undocumented callback and cleanup behavior makes stale access harder to detect and prevent.",
        "B": "Global retention can mask lifecycle defects and leak resources rather than provide a clear ownership design.",
        "C": "Raw pointers remove ordinary reference checking and require stronger manual lifetime guarantees, not weaker ones.",
        "D": "Clear ownership and lifecycle contracts, sound wrappers, and failure-path tests help prevent access to expired data."
      }
    }
  }
};
