window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-44dfde9990",
  "questions": {
    "q1": {
      "options": {
        "A": "An inference cluster coordinates compute workers to execute trained models for incoming requests.",
        "B": "One stored prompt does not provide request routing, serving capacity, or coordinated model execution.",
        "C": "Model files without serving processes do not constitute an operational inference cluster.",
        "D": "Inference executes trained models rather than being limited to training new frontier models."
      }
    },
    "q2": {
      "options": {
        "A": "Requirements can define queue limits but do not guarantee every request avoids waiting.",
        "B": "Capacity requirements do not themselves establish the correctness of a model's answers.",
        "C": "Infrastructure sizing still needs access safeguards, failure handling, and recoverable operations.",
        "D": "Measured workload needs determine whether scale-out is justified and which architecture has suitable capacity."
      }
    },
    "q3": {
      "options": {
        "A": "First-token delay is a latency measure rather than completed work per unit time.",
        "B": "Stored model capacity measures retained data rather than the rate of useful inference work.",
        "C": "Switch count alone does not measure how much work the service completes.",
        "D": "Throughput describes useful completed work over a specified measurement interval."
      }
    },
    "q4": {
      "options": {
        "A": "Temperature affects hardware health rather than directly defining request delay.",
        "B": "Retained version count is a storage-management measure rather than response latency.",
        "C": "Latency includes the waiting and execution time before and during useful request output.",
        "D": "Log storage volume does not directly measure the delay experienced by a requester."
      }
    },
    "q5": {
      "options": {
        "A": "One host still needs power capacity, cooling, and safe operating conditions.",
        "B": "Multiple GPUs do not automatically become one unlimited pool of usable memory.",
        "C": "A single host avoids many cross-node routing, coordination, and distributed failure-management requirements.",
        "D": "Even a single machine needs monitoring, maintenance, controlled updates, and recovery planning."
      }
    },
    "q6": {
      "options": {
        "A": "A router directs requests to compatible healthy workers according to capacity and service policy.",
        "B": "Routing does not track artifact provenance or replace deliberate model-version management.",
        "C": "Routers do not ordinarily quantize a model anew for every incoming request.",
        "D": "Request routing does not physically add accelerator memory to serving workers."
      }
    },
    "q7": {
      "options": {
        "A": "GPU memory capacity does not determine how many physical ports a switch provides.",
        "B": "Hardware capacity still requires compatible runtimes and acceleration support to execute models.",
        "C": "Active model weights and context state require VRAM during serving, not merely during downloading.",
        "D": "Planned workloads must fit model weights, attention state, runtime buffers, and appropriate operating headroom."
      }
    },
    "q8": {
      "options": {
        "A": "Network behavior does not change how many parameters the model architecture contains.",
        "B": "A fast endpoint link cannot remove contention elsewhere in the network path.",
        "C": "Requests, artifacts, multimodal inputs, coordination, and diagnostics create different bandwidth and delay requirements.",
        "D": "GPU workers still depend on networking for routed requests and other distributed service operations."
      }
    },
    "q9": {
      "options": {
        "A": "Private prompts should not be placed in an uncontrolled public artifact share.",
        "B": "Approved central versions with verified local caches support consistency and efficient worker startup.",
        "C": "Loading active models from slow archival storage can add avoidable startup delays and shared bottlenecks.",
        "D": "Independent unverified latest downloads create provenance and configuration-drift risks across workers."
      }
    },
    "q10": {
      "options": {
        "A": "Deploying many runtimes at once increases complexity before any reliable serving baseline is established.",
        "B": "Orchestration cannot compensate for an unverified model server or unsupported acceleration configuration.",
        "C": "Configuration-option counts do not establish suitability or dependable behavior for the actual workload.",
        "D": "One stable observable accelerated server provides a measured foundation before adding routing and replicas."
      }
    },
    "q11": {
      "options": {
        "A": "Routing selects an eligible model and available worker matching the request's required capabilities.",
        "B": "Routers need health information to avoid sending requests to failed or incompatible workers.",
        "C": "Model routing chooses software execution destinations rather than moving physical accelerator cards.",
        "D": "Capacity limits and competing requests can still introduce queueing despite a routing layer."
      }
    },
    "q12": {
      "options": {
        "A": "More concurrent work can increase contention and individual delay instead of improving each response.",
        "B": "Simultaneous sequences compete for compute, cache, memory, and bounded queue capacity.",
        "C": "Concurrent requests commonly share the same accelerator resources and must fit their aggregate limits.",
        "D": "Concurrency planning must respect capacity limits rather than treating them as unnecessary."
      }
    },
    "q13": {
      "options": {
        "A": "Batched work can still wait in queues and needs deliberate scheduling and limits.",
        "B": "Batching does not inherently impose a permanent reduction in model accuracy.",
        "C": "Appropriate batching can increase total throughput rather than universally reduce it.",
        "D": "Grouping requests can improve aggregate work rate while increasing a particular request's waiting time."
      }
    },
    "q14": {
      "options": {
        "A": "Aggregate utilization alone can hide failed requests, long queues, or unavailable model capabilities.",
        "B": "Health combines user-facing availability and delay with errors, capacity, power, and thermal observations.",
        "C": "Model-file counts do not establish that workers can answer valid requests reliably.",
        "D": "A running process may still be stalled, incompatible, overloaded, or unable to perform inference."
      }
    },
    "q15": {
      "options": {
        "A": "Exposed inference services can be abused to consume capacity or access sensitive data without authorization.",
        "B": "Identity checks govern access rather than add physical accelerator memory.",
        "C": "Inference endpoints need explicitly verified safeguards rather than an assumption of safe defaults.",
        "D": "Authorization complements network restrictions and monitoring instead of replacing them."
      }
    },
    "q16": {
      "options": {
        "A": "Prioritize irreplaceable configuration, metadata, approved private data, and demonstrated recovery of required service state.",
        "B": "Unlimited unprotected logs create retention and disclosure risks rather than a focused recovery strategy.",
        "C": "Re-downloadable public artifacts should not displace backups of unique operational state and configuration.",
        "D": "Installation media alone cannot recover private data, routing policies, versions, or service configuration."
      }
    },
    "q17": {
      "options": {
        "A": "Rollback restores a prior state rather than inherently reducing model size.",
        "B": "Updates still need tests even when a prior version can be restored.",
        "C": "Successful installation can still change behavior or resource use, making a tested rollback path valuable.",
        "D": "Recovery options mitigate failures without guaranteeing that incidents will never occur."
      }
    },
    "q18": {
      "options": {
        "A": "Scaling before defining demand can create unnecessary cost and complexity without solving a demonstrated requirement.",
        "B": "Additional GPU workers cannot resolve every storage, network, queue, or application bottleneck.",
        "C": "Measurements should justify growth and identify which constrained component actually needs additional capacity.",
        "D": "New hardware announcements do not establish that the existing service needs or can use more resources."
      }
    }
  }
};
