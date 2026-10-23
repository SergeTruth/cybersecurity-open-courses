window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-18975138c3",
  "questions": {
    "q1": {
      "options": {
        "A": "Renting capacity does not guarantee accurate answers from the selected model.",
        "B": "Remote compute still needs resource, access, reliability, and cost monitoring.",
        "C": "Operators retain security and data-handling responsibilities when using provider infrastructure.",
        "D": "Rentals provide temporary or specialized accelerator capacity without requiring ownership of the physical hardware."
      }
    },
    "q2": {
      "options": {
        "A": "Providers and service types differ in supported hardware, control, support, isolation, and data practices.",
        "B": "Different rental products trade operational control, convenience, hardware access, support, and trust assumptions differently.",
        "C": "Hosted notebooks and production servers can differ in durability, access, uptime, and lifecycle guarantees.",
        "D": "Third-party capacity needs review of trust, artifact access, support, data handling, and recovery expectations."
      }
    },
    "q3": {
      "options": {
        "A": "Reclaimable capacity does not provide the same continuity as a guaranteed long-term reservation.",
        "B": "Discounted compute does not imply persistent storage is free or included indefinitely.",
        "C": "Spot allocation is a provider-capacity model rather than merely a desktop setting.",
        "D": "Interruptible instances may be reclaimed, so suitable jobs need restart, checkpoint, and recovery handling."
      }
    },
    "q4": {
      "options": {
        "A": "A brief isolated experiment may not justify a commitment extending far beyond its useful work.",
        "B": "Unknown or nonexistent future demand can leave committed resources unused while obligations remain.",
        "C": "Predictable sustained use can justify longer commitments when measured workload and service terms support them.",
        "D": "Contract terms matter when deciding whether a commitment matches actual operational requirements."
      }
    },
    "q5": {
      "options": {
        "A": "Accelerator memory constrains which weights, caches, contexts, and concurrent work fit during execution.",
        "B": "Model-execution memory requirements extend beyond a remote desktop's display settings.",
        "C": "Billing currency does not determine the device's physical accelerator memory capacity.",
        "D": "SSH credential validity is an identity matter rather than a GPU-memory property."
      }
    },
    "q6": {
      "options": {
        "A": "Multi-GPU execution requires suitable runtime or framework support for the chosen workload.",
        "B": "Inter-device communication can become a major constraint when a model is split across GPUs.",
        "C": "Supported distribution must justify its coordination costs; one sufficiently large GPU may be simpler for one model.",
        "D": "Multiple devices do not automatically expose unlimited unified memory to an arbitrary model process."
      }
    },
    "q7": {
      "options": {
        "A": "Fine-tuning commonly needs extra training state and should not be assumed to use less memory.",
        "B": "Inference contexts and batches influence runtime memory and serving capacity.",
        "C": "Fine-tuning often adds training-state and checkpoint needs, while inference emphasizes useful serving delay and throughput.",
        "D": "Training and inference can require different memory, storage, scheduling, and recovery configurations."
      }
    },
    "q8": {
      "options": {
        "A": "Explicit ownership supports cleanup and accountable resource-lifecycle decisions rather than create idle waste.",
        "B": "Budget alerts provide visibility and can help identify abnormal or abandoned consumption.",
        "C": "Paid instances left active during delays or after completion can consume substantial budget without useful output.",
        "D": "Storage review helps find persistent charges beyond active accelerator time."
      }
    },
    "q9": {
      "options": {
        "A": "Compute shutdown does not necessarily delete every retained disk, snapshot, or stored artifact.",
        "B": "Transfer charges may add to compute spending rather than replace it.",
        "C": "Persistent storage and data movement can create separate costs outside active GPU execution time.",
        "D": "Storage pricing and included allowances depend on the provider and product rather than universal free retention."
      }
    },
    "q10": {
      "options": {
        "A": "Automating a complex unverified stack can obscure basic hardware, runtime, and compatibility failures.",
        "B": "First prove a simple accelerated request path, record the working configuration, then automate repeatable setup.",
        "C": "Broad management access creates exposure instead of validating correct local serving behavior.",
        "D": "Unrecorded changes make configurations harder to reproduce, compare, and recover after failure."
      }
    },
    "q11": {
      "options": {
        "A": "CUDA is an accelerator platform rather than the policy controlling cloud identities and permissions.",
        "B": "Compatible NVIDIA workloads commonly use CUDA components across driver, runtime, framework, and application layers.",
        "C": "Provider billing is separate from the software platform used to execute accelerator kernels.",
        "D": "Storage-encryption credentials do not define CUDA's computation role."
      }
    },
    "q12": {
      "options": {
        "A": "Containerized workloads still need supported host drivers and suitable accelerator access.",
        "B": "Containers package application software and dependencies to improve repeatability across compatible environments.",
        "C": "Images and hosts still need maintenance, restricted privileges, protected credentials, and patch governance.",
        "D": "Packaging software does not guarantee that a model's generated answers meet quality requirements."
      }
    },
    "q13": {
      "options": {
        "A": "Keeping approved artifacts on appropriate storage avoids repeated downloads and can reduce setup delays.",
        "B": "Deleting weights after every request prevents useful reuse rather than implement artifact caching.",
        "C": "Cached models do not automatically encrypt or redact the prompts they process.",
        "D": "Caching supports inference setup rather than replace the need to execute the model."
      }
    },
    "q14": {
      "options": {
        "A": "Stored weights alone do not form a running inference service.",
        "B": "Notebook editing does not supply active model execution without a suitable runtime.",
        "C": "Serving runs a trained model behind a controlled request interface used by applications or clients.",
        "D": "Procuring physical hardware is different from operating inference through an API."
      }
    },
    "q15": {
      "options": {
        "A": "Restrict network reachability, authenticate clients, and bound requests to reduce misuse of shared compute and data.",
        "B": "Public release before testing can expose unverified permissions, resource limits, and operational behavior.",
        "C": "Unusual port numbers can be discovered and do not establish authorization.",
        "D": "Browser-visible or public keys can be copied and abused by unintended callers."
      }
    },
    "q16": {
      "options": {
        "A": "Classification guides handling rules rather than expanding accelerator memory.",
        "B": "Prompts and uploads can contain confidential credentials, personal information, code, records, and intellectual property.",
        "C": "Cloud submission does not make sensitive input content public or harmless.",
        "D": "Data classification complements encryption, permissions, retention, and approved processing destinations."
      }
    },
    "q17": {
      "options": {
        "A": "An open browser console does not establish that the workload remains healthy, useful, or within budget.",
        "B": "Thermal signals alone miss service failures, storage pressure, identity abuse, and ongoing idle charges.",
        "C": "Artifact size alone does not reveal active resource pressure or user-facing performance.",
        "D": "Monitor serving outcomes together with compute, memory, storage, network, access, and cost signals."
      }
    },
    "q18": {
      "options": {
        "A": "Retire unneeded compute and review independent data, storage, credentials, and network rules under the applicable policy.",
        "B": "Publishing unused resources creates security risks rather than completing responsible cleanup.",
        "C": "Small recurring charges can accumulate and should still reflect a justified retained resource.",
        "D": "Keeping expensive resources active without demand creates continuing financial and exposure risks."
      }
    }
  }
};
