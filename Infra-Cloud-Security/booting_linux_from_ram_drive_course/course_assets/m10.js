window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-2e2b6936be",
  "questions": {
    "q1": {
      "options": {
        "A": "A bootloader is still needed in the boot path appropriate to the chosen design.",
        "B": "RAM-root designs still use a kernel to manage memory, processes, and devices.",
        "C": "The course concerns memory-backed boot or root-filesystem arrangements rather than hardware-free execution.",
        "D": "Operating systems still need physical or virtual compute and memory resources."
      }
    },
    "q2": {
      "options": {
        "A": "Backups and a usable recovery route limit the consequences of changes that make a machine unbootable.",
        "B": "Removing every old boot choice can destroy a useful rollback route before the new path is verified.",
        "C": "Documented setup and recovery steps are especially useful for low-level boot changes.",
        "D": "Distribution-specific tools, configuration, boot chains, and filesystem support need explicit checking."
      }
    },
    "q3": {
      "options": {
        "A": "Early boot support does not provide a replacement for every normal user application.",
        "B": "An initramfs is not normally the persistent home directory used for ordinary sessions.",
        "C": "Initial root setup is unrelated to being only a web-browsing environment.",
        "D": "Initramfs supplies early userspace support before control moves to the intended final root filesystem."
      }
    },
    "q4": {
      "options": {
        "A": "Memory-backed changes do not inherently survive shutdown, reboot, or power failure.",
        "B": "Session changes are generally volatile unless a deliberate persistence mechanism saves or reconstructs them.",
        "C": "Memory-backed storage consumes finite RAM shared with applications and other system needs.",
        "D": "Writable session state does not automatically update the persistent base image."
      }
    },
    "q5": {
      "options": {
        "A": "An overlay upper layer records filesystem changes rather than rewrite machine firmware.",
        "B": "Filesystem overlay behavior does not replace the processor running the system.",
        "C": "A writable tmpfs upper layer holds session changes without necessarily modifying the persistent lower image.",
        "D": "The lower layer can remain intact while upper-layer changes alter the session's visible filesystem."
      }
    },
    "q6": {
      "options": {
        "A": "Images, caches, applications, and writable overlays all contribute to actual memory consumption.",
        "B": "Memory limits also matter for servers, desktop work, and RAM-backed filesystems beyond games.",
        "C": "RAM-backed Linux can run applications subject to its supported configuration and resource limits.",
        "D": "The boot image and session workload compete for RAM, so realistic load tests are necessary."
      }
    },
    "q7": {
      "options": {
        "A": "Recoverable lab environments let operators test failures and rollback without risking their primary working system.",
        "B": "An unbacked production machine leaves little protection if a boot change fails.",
        "C": "A machine without console recovery can be difficult to repair after an invalid boot configuration.",
        "D": "A deadline-dependent primary workstation is a poor place to begin unverified low-level changes."
      }
    },
    "q8": {
      "options": {
        "A": "Unreviewed boot edits can make a system unavailable without providing a dependable recovery route.",
        "B": "Define the goal, select a supported design, test recovery, plan persistence, and record the rollback steps.",
        "C": "Logs and recovery media help diagnose and reverse failures rather than need automatic removal.",
        "D": "Commands need validation against the actual platform and distribution instead of blind copying."
      }
    }
  }
};
