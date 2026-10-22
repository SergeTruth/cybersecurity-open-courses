window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-262f7d6844",
  "questions": {
    "q1": {
      "options": {
        "A": "Image security supplements rather than replaces validation and authorization inside the application.",
        "B": "Images ship executable dependencies and metadata and may accidentally include sensitive files.",
        "C": "Image components and build provenance are important for patching and incident investigation.",
        "D": "Images contain filesystem content and application code beyond their human-readable tags."
      }
    },
    "q2": {
      "options": {
        "A": "SDK images can build applications; the concern is unnecessary tools in the final runtime image.",
        "B": "SDK environments support dependency restore rather than categorically preventing it.",
        "C": "Production runtimes usually do not need the SDK's compilers and other build tooling.",
        "D": "Using an SDK image does not guarantee removal of build caches or source material."
      }
    },
    "q3": {
      "options": {
        "A": "Separate build and runtime stages can keep unnecessary build tools out of final artifacts.",
        "B": "Final output still needs inspection because a multi-stage Dockerfile can copy excessive content.",
        "C": "A runtime stage can copy only published artifacts rather than every source file.",
        "D": "Each stage's base image still affects provenance, components, and maintenance obligations."
      }
    },
    "q4": {
      "options": {
        "A": "Excluding files does not prove every remaining copied file is safe to distribute.",
        "B": "Build-context filtering does not automatically sign an image or establish its provenance.",
        "C": "A reviewed ignore file reduces accidental inclusion of secrets, local configuration, and irrelevant artifacts.",
        "D": "Context hygiene complements scanning and patching rather than replacing either process."
      }
    },
    "q5": {
      "options": {
        "A": "Ordinary ARG and ENV declarations do not encrypt secret values by default.",
        "B": "Build records, layers, metadata, and logs can retain secret-bearing values.",
        "C": "Build and image inspection can reveal values beyond the running application process.",
        "D": "These declarations do not automatically expire the underlying credential when a build ends."
      }
    },
    "q6": {
      "options": {
        "A": "A non-root process still needs correct ownership and narrowly permitted writable paths.",
        "B": "Least-privilege process identities also matter for Linux and other container environments.",
        "C": "Reducing default process authority limits consequences of compromise or unsafe configuration.",
        "D": "Non-root identities should receive only necessary write access rather than universal filesystem permissions."
      }
    },
    "q7": {
      "options": {
        "A": "Copying the entire repository can expose source, fixtures, credentials, and unnecessary build files.",
        "B": "A minimal image must still include the certificates and native dependencies its workload requires.",
        "C": "Extra production tools add executable surface and access paths requiring justification.",
        "D": "Removing unnecessary files and tools reduces the content that must be trusted and maintained."
      }
    },
    "q8": {
      "options": {
        "A": "Artifact identification does not replace permissions controlling registry and deployment access.",
        "B": "Production release records need traceable content and provenance as well as local builds.",
        "C": "Knowing artifact identity helps patch response and does not remove update obligations.",
        "D": "Traceable identifiers and inventories connect source and components to the actual deployed image."
      }
    },
    "q9": {
      "options": {
        "A": "Prioritize findings using affected components, reachability, exposure, impact, and available remediation.",
        "B": "Component ownership helps assign and resolve scanner findings across image layers.",
        "C": "A scan reports evidence and does not universally rebuild and verify corrected images.",
        "D": "Different findings can have different impact and urgency in a deployment context."
      }
    },
    "q10": {
      "options": {
        "A": "An untracked moving tag does not establish which reviewed artifact was released.",
        "B": "Coordinate clean builds, least-privilege runtime, inventories, scanning, updates, and controlled distribution.",
        "C": "Unnecessary SDK content and build-time credentials increase image surface and exposure.",
        "D": "Source, caches, tests, and local settings should be included only for a justified runtime purpose."
      }
    }
  }
};
