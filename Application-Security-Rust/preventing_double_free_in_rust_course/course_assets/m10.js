window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-3ebf5022c5",
  "questions": {
    "q1": {
      "options": {
        "A": "Repeating a test does not release a memory allocation or establish a cleanup ownership defect.",
        "B": "Double free means more than one cleanup action attempts to release the same owned resource.",
        "C": "Smart pointers coordinate ownership and cleanup; using one does not itself constitute double free.",
        "D": "Shared references borrow access without independently owning the right to release the referenced resource."
      }
    },
    "q2": {
      "options": {
        "A": "Ordinary safe resource management relies on ownership and automatic cleanup rather than manual freeing by every caller.",
        "B": "Borrowed references do not independently own cleanup responsibility for the data they reference.",
        "C": "A move transfers cleanup responsibility and prevents the previous binding from acting as another owner.",
        "D": "Cleanup normally occurs when ownership ends; disabling cleanup would leak resources rather than establish correct ownership."
      }
    },
    "q3": {
      "options": {
        "A": "A move transfers the value and its cleanup responsibility instead of creating another independent cleanup owner.",
        "B": "Moved values can still be dropped when the new owner's valid lifecycle ends.",
        "C": "Moving ownership does not duplicate independent rights to release the same allocation.",
        "D": "Ownership movement is distinct from constructing a non-owning weak reference to shared data."
      }
    },
    "q4": {
      "options": {
        "A": "Borrowing uses checked references and does not require raw pointers for ordinary resource access.",
        "B": "Dropping a borrowed reference does not free the resource that another value owns.",
        "C": "Borrowing and ownership transfer can both be used when their access and lifetime requirements are satisfied.",
        "D": "Borrowers access existing data while the owner retains responsibility for eventual destruction and resource release."
      }
    },
    "q5": {
      "options": {
        "A": "Drop specifies cleanup rather than creating another independent owner of an existing resource.",
        "B": "A type's Drop implementation defines cleanup work performed when that owned value is destroyed.",
        "C": "Ownership and borrow checking continue to apply to types with custom Drop implementations.",
        "D": "Drop implements executable cleanup behavior and is not merely descriptive text in source comments."
      }
    },
    "q6": {
      "options": {
        "A": "Resource-owning production types can implement Drop, so their cleanup behavior matters outside tests.",
        "B": "Custom cleanup can still violate foreign ownership agreements and must be checked against the external contract.",
        "C": "Review must ensure custom resource release follows ownership, allocator, error-path, and lifecycle assumptions consistently.",
        "D": "A custom destructor does not automatically make repeated external cleanup calls safe or idempotent."
      }
    },
    "q7": {
      "options": {
        "A": "Coordinated shared ownership and multiple independent cleanup owners have fundamentally different destruction behavior.",
        "B": "Shared ownership can clean up correctly; cycles may leak, while duplicate cleanup authority can be unsafe.",
        "C": "Reference counting coordinates one shared resource's destruction, unlike incorrectly reconstructing multiple independent owners of the same allocation.",
        "D": "The distinction concerns cleanup coordination rather than whether values are on stack or contain strings."
      }
    },
    "q8": {
      "options": {
        "A": "Weak references do not trigger duplicate cleanup and should not be used to repeat destruction.",
        "B": "Box normally has a single owner and does not require a weak reference for every allocation.",
        "C": "Weak relationships still need review of access, upgrade failure, ownership cycles, and cleanup expectations.",
        "D": "A weak reference observes a shared value without retaining it and can be upgraded only while it remains alive."
      }
    },
    "q9": {
      "options": {
        "A": "Manual pointer ownership, foreign allocations, and cleanup contracts can bypass ordinary protections and require precise release authority.",
        "B": "The compiler cannot verify every external API's allocation, release, or callback ownership convention.",
        "C": "Safe iterators ordinarily preserve borrowing rules rather than introducing independent cleanup ownership.",
        "D": "Ordinary shared references do not own the referenced allocation and do not independently free it."
      }
    },
    "q10": {
      "options": {
        "A": "Allocators and resource handles may require specific release functions; arbitrary deallocation can violate the allocation contract.",
        "B": "Foreign resources should be released through the library or compatible allocator required by their creation contract.",
        "C": "Allocator compatibility changes whether cleanup is valid, not merely how its documentation is displayed.",
        "D": "Allocation and release contracts matter across applications, including desktop tools, embedded code, and services."
      }
    },
    "q11": {
      "options": {
        "A": "Editor choice does not establish resource ownership, allocation provenance, or the correct release function.",
        "B": "A sound cleanup contract preserves ownership rather than providing instructions to bypass safe-code checks.",
        "C": "The contract must identify allocation and release authority, required cleanup functions, and ownership changes on success or error.",
        "D": "Making cleanup optional without review can leak resources or leave ownership obligations ambiguous."
      }
    },
    "q12": {
      "options": {
        "A": "Undocumented callbacks obscure which path owns release authority and when cleanup may occur.",
        "B": "Drop is useful for resource-owning types when it faithfully implements the correct cleanup contract.",
        "C": "Multiple independent cleanup owners can release the same resource twice instead of coordinating a single destruction.",
        "D": "Clear cleanup authority, sound abstractions, explicit foreign contracts, and lifecycle tests prevent competing release paths."
      }
    }
  }
};
