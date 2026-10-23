window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-f174d0af19",
  "questions": {
    "q1": {
      "options": {
        "A": "Benchmarks are evaluation evidence; their legality is not why model suitability varies.",
        "B": "Appropriate selection depends on actual workload, quality needs, hardware resources, speed, and operating constraints.",
        "C": "Models differ in capabilities, memory use, response behavior, and task suitability.",
        "D": "Local inference can work well when compatible configurations fit the intended workload."
      }
    },
    "q2": {
      "options": {
        "A": "VRAM limits the model weights, cache, context state, and working buffers available on the accelerator.",
        "B": "Display refresh is not the main capacity constraint for inference model execution.",
        "C": "Filenames do not determine the amount of accelerator memory available for active inference.",
        "D": "Keyboard layout does not establish model execution capacity or cache headroom."
      }
    },
    "q3": {
      "options": {
        "A": "Larger models can work when hardware and workload requirements support their additional resource needs.",
        "B": "Model size affects memory footprint, loading, compute costs, and practical capacity.",
        "C": "A smaller configuration can satisfy real tasks while fitting resources and completing work more reliably.",
        "D": "Smaller models do not universally produce more accurate answers across every task."
      }
    },
    "q4": {
      "options": {
        "A": "Quantization uses reduced numerical precision to lower model storage and memory requirements.",
        "B": "Display resolution changes appearance rather than numerical precision of model data.",
        "C": "Reduced-precision weights do not physically replace or eliminate system RAM.",
        "D": "Quantizing model values does not encrypt prompts or keep them confidential."
      }
    },
    "q5": {
      "options": {
        "A": "Increasing context does not shrink the model's stored weights or parameter count.",
        "B": "Longer inputs increase prompt processing and retained attention state, potentially adding substantial memory demand.",
        "C": "More available context does not ensure relevant retrieval or more accurate answers.",
        "D": "Context processing still uses memory and may increase system RAM pressure."
      }
    },
    "q6": {
      "options": {
        "A": "Network delay can affect delivery but does not define token-generation rate.",
        "B": "Battery age does not measure the number of output tokens produced per second.",
        "C": "Tokens per second approximates the model's measured generation rate in its runtime configuration.",
        "D": "Disk capacity measures stored bytes rather than the rate of generated output."
      }
    },
    "q7": {
      "options": {
        "A": "Real tasks are central to deciding whether a model configuration is actually useful.",
        "B": "Representative work exposes quality, response time, memory demand, reliability, and failure cases.",
        "C": "Public leaderboards cannot describe every local workflow, configuration, and operating constraint.",
        "D": "Tests reveal errors but do not guarantee that every future request succeeds."
      }
    },
    "q8": {
      "options": {
        "A": "Fan shutdown affects cooling and can reduce safe sustained hardware operation.",
        "B": "Offload runs supported parts of inference on accelerator hardware instead of relying entirely on CPU computation.",
        "C": "Removing stored models is a storage-management action rather than GPU computation offload.",
        "D": "Backing up logs concerns recovery rather than distributing inference computation to an accelerator."
      }
    },
    "q9": {
      "options": {
        "A": "Excess heat can trigger reduced clocks or instability rather than guarantee faster sustained inference.",
        "B": "Cooling determines whether hardware can sustain its intended operating conditions.",
        "C": "Thermal effects can change processors and accelerators, not merely the attached display.",
        "D": "Thermal throttling can lower sustained throughput despite good performance in short initial tests."
      }
    },
    "q10": {
      "options": {
        "A": "Display resolution does not explain the principal cost of processing a long document.",
        "B": "Keyboard layout does not determine attention state or prompt-processing work.",
        "C": "Large inputs can make prompt evaluation and context-cache demand the dominant practical constraint.",
        "D": "File colors do not affect model execution or the cost of long input sequences."
      }
    },
    "q11": {
      "options": {
        "A": "Crashes interrupt work and add retry costs rather than improve operational quality.",
        "B": "Memory failures can prevent useful completion even when successful answers would be accurate.",
        "C": "Accuracy is insufficient if expected requests repeatedly fail, stall, or exhaust resources.",
        "D": "A useful configuration must deliver acceptable results consistently under its intended operating conditions."
      }
    },
    "q12": {
      "options": {
        "A": "Record the tested configuration, inputs, output quality, resource behavior, stability, and date for reproducibility.",
        "B": "Model names alone omit precision, runtime, prompts, resource settings, and the hardware used.",
        "C": "A rank does not capture the measured behavior of the actual local configuration.",
        "D": "File size alone does not describe quality, context requirements, latency, or stability."
      }
    },
    "q13": {
      "options": {
        "A": "Visual inputs introduce workload and representation costs that differ from short text-only conversation.",
        "B": "Image processing can require additional encoding state, visual tokens, and runtime memory.",
        "C": "Adapters, image encoding, visual context, and task requirements create distinct resource and quality constraints.",
        "D": "Vision models need supported image inputs to perform visual tasks meaningfully."
      }
    },
    "q14": {
      "options": {
        "A": "New naming does not establish a measurable advantage for the intended task.",
        "B": "Large downloads consume resources without proving improved quality or operational fit.",
        "C": "Another user's choice may reflect different hardware, data, constraints, or success criteria.",
        "D": "Scale up when measured failures justify extra resource cost and the larger configuration addresses them."
      }
    },
    "q15": {
      "options": {
        "A": "Maximum parameter count can exceed resources or provide little useful improvement.",
        "B": "Newer releases still need task, compatibility, resource, and reliability evaluation.",
        "C": "Memory and context limits directly influence whether expected workloads finish reliably.",
        "D": "The best practical choice meets measured task needs within available hardware and operating constraints."
      }
    }
  }
};
