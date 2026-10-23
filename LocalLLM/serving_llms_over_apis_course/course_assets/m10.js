window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-60ed21471d",
  "questions": {
    "q01": {
      "options": {
        "A": "API serving exposes model execution through an application-facing request and response boundary.",
        "B": "Stored weights without an executing runtime do not provide a functioning inference endpoint.",
        "C": "Ordinary inference uses trained weights rather than training a model anew for each request.",
        "D": "Applications still need validation, policy, data handling, and workflow logic around generated results."
      }
    },
    "q02": {
      "options": {
        "A": "Interactive use can also need safeguards, so it is not universally less secure.",
        "B": "Serving introduces shared identity, capacity, reliability, monitoring, and lifecycle requirements beyond a single interactive trial.",
        "C": "Remote interfaces still need hardware capable of performing the underlying computation.",
        "D": "API transport does not eliminate hallucinations or guarantee factual responses."
      }
    },
    "q03": {
      "options": {
        "A": "Tokenizer vocabularies define text representation rather than network routing or access enforcement.",
        "B": "Wallpaper has no role in application routing, TLS termination, or authentication policy.",
        "C": "Gateways and reverse proxies can mediate requests, transport protection, identities, and access restrictions before model serving.",
        "D": "Model cards provide information about artifacts rather than act as the live access-control intermediary."
      }
    },
    "q04": {
      "options": {
        "A": "Longer input can increase processing delay rather than always accelerate responses.",
        "B": "Context size changes model workload and memory use, not merely visual formatting.",
        "C": "Input-sequence capacity does not identify the caller or authorize its operations.",
        "D": "Larger contexts increase prompt processing and retained attention state, affecting latency and memory capacity."
      }
    },
    "q05": {
      "options": {
        "A": "Streaming delivers partial generated output early instead of waiting for the entire response to complete.",
        "B": "Incremental response delivery does not encrypt stored model weights.",
        "C": "Streaming behavior still needs appropriate diagnostic and audit visibility.",
        "D": "Long-running streamed requests can still stall, disconnect, or exceed configured deadlines."
      }
    },
    "q06": {
      "options": {
        "A": "Caller identification does not physically improve the accelerator's cooling system.",
        "B": "Authentication establishes the calling user, service, or workload before applying its permitted usage policy.",
        "C": "A valid identity does not establish that generated content is accurate.",
        "D": "Inputs and outputs still need suitable validation after the caller is authenticated."
      }
    },
    "q07": {
      "options": {
        "A": "Identity validation does not establish the validity or safety of every supplied prompt.",
        "B": "Authorization applies to models, files, tools, tenants, usage, and many resources beyond databases.",
        "C": "Authenticated clients can have different permissions for data, capabilities, operations, and consumption limits.",
        "D": "Possessing an API credential does not automatically grant every operation supported by the service."
      }
    },
    "q08": {
      "options": {
        "A": "Internet reachability does not improve learned model behavior or response accuracy.",
        "B": "Broad exposure can increase abuse, failures, and spending that need observability.",
        "C": "Public accessibility cannot expand a model's supported context capacity.",
        "D": "Unauthorized callers may consume resources, reach sensitive workflows, or submit data outside approved handling rules."
      }
    },
    "q09": {
      "options": {
        "A": "Bounded input size helps control memory demand, expensive prefill, and denial-of-service exposure.",
        "B": "Input limits restrict accepted workloads rather than publish private requests.",
        "C": "Capacity protection does not choose an appropriate model or evaluate answer quality.",
        "D": "Size enforcement and identity checks protect different boundaries and should both apply where needed."
      }
    },
    "q10": {
      "options": {
        "A": "Conversation content can remain sensitive after processing and should not be retained without justified limits.",
        "B": "Prompts and responses can carry private documents, customer data, credentials, or regulated records into logs.",
        "C": "Generated content can reproduce private inputs and retrieved information.",
        "D": "Raw conversation captures do not replace controlled records of access, decisions, and administrative actions."
      }
    },
    "q11": {
      "options": {
        "A": "Request throttling does not change the legal conditions applying to a model artifact.",
        "B": "Limiting usage does not repair incompatible tokenization or input formatting.",
        "C": "Rate limits bound abuse and uncontrolled demand that could exhaust capacity or accumulate excessive charges.",
        "D": "Hardware support installation is separate from controls on request frequency and workload consumption."
      }
    },
    "q12": {
      "options": {
        "A": "Output can resemble a schema while still contain missing, invalid, or unexpected fields.",
        "B": "Valid data shape does not grant permission for the downstream action or affected resource.",
        "C": "Validation checks a contract and does not prove the truth of every generated factual claim.",
        "D": "Validate generated structures before they drive protected state or other systems that require trusted values."
      }
    },
    "q13": {
      "options": {
        "A": "Health checks establish selected readiness and responsiveness conditions for serving traffic.",
        "B": "A probe uses existing service behavior rather than train a new model.",
        "C": "Account password rotation is an identity lifecycle operation rather than a normal model-readiness probe.",
        "D": "Checking readiness does not increase token budgets or supported model architecture limits."
      }
    },
    "q14": {
      "options": {
        "A": "Live monitoring remains necessary because recorded configurations do not describe every current failure.",
        "B": "Exact model and runtime records help reproduce, compare, troubleshoot, and recover known working deployments.",
        "C": "Documentation supports evaluation without making every configuration safe for every use.",
        "D": "Written settings cannot replace necessary compute, memory, storage, power, or cooling capacity."
      }
    },
    "q15": {
      "options": {
        "A": "Public exposure should follow a deliberate design rather than depend on caller goodwill.",
        "B": "Removing identity checks and useful diagnostics undermines security and dependable operations.",
        "C": "A suitable API boundary combines restricted authority, controlled demand, monitoring, reliable behavior, and private-data handling.",
        "D": "Maximum context increases resource use and should be justified by the actual task."
      }
    }
  }
};
