window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-68d4c71a6f",
  "questions": {
    "q1": {
      "options": {
        "A": "Encryption protects confidentiality rather than lowering the numerical precision of model data.",
        "B": "Quantization represents weights or other execution values with reduced precision to change resource requirements.",
        "C": "Changing representation precision does not inherently add parameters to the underlying model architecture.",
        "D": "Quantization does not automatically enlarge the model's supported input sequence budget."
      }
    },
    "q2": {
      "options": {
        "A": "Reduced memory and bandwidth demands can make useful models practical on constrained local hardware.",
        "B": "Lower precision does not guarantee factual accuracy or absence of hallucinations.",
        "C": "Models still need memory for weights, caches, buffers, and active computation.",
        "D": "Reduced precision can degrade reasoning rather than universally improve it."
      }
    },
    "q3": {
      "options": {
        "A": "Supported low-bit models can run successfully; not every runtime is disabled by quantization.",
        "B": "Lower-precision representation does not enlarge the model's learned parameter count.",
        "C": "Aggressive compression can reduce correctness, consistency, instruction-following, or reliability on particular tasks.",
        "D": "Low-bit quantization generally aims to reduce representation size rather than always increase it."
      }
    },
    "q4": {
      "options": {
        "A": "FP16 represents each value with fewer bits than FP32 and can reduce supported memory requirements.",
        "B": "FP16 does not inherently require more bytes per value than FP32.",
        "C": "FP16 describes numerical representation rather than a container specifying model packaging.",
        "D": "Lower precision still needs compatible software to load artifacts and execute the model."
      }
    },
    "q5": {
      "options": {
        "A": "Activation values arise during computation rather than store legal model usage terms.",
        "B": "Learned parameters and intermediate computation values are distinct from tokenizer metadata.",
        "C": "Weights encode learned parameters, while activations are values produced as input passes through the model.",
        "D": "Quantizing weights does not imply every intermediate value uses the same reduced precision."
      }
    },
    "q6": {
      "options": {
        "A": "Low-bit formats can accelerate supported workloads rather than universally disable hardware execution.",
        "B": "Precision affects numerical representation and resource behavior rather than merely artifact naming.",
        "C": "Processor instruction support and runtime kernels differ across devices and representations.",
        "D": "Actual speed depends on supported kernels, memory placement, backend implementation, and sufficient resource fit."
      }
    },
    "q7": {
      "options": {
        "A": "GGUF describes model packaging rather than a provider's accelerator billing policy.",
        "B": "Browser extensions are a different software category from local inference artifact containers.",
        "C": "Model containers are not specifically password-verifier storage formats.",
        "D": "GGUF is associated with llama.cpp and other compatible local model runtimes."
      }
    },
    "q8": {
      "options": {
        "A": "The extension identifies a tensor-storage format but does not prove precision, quality, or compatible execution.",
        "B": "Safetensors containers can hold different tensor dtypes and are not inherently always full precision.",
        "C": "Container naming alone does not identify every tensor's precision or task-quality behavior.",
        "D": "Tokenizer support remains necessary for interpreting text regardless of tensor storage format."
      }
    },
    "q9": {
      "options": {
        "A": "No single precision level is guaranteed to meet every task's quality and operating requirements.",
        "B": "Reduced-precision variants can differ from full-precision outputs and need evaluation.",
        "C": "Q4 artifacts still require compatible architecture, format, backend, and runtime support.",
        "D": "Q4 can offer useful memory savings with acceptable quality, but its suitability must be measured."
      }
    },
    "q10": {
      "options": {
        "A": "Very low-bit representations may impair reasoning rather than improve it automatically.",
        "B": "Quantization does not add new examples to the original training dataset.",
        "C": "Q2 or Q3 may fit a model into tighter memory budgets at greater risk of quality degradation.",
        "D": "Weight quantization does not eliminate the attention cache or other runtime memory requirements."
      }
    },
    "q11": {
      "options": {
        "A": "Monitor brightness does not determine active model memory capacity on the accelerator.",
        "B": "License terms do not expand or shrink the device's physical VRAM.",
        "C": "Keyboard layout does not govern how weights and cache fit on the GPU.",
        "D": "VRAM limits which weights, buffers, and active context state remain on the accelerator."
      }
    },
    "q12": {
      "options": {
        "A": "Longer contexts and more active sequences can expand the KV cache beyond remaining memory headroom.",
        "B": "Context processing adds working state rather than replacing the need to retain model weights.",
        "C": "Quantization changes representation and does not disable access to system memory.",
        "D": "Context state and processing consume memory even when model weights are heavily quantized."
      }
    },
    "q13": {
      "options": {
        "A": "Offload moves computation placement rather than simply remove weights that exceed a memory budget.",
        "B": "Supported offload executes selected model work on GPU resources instead of relying entirely on CPU execution.",
        "C": "Offload enables accelerator work rather than inherently switching acceleration off.",
        "D": "Moving inference work does not increase the capacity of persistent storage."
      }
    },
    "q14": {
      "options": {
        "A": "Weight files are only one part of the memory needed during actual inference.",
        "B": "Near-full weight allocation can leave insufficient room for contexts, batches, buffers, and other applications.",
        "C": "Memory pressure can cause swapping, failures, or unstable performance rather than improve reliability.",
        "D": "Barely fitting is not evidence of optimal speed or sufficient capacity under expected load."
      }
    },
    "q15": {
      "options": {
        "A": "A model can load successfully yet produce degraded answers because of representation error.",
        "B": "Download speed concerns transfer rather than the full range of possible quantization quality effects.",
        "C": "Fluent output can still contain subtle factual mistakes or impaired reasoning.",
        "D": "Quality loss may appear in factuality, reasoning, code, instruction-following, or handling of long context."
      }
    },
    "q16": {
      "options": {
        "A": "Real prompts reveal the actual quality, resource use, speed, and stability of the chosen variant.",
        "B": "Lower precision introduces tradeoffs that strengthen rather than remove the need for evaluation.",
        "C": "Download popularity cannot establish suitability for an organization's particular tasks and constraints.",
        "D": "One artificial score cannot capture every workload, error cost, or runtime configuration."
      }
    },
    "q17": {
      "options": {
        "A": "Verify the architecture, format, precision, tokenizer, runtime, license, and hardware combination before relying on an artifact.",
        "B": "A Q4 label omits architecture, container details, tokenizer compatibility, and usage permissions.",
        "C": "Popularity does not prove integrity, appropriate licensing, compatible execution, or local task quality.",
        "D": "Smallest size alone can select an incompatible artifact or unacceptable quality loss."
      }
    },
    "q18": {
      "options": {
        "A": "Quantization reduces some requirements without removing every compute, memory, storage, or context limit.",
        "B": "Select the efficient compatible variant that still meets measured workload quality and reliable operation requirements.",
        "C": "Artifact size omits runtime support, cache demand, error behavior, and useful output quality.",
        "D": "Minimum bit count can cause unacceptable degradation despite maximizing storage savings."
      }
    }
  }
};
