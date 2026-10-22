window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-5dd38accde",
  "questions": {
    "q01": {
      "options": {
        "A": "Temporary files are filesystem objects and may persist or be observed on disk.",
        "B": "Temporary storage can expose sensitive contents through weak paths, permissions, or cleanup.",
        "C": "Automatic early deletion is not guaranteed before another process can observe a temporary file.",
        "D": "Naming, permissions, and location directly affect who can access temporary data."
      }
    },
    "q02": {
      "options": {
        "A": "Restricted filename characters do not establish directory trust or prevent interference from other writers.",
        "B": "Post-job cleanup does not prevent exposure or substitution while the job is running.",
        "C": "Use a trusted private location with permissions appropriate to the application's sensitive data.",
        "D": "A directory's short name does not prove platform management or safe permissions."
      }
    },
    "q03": {
      "options": {
        "A": "Guessable names let competing processes claim names or redirect unsafe creation paths.",
        "B": "Predictability can help attackers race creation even if it also simplifies cleanup.",
        "C": "File permissions cannot protect a path that another process has already claimed.",
        "D": "Random naming reduces collisions but does not replace exclusive creation and target validation."
      }
    },
    "q04": {
      "options": {
        "A": "Checking first still leaves a race before a separate creation operation.",
        "B": "Exclusive creation must be combined with a trusted containing directory and appropriate link policy.",
        "C": "Atomic creation does not automatically validate later diagnostics or permission decisions.",
        "D": "Combining creation and exclusivity removes the separate absence-check race at that creation boundary."
      }
    },
    "q05": {
      "options": {
        "A": "Replay convenience does not justify unnecessary temporary copies of complete access tokens.",
        "B": "Cleanup at normal shutdown leaves avoidable exposure during execution and abnormal termination.",
        "C": "Recognizable directory names do not protect staged personal data from unauthorized access.",
        "D": "Avoiding unnecessary sensitive writes reduces both the exposure window and cleanup burden."
      }
    },
    "q06": {
      "options": {
        "A": "A path string can resolve differently after directory changes even while another handle stays open.",
        "B": "Path syntax alone does not establish the owner or identity of the resolved object.",
        "C": "Path resolution depends on mutable filesystem state, links, access permissions, and timing.",
        "D": "Directory links can redirect access beyond the authority the caller intended."
      }
    },
    "q07": {
      "options": {
        "A": "A scoped wrapper can own the handle and implement the defined file-removal policy.",
        "B": "RAII cleanup does not prevent writes from failing because of filesystem or device errors.",
        "C": "Exposing temporary paths globally unnecessarily expands access and complicates cleanup responsibility.",
        "D": "Suppressing destructor exceptions does not establish publication success or durable storage."
      }
    },
    "q08": {
      "options": {
        "A": "Retained partial files can expose data or be mistaken for valid retry input.",
        "B": "Define cleanup and publication outcomes while keeping failure diagnostics bounded and safe.",
        "C": "Uncommitted temporary contents can still be sensitive and should not reach user-facing errors.",
        "D": "A Boolean alone may not distinguish rejection, partial change, and uncertain durability states."
      }
    },
    "q09": {
      "options": {
        "A": "Creation, permissions, and deletion guarantees differ across supported operating systems and filesystems.",
        "B": "Review platform differences because they affect both lifetime and access-control guarantees.",
        "C": "Platform differences can alter the security model as well as functional portability.",
        "D": "Path abstractions do not eliminate native permission, link-resolution, or deletion semantics."
      }
    },
    "q10": {
      "options": {
        "A": "Review trusted location, exclusive creation, restricted access, and cleanup as one lifecycle contract.",
        "B": "Unpredictable naming supplements rather than replaces permissions and atomic exclusive creation.",
        "C": "Cleanup needs a defined owner rather than whichever caller happens to use the path last.",
        "D": "Permissions on a newly created file do not repair a prior name-substitution race."
      }
    }
  }
};
