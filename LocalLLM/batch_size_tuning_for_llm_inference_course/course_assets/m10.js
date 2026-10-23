window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-32d51e8e00",
  "questions": {
    "q01": {
      "options": {
        "A": "Batch tuning seeks a measured balance of response time, aggregate work, memory use, and service requirements.",
        "B": "Inference serves an already trained model rather than performing weight updates from training data.",
        "C": "Larger batches do not establish better answer quality without appropriate task-specific evaluation.",
        "D": "Hardware constraints still determine which batch settings fit and operate reliably."
      }
    },
    "q02": {
      "options": {
        "A": "Gradient updates belong to training rather than ordinary inference request batching.",
        "B": "Inference batching groups serving work while model weights ordinarily remain unchanged.",
        "C": "Batching inference requests does not relabel the data used to train a model.",
        "D": "Tokenization remains necessary to represent inputs even when requests are processed in batches."
      }
    },
    "q03": {
      "options": {
        "A": "Driver installation prepares acceleration support rather than processing a request's prompt context.",
        "B": "Credential rotation is an access-management operation rather than an inference computation phase.",
        "C": "Prefill processes the supplied prompt and context before subsequent generation proceeds.",
        "D": "Log deletion changes retained diagnostics rather than generating attention state from input tokens."
      }
    },
    "q04": {
      "options": {
        "A": "Model-file compression changes storage representation rather than producing the response token sequence.",
        "B": "License review governs permitted use rather than generating tokens for an accepted prompt.",
        "C": "User-account creation is separate from model execution after prompt processing.",
        "D": "Decode generates subsequent output tokens using the processed context and evolving attention state."
      }
    },
    "q05": {
      "options": {
        "A": "Additional simultaneous work can increase cache, buffer, and working-memory requirements.",
        "B": "Larger batches can consume more memory and should not be assumed to reduce VRAM use.",
        "C": "Batching groups generation work rather than automatically disabling token production.",
        "D": "Context length remains an independent source of memory and processing requirements."
      }
    },
    "q06": {
      "options": {
        "A": "Queue capacity describes waiting demand rather than elapsed time before useful generated output appears.",
        "B": "First-token latency measures the wait until the model's first output token is available.",
        "C": "Model-file size is a storage measure rather than a response-time measurement.",
        "D": "CPU thread counts influence execution but do not define first-token response time."
      }
    },
    "q07": {
      "options": {
        "A": "Context length affects actual inference work rather than only the interface's visual appearance.",
        "B": "More context can change memory demand and prompt-processing time substantially.",
        "C": "Longer prompts and histories increase context state and can reduce safe batch headroom.",
        "D": "Batching and context length interact but serve different configuration purposes."
      }
    },
    "q08": {
      "options": {
        "A": "The KV cache stores model execution state rather than application user passwords.",
        "B": "Model licenses are usage terms and are not compressed in the attention cache.",
        "C": "Attention caching does not provide confidentiality for stored prompts or runtime memory.",
        "D": "Cached attention-related keys and values avoid recomputing relevant state during continued generation."
      }
    },
    "q09": {
      "options": {
        "A": "Changing one setting isolates its effect and makes performance comparisons easier to interpret.",
        "B": "Controlled comparisons improve understanding but cannot guarantee the globally fastest configuration.",
        "C": "Measuring settings does not remove physical memory, compute, bandwidth, or thermal limits.",
        "D": "Isolating variables aids diagnosis without preventing every possible runtime failure."
      }
    },
    "q10": {
      "options": {
        "A": "Screen brightness does not measure how quickly generated tokens are produced.",
        "B": "Tokens per second quantifies token-generation rate over a measured time interval.",
        "C": "Filename length does not describe computation rate or useful generated output.",
        "D": "Author count does not establish the runtime speed of a particular model configuration."
      }
    },
    "q11": {
      "options": {
        "A": "Larger batches may increase waiting or first-token delay rather than minimize every latency measure.",
        "B": "Batch size alone does not guarantee improvements in model correctness or groundedness.",
        "C": "A throughput gain can come with worse latency, memory exhaustion, or instability.",
        "D": "Operating limits still need monitoring after a batch setting has been selected."
      }
    },
    "q12": {
      "options": {
        "A": "Continuous batching schedules inference work rather than storing or verifying application passwords.",
        "B": "It changes request scheduling rather than compressing stored model or data files.",
        "C": "Browser headers govern web behavior rather than scheduling active inference sequences.",
        "D": "Continuous batching dynamically admits and groups active requests as serving capacity becomes available."
      }
    },
    "q13": {
      "options": {
        "A": "Bounded queues absorb competing demand while the server's immediately available inference capacity is busy.",
        "B": "Queues manage workload but do not establish who may submit or retrieve requests.",
        "C": "Scheduling does not guarantee that a model's generated content is factually correct.",
        "D": "A queue still needs limits and does not expand available accelerator memory."
      }
    },
    "q14": {
      "options": {
        "A": "Documentation helps reproduce settings and is not evidence that memory or batching limits were exceeded.",
        "B": "Memory failures, swapping, crashes, and unstable delay can indicate insufficient headroom for the chosen settings.",
        "C": "Reduced background CPU activity alone does not demonstrate an excessive inference batch configuration.",
        "D": "Consistent prompts improve comparability rather than signal that batch settings are unsafe."
      }
    },
    "q15": {
      "options": {
        "A": "The largest permitted value can create worse latency or instability and requires measurement.",
        "B": "Models, runtimes, contexts, hardware, and workloads differ, so one universal batch setting is unsuitable.",
        "C": "Representative measurements identify settings that satisfy workload needs while preserving performance and memory stability.",
        "D": "Interactive services can require low latency even when a larger batch improves aggregate throughput."
      }
    }
  }
};
