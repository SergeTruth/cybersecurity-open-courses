window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-8328cb8abf",
  "questions": {
    "q1": {
      "options": {
        "A": "Invalid iterator operations can violate language preconditions and compromise memory or decisions.",
        "B": "Iterator defects can cause memory corruption and undefined behavior, beyond performance problems.",
        "C": "Container operations have specific invalidation rules and do not preserve every iterator.",
        "D": "Comparing to end does not automatically validate an iterator's provenance or lifetime."
      }
    },
    "q2": {
      "options": {
        "A": "The past-the-end position is not an element that may be read once.",
        "B": "The end sentinel marks a boundary and is not a dereferenceable element.",
        "C": "End iterators exist for nonempty ranges too, while empty ranges have begin equal to end.",
        "D": "Containers do not supply a hidden element that makes end dereference valid."
      }
    },
    "q3": {
      "options": {
        "A": "The language does not relocate containers to legitimize operations on unrelated iterators.",
        "B": "Iterator representations do not make every cross-container operation satisfy its preconditions.",
        "C": "Operations such as distance or subtraction require iterators from a compatible valid range.",
        "D": "Matching element types alone do not establish that two iterators form one range."
      }
    },
    "q4": {
      "options": {
        "A": "Changing container structure can invalidate observers even when some element values remain unchanged.",
        "B": "Insertions, erasures, reallocation, or rehashing may invalidate iterators before clear is called.",
        "C": "An iterator can be invalidated by structural changes elsewhere in the container.",
        "D": "Apply the specific container and operation's invalidation rules after every mutation."
      }
    },
    "q5": {
      "options": {
        "A": "Cached end iterators can become invalid after mutation depending on the container.",
        "B": "A pointer to an erased element refers to storage whose element lifetime ended.",
        "C": "Use the container's returned successor and avoid an additional accidental increment.",
        "D": "The erased iterator must not be used as if its validity were preserved."
      }
    },
    "q6": {
      "options": {
        "A": "Traversal algorithms do not automatically synchronize concurrent access to shared containers.",
        "B": "Algorithms still require callers to respect mutation and invalidation preconditions.",
        "C": "Range-based syntax does not make arbitrary erasure during traversal safe.",
        "D": "Expressing traversal intent reduces manual endpoint handling while retaining required mutation discipline."
      }
    },
    "q7": {
      "options": {
        "A": "Many ranges and views borrow existing storage rather than materialize owned elements.",
        "B": "Borrowed access can dangle when the underlying owner's lifetime or valid range ends.",
        "C": "A borrowed-range property does not universally keep the underlying source object alive.",
        "D": "Views do not acquire shared ownership of every source element by language rule."
      }
    },
    "q8": {
      "options": {
        "A": "Iterator operations require the category and capabilities promised by the range.",
        "B": "Constraints reflect which operations are valid, not merely the wording of diagnostics.",
        "C": "A bounds check does not give a forward iterator random-access capabilities.",
        "D": "Iterator categories differ in supported movement, indexing, and complexity guarantees."
      }
    },
    "q9": {
      "options": {
        "A": "Ordinary containers can also be accessed by multiple threads and require synchronization.",
        "B": "A structurally valid iterator does not synchronize reads and writes to its target.",
        "C": "Iterator validity and race freedom must each be established for shared access.",
        "D": "Stable addresses do not prevent races on element values or container metadata."
      }
    },
    "q10": {
      "options": {
        "A": "Debug iterators supplement explicit tests and may not exist in release configurations.",
        "B": "Different tools challenge invalidation, boundary, lifetime, and synchronization assumptions in complementary ways.",
        "C": "Sanitizers do not prove that all iterator pairs share the required logical range.",
        "D": "Passing on one library implementation does not replace portable-contract review."
      }
    }
  }
};
