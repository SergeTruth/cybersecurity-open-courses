window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-d9e6efe9e6",
  "questions": {
    "q1": {
      "options": {
        "A": "Generation rate measures output tokens produced over time after token generation starts.",
        "B": "Display refresh describes screen behavior rather than language-model output speed.",
        "C": "Model storage volume measures retained bytes, not generated tokens per second.",
        "D": "Installed software counts do not measure useful inference output rate."
      }
    },
    "q2": {
      "options": {
        "A": "Performance measurements do not prove that generated answers are factually correct.",
        "B": "A baseline informs tuning and still needs meaningful comparisons after each change.",
        "C": "Hardware, model, context, and configuration differences produce different performance constraints.",
        "D": "Baseline measurements identify bottlenecks and make later changes comparable to known behavior."
      }
    },
    "q3": {
      "options": {
        "A": "Parameter counts describe model architecture rather than elapsed delay before useful output.",
        "B": "Artifact size can affect loading but does not define the first-token metric.",
        "C": "Fan speed is a hardware operating signal rather than response-time measurement.",
        "D": "Time to first token captures the delay until the first generated output becomes available."
      }
    },
    "q4": {
      "options": {
        "A": "First-token delay is one latency component rather than the full definition of throughput.",
        "B": "Memory capacity is distinct from the service's response delay and useful completed work rate.",
        "C": "Latency concerns an individual request's delay, while throughput concerns aggregate completed work over time.",
        "D": "Larger batches can improve aggregate utilization while making individual requests wait longer."
      }
    },
    "q5": {
      "options": {
        "A": "VRAM supplies active accelerator storage rather than replace persistent disk capacity.",
        "B": "Inference memory needs are not limited to display appearance.",
        "C": "Accelerator-assigned model data, working buffers, and attention state must fit available VRAM.",
        "D": "CPU work can remain necessary even when much of the model is offloaded."
      }
    },
    "q6": {
      "options": {
        "A": "Memory exhaustion does not inherently improve the model's factual quality.",
        "B": "System RAM shortage does not increase physical accelerator memory bandwidth.",
        "C": "The model still needs to process its prompt even when allocation becomes difficult.",
        "D": "Insufficient RAM can trigger paging, allocation failures, slowdowns, and unstable operation."
      }
    },
    "q7": {
      "options": {
        "A": "Display resolution changes presentation rather than model numerical precision.",
        "B": "A driver update concerns hardware support rather than quantization of trained weights.",
        "C": "Precision reduction does not encrypt prompts or their retained copies.",
        "D": "Quantization lowers weight precision and resource needs, potentially changing quality or behavior."
      }
    },
    "q8": {
      "options": {
        "A": "Successful loading can leave inadequate working headroom for contexts, caches, other requests, and background applications.",
        "B": "Active execution still depends on the memory occupied by the loaded model.",
        "C": "Startup success does not establish supported full acceleration or stable sustained performance.",
        "D": "Pressure can cause swaps and failures rather than improve generation rate."
      }
    },
    "q9": {
      "options": {
        "A": "Large context ordinarily includes more input state rather than always reducing prompt-token count.",
        "B": "Longer sequences do not inherently disable access to system memory.",
        "C": "Context changes computation and cache requirements rather than merely the spelling of outputs.",
        "D": "Additional prompt tokens and attention state can increase processing time and memory requirements."
      }
    },
    "q10": {
      "options": {
        "A": "Application icons are interface resources rather than the model's attention-state cache.",
        "B": "Attention state does not replace the learned model weights stored in the artifact.",
        "C": "Operating-system credential management is unrelated to the inference KV cache's purpose.",
        "D": "The cache retains attention-related state used as generation continues through the active sequence."
      }
    },
    "q11": {
      "options": {
        "A": "Offload changes execution placement rather than discard required layers from the model.",
        "B": "GPU offload runs supported model computation on accelerator resources instead of only on the CPU.",
        "C": "Turning off a device prevents its normal computation rather than offloading work onto it.",
        "D": "Backend support needs to be enabled and compatible for effective acceleration."
      }
    },
    "q12": {
      "options": {
        "A": "A runtime can start while using CPU fallback or incomplete accelerator offload.",
        "B": "Successful startup alone does not establish which backend handled the actual inference work.",
        "C": "Backend selection affects supported hardware computation rather than only interface styling.",
        "D": "Different hardware platforms require suitable compatible backends rather than one universal implementation."
      }
    },
    "q13": {
      "options": {
        "A": "Settings can interact, which makes controlled comparisons more important.",
        "B": "Random combinations can obscure causality and introduce instability without improving speed.",
        "C": "Every meaningful change needs measurement to establish its effects and detect regressions.",
        "D": "Isolating a changed variable makes its performance and stability effects easier to attribute and reproduce."
      }
    },
    "q14": {
      "options": {
        "A": "Synthetic scores may omit the input lengths, concurrency, task errors, and resource behavior of actual use.",
        "B": "Realistic tests can reveal hallucinations but cannot guarantee their elimination.",
        "C": "Workload tests benefit from resource and thermal signals rather than make monitoring unnecessary.",
        "D": "Representative work measures the quality, response time, memory demand, and reliability that users actually need."
      }
    },
    "q15": {
      "options": {
        "A": "Throttle behavior does not increase the accelerator's physical memory capacity.",
        "B": "Reduced clocks are a response to operating constraints rather than a replacement for adequate cooling.",
        "C": "Hardware may lower sustained frequency as thermal conditions approach limits, reducing ongoing inference performance.",
        "D": "Long workloads can become slower under heat rather than necessarily improve after warm-up."
      }
    },
    "q16": {
      "options": {
        "A": "Useful optimization seeks stable acceptable performance and output quality for real workload requirements.",
        "B": "High isolated rates are not useful if expected requests crash or repeatedly fail.",
        "C": "Displaying a loading message does not prove that a large model can perform useful work.",
        "D": "Maximum energy consumption is not itself evidence of efficient or successful inference."
      }
    },
    "q17": {
      "options": {
        "A": "Software changes can alter acceleration support, memory use, compatibility, speed, and runtime stability.",
        "B": "Recording versions does not add hardware memory or expand model capacity.",
        "C": "Driver behavior affects compute support, not merely display colors.",
        "D": "Version records support recovery but do not supply an actual tested rollback procedure."
      }
    },
    "q18": {
      "options": {
        "A": "Flags effective elsewhere may not fit this model, backend, hardware, or workload.",
        "B": "Initial generation does not establish sustained thermal stability or sufficient working-memory headroom.",
        "C": "Measure useful work, find real constraints, select suitable artifacts, tune deliberately, and retain dependable configurations.",
        "D": "Maximum model size can sacrifice reliability or speed without producing worthwhile task improvements."
      }
    }
  }
};
