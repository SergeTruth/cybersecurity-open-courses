window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-a00b02e351",
  "questions": {
    "q01": {
      "options": {
        "A": "A symbolic link supplies a resolution target; it does not freeze the surrounding directory entries against replacement.",
        "B": "The link does not store and enforce the application's trust policy for its containing directories or target.",
        "C": "Link resolution can cause a pathname to reach a different object than the caller intended to authorize or modify.",
        "D": "Pathname operations remain pathname-based unless the application deliberately uses appropriate descriptor-oriented operations."
      }
    },
    "q02": {
      "options": {
        "A": "A pathname is an instruction for resolution, whereas an owned open descriptor refers to the object acquired by that open.",
        "B": "Pathnames can resolve to changed objects; a valid open descriptor is not re-resolved through the name on each use.",
        "C": "Repeated name resolution and operations on an acquired object have different race and identity properties.",
        "D": "Appropriate descriptor-based metadata checks can validate the actual object returned by an open operation."
      }
    },
    "q03": {
      "options": {
        "A": "Sharing does not automatically make a directory read-only or prevent authorized participants from replacing entries.",
        "B": "An entry's presence in a shared directory does not establish that its creator or target is trusted.",
        "C": "Reachability by several users does not mean those users trust every entry or one another.",
        "D": "Directory ownership and permissions determine whether another actor can manipulate a name before or between the program's operations."
      }
    },
    "q04": {
      "options": {
        "A": "The object reached by a later pathname operation may differ from the object checked earlier, creating a time-of-check/time-of-use gap.",
        "B": "Checking the final open result is necessary error handling rather than the described race-prone validation pattern.",
        "C": "Validating the descriptor actually used ties checks more closely to the acquired object instead of an earlier name resolution.",
        "D": "Documenting link traversal policy clarifies intended behavior rather than creating a check-then-use race."
      }
    },
    "q05": {
      "options": {
        "A": "Opening an object does not establish that every parent directory met the application's trust policy.",
        "B": "Descriptor operations can fail, and descriptor ownership and lifetime still require explicit handling.",
        "C": "A saved name can resolve differently later even when an earlier operation used a descriptor safely.",
        "D": "Operating on the acquired object reduces the opportunities for later name resolution to redirect an already validated operation."
      }
    },
    "q06": {
      "options": {
        "A": "Predictable naming does not inherently strengthen permissions or make creation safe.",
        "B": "Knowing the name does not prove that checking and creating the object happen atomically.",
        "C": "Predictable names let another actor precreate or replace the expected entry unless safe atomic creation and directory controls prevent it.",
        "D": "A common known location can increase interference and does not by itself prevent cleanup from reaching the wrong object."
      }
    },
    "q07": {
      "options": {
        "A": "Directory and file access rules affect whether other actors can manipulate names and access the resolved objects.",
        "B": "Directory permissions constrain entry manipulation, while file permissions constrain access to contents; both influence the path-handling threat boundary.",
        "C": "Permissions reduce particular risks but do not establish every race, traversal, rename, or mount assumption.",
        "D": "Permissions affect creation, lookup, use, replacement, and deletion throughout the lifecycle rather than only shutdown."
      }
    },
    "q08": {
      "options": {
        "A": "Greater privilege increases the effect of mistaken resolution rather than making input paths trustworthy.",
        "B": "Privileged programs can receive paths through configuration, arguments, environment variables, and IPC.",
        "C": "Even a privileged resolver must consider whether less-trusted actors can influence the path or its directory entries.",
        "D": "A less-trusted caller can try to redirect privileged operations toward an object the caller could not access directly."
      }
    },
    "q09": {
      "options": {
        "A": "Explicit follow, skip, object-treatment, and containment rules make traversal behavior predictable for security review and cleanup.",
        "B": "Entry count does not define whether links are followed or where resolution is allowed to lead.",
        "C": "Platform defaults may not match the application's intended containment and link policy.",
        "D": "Following links during recursive cleanup can escape the intended directory boundary and affect unrelated objects."
      }
    },
    "q10": {
      "options": {
        "A": "Cleanup often resolves names and removes or modifies entries, so link behavior remains security-relevant.",
        "B": "A later cleanup operation can resolve a changed name or follow an unintended target unless its link policy is explicit.",
        "C": "Short filenames address buffer size, not whether a path resolves to the intended object.",
        "D": "Tests can construct symbolic links and replacement scenarios on supported platforms to exercise cleanup behavior."
      }
    },
    "q11": {
      "options": {
        "A": "Tool success does not confer trust on directories or establish the application's intended resolution policy.",
        "B": "Expected file presence does not make a path source trustworthy or prevent namespace changes.",
        "C": "Tools can expose implementation defects, while the application must separately define trusted directories, acceptable objects, and link behavior.",
        "D": "Static checks cannot generally prove identical link, rename, and mount semantics across every supported filesystem and platform."
      }
    },
    "q12": {
      "options": {
        "A": "Absolute paths can still traverse replaceable entries, symbolic links, or changed mounts.",
        "B": "Safe handling combines a deliberate path and directory policy with safe acquisition, actual-object validation, and documented link behavior.",
        "C": "One permission mode cannot establish correct acquisition, descriptor ownership, cleanup, and platform-specific link handling.",
        "D": "Trusted configuration does not prevent later filesystem changes, so cleanup still needs a policy and suitable tests."
      }
    }
  }
};
