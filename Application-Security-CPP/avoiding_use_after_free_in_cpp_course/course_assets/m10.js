window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-c81d313ea7",
  "questions": {
    "q01": {
      "options": {
        "A": "Access before completed construction is a different object-lifetime violation from use-after-free.",
        "B": "A null pointer check describes presence rather than access to a destroyed object.",
        "C": "Retaining live allocations unnecessarily describes a leak rather than a stale access.",
        "D": "Using storage as the former object after its lifetime ends violates lifetime safety."
      }
    },
    "q02": {
      "options": {
        "A": "Clear ownership ensures all authorized accesses finish before destruction or invalidation occurs.",
        "B": "Independent deletion decisions create conflicting owners and increase stale-access risks.",
        "C": "Deallocation does not automatically null outstanding aliases, and checking afterward is too late.",
        "D": "Larger allocations do not keep an object's lifetime valid after destruction."
      }
    },
    "q03": {
      "options": {
        "A": "Borrowers do not share deletion authority unless a separate ownership contract says so.",
        "B": "A borrower may use an object only while its owner guarantees validity.",
        "C": "Raw pointer scope does not extend the lifetime of its pointee.",
        "D": "Borrowed references can still be invalidated by erasure or container relocation."
      }
    },
    "q04": {
      "options": {
        "A": "A reference expresses access and does not imply authority to delete its referent.",
        "B": "Ordinary references do not maintain ownership counts or automatically delay destruction.",
        "C": "References communicate required presence while still relying on a valid lifetime contract.",
        "D": "Relocation can invalidate references just as it can invalidate raw pointers."
      }
    },
    "q05": {
      "options": {
        "A": "Erasure ends element lifetimes, and relocation can invalidate existing addresses or iterators.",
        "B": "Ordinary iterators borrow elements and do not prevent their container from erasing them.",
        "C": "Insertion can reallocate a vector and invalidate aliases to its previous storage.",
        "D": "Reserve reduces reallocations within capacity but does not prevent every invalidating operation."
      }
    },
    "q06": {
      "options": {
        "A": "RAII makes cleanup follow the owner's lifetime and ownership transfers explicit.",
        "B": "RAII destruction still leaves unmanaged aliases dangling unless their lifetimes are constrained.",
        "C": "RAII provides automatic cleanup, including unwinding, instead of requiring repeated manual cleanup.",
        "D": "RAII supports unique ownership and does not require a shared ownership model."
      }
    },
    "q07": {
      "options": {
        "A": "Deferred callbacks can run long after their registration function has returned.",
        "B": "Deferred work needs an ownership or cancellation protocol covering its captured objects.",
        "C": "Capturing this copies a pointer and does not automatically retain the object.",
        "D": "Cancellation must coordinate with in-flight execution before captured state can be destroyed."
      }
    },
    "q08": {
      "options": {
        "A": "release relinquishes ownership without invoking the deleter or destroying the object.",
        "B": "release returns a raw pointer and does not create shared ownership automatically.",
        "C": "reset deletes the previous object; release instead leaves cleanup to another owner.",
        "D": "After release, an explicit recipient must assume responsibility for eventual cleanup."
      }
    },
    "q09": {
      "options": {
        "A": "AddressSanitizer reports invalid accesses rather than retaining objects for every raw alias.",
        "B": "Detection requires executing relevant paths and does not prove all asynchronous lifetimes safe.",
        "C": "Its diagnostics can connect an invalid access to allocation and deallocation sites.",
        "D": "Instrumentation does not make an invalidated iterator valid or restore its object."
      }
    },
    "q10": {
      "options": {
        "A": "Non-null dangling pointers can still refer to storage whose lifetime has ended.",
        "B": "Trace every owner and borrower through destruction and operations that invalidate aliases.",
        "C": "Deletion location alone does not establish whether all outstanding accesses have ended.",
        "D": "A shared_ptr elsewhere does not protect unrelated raw aliases or incorrect lifetime contracts."
      }
    }
  }
};
