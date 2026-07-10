window.COURSE_MODULE = {
  "title": "AMD, ROCm, Vulkan, and Open Compute Paths",
  "graphicAlt": "Blank placeholder image for module 4: AMD, ROCm, Vulkan, and Open Compute Paths",
  "narration": "AMD GPU systems use a different ecosystem. The AMDGPU kernel driver provides core Linux support for many AMD devices, while ROCm supports GPU compute workflows at a high level. HIP is a programming model associated with portable GPU compute in the AMD ecosystem. Support depends on hardware generation, distribution, kernel version, user-space components, and application compatibility.\n\nVulkan compute paths may be useful for certain local inference or graphics-adjacent workloads, especially when a runtime supports Vulkan acceleration. Mesa and related user-space graphics components can also matter for integrated GPUs, desktop systems, and open driver paths. These options are not interchangeable with CUDA, and application support varies.\n\nIntegrated GPUs and discrete GPUs have different expectations. Integrated GPUs may share system memory and be useful for lightweight workloads or display tasks. Discrete GPUs usually provide stronger acceleration and dedicated VRAM, but they also require power, cooling, and driver compatibility. Some systems may use CPU fallback when GPU acceleration is not available or not worth the complexity.\n\nThe practical decision is to match the compute path to the workload and hardware. ROCm may be appropriate when the GPU and distribution are supported and the AI framework expects it. Vulkan may be enough for certain local runtimes. CPU fallback may be acceptable for small models or low-volume tasks. The right path is the one that works reliably for the actual system.",
  "narrationPoints": [
    "AMD GPU systems use a different ecosystem.",
    "Vulkan compute paths may be useful for certain local inference or graphics-adjacent workloads, especially when a runtime supports Vulkan acceleration.",
    "Integrated GPUs and discrete GPUs have different expectations.",
    "The practical decision is to match the compute path to the workload and hardware."
  ]
};
