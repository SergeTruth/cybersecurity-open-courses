window.COURSE_MODULE = {
  "title": "Quantization and Memory Fit",
  "graphicAlt": "Blank course graphic placeholder",
  "narration": "Quantization lowers numerical precision so a model uses less memory and often runs more practically on local hardware. Labels such as Q2 through Q8 describe broad precision levels, but exact schemes and model behavior differ.\n\nLower-bit quantization generally reduces file and memory size while increasing the chance of quality loss. Higher precision uses more resources and is not automatically better for every task, runtime, or machine. Test the actual file.\n\nG G U F is a common local model format for llama.cpp-compatible runtimes. Compatibility depends on architecture, runtime version, tokenizer, prompt template, metadata, and acceleration backend, not only the file extension.\n\nMemory fit includes model weights, key-value cache, context, batch settings, concurrent sessions, runtime overhead, display use, and other applications. File size is therefore not a complete VRAM or unified-memory estimate.\n\nSome runtimes allow different cache precision or memory strategies, creating another quality, compatibility, and capacity tradeoff. Treat those settings as part of the tested configuration instead of assuming model quantization tells the whole story.\n\nPartial GPU offload can run some layers on the accelerator and leave others on the CPU. This may make a larger model load, but transfer and CPU work can reduce speed. A technically successful load is not an operational success.\n\nAvoid configurations that consume nearly all available memory, swap heavily, crash on long prompts, or throttle under sustained work. Compare several quantizations and sizes with realistic context, then preserve a margin for stability.",
  "narrationPoints": [
    "Quantization lowers numerical precision so a model uses less memory and often runs more practically on local hardware.",
    "Lower-bit quantization generally reduces file and memory size while increasing the chance of quality loss.",
    "G G U F is a common local model format for llama.",
    "Memory fit includes model weights, key-value cache, context, batch settings, concurrent sessions, runtime overhead, display use, and other...",
    "Some runtimes allow different cache precision or memory strategies, creating another quality, compatibility, and capacity tradeoff.",
    "Partial GPU offload can run some layers on the accelerator and leave others on the CPU."
  ]
};
