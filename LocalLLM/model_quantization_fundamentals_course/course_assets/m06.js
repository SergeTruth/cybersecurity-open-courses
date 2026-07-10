window.COURSE_MODULE = {
  "title": "Hardware Fit and Performance",
  "graphicAlt": "Blank placeholder for model, cache, and hardware memory fit",
  "narration": "Begin with the complete memory budget. The quantized weights must fit alongside runtime buffers and the key-value cache. The cache grows with context length, active sequences, and model architecture. Batch settings add temporary pressure. Leave headroom instead of selecting a file whose size nearly equals available VRAM.\n\nFull GPU offload is often fastest when supported and memory allows. Partial offload places some layers on the GPU and leaves the rest on the CPU, which can enable a larger model but increase transfer and CPU work. CPU-only inference remains practical for smaller quantized models when system RAM and memory bandwidth are sufficient. Unified-memory systems share capacity between CPU and GPU, so the model competes with the operating system and other applications.\n\nContext can change a successful startup into an allocation failure. Test the configured maximum as well as a normal prompt. Measure time to first token, prompt-processing speed, generation speed, VRAM, RAM, and stability. A model that barely fits may run slowly, prevent other applications from using the GPU, or fail when a long document arrives.\n\nOptimize for the actual service envelope. A smaller or slightly more compressed model that remains fully accelerated with context headroom may outperform a higher-precision version that spills into system memory. Conversely, if both fit comfortably, higher precision may offer better quality with little operational cost. Hardware fit determines which comparison is meaningful; measurements determine which option wins.",
  "narrationPoints": [
    "Begin with the complete memory budget.",
    "Full GPU offload is often fastest when supported and memory allows.",
    "Context can change a successful startup into an allocation failure.",
    "Optimize for the actual service envelope."
  ]
};
