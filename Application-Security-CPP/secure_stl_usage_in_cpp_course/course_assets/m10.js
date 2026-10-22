window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-90797e92ac",
  "questions": {
    "q01": {
      "options": {
        "A": "The standard library does not universally enforce application ownership and lifetime contracts.",
        "B": "Avoiding containers generally leaves more manual bounds and lifetime obligations for raw storage.",
        "C": "Standard abstractions help when their bounds, lifetime, ownership, and invalidation contracts are respected.",
        "D": "Raw arrays lose convenient extent and ownership information at many API boundaries."
      }
    },
    "q02": {
      "options": {
        "A": "Container semantics affect validity, resource growth, and safe access patterns as well as speed.",
        "B": "Different containers have different invalidation and storage behavior that callers must understand.",
        "C": "Input validation does not remove resource and lifetime differences between container choices.",
        "D": "A short API does not necessarily express the required lifetime and ownership model."
      }
    },
    "q03": {
      "options": {
        "A": "Invalidation often occurs at runtime without any required compiler diagnostic.",
        "B": "Mutation can end the validity of existing observers according to container-specific rules.",
        "C": "Invalidated iterators are not generally safe to compare merely because they are not dereferenced.",
        "D": "Reallocation can move elements and invalidate references to their former storage."
      }
    },
    "q04": {
      "options": {
        "A": "Reserved capacity is not the number of constructed elements available for indexed access.",
        "B": "Unsigned underflow can create a very large index rather than preserve valid bounds.",
        "C": "Offsets must be valid before they are used to form or operate on iterators.",
        "D": "Check all index and range assumptions before they influence an access operation."
      }
    },
    "q05": {
      "options": {
        "A": "string_view does not generally extend the lifetime of the source string.",
        "B": "span borrows elements and does not acquire ownership of temporary source storage.",
        "C": "Knowing an old extent cannot recover elements whose underlying lifetime has ended.",
        "D": "Stored nonowning views can dangle after owner destruction, relocation, or invalidating mutation."
      }
    },
    "q06": {
      "options": {
        "A": "Matching iterator types do not permit arbitrary algorithm ranges crossing unrelated containers.",
        "B": "Algorithms require valid ranges and predicates satisfying their documented behavioral contracts.",
        "C": "Comparator side effects can violate ordering assumptions or invalidate the participating range.",
        "D": "Predicate consistency requirements can span many calls within an algorithm or container lifetime."
      }
    },
    "q07": {
      "options": {
        "A": "Ordered containers rely on consistent strict weak ordering for lookup and structural behavior.",
        "B": "Repeated comparison cannot generally repair an inconsistent or invalid ordering relation.",
        "C": "Comparator behavior affects fundamental container assumptions rather than performance alone.",
        "D": "Validated inputs do not remove the comparator's required ordering properties."
      }
    },
    "q08": {
      "options": {
        "A": "Incremental capacity growth does not prevent eventual allocation failure or excessive retention.",
        "B": "Unbounded externally requested collections can exhaust memory and deny service.",
        "C": "Bound collection sizes and total work before accepting externally influenced growth.",
        "D": "Allocators do not replace application limits on acceptable collection size and resource cost."
      }
    },
    "q09": {
      "options": {
        "A": "Shared mutable access needs synchronization consistent with container and element operations.",
        "B": "Resizing can invalidate storage and race with concurrent access to existing elements.",
        "C": "Data races can produce undefined behavior rather than merely implementation-defined results.",
        "D": "A const reader can still conflict with concurrent mutation of the accessed container state."
      }
    },
    "q10": {
      "options": {
        "A": "One maximum-size test does not justify removing checks for other inputs or later mutations.",
        "B": "An in-range index does not establish that a view's owner and storage remain valid.",
        "C": "Trace every observer and bounds assumption through mutations and lifetime changes before use.",
        "D": "Invalidation rules define production correctness obligations and are not merely debugging conveniences."
      }
    }
  }
};
