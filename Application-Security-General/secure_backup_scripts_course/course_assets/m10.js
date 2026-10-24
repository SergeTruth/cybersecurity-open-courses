window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-6be987472f",
  "questions": {
    "q1": {
      "options": {
        "A": "Backup automation handles sensitive material and determines whether the intended data can be recovered after failure.",
        "B": "Read-only source access still exposes data and does not protect destinations, credentials, or cleanup behavior.",
        "C": "Collection, storage, retention, and key handling can create risk long before restoration begins.",
        "D": "Backup defects can affect confidentiality, integrity, and recoverability rather than only storage cost."
      }
    },
    "q2": {
      "options": {
        "A": "Capacity is an operational constraint, not a definition of the data needed for recovery.",
        "B": "Default traversal can omit required state or include unintended sensitive material.",
        "C": "Recent files alone may omit older data, configuration, and dependencies needed to reconstruct a working system.",
        "D": "Recovery requirements determine the data, configuration, dependencies, and consistency the backup must capture."
      }
    },
    "q3": {
      "options": {
        "A": "Data sensitivity guides who may access backups and how copies must be protected, retained, and handled.",
        "B": "Encryption does not remove decisions about access, retention, restoration, and authorized use.",
        "C": "Copied production data retains its sensitivity after leaving the primary system.",
        "D": "Classification supports protection choices and does not replace recovery objectives or completeness requirements."
      }
    },
    "q4": {
      "options": {
        "A": "Quoting preserves argument boundaries but does not establish endpoint trust, ownership, or containment.",
        "B": "Paths and mounts can change between runs, so earlier success does not validate current endpoints.",
        "C": "Broad globs can include unintended inputs or behave unexpectedly when matches change.",
        "D": "Quoting prevents unintended shell splitting, while endpoint validation establishes the intended sources and destinations."
      }
    },
    "q5": {
      "options": {
        "A": "An archive can exist while missing data or containing only a partially successful collection.",
        "B": "Restore exercises do not establish that each later scheduled backup run succeeded.",
        "C": "Unchecked command failures can leave unusable output while the script incorrectly reports that recovery data is available.",
        "D": "Scheduler behavior does not guarantee safe retries or correct handling of every command failure."
      }
    },
    "q6": {
      "options": {
        "A": "A universal administrator identity broadens compromise impact and complicates separation of collection and recovery authority.",
        "B": "Collection should not automatically receive every restore capability when the current task does not require it.",
        "C": "Source reading does not imply authority to delete or overwrite destination copies.",
        "D": "Task-specific grants restrict the data and operations exposed by the backup account's compromise or mistakes."
      }
    },
    "q7": {
      "options": {
        "A": "Local storage can also be copied or compromised, so locality does not remove separation needs.",
        "B": "Separately protected keys reduce the chance that access to backup files alone immediately enables decryption.",
        "C": "Encryption depends on protecting usable decryption authority rather than making key location irrelevant.",
        "D": "A checksum checks content correspondence and does not keep a nearby decryption key confidential."
      }
    },
    "q8": {
      "options": {
        "A": "Content and integrity checks can reveal missing, truncated, empty, or damaged output before an incident requires recovery.",
        "B": "Verification of one artifact does not predict every future restore's duration and operating conditions.",
        "C": "A scheduled job can run without successfully capturing its required source data.",
        "D": "Authenticated encryption does not establish that the full restore procedure, permissions, and dependencies work."
      }
    },
    "q9": {
      "options": {
        "A": "Checksums do not exercise restore tools, credentials, dependencies, or the target recovery environment.",
        "B": "A restore exercise verifies the end-to-end recovery procedure under tested conditions rather than relying on archive existence alone.",
        "C": "Retention review governs stored copies but does not perform the operations needed to recover a working system.",
        "D": "Testing before an incident gives time to fix missing data, permissions, and recovery procedures."
      }
    },
    "q10": {
      "options": {
        "A": "Cleanup can remove needed recovery points, directly affecting whether restoration remains possible.",
        "B": "An age threshold alone does not establish that another complete recoverable copy will remain.",
        "C": "Incorrect deletion scope or retention decisions can destroy the final usable recovery point.",
        "D": "Running a broad deletion pattern as root increases its potential effect rather than making its scope safe."
      }
    },
    "q11": {
      "options": {
        "A": "A size decrease can reflect missing input rather than improved compression or stronger protection.",
        "B": "Unexpected size changes can reveal collection failures or omissions that still produced an apparently valid artifact.",
        "C": "A command can exit successfully after capturing less data than the recovery requirements intended.",
        "D": "Encrypted output can also be unexpectedly small, so size monitoring remains useful."
      }
    },
    "q12": {
      "options": {
        "A": "Keeping credentials alongside backups can make one disclosure expose both data and the authority needed to read it.",
        "B": "Suppressing failures hides missing recovery evidence and prevents timely investigation.",
        "C": "Protected content, verified completeness, and tested restoration together establish useful recovery evidence.",
        "D": "Maximum file count can include unnecessary exposure while still failing to capture the required consistent recovery scope."
      }
    }
  }
};
