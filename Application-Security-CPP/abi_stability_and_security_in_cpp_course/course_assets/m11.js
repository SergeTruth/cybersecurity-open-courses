window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-bb3492459c",
  "questions": {
    "q01": {
      "options": {
        "A": "Maintaining the binary contract avoids mismatched layout and call assumptions; upgrades still need behavioral and integration checks.",
        "B": "A stable binary interface does not guarantee unchanged source-level semantics or application behavior.",
        "C": "ABI compatibility matters precisely when separately compiled components must continue to work together.",
        "D": "Exported symbols do not establish correct calling conventions, ownership, object layout, or runtime behavior."
      }
    },
    "q02": {
      "options": {
        "A": "Compiling current source does not test whether an older plugin's embedded binary assumptions still hold.",
        "B": "Source compatibility concerns recompilation; binary compatibility concerns already compiled calls, representations, and runtime agreements.",
        "C": "Unchanged function names do not preserve parameter conventions, object layout, or allocator behavior by themselves.",
        "D": "A rebuild can adapt to changed headers while an existing binary continues using the older layout or calling contract."
      }
    },
    "q03": {
      "options": {
        "A": "C++ symbols and public types participate in binary contracts even without extern C linkage.",
        "B": "Binary interoperability depends on calling and representation conventions as well as compatible runtime and resource-management behavior.",
        "C": "Formatting and comments do not define machine-level interoperability, while runtime-library choices can affect it.",
        "D": "Callers can compile layout assumptions into their code when public classes cross a binary boundary."
      }
    },
    "q04": {
      "options": {
        "A": "Template instantiations can differ with headers, compiler settings, and library versions rather than produce universally identical code.",
        "B": "Standard-library representations can vary across implementations, versions, platforms, and build modes.",
        "C": "Exposed C++ implementation details can become assumptions embedded in separately compiled callers, complicating later changes.",
        "D": "Inline function bodies can be compiled into callers, leaving old behavior there after a library replacement."
      }
    },
    "q05": {
      "options": {
        "A": "Opaque representation does not make mismatched allocators or arbitrary deallocation safe.",
        "B": "Hiding implementation layout is intended to reduce unnecessary caller recompilation when private details change.",
        "C": "Representation hiding narrows the exposed contract, while explicit versions and sizes provide a controlled way to evolve it.",
        "D": "An opaque handle hides implementation and still needs explicit compatibility, capability, and lifecycle agreements."
      }
    },
    "q06": {
      "options": {
        "A": "Library-created objects may require the library's own release operation rather than the caller's default delete.",
        "B": "Mismatched runtimes or allocators can make cross-component cleanup incorrect, not merely slower.",
        "C": "Hiding an object's type does not release its resources; an appropriate destruction contract remains necessary.",
        "D": "Pairing creation with the designated release mechanism avoids deallocation through an incompatible runtime or allocator."
      }
    },
    "q07": {
      "options": {
        "A": "Catching at the boundary and returning stable errors avoids relying on incompatible exception-unwinding conventions across components.",
        "B": "Exception behavior and runtime compatibility are not identical across every C++ toolchain and configuration.",
        "C": "An integer return type does not make a C callback boundary safe for arbitrary C++ exception propagation.",
        "D": "Translation must occur before an exception escapes an incompatible boundary, rather than after the crossing."
      }
    },
    "q08": {
      "options": {
        "A": "Exporting internals expands the surface callers may depend on and makes private changes harder to contain.",
        "B": "Restricting exports and reviewing dependency effects reduces unintended binary coupling and unexpected interface changes.",
        "C": "A dependency change can affect runtime requirements or exposed representations even when public header text is unchanged.",
        "D": "Visibility settings should be checked in the actual artifact because configuration intent does not prove the exported result."
      }
    },
    "q09": {
      "options": {
        "A": "A filename does not establish the interface version, supported capabilities, or lifecycle behavior a host requires.",
        "B": "Separately built hosts and plugins need explicit compatibility and resource-lifetime agreements before exchanging objects or executing callbacks.",
        "C": "Unloading can invalidate code and storage dependencies, so borrowed objects cannot safely outlive the documented lifecycle.",
        "D": "An initialization symbol can exist without providing the version, capability, and ownership contract the host expects."
      }
    },
    "q10": {
      "options": {
        "A": "Baselines and execution tests expose unintended binary changes before consumers receive the release.",
        "B": "Symbols alone do not establish compatible behavior, object representation, or successful execution by older consumers.",
        "C": "Prerelease checks can inspect interfaces and run older consumers before publication, when defects are less disruptive to fix.",
        "D": "Compatibility policy can allow deliberate, documented breaks while preventing accidental or unapproved changes."
      }
    }
  }
};
