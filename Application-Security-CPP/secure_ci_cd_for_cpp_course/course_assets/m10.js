window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-5f289a15d3",
  "questions": {
    "q01": {
      "options": {
        "A": "The pipeline determines which inputs and tools become shipped code, so controlling that transformation is part of release trust.",
        "B": "CI affects generated contents and provenance as well as formatting and test results.",
        "C": "Runner isolation does not establish the trustworthiness of downloaded dependencies or tools executed inside it.",
        "D": "Trust must cover the build and artifact handoff rather than begin only after a binary reaches deployment."
      }
    },
    "q02": {
      "options": {
        "A": "Workflow changes can alter credentials, signing steps, artifact selection, and deployment behavior as well as speed.",
        "B": "Branch protection does not reduce the authority a reviewed workflow change may exercise after merge.",
        "C": "Pipeline definitions can change both the artifact and the security checks or approvals applied before publication.",
        "D": "Runner permissions do not determine whether the workflow uses those permissions safely or selects the intended inputs."
      }
    },
    "q03": {
      "options": {
        "A": "Persistent unrecorded state can influence later jobs and hide differences between nominally identical builds.",
        "B": "Clean ephemeral workspaces reduce opportunities for earlier jobs to contaminate or persist into later builds.",
        "C": "Unreviewed global tools can change builds outside the job's declared and inspectable configuration.",
        "D": "Old outputs can be mistaken for current artifacts when jobs do not produce or verify every expected file."
      }
    },
    "q04": {
      "options": {
        "A": "Log masking does not prevent a job from reading, exporting, or misusing a credential it never needed.",
        "B": "A generated artifact can be copied or retained before deletion, making it an unsafe place to store deployment tokens.",
        "C": "Broad reusable authority increases exposure across jobs and retries rather than limiting access to a specific task.",
        "D": "Scoped credentials and exclusion from retained outputs limit both unauthorized use and unintended secret copies."
      }
    },
    "q05": {
      "options": {
        "A": "A version range can resolve differently over time and does not establish reproducible dependency selection.",
        "B": "Pinning identifies a selected version but does not alone verify downloaded bytes or supplier provenance.",
        "C": "Explicit dependency selections make changes visible to review and allow associated testing, investigation, and rollback.",
        "D": "Dependency code can change shipped behavior even when the application's own source is unchanged."
      }
    },
    "q06": {
      "options": {
        "A": "A binary's existence does not prove the release profile, contents, or runtime behavior passed appropriate checks.",
        "B": "Complementary static, runtime, dependency, and inventory checks provide different evidence about native code and the resulting release.",
        "C": "Warnings cannot exercise runtime inputs, thread schedules, or all memory and lifetime behavior.",
        "D": "Some overlap is useful because one scanner cannot establish every contract, runtime property, or release requirement."
      }
    },
    "q07": {
      "options": {
        "A": "Artifact identity and integrity evidence connect the exact released bytes to their build, approval, and signing history.",
        "B": "Control is needed during build storage and promotion as well as after an operator downloads the artifact.",
        "C": "Filenames can be reused or changed and do not uniquely bind contents to an approved build.",
        "D": "An independently rebuilt binary needs its own verified provenance and approval rather than inheriting trust from a compiler version."
      }
    },
    "q08": {
      "options": {
        "A": "Build success does not establish that every environment is ready or that deployment approval requirements were met.",
        "B": "Test jobs should not receive production deployment authority merely to exercise unrelated test behavior.",
        "C": "Planning recovery only after production problems appear leaves the release without a verified rollback path.",
        "D": "Separate environments and explicit promotion evidence support controlled deployment and a prepared recovery path."
      }
    },
    "q09": {
      "options": {
        "A": "Diff size does not identify the toolchain, dependency selections, artifact bytes, or release authority involved.",
        "B": "Message counts do not establish which build inputs and approvals produced the affected artifact.",
        "C": "Revision, dependency, job, artifact, signer, and approval records let responders trace the exact release back through its production path.",
        "D": "Runner speed does not establish artifact provenance or the authority used to publish it."
      }
    },
    "q10": {
      "options": {
        "A": "Protecting inputs, isolating execution, verifying outputs, and governing publication secures the full path from change to release.",
        "B": "Pipeline edits can change executable inputs and release authority and require engineering review.",
        "C": "Uncontrolled release-time resolution can change dependencies after the intended versions were reviewed and tested.",
        "D": "A signature establishes a signing relationship, not that the artifact passed every required security check."
      }
    }
  }
};
