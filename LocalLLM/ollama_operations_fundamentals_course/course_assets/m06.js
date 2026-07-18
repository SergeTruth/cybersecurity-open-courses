window.COURSE_MODULE = {
  "title": "Performance, Memory, and Hardware Awareness",
  "graphicAlt": "Preview bullet summary visual for performance, memory, and hardware awareness.",
  "narration": "Model-serving performance depends on several interacting factors: model size, quantization, context length, available memory, CPU, GPU, disk speed, thermal behavior, and concurrent use. A model that feels responsive for one user on a workstation may not be suitable for a shared server, a heavier prompt workflow, or multiple simultaneous clients.\n\nOperators should watch memory, disk, CPU, GPU, and temperature while evaluating a model. Memory pressure can cause slow responses, failed loads, or system instability. Disk pressure can affect model pulls and logging. CPU and GPU pressure can change latency expectations. Thermal throttling can make performance worse over time even if the first few requests look fine.\n\nContext length also matters. Longer prompts and larger conversation histories require more work and more memory. Keep-alive behavior and loaded models can improve responsiveness because a model does not need to load for every request, but they can also hold scarce memory. The best setting depends on whether the environment is optimized for interactive use, occasional requests, or shared workloads.\n\nCapacity planning should be based on observed workloads rather than wishful assumptions. Measure representative prompts, expected concurrency, response latency, resource use, and failure behavior. Then document what the environment can support. Performance planning turns local AI from a pleasant demo into an operational service with realistic expectations.",
  "narrationPoints": [
    "Model-serving performance depends on several interacting factors: model size, quantization, context length, available memory, CPU, GPU, disk...",
    "Operators should watch memory, disk, CPU, GPU, and temperature while evaluating a model.",
    "Context length also matters.",
    "Capacity planning should be based on observed workloads rather than wishful assumptions."
  ]
};
