window.COURSE_MODULE = {
  "title": "Choosing the Right GGUF Variant",
  "graphicAlt": "Blank placeholder image for module 5: Choosing the Right GGUF Variant",
  "narration": "Choosing a GGUF variant means matching model size, parameter count, quantization level, hardware capacity, and workload. Parameter count gives a rough sense of model scale, but it does not automatically determine quality for every task. A smaller well-matched model can be more useful than a larger model that barely fits, runs slowly, or forces you into a context length that is too short for your workflow.\n\nRAM and VRAM are practical constraints. CPU-only inference may work with enough system memory, but generation can be slower. GPU offload can improve performance when enough VRAM is available, but the amount of offload depends on the model, quantization, context length, and runtime settings. Hybrid execution is common on consumer machines, where the user balances what fits on the GPU with what can run acceptably on the CPU.\n\nContext length should be chosen based on the task. Long context can help with document review, multi-turn conversations, and retrieval workflows, but it consumes memory and may slow prompt processing. If your work uses short prompts, a very large context window may not be worth the cost. If your work involves long reports or code bases, context can become a core requirement rather than a luxury.\n\nAvoid random downloads without understanding tradeoffs. Prefer trusted sources, read model cards, compare quantization variants, and keep notes on what you tested. Consider latency, throughput, quality expectations, license terms, and whether the model fits the problem. The best GGUF variant is not the biggest or smallest file. It is the one that runs reliably on your hardware and produces acceptable results for the job.",
  "narrationPoints": [
    "Choosing a GGUF variant means matching model size, parameter count, quantization level, hardware capacity, and workload.",
    "RAM and VRAM are practical constraints.",
    "Context length should be chosen based on the task.",
    "Avoid random downloads without understanding tradeoffs."
  ]
};
