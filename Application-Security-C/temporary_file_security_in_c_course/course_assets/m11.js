window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-095438d7a0",
  "questions": {
    "q01": {
      "options": {
        "A": "Temporary storage can expose sensitive content, redirect later operations, and leave persistent artifacts if lifecycle controls fail.",
        "B": "Privacy and automatic deletion depend on the API, permissions, platform, and termination path rather than being universal defaults.",
        "C": "Temporary files can persist on storage and contain the same secrets or personal data as ordinary files.",
        "D": "Other processes can reach filesystem objects according to namespace and permissions regardless of a creator function's scope."
      }
    },
    "q02": {
      "options": {
        "A": "A known name lets another actor precreate or replace entries when directory permissions permit interference.",
        "B": "Unique atomic creation avoids a separate check-and-open window in which another actor can claim the expected pathname.",
        "C": "Predictability does not apply a secure mode or establish intended ownership.",
        "D": "Knowing a name does not establish directory trust or prevent changes to its entries."
      }
    },
    "q03": {
      "options": {
        "A": "Checking absence and opening later leaves a race in which another actor can change the pathname.",
        "B": "A shared fixed filename creates interference and ownership ambiguity between concurrent processes.",
        "C": "A generated name alone is not an acquired object and can be replaced before a later open.",
        "D": "A suitable platform API combines creation with acquiring the unique object, reducing pathname races between those steps."
      }
    },
    "q04": {
      "options": {
        "A": "Directory trust and access policy determine who can manipulate the names and artifacts used by the temporary-file workflow.",
        "B": "Temporary directories can differ in ownership, sharing, permissions, and deployment-specific trust assumptions.",
        "C": "Later name-based cleanup can still be redirected through an untrusted directory namespace.",
        "D": "Relative resolution depends on the working directory and surrounding filesystem state rather than an automatic trusted root."
      }
    },
    "q05": {
      "options": {
        "A": "Universal read and write access exposes content and permits unintended modification by other local identities.",
        "B": "The actual API and environment contract must be checked rather than assuming every temporary-file mechanism is private.",
        "C": "Narrowing access after writing can expose content during the earlier permissive interval.",
        "D": "Initial permissions should limit readers and writers to the workflow's intended process and explicitly approved consumers."
      }
    },
    "q06": {
      "options": {
        "A": "Crash cleanup and backup exclusions are not universal guarantees for temporary files.",
        "B": "A temporary label does not reduce the confidentiality requirements of the bytes stored there.",
        "C": "Residual files and secondary copies can extend secret lifetime and audience beyond the intended temporary operation.",
        "D": "Forced termination and crashes can interrupt application cleanup, leaving data on persistent storage."
      }
    },
    "q07": {
      "options": {
        "A": "Partial creation and later failures can acquire resources that remain after a rejected operation.",
        "B": "Nonempty files can contain sensitive data and still require controlled retention or deletion.",
        "C": "Cleanup policy must cover the resource states reached during success, partial failure, retries, and feasible abnormal recovery.",
        "D": "Applications cannot assume every platform and failure path removes temporary artifacts automatically."
      }
    },
    "q08": {
      "options": {
        "A": "Actual write counts and errors determine whether the complete intended output exists before another step consumes it.",
        "B": "Writes can be short or fail even when targeting temporary storage.",
        "C": "Write outcomes report progress or failure, not merely a diagnostic pathname.",
        "D": "Successful data transfer does not establish safe file permissions, ownership, or retention."
      }
    },
    "q09": {
      "options": {
        "A": "Directory placement alone does not establish who produced an artifact or whether its content is complete.",
        "B": "A reader can observe incomplete output if it consumes an artifact before the writer's successful completion is established.",
        "C": "Expected provenance, completion state, bounded size, and content checks prevent partial or substituted artifacts from becoming trusted inputs.",
        "D": "A unique-looking name does not validate content, completion, or the filesystem object's current identity."
      }
    },
    "q10": {
      "options": {
        "A": "Shared collectors can make local diagnostic records available to additional readers and systems.",
        "B": "A fixed log format does not make the sensitive value placed inside it harmless.",
        "C": "Paths and contents can reveal private context and require appropriate limits and redaction.",
        "D": "Temporary artifact details can expose sensitive content, names, locations, and operational behavior through retained diagnostics."
      }
    },
    "q11": {
      "options": {
        "A": "A successful local test does not establish directory ownership and permissions in every deployment.",
        "B": "Tests expose implementation defects, while an explicit lifecycle and access design defines the behavior those checks should establish.",
        "C": "Static analysis does not remove the need to handle actual filesystem operation failures.",
        "D": "Sanitizers do not prove that every termination path deletes files or erases persistent copies."
      }
    },
    "q12": {
      "options": {
        "A": "Directory choice alone does not implement atomic creation, ownership, permissions, and cleanup.",
        "B": "Temporary storage needs a complete resource contract covering acquisition, allowed access, content sensitivity, lifetime, and release.",
        "C": "Short names do not prevent pathname races, overbroad permissions, or unintended readers.",
        "D": "Brief intended use does not guarantee deletion when the process crashes or cleanup fails."
      }
    }
  }
};
